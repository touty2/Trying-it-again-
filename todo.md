# Chinese Reader — Project TODO

## Restored Features (from uploaded project)

- [x] Email/password authentication (register, login, logout, session via JWT cookie)
- [x] Role-based access control (admin / user roles)
- [x] Dashboard page with SRS stats (words in deck, learned, streak, due today, overdue, new)
- [x] Flashcard deck system with FSRS spaced repetition algorithm
- [x] Deck sessions page (review mode with forward/reverse card directions)
- [x] Grammar lessons page with progress tracking
- [x] In-story grammar highlighting (GrammarInStory component)
- [x] Grammar lesson modal (GrammarLessonModal component)
- [x] Story reading page with word popups (pinyin + definitions)
- [x] Word popup component (WordPopup) with CEDICT dictionary integration
- [x] Vocabulary management page (VocabPage) with ignored words tracking
- [x] Video learning page (VideoLearningPage) with YouTube transcript integration
- [x] Settings page with audio, theme, and typography customization
- [x] Offline-first architecture using IndexedDB (Dexie) for local data storage
- [x] Cloud sync via tRPC procedures (sync router)
- [x] CEDICT dictionary integration (client-side, lib/cedict.ts)
- [x] Text-to-speech (TTS) functionality (useTTS hook)
- [x] Audio settings (useAudioSettings hook)
- [x] Theme customization (ThemeContext, useThemeSettings)
- [x] Typography settings (TypographyContext, useTypographySettings)
- [x] Segmentation override support (user-defined word splits)
- [x] Story deck panel (StoryDeckPanel component)
- [x] Deck assignment popup (DeckAssignPopup component)
- [x] Decks sidebar (DecksSidebar component)
- [x] Comprehensive shadcn/ui component library
- [x] Database schema: users, sync_flashcards, sync_preferences, sync_completed_texts, sync_vocab_ignored, sync_word_mistakes, sync_segmentation_overrides, grammar_progress, story_decks, story_deck_words, story_grammar_studied, password_reset_tokens, decks, deck_cards (15 tables total)
- [x] Server routers: sync, grammar, video, storyGrammar, vocabIgnored, decks
- [x] GitHub repository linked: touty2/Trying-it-again-

## Pending / Future Work

- [ ] Password reset flow (token table exists, REST endpoint not yet wired)
- [ ] Admin panel / user management UI
- [ ] YouTube API key integration for video transcript fetching
- [ ] Export / import vocabulary data

## SRS Algorithm Fix (implemented)

- [x] Replace FSRS 4-button (Again/Hard/Good/Easy) with 2-button Know/Don't Know interface
- [x] Don't Know resets repetition to 0, schedules 1 day, requeues card in session
- [x] Session-aware sessionMissed flag: Don't Know then Know → 1 day (not 4)
- [x] Correct interval schedule: rep1=1d → rep2=4d → rep3=10d → exponential (prev×EF)
- [x] Ease factor: starts 2.5, +0.1 on Know (max 5.0), -0.2 on Don't Know (min 1.3)
- [x] MAX_INTERVAL_DAYS cap at 3650 days (10 years)
- [x] Cards never disappear — requeue until interval exceeds max
- [x] Spacebar shortcut: flip card → Know (was "Good" rating 3, now rating 2)
- [x] SRS algorithm tests written in server/srs.test.ts

## SRS Session Queue Fix (in progress)

- [x] Don't Know: move card to end of session queue (not just requeue, must use card object with missedInSession flag)
- [x] Know: remove card from session, schedule using pre-Know repetition count
- [x] missedInSession tracked per-card object in session queue (not derived from requeuedWordIds set)
- [x] missedInSession=true on Know → set repetitions=1, interval=1 day
- [x] Interval schedule uses pre-Know rep: rep=0→1d, rep=1→4d, rep=2→10d, rep≥3→prev×EF

## SRS Date Pipeline Audit & Fix (in progress)

- [x] sm2.ts: dueDate calculated as absolute UTC timestamp (now + interval * 86400000)
- [x] db.ts: getDueCards compares dueDate <= Date.now() in UTC, sorts oldest-first
- [x] db.ts: IndexedDB stores dueDate as numeric UTC timestamp (not relative offset)
- [x] sync router: dueDate serialized/deserialized correctly (no timezone drift)
- [x] DB schema: sync_flashcards has BIGINT(ms) for dueDate and lastReviewed (correct)
- [x] DB schema: composite index (userId, dueDate) and (userId, lastReviewed) added
- [x] Tests: 21/21 date pipeline tests pass (srs.dates.test.ts)

## SRS Remaining Items (in progress)

- [x] Item 1: Backlog priority — overdue cards sorted oldest dueDate first (ascending) — verified correct
- [x] Item 2: Ease factor clamping — never below 1.3 or above 5.0 — verified correct
- [x] Item 3: Sync conflict resolution — GREATEST(lastReviewed) logic added to server/db.ts upsertSyncFlashcards
- [x] Item 4: Daily review cap slider in Settings (10–500 + Unlimited) — ReviewCapSlider component added
- [x] Item 5: Review logging — CardReviewHistoryDB added (IndexedDB v11), logged in AppContext.reviewFlashcard

## SRS Learner-First Upgrade (in progress)

- [x] Item 1: Failed cards reappear 2-3 cards later (insert at currentIdx+3 in Deck.tsx)
- [x] Item 2: Leech detection — 5+ fails → isLeech=true, excluded from queue, shown in post-session leech section
- [x] Item 3: Gradual interval growth + ±5% fuzziness for intervals ≥10d, ease clamped [1.3, 5.0]
- [x] Item 4: MAX_INTERVAL_DAYS reduced to 365 (was 3650) — easy cards resurface at least annually
- [x] Item 5: New cards (lastReviewed=null) placed first in session queue before due cards
