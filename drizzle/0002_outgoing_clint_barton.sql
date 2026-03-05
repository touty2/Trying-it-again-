CREATE TABLE `deck_cards` (
	`id` int AUTO_INCREMENT NOT NULL,
	`deckId` varchar(64) NOT NULL,
	`userId` int NOT NULL,
	`wordId` varchar(128) NOT NULL,
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `deck_cards_id` PRIMARY KEY(`id`),
	CONSTRAINT `uq_deck_cards_deck_word` UNIQUE(`deckId`,`wordId`)
);
--> statement-breakpoint
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
	CONSTRAINT `uq_decks_user_id` UNIQUE(`userId`,`id`)
);
