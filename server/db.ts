import { eq, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  users,
  syncFlashcards,
  syncCompletedTexts,
  syncWordMistakes,
  syncPreferences,
  grammarProgress,
  type InsertUser,
  storyGrammarStudied,
  syncVocabIgnored,
  type InsertSyncVocabIgnored,
  syncSegmentationOverrides,
  type InsertSyncSegmentationOverride,
  storyDecks,
  storyDeckWords,
} from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;
let _dbInitAttempted = false;

export async function getDb() {
  if (!_db && !_dbInitAttempted) {
    _dbInitAttempted = true;
    if (!process.env.DATABASE_URL) {
      console.error(
        "[Database] FATAL: DATABASE_URL environment variable is not set. " +
        "Set it in the Render dashboard (Environment tab) to your TiDB Cloud connection string. " +
        "All database operations will fail until this is configured."
      );
      return null;
    }
    try {
      _db = drizzle(process.env.DATABASE_URL);
      console.log("[Database] Connected to:", process.env.DATABASE_URL.replace(/:([^@]+)@/, ":***@"));
    } catch (error) {
      console.error("[Database] Failed to initialise Drizzle:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── User Auth Helpers ────────────────────────────────────────────────────────

export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.email, email.toLowerCase())).limit(1);
  return rows[0] ?? undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? undefined;
}

export async function createUser(data: {
  email: string;
  passwordHash: string;
  name?: string;
}): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(users).values({
    email: data.email.toLowerCase(),
    passwordHash: data.passwordHash,
    name: data.name ?? null,
    lastSignedIn: new Date(),
  });
  // mysql2 returns insertId
  return (result[0] as { insertId: number }).insertId;
}

export async function updateLastSignedIn(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db.update(users).set({ lastSignedIn: new Date() }).where(eq(users.id, userId));
}

// ─── Sync: Flashcards ─────────────────────────────────────────────────────────

type FlashcardSyncItem = {
  /** Unique card ID: "{wordId}-a" (recognition) or "{wordId}-b" (production) */
  cardId: string;
  wordId: string;
  cardType: "recognition" | "production";
  hanzi: string;
  pinyin: string;
  simpleDefinition: string;
  contextualMeaning?: string | null;
  otherMeanings?: string[] | null;
  examplePairsJson?: { chinese: string; english: string }[] | null;
  sourceTextId?: string | null;
  addedManually: boolean;
  // FSRS fields
  stability: number;
  difficulty: number;
  scheduledDays: number;
  elapsedDays: number;
  reps: number;
  lapses: number;
  state: number;
  // Legacy compat
  easeFactor: number;
  interval: number;
  repetition: number;
  dueDate: number;
  lastReviewed?: number | null;
  isCompleted: boolean;
  completedAt?: number | null;
  completedForward: boolean;
  completedReverse: boolean;
  createdAt: number;
};

