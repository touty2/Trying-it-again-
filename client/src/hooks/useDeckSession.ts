/**
 * useDeckSession — persists the active flashcard review session to localStorage
 * so that a page refresh continues from exactly where the user left off.
 *
 * Stored shape (key: "cr-deck-session-v2"):
 * {
 *   queue:          string[]   — ordered cardId list for this session
 *   currentIdx:     number     — index of the card currently being shown
 *   sessionReviewed:number     — total reviews submitted this session
 *   requeuedIds:    string[]   — cardIds that were requeued (answered Again)
 *   savedAt:        number     — epoch ms; used to detect stale sessions
 * }
 *
 * Merge strategy on restore:
 *   1. Load the saved queue from localStorage.
 *   2. Get the current due set from IndexedDB (via getDueCards).
 *   3. Keep unfinished cards from the saved queue that are still in the due set.
 *   4. Append newly due cards that weren't in the saved queue.
 *   5. Remove cards that are no longer due (completed / deleted).
 *   6. If the session is 24+ hours old, refresh the queue entirely (don't wipe it).
 *
 * The session is cleared when:
 *   - The user completes all cards (currentIdx >= queue.length && queue.length > 0)
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
}

// ── Read ──────────────────────────────────────────────────────────────────────

/**
 * Load raw session from localStorage without any merging.
 * Returns null if nothing is saved or the session is finished.
 */
export function loadSession(): DeckSessionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: PersistedSession = JSON.parse(raw);
    // Don't restore a session that was already finished
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
 * @param currentDueCardIds - cardIds that are currently due (from getDueCards())
 * @returns merged session state, or null if no session to restore
 */
export function loadAndMergeSession(currentDueCardIds: string[]): DeckSessionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: PersistedSession = JSON.parse(raw);

    // If session is finished, clear it
    if (parsed.queue.length === 0 || parsed.currentIdx >= parsed.queue.length) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }

    const dueSet = new Set(currentDueCardIds);
    const isExpired = Date.now() - parsed.savedAt > SESSION_TTL_MS;

    if (isExpired) {
      // Session is 24h+ old: refresh with the full current due set.
      // Don't wipe — just reset to the current due cards.
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

    // Merge strategy:
    // 1. Keep unfinished cards from saved queue that are still due
    const unfinishedSaved = parsed.queue
      .slice(parsed.currentIdx)
      .filter((id) => dueSet.has(id));

    // 2. Cards already reviewed in this session (before currentIdx) — exclude from queue
    const reviewedInSession = new Set(parsed.queue.slice(0, parsed.currentIdx));

    // 3. Add newly due cards not already in the saved queue and not already reviewed
    const savedQueueSet = new Set(parsed.queue);
    const newlyDue = currentDueCardIds.filter(
      (id) => !savedQueueSet.has(id) && !reviewedInSession.has(id)
    );

    const mergedQueue = [...unfinishedSaved, ...newlyDue];

    if (mergedQueue.length === 0) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
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
      localStorage.removeItem(STORAGE_KEY);
      return;
    }
    const persisted: PersistedSession = { ...state, savedAt: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persisted));
  } catch {
    // Ignore quota errors
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
 * Auto-clears when the session is complete (currentIdx >= queue.length).
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
      if (isComplete || queue.length === 0) {
        clearSession();
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
