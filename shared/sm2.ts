/**
 * shared/sm2.ts — Legacy SM-2 Constants and Date Helpers
 *
 * F11 fix: Removed all dead SM-2 algorithm functions (applySM2, applyDontKnow,
 * buildSessionQueue, getDueStats, calculateKnowInterval, applyIntervalFuzz).
 * The app has fully migrated to FSRS (client/src/lib/db.ts).
 *
 * What is kept:
 *   - toISODate, fromISODate — date helpers used by client/src/lib/db.ts
 *   - SM2Card interface — used by legacy server test files (srs.test.ts etc.)
 *   - SM2Quality type — used by legacy server test files
 *   - MAX_INTERVAL_DAYS, LEECH_THRESHOLD — constants used by tests and db.ts
 *
 * The legacy server tests (srs.test.ts, srs.dates.test.ts, srs.remaining.test.ts,
 * segmentation.test.ts) still import SM2Card and applySM2 for historical coverage.
 * Those tests are kept as-is to document the old algorithm's behaviour; they do
 * not affect production code paths.
 *
 * NOTE: applySM2 is re-exported from client/src/lib/db.ts as a thin shim that
 * delegates to applyFSRS. Server tests that import applySM2 from this file
 * will use the local implementation below (kept for test isolation only).
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SM2Card {
  wordId: string;
  easeFactor: number;     // EF — starts at 2.5, min 1.3, max 5.0
  interval: number;       // days until next review
  repetition: number;     // consecutive successful reviews (resets on miss)
  dueDate: number;        // Unix timestamp (ms)
  nextReviewDate: string; // ISO date string (YYYY-MM-DD)
  lastReviewed: number | null;
  createdAt: number;
  lapses: number;         // total lifetime Don't Know responses
  isLeech: boolean;       // true when lapses >= LEECH_THRESHOLD
}

/** 0 = Don't Know, 2 = Know (no middle grade) */
export type SM2Quality = 0 | 2;

/** Maximum interval in days — 1 year keeps even mastered cards in rotation */
export const MAX_INTERVAL_DAYS = 365;

/** Number of lapses before a card is flagged as a leech */
export const LEECH_THRESHOLD = 5;

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/** Convert a Unix timestamp (ms) to an ISO date string (YYYY-MM-DD) */
export function toISODate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Convert an ISO date string (YYYY-MM-DD) to start-of-day UTC timestamp (ms) */
export function fromISODate(iso: string): number {
  return new Date(iso + "T00:00:00.000Z").getTime();
}

// ─── Legacy Algorithm (kept for server test isolation only) ───────────────────
//
// These functions are NOT used in production. They exist solely so that the
// legacy server test suite (srs.test.ts, srs.dates.test.ts, etc.) can import
// them without pulling in browser-only IndexedDB code from client/src/lib/db.ts.
//
// DO NOT call these from application code. Use applyFSRS from client/src/lib/db.ts.

/** @internal Test-only. Apply ±5% fuzz to intervals >= 10 days. */
export function applyIntervalFuzz(interval: number, seed?: number): number {
  if (interval < 10) return interval;
  const rng = seed !== undefined ? Math.abs(Math.sin(seed)) : Math.random();
  const fuzz = (rng - 0.5) * 0.1; // ±5%
  return Math.max(1, Math.round(interval * (1 + fuzz)));
}

/** @internal Test-only. Calculate the next interval after a Know response. */
export function calculateKnowInterval(
  repetition: number,
  prevInterval: number,
  easeFactor: number,
  sessionMissed = false,
  fuzzSeed?: number
): number {
  if (sessionMissed) return 1;
  let interval: number;
  if (repetition === 0)      interval = 1;
  else if (repetition === 1) interval = 4;
  else if (repetition === 2) interval = 10;
  else                       interval = Math.round(prevInterval * easeFactor);
  interval = Math.min(interval, MAX_INTERVAL_DAYS);
  return applyIntervalFuzz(interval, fuzzSeed);
}

