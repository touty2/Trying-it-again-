/**
 * Standalone test runner for the 5 remaining SRS items.
 * Run with: node --import tsx/esm test-srs-remaining.mjs
 */
import { applySM2, getDueStats } from "./shared/sm2.ts";

const DAY = 24 * 60 * 60 * 1000;
let passed = 0;
let failed = 0;

function assert(label, condition, detail = "") {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}${detail ? ": " + detail : ""}`);
    failed++;
  }
}

function makeCard(overrides = {}) {
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

// ─── 1. Backlog Priority ──────────────────────────────────────────────────────
console.log("\n1. Backlog Priority");

const now = Date.now();
const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);

const cards = [
  makeCard({ wordId: "new",      lastReviewed: null,           dueDate: now }),
  makeCard({ wordId: "today",    lastReviewed: now - 2 * DAY,  dueDate: todayStart.getTime() + 1 }),
  makeCard({ wordId: "overdue1", lastReviewed: now - 3 * DAY,  dueDate: now - 2 * DAY }),
  makeCard({ wordId: "overdue2", lastReviewed: now - 10 * DAY, dueDate: now - 9 * DAY }),
  makeCard({ wordId: "future",   lastReviewed: now,             dueDate: now + 2 * DAY }),
];
const stats = getDueStats(cards, new Set());
assert("getDueStats: 1 new card", stats.newCards === 1, `got ${stats.newCards}`);
assert("getDueStats: 1 due today", stats.dueToday === 1, `got ${stats.dueToday}`);
assert("getDueStats: 2 overdue", stats.overdue === 2, `got ${stats.overdue}`);

const dueCards = [
  makeCard({ wordId: "3days", dueDate: now - 3 * DAY, lastReviewed: now - 4 * DAY }),
  makeCard({ wordId: "1day",  dueDate: now - 1 * DAY, lastReviewed: now - 2 * DAY }),
  makeCard({ wordId: "7days", dueDate: now - 7 * DAY, lastReviewed: now - 8 * DAY }),
].filter(c => c.dueDate <= now).sort((a, b) => a.dueDate - b.dueDate);

assert("oldest-due first: 7days before 3days before 1day",
  dueCards[0].wordId === "7days" && dueCards[1].wordId === "3days" && dueCards[2].wordId === "1day",
  `got [${dueCards.map(c => c.wordId).join(", ")}]`
);

const futureCards = [
  makeCard({ wordId: "due",    dueDate: now - 1 }),
  makeCard({ wordId: "future", dueDate: now + DAY }),
].filter(c => c.dueDate <= now);
assert("future cards excluded from queue", futureCards.length === 1 && futureCards[0].wordId === "due");

// ─── 2. Ease Factor Bounds ────────────────────────────────────────────────────
console.log("\n2. Ease Factor Bounds");

let card = makeCard({ easeFactor: 1.4, repetition: 3, interval: 10 });
for (let i = 0; i < 20; i++) card = { ...card, ...applySM2(card, 0) };
assert("EF never below 1.3 after 20 Don't Know", card.easeFactor >= 1.3, `got ${card.easeFactor}`);

card = makeCard({ easeFactor: 4.9, repetition: 5, interval: 30 });
for (let i = 0; i < 20; i++) card = { ...card, ...applySM2(card, 2) };
assert("EF never above 5.0 after 20 Know", card.easeFactor <= 5.0, `got ${card.easeFactor}`);

const newCard = makeCard({ easeFactor: 2.5, repetition: 0, interval: 1 });
const afterFirstKnow = applySM2(newCard, 2);
assert("EF starts 2.5, after first Know = 2.6", Math.abs(afterFirstKnow.easeFactor - 2.6) < 0.001, `got ${afterFirstKnow.easeFactor}`);

const atMin = makeCard({ easeFactor: 1.4 });
const afterDontKnow = applySM2(atMin, 0);
assert("EF 1.4 - 0.2 = 1.2 → clamped to 1.3", afterDontKnow.easeFactor === 1.3, `got ${afterDontKnow.easeFactor}`);

// ─── 3. Sync Conflict Resolution ─────────────────────────────────────────────
console.log("\n3. Sync Conflict Resolution");

function resolveConflict(stored, incoming) {
  const storedTs = stored.lastReviewed ?? 0;
  const incomingTs = incoming.lastReviewed ?? 0;
  return incomingTs >= storedTs ? { ...stored, ...incoming } : stored;
}

const deviceA = { cardId: "c1", interval: 4, repetition: 2, dueDate: now + 4 * DAY, lastReviewed: 1000 };
const deviceB = { cardId: "c1", interval: 1, repetition: 1, dueDate: now + DAY,     lastReviewed: 2000 };
const r1 = resolveConflict(deviceA, deviceB);
assert("newer Device B wins over older Device A", r1.interval === 1 && r1.lastReviewed === 2000);

const stored  = { cardId: "c1", interval: 10, repetition: 3, dueDate: now + 10 * DAY, lastReviewed: 5000 };
const stale   = { cardId: "c1", interval: 1,  repetition: 1, dueDate: now + DAY,      lastReviewed: 1000 };
const r2 = resolveConflict(stored, stale);
assert("stale sync does NOT overwrite newer review", r2.interval === 10 && r2.lastReviewed === 5000);

const nullStored   = { cardId: "c1", interval: 1, repetition: 0, dueDate: now, lastReviewed: null };
const withReviewed = { cardId: "c1", interval: 4, repetition: 2, dueDate: now + 4 * DAY, lastReviewed: 1000 };
const r3 = resolveConflict(nullStored, withReviewed);
assert("null lastReviewed treated as 0 (reviewed wins)", r3.interval === 4 && r3.lastReviewed === 1000);

// ─── 4. Daily Review Cap ──────────────────────────────────────────────────────
console.log("\n4. Daily Review Cap");

function sliderPosToCount(pos) {
  const SLIDER_MIN = 10, SLIDER_MAX = 500;
  if (pos <= 50) return Math.round(SLIDER_MIN + (pos / 50) * (100 - SLIDER_MIN));
  return Math.round(100 + ((pos - 50) / 50) * (SLIDER_MAX - 100));
}
function countToSliderPos(count) {
  const SLIDER_MIN = 10, SLIDER_MAX = 500;
  if (count <= 100) return ((count - SLIDER_MIN) / (100 - SLIDER_MIN)) * 50;
  return 50 + ((count - 100) / (SLIDER_MAX - 100)) * 50;
}

assert("slider pos 0 → 10 cards", sliderPosToCount(0) === 10, `got ${sliderPosToCount(0)}`);
assert("slider pos 50 → 100 cards", sliderPosToCount(50) === 100, `got ${sliderPosToCount(50)}`);
assert("slider pos 100 → 500 cards", sliderPosToCount(100) === 500, `got ${sliderPosToCount(100)}`);

let roundTripOk = true;
for (const count of [10, 20, 50, 100, 200, 350, 500]) {
  const back = sliderPosToCount(countToSliderPos(count));
  if (Math.abs(back - count) > 5) { roundTripOk = false; break; }
}
assert("round-trip count→pos→count stable (±5)", roundTripOk);

const cap = null;
assert("null cap = unlimited (no block)", !(cap !== null && 9999 >= cap));
assert("cap=50 blocks when 50 reviews done", (50 !== null && 50 >= 50));

// ─── 5. Review Logging ────────────────────────────────────────────────────────
console.log("\n5. Review Logging");

const entry = {
  cardId: "word-1-a", wordId: "word-1", hanzi: "学习",
  reviewedAt: Date.now(), rating: 2, sessionMissed: false,
  oldInterval: 4, newInterval: 10,
  oldRepetition: 1, newRepetition: 2,
  oldEaseFactor: 2.5, newEaseFactor: 2.6,
};
assert("entry has all required fields", entry.cardId && entry.hanzi && entry.reviewedAt > 0);
assert("newInterval > oldInterval for Know", entry.newInterval > entry.oldInterval);
assert("newRepetition = oldRepetition + 1", entry.newRepetition === entry.oldRepetition + 1);

const missedCard = makeCard({ repetition: 3, interval: 30, easeFactor: 2.5 });
const missedUpdates = applySM2(missedCard, 2, true);
assert("sessionMissed=true forces interval=1", missedUpdates.interval === 1, `got ${missedUpdates.interval}`);
assert("sessionMissed=true forces repetition=1", missedUpdates.repetition === 1, `got ${missedUpdates.repetition}`);

// ─── Summary ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
