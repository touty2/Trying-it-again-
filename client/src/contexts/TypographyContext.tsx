// @refresh reset
/**
 * TypographyContext — provides reading typography settings app-wide.
 * Wraps useTypographySettings so any component can read or update preferences.
 */
import { createContext, useContext, ReactNode } from "react";
import {
  useTypographySettings,
  TypographySettings,
  ReadingFontFamily,
  FONT_OPTIONS,
  getFontCSS,
} from "@/hooks/useTypographySettings";

interface TypographyContextType {
  settings: TypographySettings;
  update: (patch: Partial<TypographySettings>) => void;
  reset: () => void;
  FONT_OPTIONS: typeof FONT_OPTIONS;
}

const TypographyContext = createContext<TypographyContextType | null>(null);

export function TypographyProvider({ children }: { children: ReactNode }) {
  const { settings, update, reset, FONT_OPTIONS: fontOpts } = useTypographySettings();
  return (
    <TypographyContext.Provider value={{ settings, update, reset, FONT_OPTIONS: fontOpts }}>
      {children}
    </TypographyContext.Provider>
  );
}

export function useTypography(): TypographyContextType {
  const ctx = useContext(TypographyContext);
  if (!ctx) throw new Error("useTypography must be used within TypographyProvider");
  return ctx;
}

export type { TypographySettings, ReadingFontFamily };
export { getFontCSS };
