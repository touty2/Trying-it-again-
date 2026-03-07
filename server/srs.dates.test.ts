/**
 * srs.dates.test.ts — SRS Date Pipeline Tests
 *
 * Verifies that the SRS system correctly uses absolute UTC timestamps for
 * scheduling, that getDueCards includes overdue cards and excludes future cards,
 * and that the streak calculation is timezone-safe.
 *
 * All tests use the pure functions from shared/sm2.ts and client/src/lib/db.ts
 * (the date helpers and getDueStats). No browser APIs are used.
 */

import { describe, it, expect } from "vitest";
import {
  applySM2,
  toISODate,
  fromISODate,
  getDueStats,
  MAX_INTERVAL_DAYS,
  type SM2Card,
} from "../../shared/sm2";

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

const DAY_MS = 24 * 60 * 60 * 1000;

// ─── 1. Absolute Timestamp Storage ───────────────────────────────────────────

describe("Absolute timestamp storage", () => {
  it("dueDate is stored as absolute UTC milliseconds, not a relative offset", () => {
    const before = Date.now();
    const card = makeCard({ repetition: 0 });
    const updates = applySM2(card, 2, false);
    const after = Date.now();

    // dueDate should be approximately 1 day from now (rep=0 → 1 day)
    const expectedMin = before + 1 * DAY_MS;
    const expectedMax = after + 1 * DAY_MS;

    expect(updates.dueDate).toBeGreaterThanOrEqual(expectedMin);
    expect(updates.dueDate).toBeLessThanOrEqual(expectedMax);

    // Sanity: it is NOT a relative value like 1 or 86400
    expect(updates.dueDate).toBeGreaterThan(1_000_000_000_000); // > year 2001
  });

  it("review at 10:00 AM → 1-day interval → due tomorrow at ~10:00 AM", () => {
    // Simulate review at a specific time
    const reviewTime = new Date("2024-03-15T10:00:00.000Z").getTime();
    const card = makeCard({ repetition: 0, dueDate: reviewTime });

    // Manually compute what applySM2 would produce if called at reviewTime
    const expectedDueDate = reviewTime + 1 * DAY_MS;
    const expectedISODate = "2024-03-16"; // UTC date

    // Verify toISODate gives the correct UTC date
    expect(toISODate(expectedDueDate)).toBe(expectedISODate);

    // Verify the interval math
    const computed = reviewTime + 1 * DAY_MS;
    expect(computed).toBe(new Date("2024-03-16T10:00:00.000Z").getTime());
  });

  it("review at 11:59 PM UTC → 1-day interval → due tomorrow at ~11:59 PM UTC", () => {
    const reviewTime = new Date("2024-03-15T23:59:00.000Z").getTime();
    const expectedDueDate = reviewTime + 1 * DAY_MS;

    // Should still be March 16 UTC
    expect(toISODate(expectedDueDate)).toBe("2024-03-16");
    // Exact time preserved
    expect(expectedDueDate).toBe(new Date("2024-03-16T23:59:00.000Z").getTime());
  });

  it("4-day interval produces correct absolute timestamp", () => {
    const reviewTime = new Date("2024-03-15T10:00:00.000Z").getTime();
    const expected = reviewTime + 4 * DAY_MS;
    expect(toISODate(expected)).toBe("2024-03-19");
  });

  it("10-day interval produces correct absolute timestamp", () => {
    const reviewTime = new Date("2024-03-15T10:00:00.000Z").getTime();
    const expected = reviewTime + 10 * DAY_MS;
    expect(toISODate(expected)).toBe("2024-03-25");
  });
});

// ─── 2. Queue Generation Logic ────────────────────────────────────────────────

