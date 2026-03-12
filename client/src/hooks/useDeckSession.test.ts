/**
 * Tests for the flashcard session persistence helpers.
 * These run in a jsdom-like environment via vitest.
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadSession, saveSession, clearSession } from "./useDeckSession";

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

function freshSession() {
  return {
    queue: ["word-1", "word-2", "word-3"],
    currentIdx: 1,
    sessionReviewed: 1,
    requeuedIds: [],
  };
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe("useDeckSession persistence", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

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
    // saveSession itself should have removed the key for a completed session
    expect(loadSession()).toBeNull();
  });

  it("does not restore an empty queue", () => {
    saveSession({ queue: [], currentIdx: 0, sessionReviewed: 0, requeuedIds: [] });
    expect(loadSession()).toBeNull();
  });

  it("expires sessions older than 24 hours", () => {
    const s = freshSession();
    // Write a session with a timestamp 25 hours in the past
    const stale = { ...s, savedAt: Date.now() - 25 * 60 * 60 * 1000 };
    store["cr-deck-session-v1"] = JSON.stringify(stale);
    expect(loadSession()).toBeNull();
  });

  it("restores requeuedIds correctly", () => {
    const s = { ...freshSession(), requeuedIds: ["word-1"] };
    saveSession(s);
    const loaded = loadSession();
    expect(loaded!.requeuedIds).toEqual(["word-1"]);
  });

  it("handles malformed JSON gracefully", () => {
    store["cr-deck-session-v1"] = "not-json{{{";
    expect(loadSession()).toBeNull();
  });
});
