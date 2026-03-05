import { systemRouter } from "./_core/systemRouter";
import { decksRouter } from "./routers/decks";
import { publicProcedure, router } from "./_core/trpc";
import { syncRouter } from "./routers/sync";
import { grammarRouter } from "./routers/grammar";
import { videoRouter } from "./routers/video";
import { storyGrammarRouter } from "./routers/storyGrammar";
import { vocabIgnoredRouter } from "./routers/vocabIgnored";
import { AUTH_COOKIE, getCookieOptions } from "./_core/auth";
import { ENV } from "./_core/env";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    /** Returns the current user from the JWT cookie, or null if not authenticated. */
    me: publicProcedure.query(opts => opts.ctx.user ?? null),
    /** Clears the session cookie (standalone: delegates to REST /api/auth/logout). */
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(AUTH_COOKIE, getCookieOptions(ENV.isProduction));
      return { success: true } as const;
    }),
  }),
  // Cloud sync procedures — all protected (require login)
  sync: syncRouter,
  grammar: grammarRouter,
  video: videoRouter,
  storyGrammar: storyGrammarRouter,
  vocabIgnored: vocabIgnoredRouter,
  decks: decksRouter,
});

export type AppRouter = typeof appRouter;
