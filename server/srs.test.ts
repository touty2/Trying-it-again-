/**
 * SRS (Spaced Repetition System) Tests
 *
 * Covers:
 *  1. SM-2 algorithm correctness (intervals, repetitions, ease factor)
 *  2. "Don't Know" (quality=0) requeue behaviour
 *  3. "Nearly" (quality=1) conservative interval growth
 *  4. "Know" (quality=2) standard SM-2 growth
 *  5. Ease factor bounds (min 1.3)
 *  6. Overdue card handling (no penalty for inactivity)
 */

import { describe, it, expect } from "vitest";
import { applySM2, toISODate, fromISODate } from "@shared/sm2";
import type { SM2Card, SM2Quality } from "@shared/sm2";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeCard(overrides: Partial<SM2Card> = {}): SM2Card {
  const now = Date.now();
  return {
    wordId: "test-word",
    easeFactor: 2.5,
    interval: 1,
    repetition: 0,
    dueDate: now,
    nextReviewDate: toISODate(now),
    lastReviewed: null,
    createdAt: now,
    ...overrides,
  };
}

// ─── SM-2 Algorithm Tests ─────────────────────────────────────────────────────

describe("applySM2 — Don't Know (quality=0)", () => {
  it("resets repetition to 0", () => {
    const card = makeCard({ repetition: 3, interval: 10, easeFactor: 2.5 });
    const result = applySM2(card, 0);
    expect(result.repetition).toBe(0);
  });

  it("resets interval to 1", () => {
    const card = makeCard({ repetition: 3, interval: 10, easeFactor: 2.5 });
    const result = applySM2(card, 0);
    expect(result.interval).toBe(1);
  });

  it("reduces ease factor by 0.20", () => {
    const card = makeCard({ easeFactor: 2.5 });
    const result = applySM2(card, 0);
    expect(result.easeFactor).toBeCloseTo(2.3, 5);
  });

  it("clamps ease factor to minimum 1.3", () => {
    const card = makeCard({ easeFactor: 1.35 });
    const result = applySM2(card, 0);
    expect(result.easeFactor).toBe(1.3);
  });

  it("sets dueDate ~1 day in the future", () => {
    const before = Date.now();
    const card = makeCard();
    const result = applySM2(card, 0);
    const after = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    expect(result.dueDate).toBeGreaterThanOrEqual(before + oneDayMs - 100);
    expect(result.dueDate).toBeLessThanOrEqual(after + oneDayMs + 100);
  });

  it("sets lastReviewed to approximately now", () => {
    const before = Date.now();
    const card = makeCard();
    const result = applySM2(card, 0);
    const after = Date.now();
    expect(result.lastReviewed).toBeGreaterThanOrEqual(before);
    expect(result.lastReviewed).toBeLessThanOrEqual(after + 10);
  });

  it("sets nextReviewDate as ISO date string matching dueDate", () => {
    const card = makeCard();
    const result = applySM2(card, 0);
    expect(result.nextReviewDate).toBe(toISODate(result.dueDate!));
  });
});

describe("applySM2 — Nearly (quality=1)", () => {
  it("increments repetition by 1", () => {
    const card = makeCard({ repetition: 2, interval: 6, easeFactor: 2.5 });
    const result = applySM2(card, 1);
    expect(result.repetition).toBe(3);
  });

  it("reduces ease factor by 0.15", () => {
    const card = makeCard({ easeFactor: 2.5 });
    const result = applySM2(card, 1);
    expect(result.easeFactor).toBeCloseTo(2.35, 5);
  });

  it("clamps ease factor to minimum 1.3", () => {
    const card = makeCard({ easeFactor: 1.4 });
    const result = applySM2(card, 1);
    expect(result.easeFactor).toBe(1.3);
  });

  it("uses interval=1 for first repetition", () => {
    const card = makeCard({ repetition: 0, interval: 1 });
    const result = applySM2(card, 1);
    expect(result.interval).toBe(1);
  });

  it("uses interval=3 for second repetition", () => {
    const card = makeCard({ repetition: 1, interval: 1 });
    const result = applySM2(card, 1);
    expect(result.interval).toBe(3);
  });

  it("grows interval conservatively for rep≥3", () => {
    const card = makeCard({ repetition: 2, interval: 6, easeFactor: 2.5 });
    const result = applySM2(card, 1);
    // max(6+1, round(6*1.2)) = max(7, 7) = 7
    expect(result.interval).toBe(7);
  });
});

describe("applySM2 — Know (quality=2)", () => {
  it("increments repetition by 1", () => {
    const card = makeCard({ repetition: 2, interval: 6, easeFactor: 2.5 });
    const result = applySM2(card, 2);
    expect(result.repetition).toBe(3);
  });

  it("increases ease factor by 0.10", () => {
    const card = makeCard({ easeFactor: 2.5 });
    const result = applySM2(card, 2);
    expect(result.easeFactor).toBeCloseTo(2.6, 5);
  });

  it("uses interval=1 for first repetition", () => {
    const card = makeCard({ repetition: 0, interval: 1 });
    const result = applySM2(card, 2);
    expect(result.interval).toBe(1);
  });

  it("uses interval=6 for second repetition", () => {
    const card = makeCard({ repetition: 1, interval: 1 });
    const result = applySM2(card, 2);
    expect(result.interval).toBe(6);
  });

  it("multiplies interval by easeFactor for rep≥3", () => {
    const card = makeCard({ repetition: 2, interval: 6, easeFactor: 2.5 });
    const result = applySM2(card, 2);
    // newEF = 2.6, newInterval = round(6 * 2.6) = 16
    expect(result.interval).toBe(Math.round(6 * 2.6));
  });

  it("grows ease factor over many correct reviews", () => {
    let card = makeCard({ repetition: 0, interval: 1, easeFactor: 2.5 });
    for (let i = 0; i < 10; i++) {
      const updates = applySM2(card, 2);
      card = { ...card, ...updates } as SM2Card;
    }
    expect(card.easeFactor).toBeGreaterThan(2.5);
  });
});

