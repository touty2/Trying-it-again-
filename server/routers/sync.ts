/**
 * Sync Router — tRPC procedures for cloud sync of user data.
 *
 * All procedures are protected (require authentication).
 * Strategy: last-write-wins based on `updatedAt` timestamp.
 *
 * Endpoints:
 *  sync.pushFlashcards  — upload local flashcards + words to cloud
 *  sync.pullFlashcards  — download cloud flashcards for this user
 *  sync.pushCompletedTexts — upload completed text IDs
 *  sync.pullCompletedTexts — download completed text IDs
 *  sync.pushWordMistakes — upload word mistake counts
 *  sync.pullWordMistakes — download word mistake counts
 *  sync.pushPreferences  — upload user preferences/settings JSON
 *  sync.pullPreferences  — download user preferences/settings JSON
 *  sync.getLastSyncTime  — get the most recent updatedAt across all sync tables
 */

import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import {
  upsertSyncFlashcards,
  getSyncFlashcards,
  upsertSyncCompletedTexts,
  getSyncCompletedTexts,
  upsertSyncWordMistakes,
  getSyncWordMistakes,
  upsertSyncPreferences,
  getSyncPreferences,
  getLastSyncTime,
  upsertSegmentationOverrides,
  getSegmentationOverrides,
  deleteSegmentationOverride,
  getOrCreateStoryDeck,
  addWordToStoryDeck,
  removeWordFromStoryDeck,
  getAllStoryDecks,
  deleteAllUserData,
} from "../db";

// ─── Input Schemas ────────────────────────────────────────────────────────────

const FlashcardItemSchema = z.object({
  /** Unique card ID: "{wordId}-a" (recognition) or "{wordId}-b" (production) */
  cardId: z.string(),
  wordId: z.string(),
  cardType: z.enum(["recognition", "production"]).default("recognition"),
  hanzi: z.string(),
  pinyin: z.string(),
  simpleDefinition: z.string(),
  contextualMeaning: z.string().nullable().optional(),
  otherMeanings: z.array(z.string()).nullable().optional(),
  examplePairsJson: z
    .array(z.object({ chinese: z.string(), english: z.string() }))
    .nullable()
    .optional(),
  sourceTextId: z.string().nullable().optional(),
  addedManually: z.boolean().default(false),
  // FSRS algorithm fields
  stability: z.number().min(0).default(0),
  difficulty: z.number().min(0).max(10).default(5),
  scheduledDays: z.number().int().min(0).default(0),
  elapsedDays: z.number().int().min(0).default(0),
  reps: z.number().int().min(0).default(0),
  lapses: z.number().int().min(0).default(0),
  isLeech: z.boolean().default(false),
  state: z.number().int().min(0).default(0),
  // Legacy compat fields (kept for backwards compatibility)
  // min(0): FSRS cards alias stability→easeFactor; stability starts at 0, so the
  // SM-2 floor of 1.3 must not be enforced here.
  easeFactor: z.number().min(0).default(2.5),
  interval: z.number().int().min(0).default(1),
  repetition: z.number().int().min(0).default(0),
  dueDate: z.number(),
  lastReviewed: z.number().nullable().optional(),
  isCompleted: z.boolean().default(false),
  completedAt: z.number().nullable().optional(),
  completedForward: z.boolean().default(false),
  completedReverse: z.boolean().default(false),
  createdAt: z.number(),
});

const CompletedTextItemSchema = z.object({
  textId: z.string(),
  completedAt: z.number(),
});

const WordMistakeItemSchema = z.object({
  wordId: z.string(),
  sourceTextId: z.string().nullable().optional(),
  missCount: z.number().int().min(0),
  lastMissed: z.number(),
});

const PreferencesSchema = z.record(z.string(), z.unknown());

// ─── Router ───────────────────────────────────────────────────────────────────

