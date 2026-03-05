CREATE TABLE `grammar_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`completed` boolean NOT NULL DEFAULT false,
	`completedAt` bigint,
	`masteryScore` int,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `grammar_progress_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_grammar_progress_user_lesson` UNIQUE(`userId`,`lessonId`)
);
--> statement-breakpoint
CREATE TABLE `password_reset_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`token` varchar(128) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `password_reset_tokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `password_reset_tokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `story_deck_words` (
	`id` int AUTO_INCREMENT NOT NULL,
	`storyDeckId` int NOT NULL,
	`wordId` varchar(64) NOT NULL,
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `story_deck_words_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_story_deck_words_deck_word` UNIQUE(`storyDeckId`,`wordId`)
);
--> statement-breakpoint
CREATE TABLE `story_decks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`storyId` varchar(64) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `story_decks_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_story_decks_user_story` UNIQUE(`userId`,`storyId`)
);
--> statement-breakpoint
CREATE TABLE `story_grammar_studied` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`textId` varchar(64) NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`studiedAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `story_grammar_studied_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_story_grammar_user_text_lesson` UNIQUE(`userId`,`textId`,`lessonId`)
);
--> statement-breakpoint
CREATE TABLE `sync_completed_texts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`textId` varchar(128) NOT NULL,
	`completedAt` bigint NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sync_completed_texts_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_sync_completed_texts_user_text` UNIQUE(`userId`,`textId`)
);
--> statement-breakpoint
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
	CONSTRAINT `uq_sync_flashcards_user_card` UNIQUE(`userId`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `sync_preferences` (
	`userId` int NOT NULL,
	`data` json NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sync_preferences_userId` PRIMARY KEY(`userId`)
);
--> statement-breakpoint
CREATE TABLE `sync_segmentation_overrides` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`key` varchar(256) NOT NULL,
	`splitsJson` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sync_segmentation_overrides_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_seg_override_user_key` UNIQUE(`userId`,`key`)
);
--> statement-breakpoint
CREATE TABLE `sync_vocab_ignored` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`vocabId` varchar(128) NOT NULL,
	`ignoredAt` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sync_vocab_ignored_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_vocab_ignored_user_vocab` UNIQUE(`userId`,`vocabId`)
);
--> statement-breakpoint
CREATE TABLE `sync_word_mistakes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`wordId` varchar(128) NOT NULL,
	`sourceTextId` varchar(128),
	`missCount` int NOT NULL DEFAULT 0,
	`lastMissed` bigint NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sync_word_mistakes_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_sync_word_mistakes_user_word` UNIQUE(`userId`,`wordId`)
);
--> statement-breakpoint
ALTER TABLE `users` DROP INDEX `users_openId_unique`;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `email` varchar(320) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `passwordHash` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_email_unique` UNIQUE(`email`);--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `openId`;--> statement-breakpoint
ALTER TABLE `users` DROP COLUMN `loginMethod`;