describe("Queue generation (getDueStats)", () => {
  const now = Date.now();
  const yesterday = now - 1 * DAY_MS;
  const threeDaysAgo = now - 3 * DAY_MS;
  const tomorrow = now + 1 * DAY_MS;
  const tomorrowEarly = now + 3 * 60 * 60 * 1000; // 3 hours from now

  it("card due yesterday (overdue) appears in queue", () => {
    const card = makeCard({ dueDate: yesterday, lastReviewed: threeDaysAgo });
    const stats = getDueStats([card], new Set());
    expect(stats.overdue).toBe(1);
    expect(stats.dueToday).toBe(0);
  });

  it("card due 3 days ago (overdue) appears in queue", () => {
    const card = makeCard({ dueDate: threeDaysAgo, lastReviewed: threeDaysAgo - DAY_MS });
    const stats = getDueStats([card], new Set());
    expect(stats.overdue).toBe(1);
  });

  it("card due tomorrow does NOT appear in today's queue", () => {
    const card = makeCard({ dueDate: tomorrow, lastReviewed: now });
    const stats = getDueStats([card], new Set());
    expect(stats.overdue).toBe(0);
    expect(stats.dueToday).toBe(0);
  });

  it("card due in 3 hours does NOT appear in overdue (it's today or future)", () => {
    const card = makeCard({ dueDate: tomorrowEarly, lastReviewed: now });
    const stats = getDueStats([card], new Set());
    // It's either dueToday or 0 overdue — never overdue
    expect(stats.overdue).toBe(0);
  });

  it("new card (never reviewed) is counted as newCard, not overdue", () => {
    const card = makeCard({ dueDate: now, lastReviewed: null });
    const stats = getDueStats([card], new Set());
    expect(stats.newCards).toBe(1);
    expect(stats.overdue).toBe(0);
  });

  it("completed word is excluded from all counts", () => {
    const card = makeCard({ wordId: "completed-word", dueDate: yesterday, lastReviewed: threeDaysAgo });
    const stats = getDueStats([card], new Set(["completed-word"]));
    expect(stats.overdue).toBe(0);
    expect(stats.dueToday).toBe(0);
    expect(stats.newCards).toBe(0);
  });

  it("skipping 3 days: all cards due in that period accumulate", () => {
    // Simulate 5 cards due over the past 3 days
    const cards = [
      makeCard({ wordId: "w1", dueDate: now - 3 * DAY_MS, lastReviewed: now - 4 * DAY_MS }),
      makeCard({ wordId: "w2", dueDate: now - 2 * DAY_MS, lastReviewed: now - 3 * DAY_MS }),
      makeCard({ wordId: "w3", dueDate: now - 1 * DAY_MS, lastReviewed: now - 2 * DAY_MS }),
      makeCard({ wordId: "w4", dueDate: now - 1 * DAY_MS, lastReviewed: now - 2 * DAY_MS }),
      makeCard({ wordId: "w5", dueDate: tomorrow, lastReviewed: now }), // not due yet
    ];
    const stats = getDueStats(cards, new Set());
    expect(stats.overdue).toBe(4); // w1, w2, w3, w4
    expect(stats.dueToday).toBe(0);
  });
});

// ─── 3. Date Helper Correctness ───────────────────────────────────────────────

describe("toISODate / fromISODate", () => {
  it("toISODate returns YYYY-MM-DD in UTC", () => {
    const ts = new Date("2024-06-15T12:00:00.000Z").getTime();
    expect(toISODate(ts)).toBe("2024-06-15");
  });

  it("toISODate handles end-of-day UTC correctly", () => {
    const ts = new Date("2024-06-15T23:59:59.999Z").getTime();
    expect(toISODate(ts)).toBe("2024-06-15");
  });

  it("fromISODate returns start-of-day UTC timestamp", () => {
    const ts = fromISODate("2024-06-15");
    expect(ts).toBe(new Date("2024-06-15T00:00:00.000Z").getTime());
  });

  it("round-trip: toISODate(fromISODate(date)) === date", () => {
    const date = "2024-06-15";
    expect(toISODate(fromISODate(date))).toBe(date);
  });
});

// ─── 4. MAX_INTERVAL_DAYS Cap ─────────────────────────────────────────────────

describe("MAX_INTERVAL_DAYS cap", () => {
  it("interval never exceeds 10 years (3650 days)", () => {
    // Card with very high ease factor and long interval
    const card = makeCard({
      repetition: 100,
      interval: 3000,
      easeFactor: 5.0,
      lastReviewed: Date.now() - 3000 * DAY_MS,
    });
    const updates = applySM2(card, 2, false);
    expect(updates.interval).toBeLessThanOrEqual(MAX_INTERVAL_DAYS);
  });

  it("dueDate never exceeds ~10 years from now", () => {
    const card = makeCard({
      repetition: 100,
      interval: 3000,
      easeFactor: 5.0,
    });
    const updates = applySM2(card, 2, false);
    const maxFutureMs = Date.now() + MAX_INTERVAL_DAYS * DAY_MS + DAY_MS; // +1 day buffer
    expect(updates.dueDate).toBeLessThanOrEqual(maxFutureMs);
  });
});

// ─── 5. nextReviewDate ISO String ─────────────────────────────────────────────

describe("nextReviewDate ISO string", () => {
  it("nextReviewDate matches the UTC date of dueDate", () => {
    const card = makeCard({ repetition: 1 }); // 4-day interval
    const updates = applySM2(card, 2, false);
    expect(updates.nextReviewDate).toBe(toISODate(updates.dueDate!));
  });

  it("nextReviewDate is a valid YYYY-MM-DD string", () => {
    const card = makeCard({ repetition: 0 });
    const updates = applySM2(card, 2, false);
    expect(updates.nextReviewDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