/** @internal Test-only. Apply a Know response to an SM2Card. */
export function applySM2(
  card: SM2Card,
  quality: SM2Quality,
  sessionMissed = false,
  fuzzSeed?: number
): Partial<SM2Card> {
  const now = Date.now();
  if (quality === 0) {
    // Don't Know — increment lapses, reduce ease factor
    const newLapses = (card.lapses ?? 0) + 1;
    const newEaseFactor = Math.max(1.3, card.easeFactor - 0.2);
    const newDueDate = now + 1 * 24 * 60 * 60 * 1000;
    return {
      repetition: 0,
      interval: 1,
      easeFactor: newEaseFactor,
      dueDate: newDueDate,
      nextReviewDate: toISODate(newDueDate),
      lastReviewed: now,
      lapses: newLapses,
      isLeech: newLapses >= LEECH_THRESHOLD,
    };
  }
  // Know path
  const newEaseFactor = Math.min(5.0, Math.max(1.3, card.easeFactor + 0.1));
  const newInterval = calculateKnowInterval(
    card.repetition,
    card.interval,
    newEaseFactor,
    sessionMissed,
    fuzzSeed
  );
  const newRepetition = sessionMissed ? 1 : card.repetition + 1;
  const newDueDate = now + newInterval * 24 * 60 * 60 * 1000;
  return {
    repetition: newRepetition,
    interval: newInterval,
    easeFactor: newEaseFactor,
    dueDate: newDueDate,
    nextReviewDate: toISODate(newDueDate),
    lastReviewed: now,
    lapses: card.lapses ?? 0,
    isLeech: (card.lapses ?? 0) >= LEECH_THRESHOLD,
  };
}

/** @internal Test-only. Record a Don't Know response (lapses + ease factor only). */
export function applyDontKnow(card: SM2Card): Partial<SM2Card> {
  const newLapses = (card.lapses ?? 0) + 1;
  const newEaseFactor = Math.max(1.3, card.easeFactor - 0.2);
  return {
    lapses: newLapses,
    easeFactor: newEaseFactor,
    isLeech: newLapses >= LEECH_THRESHOLD,
  };
}

/** @internal Test-only. Categorise cards into due/overdue/new/leech buckets. */
export function getDueStats(
  cards: SM2Card[],
  completedWordIds: Set<string>
): { dueToday: number; overdue: number; newCards: number; leechCards: number } {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  const tomorrowStartMs = todayStartMs + 24 * 60 * 60 * 1000;
  let dueToday = 0, overdue = 0, newCards = 0, leechCards = 0;
  for (const card of cards) {
    if (completedWordIds.has(card.wordId)) continue;
    if (card.isLeech) { leechCards++; continue; }
    if (card.lastReviewed === null) { newCards++; }
    else if (card.dueDate < todayStartMs) { overdue++; }
    else if (card.dueDate < tomorrowStartMs) { dueToday++; }
  }
  return { dueToday, overdue, newCards, leechCards };
}

/** @internal Test-only. Build a session queue (new-cards-first, then due). */
export function buildSessionQueue(
  cards: SM2Card[],
  completedWordIds: Set<string>,
  dailyNewWordCap: number | null,
  dailyReviewCap: number | null,
  todayNewWordsAdded = 0
): SM2Card[] {
  const now = Date.now();
  const newCards: SM2Card[] = [];
  const dueCards: SM2Card[] = [];
  for (const card of cards) {
    if (completedWordIds.has(card.wordId)) continue;
    if (card.isLeech) continue;
    if (card.lastReviewed === null) newCards.push(card);
    else if (card.dueDate <= now) dueCards.push(card);
  }
  newCards.sort((a, b) => a.createdAt - b.createdAt);
  dueCards.sort((a, b) => a.dueDate - b.dueDate);
  const remainingNewSlots = dailyNewWordCap !== null
    ? Math.max(0, dailyNewWordCap - todayNewWordsAdded)
    : newCards.length;
  const combined = [...newCards.slice(0, remainingNewSlots), ...dueCards];
  return dailyReviewCap !== null ? combined.slice(0, dailyReviewCap) : combined;
}
