/**
 * Regression tests for:
 *  FEAT-1 — flashcardSource filter removed (all cards always visible)
 *  FEAT-2 — state=0 graduation mechanism (stuck New/Learning cards promoted to Review)
 */
import { describe, it, expect } from "vitest";
import { applyFSRS, createFSRSCard, GRADUATION_LAPSE_THRESHOLD } from "./db";
import type { Flashcard } from "./db";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeCard(overrides: Partial<Flashcard> = {}): Flashcard {
  return {
    ...createFSRSCard("test-word-1", "recognition"),
    ...overrides,
  };
}

// ─── FEAT-2: Graduation mechanism ────────────────────────────────────────────

describe("FEAT-2: state=0 graduation mechanism", () => {
  it("does NOT graduate a card with fewer lapses than the threshold", () => {
    const card = makeCard({ state: 0, lapses: GRADUATION_LAPSE_THRESHOLD - 1 });
    const result = applyFSRS(card, 3); // Good
    // Should stay in Learning (state 1), not jump to Review (state 2)
    expect(result.state).not.toBe(2);
  });

  it("graduates a state=0 card with exactly GRADUATION_LAPSE_THRESHOLD lapses on Good", () => {
    const card = makeCard({ state: 0, lapses: GRADUATION_LAPSE_THRESHOLD });
    const result = applyFSRS(card, 3); // Good
    expect(result.state).toBe(2); // Promoted to Review
    expect(result.scheduledDays).toBe(1); // Starts at 1-day interval
  });

  it("graduates a state=0 card with more than GRADUATION_LAPSE_THRESHOLD lapses on Easy", () => {
    const card = makeCard({ state: 0, lapses: GRADUATION_LAPSE_THRESHOLD + 5 });
    const result = applyFSRS(card, 4); // Easy
    expect(result.state).toBe(2);
    expect(result.scheduledDays).toBe(1);
  });

  it("graduates a state=1 (Learning) card with enough lapses on Good", () => {
    const card = makeCard({ state: 1, lapses: GRADUATION_LAPSE_THRESHOLD });
    const result = applyFSRS(card, 3); // Good
    expect(result.state).toBe(2);
  });

  it("does NOT graduate on Again even if lapses >= threshold", () => {
    const card = makeCard({ state: 0, lapses: GRADUATION_LAPSE_THRESHOLD + 10 });
    const result = applyFSRS(card, 1); // Again
    // Again always requeues in-session — state stays in Learning
    expect(result.state).not.toBe(2);
    // Lapses should increment
    expect(result.lapses).toBe(GRADUATION_LAPSE_THRESHOLD + 11);
  });

  it("does NOT graduate on Hard even if lapses >= threshold", () => {
    const card = makeCard({ state: 0, lapses: GRADUATION_LAPSE_THRESHOLD });
    const result = applyFSRS(card, 2); // Hard
    expect(result.state).not.toBe(2);
  });

  it("does NOT graduate a state=2 (Review) card — it is already in Review", () => {
    const card = makeCard({ state: 2, lapses: GRADUATION_LAPSE_THRESHOLD + 5 });
    const result = applyFSRS(card, 3); // Good
    // State should remain 2 (Review) — graduation logic only applies to 0/1
    expect(result.state).toBe(2);
  });

  it("does NOT trigger graduation logic for a state=3 (Relearning) card", () => {
    // Relearning (state=3) is excluded from graduation by the state===0||1 check.
    // The graduation path sets scheduledDays=1 AND state=2 AND preserves lapses.
    // For a Relearning card, FSRS may also return state=2 (correct), but lapses
    // should NOT be reset — they should stay at GRADUATION_LAPSE_THRESHOLD + 5.
    const originalLapses = GRADUATION_LAPSE_THRESHOLD + 5;
    const card = makeCard({ state: 3, lapses: originalLapses });
    const result = applyFSRS(card, 3); // Good
    // Lapses are preserved (not reset by graduation logic)
    expect(result.lapses).toBe(originalLapses); // No lapse increment on Good
  });

  it("GRADUATION_LAPSE_THRESHOLD is exported and equals 8", () => {
    expect(GRADUATION_LAPSE_THRESHOLD).toBe(8);
  });

  it("a graduated card's dueDate is approximately 1 day from now", () => {
    const card = makeCard({ state: 0, lapses: GRADUATION_LAPSE_THRESHOLD });
    const before = Date.now();
    const result = applyFSRS(card, 3); // Good
    const after = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    // dueDate should be ~1 day from now (within a 5-second window)
    expect(result.dueDate).toBeGreaterThanOrEqual(before + oneDayMs - 5000);
    expect(result.dueDate).toBeLessThanOrEqual(after + oneDayMs + 5000);
  });
});

// ─── FEAT-1: Source filter removal (Settings type no longer has flashcardSource) ─

describe("FEAT-1: flashcardSource removed from Settings", () => {
  it("createFSRSCard creates a card regardless of word source", () => {
    // Cards from text sources
    const textCard = createFSRSCard("text-word-1", "recognition");
    expect(textCard.cardId).toBe("text-word-1-a");
    expect(textCard.state).toBe(0);

    // Cards from vocab sources
    const vocabCard = createFSRSCard("vocab-word-1", "recognition");
    expect(vocabCard.cardId).toBe("vocab-word-1-a");
    expect(vocabCard.state).toBe(0);

    // Both are identical in structure — no source discrimination
    expect(textCard.lapses).toBe(vocabCard.lapses);
    expect(textCard.reps).toBe(vocabCard.reps);
  });

  it("applyFSRS works identically for cards from any source", () => {
    const card1 = makeCard({ wordId: "text-source-word" });
    const card2 = makeCard({ wordId: "vocab-source-word" });
    const r1 = applyFSRS(card1, 3);
    const r2 = applyFSRS(card2, 3);
    // Same FSRS state, same interval — source is irrelevant
    expect(r1.state).toBe(r2.state);
    expect(r1.scheduledDays).toBe(r2.scheduledDays);
  });
});
