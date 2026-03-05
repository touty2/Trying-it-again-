/**
 * shared/sm2.ts — Pure SM-2 Spaced Repetition Algorithm
 *
 * This module contains ONLY pure functions and types with no browser APIs.
 * It is safe to import in both the client (browser) and server/tests (Node).
 *
 * The client/src/lib/db.ts re-exports everything from here for backward compat.
 */

// ─── Flashcard Type (minimal, for SM-2 computation) ──────────────────────────

export interface SM2Card {
  wordId: string;
  easeFactor: number;   // EF — starts at 2.5, min 1.3
  interval: number;     // days until next review
  repetition: number;   // number of successful reviews
  dueDate: number;      // Unix timestamp (ms)
  nextReviewDate: string; // ISO date string (YYYY-MM-DD)
  lastReviewed: number | null;
  createdAt: number;
}

export type SM2Quality = 0 | 1 | 2; // 0=DontKnow, 1=Nearly, 2=Know

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/** Convert a Unix timestamp (ms) to an ISO date string (YYYY-MM-DD) */
export function toISODate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Convert an ISO date string (YYYY-MM-DD) to start-of-day UTC timestamp (ms) */
export function fromISODate(iso: string): number {
  return new Date(iso + "T00:00:00.000Z").getTime();
}

// ─── SM-2 Algorithm ───────────────────────────────────────────────────────────

/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Algorithm: Modified SM-2 (SuperMemo 2)
 * Interval scaling:
 *   - rep 1 (first correct): 1 day
 *   - rep 2 (second correct): 6 days
 *   - rep n≥3: interval × easeFactor (EF starts at 2.5, min 1.3)
 *
 * Quality grades:
 *   0 = Don't Know  → reset repetition to 0, interval = 1, EF -= 0.20
 *   1 = Nearly      → keep repetition, interval × 1.2, EF -= 0.15
 *   2 = Know        → full SM-2 growth, EF += 0.10
 *
 * Overdue handling:
 *   nextReviewDate is always set to NOW + newInterval days.
 *   Inactivity does NOT reset intervals or penalize the ease factor.
 *   Overdue cards simply stack in the due queue until reviewed.
 *
 * Returns updated card fields (partial — merge with existing card).
 */
export function applySM2(card: SM2Card, quality: SM2Quality): Partial<SM2Card> {
  const now = Date.now();

  if (quality === 0) {
    // Don't Know: reset repetition, short interval, reduce ease
    const newDueDate = now + 1 * 24 * 60 * 60 * 1000;
    return {
      repetition: 0,
      interval: 1,
      easeFactor: Math.max(1.3, card.easeFactor - 0.2),
      dueDate: newDueDate,
      nextReviewDate: toISODate(newDueDate),
      lastReviewed: now,
    };
  }

  let newRepetition = card.repetition + 1;
  let newInterval: number;
  let newEaseFactor = card.easeFactor;

  if (quality === 1) {
    // Nearly correct: slight ease reduction, conservative interval growth
    newEaseFactor = Math.max(1.3, card.easeFactor - 0.15);
    if (newRepetition === 1) {
      newInterval = 1;
    } else if (newRepetition === 2) {
      newInterval = 3;
    } else {
      newInterval = Math.max(card.interval + 1, Math.round(card.interval * 1.2));
    }
  } else {
    // Know: standard SM-2 ease factor update and interval growth
    newEaseFactor = Math.max(1.3, card.easeFactor + 0.1);
    if (newRepetition === 1) {
      newInterval = 1;
    } else if (newRepetition === 2) {
      newInterval = 6;
    } else {
      newInterval = Math.round(card.interval * newEaseFactor);
    }
  }

  const newDueDate = now + newInterval * 24 * 60 * 60 * 1000;
  return {
    repetition: newRepetition,
    interval: newInterval,
    easeFactor: newEaseFactor,
    dueDate: newDueDate,
    nextReviewDate: toISODate(newDueDate),
    lastReviewed: now,
  };
}

/**
 * Categorise a set of flashcards into due-today, overdue, and new buckets.
 *
 * - overdue:  dueDate < start of today (missed reviews from previous days)
 * - dueToday: dueDate is today (scheduled for today)
 * - newCards: never reviewed (lastReviewed === null)
 *
 * Completed words (passed as a Set) are excluded from all counts.
 */
export function getDueStats(
  cards: SM2Card[],
  completedWordIds: Set<string>
): { dueToday: number; overdue: number; newCards: number } {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  const tomorrowStartMs = todayStartMs + 24 * 60 * 60 * 1000;

  let dueToday = 0;
  let overdue = 0;
  let newCards = 0;

  for (const card of cards) {
    if (completedWordIds.has(card.wordId)) continue;
    if (card.lastReviewed === null) {
      newCards++;
    } else if (card.dueDate < todayStartMs) {
      overdue++;
    } else if (card.dueDate < tomorrowStartMs) {
      dueToday++;
    }
  }

  return { dueToday, overdue, newCards };
}
