import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { upsertVocabIgnored, getVocabIgnored } from "../db";

export const vocabIgnoredRouter = router({
  /** Pull all ignored vocab IDs for the current user */
  pull: protectedProcedure.query(async ({ ctx }) => {
    const rows = await getVocabIgnored(ctx.user.id);
    return rows.map((r) => ({
      vocabId:   r.vocabId,
      ignoredAt: r.ignoredAt instanceof Date ? r.ignoredAt.getTime() : Number(r.ignoredAt),
    }));
  }),

  /** Push a batch of ignored vocab IDs from the client */
  push: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            vocabId:   z.string().max(128),
            ignoredAt: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { upserted: 0 };
      await upsertVocabIgnored(ctx.user.id, input.items);
      return { upserted: input.items.length };
    }),
});