export async function upsertSyncFlashcards(
  userId: number,
  items: FlashcardSyncItem[]
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const CHUNK = 50;
  for (let i = 0; i < items.length; i += CHUNK) {
    const chunk = items.slice(i, i + CHUNK);
    await db
      .insert(syncFlashcards)
      .values(
        chunk.map((item) => ({
          userId,
          cardId: item.cardId,
          wordId: item.wordId,
          cardType: item.cardType,
          hanzi: item.hanzi,
          pinyin: item.pinyin,
          simpleDefinition: item.simpleDefinition,
          contextualMeaning: item.contextualMeaning ?? null,
          otherMeanings: item.otherMeanings ?? null,
          examplePairsJson: item.examplePairsJson ?? null,
          sourceTextId: item.sourceTextId ?? null,
          addedManually: item.addedManually,
          // FSRS fields
          stability: String(item.stability),
          difficulty: String(item.difficulty),
          scheduledDays: item.scheduledDays,
          elapsedDays: item.elapsedDays,
          reps: item.reps,
          lapses: item.lapses,
          state: item.state,
          // Legacy compat
          easeFactor: String(item.easeFactor),
          interval: item.interval,
          repetition: item.repetition,
          dueDate: item.dueDate,
          lastReviewed: item.lastReviewed ?? null,
          isCompleted: item.isCompleted,
          completedAt: item.completedAt ?? null,
          completedForward: item.completedForward,
          completedReverse: item.completedReverse,
          createdAt: item.createdAt,
        }))
      )
      .onDuplicateKeyUpdate({
        set: {
          wordId: sql`VALUES(wordId)`,
          cardType: sql`VALUES(cardType)`,
          hanzi: sql`VALUES(hanzi)`,
          pinyin: sql`VALUES(pinyin)`,
          simpleDefinition: sql`VALUES(simpleDefinition)`,
          contextualMeaning: sql`VALUES(contextualMeaning)`,
          otherMeanings: sql`VALUES(otherMeanings)`,
          examplePairsJson: sql`VALUES(examplePairsJson)`,
          addedManually: sql`VALUES(addedManually)`,
          // FSRS fields
          stability: sql`VALUES(stability)`,
          difficulty: sql`VALUES(difficulty)`,
          scheduledDays: sql`VALUES(scheduledDays)`,
          elapsedDays: sql`VALUES(elapsedDays)`,
          reps: sql`VALUES(reps)`,
          lapses: sql`VALUES(lapses)`,
          state: sql`VALUES(state)`,
          // Legacy compat
          easeFactor: sql`VALUES(easeFactor)`,
          interval: sql`VALUES(\`interval\`)`,  // MySQL reserved keyword
          repetition: sql`VALUES(repetition)`,
          dueDate: sql`VALUES(dueDate)`,
          lastReviewed: sql`VALUES(lastReviewed)`,
          isCompleted: sql`VALUES(isCompleted)`,
          completedAt: sql`VALUES(completedAt)`,
          completedForward: sql`VALUES(completedForward)`,
          completedReverse: sql`VALUES(completedReverse)`,
        },
      });
  }
}

export async function getSyncFlashcards(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(syncFlashcards).where(eq(syncFlashcards.userId, userId));
}

// ─── Sync: Completed Texts ────────────────────────────────────────────────────

type CompletedTextSyncItem = { textId: string; completedAt: number };

export async function upsertSyncCompletedTexts(
  userId: number,
  items: CompletedTextSyncItem[]
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  if (items.length === 0) return;
  await db
    .insert(syncCompletedTexts)
    .values(items.map((item) => ({ userId, textId: item.textId, completedAt: item.completedAt })))
    .onDuplicateKeyUpdate({ set: { completedAt: sql`VALUES(completedAt)` } });
}

export async function getSyncCompletedTexts(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(syncCompletedTexts).where(eq(syncCompletedTexts.userId, userId));
}

// ─── Sync: Word Mistakes ──────────────────────────────────────────────────────

type WordMistakeSyncItem = {
  wordId: string;
  sourceTextId?: string | null;
  missCount: number;
  lastMissed: number;
};

export async function upsertSyncWordMistakes(
  userId: number,
  items: WordMistakeSyncItem[]
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const CHUNK = 100;
  for (let i = 0; i < items.length; i += CHUNK) {
    const chunk = items.slice(i, i + CHUNK);
    await db
      .insert(syncWordMistakes)
      .values(
        chunk.map((item) => ({
          userId,
          wordId: item.wordId,
          sourceTextId: item.sourceTextId ?? null,
          missCount: item.missCount,
          lastMissed: item.lastMissed,
        }))
      )
      .onDuplicateKeyUpdate({
        set: {
          sourceTextId: sql`VALUES(sourceTextId)`,
          missCount: sql`VALUES(missCount)`,
          lastMissed: sql`VALUES(lastMissed)`,
        },
      });
  }
}

export async function getSyncWordMistakes(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(syncWordMistakes).where(eq(syncWordMistakes.userId, userId));
}

// ─── Sync: Preferences ───────────────────────────────────────────────────────

export async function upsertSyncPreferences(
  userId: number,
  data: Record<string, unknown>
): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db
    .insert(syncPreferences)
    .values({ userId, data })
    .onDuplicateKeyUpdate({ set: { data: sql`VALUES(\`data\`)` } });  // `data` is a MySQL reserved keyword — must be backtick-escaped in raw SQL
}

export async function getSyncPreferences(userId: number) {
  const db = await getDb();
  if (!db) return null;
  const rows = await db
    .select()
    .from(syncPreferences)
    .where(eq(syncPreferences.userId, userId))
    .limit(1);
  return rows[0] ?? null;
}

// ─── Sync: Last Sync Time ─────────────────────────────────────────────────────

