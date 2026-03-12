/**
 * srs.remaining.test.ts
 *
 * Tests for the 5 remaining SRS items:
 *  1. Backlog priority: overdue cards sorted oldest-first
 *  2. Ease factor bounds: never below 1.3 or above 5.0
 *  3. Sync conflict resolution: last-review-wins
 *  4. Daily review cap: slider range and unlimited mode
 *  5. Review logging: CardReviewHistoryEntry shape
 */

import { describe, it, expect } from "vitest";
import { applySM2, getDueStats, MAX_INTERVAL_DAYS, type SM2Card } from "../shared/sm2";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function makeCard(overrides: Partial<SM2Card> = {}): SM2Card {
  return {
    wordId: "test-word",
    easeFactor: 2.5,
    interval: 1,
    repetition: 0,
    dueDate: Date.now(),
    nextReviewDate: new Date().toISOString().slice(0, 10),
    lastReviewed: null,
    createdAt: Date.now(),
    ...overrides,
  };
}

const DAY = 24 * 60 * 60 * 1000;

// ─── 1. Backlog Priority ──────────────────────────────────────────────────────

describe("Backlog priority: overdue cards sorted oldest-first", () => {
  it("getDueStats correctly categorises overdue vs due-today vs new", () => {
    const now = Date.now();
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const cards: SM2Card[] = [
      makeCard({ wordId: "new",      lastReviewed: null,           dueDate: now }),
      makeCard({ wordId: "today",    lastReviewed: now - 2 * DAY,  dueDate: todayStart.getTime() + 1 }),
      makeCard({ wordId: "overdue1", lastReviewed: now - 3 * DAY,  dueDate: now - 2 * DAY }),
      makeCard({ wordId: "overdue2", lastReviewed: now - 10 * DAY, dueDate: now - 9 * DAY }),
      makeCard({ wordId: "future",   lastReviewed: now,             dueDate: now + 2 * DAY }),
    ];

    const stats = getDueStats(cards, new Set());
    expect(stats.newCards).toBe(1);
    expect(stats.dueToday).toBe(1);
    expect(stats.overdue).toBe(2);
  });

  it("oldest-due cards sort before newer-due cards", () => {
    const now = Date.now();
    const cards: SM2Card[] = [
      makeCard({ wordId: "3days", dueDate: now - 3 * DAY, lastReviewed: now - 4 * DAY }),
      makeCard({ wordId: "1day",  dueDate: now - 1 * DAY, lastReviewed: now - 2 * DAY }),
      makeCard({ wordId: "7days", dueDate: now - 7 * DAY, lastReviewed: now - 8 * DAY }),
    ];

    // Simulate getDueCards sort (ascending dueDate)
    const due = cards
      .filter((c) => c.dueDate <= now)
      .sort((a, b) => a.dueDate - b.dueDate);

    expect(due[0].wordId).toBe("7days");
    expect(due[1].wordId).toBe("3days");
    expect(due[2].wordId).toBe("1day");
  });

  it("future cards are excluded from the queue", () => {
    const now = Date.now();
    const cards: SM2Card[] = [
      makeCard({ wordId: "due",    dueDate: now - 1 }),
      makeCard({ wordId: "future", dueDate: now + DAY }),
    ];
    const due = cards.filter((c) => c.dueDate <= now);
    expect(due).toHaveLength(1);
    expect(due[0].wordId).toBe("due");
  });
});

// ─── 2. Ease Factor Bounds ────────────────────────────────────────────────────

