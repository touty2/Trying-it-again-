/**
 * useSync / useSyncNotify — consumer hooks for SyncContext.
 * Kept in a separate file from SyncProvider so Vite Fast Refresh
 * can handle the provider (component) and hooks independently.
 */
import { useContext } from "react";
import { SyncContext, type SyncContextValue } from "@/contexts/SyncContext";

export function useSync(): SyncContextValue {
  const ctx = useContext(SyncContext);
  if (!ctx) throw new Error("useSync must be used within <SyncProvider>");
  return ctx;
}

/**
 * Lightweight hook for components that only need to notify the sync manager
 * of a change (e.g. after a flashcard review or text completion).
 * Does not subscribe to sync state, so it never causes re-renders.
 */
export function useSyncNotify(): () => void {
  const ctx = useContext(SyncContext);
  return ctx?.notifyChange ?? (() => {});
}