export async function getLastSyncTime(userId: number): Promise<number | null> {
  const db = await getDb();
  if (!db) return null;
  const [fc, ct, wm, pref] = await Promise.all([
    db.select({ updatedAt: syncFlashcards.updatedAt }).from(syncFlashcards).where(eq(syncFlashcards.userId, userId)).orderBy(sql`updatedAt DESC`).limit(1),
    db.select({ updatedAt: syncCompletedTexts.updatedAt }).from(syncCompletedTexts).where(eq(syncCompletedTexts.userId, userId)).orderBy(sql`updatedAt DESC`).limit(1),
    db.select({ updatedAt: syncWordMistakes.updatedAt }).from(syncWordMistakes).where(eq(syncWordMistakes.userId, userId)).orderBy(sql`updatedAt DESC`).limit(1),
    db.select({ updatedAt: syncPreferences.updatedAt }).from(syncPreferences).where(eq(syncPreferences.userId, userId)).limit(1),
  ]);
  const timestamps = [fc[0]?.updatedAt, ct[0]?.updatedAt, wm[0]?.updatedAt, pref[0]?.updatedAt]
    .filter((d): d is Date => d instanceof Date)
    .map((d) => d.getTime());
  return timestamps.length === 0 ? null : Math.max(...timestamps);
}

// ─── Grammar Progress ─────────────────────────────────────────────────────────

type GrammarProgressSyncItem = {
  lessonId: string;
  completed: boolean;
  completedAt?: number | null;
  masteryScore?: number | null;
};

export async function upsertGrammarProgress(
  userId: number,
  items: GrammarProgressSyncItem[]
): Promise<void> {
  if (items.length === 0) return;
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const CHUNK = 100;
  for (let i = 0; i < items.length; i += CHUNK) {
    const chunk = items.slice(i, i + CHUNK);
    await db
      .insert(grammarProgress)
      .values(
        chunk.map((item) => ({
          userId,
          lessonId: item.lessonId,
          completed: item.completed,
          completedAt: item.completedAt ?? null,
          masteryScore: item.masteryScore ?? null,
        }))
      )
      .onDuplicateKeyUpdate({
        set: {
          completed: sql`VALUES(completed)`,
          completedAt: sql`VALUES(completedAt)`,
          masteryScore: sql`VALUES(masteryScore)`,
        },
      });
  }
}

export async function getGrammarProgress(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.select().from(grammarProgress).where(eq(grammarProgress.userId, userId));
}

// ─── Story Grammar Studied ────────────────────────────────────────────────────
export async function upsertStoryGrammarStudied(
  userId: number,
  items: Array<{ textId: string; lessonId: string; studiedAt: number }>
): Promise<void> {
  if (items.length === 0) return;
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const CHUNK = 100;
  for (let i = 0; i < items.length; i += CHUNK) {
    const chunk = items.slice(i, i + CHUNK);
    await db
      .insert(storyGrammarStudied)
      .values(
        chunk.map((item) => ({
          userId,
          textId: item.textId,
          lessonId: item.lessonId,
          studiedAt: new Date(item.studiedAt),
        }))
      )
      .onDuplicateKeyUpdate({
        set: { studiedAt: sql`VALUES(studiedAt)` },
      });
  }
}

export async function getStoryGrammarStudied(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db
    .select()
    .from(storyGrammarStudied)
    .where(eq(storyGrammarStudied.userId, userId));
}

// ─── Vocab Ignored ────────────────────────────────────────────────────────────

export async function upsertVocabIgnored(
  userId: number,
  items: { vocabId: string; ignoredAt: number }[]
): Promise<void> {
  if (items.length === 0) return;
  const db = await getDb();
  if (!db) return;

  const rows: InsertSyncVocabIgnored[] = items.map((item) => ({
    userId,
    vocabId: item.vocabId,
    ignoredAt: new Date(item.ignoredAt),
  }));

  // Insert in batches of 200
  const BATCH = 200;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    await db
      .insert(syncVocabIgnored)
      .values(batch)
      .onDuplicateKeyUpdate({ set: { ignoredAt: sql`VALUES(ignoredAt)` } });
  }
}

export async function getVocabIgnored(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(syncVocabIgnored)
    .where(eq(syncVocabIgnored.userId, userId));
}

// ─── Segmentation Overrides ───────────────────────────────────────────────────

