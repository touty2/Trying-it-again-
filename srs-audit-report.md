# SRS System Audit Report

**Project:** Mashang's Chinese  
**Audit date:** 2026-03-24  
**Auditor:** Manus AI  
**Scope:** Full review of the spaced repetition system — algorithm implementation, review flow, queue management, session persistence, cloud sync, and test coverage.

---

## 1. System Overview

The application implements a spaced repetition system built on top of the **FSRS (Free Spaced Repetition Scheduler) algorithm** via the `fsrs-algorithm` npm package. Cards are stored in **IndexedDB** on the client (`ChineseReaderDB`, currently at schema version 12) and optionally synced to a cloud database via tRPC mutations. The system supports two card types per word — **recognition** (Chinese → English, `cardId` suffix `-a`) and **production** (English → Chinese, suffix `-b`) — though production cards are only created when the "Reversible Cards" setting is enabled.

The codebase also contains a complete legacy **SM-2 implementation** (`shared/sm2.ts`) that is no longer called by the main review flow but remains in the repository. Several legacy field aliases (`interval`, `repetition`, `easeFactor`) are preserved on the `Flashcard` interface and kept in sync alongside the canonical FSRS fields, primarily to support the cloud sync serialisation format and any old clients that may still read them.

---

## 2. Review Flow

### 2.1 Entry Point and Queue Initialisation

When the user opens the Deck page, the component (`client/src/pages/Deck.tsx`) initialises the review queue in its `useState` lazy initialisers. For the main deck (non-story mode), it calls `loadAndMergeSession(currentDueCardIds)` from `useDeckSession.ts`, which attempts to restore a saved session from `localStorage` under the key `cr-deck-session-v2`. If a valid saved session exists and is less than 24 hours old, the saved queue is merged with the current set of due cards; otherwise the queue is rebuilt from scratch. For story mode, the queue is populated asynchronously once story word IDs are loaded from IndexedDB.

The queue is ordered with **new cards first** (shuffled), then **due/overdue cards** (shuffled). New cards are identified by `lastReviewed === null`. This ordering is applied in `startReview()` and in the story-mode `useEffect`, but notably **not** in the session-restore path — a restored session preserves the order from the previous session, which may differ from the new-first ordering.

### 2.2 Rating Buttons

The review UI presents four FSRS rating buttons after the card is flipped: **Again (1)**, **Hard (2)**, **Good (3)**, and **Easy (4)**. Each button displays a preview of the resulting interval, computed by `previewIntervals()` in `Deck.tsx`. An **"I Know"** shortcut button is always visible (pre- and post-flip) and maps directly to Good (rating 3). A **Skip** button defers the current card to the end of the queue without writing any SRS data.

### 2.3 The `handleReview` Function

`handleReview` in `Deck.tsx` is the central dispatch point for all review actions:

| Rating | Behaviour |
|--------|-----------|
| **1 (Again)** | Calls `reviewFlashcard(cardId, 1)`, which runs the full FSRS scheduler. Requeues the card 2–3 positions ahead in the current session queue. Does **not** count toward `todayReviews` (daily cap). Shows a toast. |
| **2 / 3 / 4 (Hard / Good / Easy)** | Checks the daily review cap. Calls `reviewFlashcard(cardId, rating)`. Increments `sessionReviewed` and `todayReviews`. Advances `currentIdx`. |

### 2.4 `reviewFlashcard` in AppContext

`reviewFlashcard` (in `AppContext.tsx`) calls `applyFSRS(card, rating, desiredRetention)` for **all** ratings including Again. It then writes the result to IndexedDB via `FlashcardDB.update(cardId, updates)`. For ratings other than 1, it also increments the `ReviewLog` daily counter. For rating 1, it records a `WordMistake` entry (used for the "Suggested Re-read" feature). A `CardReviewHistory` entry is written for all ratings (fire-and-forget).

---

## 3. FSRS Algorithm Implementation

### 3.1 Core Scheduler

`applyFSRS` in `client/src/lib/db.ts` wraps the `fsrs-algorithm` library. It converts the local `Flashcard` to the library's `Card` shape via `toLibCard()`, calls `scheduler.schedule(libCard, now)`, and picks the result branch for the given rating. The scheduler instance is cached and rebuilt only when `desiredRetention` changes.

### 3.2 Progressive Interval Cap

A custom `capInterval` function is applied **on top of** the FSRS-computed interval for ratings 2–4 (Hard, Good, Easy). The cap is based on `reps` (successful reviews after this review):

