# Mashang's Chinese Reader — TODO

- [x] Migrate drizzle schema (all tables)
- [x] Migrate server/db.ts helpers
- [x] Migrate server/routers.ts and all sub-routers
- [x] Migrate server/migrations.ts, server/storage.ts
- [x] Migrate shared/ files (types, sm2, const, errors)
- [x] Migrate client source (components, pages, hooks, styles)
- [x] Install extra dependencies (bcryptjs, fsrs-algorithm, etc.)
- [x] Run DB migrations via webdev_execute_sql
- [x] Fix TypeScript errors (fsrs camelCase, duplicate keys, rating types)
- [x] Verify dev server builds and runs (0 TS errors, server on :3000)
- [x] Save checkpoint
- [x] Flashcard back face: fall back to CEDICT lookup when definition field is empty
- [x] Fix cross-reference "see X" definitions — resolve to real definition instead
- [x] Fix remaining numeric pinyin (e.g. li4 jiang1) still showing in some display sites
- [x] Add "Add to deck" dropdown in manual Add Word dialog (Deck.tsx)
- [x] Story/session word addition always targets Main Deck only
- [x] Fix ManualAddDialog deck dropdown not showing custom decks
- [x] Fix Add Word auto-fill: 提高 and similar words get wrong/noisy CEDICT definitions (CL classifiers, cross-refs)
- [x] Clear all fields when hanzi input is emptied in Add Word dialog
- [x] Fix TTS highlight sync lag (advance sentence on first boundary event)

## Story Deck Enhancements
- [x] Story Practice Mode: "Practice This Story's Words" button in StoryDeckPanel
- [x] Story Practice Mode: isolated session (does not affect main SRS)
- [x] Story Practice Mode: "Reset / Start Over" button to reset practice progress
- [x] Word Management: search bar on Deck "All Words" list view
- [x] Word Management: full word deletion with confirmation dialog (AlertDialog)

## Story Deck Bug Fixes
- [x] Fix: story deck words disappear after navigating away and back
- [x] Add: "Return to Story" button on filtered deck review page
- [x] Verify: story deck filter shows only story words and behaves like a story deck
- [x] Fix: story deck Review button opens main deck instead of filtered story deck

## Dictionary Quality Fixes
- [x] Fix truncated definitions in cedict lookup pipeline
- [x] Fix wrong pinyin / wrong reading selection (e.g. 派 showing pa1 instead of pai4)
- [x] Fix missing common meanings in formatDefinitions
- [x] Add validation guard: reject truncated/empty definitions before saving
- [x] Verify 派 and other known-bad entries are correct after fix

## SRS Scheduling Fix
- [x] Audit FSRS interval growth parameters (stability, difficulty, desired retention)
- [x] Fix getDueCards: completed words no longer excluded from queue (was the root cause of 8 due)
- [x] Fix getDueStats: completed words no longer suppressed from counts
- [x] Add desiredRetention field to Settings and wire into FSRS scheduler
- [x] Add Desired Retention slider to Flashcard Settings in SettingsPage
- [x] Update toast messages: "learned" no longer says "excluded from review queue"

## Deck Reset Controls
- [x] Add resetDueDates helper to db.ts (sets all dueDate = now, keeps SRS data)
- [x] Add resetDeck helper to db.ts (full reset: reps=0, interval=0, dueDate=now, state=New)
- [x] Expose both helpers via AppContext
- [x] Add Reset Due Dates button + AlertDialog confirmation to Deck page
- [x] Add Reset Deck button + AlertDialog confirmation to Deck page
- [x] Add descriptions under each button explaining what they do

## UX Cleanup
- [x] Move Reset Due Dates and Reset Deck buttons from Deck page header to Flashcard Settings page only

## Flashcard Visual Fix
- [x] Restore solid opaque flashcard background (was accidentally made semi-transparent)

## Render Deployment Fix
- [x] Replace all OKLCH CSS color values with HSL/hex for cross-browser compatibility

## Flashcard Transparency Bug (Persistent)
- [x] Definitively trace and fix faded/semi-transparent flashcard appearance — root cause: @theme inline used var() references which are compile-time only in Tailwind 4; fixed by using literal HSL values

## Manus Scaffold Restoration (Mar 2026)
- [x] Restored from Trying-it-again--main.zip into web-db-user scaffold
- [x] All server _core files replaced with standalone email/password auth versions
- [x] All 14 database tables created via webdev_execute_sql
- [x] Extra dependencies installed (fsrs-algorithm, bcryptjs, ai, etc.)
- [x] TypeScript compiles with 0 errors
- [x] Checkpoint saved — project ready to edit

## Flashcard UX Fixes (requested)
- [x] Remove SRS-based opacity/transparency from flashcard cards — all cards must look identical regardless of learned/new state
- [x] Simplify review flow to a single "I Know" button (works pre and post flip, always records correct + advances)
- [x] Remove separate pre-flip / post-flip "I know" inconsistency
- [x] Add "Skip" button — defers card to end of queue without touching SRS schedule

## Button Layout Restoration (requested)
- [x] Restore original Again/Hard/Good/Easy grid in original positions (shown after flip)
- [x] Add Skip button below the grid (secondary, non-replacing)
- [x] "mark as learned" is a small underline link in the utility row — not a primary action button
- [x] Speaker + slow toggle remain in the always-visible utility row above the review grid

## Pre-flip I Know shortcut (requested)
- [x] Add "I Know" button always visible below the card (pre and post flip) — same action as Good (rating 3), just a shortcut

## Again Button FSRS Fix (requested)
- [x] Fix reviewFlashcard rating=1 to call applyFSRS(card, Rating.Again) instead of applyDontKnow — ensures FSRS state (stability, state, scheduledDays) is properly updated on every Again press

