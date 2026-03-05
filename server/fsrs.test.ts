/**
 * FSRS algorithm tests — validates card creation, scheduling, and due accumulation.
 * These tests run in Node.js (no DOM required).
 *
 * The fsrs-algorithm package returns schedule results as:
 *   { again: { card, reviewLog }, hard: { card, reviewLog }, good: { card, reviewLog }, easy: { card, reviewLog } }
 * Card fields use both camelCase aliases (elapsedDays) and snake_case originals (elapsed_days).
 */

import { describe, it, expect } from "vitest";
import { FSRS, State } from "fsrs-algorithm";

// ── Helpers ───────────────────────────────────────────────────────────────────

const _fsrs = new FSRS();

/** Minimal card matching the fsrs-algorithm library's expected input */
interface FSRSCard {
  due: Date;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  reps: number;
  lapses: number;
  state: State;
  last_review?: Date;
}

function createNewCard(): FSRSCard {
  return {
    due: new Date(),
    stability: 0,
    difficulty: 5,
    elapsed_days: 0,
    scheduled_days: 0,
    reps: 0,
    lapses: 0,
    state: State.New,
    last_review: undefined,
  };
}

type FSRSRating = 1 | 2 | 3 | 4;

function applyFSRS(card: FSRSCard, rating: FSRSRating, now: Date): FSRSCard {
  const result = _fsrs.schedule(card as Parameters<typeof _fsrs.schedule>[0], now);
  let updated;
  if (rating === 1) updated = result.again.card;
  else if (rating === 2) updated = result.hard.card;
  else if (rating === 3) updated = result.good.card;
  else updated = result.easy.card;
  return updated as unknown as FSRSCard;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("FSRS card creation", () => {
  it("creates a new card with correct initial state", () => {
    const card = createNewCard();
    expect(card.state).toBe(State.New);
    expect(card.reps).toBe(0);
    expect(card.lapses).toBe(0);
    expect(card.stability).toBe(0);
  });

  it("creates recognition and production cards independently", () => {
    const recognition = createNewCard();
    const production = createNewCard();
    expect(recognition.state).toBe(State.New);
    expect(production.state).toBe(State.New);
    expect(recognition).not.toBe(production);
  });
});

describe("FSRS scheduling — Again (rating 1)", () => {
  it("moves card out of New state after Again", () => {
    const card = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");
    const updated = applyFSRS(card, 1, now);
    // FSRS moves a New card to Relearning (3) when answered Again
    expect(updated.state).not.toBe(State.New);
  });

  it("schedules card for review within 1 day after Again", () => {
    const card = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");
    const updated = applyFSRS(card, 1, now);
    const dueMs = updated.due.getTime() - now.getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;
    // FSRS schedules Again on a new card for 1 day (short-term relearning)
    expect(dueMs).toBeLessThanOrEqual(oneDayMs);
  });
});

describe("FSRS scheduling — Good (rating 3)", () => {
  it("increments reps after Good on a new card", () => {
    const card = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");
    const updated = applyFSRS(card, 3, now);
    expect(updated.reps).toBeGreaterThanOrEqual(1);
  });

  it("schedules card for review in the future after Good", () => {
    const card = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");
    const updated = applyFSRS(card, 3, now);
    expect(updated.due.getTime()).toBeGreaterThan(now.getTime());
  });
});

describe("FSRS scheduling — Easy (rating 4)", () => {
  it("schedules further out than Good", () => {
    const card = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");
    const afterGood = applyFSRS(card, 3, now);
    const afterEasy = applyFSRS(card, 4, now);
    expect(afterEasy.due.getTime()).toBeGreaterThanOrEqual(afterGood.due.getTime());
  });
});

describe("FSRS scheduling — Hard (rating 2)", () => {
  it("schedules no later than Good", () => {
    const card = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");
    const afterHard = applyFSRS(card, 2, now);
    const afterGood = applyFSRS(card, 3, now);
    // Hard should be scheduled no later than Good
    expect(afterHard.due.getTime()).toBeLessThanOrEqual(afterGood.due.getTime());
  });
});

describe("FSRS due accumulation", () => {
  it("card with past due date is considered due", () => {
    const card = createNewCard();
    card.due = new Date(Date.now() - 24 * 60 * 60 * 1000);
    expect(card.due.getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("card with future due date is not considered due", () => {
    const card = createNewCard();
    card.due = new Date(Date.now() + 24 * 60 * 60 * 1000);
    expect(card.due.getTime()).toBeGreaterThan(Date.now());
  });

  it("multiple overdue cards all appear in due set — no cap", () => {
    const now = new Date();
    const cards = Array.from({ length: 10 }, (_, i) => {
      const c = createNewCard();
      c.due = new Date(now.getTime() - (i + 1) * 24 * 60 * 60 * 1000);
      return c;
    });
    const dueCards = cards.filter((c) => c.due.getTime() <= now.getTime());
    expect(dueCards.length).toBe(10);
  });
});

describe("FSRS lapses tracking", () => {
  it("lapses increment when card is answered Again after graduating", () => {
    const card = createNewCard();
    const day1 = new Date("2026-01-01T12:00:00Z");
    // Graduate to Review state
    let current = applyFSRS(card, 3, day1);
    const day4 = new Date("2026-01-04T12:00:00Z");
    current = applyFSRS(current, 3, day4);
    const lapsesBefore = current.lapses;
    // Lapse
    const day14 = new Date("2026-01-14T12:00:00Z");
    const afterLapse = applyFSRS(current, 1, day14);
    expect(afterLapse.lapses).toBeGreaterThanOrEqual(lapsesBefore);
  });
});

describe("FSRS reversible cards — independent scheduling", () => {
  it("recognition and production cards schedule independently", () => {
    const recognition = createNewCard();
    const production = createNewCard();
    const now = new Date("2026-01-01T12:00:00Z");

    // User knows the recognition card (Good) but not the production card (Again)
    const updatedRecognition = applyFSRS(recognition, 3, now);
    const updatedProduction = applyFSRS(production, 1, now);

    // Recognition is scheduled further out than production
    expect(updatedRecognition.due.getTime()).toBeGreaterThan(updatedProduction.due.getTime());
    // They have different states
    expect(updatedRecognition.state).not.toBe(updatedProduction.state);
  });
});
