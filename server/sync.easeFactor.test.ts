/**
 * Sync easeFactor validation tests.
 *
 * Regression test for: FSRS cards aliasing stability→easeFactor were rejected
 * by the server because stability starts at 0, which was below the old min(1.3).
 *
 * The fix: FlashcardItemSchema.easeFactor uses min(0) instead of min(1.3).
 */
import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// ── Minimal auth context ──────────────────────────────────────────────────────
function makeCtx(): TrpcContext {
  return {
    user: {
      id: 99,
      openId: "test-user",
      email: "test@example.com",
      name: "Test",
      loginMethod: "email",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

// ── Minimal valid flashcard item ──────────────────────────────────────────────
function makeCard(overrides: Record<string, unknown> = {}) {
  return {
    cardId: "test-word-a",
    wordId: "test-word",
    cardType: "recognition" as const,
    hanzi: "测试",
    pinyin: "cèshì",
    simpleDefinition: "test",
    stability: 0,
    difficulty: 5,
    scheduledDays: 0,
    elapsedDays: 0,
    reps: 0,
    lapses: 0,
    state: 0,
    easeFactor: 0,   // ← was rejected before the fix (stability alias)
    interval: 0,
    repetition: 0,
    dueDate: Date.now(),
    isCompleted: false,
    addedManually: false,
    createdAt: Date.now(),
    ...overrides,
  };
}

describe("sync.pushFlashcards — easeFactor validation", () => {
  it("accepts easeFactor = 0 (new FSRS card, stability not yet set)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    // Should not throw a Zod validation error
    await expect(
      caller.sync.pushFlashcards({ items: [makeCard({ easeFactor: 0 })] })
    ).resolves.toMatchObject({ synced: 1 });
  });

  it("accepts easeFactor = 0.5 (early FSRS stability value)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.sync.pushFlashcards({ items: [makeCard({ easeFactor: 0.5 })] })
    ).resolves.toMatchObject({ synced: 1 });
  });

  it("accepts easeFactor = 1.0 (below old SM-2 floor of 1.3)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.sync.pushFlashcards({ items: [makeCard({ easeFactor: 1.0 })] })
    ).resolves.toMatchObject({ synced: 1 });
  });

  it("accepts easeFactor = 2.5 (default SM-2 value)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.sync.pushFlashcards({ items: [makeCard({ easeFactor: 2.5 })] })
    ).resolves.toMatchObject({ synced: 1 });
  });

  it("rejects easeFactor = -1 (negative is still invalid)", async () => {
    const caller = appRouter.createCaller(makeCtx());
    await expect(
      caller.sync.pushFlashcards({ items: [makeCard({ easeFactor: -1 })] })
    ).rejects.toThrow();
  });
});
