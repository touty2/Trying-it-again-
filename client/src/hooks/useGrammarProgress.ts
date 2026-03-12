/**
 * useGrammarProgress — re-exports from GrammarProgressContext.
 *
 * All components import from this file for backward compatibility.
 * The actual state lives in GrammarProgressContext (localStorage-backed,
 * shared across all components via React Context).
 */

export type { GrammarProgressEntry } from "@/contexts/GrammarProgressContext";
export { useGrammarProgress } from "@/contexts/GrammarProgressContext";
