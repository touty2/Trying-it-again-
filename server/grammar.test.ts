import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createAuthContext(userId = 1): { ctx: TrpcContext } {
  const ctx: TrpcContext = {
    user: {
      id: userId,
      email: "test@example.com",
      passwordHash: "hashed",
      name: "Test User",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
  return { ctx };
}

describe("grammar router", () => {
  it("grammar router is accessible via appRouter", () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    // Verify the grammar router procedures exist
    expect(typeof caller.grammar.pull).toBe("function");
    expect(typeof caller.grammar.push).toBe("function");
  });
});

describe("video router", () => {
  it("video router is accessible via appRouter", () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    // Verify the video router procedures exist
    expect(typeof caller.video.fetchTranscript).toBe("function");
    expect(typeof caller.video.translateLines).toBe("function");
  });
});

describe("sync router", () => {
  it("sync router procedures are accessible via appRouter", () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);
    // Verify all sync procedures exist
    expect(typeof caller.sync.pushFlashcards).toBe("function");
    expect(typeof caller.sync.pullFlashcards).toBe("function");
    expect(typeof caller.sync.pushCompletedTexts).toBe("function");
    expect(typeof caller.sync.pullCompletedTexts).toBe("function");
    expect(typeof caller.sync.pushWordMistakes).toBe("function");
    expect(typeof caller.sync.pullWordMistakes).toBe("function");
    expect(typeof caller.sync.pushPreferences).toBe("function");
    expect(typeof caller.sync.pullPreferences).toBe("function");
    expect(typeof caller.sync.getLastSyncTime).toBe("function");
  });
});
