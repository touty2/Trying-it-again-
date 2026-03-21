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
