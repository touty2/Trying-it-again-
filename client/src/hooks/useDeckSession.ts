/**
 * useDeckSession — persists the active flashcard review session to localStorage
 * so that a page refresh or navigation continues from exactly where the user left off.
 *
 * Stored shape (key: "cr-deck-session-v2"):
 * {
 *   queue:           string[]   — ordered cardId list for this session
 *   currentIdx:      number     — index of the card currently being shown
 *   sessionReviewed: number     — total reviews submitted this session
 *   requeuedIds:     string[]   — cardIds that were requeued (answered Again)
 *   savedAt:         number     — epoch ms; used to detect stale sessions (24h TTL)
 *   completedUntil?: number     — epoch ms; if set and in the future, session is done for today
 * }
 *
 * Completion behaviour (the key fix):
 *   When the user finishes all cards, we write completedUntil = start of next calendar day
 *   instead of deleting the entry. On the next load:
 *     - completedUntil is in the future  → return SESSION_COMPLETE sentinel (show done screen)
 *     - completedUntil has passed        → treat as expired, rebuild from getDueCards()
 *
 * Merge strategy on restore (non-completed sessions):
 *   1. Load the saved queue from localStorage.
 *   2. Get the current due set from IndexedDB (via getDueCards).
 *   3. Keep unfinished cards from the saved queue that are still in the due set.
 *   4. Append newly due cards that weren't in the saved queue.
 *   5. Remove cards that are no longer due (completed / deleted).
 *   6. If the session is 24+ hours old, refresh the queue entirely (don't wipe it).
 *
 * The session is cleared when:
 *   - `clearSession()` is called explicitly (manual reset / source change)
 *   - The queue is empty after merging
 */

import { useCallback, useEffect, useRef } from "react";

const STORAGE_KEY = "cr-deck-session-v2";
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface DeckSessionState {
  queue: string[];
  currentIdx: number;
  sessionReviewed: number;
  requeuedIds: string[];
}

interface PersistedSession extends DeckSessionState {
  savedAt: number;
  completedUntil?: number;
}

/** Sentinel returned by loadAndMergeSession when the session was completed today. */
export const SESSION_COMPLETE = "SESSION_COMPLETE" as const;
export type SessionLoadResult = DeckSessionState | typeof SESSION_COMPLETE | null;

/** Midnight of the next calendar day in local time, as epoch ms. */
function nextMidnight(): number {
  const d = new Date();
  d.setHours(24, 0, 0, 0); // rolls over to midnight tonight
  return d.getTime();
}

// ── Read ──────────────────────────────────────────────────────────────────────

/**
 * Load raw session from localStorage without any merging.
 * Returns null if nothing is saved.
 * Does NOT clear completed sessions — that is handled by loadAndMergeSession.
 */
export function loadSession(): DeckSessionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: PersistedSession = JSON.parse(raw);
    // Completed sessions are handled separately — don't treat them as active
    if (parsed.completedUntil && parsed.completedUntil > Date.now()) return null;
    // Don't restore a session that was already finished without the completedUntil marker
    if (parsed.queue.length === 0 || parsed.currentIdx >= parsed.queue.length) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return {
      queue: parsed.queue,
      currentIdx: parsed.currentIdx,
      sessionReviewed: parsed.sessionReviewed,
      requeuedIds: parsed.requeuedIds ?? [],
    };
  } catch {
    return null;
  }
}

/**
 * Load and merge the saved session with the current due set.
 *
 * Returns:
 *   SESSION_COMPLETE  — session was completed today, show the done screen
 *   DeckSessionState  — active session to restore
 *   null              — no session, build fresh from getDueCards()
 *
 * @param currentDueCardIds - cardIds that are currently due (from getDueCards())
 */
