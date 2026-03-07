/**
 * shared/sm2.ts — Custom Spaced Repetition Algorithm
 *
 * Two-button interface: Know (quality=2) and Don't Know (quality=0).
 *
 * Session behaviour:
 *   - Don't Know: card is moved to end of session queue (NOT written to DB).
 *     The card object is flagged with missedInSession=true.
 *   - Know: card is removed from session queue and written to DB.
 *     Interval is calculated from the card's CURRENT (pre-Know) repetition count.
 *
 * Interval schedule (based on pre-Know repetition count):
 *   repetition === 0  → 1 day   (first ever success)
 *   repetition === 1  → 4 days  (second success)
 *   repetition === 2  → 10 days (third success)
 *   repetition >= 3   → Math.round(prevInterval × easeFactor)
 *
 * If missedInSession === true on Know:
 *   → Always schedule 1 day, set repetition to 1
 *   (treat as first success regardless of prior history)
 *
 * Ease factor:
 *   - Starts at 2.5
 *   - Know: +0.1 (max 5.0)
 *   - Don't Know: -0.2 (min 1.3) — applied when Know is eventually called
 *     after a miss (because missedInSession forces 1-day interval)
 *
 * Queue management:
 *   - Cards never disappear; they stay in the queue until interval > MAX_INTERVAL_DAYS
 *   - Overdue cards accumulate and are prioritised by due date (oldest first)
 *   - Daily review limit is configurable (default 50) and enforced by the UI
 *
 * This module is pure (no browser APIs) and safe to import in both client and server/tests.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SM2Card {
  wordId: string;
  easeFactor: number;     // EF — starts at 2.5, min 1.3
  interval: number;       // days until next review
  repetition: number;     // consecutive successful reviews (resets on miss)
  dueDate: number;        // Unix timestamp (ms)
  nextReviewDate: string; // ISO date string (YYYY-MM-DD)
  lastReviewed: number | null;
  createdAt: number;
}

/** 0 = Don't Know, 2 = Know (no middle grade) */
export type SM2Quality = 0 | 2;

/** Maximum interval in days before a card is considered "mastered" (10 years) */
export const MAX_INTERVAL_DAYS = 3650;

// ─── Date Helpers ─────────────────────────────────────────────────────────────

/** Convert a Unix timestamp (ms) to an ISO date string (YYYY-MM-DD) */
export function toISODate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Convert an ISO date string (YYYY-MM-DD) to start-of-day UTC timestamp (ms) */
export function fromISODate(iso: string): number {
  return new Date(iso + "T00:00:00.000Z").getTime();
}

// ─── Interval Schedule ────────────────────────────────────────────────────────

/**
 * Calculate the next interval (in days) for a "Know" response.
 *
 * Uses the PRE-KNOW repetition count (the card's current value before incrementing).
 * This matches the spec exactly:
 *   - rep=0 (never succeeded) → 1 day
 *   - rep=1 (succeeded once)  → 4 days
 *   - rep=2 (succeeded twice) → 10 days
 *   - rep≥3                   → round(prevInterval × easeFactor)
 *
 * @param preKnowRep  - card.repetition BEFORE this Know response
 * @param prevInterval - The previous interval in days
 * @param easeFactor   - The NEW ease factor (after applying the Know bonus)
 * @param sessionMissed - True if the card was missed at least once this session
 */
export function calculateKnowInterval(
  preKnowRep: number,
  prevInterval: number,
  easeFactor: number,
  sessionMissed: boolean
): number {
  // If the card was missed earlier in this session, always schedule 1 day
  if (sessionMissed) return 1;

  if (preKnowRep === 0) return 1;
  if (preKnowRep === 1) return 4;
  if (preKnowRep === 2) return 10;
  // preKnowRep >= 3: exponential growth
  return Math.min(Math.round(prevInterval * easeFactor), MAX_INTERVAL_DAYS);
}

// ─── Core Algorithm ───────────────────────────────────────────────────────────

/**
 * Apply the SRS algorithm to a card and return updated fields.
 *
 * IMPORTANT: This function is only called on "Know". Don't Know is handled
 * purely in the session queue (move card to end, set missedInSession=true)
 * and does NOT write to the database.
 *
 * @param card - Current card state (repetition = pre-Know value)
 * @param quality - Must be 2 (Know). Pass 0 only for legacy/test compatibility.
 * @param sessionMissed - True if this card was answered "Don't Know" at least
 *   once earlier in the current review session.
 *
 * @returns Partial card update to merge with the existing card.
 */
export function applySM2(
  card: SM2Card,
  quality: SM2Quality,
  sessionMissed = false
): Partial<SM2Card> {
  const now = Date.now();

  if (quality === 0) {
    // Legacy path: Don't Know called directly (e.g. from old tests).
    // In the new session flow this should never be called — Don't Know
    // is handled in the UI without a DB write.
    const newEaseFactor = Math.max(1.3, card.easeFactor - 0.2);
    const newDueDate = now + 1 * 24 * 60 * 60 * 1000;
    return {
      repetition: 0,
      interval: 1,
      easeFactor: newEaseFactor,
      dueDate: newDueDate,
      nextReviewDate: toISODate(newDueDate),
      lastReviewed: now,
    };
  }

  // Know path
  // Step 1: compute new ease factor
  const newEaseFactor = Math.min(5.0, Math.max(1.3, card.easeFactor + 0.1));

  // Step 2: compute interval using PRE-KNOW repetition count
  const newInterval = calculateKnowInterval(
    card.repetition,   // ← pre-Know rep
    card.interval,
    newEaseFactor,
    sessionMissed
  );

  // Step 3: compute new repetition count
  // If sessionMissed, treat as first success (rep=1) regardless of history
  const newRepetition = sessionMissed ? 1 : card.repetition + 1;

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

// ─── Queue Stats ──────────────────────────────────────────────────────────────

/**
 * Categorise a set of flashcards into due-today, overdue, and new buckets.
 *
 * - overdue:  dueDate < start of today (missed reviews from previous days)
 * - dueToday: dueDate falls within today
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
