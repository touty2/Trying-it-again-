/**
 * StoryDeckPanel — unit tests
 *
 * Tests the pure logic used by the panel:
 *  - getDueStats calculation for story-scoped cards
 *  - progress percentage calculation
 *  - review button label logic
 *  - story deck URL construction
 */

import { describe, it, expect } from "vitest";

// ── getDueStats-like logic ────────────────────────────────────────────────────

interface MockCard {
  wordId: string;
  cardType: string;
  reps: number;
  dueDate?: string;
  isLeech?: boolean;
}

function computeDueCount(
  storyCards: MockCard[],
  completedWordIds: Set<string>,
  today: string
): number {
  let count = 0;
  for (const card of storyCards) {
    if (completedWordIds.has(card.wordId)) continue;
    if (card.isLeech) continue;
    if (!card.dueDate || card.dueDate <= today) count++;
  }
  return count;
}

function computeLearnedCount(storyCards: MockCard[]): number {
  return storyCards.filter(
    (c) => c.cardType === "recognition" && c.reps > 0
  ).length;
}

const TODAY = "2026-03-21";

describe("story deck due count", () => {
  it("counts new (never-reviewed) cards as due", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 0 },
      { wordId: "w2", cardType: "recognition", reps: 0 },
    ];
    expect(computeDueCount(cards, new Set(), TODAY)).toBe(2);
  });

  it("excludes completed words", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 0 },
      { wordId: "w2", cardType: "recognition", reps: 0 },
    ];
    expect(computeDueCount(cards, new Set(["w1"]), TODAY)).toBe(1);
  });

  it("excludes leech cards", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 5, isLeech: true },
      { wordId: "w2", cardType: "recognition", reps: 0 },
    ];
    expect(computeDueCount(cards, new Set(), TODAY)).toBe(1);
  });

  it("excludes cards due in the future", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 3, dueDate: "2026-03-25" },
      { wordId: "w2", cardType: "recognition", reps: 0 },
    ];
    expect(computeDueCount(cards, new Set(), TODAY)).toBe(1);
  });

  it("includes cards due today", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 2, dueDate: TODAY },
    ];
    expect(computeDueCount(cards, new Set(), TODAY)).toBe(1);
  });
});

describe("learned count", () => {
  it("counts only recognition cards with reps > 0", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 3 },
      { wordId: "w2", cardType: "recognition", reps: 0 },
      { wordId: "w3", cardType: "production", reps: 5 },
    ];
    expect(computeLearnedCount(cards)).toBe(1);
  });

  it("returns 0 when no cards reviewed", () => {
    const cards: MockCard[] = [
      { wordId: "w1", cardType: "recognition", reps: 0 },
    ];
    expect(computeLearnedCount(cards)).toBe(0);
  });
});

// ── progress percentage ───────────────────────────────────────────────────────

function computeProgressPct(learned: number, total: number): number {
  return total > 0 ? Math.round((learned / total) * 100) : 0;
}

describe("progress percentage", () => {
  it("returns 0 when total is 0", () => {
    expect(computeProgressPct(0, 0)).toBe(0);
  });

  it("returns 100 when all learned", () => {
    expect(computeProgressPct(5, 5)).toBe(100);
  });

  it("rounds correctly", () => {
    expect(computeProgressPct(1, 3)).toBe(33);
    expect(computeProgressPct(2, 3)).toBe(67);
  });
});

// ── review button label logic ─────────────────────────────────────────────────

function reviewButtonLabel(dueCount: number, totalCount: number): string {
  if (dueCount > 0) return `Review ${dueCount} due card${dueCount !== 1 ? "s" : ""}`;
  if (totalCount > 0) return "Review All Words";
  return "All caught up!";
}

describe("review button label", () => {
  it("shows due count when cards are due", () => {
    expect(reviewButtonLabel(3, 5)).toBe("Review 3 due cards");
    expect(reviewButtonLabel(1, 5)).toBe("Review 1 due card");
  });

  it("shows 'Review All Words' when no cards due but words exist", () => {
    expect(reviewButtonLabel(0, 5)).toBe("Review All Words");
  });

  it("shows 'All caught up!' when deck is empty", () => {
    expect(reviewButtonLabel(0, 0)).toBe("All caught up!");
  });
});

// ── story deck URL construction ───────────────────────────────────────────────

function buildStoryDeckUrl(storyId: string, storyTitle: string): string {
  return `/deck?storyId=${encodeURIComponent(storyId)}&storyTitle=${encodeURIComponent(storyTitle)}`;
}

describe("story deck URL", () => {
  it("encodes storyId and storyTitle", () => {
    const url = buildStoryDeckUrl("story-123", "My Story");
    expect(url).toBe("/deck?storyId=story-123&storyTitle=My%20Story");
  });

  it("handles special characters in title", () => {
    const url = buildStoryDeckUrl("s1", "Story: 你好");
    expect(url).toContain("storyTitle=Story%3A%20");
  });
});