export function loadAndMergeSession(currentDueCardIds: string[]): SessionLoadResult {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: PersistedSession = JSON.parse(raw);

    // ── Completed-today check ────────────────────────────────────────────────
    if (parsed.completedUntil) {
      if (parsed.completedUntil > Date.now()) {
        // Session was completed today — tell the caller to show the done screen.
        return SESSION_COMPLETE;
      } else {
        // completedUntil has passed (new day) — clear and rebuild fresh.
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
    }

    // ── Expired session (24h+ old, no completedUntil) ────────────────────────
    const isExpired = Date.now() - parsed.savedAt > SESSION_TTL_MS;
    if (isExpired) {
      if (currentDueCardIds.length === 0) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return {
        queue: currentDueCardIds,
        currentIdx: 0,
        sessionReviewed: 0,
        requeuedIds: [],
      };
    }

    // ── In-progress session: merge with current due set ──────────────────────
    // Treat a session with no remaining cards as finished
    if (parsed.queue.length === 0 || parsed.currentIdx >= parsed.queue.length) {
      // Mark as completed until midnight so the done screen persists
      const completed: PersistedSession = {
        ...parsed,
        completedUntil: nextMidnight(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      return SESSION_COMPLETE;
    }

    const dueSet = new Set(currentDueCardIds);

    // 1. Keep unfinished cards from saved queue that are still due
    const unfinishedSaved = parsed.queue
      .slice(parsed.currentIdx)
      .filter((id) => dueSet.has(id));

    // 2. Cards already reviewed in this session (before currentIdx) — exclude
    const reviewedInSession = new Set(parsed.queue.slice(0, parsed.currentIdx));

    // 3. Add newly due cards not already in the saved queue and not already reviewed.
    //    Preserve the new-cards-first ordering from getDueCards (F4 fix).
    const savedQueueSet = new Set(parsed.queue);
    const newlyDue = currentDueCardIds.filter(
      (id) => !savedQueueSet.has(id) && !reviewedInSession.has(id)
    );

    const mergedQueue = [...unfinishedSaved, ...newlyDue];

    if (mergedQueue.length === 0) {
      // Nothing left — mark as completed until midnight
      const completed: PersistedSession = {
        ...parsed,
        queue: [],
        currentIdx: 0,
        completedUntil: nextMidnight(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      return SESSION_COMPLETE;
    }

    return {
      queue: mergedQueue,
      currentIdx: 0,
      sessionReviewed: parsed.sessionReviewed,
      requeuedIds: parsed.requeuedIds.filter((id) => dueSet.has(id)),
    };
  } catch {
    return null;
  }
}

// ── Write ─────────────────────────────────────────────────────────────────────

export function saveSession(state: DeckSessionState): void {
  try {
    if (state.queue.length === 0) {
      // Empty queue — mark as completed until midnight
      const completed: PersistedSession = {
        ...state,
        savedAt: Date.now(),
        completedUntil: nextMidnight(),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      return;
    }
    const persisted: PersistedSession = { ...state, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    // Ignore quota errors
  }
}

/** Mark the session as completed until midnight (persists the done screen). */
export function markSessionComplete(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: Partial<PersistedSession> = raw ? JSON.parse(raw) : {};
    const completed: PersistedSession = {
      queue: existing.queue ?? [],
      currentIdx: existing.currentIdx ?? 0,
      sessionReviewed: existing.sessionReviewed ?? 0,
      requeuedIds: existing.requeuedIds ?? [],
      savedAt: existing.savedAt ?? Date.now(),
      completedUntil: nextMidnight(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
  } catch {
    // ignore
  }
}

export function clearSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Persists session state to localStorage after every change.
 * When the session is complete (currentIdx >= queue.length), writes a
 * completedUntil marker instead of deleting — so the done screen persists
 * across refresh and navigation until midnight.
 */
export function useDeckSessionPersistence(
  queue: string[],
  currentIdx: number,
  sessionReviewed: number,
  requeuedIds: Set<string>
) {
  // Debounce writes so rapid card flips don't hammer localStorage
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      const isComplete = queue.length > 0 && currentIdx >= queue.length;
      if (isComplete) {
        // Session finished — write completedUntil instead of deleting
        markSessionComplete();
      } else if (queue.length === 0) {
        // Queue was never populated (e.g. story mode not yet loaded) — don't write anything
        // Only clear if there's no completedUntil marker already set
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          try {
            const parsed: PersistedSession = JSON.parse(raw);
            if (!parsed.completedUntil || parsed.completedUntil <= Date.now()) {
              clearSession();
            }
          } catch {
            clearSession();
          }
        }
      } else {
        saveSession({
          queue,
          currentIdx,
          sessionReviewed,
          requeuedIds: Array.from(requeuedIds),
        });
      }
    }, 200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [queue, currentIdx, sessionReviewed, requeuedIds]);

  const clear = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    clearSession();
  }, []);

  return { clear };
}
