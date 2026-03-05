# Chinese Reader — Todo

## Core Migration
- [x] Install extra dependencies (fsrs-algorithm, bcryptjs, puppeteer-core, etc.)
- [x] Migrate drizzle/schema.ts (all tables)
- [x] Migrate drizzle/relations.ts
- [x] Migrate server/db.ts (all query helpers)
- [x] Migrate server/routers.ts + server/routers/* (grammar, sync, video, vocabIgnored, storyGrammar)
- [x] Migrate server/storage.ts
- [x] Migrate shared/const.ts, shared/sm2.ts, shared/types.ts
- [x] Migrate client/src/const.ts
- [x] Migrate client/src/lib/* (db.ts, fsrs.ts, segmentation.ts, tts.ts, storyGrammarMap.ts, videoLearning.ts, vocabData.ts, youtubeTranscript.ts, utils.ts, trpc.ts)
- [x] Migrate client contexts (AppContext, AuthContext, GrammarProgressContext, SyncContext, ThemeContext, TypographyContext, ThemeSettingsContext)
- [x] Migrate client hooks (useAudioSettings, useComposition, useFlashcardDirection, useGrammarProgress, useSyncManager, useTTS, useYouTubePlayer, useDeckSession)
- [x] Migrate client pages (Dashboard, Deck, Sessions, StoryPage, VocabPage, GrammarPage, VideoLearningPage, SettingsPage, LoginPage, NotFound)
- [x] Migrate client components (WordPopup, GrammarInStory, GrammarLessonModal, ErrorBoundary, ManusDialog, StoryDeckPanel)
- [x] Migrate client/src/App.tsx (full nav + layout)
- [x] Migrate client/src/main.tsx
- [x] Migrate index.css and tailwind config
- [x] Migrate vitest config and test files (fsrs, grammar, srs, segmentation, senses, nameDetection)
- [x] Run pnpm db:push to apply schema migrations (12 tables)
- [x] Run tests — 27 tests passing (auth.logout 3/3, grammar 3/3, fsrs 13/13, useDeckSession 8/8)
- [x] Save checkpoint and deliver

## Features
- [x] User authentication with email/password (register + login)
- [x] FSRS-based spaced repetition flashcard system with reversible cards (CN→EN / EN→CN)
- [x] Story reading interface with word segmentation, popup definitions, grammar highlighting
- [x] Story-specific flashcard decks
- [x] Grammar lessons with progress tracking
- [x] Vocabulary management with themed vocab and ignore functionality
- [x] Video learning page with YouTube transcript integration
- [x] Cloud sync system for flashcards, grammar progress, story decks, segmentation overrides
- [x] Customizable typography and theme settings with persistence
- [x] Session persistence for flashcard reviews with queue restoration

## Changes
- [x] Hide video learning feature from nav and routing (keep code intact)
- [x] Fix sync easeFactor validation rejecting cards below 1.3 minimum