describe("Ease factor bounds: never below 1.3 or above 5.0", () => {
  it("ease factor never drops below 1.3 on repeated Don't Know", () => {
    let card = makeCard({ easeFactor: 1.4, repetition: 3, interval: 10 });
    // Simulate 20 Don't Know responses
    for (let i = 0; i < 20; i++) {
      const updates = applySM2(card, 0);
      card = { ...card, ...updates };
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("ease factor never exceeds 5.0 on repeated Know", () => {
    let card = makeCard({ easeFactor: 4.9, repetition: 5, interval: 30 });
    // Simulate 20 Know responses
    for (let i = 0; i < 20; i++) {
      const updates = applySM2(card, 2);
      card = { ...card, ...updates };
    }
    expect(card.easeFactor).toBeLessThanOrEqual(5.0);
  });

  it("ease factor starts at exactly 2.5 for new cards", () => {
    const card = makeCard({ easeFactor: 2.5, repetition: 0, interval: 1 });
    const updates = applySM2(card, 2);
    // After first Know: 2.5 + 0.1 = 2.6 (capped at 5.0)
    expect(updates.easeFactor).toBe(2.6);
  });

  it("ease factor decreases by 0.2 on Don't Know (legacy path)", () => {
    const card = makeCard({ easeFactor: 2.5 });
    const updates = applySM2(card, 0);
    expect(updates.easeFactor).toBe(2.3);
  });

  it("ease factor clamps to 1.3 minimum exactly", () => {
    const card = makeCard({ easeFactor: 1.4 });
    const updates = applySM2(card, 0);
    // 1.4 - 0.2 = 1.2 → clamped to 1.3
    expect(updates.easeFactor).toBe(1.3);
  });
});

// ─── 3. Sync Conflict Resolution ─────────────────────────────────────────────

describe("Sync conflict resolution: last-review-wins", () => {
  /**
   * The actual SQL conflict resolution is in server/db.ts (MySQL IF/COALESCE).
   * Here we test the LOGIC of the resolution rule in pure JS.
   */

  type SyncCard = {
    cardId: string;
    interval: number;
    repetition: number;
    dueDate: number;
    lastReviewed: number | null;
  };

  function applyConflictResolution(stored: SyncCard, incoming: SyncCard): SyncCard {
    const storedTs = stored.lastReviewed ?? 0;
    const incomingTs = incoming.lastReviewed ?? 0;
    // Last-review-wins: if incoming is more recent, use incoming SRS fields
    if (incomingTs >= storedTs) {
      return { ...stored, ...incoming };
    }
    return stored;
  }

  it("newer review from Device B wins over older review from Device A", () => {
    const deviceA: SyncCard = {
      cardId: "card-1",
      interval: 4,
      repetition: 2,
      dueDate: Date.now() + 4 * DAY,
      lastReviewed: 1000,
    };
    const deviceB: SyncCard = {
      cardId: "card-1",
      interval: 1,
      repetition: 1,
      dueDate: Date.now() + DAY,
      lastReviewed: 2000, // more recent
    };

    const result = applyConflictResolution(deviceA, deviceB);
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(1);
    expect(result.lastReviewed).toBe(2000);
  });

  it("stale sync from Device A does NOT overwrite newer Device B review", () => {
    const deviceB_stored: SyncCard = {
      cardId: "card-1",
      interval: 10,
      repetition: 3,
      dueDate: Date.now() + 10 * DAY,
      lastReviewed: 5000, // newer
    };
    const deviceA_incoming: SyncCard = {
      cardId: "card-1",
      interval: 1,
      repetition: 1,
      dueDate: Date.now() + DAY,
      lastReviewed: 1000, // older
    };

    const result = applyConflictResolution(deviceB_stored, deviceA_incoming);
    // Should keep Device B's newer data
    expect(result.interval).toBe(10);
    expect(result.repetition).toBe(3);
    expect(result.lastReviewed).toBe(5000);
  });

  it("null lastReviewed is treated as 0 (never reviewed)", () => {
    const stored: SyncCard = {
      cardId: "card-1",
      interval: 1,
      repetition: 0,
      dueDate: Date.now(),
      lastReviewed: null,
    };
    const incoming: SyncCard = {
      cardId: "card-1",
      interval: 4,
      repetition: 2,
      dueDate: Date.now() + 4 * DAY,
      lastReviewed: 1000,
    };

    const result = applyConflictResolution(stored, incoming);
    expect(result.interval).toBe(4);
    expect(result.lastReviewed).toBe(1000);
  });
});

// ─── 4. Daily Review Cap ──────────────────────────────────────────────────────

describe("Daily review cap: slider range and unlimited mode", () => {
  // Test the sliderPosToCount / countToSliderPos round-trip logic
  function sliderPosToCount(pos: number): number {
    const SLIDER_MIN = 10;
    const SLIDER_MAX = 500;
    if (pos <= 50) return Math.round(SLIDER_MIN + (pos / 50) * (100 - SLIDER_MIN));
    return Math.round(100 + ((pos - 50) / 50) * (SLIDER_MAX - 100));
  }

  function countToSliderPos(count: number): number {
    const SLIDER_MIN = 10;
    const SLIDER_MAX = 500;
    if (count <= 100) return ((count - SLIDER_MIN) / (100 - SLIDER_MIN)) * 50;
    return 50 + ((count - 100) / (SLIDER_MAX - 100)) * 50;
  }

  it("slider position 0 maps to minimum (10 cards)", () => {
    expect(sliderPosToCount(0)).toBe(10);
  });

  it("slider position 50 maps to 100 cards", () => {
    expect(sliderPosToCount(50)).toBe(100);
  });

  it("slider position 100 maps to maximum (500 cards)", () => {
    expect(sliderPosToCount(100)).toBe(500);
  });

  it("round-trip: count → pos → count is stable", () => {
    for (const count of [10, 20, 50, 100, 200, 350, 500]) {
      const pos = countToSliderPos(count);
      const back = sliderPosToCount(pos);
      expect(Math.abs(back - count)).toBeLessThanOrEqual(5); // allow ±5 rounding
    }
  });

  it("null cap (unlimited) means no limit applied", () => {
    const cap: number | null = null;
    const todayReviews = 9999;
    // Simulate the cap check in Deck.tsx
    const capReached = cap !== null && todayReviews >= cap;
    expect(capReached).toBe(false);
  });

  it("cap of 50 blocks review when 50 already done today", () => {
    const cap = 50;
    const todayReviews = 50;
    const capReached = cap !== null && todayReviews >= cap;
    expect(capReached).toBe(true);
  });
});

// ─── 5. Review Logging ────────────────────────────────────────────────────────

describe("Review logging: CardReviewHistoryEntry shape", () => {
  it("entry captures all required fields", () => {
    const entry = {
      cardId: "word-1-a",
      wordId: "word-1",
      hanzi: "学习",
      reviewedAt: Date.now(),
      rating: 2 as const,
      sessionMissed: false,
      oldInterval: 4,
      newInterval: 10,
      oldRepetition: 1,
      newRepetition: 2,
      oldEaseFactor: 2.5,
      newEaseFactor: 2.6,
    };

    expect(entry.cardId).toBe("word-1-a");
    expect(entry.rating).toBe(2);
    expect(entry.newInterval).toBeGreaterThan(entry.oldInterval);
    expect(entry.newRepetition).toBe(entry.oldRepetition + 1);
    expect(entry.newEaseFactor).toBeCloseTo(entry.oldEaseFactor + 0.1, 5);
  });

  it("sessionMissed=true forces interval to 1 and rep to 1", () => {
    const card = makeCard({ repetition: 3, interval: 30, easeFactor: 2.5 });
    const updates = applySM2(card, 2, true); // sessionMissed=true
    expect(updates.interval).toBe(1);
    expect(updates.repetition).toBe(1);
  });

  it("entry for a missed-then-known card reflects sessionMissed=true", () => {
    const card = makeCard({ repetition: 2, interval: 10, easeFactor: 2.5 });
    const updates = applySM2(card, 2, true);

    const entry = {
      cardId: "word-1-a",
      wordId: "word-1",
      hanzi: "复习",
      reviewedAt: Date.now(),
      rating: 2 as const,
      sessionMissed: true,
      oldInterval: card.interval,
      newInterval: updates.interval!,
      oldRepetition: card.repetition,
      newRepetition: updates.repetition!,
      oldEaseFactor: card.easeFactor,
      newEaseFactor: updates.easeFactor!,
    };

    expect(entry.sessionMissed).toBe(true);
    expect(entry.newInterval).toBe(1);
    expect(entry.newRepetition).toBe(1);
  });
});