## SRS Audit Fixes (all 12 findings)
- [x] F1: Add desiredRetention to cloud sync payload (push + pull in useSyncManager.ts)
- [x] F2: Preserve state field from cloud card during sync reconstruction instead of recomputing from reps
- [x] F3: Fix interval cap divergence — update stability to reflect capped interval so FSRS model stays consistent
- [x] F4: Re-apply new-cards-first ordering when appending newly due cards in loadAndMergeSession
- [x] F5: Remove applyDontKnow export and unused import from AppContext.tsx
- [x] F6: Add leech count to getDueStats return value in db.ts
- [x] F7: Preserve actual lastMissed timestamp during sync instead of overwriting with sync time
- [x] F8: Surface story deck sync errors instead of silently swallowing them
- [x] F9: Add loadAndMergeSession test coverage
- [x] F10: Fix useDeckSession tests to use cr-deck-session-v2 key instead of v1
- [x] F11: Remove unused SM-2 logic from shared/sm2.ts (keep only constants)
- [x] F12: Move daily cap enforcement into reviewFlashcard so it applies to all callers

## Session Persistence Fix (requested)
- [x] Store completedUntil marker instead of deleting session on completion — sessions survive refresh/navigation until midnight, then reset daily

## Session Determinism Fix (requested)
- [x] clearSession() after resetDueDates and resetDeck in SettingsPage.tsx
- [x] Save initial queue to localStorage immediately on first build (before first review)
- [x] Use date-seeded shuffle so queue order is deterministic for the whole day

## Session / Queue UX Bugs (reported)
- [x] BUG-1: Cards marked 'Know' reappear in the same session instead of advancing
- [x] BUG-2: Same card appears multiple times within a single session (duplication)
- [x] BUG-3: New cards don't show up consistently — same small block keeps repeating
- [x] BUG-4: Due count jumps unpredictably and queue changes on refresh (should be locked for the day)

## SRS Queue Diagnosis — Data-Confirmed Bugs (2026-03-29)
- [x] BUG-A: flashcardSource='vocab' filter silently hides 66 due cards — added warning banner with 'Show All' button; getDueStats now uses filtered count so Dashboard matches Deck
- [x] BUG-B: 185 reviewed cards correctly scheduled in future (FSRS working) — explained to user; no code change needed
- [x] BUG-C: dailyNewWordCap=20 only gates addWordToDeck/addManualWord (correct) — does NOT limit review queue; all 101 state=0 cards appear in queue when source='both'

## User-Requested Features (2026-03-29)
- [x] FEAT-1: Remove flashcardSource filter UI entirely — always use 'both', remove from Settings type, getDueCards, sync, and Deck header
- [x] FEAT-2: Graduate state=0 cards — after GRADUATION_LAPSE_THRESHOLD (8) lapses + Good/Easy answer, force state to Review (2) so stuck New cards stop cycling

## Manus Scaffold Re-Restoration (Mar 31, 2026)
- [x] Restored from Trying-it-again--main(5).zip into fresh web-db-user scaffold
- [x] All 14 database tables re-applied via webdev_execute_sql
- [x] All dependencies installed (fsrs-algorithm, bcryptjs, ai, streamdown, etc.)
- [x] TypeScript compiles with 0 errors
- [x] Auth tests: 3/3 passing
- [x] Dev server running and UI confirmed healthy

## Critical Bug: Reviewed cards reappear after page refresh (Mar 31, 2026) — FIXED
- [x] ROOT CAUSE 1: cloudLR >= localLR in useSyncManager allowed equal timestamps to overwrite local reviewed state → changed to strict >
- [x] ROOT CAUSE 2: markSessionComplete() only called via 200ms debounce — sync pull could fire first → now called immediately on last card review in handleReview and handleMarkCompleted
- [x] ROOT CAUSE 3: Server SQL used >= in IF(COALESCE...) conflict resolution → changed to strict > on server too
- [x] ROOT CAUSE 4: refreshAll() never called after sync pull overwrote IndexedDB → registerRefreshAllCallback wired into SyncContext
- [x] TEST: 13 regression tests written and passing (syncOverwrite.regression.test.ts)

## DEFINITIVE FIX: Reviewed cards reappear after tab-in/refresh (Mar 31, 2026 — BUG-5)
- [x] ROOT CAUSE IDENTIFIED: visibilitychange handler in Deck.tsx had NO check for completed sessions — every tab-in called getDueCards(), found all new cards (dueDate=now), and appended them to the empty queue, instantly restoring the full deck
- [x] FIX 1: visibilitychange handler now reads completedUntil from localStorage before appending — if future, skip entirely
- [x] FIX 2: isSessionDone is now a useMemo that reads completedUntil from localStorage as a second guard — stays true even if reviewQueue is reset by a re-render
- [x] TEST: 7 new regression tests added (Bug 5 suite) — 20/20 total passing

## Dashboard Redesign (requested)
- [x] Remove clutter: collapsed 9 stat cards into 3 (Words in Deck, In Rotation, Streak)
- [x] Replace "Words Learned" (rep>=2) with "In Rotation" (lastReviewed !== null) — accurate SRS framing
- [x] Add countdown timer to next scheduled review (reads min future dueDate, updates every 30s)
- [x] Hero card: shows "X cards ready" + Review button when due, countdown when all caught up, Get Started when deck empty
- [x] Keep: Continue Reading shortcut, Band Breakdown, Today's Activity bars
- [x] Remove: Texts Completed, Suggested Re-reads, Overdue/Due Today/New breakdown row
