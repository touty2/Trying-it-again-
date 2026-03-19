/**
 * useTypography — consumer hook for TypographyContext.
 * Kept in a separate file from TypographyProvider so Vite Fast Refresh
 * can handle the provider (component) and hook independently.
 */
import { useContext } from "react";
import { TypographyContext } from "@/contexts/TypographyContext";

export function useTypography() {
  const ctx = useContext(TypographyContext);
  if (!ctx) throw new Error("useTypography must be used within TypographyProvider");
  return ctx;
}
