/**
 * useThemeSettings — persists UI color/theme preferences in localStorage
 * and applies them as CSS custom properties on <html>.
 *
 * Supports:
 *  - Dark / Light mode toggle
 *  - Accent color (primary / highlight / button color)
 *  - Reading background tint (paper, white, warm, dark)
 *
 * NOTE: All colors use HSL for universal browser compatibility (no OKLCH).
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

// Accent color definitions — HSL values for primary, ring, and accent
const ACCENT_MAP: Record<AccentColor, { primary: string; ring: string; accent: string; accentFg: string; sidebar: string }> = {
  teal:    { primary: "hsl(187 48% 32%)", ring: "hsl(187 48% 32%)", accent: "hsl(187 30% 92%)", accentFg: "hsl(187 35% 24%)", sidebar: "hsl(187 30% 92%)" },
  indigo:  { primary: "hsl(239 48% 40%)", ring: "hsl(239 48% 40%)", accent: "hsl(239 30% 93%)", accentFg: "hsl(239 35% 26%)", sidebar: "hsl(239 30% 93%)" },
  violet:  { primary: "hsl(262 52% 44%)", ring: "hsl(262 52% 44%)", accent: "hsl(262 30% 93%)", accentFg: "hsl(262 35% 26%)", sidebar: "hsl(262 30% 93%)" },
  rose:    { primary: "hsl(346 60% 46%)", ring: "hsl(346 60% 46%)", accent: "hsl(346 40% 94%)", accentFg: "hsl(346 40% 28%)", sidebar: "hsl(346 40% 94%)" },
  amber:   { primary: "hsl(38 80% 46%)",  ring: "hsl(38 80% 46%)",  accent: "hsl(38 60% 94%)",  accentFg: "hsl(38 50% 26%)",  sidebar: "hsl(38 60% 94%)" },
  emerald: { primary: "hsl(152 48% 36%)", ring: "hsl(152 48% 36%)", accent: "hsl(152 30% 92%)", accentFg: "hsl(152 35% 24%)", sidebar: "hsl(152 30% 92%)" },
  sky:     { primary: "hsl(200 48% 40%)", ring: "hsl(200 48% 40%)", accent: "hsl(200 30% 92%)", accentFg: "hsl(200 35% 24%)", sidebar: "hsl(200 30% 92%)" },
  slate:   { primary: "hsl(222 20% 34%)", ring: "hsl(222 20% 34%)", accent: "hsl(222 12% 93%)", accentFg: "hsl(222 20% 24%)", sidebar: "hsl(222 12% 93%)" },
};

// Reading background tints — HSL values
const BG_MAP: Record<ReadingBg, { bg: string; card: string; popover: string }> = {
  white: { bg: "hsl(0 0% 100%)",      card: "hsl(0 0% 100%)",      popover: "hsl(0 0% 100%)" },
  paper: { bg: "hsl(40 30% 97%)",     card: "hsl(40 28% 96%)",     popover: "hsl(40 28% 96%)" },
  warm:  { bg: "hsl(35 40% 96%)",     card: "hsl(35 38% 95%)",     popover: "hsl(35 38% 95%)" },
  cool:  { bg: "hsl(220 20% 96%)",    card: "hsl(220 18% 95%)",    popover: "hsl(220 18% 95%)" },
  dark:  { bg: "hsl(222 16% 12%)",    card: "hsl(222 14% 16%)",    popover: "hsl(222 14% 16%)" },
};

function applyToDOM(s: ThemeSettings) {
  const root = document.documentElement;
  const accent = ACCENT_MAP[s.accentColor] ?? ACCENT_MAP["teal"];
  const bg = BG_MAP[s.readingBg] ?? BG_MAP["white"];

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
    root.style.setProperty("--foreground", "hsl(222 8% 90%)");
    root.style.setProperty("--card-foreground", "hsl(222 8% 90%)");
    root.style.setProperty("--popover-foreground", "hsl(222 8% 90%)");
    root.style.setProperty("--muted", "hsl(222 12% 20%)");
    root.style.setProperty("--muted-foreground", "hsl(222 6% 56%)");
    root.style.setProperty("--border", "hsl(222 10% 26%)");
    root.style.setProperty("--input", "hsl(222 10% 26%)");
    root.style.setProperty("--sidebar-foreground", "hsl(222 8% 90%)");
    root.style.setProperty("--sidebar-border", "hsl(222 10% 26%)");
  } else {
    root.style.setProperty("--foreground", "hsl(222 14% 12%)");
    root.style.setProperty("--card-foreground", "hsl(222 14% 12%)");
    root.style.setProperty("--popover-foreground", "hsl(222 14% 12%)");
    root.style.setProperty("--muted", "hsl(0 0% 96%)");
    root.style.setProperty("--muted-foreground", "hsl(222 6% 46%)");
    root.style.setProperty("--border", "hsl(0 0% 90%)");
    root.style.setProperty("--input", "hsl(0 0% 90%)");
    root.style.setProperty("--sidebar-foreground", "hsl(222 14% 12%)");
    root.style.setProperty("--sidebar-border", "hsl(0 0% 90%)");
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