export const syncRouter = router({
  /**
   * Upload all local flashcards to the cloud.
   * Uses upsert (ON DUPLICATE KEY UPDATE) so it's safe to call repeatedly.
   */
  pushFlashcards: protectedProcedure
    .input(z.object({ items: z.array(FlashcardItemSchema) }))
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { synced: 0 };
      try {
        await upsertSyncFlashcards(ctx.user.id, input.items);
      } catch (err: unknown) {
        const e = err as { cause?: { message?: string; code?: string; errno?: number; sqlMessage?: string } };
        console.error('[pushFlashcards] MySQL error:', e.cause?.sqlMessage || e.cause?.message, '| code:', e.cause?.code, '| errno:', e.cause?.errno);
        throw err;
      }
      return { synced: input.items.length };
    }),

  /**
   * Download all cloud flashcards for the authenticated user.
   */
  pullFlashcards: protectedProcedure.query(async ({ ctx }) => {
    const items = await getSyncFlashcards(ctx.user.id);
    return { items };
  }),

  /**
   * Upload completed text IDs to the cloud.
   */
  pushCompletedTexts: protectedProcedure
    .input(z.object({ items: z.array(CompletedTextItemSchema) }))
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { synced: 0 };
      await upsertSyncCompletedTexts(ctx.user.id, input.items);
      return { synced: input.items.length };
    }),

  /**
   * Download completed text IDs for the authenticated user.
   */
  pullCompletedTexts: protectedProcedure.query(async ({ ctx }) => {
    const items = await getSyncCompletedTexts(ctx.user.id);
    return { items };
  }),

  /**
   * Upload word mistake counts to the cloud.
   */
  pushWordMistakes: protectedProcedure
    .input(z.object({ items: z.array(WordMistakeItemSchema) }))
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { synced: 0 };
      await upsertSyncWordMistakes(ctx.user.id, input.items);
      return { synced: input.items.length };
    }),

  /**
   * Download word mistake counts for the authenticated user.
   */
  pullWordMistakes: protectedProcedure.query(async ({ ctx }) => {
    const items = await getSyncWordMistakes(ctx.user.id);
    return { items };
  }),

  /**
   * Upload user preferences (settings JSON blob) to the cloud.
   */
  pushPreferences: protectedProcedure
    .input(z.object({ data: PreferencesSchema }))
    .mutation(async ({ ctx, input }) => {
      await upsertSyncPreferences(ctx.user.id, input.data);
      return { success: true };
    }),

  /**
   * Download user preferences for the authenticated user.
   */
  pullPreferences: protectedProcedure.query(async ({ ctx }) => {
    const prefs = await getSyncPreferences(ctx.user.id);
    return { data: prefs?.data ?? null };
  }),

  /**
   * Get the timestamp of the most recent sync operation for this user.
   * Used to display "Last synced: X minutes ago" in the UI.
   */
  getLastSyncTime: protectedProcedure.query(async ({ ctx }) => {
    const ts = await getLastSyncTime(ctx.user.id);
    return { lastSyncTime: ts };
  }),

  /** Upload user segmentation overrides to the cloud. */
  pushSegmentationOverrides: protectedProcedure
    .input(z.object({
      items: z.array(z.object({ key: z.string(), splits: z.array(z.string()) }))
    }))
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { synced: 0 };
      await upsertSegmentationOverrides(ctx.user.id, input.items);
      return { synced: input.items.length };
    }),

  /** Download segmentation overrides for the authenticated user. */
  pullSegmentationOverrides: protectedProcedure.query(async ({ ctx }) => {
    const rows = await getSegmentationOverrides(ctx.user.id);
    return {
      items: rows.map(r => ({
        key: r.key,
        splits: JSON.parse(r.splitsJson) as string[],
      }))
    };
  }),

  /** Delete a single segmentation override from the cloud. */
  deleteSegmentationOverride: protectedProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await deleteSegmentationOverride(ctx.user.id, input.key);
      return { success: true };
    }),

  // ─── Story Deck Sync ────────────────────────────────────────────────────────

  /** Add a word to a story deck (creates the deck if needed). */
  addWordToStoryDeck: protectedProcedure
    .input(z.object({ storyId: z.string(), wordId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deckId = await getOrCreateStoryDeck(ctx.user.id, input.storyId);
      await addWordToStoryDeck(deckId, input.wordId);
      return { success: true };
    }),

  /** Remove a word from a story deck only (keeps it in the main deck). */
  removeWordFromStoryDeck: protectedProcedure
    .input(z.object({ storyId: z.string(), wordId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const deckId = await getOrCreateStoryDeck(ctx.user.id, input.storyId);
      await removeWordFromStoryDeck(deckId, input.wordId);
      return { success: true };
    }),

  /** Pull all story deck memberships for this user. */
  pullStoryDecks: protectedProcedure.query(async ({ ctx }) => {
    const decks = await getAllStoryDecks(ctx.user.id);
    return { decks };
  }),

  /**
   * Wipe ALL cloud data for the authenticated user.
   * Called by the client before a local reset so the sync pull cannot
   * restore stale data on the next sync cycle.
   */
  resetAllData: protectedProcedure
    .mutation(async ({ ctx }) => {
      await deleteAllUserData(ctx.user.id);
      return { success: true };
    }),

  /** Push (upsert) all story deck memberships from the client. */
  pushStoryDecks: protectedProcedure
    .input(
      z.object({
        decks: z.array(
          z.object({
            storyId: z.string(),
            wordIds: z.array(z.string()),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      for (const deck of input.decks) {
        const deckId = await getOrCreateStoryDeck(ctx.user.id, deck.storyId);
        for (const wordId of deck.wordIds) {
          await addWordToStoryDeck(deckId, wordId);
        }
      }
      return { success: true };
    }),
});
