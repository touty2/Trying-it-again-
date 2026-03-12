-- Migration: Add isLeech column and performance indexes to sync_flashcards
-- Safe to run multiple times (uses IF NOT EXISTS / IF NOT EXISTS checks)

-- Add isLeech column if it doesn't already exist
ALTER TABLE `sync_flashcards`
  ADD COLUMN IF NOT EXISTS `isLeech` boolean NOT NULL DEFAULT false;

-- Add performance indexes if they don't already exist
-- (MySQL/TiDB: use CREATE INDEX IF NOT EXISTS)
CREATE INDEX IF NOT EXISTS `idx_sync_flashcards_user_due`
  ON `sync_flashcards` (`userId`, `dueDate`);

CREATE INDEX IF NOT EXISTS `idx_sync_flashcards_user_reviewed`
  ON `sync_flashcards` (`userId`, `lastReviewed`);
