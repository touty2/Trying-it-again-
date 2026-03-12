/**
 * shared/sm2.ts — Custom Spaced Repetition Algorithm
 *
 * Two-button interface: Know (quality=2) and Don't Know (quality=0).
 *
 * Session behaviour:
 *   - Don't Know: card is inserted 2-3 positions ahead in the session queue
 *     (short-term relearning), NOT written to DB. The card object is flagged
 *     with missedInSession=true and lapses is incremented in the DB.
 *   - Know: card is removed from session queue and written to DB.
 *     Interval is calculated from the card's CURRENT (pre-Know) repetition count.
 *
 * Interval schedule (based on pre-Know repetition count):
 *   repetition === 0  → 1 day   (first ever success)
 *   repetition === 1  → 4 days  (second success)
 *   repetition === 2  → 10 days (third success)
 *   repetition >= 3   → Math.round(prevInterval × easeFactor) ± fuzz
 *
 * If missedInSession === true on Know:
 *   → Always schedule 1 day, set repetition to 1
 *   (treat as first success regardless of prior history)
 *
 * Ease factor:
 *   - Starts at 2.5
 *   - Know: +0.1 (max 5.0)
 *   - Don't Know: -0.2 (min 1.3) — applied when lapses are recorded
 *
 * Leech detection:
 *   - When lapses >= LEECH_THRESHOLD (5), card is marked as a leech
 *   - Leech cards are excluded from the normal queue
 *   - They appear in a separate "Leech Review" section for focused study
 *
 * Interval fuzz (item 3):
 *   - For intervals >= 10 days, apply ±5% random fuzz to prevent card clustering
 *   - This spreads reviews more evenly across days
 *
 * Max interval (item 4):
 *   - Capped at MAX_INTERVAL_DAYS (365 days = 1 year)
 *   - Ensures even mastered cards resurface at least once a year
 *
 * Queue ordering (item 5):
 *   - New cards (never reviewed) are prioritised before due cards
 *   - Within each group, oldest-due first
 *
 * This module is pure (no browser APIs) and safe to import in both client and server/tests.
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

// ─── Interval Fuzz ────────────────────────────────────────────────────────────

/**
 * Apply a small random fuzz (±5%) to intervals >= 10 days to prevent
 * cards from clustering on the same review day.
 *
 * @param interval - Raw computed interval in days
 * @param seed - Optional deterministic seed for testing (0–1 range)
 */
export function applyIntervalFuzz(interval: number, seed?: number): number {
  if (interval < 10) return interval;
  const rand = seed !== undefined ? seed : Math.random();
  // ±5% fuzz: multiply by a value in [0.95, 1.05]
  const fuzzed = Math.round(interval * (0.95 + rand * 0.10));
  return Math.min(fuzzed, MAX_INTERVAL_DAYS);
}

// ─── Interval Schedule ────────────────────────────────────────────────────────

/**
 * Calculate the next interval (in days) for a "Know" response.
 *
 * Uses the PRE-KNOW repetition count (the card's current value before incrementing).
 *   - rep=0 (never succeeded) → 1 day
 *   - rep=1 (succeeded once)  → 4 days
 *   - rep=2 (succeeded twice) → 10 days
 *   - rep≥3                   → round(prevInterval × easeFactor) ± fuzz, capped at MAX_INTERVAL_DAYS
 *
 * @param preKnowRep   - card.repetition BEFORE this Know response
 * @param prevInterval - The previous interval in days
 * @param easeFactor   - The NEW ease factor (after applying the Know bonus)
 * @param sessionMissed - True if the card was missed at least once this session
 * @param fuzzSeed     - Optional 0–1 seed for deterministic fuzz in tests
 */
export function calculateKnowInterval(
  preKnowRep: number,
  prevInterval: number,
  easeFactor: number,
  sessionMissed: boolean,
  fuzzSeed?: number
): number {
  // If the card was missed earlier in this session, always schedule 1 day
  if (sessionMissed) return 1;

  if (preKnowRep === 0) return 1;
  if (preKnowRep === 1) return 4;
  if (preKnowRep === 2) return 10;
  // preKnowRep >= 3: exponential growth with fuzz
  const raw = Math.min(Math.round(prevInterval * easeFactor), MAX_INTERVAL_DAYS);
  return applyIntervalFuzz(raw, fuzzSeed);
}

// ─── Core Algorithm ───────────────────────────────────────────────────────────

/**
 * Apply the SRS algorithm to a card and return updated fields.
 *
 * IMPORTANT: This function is only called on "Know". Don't Know is handled
 * purely in the session queue (insert 2-3 positions ahead, set missedInSession=true)
 * and does NOT write the full card state to the database — only lapses is incremented.
 *
 * @param card - Current card state (repetition = pre-Know value)
 * @param quality - Must be 2 (Know). Pass 0 only for legacy/test compatibility.
 * @param sessionMissed - True if this card was answered "Don't Know" at least
 *   once earlier in the current review session.
 * @param fuzzSeed - Optional 0–1 seed for deterministic interval fuzz in tests.
 *
 * @returns Partial card update to merge with the existing card.
 */
