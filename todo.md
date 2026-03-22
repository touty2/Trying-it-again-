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
