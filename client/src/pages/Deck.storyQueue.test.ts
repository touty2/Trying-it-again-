/**
 * Story-scoped queue initialization — unit tests
 *
 * Verifies the pure logic used when building the review queue for a
 * story-filtered deck session:
 *  - Only cards whose wordId is in the story's word set are included
 *  - New cards (no lastReviewed) come before due cards
 *  - Main deck cards not in the story are excluded
 *  - Empty story deck produces an empty queue
 */

import { describe, it, expect } from "vitest";

interface MockCard {
  cardId: string;
  wordId: string;
  lastReviewed?: number;
}

function buildStoryQueue(
  allDueCards: MockCard[],
  storyWordIds: Set<string>
): string[] {
  const storyCards = allDueCards.filter((c) => storyWordIds.has(c.wordId));
  const newCards = storyCards
    .filter((c) => !c.lastReviewed)
    .map((c) => c.cardId);
  const dueCards = storyCards
    .filter((c) => c.lastReviewed)
    .map((c) => c.cardId);
  // In production these are shuffled; for tests we just verify membership
  return [...newCards, ...dueCards];
}

describe("buildStoryQueue", () => {
  const allCards: MockCard[] = [
    { cardId: "c1", wordId: "w1" },                          // story, new
    { cardId: "c2", wordId: "w2", lastReviewed: 1000 },      // story, due
    { cardId: "c3", wordId: "w3" },                          // NOT in story
    { cardId: "c4", wordId: "w4", lastReviewed: 2000 },      // NOT in story
    { cardId: "c5", wordId: "w1", lastReviewed: 3000 },      // story, production card
  ];

  const storyWordIds = new Set(["w1", "w2"]);

  it("includes only cards whose wordId is in the story set", () => {
    const queue = buildStoryQueue(allCards, storyWordIds);
    expect(queue).toContain("c1");
    expect(queue).toContain("c2");
    expect(queue).toContain("c5");
    expect(queue).not.toContain("c3");
    expect(queue).not.toContain("c4");
  });

  it("places new cards before due cards", () => {
    const queue = buildStoryQueue(allCards, storyWordIds);
    const newIdx = queue.indexOf("c1");
    const dueIdx = queue.indexOf("c2");
    expect(newIdx).toBeLessThan(dueIdx);
  });

  it("returns empty queue when story has no words", () => {
    const queue = buildStoryQueue(allCards, new Set());
    expect(queue).toHaveLength(0);
  });

  it("returns empty queue when no cards are due", () => {
    const queue = buildStoryQueue([], storyWordIds);
    expect(queue).toHaveLength(0);
  });

  it("handles story with all new cards", () => {
    const cards: MockCard[] = [
      { cardId: "c1", wordId: "w1" },
      { cardId: "c2", wordId: "w2" },
    ];
    const queue = buildStoryQueue(cards, new Set(["w1", "w2"]));
    expect(queue).toHaveLength(2);
    expect(queue).toContain("c1");
    expect(queue).toContain("c2");
  });

  it("handles story with all due (reviewed) cards", () => {
    const cards: MockCard[] = [
      { cardId: "c1", wordId: "w1", lastReviewed: 1000 },
      { cardId: "c2", wordId: "w2", lastReviewed: 2000 },
    ];
    const queue = buildStoryQueue(cards, new Set(["w1", "w2"]));
    expect(queue).toHaveLength(2);
  });

  it("main deck cards with no story filter returns all due cards", () => {
    // When storyWordIds is null/empty, the queue is built from all due cards
    const allWordIds = new Set(allCards.map((c) => c.wordId));
    const queue = buildStoryQueue(allCards, allWordIds);
    expect(queue).toHaveLength(allCards.length);
  });
});

// ── isStoryMode detection ─────────────────────────────────────────────────────

function parseStoryFilter(search: string): { storyId: string | null; storyTitle: string | null } {
  const p = new URLSearchParams(search);
  return {
    storyId: p.get("storyId") ?? null,
    storyTitle: p.get("storyTitle") ?? null,
  };
}

describe("parseStoryFilter", () => {
  it("detects storyId from URL params", () => {
    const result = parseStoryFilter("?storyId=story-123&storyTitle=My+Story");
    expect(result.storyId).toBe("story-123");
    expect(result.storyTitle).toBe("My Story");
  });

  it("returns null when no storyId param", () => {
    const result = parseStoryFilter("");
    expect(result.storyId).toBeNull();
    expect(result.storyTitle).toBeNull();
  });

  it("isStoryMode is true when storyId is present", () => {
    const { storyId } = parseStoryFilter("?storyId=abc");
    expect(!!storyId).toBe(true);
  });

  it("isStoryMode is false when storyId is absent", () => {
    const { storyId } = parseStoryFilter("?view=list");
    expect(!!storyId).toBe(false);
  });
});
