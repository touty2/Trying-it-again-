/**
 * SRS Algorithm Tests
 *
 * Covers every behaviour specified in the requirements:
 *  1. Don't Know resets repetition to 0 and schedules 1 day
 *  2. Multiple Don't Know then Know → 1 day (sessionMissed flag)
 *  3. Three consecutive Know → 1 day → 4 days → 10 days
 *  4. After rep 3, intervals grow exponentially (prev × easeFactor)
 *  5. Ease factor starts at 2.5, decreases on Don't Know (min 1.3)
 *  6. Ease factor increases slightly on Know (max 5.0)
 *  7. MAX_INTERVAL_DAYS cap (3650 days)
 *  8. Session requeue logic (Don't Know requeues; Know removes from queue)
 */

import { describe, expect, it } from "vitest";
import {
  applySM2,
  calculateKnowInterval,
  MAX_INTERVAL_DAYS,
  toISODate,
  fromISODate,
  type SM2Card,
  type SM2Quality,
} from "../shared/sm2";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function applyKnow(card: SM2Card, sessionMissed = false): SM2Card {
  return { ...card, ...applySM2(card, 2, sessionMissed) } as SM2Card;
}

function applyDontKnow(card: SM2Card): SM2Card {
  return { ...card, ...applySM2(card, 0) } as SM2Card;
}

// ─── Don't Know behaviour ─────────────────────────────────────────────────────

describe("Don't Know (quality=0)", () => {
  it("resets repetition to 0", () => {
    const card = makeCard({ repetition: 3, interval: 10 });
    const updated = applyDontKnow(card);
    expect(updated.repetition).toBe(0);
  });

  it("sets interval to 1 day", () => {
    const card = makeCard({ repetition: 3, interval: 10 });
    const updated = applyDontKnow(card);
    expect(updated.interval).toBe(1);
  });

  it("schedules dueDate approximately 1 day from now", () => {
    const before = Date.now();
    const card = makeCard();
    const updated = applyDontKnow(card);
    const after = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    expect(updated.dueDate).toBeGreaterThanOrEqual(before + oneDayMs - 100);
    expect(updated.dueDate).toBeLessThanOrEqual(after + oneDayMs + 100);
  });

  it("decreases easeFactor by 0.20", () => {
    const card = makeCard({ easeFactor: 2.5 });
    const updated = applyDontKnow(card);
    expect(updated.easeFactor).toBeCloseTo(2.3, 5);
  });

  it("clamps easeFactor to minimum 1.3", () => {
    const card = makeCard({ easeFactor: 1.3 });
    const updated = applyDontKnow(card);
    expect(updated.easeFactor).toBe(1.3);
  });

  it("sets lastReviewed to approximately now", () => {
    const before = Date.now();
    const card = makeCard();
    const updated = applyDontKnow(card);
    const after = Date.now();
    expect(updated.lastReviewed).toBeGreaterThanOrEqual(before);
    expect(updated.lastReviewed).toBeLessThanOrEqual(after + 10);
  });

  it("sets nextReviewDate as ISO date string matching dueDate", () => {
    const card = makeCard();
    const updated = applyDontKnow(card);
    expect(updated.nextReviewDate).toBe(toISODate(updated.dueDate));
  });
});

// ─── Know — consecutive interval schedule ────────────────────────────────────

