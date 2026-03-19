/**
 * useThemeSettings — persists UI color/theme preferences in localStorage
 * and applies them as CSS custom properties on <html>.
 *
 * Supports:
 *  - Dark / Light mode toggle
 *  - Accent color (primary / highlight / button color)
 *  - Reading background tint (paper, white, warm, dark)
 */
import { useState, useEffect, useCallback } from "react";

export type AccentColor =
  | "teal"
  | "indigo"
  | "violet"
  | "rose"
  | "amber"
  | "emerald"
  | "sky"
  | "slate";

export type ReadingBg =
  | "white"
  | "paper"
  | "warm"
  | "cool"
  | "dark";

export interface ThemeSettings {
  darkMode: boolean;
  accentColor: AccentColor;
  readingBg: ReadingBg;
}

const DEFAULTS: ThemeSettings = {
  darkMode: false,
  accentColor: "teal",
  readingBg: "white",
};

const STORAGE_KEY = "cr-theme-v1";

// Accent color definitions — OKLCH values for primary, ring, and accent
const ACCENT_MAP: Record<AccentColor, { primary: string; ring: string; accent: string; accentFg: string; sidebar: string }> = {
  teal:    { primary: "oklch(0.45 0.12 195)", ring: "oklch(0.45 0.12 195)", accent: "oklch(0.94 0.02 195)", accentFg: "oklch(0.3 0.1 195)", sidebar: "oklch(0.94 0.02 195)" },
  indigo:  { primary: "oklch(0.45 0.15 265)", ring: "oklch(0.45 0.15 265)", accent: "oklch(0.94 0.04 265)", accentFg: "oklch(0.3 0.12 265)", sidebar: "oklch(0.94 0.04 265)" },
  violet:  { primary: "oklch(0.48 0.18 290)", ring: "oklch(0.48 0.18 290)", accent: "oklch(0.94 0.04 290)", accentFg: "oklch(0.3 0.12 290)", sidebar: "oklch(0.94 0.04 290)" },
  rose:    { primary: "oklch(0.50 0.18 10)",  ring: "oklch(0.50 0.18 10)",  accent: "oklch(0.95 0.04 10)",  accentFg: "oklch(0.3 0.12 10)",  sidebar: "oklch(0.95 0.04 10)" },
  amber:   { primary: "oklch(0.55 0.15 75)",  ring: "oklch(0.55 0.15 75)",  accent: "oklch(0.95 0.04 75)",  accentFg: "oklch(0.3 0.10 75)",  sidebar: "oklch(0.95 0.04 75)" },
  emerald: { primary: "oklch(0.47 0.14 155)", ring: "oklch(0.47 0.14 155)", accent: "oklch(0.94 0.04 155)", accentFg: "oklch(0.3 0.10 155)", sidebar: "oklch(0.94 0.04 155)" },
  sky:     { primary: "oklch(0.50 0.14 220)", ring: "oklch(0.50 0.14 220)", accent: "oklch(0.94 0.04 220)", accentFg: "oklch(0.3 0.10 220)", sidebar: "oklch(0.94 0.04 220)" },
  slate:   { primary: "oklch(0.38 0.04 250)", ring: "oklch(0.38 0.04 250)", accent: "oklch(0.94 0.01 250)", accentFg: "oklch(0.3 0.04 250)", sidebar: "oklch(0.94 0.01 250)" },
};

// Reading background tints
const BG_MAP: Record<ReadingBg, { bg: string; card: string; popover: string }> = {
  white: { bg: "oklch(1 0 0)",          card: "oklch(1 0 0)",          popover: "oklch(1 0 0)" },
  paper: { bg: "oklch(0.98 0.01 80)",   card: "oklch(0.97 0.01 80)",   popover: "oklch(0.97 0.01 80)" },
  warm:  { bg: "oklch(0.97 0.015 60)",  card: "oklch(0.96 0.015 60)",  popover: "oklch(0.96 0.015 60)" },
  cool:  { bg: "oklch(0.97 0.01 240)",  card: "oklch(0.96 0.01 240)",  popover: "oklch(0.96 0.01 240)" },
  dark:  { bg: "oklch(0.14 0.01 250)",  card: "oklch(0.18 0.01 250)",  popover: "oklch(0.18 0.01 250)" },
};

