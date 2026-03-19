/**
 * useTypographySettings — persists reading typography preferences in localStorage
 * and applies them as CSS custom properties on <html>.
 *
 * CSS variables applied to :root:
 *   --reading-font-family   e.g. "'Noto Serif SC', serif"
 *   --reading-font-size     e.g. "1.1rem"
 *   --reading-line-height   e.g. "2.6"
 *   --reading-para-spacing  e.g. "1.6rem"
 *
 * All story text, flashcards, and vocabulary popups inherit these variables.
 * No component should hardcode font-family for reading content.
 */
import { useState, useEffect, useCallback } from "react";

export type ReadingFontFamily = "noto-sans" | "noto-serif" | "inter" | "source-serif" | "system";

export interface TypographySettings {
  fontFamily: ReadingFontFamily;
  /** Font size in integer steps: 80–160 (maps to 0.80rem–1.60rem) */
  fontSize: number;
  /** Line height in integer steps: 15–40 (maps to 1.5–4.0) */
  lineHeight: number;
  /** Paragraph spacing in integer steps: 5–30 (maps to 0.5rem–3.0rem) */
  paraSpacing: number;
}

const DEFAULTS: TypographySettings = {
  fontFamily: "noto-sans",
  fontSize: 110,
  lineHeight: 26,
  paraSpacing: 16,
};

const STORAGE_KEY = "cr-typography-v2";

export const FONT_OPTIONS: { value: ReadingFontFamily; label: string; preview: string; css: string }[] = [
  {
    value: "noto-sans",
    label: "Noto Sans SC",
    preview: "现代简洁",
    css: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif",
  },
  {
    value: "noto-serif",
    label: "Noto Serif SC",
    preview: "教科书风格",
    css: "'Noto Serif SC', 'Songti SC', 'SimSun', serif",
  },
  {
    value: "inter",
    label: "Inter",
    preview: "清晰现代",
    css: "'Inter', 'Noto Sans SC', system-ui, sans-serif",
  },
  {
    value: "source-serif",
    label: "Source Serif 4",
    preview: "优雅阅读",
    css: "'Source Serif 4', 'Noto Serif SC', 'Songti SC', Georgia, serif",
  },
  {
    value: "system",
    label: "System UI",
    preview: "系统默认",
    css: "system-ui, -apple-system, 'Noto Sans SC', sans-serif",
  },
];

export function getFontCSS(family: ReadingFontFamily): string {
  return FONT_OPTIONS.find((f) => f.value === family)?.css ?? FONT_OPTIONS[0].css;
}

function applyToDOM(s: TypographySettings) {
  const root = document.documentElement;
  root.style.setProperty("--reading-font-family", getFontCSS(s.fontFamily));
  root.style.setProperty("--reading-font-size", `${s.fontSize / 100}rem`);
  root.style.setProperty("--reading-line-height", `${s.lineHeight / 10}`);
  root.style.setProperty("--reading-para-spacing", `${s.paraSpacing / 10}rem`);
}

function load(): TypographySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULTS;
}

export function useTypographySettings() {
  const [settings, setSettings] = useState<TypographySettings>(load);

  // Apply to DOM on mount and whenever settings change
  useEffect(() => {
    applyToDOM(settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const update = useCallback((patch: Partial<TypographySettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULTS);
  }, []);

  return { settings, update, reset, FONT_OPTIONS };
}
