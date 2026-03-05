/**
 * Decks Router — custom flashcard deck management.
 *
 * Decks are user-owned named collections of wordIds.
 * SRS progress lives in sync_flashcards (unchanged) — decks only track membership.
 *
 * Procedures:
 *  - list:            get all decks for the current user (creates Main Deck if none)
 *  - create:          create a new custom deck
 *  - rename:          rename a custom deck
 *  - delete:          delete a custom deck (and its card memberships)
 *  - setIncluded:     toggle whether a deck is included in combined review sessions
 *  - updateSettings:  update per-deck settings (direction, autoAddFromStories)
 *  - addCards:        add wordIds to a deck
 *  - removeCard:      remove a wordId from a deck
 *  - getCards:        get all wordIds in a deck
 */

import { and, eq, inArray } from "drizzle-orm";
import { z } from "zod";
import { deckCards, decks } from "../../drizzle/schema";
import { getDb } from "../db";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function ensureMainDeck(userId: number, mainDeckId: string) {
  const db = await getDb();
  if (!db) return;
  const existing = await db
    .select({ id: decks.id })
    .from(decks)
    .where(and(eq(decks.userId, userId), eq(decks.isMain, true)))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(decks).values({
      id: mainDeckId,
      userId,
      name: "Main Deck",
      isMain: true,
      included: true,
      settings: { direction: "forward", autoAddFromStories: true },
    }).onDuplicateKeyUpdate({ set: { name: "Main Deck" } });
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const decksRouter = router({
  /** List all decks for the current user. Creates Main Deck if none exist. */
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const userId = ctx.user.id;

    const rows = await db
      .select()
      .from(decks)
      .where(eq(decks.userId, userId))
      .orderBy(decks.createdAt);

    // Auto-create Main Deck on first call
    if (rows.length === 0 || !rows.some((d) => d.isMain)) {
      const mainId = `main-${userId}`;
      await ensureMainDeck(userId, mainId);
      return db.select().from(decks).where(eq(decks.userId, userId)).orderBy(decks.createdAt);
    }

    return rows;
  }),

  /** Create a new custom deck. */
  create: protectedProcedure
    .input(
      z.object({
        id:   z.string().min(1).max(64),
        name: z.string().min(1).max(128),
        settings: z.object({
          direction:           z.enum(["forward", "reverse", "both"]).default("forward"),
          autoAddFromStories:  z.boolean().default(false),
        }).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      // Ensure Main Deck exists first
      await ensureMainDeck(userId, `main-${userId}`);

      await db.insert(decks).values({
        id:       input.id,
        userId,
        name:     input.name,
        isMain:   false,
        included: true,
        settings: input.settings ?? { direction: "forward", autoAddFromStories: false },
      });

      return { success: true };
    }),

  /** Rename a custom deck. */
  rename: protectedProcedure
    .input(z.object({ deckId: z.string(), name: z.string().min(1).max(128) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      const deck = await db
        .select({ isMain: decks.isMain })
        .from(decks)
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)))
        .limit(1);

      if (!deck.length) throw new TRPCError({ code: "NOT_FOUND" });
      if (deck[0].isMain) throw new TRPCError({ code: "BAD_REQUEST", message: "Cannot rename Main Deck" });

      await db
        .update(decks)
        .set({ name: input.name })
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)));

      return { success: true };
    }),

  /** Delete a custom deck (and its card memberships). */
  delete: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      const deck = await db
        .select({ isMain: decks.isMain })
        .from(decks)
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)))
        .limit(1);

      if (!deck.length) throw new TRPCError({ code: "NOT_FOUND" });
      if (deck[0].isMain) throw new TRPCError({ code: "BAD_REQUEST", message: "Cannot delete Main Deck" });

      // Remove card memberships first
      await db
        .delete(deckCards)
        .where(and(eq(deckCards.deckId, input.deckId), eq(deckCards.userId, userId)));

      await db
        .delete(decks)
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)));

      return { success: true };
    }),

  /** Toggle whether a deck is included in combined review sessions. */
  setIncluded: protectedProcedure
    .input(z.object({ deckId: z.string(), included: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      await db
        .update(decks)
        .set({ included: input.included })
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)));

      return { success: true };
    }),

  /** Update per-deck settings (direction, autoAddFromStories). */
  updateSettings: protectedProcedure
    .input(
      z.object({
        deckId:   z.string(),
        settings: z.object({
          direction:          z.enum(["forward", "reverse", "both"]),
          autoAddFromStories: z.boolean(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      await db
        .update(decks)
        .set({ settings: input.settings })
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)));

      return { success: true };
    }),

  /** Add wordIds to a deck (idempotent). */
  addCards: protectedProcedure
    .input(z.object({ deckId: z.string(), wordIds: z.array(z.string()).min(1).max(500) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      // Verify deck ownership
      const deck = await db
        .select({ id: decks.id })
        .from(decks)
        .where(and(eq(decks.id, input.deckId), eq(decks.userId, userId)))
        .limit(1);
      if (!deck.length) throw new TRPCError({ code: "NOT_FOUND" });

      const rows = input.wordIds.map((wordId) => ({
        deckId:  input.deckId,
        userId,
        wordId,
      }));

      // Insert in batches of 100 to avoid large payloads
      for (let i = 0; i < rows.length; i += 100) {
        await db
          .insert(deckCards)
          .values(rows.slice(i, i + 100))
          .onDuplicateKeyUpdate({ set: { deckId: input.deckId } });
      }

      return { success: true, added: rows.length };
    }),

  /** Remove a wordId from a deck. */
  removeCard: protectedProcedure
    .input(z.object({ deckId: z.string(), wordId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });
      const userId = ctx.user.id;

      await db
        .delete(deckCards)
        .where(
          and(
            eq(deckCards.deckId, input.deckId),
            eq(deckCards.userId, userId),
            eq(deckCards.wordId, input.wordId)
          )
        );

      return { success: true };
    }),

  /** Get all wordIds in a deck. */
  getCards: protectedProcedure
    .input(z.object({ deckId: z.string() }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) return [];
      const userId = ctx.user.id;

      const rows = await db
        .select({ wordId: deckCards.wordId, addedAt: deckCards.addedAt })
        .from(deckCards)
        .where(and(eq(deckCards.deckId, input.deckId), eq(deckCards.userId, userId)));

      return rows;
    }),

  /** Get all wordIds across all decks for the current user (for bulk sync). */
  getAllCards: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];
    const userId = ctx.user.id;

    return db
      .select({ deckId: deckCards.deckId, wordId: deckCards.wordId, addedAt: deckCards.addedAt })
      .from(deckCards)
      .where(eq(deckCards.userId, userId));
  }),
});
