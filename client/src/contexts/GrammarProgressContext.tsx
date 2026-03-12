/**
 * GrammarProgressContext — single source of truth for grammar lesson completion.
 *
 * Storage strategy:
 *   - Primary: localStorage (synchronous, instant reads on mount, no async race)
 *   - Secondary: IndexedDB (kept for cloud sync push/pull via useSyncManager)
 *
 * Key: "grammarProgress"
 * Shape: Record<lessonId, GrammarProgressEntry>
 *
 * All components that call useGrammarProgress() share this single context,
 * so toggling completion in the modal immediately updates the page list and
 * progress bars without any reload.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { GrammarBand, GRAMMAR_LESSONS_BY_BAND } from "@/lib/grammarData";
import { idbPutManyGrammarProgress } from "@/lib/grammarProgressDB";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GrammarProgressEntry {
  lessonId: string;
  completed: boolean;
  completedAt: number | null;
  masteryScore: number | null;
  updatedAt: number;
}

type ProgressRecord = Record<string, GrammarProgressEntry>;

// ─── localStorage helpers ─────────────────────────────────────────────────────

const LS_KEY = "grammarProgress";

function readFromLS(): ProgressRecord {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressRecord;
  } catch {
    return {};
  }
}

function writeToLS(record: ProgressRecord): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(record));
  } catch {
    // storage quota exceeded — silently ignore
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface GrammarProgressContextValue {
  /** Record<lessonId, entry> — stable reference, only changes when progress changes */
  progress: ProgressRecord;
  markComplete: (lessonId: string, masteryScore?: number) => void;
  markIncomplete: (lessonId: string) => void;
  getProgress: (lessonId: string) => GrammarProgressEntry | undefined;
  getBandStats: (band: GrammarBand) => { completed: number; total: number };
  /** For cloud sync: get all entries as an array */
  getAllEntries: () => GrammarProgressEntry[];
  /** For cloud sync: merge rows from server (last-write-wins) */
  mergeFromCloud: (rows: GrammarProgressEntry[]) => void;
}

const GrammarProgressContext = createContext<GrammarProgressContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GrammarProgressProvider({ children }: { children: React.ReactNode }) {
  // Initialise synchronously from localStorage — no async, no loading state
  const [progress, setProgress] = useState<ProgressRecord>(() => readFromLS());

  // Keep a ref so callbacks always have the latest value without being recreated
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const markComplete = useCallback((lessonId: string, masteryScore?: number) => {
    const entry: GrammarProgressEntry = {
      lessonId,
      completed: true,
      completedAt: Date.now(),
      masteryScore: masteryScore ?? null,
      updatedAt: Date.now(),
    };
    setProgress((prev) => {
      const next = { ...prev, [lessonId]: entry };
      writeToLS(next);
      return next;
    });
    // Also write to IndexedDB for cloud sync (fire-and-forget)
    idbPutManyGrammarProgress([entry]).catch(() => {});
  }, []);

  const markIncomplete = useCallback((lessonId: string) => {
    const entry: GrammarProgressEntry = {
      lessonId,
      completed: false,
      completedAt: null,
      masteryScore: null,
      updatedAt: Date.now(),
    };
    setProgress((prev) => {
      const next = { ...prev, [lessonId]: entry };
      writeToLS(next);
      return next;
    });
    idbPutManyGrammarProgress([entry]).catch(() => {});
  }, []);

  const getProgress = useCallback(
    (lessonId: string): GrammarProgressEntry | undefined => {
      return progressRef.current[lessonId];
    },
    []
  );

  const getBandStats = useCallback(
    (band: GrammarBand): { completed: number; total: number } => {
      const lessons = GRAMMAR_LESSONS_BY_BAND[band] ?? [];
      const completed = lessons.filter(
        (l) => progressRef.current[l.id]?.completed === true
      ).length;
      return { completed, total: lessons.length };
    },
    []
  );

  const getAllEntries = useCallback((): GrammarProgressEntry[] => {
    return Object.values(progressRef.current);
  }, []);

  const mergeFromCloud = useCallback((rows: GrammarProgressEntry[]) => {
    setProgress((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const row of rows) {
        const local = next[row.lessonId];
        if (!local || row.updatedAt > local.updatedAt) {
          next[row.lessonId] = row;
          changed = true;
        }
      }
      if (!changed) return prev;
      writeToLS(next);
      // Also sync to IndexedDB
      const toWrite = rows.filter((r) => {
        const local = prev[r.lessonId];
        return !local || r.updatedAt > local.updatedAt;
      });
      if (toWrite.length > 0) {
        idbPutManyGrammarProgress(toWrite).catch(() => {});
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      progress,
      markComplete,
      markIncomplete,
      getProgress,
      getBandStats,
      getAllEntries,
      mergeFromCloud,
    }),
    [progress, markComplete, markIncomplete, getProgress, getBandStats, getAllEntries, mergeFromCloud]
  );

  return (
    <GrammarProgressContext.Provider value={value}>
      {children}
    </GrammarProgressContext.Provider>
  );
}

// ─── Consumer hook ────────────────────────────────────────────────────────────

export function useGrammarProgress(): GrammarProgressContextValue {
  const ctx = useContext(GrammarProgressContext);
  if (!ctx) {
    throw new Error("useGrammarProgress must be used inside <GrammarProgressProvider>");
  }
  return ctx;
}
