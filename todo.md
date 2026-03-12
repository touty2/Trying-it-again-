# Chinese Reader — Project TODO

## Core Infrastructure
- [x] Manus scaffold (web-db-user) initialized
- [x] All source files migrated from uploaded zip
- [x] Database schema migrated (users, flashcards, decks, grammar, sync tables)
- [x] Standalone email/password auth (register/login/logout via JWT cookie)
- [x] tRPC routers: sync, grammar, video, storyGrammar, vocabIgnored, decks
- [x] Startup migration runner (isLeech column + indexes)
- [x] Google Fonts loaded (Inter, Noto Sans SC, Noto Serif SC, Ma Shan Zheng)

## Client Features
- [x] Interactive Chinese text reader (StoryPage) with word segmentation
- [x] CC-CEDICT dictionary lookup and pinyin display (WordPopup)
- [x] FSRS + SM2 spaced repetition algorithms (shared/sm2.ts)
- [x] Flashcard deck management (Deck page, DecksSidebar, DeckAssignPopup)
- [x] Custom named decks with include/exclude toggles
- [x] Story-based decks (StoryDeckPanel)
- [x] Grammar pattern tracking (GrammarPage, GrammarProgressContext)
- [x] Story-specific grammar analysis (GrammarInStory)
- [x] Video learning page with YouTube transcript extraction (VideoLearningPage)
- [x] Cloud sync for flashcards, grammar, decks, ignored vocab, segmentation overrides
- [x] IndexedDB offline storage (client/src/lib/db.ts)
- [x] Segmentation override system (user-correctable word boundaries)
- [x] Settings page with theme, typography, TTS configuration
- [x] Dashboard with learning stats and progress charts
- [x] Sessions page for SRS review
- [x] Vocab page for vocabulary browsing
- [x] Login page (standalone email/password)
- [x] Sidebar navigation + mobile bottom tab bar
- [x] Dark/light theme toggle
- [x] SyncContext for background cloud sync
- [x] AuthContext + useAuth hook

## Tests
- [x] auth.logout.test.ts
- [x] decks.test.ts
- [x] fsrs.test.ts
- [x] grammar.test.ts
- [x] nameDetection.test.ts
- [x] segmentation.test.ts
- [x] senses.test.ts
- [x] settings.sync.test.ts
- [x] srs.dates.test.ts
- [x] srs.remaining.test.ts
- [x] srs.test.ts
- [x] sync.easeFactor.test.ts
- [x] useDeckSession.test.ts

## Future Enhancements
- [ ] Password reset flow (token table exists, email sending not configured)
- [ ] Admin panel for user management
- [ ] Export vocabulary to Anki/CSV

## Targeted Fixes (User Request)
- [x] Fix 1: Diagnose flashcard review queue — check due date calculation, overdue card inclusion, unintentional filters
- [x] Fix 2: Patch dictionary completeness — fill missing definitions, correct inaccurate ones
- [x] Fix 3: Fix story endings — cut irrelevant final paragraphs, add relevant conclusions for all stories
- [x] Fix 4a: TTS word highlighting — highlight current word/phrase as it is spoken
- [x] Fix 4b: TTS voice quality — add best Mandarin voices, Northern accent preferred, no Cantonese
- [x] Fix 4c: TTS male voice toggle — ensure male voice works and is high quality
- [x] Story coherence audit — identify and fix all stories with abrupt topic shifts, inconsistent characters, or nonsensical jumps
