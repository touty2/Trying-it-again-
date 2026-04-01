-- ============================================================
-- RENDER DATABASE MIGRATION
-- Run this in your Render database console (MySQL/TiDB).
-- This migrates from the old Manus OAuth schema to the current
-- standalone email/password auth schema.
-- ============================================================

-- Step 1: Drop old tables that are no longer used or need to be recreated
-- (safe to run even if some don't exist yet)

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `story_deck_words`;
DROP TABLE IF EXISTS `story_decks`;
DROP TABLE IF EXISTS `deck_cards`;
DROP TABLE IF EXISTS `decks`;
DROP TABLE IF EXISTS `sync_segmentation_overrides`;
DROP TABLE IF EXISTS `sync_vocab_ignored`;
DROP TABLE IF EXISTS `story_grammar_studied`;
DROP TABLE IF EXISTS `grammar_progress`;
DROP TABLE IF EXISTS `sync_preferences`;
DROP TABLE IF EXISTS `sync_word_mistakes`;
DROP TABLE IF EXISTS `sync_completed_texts`;
DROP TABLE IF EXISTS `sync_flashcards`;
DROP TABLE IF EXISTS `users`;

SET FOREIGN_KEY_CHECKS = 1;

-- Step 2: Create users table with email/password auth (replaces openId-based table)
CREATE TABLE `users` (
  `id` int AUTO_INCREMENT NOT NULL,
  `email` varchar(320) NOT NULL,
  `passwordHash` varchar(256) NOT NULL,
  `name` text,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `users_id` PRIMARY KEY(`id`),
  CONSTRAINT `users_email_unique` UNIQUE(`email`)
);

-- Step 3: Create sync_flashcards
CREATE TABLE `sync_flashcards` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `cardId` varchar(160) NOT NULL,
  `wordId` varchar(128) NOT NULL,
  `cardType` enum('recognition','production') NOT NULL DEFAULT 'recognition',
  `hanzi` varchar(64) NOT NULL,
  `pinyin` varchar(256) NOT NULL,
  `simpleDefinition` text NOT NULL,
  `contextualMeaning` text,
  `otherMeanings` json,
  `examplePairsJson` json,
  `sourceTextId` varchar(128),
  `addedManually` boolean NOT NULL DEFAULT false,
  `stability` decimal(10,4) NOT NULL DEFAULT '0.0000',
  `difficulty` decimal(10,4) NOT NULL DEFAULT '5.0000',
  `scheduledDays` int NOT NULL DEFAULT 0,
  `elapsedDays` int NOT NULL DEFAULT 0,
  `reps` int NOT NULL DEFAULT 0,
  `lapses` int NOT NULL DEFAULT 0,
  `isLeech` boolean NOT NULL DEFAULT false,
  `state` int NOT NULL DEFAULT 0,
  `easeFactor` decimal(5,2) NOT NULL DEFAULT '2.50',
  `interval` int NOT NULL DEFAULT 1,
  `repetition` int NOT NULL DEFAULT 0,
  `dueDate` bigint NOT NULL,
  `lastReviewed` bigint,
  `isCompleted` boolean NOT NULL DEFAULT false,
  `completedAt` bigint,
  `completedForward` boolean NOT NULL DEFAULT false,
  `completedReverse` boolean NOT NULL DEFAULT false,
  `createdAt` bigint NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `sync_flashcards_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_sync_flashcards_user_card`(`userId`, `cardId`),
  INDEX `idx_sync_flashcards_user_due`(`userId`, `dueDate`),
  INDEX `idx_sync_flashcards_user_reviewed`(`userId`, `lastReviewed`)
);

-- Step 4: Create sync_completed_texts
CREATE TABLE `sync_completed_texts` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `textId` varchar(128) NOT NULL,
  `completedAt` bigint NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `sync_completed_texts_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_sync_completed_texts_user_text`(`userId`, `textId`)
);

-- Step 5: Create sync_word_mistakes
CREATE TABLE `sync_word_mistakes` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `wordId` varchar(128) NOT NULL,
  `sourceTextId` varchar(128),
  `missCount` int NOT NULL DEFAULT 0,
  `lastMissed` bigint NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `sync_word_mistakes_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_sync_word_mistakes_user_word`(`userId`, `wordId`)
);

-- Step 6: Create sync_preferences
CREATE TABLE `sync_preferences` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `key` varchar(128) NOT NULL,
  `value` text NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `sync_preferences_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_sync_preferences_user_key`(`userId`, `key`)
);

-- Step 7: Create grammar_progress
CREATE TABLE `grammar_progress` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `grammarId` varchar(128) NOT NULL,
  `seen` boolean NOT NULL DEFAULT false,
  `dismissed` boolean NOT NULL DEFAULT false,
  `seenAt` bigint,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `grammar_progress_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_grammar_progress_user_grammar`(`userId`, `grammarId`)
);

-- Step 8: Create story_grammar_studied
CREATE TABLE `story_grammar_studied` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `storyId` varchar(128) NOT NULL,
  `grammarId` varchar(128) NOT NULL,
  `studiedAt` bigint NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `story_grammar_studied_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_story_grammar_studied`(`userId`, `storyId`, `grammarId`)
);

-- Step 9: Create sync_vocab_ignored
CREATE TABLE `sync_vocab_ignored` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `vocabId` varchar(128) NOT NULL,
  `ignoredAt` timestamp NOT NULL DEFAULT (now()),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `sync_vocab_ignored_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_vocab_ignored_user_vocab`(`userId`, `vocabId`)
);

-- Step 10: Create sync_segmentation_overrides
CREATE TABLE `sync_segmentation_overrides` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `key` varchar(256) NOT NULL,
  `splitsJson` text NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `sync_segmentation_overrides_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_seg_override_user_key`(`userId`, `key`)
);

-- Step 11: Create story_decks
CREATE TABLE `story_decks` (
  `id` int AUTO_INCREMENT NOT NULL,
  `userId` int NOT NULL,
  `storyId` varchar(64) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `story_decks_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_story_decks_user_story`(`userId`, `storyId`)
);

-- Step 12: Create story_deck_words
CREATE TABLE `story_deck_words` (
  `id` int AUTO_INCREMENT NOT NULL,
  `storyDeckId` int NOT NULL,
  `wordId` varchar(64) NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `story_deck_words_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_story_deck_words_deck_word`(`storyDeckId`, `wordId`)
);

-- Step 13: Create decks
CREATE TABLE `decks` (
  `id` varchar(64) NOT NULL,
  `userId` int NOT NULL,
  `name` varchar(128) NOT NULL,
  `isMain` boolean NOT NULL DEFAULT false,
  `included` boolean NOT NULL DEFAULT true,
  `settings` json,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `decks_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_decks_user_id`(`userId`, `id`)
);

-- Step 14: Create deck_cards
CREATE TABLE `deck_cards` (
  `id` int AUTO_INCREMENT NOT NULL,
  `deckId` varchar(64) NOT NULL,
  `userId` int NOT NULL,
  `wordId` varchar(128) NOT NULL,
  `addedAt` timestamp NOT NULL DEFAULT (now()),
  CONSTRAINT `deck_cards_id` PRIMARY KEY(`id`),
  UNIQUE INDEX `uq_deck_cards_deck_word`(`deckId`, `wordId`)
);

-- Done. All tables created with correct schema.
-- You can now register a new account and all sync operations will work correctly.
