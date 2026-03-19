import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { upsertStoryGrammarStudied, getStoryGrammarStudied } from "../db";

export const storyGrammarRouter = router({
  /** Pull all story-grammar studied rows for the current user */
  pull: protectedProcedure.query(async ({ ctx }) => {
    const rows = await getStoryGrammarStudied(ctx.user.id);
    return rows.map((r) => ({
      textId:    r.textId,
      lessonId:  r.lessonId,
      studiedAt: r.studiedAt instanceof Date ? r.studiedAt.getTime() : Number(r.studiedAt),
    }));
  }),

  /** Push a batch of story-grammar studied updates from the client */
  push: protectedProcedure
    .input(
      z.object({
        items: z.array(
          z.object({
            textId:    z.string().max(64),
            lessonId:  z.string().max(64),
            studiedAt: z.number(),
          })
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.items.length === 0) return { upserted: 0 };
      await upsertStoryGrammarStudied(ctx.user.id, input.items);
      return { upserted: input.items.length };
    }),
});