describe("applySM2 — Overdue card handling", () => {
  it("does not penalise ease factor for overdue cards (inactivity is neutral)", () => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const card = makeCard({ dueDate: thirtyDaysAgo, repetition: 3, interval: 10, easeFactor: 2.5 });
    const result = applySM2(card, 2);
    expect(result.easeFactor).toBeGreaterThan(2.5);
  });

  it("sets next due date from NOW, not from the original due date", () => {
    const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const card = makeCard({ dueDate: thirtyDaysAgo, repetition: 3, interval: 10, easeFactor: 2.5 });
    const before = Date.now();
    const result = applySM2(card, 2);
    expect(result.dueDate).toBeGreaterThan(before);
  });
});

describe("toISODate / fromISODate round-trip", () => {
  it("converts timestamp to ISO date string", () => {
    const ts = new Date("2025-06-15T00:00:00.000Z").getTime();
    expect(toISODate(ts)).toBe("2025-06-15");
  });

  it("converts ISO date string back to start-of-day UTC timestamp", () => {
    const iso = "2025-06-15";
    const ts = fromISODate(iso);
    expect(new Date(ts).toISOString()).toBe("2025-06-15T00:00:00.000Z");
  });

  it("round-trips correctly", () => {
    const original = "2026-01-01";
    expect(toISODate(fromISODate(original))).toBe(original);
  });
});

// ─── Requeue Logic Tests ──────────────────────────────────────────────────────

describe("Session requeue logic (simulated)", () => {
  /**
   * Simulate the Deck.tsx requeue behaviour in pure JS:
   *  - reviewQueue is an array of wordIds
   *  - quality=0 appends the wordId to the end of the queue
   *  - quality≥1 removes it from the requeued set
   *  - Session ends when currentIdx >= reviewQueue.length
   */
  function simulateSession(
    initialQueue: string[],
    getAnswer: (wordId: string, callCount: number) => SM2Quality
  ): { reviewedOrder: string[]; finalRequeuedSet: Set<string> } {
    let queue = [...initialQueue];
    let idx = 0;
    const requeued = new Set<string>();
    const reviewedOrder: string[] = [];
    const callCounts: Record<string, number> = {};

    while (idx < queue.length) {
      const wordId = queue[idx];
      callCounts[wordId] = (callCounts[wordId] ?? 0) + 1;
      const quality = getAnswer(wordId, callCounts[wordId]);
      reviewedOrder.push(wordId);

      if (quality === 0) {
        queue = [...queue, wordId];
        requeued.add(wordId);
      } else {
        requeued.delete(wordId);
      }
      idx++;
    }

    return { reviewedOrder, finalRequeuedSet: requeued };
  }

  it("a 'Don't Know' card appears again at the end of the session", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B", "C"],
      (wordId) => (wordId === "A" ? 0 : 2) // A wrong on first pass, right on second
    );
    // A appears twice: first at index 0, then requeued after C
    expect(reviewedOrder).toEqual(["A", "B", "C", "A"]);
  });

  it("a card keeps requeueing until answered with quality≥1", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B"],
      (wordId, callCount) => {
        if (wordId === "A" && callCount < 3) return 0; // wrong twice, right on 3rd
        return 2;
      }
    );
    // A appears 3 times total, B appears once
    expect(reviewedOrder.filter((w) => w === "A")).toHaveLength(3);
    expect(reviewedOrder.filter((w) => w === "B")).toHaveLength(1);
  });

  it("requeued set is empty when all cards are eventually answered correctly", () => {
    const { finalRequeuedSet } = simulateSession(
      ["A", "B"],
      (wordId, callCount) => {
        if (wordId === "A" && callCount < 3) return 0;
        return 2;
      }
    );
    expect(finalRequeuedSet.size).toBe(0);
  });

  it("'Nearly' (quality=1) also removes card from requeued set", () => {
    const { finalRequeuedSet } = simulateSession(
      ["A", "B"],
      (wordId, callCount) => {
        if (wordId === "A" && callCount === 1) return 0; // wrong first time
        if (wordId === "A" && callCount === 2) return 1; // nearly on second
        return 2;
      }
    );
    expect(finalRequeuedSet.size).toBe(0);
  });

  it("a 'Know' card is never requeued", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B", "C"],
      () => 2 // always Know
    );
    expect(reviewedOrder).toEqual(["A", "B", "C"]);
  });

  it("multiple different cards can be requeued simultaneously", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B", "C"],
      (wordId, callCount) => {
        // Both A and B wrong on first pass, right on second
        if ((wordId === "A" || wordId === "B") && callCount === 1) return 0;
        return 2;
      }
    );
    expect(reviewedOrder).toEqual(["A", "B", "C", "A", "B"]);
  });
});