| Reps after review | Max interval |
|-------------------|-------------|
| ≤ 1 | 1 day |
| 2 | 3 days |
| 3 | 7 days |
| 4–5 | 14 days |
| ≥ 6 | 30 days |

This cap is intentionally conservative and is applied **before** the due date is written to the database. Critically, the FSRS fields `stability` and `difficulty` are preserved at their FSRS-computed values even when the interval is capped — meaning the model's internal state diverges from the actual schedule. Over time, FSRS will compute intervals based on a stability that implies the card was reviewed at a longer interval than it actually was, which will cause the scheduler to underestimate how quickly the user forgets the card.

### 3.3 Again Handling

For rating 1 (Again), `applyFSRS` does **not** apply the `capInterval` function (the raw FSRS-computed interval is used). The FSRS library moves the card to `Relearning` state and computes a short relearning interval (typically minutes to hours for a card in Review state). However, the actual due date written to the database for an Again press is the FSRS-computed relearning interval — the card will be due again in a matter of minutes or hours. In practice, the in-session requeue (2–3 cards ahead) means the user sees the card again within the same session, but the database due date is also updated to reflect the relearning interval. This is correct FSRS behaviour.

### 3.4 `desiredRetention` Parameter

The `desiredRetention` setting (default 0.85, range 0.70–0.99) is read from `settingsRef.current.desiredRetention` in `reviewFlashcard`. It is passed to `applyFSRS` and used to configure the FSRS scheduler. The setting is stored in IndexedDB via `SettingsDB`.

**Finding:** `desiredRetention` is **not included** in the cloud sync payload. The `cr-settings-v1` object pushed to and pulled from the server contains `dailyNewWordCap`, `dailyReviewCap`, `showCapReachedPopup`, `testingMode`, `cardSize`, `enableReversibleCards`, and `flashcardSource` — but not `desiredRetention`. A user who changes their retention target on one device will not have that setting restored when logging in on another device or after clearing browser data.

### 3.5 Leech Detection

Cards with `lapses >= 5` (the `LEECH_THRESHOLD` constant from `shared/sm2.ts`) are flagged as `isLeech = true`. Leech cards are excluded from `getDueCards()` in AppContext and displayed in a separate "Leech Review" section in the Deck UI. The threshold is a hardcoded constant and is not user-configurable.

---

## 4. Queue Management

### 4.1 `getDueCards` (AppContext)

`getDueCards` returns all cards where `dueDate <= now` and `isLeech === false`. Completed words (in `completedWordIds`) are **not** excluded from the queue — this is intentional and documented: "completed" is a visual badge only. The `flashcardSource` setting filters by word origin (texts, vocab, manual, or all). Cards are sorted oldest-due first.

### 4.2 `getDueStats` (db.ts)

`getDueStats` counts cards into three buckets: `newCards` (never reviewed), `overdue` (due before today), and `dueToday` (due today or new). The `_completedWordIds` parameter is accepted for API compatibility but is no longer used to suppress cards — completed words are counted. Leech cards are **not** counted in any bucket (they are excluded silently, with no count returned).

**Finding:** The `getDueStats` function in `db.ts` (used by AppContext and the dashboard) does not return a leech count. The legacy `getDueStats` in `shared/sm2.ts` does return `leechCards`. The two implementations are inconsistent. The dashboard therefore cannot display a leech count without reading the flashcard list directly.

### 4.3 Daily Cap Enforcement

The daily review cap (`dailyReviewCap`) is checked in `handleReview` in `Deck.tsx` before calling `reviewFlashcard` for ratings 2–4. The check compares `todayReviews` (an in-memory counter from AppContext) against the cap. Again (rating 1) is **not** subject to the cap — a user can press Again unlimited times without consuming their daily review budget. This is consistent with standard SRS practice (lapses are not counted as completed reviews).

The daily new word cap (`dailyNewWordCap`) is checked in `addWordToDeck` in AppContext, not in the review flow. It limits how many new words can be added to the deck per day, not how many new cards appear in a session.

**Finding:** The daily review cap is enforced at the UI level in `handleReview`, but `reviewFlashcard` itself does not enforce it. If `reviewFlashcard` is called from any other code path (e.g., a future bulk-review feature or a test), the cap would be bypassed silently.

---

## 5. Session Persistence

### 5.1 Storage Key and Schema

Session state is persisted to `localStorage` under the key `cr-deck-session-v2`. The schema is `{ queue: string[], currentIdx: number, sessionReviewed: number, requeuedIds: string[], savedAt: number }`. Sessions expire after 24 hours (checked via `savedAt`).

