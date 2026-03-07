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
