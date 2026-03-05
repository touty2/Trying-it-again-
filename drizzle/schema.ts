import {
  bigint,
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * Core user table — standalone email/password auth.
 * openId removed; email is now the unique identifier.
 * passwordHash stores bcrypt hash of the user's password.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 256 }).notNull(),
  name: text("name"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── Cloud Sync: Flashcards ───────────────────────────────────────────────────
/**
 * Synced flashcard state per user (mirrors IndexedDB Flashcard + Word).
 * One row per (userId, wordId). Upserted on each sync push.
 */
export const syncFlashcards = mysqlTable(
  "sync_flashcards",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    /** Unique card identifier — "{wordId}-a" (recognition) or "{wordId}-b" (production) */
    cardId: varchar("cardId", { length: 160 }).notNull(),
    wordId: varchar("wordId", { length: 128 }).notNull(),
    /** "recognition" = CN→EN, "production" = EN→CN */
    cardType: mysqlEnum("cardType", ["recognition", "production"]).default("recognition").notNull(),
    hanzi: varchar("hanzi", { length: 64 }).notNull(),
    pinyin: varchar("pinyin", { length: 256 }).notNull(),
    simpleDefinition: text("simpleDefinition").notNull(),
    contextualMeaning: text("contextualMeaning"),
    otherMeanings: json("otherMeanings").$type<string[]>(),
    examplePairsJson: json("examplePairsJson").$type<{ chinese: string; english: string }[]>(),
    sourceTextId: varchar("sourceTextId", { length: 128 }),
    addedManually: boolean("addedManually").default(false).notNull(),
    // ── FSRS algorithm fields ──────────────────────────────────────────────────
    stability:    decimal("stability",    { precision: 10, scale: 4 }).notNull().default("0.0000"),
    difficulty:   decimal("difficulty",   { precision: 10, scale: 4 }).notNull().default("5.0000"),
    scheduledDays: int("scheduledDays").notNull().default(0),
    elapsedDays:  int("elapsedDays").notNull().default(0),
    reps:         int("reps").notNull().default(0),
    lapses:       int("lapses").notNull().default(0),
    state:        int("state").notNull().default(0),
    // ── Legacy compat (kept for old clients) ──────────────────────────────────
    easeFactor: decimal("easeFactor", { precision: 5, scale: 2 }).notNull().default("2.50"),
    interval: int("interval").notNull().default(1),
    repetition: int("repetition").notNull().default(0),
    // ─────────────────────────────────────────────────────────────────────────
    dueDate: bigint("dueDate", { mode: "number" }).notNull(),
    lastReviewed: bigint("lastReviewed", { mode: "number" }),
    isCompleted: boolean("isCompleted").default(false).notNull(),
    completedAt: bigint("completedAt", { mode: "number" }),
    completedForward: boolean("completedForward").default(false).notNull(),
    completedReverse: boolean("completedReverse").default(false).notNull(),
    createdAt: bigint("createdAt", { mode: "number" }).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [
    // Primary uniqueness is now on (userId, cardId) — each card has its own row
    uniqueIndex("uq_sync_flashcards_user_card").on(table.userId, table.cardId),
  ]
);
export type SyncFlashcard = typeof syncFlashcards.$inferSelect;
export type InsertSyncFlashcard = typeof syncFlashcards.$inferInsert;

// ─── Cloud Sync: Completed Texts ─────────────────────────────────────────────
export const syncCompletedTexts = mysqlTable(
  "sync_completed_texts",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    textId: varchar("textId", { length: 128 }).notNull(),
    completedAt: bigint("completedAt", { mode: "number" }).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [uniqueIndex("uq_sync_completed_texts_user_text").on(table.userId, table.textId)]
);
export type SyncCompletedText = typeof syncCompletedTexts.$inferSelect;

// ─── Cloud Sync: Word Mistakes ────────────────────────────────────────────────
export const syncWordMistakes = mysqlTable(
  "sync_word_mistakes",
  {
    id: int("id").autoincrement().primaryKey(),
    userId: int("userId").notNull(),
    wordId: varchar("wordId", { length: 128 }).notNull(),
    sourceTextId: varchar("sourceTextId", { length: 128 }),
    missCount: int("missCount").notNull().default(0),
    lastMissed: bigint("lastMissed", { mode: "number" }).notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [uniqueIndex("uq_sync_word_mistakes_user_word").on(table.userId, table.wordId)]
);
export type SyncWordMistake = typeof syncWordMistakes.$inferSelect;

// ─── Cloud Sync: Preferences ──────────────────────────────────────────────────
/**
 * Stores all user preferences as a single JSON blob per user.
 */
export const syncPreferences = mysqlTable("sync_preferences", {
  userId: int("userId").primaryKey(),
  data: json("data").notNull().$type<Record<string, unknown>>(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type SyncPreferences = typeof syncPreferences.$inferSelect;

// ─── Grammar Progress ─────────────────────────────────────────────────────────
/**
 * Tracks per-user completion state for each grammar lesson.
 */
export const grammarProgress = mysqlTable(
  "grammar_progress",
  {
    id:           int("id").autoincrement().primaryKey(),
    userId:       int("userId").notNull(),
    lessonId:     varchar("lessonId", { length: 64 }).notNull(),
    completed:    boolean("completed").notNull().default(false),
    completedAt:  bigint("completedAt", { mode: "number" }),
    masteryScore: int("masteryScore"),
    updatedAt:    timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [uniqueIndex("uq_grammar_progress_user_lesson").on(table.userId, table.lessonId)]
);
export type GrammarProgress = typeof grammarProgress.$inferSelect;
export type InsertGrammarProgress = typeof grammarProgress.$inferInsert;

// ─── Password Reset Tokens ────────────────────────────────────────────────────
/**
 * Short-lived tokens for the forgot-password flow.
 * One row per request; deleted after use or expiry.
 */
export const passwordResetTokens = mysqlTable("password_reset_tokens", {
  id:        int("id").autoincrement().primaryKey(),
  userId:    int("userId").notNull(),
  token:     varchar("token", { length: 128 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type PasswordResetToken = typeof passwordResetTokens.$inferSelect;

// ─── Story Grammar Studied ────────────────────────────────────────────────────
/**
 * Tracks which grammar points a user has studied in each story.
 * One row per (userId, textId, lessonId) combination.
 */
export const storyGrammarStudied = mysqlTable(
  "story_grammar_studied",
  {
    id:        int("id").autoincrement().primaryKey(),
    userId:    int("userId").notNull(),
    textId:    varchar("textId", { length: 64 }).notNull(),
    lessonId:  varchar("lessonId", { length: 64 }).notNull(),
    studiedAt: timestamp("studiedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("uq_story_grammar_user_text_lesson").on(table.userId, table.textId, table.lessonId)]
);
export type StoryGrammarStudied = typeof storyGrammarStudied.$inferSelect;
export type InsertStoryGrammarStudied = typeof storyGrammarStudied.$inferInsert;

// ─── Vocab Ignored ────────────────────────────────────────────────────────────
/**
 * Tracks which themed vocab words the user has chosen to ignore.
 * One row per (userId, vocabId) combination.
 */
export const syncVocabIgnored = mysqlTable(
  "sync_vocab_ignored",
  {
    id:         int("id").autoincrement().primaryKey(),
    userId:     int("userId").notNull(),
    vocabId:    varchar("vocabId", { length: 128 }).notNull(),
    ignoredAt:  timestamp("ignoredAt").defaultNow().notNull(),
    createdAt:  timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("uq_vocab_ignored_user_vocab").on(table.userId, table.vocabId)]
);
export type SyncVocabIgnored = typeof syncVocabIgnored.$inferSelect;
export type InsertSyncVocabIgnored = typeof syncVocabIgnored.$inferInsert;

// ─── Story Decks ─────────────────────────────────────────────────────────────
/**
 * One row per (userId, storyId) — created lazily when the first word is added
 * from that story.  The main deck is simply "all words" and needs no row here.
 */
export const storyDecks = mysqlTable(
  "story_decks",
  {
    id:        int("id").autoincrement().primaryKey(),
    userId:    int("userId").notNull(),
    storyId:   varchar("storyId", { length: 64 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("uq_story_decks_user_story").on(table.userId, table.storyId)]
);
export type StoryDeck = typeof storyDecks.$inferSelect;
export type InsertStoryDeck = typeof storyDecks.$inferInsert;

/**
 * Junction table: which words belong to which story deck.
 * wordId is the client-side nanoid (matches sync_flashcards.wordId).
 */
export const storyDeckWords = mysqlTable(
  "story_deck_words",
  {
    id:          int("id").autoincrement().primaryKey(),
    storyDeckId: int("storyDeckId").notNull(),
    wordId:      varchar("wordId", { length: 64 }).notNull(),
    addedAt:     timestamp("addedAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("uq_story_deck_words_deck_word").on(table.storyDeckId, table.wordId)]
);
export type StoryDeckWord = typeof storyDeckWords.$inferSelect;
export type InsertStoryDeckWord = typeof storyDeckWords.$inferInsert;

// ─── Custom Decks ───────────────────────────────────────────────────────────────
/**
 * User-created named decks. One row per deck.
 * isMain: true for the single "Main Deck" (auto-created on first sync).
 * settings: JSON blob for per-deck options (direction, autoAddFromStories).
 */
export const decks = mysqlTable(
  "decks",
  {
    id:          varchar("id", { length: 64 }).primaryKey(), // nanoid from client
    userId:      int("userId").notNull(),
    name:        varchar("name", { length: 128 }).notNull(),
    isMain:      boolean("isMain").default(false).notNull(),
    /** included: whether this deck is selected for combined review sessions */
    included:    boolean("included").default(true).notNull(),
    /** JSON: { direction: 'forward'|'reverse'|'both', autoAddFromStories: boolean } */
    settings:    json("settings").$type<{ direction: "forward" | "reverse" | "both"; autoAddFromStories: boolean }>(),
    createdAt:   timestamp("createdAt").defaultNow().notNull(),
    updatedAt:   timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  (table) => [uniqueIndex("uq_decks_user_id").on(table.userId, table.id)]
);
export type Deck = typeof decks.$inferSelect;
export type InsertDeck = typeof decks.$inferInsert;

/**
 * Junction table: which words (by wordId) belong to which custom deck.
 * wordId matches sync_flashcards.wordId and the client-side Word.id.
 * SRS progress is NOT stored here — it lives in sync_flashcards.
 */
export const deckCards = mysqlTable(
  "deck_cards",
  {
    id:       int("id").autoincrement().primaryKey(),
    deckId:   varchar("deckId", { length: 64 }).notNull(),
    userId:   int("userId").notNull(),
    wordId:   varchar("wordId", { length: 128 }).notNull(),
    addedAt:  timestamp("addedAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("uq_deck_cards_deck_word").on(table.deckId, table.wordId)]
);
export type DeckCard = typeof deckCards.$inferSelect;
export type InsertDeckCard = typeof deckCards.$inferInsert;

// ─── Segmentation Overrides ───────────────────────────────────────────────────
/**
 * Stores user-defined segmentation corrections.
 * key: "global:WORD" (e.g. "global:马上起")
 * splitsJson: JSON array of corrected splits (e.g. '["马上","起"]')
 */
export const syncSegmentationOverrides = mysqlTable(
  "sync_segmentation_overrides",
  {
    id:         int("id").autoincrement().primaryKey(),
    userId:     int("userId").notNull(),
    key:        varchar("key", { length: 256 }).notNull(),
    splitsJson: text("splitsJson").notNull(),
    updatedAt:  timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
    createdAt:  timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => [uniqueIndex("uq_seg_override_user_key").on(table.userId, table.key)]
);
export type SyncSegmentationOverride = typeof syncSegmentationOverrides.$inferSelect;
export type InsertSyncSegmentationOverride = typeof syncSegmentationOverrides.$inferInsert;