### 5.2 Merge Logic (`loadAndMergeSession`)

On page load, `loadAndMergeSession(currentDueCardIds)` performs the following merge:

1. Loads the saved session from `localStorage`.
2. If the session is older than 24 hours, resets to the full current due set with `currentIdx=0`.
3. Otherwise, keeps saved queue entries that are still in the current due set and not yet reviewed in this session.
4. Appends any newly due cards not already in the saved queue.
5. Filters `requeuedIds` to only IDs still in the due set.

**Finding:** The merge logic does not re-apply the new-cards-first ordering when appending newly due cards. Newly due cards are appended to the end of the restored queue, so they will appear after all the cards from the previous session, regardless of whether they are new or review cards.

### 5.3 Test Coverage Gap

The test file `useDeckSession.test.ts` tests `loadSession`, `saveSession`, and `clearSession`, but does **not** test `loadAndMergeSession` at all. Additionally, two tests in that file write to `cr-deck-session-v1` (the old key) while the implementation uses `cr-deck-session-v2`, meaning those tests do not exercise the active code path.

---

## 6. Cloud Sync

### 6.1 Architecture

Cloud sync is handled by `useSyncManager` (`client/src/hooks/useSyncManager.ts`). It performs a full bidirectional sync: pull cloud data → merge into local IndexedDB → push merged local data to cloud. Sync is triggered automatically 1.5 seconds after login, periodically every 3 minutes, and debounced 10 seconds after any user action via `notifyChange()`.

### 6.2 Flashcard Merge Strategy

The merge strategy for flashcards is **last-write-wins based on `lastReviewed`**. If `cloudLR >= localLR` (including ties), the cloud card wins. When the cloud card wins, a new local card is constructed by calling `createFSRSCard(wordId, cardType)` and overlaying the cloud fields. This reconstruction has two notable behaviours:

1. **`state` is recomputed from `reps`**, not preserved from the cloud: if `reps === 0`, state is set to `0` (New); otherwise it is set to `2` (Review). This means a card that is in `Relearning` state (state 3) on the cloud will be reconstructed as `Review` state locally after a sync. The card will then be scheduled as if it is in Review state, not Relearning state, which can produce a longer interval than FSRS would have computed for a Relearning card.

2. **`nextReviewDate` is derived from `dueDate`** rather than preserved directly, which is harmless since `nextReviewDate` is a display alias for `dueDate`.

### 6.3 Missing `desiredRetention` in Sync

As noted in Section 3.4, `desiredRetention` is not included in the sync payload. This is the most impactful missing field: if a user sets a high retention target (e.g., 0.95) on their primary device, that setting will not be restored on a new device or after clearing browser data. All cards will be scheduled using the default 0.85 retention until the user manually reconfigures the setting.

### 6.4 Word Mistake Merge

Word mistakes are merged by replaying `recordMiss()` until the local count reaches the cloud count. This is correct for the "take max" strategy but has a side effect: each call to `recordMiss()` updates `lastMissed` to the current time. If the cloud has a higher miss count than local, the `lastMissed` timestamp will be set to the sync time rather than the actual time of the last mistake.

### 6.5 Story Deck Sync

Story deck sync is wrapped in a `try/catch` that silently swallows all errors (`/* story deck sync is best-effort */`). If story deck push fails, no error is surfaced to the user and the sync status is still reported as `success`.

### 6.6 Sync Error Handling

If any step in the `triggerSync` function throws, the entire sync is marked as failed and `hasSyncedRef.current` is reset to `false`, which will cause the sync to retry on the next trigger. Individual step failures (e.g., a single push mutation failing) will abort the rest of the sync for that cycle. There is no partial-success handling or retry logic for individual steps.

---

## 7. Data Integrity

### 7.1 Legacy Field Aliases

The `Flashcard` interface carries three deprecated aliases — `interval` (= `scheduledDays`), `repetition` (= `reps`), `easeFactor` (= `difficulty`) — that are kept in sync by `applyFSRS`. These aliases are used in the `CardReviewHistory` log entries and in the cloud sync serialisation. The aliases are correctly maintained in `applyFSRS` but are not updated by `applyDontKnow`, which means if `applyDontKnow` were ever called directly (it is currently exported but not called in the main flow), the aliases would drift from the canonical fields.

### 7.2 `applyDontKnow` Still Exported

`applyDontKnow` in `db.ts` is still exported and imported in `AppContext.tsx` (the import statement remains even though the function is no longer called in the review flow). This creates a risk that a future developer might call it thinking it is the correct path for Again responses.

