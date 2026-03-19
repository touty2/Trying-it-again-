/**
 * useTheme / useThemeCtx — consumer hooks for ThemeContext / ThemeSettingsContext.
 * Kept in a separate file from the providers so Vite Fast Refresh
 * can handle providers (components) and hooks independently.
 */
import { useContext } from "react";
import { ThemeContext, ThemeSettingsContext } from "@/contexts/ThemeContext";

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}

export function useThemeCtx() {
  const ctx = useContext(ThemeSettingsContext);
  if (!ctx) throw new Error("useThemeCtx must be used inside ThemeSettingsProvider");
  return ctx;
}
