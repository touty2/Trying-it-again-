/**
 * useApp — consumer hook for AppContext.
 * Kept in a separate file from AppProvider so Vite Fast Refresh
 * can handle the provider (component) and hook independently.
 */
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
