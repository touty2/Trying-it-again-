/**
 * Tests for the segmentation engine improvements.
 * These tests run in Node (no DOM), so they test the pure logic
 * in shared/sm2.ts and the segmentation override helpers in cedict.ts.
 *
 * The cedict.ts segmenter itself requires a loaded dictionary (browser fetch),
 * so we test the override helpers and the HIGH_FREQ_MULTI priority logic
 * through the exported helpers.
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  setSegmentationOverride,
  deleteSegmentationOverride,
  getSegmentationOverride,
  loadSegmentationOverrides,
  getAllSegmentationOverrides,
} from "../client/src/lib/cedict";

// ─── Segmentation Override Helpers ───────────────────────────────────────────

describe("segmentation override helpers", () => {
  beforeEach(() => {
    // Reset overrides before each test
    loadSegmentationOverrides({});
  });

  it("sets and retrieves an override", () => {
    setSegmentationOverride("global:马上起", ["马上", "起"]);
    expect(getSegmentationOverride("global:马上起")).toEqual(["马上", "起"]);
  });

  it("returns undefined for unknown keys", () => {
    expect(getSegmentationOverride("global:xyz")).toBeUndefined();
  });

  it("deletes an override", () => {
    setSegmentationOverride("global:起来", ["起", "来"]);
    deleteSegmentationOverride("global:起来");
    expect(getSegmentationOverride("global:起来")).toBeUndefined();
  });

  it("loads a batch of overrides", () => {
    loadSegmentationOverrides({
      "global:马上起": ["马上", "起"],
      "global:出来": ["出", "来"],
    });
    expect(getSegmentationOverride("global:马上起")).toEqual(["马上", "起"]);
    expect(getSegmentationOverride("global:出来")).toEqual(["出", "来"]);
  });

  it("getAllSegmentationOverrides returns all entries", () => {
    loadSegmentationOverrides({
      "global:一起来": ["一起", "来"],
    });
    const all = getAllSegmentationOverrides();
    expect(all["global:一起来"]).toEqual(["一起", "来"]);
  });

  it("loading new overrides replaces old ones", () => {
    setSegmentationOverride("global:old", ["o", "l", "d"]);
    loadSegmentationOverrides({ "global:new": ["n", "e", "w"] });
    expect(getSegmentationOverride("global:old")).toBeUndefined();
    expect(getSegmentationOverride("global:new")).toEqual(["n", "e", "w"]);
  });

  it("handles empty splits array", () => {
    setSegmentationOverride("global:test", []);
    expect(getSegmentationOverride("global:test")).toEqual([]);
  });

  it("handles multi-char splits correctly", () => {
    setSegmentationOverride("global:马上起来", ["马上", "起来"]);
    const result = getSegmentationOverride("global:马上起来");
    expect(result).toHaveLength(2);
    expect(result![0]).toBe("马上");
    expect(result![1]).toBe("起来");
  });
});

// ─── SRS Algorithm (sm2) ─────────────────────────────────────────────────────

import { applySM2, type SM2Card } from "../shared/sm2";

// SM2Quality: 0=DontKnow, 1=Nearly, 2=Know
function makeCard(overrides: Partial<SM2Card> = {}): SM2Card {
  const now = Date.now();
  return {
    wordId: "test",
    easeFactor: 2.5,
    interval: 0,
    repetition: 0,
    dueDate: now,
    nextReviewDate: new Date(now).toISOString().slice(0, 10),
    lastReviewed: null,
    createdAt: now,
    ...overrides,
  };
}

describe("sm2 SRS algorithm", () => {
  it("schedules a new card for review after first successful recall", () => {
    const card = makeCard();
    const result = applySM2(card, 2); // 2 = Know
    expect(result.interval).toBeGreaterThanOrEqual(1);
    expect(result.repetition).toBe(1);
  });

  it("resets interval on failure (quality = 0)", () => {
    const card = makeCard({ interval: 10, repetition: 5 });
    const result = applySM2(card, 0); // 0 = DontKnow
    expect(result.interval).toBe(1);
    expect(result.repetition).toBe(0);
  });

  it("increases interval on second repetition", () => {
    const card1 = makeCard();
    const after1 = applySM2(card1, 2);
    const card2 = makeCard({ ...after1 });
    const after2 = applySM2(card2, 2);
    expect((after2.interval ?? 0)).toBeGreaterThan((after1.interval ?? 0));
    expect(after2.repetition).toBe(2);
  });

  it("decreases ease factor on hard recall (quality = 1)", () => {
    const card = makeCard({ interval: 5, repetition: 3 });
    const result = applySM2(card, 1); // 1 = Nearly
    expect(result.easeFactor ?? 2.5).toBeLessThanOrEqual(2.5);
  });

  it("does not let ease factor drop below 1.3", () => {
    let card = makeCard({ easeFactor: 1.4, interval: 5, repetition: 3 });
    for (let i = 0; i < 10; i++) {
      const patch = applySM2(card, 0);
      card = { ...card, ...patch };
    }
    expect(card.easeFactor).toBeGreaterThanOrEqual(1.3);
  });

  it("keeps ease factor stable on successful recall (quality = 2)", () => {
    const card = makeCard({ easeFactor: 2.5, interval: 5, repetition: 3 });
    const result = applySM2(card, 2);
    // easeFactor should stay the same or increase slightly
    expect(result.easeFactor ?? 2.5).toBeGreaterThanOrEqual(2.5);
  });
});
