import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { upsertGrammarProgress, getGrammarProgress } from "../db";

const GrammarProgressItemSchema = z.object({
  lessonId:     z.string().max(64),
  completed:    z.boolean(),
  completedAt:  z.number().nullable().optional(),
  masteryScore: z.number().min(0).max(100).nullable().optional(),
});

export const grammarRouter = router({
  /** Pull all grammar progress rows for the current user */
  pull: protectedProcedure.query(async ({ ctx }) => {
    const rows = await getGrammarProgress(ctx.user.id);
    return rows.map((r) => ({
      lessonId:     r.lessonId,
      completed:    Boolean(r.completed),
      completedAt:  r.completedAt ?? null,
      masteryScore: r.masteryScore ?? null,
      updatedAt:    r.updatedAt instanceof Date ? r.updatedAt.getTime() : Number(r.updatedAt),
    }));
  }),

  /** Push a batch of grammar progress updates from the client */
  push: protectedProcedure
    .input(z.object({ items: z.array(GrammarProgressItemSchema) }))
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { upserted: 0 };
      await upsertGrammarProgress(ctx.user.id, input.items);
      return { upserted: input.items.length };
    }),
});
