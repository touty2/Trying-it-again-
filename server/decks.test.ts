import { describe, expect, it } from "vitest";

/**
 * Unit tests for custom deck logic.
 * The tRPC procedures require a live DB, so we test the pure helper logic here.
 */

// ── Deck settings defaults ────────────────────────────────────────────────────

interface DeckSettings {
  direction: "forward" | "reverse" | "both";
  autoAddFromStories: boolean;
  includedInReviews: boolean;
}

function defaultDeckSettings(): DeckSettings {
  return {
    direction: "both",
    autoAddFromStories: false,
    includedInReviews: true,
  };
}

describe("defaultDeckSettings", () => {
  it("returns correct defaults", () => {
    const s = defaultDeckSettings();
    expect(s.direction).toBe("both");
    expect(s.autoAddFromStories).toBe(false);
    expect(s.includedInReviews).toBe(true);
  });
});

// ── Deck card deduplication ───────────────────────────────────────────────────

function mergeDecksForReview(
  deckCardMap: Record<string, string[]>,
  includedDeckIds: string[]
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const deckId of includedDeckIds) {
    const cardIds = deckCardMap[deckId] ?? [];
    for (const cardId of cardIds) {
      if (!seen.has(cardId)) {
        seen.add(cardId);
        result.push(cardId);
      }
    }
  }
  return result;
}

describe("mergeDecksForReview", () => {
  it("combines cards from multiple decks without duplicates", () => {
    const map = {
      main: ["card-1", "card-2", "card-3"],
      custom1: ["card-2", "card-4"],
      custom2: ["card-3", "card-5"],
    };
    const merged = mergeDecksForReview(map, ["main", "custom1", "custom2"]);
    expect(merged).toHaveLength(5);
    expect(merged).toEqual(["card-1", "card-2", "card-3", "card-4", "card-5"]);
  });

  it("returns only main deck cards when only main is included", () => {
    const map = {
      main: ["card-1", "card-2"],
      custom1: ["card-3"],
    };
    const merged = mergeDecksForReview(map, ["main"]);
    expect(merged).toEqual(["card-1", "card-2"]);
  });

  it("returns empty array when no decks included", () => {
    const map = { main: ["card-1"] };
    const merged = mergeDecksForReview(map, []);
    expect(merged).toHaveLength(0);
  });

  it("handles missing deck ids gracefully", () => {
    const map = { main: ["card-1"] };
    const merged = mergeDecksForReview(map, ["main", "nonexistent"]);
    expect(merged).toEqual(["card-1"]);
  });
});

// ── Deck name validation ──────────────────────────────────────────────────────

function validateDeckName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) return { valid: false, error: "Deck name cannot be empty" };
  if (trimmed.length > 50) return { valid: false, error: "Deck name must be 50 characters or less" };
  if (trimmed.toLowerCase() === "main deck") return { valid: false, error: "Cannot use reserved name 'Main Deck'" };
  return { valid: true };
}

describe("validateDeckName", () => {
  it("accepts valid names", () => {
    expect(validateDeckName("HSK 1").valid).toBe(true);
    expect(validateDeckName("Business Chinese").valid).toBe(true);
  });

  it("rejects empty names", () => {
    expect(validateDeckName("").valid).toBe(false);
    expect(validateDeckName("   ").valid).toBe(false);
  });

  it("rejects names over 50 chars", () => {
    expect(validateDeckName("a".repeat(51)).valid).toBe(false);
  });

  it("rejects reserved name 'Main Deck'", () => {
    expect(validateDeckName("Main Deck").valid).toBe(false);
    expect(validateDeckName("main deck").valid).toBe(false);
  });
});