### 7.3 SM-2 Module Still Present

`shared/sm2.ts` contains a complete SM-2 implementation including `applySM2`, `applyDontKnow`, `buildSessionQueue`, and `getDueStats`. These functions are no longer called by the main review flow. The module is imported in `db.ts` only for the `toISODate`, `fromISODate`, `SM2Quality`, and `LEECH_THRESHOLD` constants. The presence of the full SM-2 logic alongside the FSRS implementation is a source of confusion and a maintenance burden.

### 7.4 Interval Cap and FSRS Model Divergence

As described in Section 3.2, the progressive interval cap modifies the due date without modifying `stability`. This means the FSRS model's internal state (stability, difficulty) reflects what FSRS computed, but the actual review interval the user experienced is shorter. On the next review, FSRS will compute `elapsedDays` based on the actual time since the last review (which is correct), but its stability update formula assumes the previous interval was `scheduledDays` — which is the capped value, not the FSRS-optimal value. In practice this means FSRS will slightly underestimate stability growth for well-known cards, causing them to be reviewed more frequently than the pure FSRS algorithm would prescribe. This is a deliberate design choice (the cap comment says "Cards should pile up and be seen frequently until proven solid"), but it is worth noting that it causes a systematic divergence from standard FSRS behaviour.

### 7.5 `ReviewLogDB.incrementReview` Not Called for Again

`ReviewLogDB.incrementReview()` is called in `reviewFlashcard` only when `rating !== 1`. This means Again responses do not count toward the daily review log or streak. This is consistent with the daily cap logic (Again is not capped) and is intentional, but it means the streak counter and review history undercount the total number of card interactions in a session.

---

## 8. Test Coverage Summary

| Area | Covered | Not Covered |
|------|---------|-------------|
| `getDueStats` (db.ts) | ✅ Due/overdue/new counting; completed words not suppressed | ❌ Leech cards not counted |
| `applyFSRS` | ✅ desiredRetention effect; Again < Good interval; positive interval | ❌ State transitions; capInterval interaction; legacy alias sync |
| `createFSRSCard` | ✅ dueDate=now; lastReviewed=null; reps=0 | — |
| `useDeckSession` | ✅ Save/load/clear; requeuedIds restore; malformed JSON | ❌ `loadAndMergeSession`; active storage key (`v2` not `v1`) |
| `reviewFlashcard` | ❌ Not tested | — |
| Cloud sync merge | ❌ Not tested | — |
| Daily cap enforcement | ❌ Not tested | — |
| Leech detection | ❌ Not tested | — |

---

## 9. Summary of Findings

The table below lists every finding from this audit, categorised by severity.

| # | Area | Finding | Severity |
|---|------|---------|----------|
| F1 | Sync | `desiredRetention` not included in cloud sync payload — lost on new device or after data clear | **Medium** |
| F2 | Sync | `state` field recomputed from `reps` on cloud pull instead of preserved — Relearning cards become Review after sync | **Medium** |
| F3 | Algorithm | Progressive interval cap modifies due date without modifying `stability` — causes systematic FSRS model divergence over time | **Medium** |
| F4 | Queue | `loadAndMergeSession` does not re-apply new-cards-first ordering when appending newly due cards to a restored session | **Low** |
| F5 | Data | `applyDontKnow` is still exported and imported but no longer called — risk of accidental use by future developers | **Low** |
| F6 | Data | `getDueStats` in `db.ts` does not return a leech count, unlike the legacy version in `shared/sm2.ts` — inconsistency between the two implementations | **Low** |
| F7 | Data | Word mistake `lastMissed` timestamp is set to sync time rather than actual miss time when cloud count exceeds local count | **Low** |
| F8 | Sync | Story deck sync errors are silently swallowed — sync reports success even if story decks fail to push | **Low** |
| F9 | Tests | `loadAndMergeSession` has no test coverage | **Low** |
| F10 | Tests | Two `useDeckSession` tests write to `cr-deck-session-v1` but the implementation uses `cr-deck-session-v2` — those tests do not exercise the active code path | **Low** |
| F11 | Code | `shared/sm2.ts` contains a full SM-2 implementation that is no longer used in the review flow — maintenance burden and source of confusion | **Info** |
| F12 | Code | Daily review cap is enforced only in `handleReview` (UI layer), not in `reviewFlashcard` itself — cap can be bypassed by non-UI callers | **Info** |

---

*End of report.*
