/**
 * Regression tests for the 4 session/queue UX bugs reported and fixed.
 *
 * BUG-1: Cards marked 'Know' reappear — dueDate write + session restore
 * BUG-2: Duplicate cards in the same session — visibilitychange dedup
 * BUG-3: New cards don't appear — async loading race (queue built before IndexedDB loads)
 * BUG-4: Queue changes on refresh / due count jumps — session lock and determinism
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  loadAndMergeSession,
  saveSession,
  clearSession,
  markSessionComplete,
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
Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

const ACTIVE_KEY = "cr-deck-session-v2";

function writeRawSession(data: object) {
  store[ACTIVE_KEY] = JSON.stringify(data);
}

// ── BUG-1: Cards marked 'Know' reappear ──────────────────────────────────────
// Root cause: the session restore always returned currentIdx: 0, so after a
// review the restored session would start from the beginning of the queue.
// Fix: loadAndMergeSession builds mergedQueue = unfinishedSaved (cards not yet
// reviewed), so currentIdx: 0 in the result IS the correct next card.

describe("BUG-1 regression — reviewed cards do not reappear after restore", () => {
  beforeEach(() => localStorageMock.clear());

  it("a card reviewed (before currentIdx) is not in the restored queue", () => {
    // Simulate: queue=[A,B,C], user reviewed A (currentIdx advanced to 1)
    writeRawSession({
      queue: ["card-A", "card-B", "card-C"],
      currentIdx: 1,
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    // On restore, all 3 cards are still "due" in the DB (their dueDate is in the
    // future after review, but the currentDueCardIds passed here represents the
    // full due set — the merge logic uses currentIdx to determine what was reviewed)
    const result = loadAndMergeSession(["card-A", "card-B", "card-C"]);
    expect(result).not.toBeNull();
    expect(result).not.toBe(SESSION_COMPLETE);
    // card-A was reviewed (index 0 < currentIdx 1) — must NOT be in the queue
    expect(result!.queue).not.toContain("card-A");
    // card-B and card-C are unfinished — must be in the queue
    expect(result!.queue).toContain("card-B");
    expect(result!.queue).toContain("card-C");
  });

  it("multiple reviewed cards are all excluded from the restored queue", () => {
    writeRawSession({
      queue: ["card-A", "card-B", "card-C", "card-D", "card-E"],
      currentIdx: 3, // A, B, C reviewed; D and E remain
      sessionReviewed: 3,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    const result = loadAndMergeSession(["card-A", "card-B", "card-C", "card-D", "card-E"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toEqual(["card-D", "card-E"]);
    expect(result!.currentIdx).toBe(0);
    expect(result!.sessionReviewed).toBe(3); // progress counter preserved
  });

  it("session is marked complete when all cards have been reviewed", () => {
    writeRawSession({
      queue: ["card-A", "card-B"],
      currentIdx: 2, // both reviewed
      sessionReviewed: 2,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    expect(loadAndMergeSession(["card-A", "card-B"])).toBe(SESSION_COMPLETE);
  });

  it("completedUntil marker prevents session restart on same-day refresh", () => {
    // markSessionComplete writes completedUntil = midnight
    saveSession({ queue: ["card-A"], currentIdx: 0, sessionReviewed: 1, requeuedIds: [] });
    markSessionComplete();
    // Simulate refresh: loadAndMergeSession called again with same due cards
    expect(loadAndMergeSession(["card-A"])).toBe(SESSION_COMPLETE);
    // A second refresh also returns SESSION_COMPLETE (not null, not a new session)
    expect(loadAndMergeSession(["card-A"])).toBe(SESSION_COMPLETE);
  });
});

// ── BUG-2: Duplicate cards in the same session ────────────────────────────────
// Root cause: the visibilitychange handler used `new Set(prev)` to deduplicate,
// but this only checked the current queue snapshot — not the set of cards already
// reviewed this session. Cards answered with "Again" (requeued) were still in
// getDueCards() and could be re-appended.
//
// The fix lives in Deck.tsx (reviewedThisSessionRef), not in useDeckSession.
// We test the session layer: requeuedIds cards are not treated as "new" cards
// to append when merging.

describe("BUG-2 regression — requeued (Again) cards are not duplicated on merge", () => {
  beforeEach(() => localStorageMock.clear());

  it("a requeued card already in the queue is not appended again on merge", () => {
    // card-A was answered "Again" and is in requeuedIds + still in the queue
    writeRawSession({
      queue: ["card-B", "card-A", "card-C"], // card-A requeued after card-B
      currentIdx: 1, // currently at card-A (the requeued position)
      sessionReviewed: 1,
      requeuedIds: ["card-A"],
      savedAt: Date.now(),
    });
    // getDueCards returns card-A as due (Again sets dueDate = now)
    const result = loadAndMergeSession(["card-A", "card-B", "card-C"]);
    expect(result).not.toBeNull();
    // card-A should appear exactly once in the merged queue
    const countA = result!.queue.filter((id) => id === "card-A").length;
    expect(countA).toBe(1);
  });

  it("newly due card (not in saved queue) is appended exactly once", () => {
    writeRawSession({
      queue: ["card-A", "card-B"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    // card-C became due after the session was saved
    const result = loadAndMergeSession(["card-A", "card-B", "card-C"]);
    expect(result).not.toBeNull();
    const countC = result!.queue.filter((id) => id === "card-C").length;
    expect(countC).toBe(1);
  });

  it("no card appears more than once in any merged queue", () => {
    writeRawSession({
      queue: ["card-A", "card-B", "card-A", "card-C"], // card-A requeued
      currentIdx: 2,
      sessionReviewed: 2,
      requeuedIds: ["card-A"],
      savedAt: Date.now(),
    });
    const result = loadAndMergeSession(["card-A", "card-B", "card-C", "card-D"]);
    if (result === null || result === SESSION_COMPLETE) return;
    const ids = result.queue;
    const unique = new Set(ids);
    expect(ids.length).toBe(unique.size); // no duplicates
  });
});

// ── BUG-3: New cards don't appear — async loading race ───────────────────────
// Root cause: the queue was built synchronously in the render body before
// IndexedDB had loaded. getDueCards() returned [] because flashcardsRef was
// empty. The useState initializer only runs once, so the queue stayed empty.
//
// Fix: a useEffect in Deck.tsx watches isLoading and builds the queue only
// after isLoading transitions to false.
//
// We test the session layer: when loadAndMergeSession is called with a non-empty
// due set (simulating the post-load call), it returns a valid queue.

describe("BUG-3 regression — queue is built from the real due set after load", () => {
  beforeEach(() => localStorageMock.clear());

  it("returns null (no saved session) when called with an empty due set before load", () => {
    // Simulates the pre-load call: no session saved, no due cards yet
    expect(loadAndMergeSession([])).toBeNull();
  });

  it("returns a valid queue when called with due cards after load completes", () => {
    // Simulates the post-load call: IndexedDB has loaded, getDueCards() returns cards
    // No saved session — should return null so Deck.tsx builds a fresh queue
    expect(loadAndMergeSession(["new-card-1", "new-card-2", "new-card-3"])).toBeNull();
    // Deck.tsx then builds the queue from getDueCards() and saves it
    saveSession({
      queue: ["new-card-1", "new-card-2", "new-card-3"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
    });
    // On next restore, all 3 cards are present
    const result = loadAndMergeSession(["new-card-1", "new-card-2", "new-card-3"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toHaveLength(3);
    expect(result!.queue).toContain("new-card-1");
  });

  it("new cards (never reviewed) are included when session is freshly built", () => {
    // No saved session; Deck.tsx builds queue from getDueCards() which includes new cards
    saveSession({
      queue: ["new-card-1", "new-card-2"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
    });
    const result = loadAndMergeSession(["new-card-1", "new-card-2"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toContain("new-card-1");
    expect(result!.queue).toContain("new-card-2");
  });
});

// ── BUG-4: Queue changes on refresh / due count jumps ────────────────────────
// Root cause: the visibilitychange handler in AppContext reloaded all flashcards
// from IndexedDB on tab focus, which triggered a re-render. The render-body
// IIFE re-ran loadAndMergeSession and getDueCards, producing a new queue object.
// Since the queue was not locked, it could change order on every render.
//
// Fix: queue is built once in a useEffect (after isLoading=false) and locked
// in state. The session is saved to localStorage immediately so refresh restores
// the same queue. The seeded shuffle uses the date as the seed so order is
// deterministic within a day.
//
// We test the session layer: the same saved session is restored identically
// across multiple loadAndMergeSession calls (simulating multiple refreshes).

describe("BUG-4 regression — queue is stable across refreshes within a session", () => {
  beforeEach(() => localStorageMock.clear());

  it("loadAndMergeSession returns the same queue on repeated calls (simulating refresh)", () => {
    saveSession({
      queue: ["card-C", "card-A", "card-B"], // deliberate non-alphabetical order
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
    });
    const due = ["card-A", "card-B", "card-C"];
    const result1 = loadAndMergeSession(due);
    const result2 = loadAndMergeSession(due);
    const result3 = loadAndMergeSession(due);
    expect(result1).not.toBeNull();
    expect(result2).not.toBeNull();
    expect(result3).not.toBeNull();
    // All three calls return the same queue in the same order
    expect(result1!.queue).toEqual(result2!.queue);
    expect(result2!.queue).toEqual(result3!.queue);
  });

  it("mid-session refresh preserves currentIdx and sessionReviewed", () => {
    saveSession({
      queue: ["card-A", "card-B", "card-C", "card-D"],
      currentIdx: 2, // 2 cards reviewed
      sessionReviewed: 2,
      requeuedIds: [],
    });
    const due = ["card-A", "card-B", "card-C", "card-D"];
    const result = loadAndMergeSession(due);
    expect(result).not.toBeNull();
    // The merged queue starts from the unreviewed cards (card-C, card-D)
    expect(result!.queue).toEqual(["card-C", "card-D"]);
    expect(result!.currentIdx).toBe(0);
    expect(result!.sessionReviewed).toBe(2); // progress preserved
  });

  it("due count does not change mid-session when no new cards become due", () => {
    saveSession({
      queue: ["card-A", "card-B", "card-C"],
      currentIdx: 1,
      sessionReviewed: 1,
      requeuedIds: [],
    });
    // Simulate multiple visibility-change reloads: same due set each time
    const due = ["card-A", "card-B", "card-C"];
    const r1 = loadAndMergeSession(due);
    const r2 = loadAndMergeSession(due);
    expect(r1!.queue.length).toBe(r2!.queue.length);
  });

  it("a newly due card (became due while tab was backgrounded) is appended once", () => {
    saveSession({
      queue: ["card-A", "card-B"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
    });
    // card-C became due while the tab was in the background
    const result = loadAndMergeSession(["card-A", "card-B", "card-C"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toContain("card-C");
    // Appears exactly once
    expect(result!.queue.filter((id) => id === "card-C").length).toBe(1);
    // Original order is preserved; card-C is appended at the end
    expect(result!.queue.indexOf("card-A")).toBeLessThan(result!.queue.indexOf("card-C"));
  });
});
