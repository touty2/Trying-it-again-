/**
 * Tests for the flashcard session persistence helpers.
 * These run in a jsdom-like environment via vitest.
 *
 * F9 fix: corrected storage key from "cr-deck-session-v1" to "cr-deck-session-v2"
 * F10 fix: added loadAndMergeSession test coverage
 */

import { describe, it, expect, beforeEach } from "vitest";
import {
  loadSession,
  saveSession,
  clearSession,
  loadAndMergeSession,
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

// ── Helpers ───────────────────────────────────────────────────────────────────

const ACTIVE_KEY = "cr-deck-session-v2";

function freshSession() {
  return {
    queue: ["word-1", "word-2", "word-3"],
    currentIdx: 1,
    sessionReviewed: 1,
    requeuedIds: [],
  };
}

function writeRawSession(data: object, key = ACTIVE_KEY) {
  store[key] = JSON.stringify(data);
}

// ── loadSession tests ─────────────────────────────────────────────────────────

describe("useDeckSession — loadSession", () => {
  beforeEach(() => localStorageMock.clear());

  it("returns null when nothing is saved", () => {
    expect(loadSession()).toBeNull();
  });

  it("saves and restores a session correctly", () => {
    const s = freshSession();
    saveSession(s);
    const loaded = loadSession();
    expect(loaded).not.toBeNull();
    expect(loaded!.queue).toEqual(s.queue);
    expect(loaded!.currentIdx).toBe(1);
    expect(loaded!.sessionReviewed).toBe(1);
    expect(loaded!.requeuedIds).toEqual([]);
  });

  it("clears the session", () => {
    saveSession(freshSession());
    clearSession();
    expect(loadSession()).toBeNull();
  });

  it("does not restore a completed session (currentIdx >= queue.length)", () => {
    const s = { ...freshSession(), currentIdx: 3 }; // 3 >= 3
    saveSession(s);
    expect(loadSession()).toBeNull();
  });

  it("does not restore an empty queue", () => {
    saveSession({ queue: [], currentIdx: 0, sessionReviewed: 0, requeuedIds: [] });
    expect(loadSession()).toBeNull();
  });

  it("restores requeuedIds correctly", () => {
    const s = { ...freshSession(), requeuedIds: ["word-1"] };
    saveSession(s);
    const loaded = loadSession();
    expect(loaded!.requeuedIds).toEqual(["word-1"]);
  });

  it("handles malformed JSON gracefully", () => {
    // F9 fix: use the active key (v2) instead of the old v1 key
    store[ACTIVE_KEY] = "not-json{{{";
    expect(loadSession()).toBeNull();
  });

  it("ignores data written to the obsolete v1 key", () => {
    // Data written to the old key should NOT be loaded by the current implementation
    const stale = { ...freshSession(), savedAt: Date.now() };
    store["cr-deck-session-v1"] = JSON.stringify(stale);
    expect(loadSession()).toBeNull();
  });
});

// ── loadAndMergeSession tests (F10) ──────────────────────────────────────────

describe("useDeckSession — loadAndMergeSession", () => {
  beforeEach(() => localStorageMock.clear());

  it("returns null when nothing is saved", () => {
    expect(loadAndMergeSession(["word-1", "word-2"])).toBeNull();
  });

  it("returns SESSION_COMPLETE when the saved session is finished (currentIdx >= queue.length)", () => {
    writeRawSession({
      queue: ["word-1", "word-2"],
      currentIdx: 2, // finished
      sessionReviewed: 2,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    expect(loadAndMergeSession(["word-1", "word-2"])).toBe(SESSION_COMPLETE);
  });

  it("keeps unfinished saved cards that are still due", () => {
    writeRawSession({
      queue: ["word-1", "word-2", "word-3"],
      currentIdx: 1, // word-1 already reviewed
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    const result = loadAndMergeSession(["word-1", "word-2", "word-3"]);
    expect(result).not.toBeNull();
    // word-1 was reviewed (before currentIdx), so only word-2 and word-3 remain
    expect(result!.queue).toEqual(["word-2", "word-3"]);
    expect(result!.currentIdx).toBe(0);
  });

  it("removes cards from saved queue that are no longer due", () => {
    writeRawSession({
      queue: ["word-1", "word-2", "word-3"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    // word-2 is no longer due (e.g. completed or deleted)
    const result = loadAndMergeSession(["word-1", "word-3"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toEqual(["word-1", "word-3"]);
  });

  it("appends newly due cards not in the saved queue", () => {
    writeRawSession({
      queue: ["word-1", "word-2"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    // word-3 became due after the session was saved
    const result = loadAndMergeSession(["word-1", "word-2", "word-3"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toContain("word-3");
    // word-3 should be appended after the existing unfinished cards
    expect(result!.queue.indexOf("word-3")).toBeGreaterThan(result!.queue.indexOf("word-2"));
  });

  it("does not re-add cards already reviewed in the session", () => {
    writeRawSession({
      queue: ["word-1", "word-2", "word-3"],
      currentIdx: 2, // word-1 and word-2 already reviewed
      sessionReviewed: 2,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    // currentDueCardIds still includes word-1 and word-2 (they may still be due tomorrow)
    const result = loadAndMergeSession(["word-1", "word-2", "word-3"]);
    expect(result).not.toBeNull();
    // Only word-3 remains; word-1 and word-2 were already reviewed this session
    expect(result!.queue).toEqual(["word-3"]);
  });

  it("returns SESSION_COMPLETE when merged queue is empty (all cards no longer due = session done)", () => {
    writeRawSession({
      queue: ["word-1", "word-2"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
      savedAt: Date.now(),
    });
    // Neither card is due anymore — treated as session complete, not null
    const result = loadAndMergeSession([]);
    expect(result).toBe(SESSION_COMPLETE);
  });

  it("resets to full due set when session is 24h+ old", () => {
    writeRawSession({
      queue: ["word-1", "word-2"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
      savedAt: Date.now() - 25 * 60 * 60 * 1000, // 25 hours ago
    });
    const result = loadAndMergeSession(["word-3", "word-4"]);
    expect(result).not.toBeNull();
    expect(result!.queue).toEqual(["word-3", "word-4"]);
    expect(result!.currentIdx).toBe(0);
    expect(result!.sessionReviewed).toBe(0);
  });

  it("returns null when session is expired and due set is empty", () => {
    writeRawSession({
      queue: ["word-1"],
      currentIdx: 0,
      sessionReviewed: 0,
      requeuedIds: [],
      savedAt: Date.now() - 25 * 60 * 60 * 1000,
    });
    expect(loadAndMergeSession([])).toBeNull();
  });

  it("handles malformed JSON gracefully", () => {
    store[ACTIVE_KEY] = "not-json{{{";
    expect(loadAndMergeSession(["word-1"])).toBeNull();
  });
});

// ── SESSION_COMPLETE / completedUntil tests ───────────────────────────────────────────

describe("useDeckSession — SESSION_COMPLETE persistence", () => {
  beforeEach(() => localStorageMock.clear());

  it("markSessionComplete writes a completedUntil in the future", () => {
    saveSession(freshSession());
    markSessionComplete();
    const raw = store[ACTIVE_KEY];
    expect(raw).toBeDefined();
    const parsed = JSON.parse(raw);
    expect(parsed.completedUntil).toBeGreaterThan(Date.now());
  });

  it("loadAndMergeSession returns SESSION_COMPLETE when completedUntil is in the future", () => {
    writeRawSession({
      queue: ["word-1"],
      currentIdx: 0,
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now(),
      completedUntil: Date.now() + 60 * 60 * 1000, // 1 hour from now
    });
    expect(loadAndMergeSession(["word-1"])).toBe(SESSION_COMPLETE);
  });

  it("loadAndMergeSession returns null when completedUntil has passed (new day)", () => {
    writeRawSession({
      queue: ["word-1"],
      currentIdx: 0,
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now() - 2 * 60 * 60 * 1000,
      completedUntil: Date.now() - 60 * 1000, // 1 minute ago (passed midnight)
    });
    expect(loadAndMergeSession(["word-1"])).toBeNull();
  });

  it("SESSION_COMPLETE persists across multiple loadAndMergeSession calls", () => {
    writeRawSession({
      queue: ["word-1"],
      currentIdx: 0,
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now(),
      completedUntil: Date.now() + 60 * 60 * 1000,
    });
    // First call
    expect(loadAndMergeSession(["word-1"])).toBe(SESSION_COMPLETE);
    // Second call (simulating refresh/navigation)
    expect(loadAndMergeSession(["word-1"])).toBe(SESSION_COMPLETE);
    // Third call (simulating another navigation)
    expect(loadAndMergeSession(["word-1"])).toBe(SESSION_COMPLETE);
  });

  it("loadSession returns null when completedUntil is in the future (completed sessions are not active)", () => {
    writeRawSession({
      queue: ["word-1"],
      currentIdx: 0,
      sessionReviewed: 1,
      requeuedIds: [],
      savedAt: Date.now(),
      completedUntil: Date.now() + 60 * 60 * 1000,
    });
    expect(loadSession()).toBeNull();
  });
});