describe("Know (quality=2) — consecutive interval schedule", () => {
  it("rep 0 → 1: interval = 1 day", () => {
    const card = makeCard({ repetition: 0, interval: 1 });
    const updated = applyKnow(card);
    expect(updated.repetition).toBe(1);
    expect(updated.interval).toBe(1);
  });

  it("rep 1 → 2: interval = 4 days", () => {
    const card = makeCard({ repetition: 1, interval: 1 });
    const updated = applyKnow(card);
    expect(updated.repetition).toBe(2);
    expect(updated.interval).toBe(4);
  });

  it("rep 2 → 3: interval = 10 days", () => {
    const card = makeCard({ repetition: 2, interval: 4 });
    const updated = applyKnow(card);
    expect(updated.repetition).toBe(3);
    expect(updated.interval).toBe(10);
  });

  it("rep 3 → 4: interval = round(10 × newEF) — exponential growth begins", () => {
    const card = makeCard({ repetition: 3, interval: 10, easeFactor: 2.5 });
    const updated = applyKnow(card);
    expect(updated.repetition).toBe(4);
    const newEF = Math.min(5.0, 2.5 + 0.1); // 2.6
    expect(updated.interval).toBe(Math.round(10 * newEF));
  });

  it("rep 4 → 5: continues exponential growth", () => {
    const card = makeCard({ repetition: 4, interval: 26, easeFactor: 2.6 });
    const updated = applyKnow(card);
    expect(updated.repetition).toBe(5);
    const newEF = Math.min(5.0, 2.6 + 0.1); // 2.7
    expect(updated.interval).toBe(Math.round(26 * newEF));
  });
});

// ─── Session-missed flag ──────────────────────────────────────────────────────

describe("sessionMissed flag", () => {
  it("Know after session miss → interval 1 day (not 4) at rep=1", () => {
    const card = makeCard({ repetition: 1, interval: 1 });
    const updated = applyKnow(card, true);
    expect(updated.interval).toBe(1);
  });

  it("Know after session miss → interval 1 day (not 10) at rep=2", () => {
    const card = makeCard({ repetition: 2, interval: 4 });
    const updated = applyKnow(card, true);
    expect(updated.interval).toBe(1);
  });

  it("Know after session miss → interval 1 day even at rep=3", () => {
    const card = makeCard({ repetition: 3, interval: 10 });
    const updated = applyKnow(card, true);
    expect(updated.interval).toBe(1);
  });

  it("Know WITHOUT session miss at rep=1 → interval 4 days", () => {
    const card = makeCard({ repetition: 1, interval: 1 });
    const updated = applyKnow(card, false);
    expect(updated.interval).toBe(4);
  });

  it("multiple Don't Know then Know: full session simulation", () => {
    let card = makeCard({ repetition: 0, interval: 1 });

    // First Don't Know
    card = applyDontKnow(card);
    expect(card.repetition).toBe(0);
    expect(card.interval).toBe(1);

    // Second Don't Know
    card = applyDontKnow(card);
    expect(card.repetition).toBe(0);
    expect(card.interval).toBe(1);

    // Now Know with sessionMissed=true (card was missed in this session)
    const final = applyKnow(card, true);
    expect(final.interval).toBe(1);
    expect(final.repetition).toBe(1);
  });
});

// ─── Ease factor ──────────────────────────────────────────────────────────────

describe("easeFactor", () => {
  it("starts at 2.5 for new cards", () => {
    expect(makeCard().easeFactor).toBe(2.5);
  });

  it("increases by 0.1 on Know", () => {
    const updated = applyKnow(makeCard({ easeFactor: 2.5 }));
    expect(updated.easeFactor).toBeCloseTo(2.6, 5);
  });

  it("does not exceed 5.0 on Know", () => {
    const updated = applyKnow(makeCard({ easeFactor: 5.0 }));
    expect(updated.easeFactor).toBe(5.0);
  });

  it("decreases by 0.2 on Don't Know", () => {
    const updated = applyDontKnow(makeCard({ easeFactor: 2.5 }));
    expect(updated.easeFactor).toBeCloseTo(2.3, 5);
  });

  it("does not go below 1.3 on Don't Know", () => {
    const updated = applyDontKnow(makeCard({ easeFactor: 1.4 }));
    expect(updated.easeFactor).toBe(1.3);
  });

  it("grows over many consecutive Know responses", () => {
    let card = makeCard({ repetition: 0, interval: 1, easeFactor: 2.5 });
    for (let i = 0; i < 10; i++) card = applyKnow(card);
    expect(card.easeFactor).toBeGreaterThan(2.5);
  });
});

// ─── MAX_INTERVAL_DAYS cap ────────────────────────────────────────────────────

