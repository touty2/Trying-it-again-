/**
 * useGrammarProgress — consumer hook for GrammarProgressContext.
 * Kept in a separate file from GrammarProgressProvider so Vite Fast Refresh
 * can handle the provider (component) and hook independently.
 */
import { useContext } from "react";
import { GrammarProgressContext } from "@/contexts/GrammarProgressContext";

export function useGrammarProgress() {
  const ctx = useContext(GrammarProgressContext);
  if (!ctx) {
    throw new Error("useGrammarProgress must be inside <GrammarProgressProvider>");
  }
  return ctx;
}
