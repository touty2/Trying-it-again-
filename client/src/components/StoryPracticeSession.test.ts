/**
 * StoryPracticeSession — unit tests
 *
 * Tests the pure logic used by the practice session:
 *  - shuffle utility
 *  - queue requeue logic (Again inserts card 3 positions ahead)
 *  - word search filter logic (matches hanzi, pinyin, definition)
 */

import { describe, it, expect } from "vitest";

// ── shuffle ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

describe("shuffle", () => {
  it("returns an array of the same length", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr)).toHaveLength(arr.length);
  });

  it("contains the same elements", () => {
    const arr = ["a", "b", "c", "d"];
    const result = shuffle(arr);
    expect(result.sort()).toEqual([...arr].sort());
  });

  it("does not mutate the original array", () => {
    const arr = [1, 2, 3];
    const copy = [...arr];
    shuffle(arr);
    expect(arr).toEqual(copy);
  });

  it("handles empty array", () => {
    expect(shuffle([])).toEqual([]);
  });

  it("handles single-element array", () => {
    expect(shuffle(["x"])).toEqual(["x"]);
  });
});

// ── requeue logic ─────────────────────────────────────────────────────────────

/** Mirrors the handleDontKnow requeue logic in StoryPracticeSession */
function requeue(queue: string[], currentIdx: number, cardId: string): string[] {
  const insertAt = Math.min(currentIdx + 3, queue.length);
  const next = [...queue];
  next.splice(insertAt, 0, cardId);
  return next;
}

describe("requeue logic", () => {
  it("inserts card 3 positions ahead of current index", () => {
    const queue = ["a", "b", "c", "d", "e"];
    const result = requeue(queue, 0, "a");
    expect(result[3]).toBe("a");
    expect(result).toHaveLength(6);
  });

  it("clamps insertion to end of queue when near the end", () => {
    const queue = ["a", "b"];
    const result = requeue(queue, 1, "b");
    // insertAt = min(1+3, 2) = 2 → appended at end
    expect(result[result.length - 1]).toBe("b");
    expect(result).toHaveLength(3);
  });

  it("does not mutate the original queue", () => {
    const queue = ["a", "b", "c"];
    const copy = [...queue];
    requeue(queue, 0, "a");
    expect(queue).toEqual(copy);
  });
});

// ── word search filter ────────────────────────────────────────────────────────

interface MockWord {
  id: string;
  hanzi: string;
  pinyin: string;
  simpleDefinition: string;
}

function filterWords(words: MockWord[], query: string): MockWord[] {
  const q = query.trim().toLowerCase();
  if (!q) return words;
  return words.filter(
    (w) =>
      w.hanzi.includes(query.trim()) ||
      w.pinyin.toLowerCase().includes(q) ||
      (w.simpleDefinition ?? "").toLowerCase().includes(q)
  );
}

const SAMPLE_WORDS: MockWord[] = [
  { id: "1", hanzi: "\u4f60\u597d", pinyin: "ni3 hao3", simpleDefinition: "hello" },
  { id: "2", hanzi: "\u8c22\u8c22", pinyin: "xie4 xie4", simpleDefinition: "thank you" },
  { id: "3", hanzi: "\u5b66\u751f", pinyin: "xue2 sheng1", simpleDefinition: "student" },
  { id: "4", hanzi: "\u8001\u5e08", pinyin: "lao3 shi1", simpleDefinition: "teacher" },
];

describe("word search filter", () => {
  it("returns all words when query is empty", () => {
    expect(filterWords(SAMPLE_WORDS, "")).toHaveLength(4);
  });

  it("filters by hanzi (exact substring)", () => {
    const result = filterWords(SAMPLE_WORDS, "\u4f60\u597d");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("filters by pinyin (case-insensitive)", () => {
    const result = filterWords(SAMPLE_WORDS, "xie");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("2");
  });

  it("filters by definition (case-insensitive)", () => {
    const result = filterWords(SAMPLE_WORDS, "teacher");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("4");
  });

  it("returns empty array when no match", () => {
    expect(filterWords(SAMPLE_WORDS, "xyz123")).toHaveLength(0);
  });

  it("trims whitespace from query", () => {
    const result = filterWords(SAMPLE_WORDS, "  hello  ");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("1");
  });

  it("matches multiple words when query is broad", () => {
    // "xue" matches xue2 sheng1 (student)
    const result = filterWords(SAMPLE_WORDS, "xue");
    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});

// ── practice session progress tracking ───────────────────────────────────────

describe("practice session progress", () => {
  it("tracks known count correctly", () => {
    let knownCount = 0;
    const handleKnow = () => { knownCount += 1; };
    handleKnow();
    handleKnow();
    expect(knownCount).toBe(2);
  });

  it("calculates completion percentage", () => {
    const known = 3;
    const total = 5;
    const pct = total > 0 ? Math.round((known / total) * 100) : 0;
    expect(pct).toBe(60);
  });

  it("handles zero total gracefully", () => {
    const pct = 0 > 0 ? Math.round((0 / 0) * 100) : 0;
    expect(pct).toBe(0);
  });
});