describe("MAX_INTERVAL_DAYS cap", () => {
  it("is 3650 days (10 years)", () => {
    expect(MAX_INTERVAL_DAYS).toBe(3650);
  });

  it("interval never exceeds MAX_INTERVAL_DAYS", () => {
    const card = makeCard({ repetition: 100, interval: 3000, easeFactor: 5.0 });
    const updated = applyKnow(card);
    expect(updated.interval).toBeLessThanOrEqual(MAX_INTERVAL_DAYS);
  });
});

// ─── calculateKnowInterval unit tests ────────────────────────────────────────

describe("calculateKnowInterval", () => {
  // Uses PRE-Know repetition count (card.repetition before this Know response)
  it("preKnowRep=0 (first ever success) → 1 day", () => expect(calculateKnowInterval(0, 1, 2.5, false)).toBe(1));
  it("preKnowRep=1 (second success) → 4 days", () => expect(calculateKnowInterval(1, 1, 2.5, false)).toBe(4));
  it("preKnowRep=2 (third success) → 10 days", () => expect(calculateKnowInterval(2, 4, 2.5, false)).toBe(10));
  it("preKnowRep=3 → round(prev × ef)", () => expect(calculateKnowInterval(3, 10, 2.5, false)).toBe(25));
  it("sessionMissed overrides all to 1 regardless of rep", () => {
    expect(calculateKnowInterval(0, 1, 2.5, true)).toBe(1);
    expect(calculateKnowInterval(1, 1, 2.5, true)).toBe(1);
    expect(calculateKnowInterval(2, 4, 2.5, true)).toBe(1);
    expect(calculateKnowInterval(10, 100, 5.0, true)).toBe(1);
  });
});

// ─── Date helpers ─────────────────────────────────────────────────────────────

describe("toISODate / fromISODate", () => {
  it("converts timestamp to ISO date string", () => {
    const ts = new Date("2025-06-15T00:00:00.000Z").getTime();
    expect(toISODate(ts)).toBe("2025-06-15");
  });

  it("converts ISO date string to start-of-day UTC timestamp", () => {
    const ts = fromISODate("2025-06-15");
    expect(new Date(ts).toISOString()).toBe("2025-06-15T00:00:00.000Z");
  });

  it("round-trips correctly", () => {
    const original = "2026-01-01";
    expect(toISODate(fromISODate(original))).toBe(original);
  });
});

// ─── Session requeue simulation ───────────────────────────────────────────────

describe("Session requeue logic (simulated)", () => {
  function simulateSession(
    initialQueue: string[],
    getAnswer: (wordId: string, callCount: number) => SM2Quality
  ): { reviewedOrder: string[]; finalRequeuedSet: Set<string> } {
    let queue = [...initialQueue];
    let idx = 0;
    const requeued = new Set<string>();
    const callCounts: Record<string, number> = {};
    const reviewedOrder: string[] = [];

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

  it("Don't Know card appears again at the end of the session", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B", "C"],
      (wordId) => (wordId === "A" ? 0 : 2)
    );
    expect(reviewedOrder).toEqual(["A", "B", "C", "A"]);
  });

  it("card keeps requeueing until answered correctly", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B"],
      (wordId, callCount) => {
        if (wordId === "A" && callCount < 3) return 0;
        return 2;
      }
    );
    expect(reviewedOrder.filter((w) => w === "A")).toHaveLength(3);
    expect(reviewedOrder.filter((w) => w === "B")).toHaveLength(1);
  });

  it("requeued set is empty when all cards answered correctly", () => {
    const { finalRequeuedSet } = simulateSession(
      ["A", "B"],
      (wordId, callCount) => {
        if (wordId === "A" && callCount < 3) return 0;
        return 2;
      }
    );
    expect(finalRequeuedSet.size).toBe(0);
  });

  it("Know card is never requeued", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B", "C"],
      () => 2
    );
    expect(reviewedOrder).toEqual(["A", "B", "C"]);
  });

  it("multiple cards can be requeued simultaneously", () => {
    const { reviewedOrder } = simulateSession(
      ["A", "B", "C"],
      (wordId, callCount) => {
        if ((wordId === "A" || wordId === "B") && callCount === 1) return 0;
        return 2;
      }
    );
    expect(reviewedOrder).toEqual(["A", "B", "C", "A", "B"]);
  });
});