export function applySM2(
  card: SM2Card,
  quality: SM2Quality,
  sessionMissed = false,
  fuzzSeed?: number
): Partial<SM2Card> {
  const now = Date.now();

  if (quality === 0) {
    // Legacy path: Don't Know called directly (e.g. from old tests).
    // In the new session flow this should never be called — Don't Know
    // is handled in the UI without a full DB write (only lapses is incremented).
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
  // Step 1: compute new ease factor
  const newEaseFactor = Math.min(5.0, Math.max(1.3, card.easeFactor + 0.1));

  // Step 2: compute interval using PRE-KNOW repetition count
  const newInterval = calculateKnowInterval(
    card.repetition,   // ← pre-Know rep
    card.interval,
    newEaseFactor,
    sessionMissed,
    fuzzSeed
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
    lapses: card.lapses ?? 0, // preserve existing lapses on Know
    isLeech: (card.lapses ?? 0) >= LEECH_THRESHOLD,
  };
}

/**
 * Record a Don't Know response — only updates lapses and ease factor.
 * This is the lightweight update written to DB when the user clicks Don't Know.
 * The card's interval/dueDate are NOT changed here — they will be set when
 * the user eventually clicks Know (with sessionMissed=true → 1 day).
 */
export function applyDontKnow(card: SM2Card): Partial<SM2Card> {
  const newLapses = (card.lapses ?? 0) + 1;
  const newEaseFactor = Math.max(1.3, card.easeFactor - 0.2);
  return {
    lapses: newLapses,
    easeFactor: newEaseFactor,
    isLeech: newLapses >= LEECH_THRESHOLD,
  };
}

// ─── Queue Builder ────────────────────────────────────────────────────────────

/**
 * Build the session queue with new cards first, then due cards.
 *
 * Item 5: New cards (lastReviewed === null) are placed before due cards.
 * Within each group, oldest-due first (ascending dueDate).
 * Leech cards are excluded from the normal queue.
 *
 * @param cards - All flashcards available (pre-filtered for source/story)
 * @param completedWordIds - Words already marked as completed
 * @param dailyNewWordCap - Max new cards to include (null = unlimited)
 * @param dailyReviewCap - Max total cards to include (null = unlimited)
 * @param todayNewWordsAdded - How many new words already added today
 */
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
    if (card.isLeech) continue; // leech cards excluded from normal queue

    if (card.lastReviewed === null) {
      // New card — never reviewed
      newCards.push(card);
    } else if (card.dueDate <= now) {
      // Due or overdue
      dueCards.push(card);
    }
    // Future cards are ignored
  }

  // Sort each group oldest-first
  newCards.sort((a, b) => a.createdAt - b.createdAt);
  dueCards.sort((a, b) => a.dueDate - b.dueDate);

  // Apply new word cap
  const remainingNewSlots = dailyNewWordCap !== null
    ? Math.max(0, dailyNewWordCap - todayNewWordsAdded)
    : newCards.length;
  const cappedNew = newCards.slice(0, remainingNewSlots);

  // Combine: new cards first, then due cards
  const combined = [...cappedNew, ...dueCards];

  // Apply total review cap
  if (dailyReviewCap !== null) {
    return combined.slice(0, dailyReviewCap);
  }
  return combined;
}

// ─── Queue Stats ──────────────────────────────────────────────────────────────

/**
 * Categorise a set of flashcards into due-today, overdue, new, and leech buckets.
 *
 * - overdue:  dueDate < start of today (missed reviews from previous days)
 * - dueToday: dueDate falls within today
 * - newCards: never reviewed (lastReviewed === null)
 * - leechCards: lapses >= LEECH_THRESHOLD
 *
 * Completed words (passed as a Set) are excluded from all counts.
 */
export function getDueStats(
  cards: SM2Card[],
  completedWordIds: Set<string>
): { dueToday: number; overdue: number; newCards: number; leechCards: number } {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  const tomorrowStartMs = todayStartMs + 24 * 60 * 60 * 1000;

  let dueToday = 0;
  let overdue = 0;
  let newCards = 0;
  let leechCards = 0;

  for (const card of cards) {
    if (completedWordIds.has(card.wordId)) continue;
    if (card.isLeech) {
      leechCards++;
      continue; // leeches are counted separately, not in due/overdue
    }
    if (card.lastReviewed === null) {
      newCards++;
    } else if (card.dueDate < todayStartMs) {
      overdue++;
    } else if (card.dueDate < tomorrowStartMs) {
      dueToday++;
    }
  }

  return { dueToday, overdue, newCards, leechCards };
}
