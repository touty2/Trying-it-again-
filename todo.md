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
