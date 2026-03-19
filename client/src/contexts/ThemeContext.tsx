// @refresh reset
import React, { createContext, useContext, useEffect, useState } from "react";
import { useThemeSettings, type ThemeSettings, type AccentColor, type ReadingBg } from "@/hooks/useThemeSettings";

// ─── Original ThemeProvider (light/dark class toggle) ─────────────────────────

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (switchable) {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hooks (re-exported from dedicated hook file for Vite Fast Refresh) ─────
export { useTheme, useThemeCtx } from "@/hooks/useThemeHook";

// ─── ThemeSettingsProvider (accent color + reading background) ────────────────

interface ThemeSettingsContextValue {
  settings: ThemeSettings;
  update: (patch: Partial<ThemeSettings>) => void;
  reset: () => void;
}

export const ThemeSettingsContext = createContext<ThemeSettingsContextValue | null>(null);

export function ThemeSettingsProvider({ children }: { children: React.ReactNode }) {
  const value = useThemeSettings();
  return <ThemeSettingsContext.Provider value={value}>{children}</ThemeSettingsContext.Provider>;
}



export type { AccentColor, ReadingBg };