export async function upsertSegmentationOverrides(
  userId: number,
  items: { key: string; splits: string[] }[]
): Promise<void> {
  if (items.length === 0) return;
  const db = await getDb();
  if (!db) return;
  const rows: InsertSyncSegmentationOverride[] = items.map((item) => ({
    userId,
    key: item.key,
    splitsJson: JSON.stringify(item.splits),
  }));
  const BATCH = 200;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    await db
      .insert(syncSegmentationOverrides)
      .values(batch)
      .onDuplicateKeyUpdate({ set: { splitsJson: sql`VALUES(splitsJson)` } });
  }
}

export async function getSegmentationOverrides(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(syncSegmentationOverrides)
    .where(eq(syncSegmentationOverrides.userId, userId));
}

export async function deleteSegmentationOverride(userId: number, key: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .delete(syncSegmentationOverrides)
    .where(
      sql`${syncSegmentationOverrides.userId} = ${userId} AND ${syncSegmentationOverrides.key} = ${key}`
    );
}

// ─── Story Decks ─────────────────────────────────────────────────────────────

/** Get or create a story deck for (userId, storyId). Returns the deck id. */
export async function getOrCreateStoryDeck(userId: number, storyId: string): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("DB unavailable");
  // Try insert; ignore duplicate
  await db
    .insert(storyDecks)
    .values({ userId, storyId })
    .onDuplicateKeyUpdate({ set: { storyId } });
  const rows = await db
    .select({ id: storyDecks.id })
    .from(storyDecks)
    .where(sql`${storyDecks.userId} = ${userId} AND ${storyDecks.storyId} = ${storyId}`)
    .limit(1);
  if (!rows[0]) throw new Error("Failed to get/create story deck");
  return rows[0].id;
}

/** Add a word to a story deck (idempotent). */
export async function addWordToStoryDeck(storyDeckId: number, wordId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .insert(storyDeckWords)
    .values({ storyDeckId, wordId })
    .onDuplicateKeyUpdate({ set: { wordId } });
}

/** Remove a word from a story deck only (keeps it in the main deck). */
export async function removeWordFromStoryDeck(storyDeckId: number, wordId: string): Promise<void> {
  const db = await getDb();
  if (!db) return;
  await db
    .delete(storyDeckWords)
    .where(sql`${storyDeckWords.storyDeckId} = ${storyDeckId} AND ${storyDeckWords.wordId} = ${wordId}`);
}

/** Get all word IDs in a story deck. */
export async function getStoryDeckWords(userId: number, storyId: string): Promise<string[]> {
  const db = await getDb();
  if (!db) return [];
  const deck = await db
    .select({ id: storyDecks.id })
    .from(storyDecks)
    .where(sql`${storyDecks.userId} = ${userId} AND ${storyDecks.storyId} = ${storyId}`)
    .limit(1);
  if (!deck[0]) return [];
  const words = await db
    .select({ wordId: storyDeckWords.wordId })
    .from(storyDeckWords)
    .where(eq(storyDeckWords.storyDeckId, deck[0].id));
  return words.map((w) => w.wordId);
}

/** Get all story decks for a user as { storyId, wordIds[] }. */
export async function getAllStoryDecks(
  userId: number
): Promise<{ storyId: string; wordIds: string[] }[]> {
  const db = await getDb();
  if (!db) return [];
  const decks = await db
    .select({ id: storyDecks.id, storyId: storyDecks.storyId })
    .from(storyDecks)
    .where(eq(storyDecks.userId, userId));
  if (decks.length === 0) return [];
  const deckIds = decks.map((d) => d.id);
  const words = await db
    .select({ storyDeckId: storyDeckWords.storyDeckId, wordId: storyDeckWords.wordId })
    .from(storyDeckWords)
    .where(sql`${storyDeckWords.storyDeckId} IN (${sql.join(deckIds.map((id) => sql`${id}`), sql`, `)})`);
  return decks.map((d) => ({
    storyId: d.storyId,
    wordIds: words.filter((w) => w.storyDeckId === d.id).map((w) => w.wordId),
  }));
}

// ─── Manus SDK compatibility shims ───────────────────────────────────────────
// The scaffold's sdk.ts calls getUserByOpenId and upsertUser.
// In standalone auth mode, openId maps to email, and upsertUser is a no-op.
export async function getUserByOpenId(openId: string) {
  return getUserByEmail(openId);
}
export async function upsertUser(_data: Record<string, unknown>): Promise<void> {
  // no-op in standalone email/password auth mode
}