function applyToDOM(s: ThemeSettings) {
  const root = document.documentElement;
  const accent = ACCENT_MAP[s.accentColor];
  const bg = BG_MAP[s.readingBg];

  // Dark mode class — single source of truth on <html>
  const isDark = s.darkMode || s.readingBg === "dark";
  if (isDark) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  // Keep ThemeProvider's separate localStorage key in sync so it doesn't fight us
  try { localStorage.setItem("theme", isDark ? "dark" : "light"); } catch (_) {}

  // Accent color variables
  root.style.setProperty("--primary", accent.primary);
  root.style.setProperty("--ring", accent.ring);
  root.style.setProperty("--accent", accent.accent);
  root.style.setProperty("--accent-foreground", accent.accentFg);
  root.style.setProperty("--sidebar-primary", accent.primary);
  root.style.setProperty("--sidebar-accent", accent.sidebar);
  root.style.setProperty("--sidebar-accent-foreground", accent.accentFg);
  root.style.setProperty("--sidebar-ring", accent.ring);

  // Reading background
  root.style.setProperty("--background", bg.bg);
  root.style.setProperty("--card", bg.card);
  root.style.setProperty("--popover", bg.popover);
  root.style.setProperty("--sidebar", bg.card);

  // Dark mode foreground adjustments
  if (s.darkMode || s.readingBg === "dark") {
    root.style.setProperty("--foreground", "oklch(0.93 0.01 250)");
    root.style.setProperty("--card-foreground", "oklch(0.93 0.01 250)");
    root.style.setProperty("--popover-foreground", "oklch(0.93 0.01 250)");
    root.style.setProperty("--muted", "oklch(0.22 0.01 250)");
    root.style.setProperty("--muted-foreground", "oklch(0.60 0.01 250)");
    root.style.setProperty("--border", "oklch(0.28 0.01 250)");
    root.style.setProperty("--input", "oklch(0.28 0.01 250)");
    root.style.setProperty("--sidebar-foreground", "oklch(0.93 0.01 250)");
    root.style.setProperty("--sidebar-border", "oklch(0.28 0.01 250)");
  } else {
    root.style.setProperty("--foreground", "oklch(0.13 0.01 250)");
    root.style.setProperty("--card-foreground", "oklch(0.13 0.01 250)");
    root.style.setProperty("--popover-foreground", "oklch(0.13 0.01 250)");
    root.style.setProperty("--muted", "oklch(0.96 0 0)");
    root.style.setProperty("--muted-foreground", "oklch(0.50 0.01 250)");
    root.style.setProperty("--border", "oklch(0.90 0 0)");
    root.style.setProperty("--input", "oklch(0.90 0 0)");
    root.style.setProperty("--sidebar-foreground", "oklch(0.13 0.01 250)");
    root.style.setProperty("--sidebar-border", "oklch(0.90 0 0)");
  }
}

function load(): ThemeSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULTS;
}

export function useThemeSettings() {
  const [settings, setSettings] = useState<ThemeSettings>(load);

  useEffect(() => {
    applyToDOM(settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = useCallback((patch: Partial<ThemeSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
  }, []);

  return { settings, update, reset };
}

export const ACCENT_OPTIONS: { value: AccentColor; label: string; color: string }[] = [
  { value: "teal",    label: "Teal",    color: "#0d9488" },
  { value: "indigo",  label: "Indigo",  color: "#4f46e5" },
  { value: "violet",  label: "Violet",  color: "#7c3aed" },
  { value: "rose",    label: "Rose",    color: "#e11d48" },
  { value: "amber",   label: "Amber",   color: "#d97706" },
  { value: "emerald", label: "Emerald", color: "#059669" },
  { value: "sky",     label: "Sky",     color: "#0284c7" },
  { value: "slate",   label: "Slate",   color: "#475569" },
];

export const READING_BG_OPTIONS: { value: ReadingBg; label: string; description: string; swatch: string }[] = [
  { value: "white", label: "White",      description: "Pure white",       swatch: "#ffffff" },
  { value: "paper", label: "Paper",      description: "Warm off-white",   swatch: "#faf8f3" },
  { value: "warm",  label: "Warm",       description: "Soft warm tint",   swatch: "#fdf6ec" },
  { value: "cool",  label: "Cool",       description: "Light cool tint",  swatch: "#f4f6fb" },
  { value: "dark",  label: "Dark",       description: "Night reading",    swatch: "#1a1d26" },
];
