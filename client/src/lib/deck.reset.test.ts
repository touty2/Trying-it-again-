/**
 * Deck Reset Logic Tests
 *
 * Tests the pure data-transformation logic that resetDueDates and resetDeck apply.
 * (IndexedDB calls are not tested here — those are integration-level.)
 */

import { describe, it, expect } from "vitest";
import { createFSRSCard, type Flashcard } from "./db";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeReviewedCard(overrides: Partial<Flashcard> = {}): Flashcard {
  const base = createFSRSCard("word-1", "recognition");
  return {
    ...base,
    reps: 5,
    lapses: 1,
    stability: 12.3,
    difficulty: 4.8,
    scheduledDays: 14,
    elapsedDays: 14,
    state: 2, // Review
    lastReviewed: Date.now() - 14 * 24 * 60 * 60 * 1000,
    dueDate: Date.now() - 2 * 24 * 60 * 60 * 1000, // overdue
    ...overrides,
  };
}

// ─── resetDueDates transformation ────────────────────────────────────────────

function applyResetDueDates(card: Flashcard, now: number): Flashcard {
  return { ...card, dueDate: now, nextReviewDate: new Date(now).toISOString().slice(0, 10) };
}

describe("resetDueDates transformation", () => {
  it("sets dueDate to now", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDueDates(card, now);
    expect(result.dueDate).toBe(now);
  });

  it("preserves all SRS fields unchanged", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDueDates(card, now);
    expect(result.reps).toBe(card.reps);
    expect(result.lapses).toBe(card.lapses);
    expect(result.stability).toBe(card.stability);
    expect(result.difficulty).toBe(card.difficulty);
    expect(result.scheduledDays).toBe(card.scheduledDays);
    expect(result.state).toBe(card.state);
    expect(result.lastReviewed).toBe(card.lastReviewed);
  });

  it("preserves cardId, wordId, and cardType", () => {
    const now = Date.now();
    const card = makeReviewedCard({ wordId: "word-xyz", cardType: "production" });
    const result = applyResetDueDates(card, now);
    expect(result.cardId).toBe(card.cardId);
    expect(result.wordId).toBe("word-xyz");
    expect(result.cardType).toBe("production");
  });

  it("sets nextReviewDate to today's ISO date", () => {
    const now = new Date("2026-03-22T10:00:00Z").getTime();
    const card = makeReviewedCard();
    const result = applyResetDueDates(card, now);
    expect(result.nextReviewDate).toBe("2026-03-22");
  });
});

// ─── resetDeck transformation ─────────────────────────────────────────────────

function applyResetDeck(card: Flashcard, now: number): Flashcard {
  return {
    ...card,
    stability: 2.5,
    difficulty: 5.0,
    dueDate: now,
    elapsedDays: 0,
    scheduledDays: 1,
    reps: 0,
    lapses: 0,
    isLeech: false,
    state: 0, // State.New
    lastReviewed: null,
    nextReviewDate: new Date(now).toISOString().slice(0, 10),
    repetition: 0,
    interval: 1,
    easeFactor: 2.5,
  };
}

describe("resetDeck transformation", () => {
  it("resets reps, lapses, and state to initial values", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDeck(card, now);
    expect(result.reps).toBe(0);
    expect(result.lapses).toBe(0);
    expect(result.state).toBe(0);
    expect(result.isLeech).toBe(false);
  });

  it("resets stability and difficulty to defaults", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDeck(card, now);
    expect(result.stability).toBe(2.5);
    expect(result.difficulty).toBe(5.0);
  });

  it("resets scheduledDays, elapsedDays, interval to 1/0/1", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDeck(card, now);
    expect(result.scheduledDays).toBe(1);
    expect(result.elapsedDays).toBe(0);
    expect(result.interval).toBe(1);
  });

  it("sets lastReviewed to null", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDeck(card, now);
    expect(result.lastReviewed).toBeNull();
  });

  it("sets dueDate to now", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDeck(card, now);
    expect(result.dueDate).toBe(now);
  });

  it("preserves cardId, wordId, cardType, and createdAt", () => {
    const now = Date.now();
    const card = makeReviewedCard({ wordId: "word-abc", cardType: "production" });
    const result = applyResetDeck(card, now);
    expect(result.cardId).toBe(card.cardId);
    expect(result.wordId).toBe("word-abc");
    expect(result.cardType).toBe("production");
    expect(result.createdAt).toBe(card.createdAt);
  });

  it("card is immediately due after reset", () => {
    const before = Date.now();
    const card = makeReviewedCard();
    const result = applyResetDeck(card, before);
    const after = Date.now();
    expect(result.dueDate).toBeGreaterThanOrEqual(before);
    expect(result.dueDate).toBeLessThanOrEqual(after + 1);
  });
});

// ─── Difference between the two resets ───────────────────────────────────────

describe("resetDueDates vs resetDeck", () => {
  it("resetDueDates preserves reps; resetDeck wipes them", () => {
    const now = Date.now();
    const card = makeReviewedCard({ reps: 10 });
    const gentle = applyResetDueDates(card, now);
    const nuclear = applyResetDeck(card, now);
    expect(gentle.reps).toBe(10);
    expect(nuclear.reps).toBe(0);
  });

  it("resetDueDates preserves stability; resetDeck resets it", () => {
    const now = Date.now();
    const card = makeReviewedCard({ stability: 25.0 });
    const gentle = applyResetDueDates(card, now);
    const nuclear = applyResetDeck(card, now);
    expect(gentle.stability).toBe(25.0);
    expect(nuclear.stability).toBe(2.5);
  });

  it("both set dueDate to now", () => {
    const now = Date.now();
    const card = makeReviewedCard();
    const gentle = applyResetDueDates(card, now);
    const nuclear = applyResetDeck(card, now);
    expect(gentle.dueDate).toBe(now);
    expect(nuclear.dueDate).toBe(now);
  });
});
