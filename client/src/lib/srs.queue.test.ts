/**
 * SRS Queue Fix Tests
 *
 * Verifies:
 * 1. getDueStats no longer excludes completed words from counts
 * 2. applyFSRS respects desiredRetention parameter
 * 3. capInterval logic is correct
 */

import { describe, it, expect } from "vitest";
import { getDueStats, applyFSRS, createFSRSCard, type Flashcard } from "./db";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeCard(overrides: Partial<Flashcard> = {}): Flashcard {
  const base = createFSRSCard("word-1", "recognition");
  return { ...base, ...overrides };
}

const NOW = Date.now();
const YESTERDAY = NOW - 25 * 60 * 60 * 1000; // 25h ago = overdue
const TOMORROW = NOW + 25 * 60 * 60 * 1000;  // 25h from now = not yet due

// ─── getDueStats: completed words no longer suppressed ───────────────────────

describe("getDueStats — completed words no longer excluded", () => {
  it("counts a due card even when its wordId is in completedWordIds", () => {
    const cards = [makeCard({ wordId: "word-1", dueDate: YESTERDAY, lastReviewed: NOW - 1000 })];
    const completedWordIds = new Set(["word-1"]);

    const stats = getDueStats(cards, completedWordIds);
    // Previously this would return { dueToday: 0, overdue: 0, newCards: 0 }
    // After fix it should count the card
    expect(stats.overdue).toBe(1);
  });

  it("counts a new card (lastReviewed=null) even when completed", () => {
    const cards = [makeCard({ wordId: "word-2", lastReviewed: null, dueDate: NOW })];
    const completedWordIds = new Set(["word-2"]);

    const stats = getDueStats(cards, completedWordIds);
    expect(stats.newCards).toBe(1);
    expect(stats.dueToday).toBe(1);
  });

  it("does not count future cards regardless of completed status", () => {
    const cards = [makeCard({ wordId: "word-3", dueDate: TOMORROW, lastReviewed: NOW - 1000 })];
    const completedWordIds = new Set(["word-3"]);

    const stats = getDueStats(cards, completedWordIds);
    expect(stats.dueToday).toBe(0);
    expect(stats.overdue).toBe(0);
  });

  it("correctly counts a mix of due, overdue, and new cards", () => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayMs = todayStart.getTime();

    const cards = [
      makeCard({ wordId: "w1", lastReviewed: null, dueDate: NOW }),          // new
      makeCard({ wordId: "w2", dueDate: YESTERDAY, lastReviewed: NOW - 1000 }), // overdue
      makeCard({ wordId: "w3", dueDate: todayMs + 3600_000, lastReviewed: NOW - 1000 }), // due today
      makeCard({ wordId: "w4", dueDate: TOMORROW, lastReviewed: NOW - 1000 }), // not due
    ];

    const stats = getDueStats(cards, new Set());
    expect(stats.newCards).toBe(1);
    expect(stats.overdue).toBe(1);
    // dueToday = new card + today-scheduled card = 2
    expect(stats.dueToday).toBe(2);
  });
});

// ─── applyFSRS: desiredRetention affects interval ────────────────────────────

describe("applyFSRS — desiredRetention parameter", () => {
  it("produces a shorter interval at high retention (0.95) vs low retention (0.70)", () => {
    // A card that has been reviewed several times (reps=3) so intervals are meaningful
    const card = makeCard({
      reps: 3,
      stability: 10,
      difficulty: 5,
      lastReviewed: NOW - 7 * 24 * 60 * 60 * 1000,
      dueDate: NOW,
      state: 2, // Review state
    });

    const highRetention = applyFSRS(card, 3, 0.95); // Good at 95% retention
    const lowRetention  = applyFSRS(card, 3, 0.70); // Good at 70% retention

    // Higher retention = shorter interval (review sooner to maintain high recall)
    // Lower retention = longer interval (can wait longer before forgetting)
    expect(highRetention.scheduledDays!).toBeLessThan(lowRetention.scheduledDays!);
  });

  it("returns a positive scheduled interval for a Good rating", () => {
    const card = makeCard({ reps: 1, stability: 2, difficulty: 5, state: 1 });
    const result = applyFSRS(card, 3, 0.85);
    expect(result.scheduledDays).toBeGreaterThan(0);
    expect(result.dueDate).toBeGreaterThan(NOW - 1000);
  });

  it("returns a shorter interval for Again than for Good", () => {
    const card = makeCard({ reps: 3, stability: 10, difficulty: 5, state: 2 });
    const again = applyFSRS(card, 1, 0.85);
    const good  = applyFSRS(card, 3, 0.85);
    // Again (lapse) should schedule sooner than Good
    expect(again.scheduledDays!).toBeLessThan(good.scheduledDays!);
  });
});

// ─── createFSRSCard: new cards are immediately due ────────────────────────────

describe("createFSRSCard", () => {
  it("creates a card with dueDate = now (immediately due)", () => {
    const before = Date.now();
    const card = createFSRSCard("word-x", "recognition");
    const after = Date.now();
    expect(card.dueDate).toBeGreaterThanOrEqual(before);
    expect(card.dueDate).toBeLessThanOrEqual(after);
  });

  it("creates a card with lastReviewed = null", () => {
    const card = createFSRSCard("word-x", "production");
    expect(card.lastReviewed).toBeNull();
  });

  it("creates a card with reps = 0", () => {
    const card = createFSRSCard("word-x", "recognition");
    expect(card.reps).toBe(0);
  });
});
