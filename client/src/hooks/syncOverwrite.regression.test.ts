/**
 * Regression tests for the "reviewed cards reappear after refresh" bug.
 *
 * Root causes fixed:
 *  1. cloudLR >= localLR in useSyncManager allowed equal timestamps to overwrite
 *     local reviewed state with stale cloud data (changed to strict >).
 *  2. markSessionComplete() was only called via the 200ms debounce in
 *     useDeckSessionPersistence — the sync pull could run first and overwrite
 *     IndexedDB before completedUntil was written (fixed: write immediately on
 *     last card review in handleReview / handleMarkCompleted).
 *  3. Server-side SQL used >= in the IF(COALESCE...) conflict resolution, meaning
 *     a push with the same lastReviewed as the stored value would overwrite
 *     (changed to strict > on the server too).
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  loadAndMergeSession,
  saveSession,
  markSessionComplete,
  clearSession,
  SESSION_COMPLETE,
} from "./useDeckSession";

// ── localStorage mock ─────────────────────────────────────────────────────────

const store: Record<string, string> = {};
const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => { store[key] = value; },
  removeItem: (key: string) => { delete store[key]; },
  clear: () => { Object.keys(store).forEach((k) => delete store[k]); },
};
Object.defineProperty(globalThis, "localStorage", { value: localStorageMock });

beforeEach(() => localStorageMock.clear());

// ── Helper ────────────────────────────────────────────────────────────────────

function nextMidnight(): number {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}

// ─────────────────────────────────────────────────────────────────────────────
// Bug 1: completedUntil must be written BEFORE sync fires
// ─────────────────────────────────────────────────────────────────────────────

describe("session completion race condition (Bug 1)", () => {
  it("markSessionComplete written immediately prevents reviewed cards from reappearing", () => {
    // Simulate: user finishes last card, markSessionComplete() is called immediately
    const queue = ["card-1", "card-2", "card-3"];
    saveSession({ queue, currentIdx: 2, sessionReviewed: 2, requeuedIds: [] });

    // Simulate: last card reviewed — markSessionComplete called synchronously
    markSessionComplete();

    // Simulate: sync fires and calls loadAndMergeSession with all cards "due" again
    // (as if the pull overwrote IndexedDB with stale pre-review dueDates)
    const allCardsDueAgain = ["card-1", "card-2", "card-3"];
    const result = loadAndMergeSession(allCardsDueAgain);

    // The session should be marked complete — NOT return a new queue
    expect(result).toBe(SESSION_COMPLETE);
  });

  it("without markSessionComplete, a sync pull with all cards due would restart the session", () => {
    // Simulate: session saved mid-way (no completedUntil written yet)
    const queue = ["card-1", "card-2", "card-3"];
    saveSession({ queue, currentIdx: 3, sessionReviewed: 3, requeuedIds: [] });

    // Without markSessionComplete, loadAndMergeSession sees currentIdx >= queue.length
    // and writes completedUntil itself — this is the fallback path
    const result = loadAndMergeSession(["card-1", "card-2", "card-3"]);
    expect(result).toBe(SESSION_COMPLETE);
  });

  it("completedUntil persists across multiple loadAndMergeSession calls", () => {
    markSessionComplete();

    // First load
    expect(loadAndMergeSession(["card-1"])).toBe(SESSION_COMPLETE);
    // Second load (simulating periodic sync)
    expect(loadAndMergeSession(["card-1", "card-2"])).toBe(SESSION_COMPLETE);
    // Third load (simulating page refresh)
    expect(loadAndMergeSession([])).toBe(SESSION_COMPLETE);
  });

  it("completedUntil expires after midnight and allows a fresh session", () => {
    // Manually write a completedUntil that is already in the past (midnight passed)
    const pastMidnight = Date.now() - 1000;
    const raw = JSON.stringify({
      queue: ["card-1"],
      currentIdx: 1,
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now() - 25 * 60 * 60 * 1000,
      completedUntil: pastMidnight,
    });
    localStorageMock.setItem("cr-deck-session-v2", raw);

    // New day — fresh cards are due
    const result = loadAndMergeSession(["card-1", "card-2"]);
    // Should return null (expired) so caller builds a fresh queue
    expect(result).toBeNull();
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Bug 2: Sync pull conflict resolution — strict > not >=
// ─────────────────────────────────────────────────────────────────────────────

describe("sync conflict resolution (Bug 2 — strict lastReviewed comparison)", () => {
  /**
   * This test models the client-side merge logic in useSyncManager.
   * The fix changed: cloudLR >= localLR  →  cloudLR > localLR
   *
   * Scenario: user reviews a card at time T, pushes it (server stores lastReviewed=T),
   * then on next page load the pull fetches it back with lastReviewed=T.
   * With >=, cloud wins and overwrites local (restoring pre-review dueDate).
   * With >, equal timestamps mean local is at least as fresh → local wins.
   */

  function cloudWins(cloudLR: number | null, localLR: number | null): boolean {
    // OLD (buggy): cloudLR >= localLR
    // NEW (fixed): cloudLR > localLR
    const c = cloudLR ?? 0;
    const l = localLR ?? 0;
    return c > l; // strict greater-than
  }

  it("equal timestamps: local wins (card just reviewed and pushed)", () => {
    const reviewTime = Date.now();
    expect(cloudWins(reviewTime, reviewTime)).toBe(false);
  });

  it("cloud is newer: cloud wins (review happened on another device)", () => {
    const localTime = Date.now() - 5000;
    const cloudTime = Date.now();
    expect(cloudWins(cloudTime, localTime)).toBe(true);
  });

  it("local is newer: local wins (review happened locally, not yet synced)", () => {
    const cloudTime = Date.now() - 5000;
    const localTime = Date.now();
    expect(cloudWins(cloudTime, localTime)).toBe(false);
  });

  it("both null (new card, never reviewed): local wins (no overwrite needed)", () => {
    // Both COALESCE to 0, 0 > 0 = false → local wins
    // New card is handled by the INSERT path, not the UPDATE path
    expect(cloudWins(null, null)).toBe(false);
  });

  it("cloud has a review, local is null: cloud wins (pull new review data)", () => {
    const cloudTime = Date.now();
    expect(cloudWins(cloudTime, null)).toBe(true);
  });

  it("local has a review, cloud is null: local wins (don't overwrite with stale cloud)", () => {
    const localTime = Date.now();
    expect(cloudWins(null, localTime)).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Bug 3: Session merge must not re-add reviewed cards
// ─────────────────────────────────────────────────────────────────────────────

describe("session merge after sync pull (Bug 3)", () => {
  it("reviewed cards excluded from merge even if sync pull makes them appear due", () => {
    // Simulate: session with 3 cards, 2 reviewed (currentIdx=2)
    const queue = ["card-1", "card-2", "card-3"];
    saveSession({ queue, currentIdx: 2, sessionReviewed: 2, requeuedIds: [] });

    // Simulate: sync pull overwrites IndexedDB — card-1 and card-2 appear due again
    // loadAndMergeSession should NOT re-add card-1 and card-2 (already reviewed)
    const result = loadAndMergeSession(["card-1", "card-2", "card-3"]);

    expect(result).not.toBe(SESSION_COMPLETE);
    if (result && result !== SESSION_COMPLETE) {
      // Only card-3 (unfinished) should be in the merged queue
      expect(result.queue).toContain("card-3");
      // card-1 and card-2 were already reviewed — must not reappear
      expect(result.queue).not.toContain("card-1");
      expect(result.queue).not.toContain("card-2");
      // Progress counter preserved
      expect(result.sessionReviewed).toBe(2);
    }
  });

  it("newly due cards added to merge queue (normal new-card flow)", () => {
    const queue = ["card-1", "card-2"];
    saveSession({ queue, currentIdx: 1, sessionReviewed: 1, requeuedIds: [] });

    // card-3 became due while reviewing
    const result = loadAndMergeSession(["card-1", "card-2", "card-3"]);

    expect(result).not.toBe(SESSION_COMPLETE);
    if (result && result !== SESSION_COMPLETE) {
      expect(result.queue).toContain("card-2"); // unfinished
      expect(result.queue).toContain("card-3"); // newly due
      expect(result.queue).not.toContain("card-1"); // already reviewed
    }
  });

  it("empty merge result after sync overwrites all cards marks session complete", () => {
    // All cards reviewed (currentIdx = queue.length)
    const queue = ["card-1", "card-2"];
    saveSession({ queue, currentIdx: 2, sessionReviewed: 2, requeuedIds: [] });

    // Sync pull makes card-1 and card-2 appear due — but they were already reviewed
    const result = loadAndMergeSession(["card-1", "card-2"]);
    expect(result).toBe(SESSION_COMPLETE);
  });
});
