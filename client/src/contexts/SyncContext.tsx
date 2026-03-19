// @refresh reset
/**
 * SyncContext — provides cloud sync state and controls throughout the app.
 *
 * Uses the Manus OAuth user (from tRPC auth.me) to determine if the user
 * is logged in, then triggers sync via useSyncManager.
 *
 * Usage:
 *   const { syncState, triggerSync, isSyncing } = useSync();
 */

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSyncManager, registerMergeGrammarCallback, type SyncState } from "@/hooks/useSyncManager";
import { useGrammarProgress } from "@/contexts/GrammarProgressContext";

// ─── Context Types ────────────────────────────────────────────────────────────

export interface SyncContextValue {
  syncState: SyncState;
  triggerSync: () => Promise<void>;
  /** Call after any user action to schedule a debounced sync (10s window). */
  notifyChange: () => void;
  isSyncing: boolean;
  /** The numeric DB user ID (null if not logged in) */
  userId: number | null;
}

export const SyncContext = createContext<SyncContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SyncProvider({ children }: { children: ReactNode }) {
  // Use the Manus OAuth auth state (real backend auth)
  const { user } = useAuth();

  // The DB user ID from the auth.me response
  // The User type from drizzle schema has `id: number`
  const userId = (user as { id?: number } | null)?.id ?? null;

  const { syncState, triggerSync, notifyChange, isSyncing } = useSyncManager(userId);

  // Register the in-memory grammar progress refresh callback so the sync manager
  // can update the React context immediately after a cloud pull.
  const { mergeFromCloud } = useGrammarProgress();
  useEffect(() => {
    registerMergeGrammarCallback(mergeFromCloud);
  }, [mergeFromCloud]);

  return (
    <SyncContext.Provider value={{ syncState, triggerSync, notifyChange, isSyncing, userId }}>
      {children}
    </SyncContext.Provider>
  );
}

// ─── Hooks (re-exported from dedicated hook file for Vite Fast Refresh) ─────
export { useSync, useSyncNotify } from "@/hooks/useSync";
