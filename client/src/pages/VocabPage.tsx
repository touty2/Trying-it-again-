/**
 * VocabPage — Themed Vocabulary Lists
 * Design: Mobile-first, minimal, structured
 *
 * Features:
 *  - 25 themed categories with subcategories
 *  - List / Grid view toggle (persisted in localStorage)
 *  - Add / Ignore toggles per word (green check / red X icon buttons)
 *  - Include All / Ignore All for current filter
 *  - Subcategory horizontal scrollable chips
 *  - User-added words section
 *  - Persisted in IndexedDB (VocabIgnoredDB)
 *
 * Note: VocabWord has no id field — we use `${themeId}::${subcatId}::${hanzi}` as a stable key.
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { VocabIgnoredDB } from "@/lib/db";
import { formatFlashcardDefinitions, LABEL_STYLES } from "@/lib/formatDefinitions";
import {
  ALL_THEMES as VOCAB_THEMES,
  type VocabWord,
  type VocabSubcategory,
  type VocabTheme,
} from "@/lib/vocabData";
import { useApp } from "@/contexts/AppContext";
import {
  CheckCircle2,
  XCircle,
  Volume2,
  Plus,
  BookOpen,
  ChevronDown,
  LayoutList,
  LayoutGrid,
} from "lucide-react";
import { useTTS } from "@/hooks/useTTS";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { toast } from "sonner";

// ─── Constants ────────────────────────────────────────────────────────────────

const LS_VIEW_KEY = "vocab-view-mode";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function wordKey(themeId: string, subcatId: string, hanzi: string): string {
  return `${themeId}::${subcatId}::${hanzi}`;
}

function themeWords(
  themeId: string,
  subcats: VocabSubcategory[],
  subcatFilter: string
): Array<{ key: string; word: VocabWord; subcatId: string }> {
  const result: Array<{ key: string; word: VocabWord; subcatId: string }> = [];
  for (const sub of subcats) {
    if (subcatFilter !== "all" && sub.id !== subcatFilter) continue;
    for (const word of sub.words) {
      result.push({ key: wordKey(themeId, sub.id, word.hanzi), word, subcatId: sub.id });
    }
  }
  return result;
}

/** Detect if the device is mobile-width on first render */
function getDefaultViewMode(): "list" | "grid" {
  try {
    const saved = localStorage.getItem(LS_VIEW_KEY);
    if (saved === "list" || saved === "grid") return saved;
  } catch {
    // localStorage unavailable
  }
  // Default: list on mobile (<768px), grid on desktop
  return typeof window !== "undefined" && window.innerWidth >= 768 ? "grid" : "list";
}

// ─── WordCard — List variant ──────────────────────────────────────────────────

interface WordCardProps {
  entry: { key: string; word: VocabWord; subcatId: string };
  inDeck: boolean;
  isIgnored: boolean;
  isLoading: boolean;
  viewMode: "list" | "grid";
  onAdd: (key: string, hanzi: string) => void;
  onIgnore: (key: string) => void;
  onSpeak: (hanzi: string) => void;
}

function WordCard({
  entry,
  inDeck,
  isIgnored,
  isLoading,
  viewMode,
  onAdd,
  onIgnore,
  onSpeak,
}: WordCardProps) {
  const { key, word } = entry;

  const baseCard = [
    "rounded-xl border transition-all duration-150",
    inDeck
      ? "bg-green-50/60 border-green-200 dark:bg-green-950/20 dark:border-green-800/50"
      : isIgnored
      ? "bg-muted/30 border-border/40 opacity-55"
      : "bg-card border-border hover:border-primary/25 hover:shadow-sm",
  ].join(" ");

  // ── Action buttons (shared) ──────────────────────────────────────────────
  const actionButtons = (
    <div className={viewMode === "list" ? "flex flex-col items-center gap-1.5 shrink-0" : "flex items-center gap-1 justify-end"}>
      <button
        onClick={() => onSpeak(word.hanzi)}
        className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        title="Pronounce"
        aria-label={`Pronounce ${word.hanzi}`}
      >
        <Volume2 size={13} />
      </button>

      {inDeck ? (
        <span
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/30 text-xs font-semibold"
          title="In deck"
        >
          <CheckCircle2 size={14} />
          <span>Added</span>
        </span>
      ) : (
        <button
          onClick={() => onAdd(key, word.hanzi)}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white bg-primary hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-40 text-xs font-semibold shadow-sm"
          title="Add to deck"
          aria-label={`Add ${word.hanzi} to deck`}
        >
          <Plus size={15} strokeWidth={2.5} />
          <span>Add</span>
        </button>
      )}

      {!inDeck && (
        <button
          onClick={() => onIgnore(key)}
          className={[
            "p-1.5 rounded-lg transition-colors",
            isIgnored
              ? "text-red-500 bg-red-50 hover:bg-red-100 dark:bg-red-950/30"
              : "text-muted-foreground/50 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20",
          ].join(" ")}
          title={isIgnored ? "Un-ignore" : "Ignore"}
          aria-label={isIgnored ? `Un-ignore ${word.hanzi}` : `Ignore ${word.hanzi}`}
        >
          <XCircle size={13} />
        </button>
      )}
    </div>
  );

  // ── LIST layout ─────────────────────────────────────────────────────────
  if (viewMode === "list") {
    return (
      <div className={`${baseCard} flex items-start gap-3 px-3 py-3`}>
        {/* Chinese + Pinyin */}
        <div className="w-[4.5rem] shrink-0 pt-0.5">
          <p
            className="text-[1.35rem] font-semibold leading-tight text-foreground"
            style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
          >
            {word.hanzi}
          </p>
          <p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-tight">{word.pinyin}</p>
        </div>

        {/* POS + Definition */}
        <div className="flex-1 min-w-0 pt-0.5">
          <span className="inline-block text-[0.65rem] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground mb-1 leading-none">
            {word.pos}
          </span>
          <p className="text-sm text-foreground leading-snug">{word.definition}</p>
          {word.otherDefs && word.otherDefs.length > 0 && (
            <p className="text-[0.7rem] text-muted-foreground mt-0.5 line-clamp-1">
              {word.otherDefs.slice(0, 2).join(" · ")}
            </p>
          )}
        </div>

        {/* Actions */}
        {actionButtons}
      </div>
    );
  }

  // ── GRID layout ─────────────────────────────────────────────────────────
  return (
    <div className={`${baseCard} flex flex-col p-3 gap-2`}>
      {/* Top: Chinese + actions */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <p
            className="text-[1.6rem] font-semibold leading-tight text-foreground"
            style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
          >
            {word.hanzi}
          </p>
          <p className="text-[0.7rem] text-muted-foreground mt-0.5 leading-tight">{word.pinyin}</p>
        </div>
        {actionButtons}
      </div>

      {/* Bottom: POS + definition */}
      <div className="mt-auto pt-1 border-t border-border/40">
        <span className="inline-block text-[0.65rem] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground mb-1 leading-none">
          {word.pos}
        </span>
        <p className="text-xs text-foreground leading-snug line-clamp-2">{word.definition}</p>
        {word.otherDefs && word.otherDefs.length > 0 && (
          <p className="text-[0.65rem] text-muted-foreground mt-0.5 line-clamp-1">
            {word.otherDefs.slice(0, 1).join(" · ")}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── VocabPage ────────────────────────────────────────────────────────────────

type SectionMode = "theme" | "user";

export default function VocabPage() {
  const { words, addWordToDeck, isWordInDeck } = useApp();
  const { settings: audioSettings } = useAudioSettings();
  const tts = useTTS({ preferredVoiceURI: audioSettings.preferredVoiceURI });

  const [ignoredKeys, setIgnoredKeys] = useState<Set<string>>(new Set());
  const [loadingKeys, setLoadingKeys] = useState<Set<string>>(new Set());
  const [sectionMode, setSectionMode] = useState<SectionMode>("theme");
  const [activeThemeId, setActiveThemeId] = useState<string>(VOCAB_THEMES[0].id);
  const [activeSubcatId, setActiveSubcatId] = useState<string>("all");
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">(getDefaultViewMode);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const subcatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    VocabIgnoredDB.getAllIds().then(setIgnoredKeys);
  }, []);

  // Persist view mode
  useEffect(() => {
    try { localStorage.setItem(LS_VIEW_KEY, viewMode); } catch { /* ignore */ }
  }, [viewMode]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const activeTheme = VOCAB_THEMES.find((t: VocabTheme) => t.id === activeThemeId) ?? VOCAB_THEMES[0];
  const filteredEntries = themeWords(activeThemeId, activeTheme.subcategories, activeSubcatId);
  const addedCount = filteredEntries.filter((e) => isWordInDeck(e.word.hanzi)).length;
  const ignoredCount = filteredEntries.filter((e) => ignoredKeys.has(e.key)).length;

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleToggleIgnore = useCallback(async (key: string) => {
    const isIgnored = ignoredKeys.has(key);
    setIgnoredKeys((prev) => {
      const next = new Set(prev);
      if (isIgnored) next.delete(key);
      else next.add(key);
      return next;
    });
    if (isIgnored) await VocabIgnoredDB.unignore(key);
    else await VocabIgnoredDB.ignore(key);
  }, [ignoredKeys]);

  const handleAddToDeck = useCallback(async (key: string, hanzi: string) => {
    if (isWordInDeck(hanzi)) { toast.info(`${hanzi} is already in your deck`); return; }
    setLoadingKeys((prev) => new Set(prev).add(key));
    try {
      const result = await addWordToDeck(hanzi);
      if (result.success) {
        toast.success(`Added ${hanzi} to deck`);
        if (ignoredKeys.has(key)) {
          setIgnoredKeys((prev) => { const next = new Set(prev); next.delete(key); return next; });
          await VocabIgnoredDB.unignore(key);
        }
      } else if (result.alreadyExists) {
        toast.info(`${hanzi} is already in your deck`);
      } else if (result.capReached) {
        toast.warning("Daily new word cap reached");
      }
    } finally {
      setLoadingKeys((prev) => { const next = new Set(prev); next.delete(key); return next; });
    }
  }, [addWordToDeck, ignoredKeys, isWordInDeck]);

  const handleIncludeAll = useCallback(async () => {
    const toUnignore = filteredEntries.filter((e) => ignoredKeys.has(e.key));
    if (toUnignore.length === 0) { toast.info("All words already included"); return; }
    const newIgnored = new Set(ignoredKeys);
    for (const e of toUnignore) { newIgnored.delete(e.key); await VocabIgnoredDB.unignore(e.key); }
    setIgnoredKeys(newIgnored);
    toast.success(`Included ${toUnignore.length} words`);
  }, [filteredEntries, ignoredKeys]);

  const handleIgnoreAll = useCallback(async () => {
    const toIgnore = filteredEntries.filter((e) => !ignoredKeys.has(e.key) && !isWordInDeck(e.word.hanzi));
    if (toIgnore.length === 0) { toast.info("All words already ignored"); return; }
    const newIgnored = new Set(ignoredKeys);
    for (const e of toIgnore) { newIgnored.add(e.key); await VocabIgnoredDB.ignore(e.key); }
    setIgnoredKeys(newIgnored);
    toast.success(`Ignored ${toIgnore.length} words`);
  }, [filteredEntries, ignoredKeys, isWordInDeck]);

  const handleSpeak = useCallback((hanzi: string) => { tts.speakWord(hanzi); }, [tts]);

  const handleThemeSelect = useCallback((themeId: string) => {
    setActiveThemeId(themeId);
    setActiveSubcatId("all");
    setThemeDropdownOpen(false);
    if (subcatScrollRef.current) subcatScrollRef.current.scrollLeft = 0;
  }, []);

  const userWords = words.filter((w) => w.addedManually);

  // Grid class: 1 col mobile, 2 col md, 3 col lg, 4 col xl
  const gridClass = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2";
  const listClass = "flex flex-col gap-1.5";

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full min-h-0">

      {/* ── Sticky top bar ─────────────────────────────────────────────────── */}
      <div className="shrink-0 pb-3 space-y-2">

        {/* Row 1: Title + section tabs */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-lg font-bold text-foreground leading-none">Vocabulary</h1>
          <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden text-xs">
            <button
              onClick={() => setSectionMode("theme")}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors",
                sectionMode === "theme"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              ].join(" ")}
            >
              <BookOpen size={12} />
              <span>Themes</span>
            </button>
            <button
              onClick={() => setSectionMode("user")}
              className={[
                "flex items-center gap-1.5 px-3 py-1.5 font-medium transition-colors",
                sectionMode === "user"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              ].join(" ")}
            >
              <Plus size={12} />
              <span>My Words</span>
              {userWords.length > 0 && (
                <span className="ml-0.5 bg-primary/20 text-primary rounded-full px-1.5 py-0 text-[10px] leading-4">
                  {userWords.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {sectionMode === "theme" && (
          <>
            {/* Row 2: Theme selector dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setThemeDropdownOpen((v) => !v)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-border bg-card hover:border-primary/40 transition-colors text-sm"
              >
                <span className="flex items-center gap-2 font-medium text-foreground">
                  <span className="text-base leading-none">{activeTheme.emoji}</span>
                  <span>{activeTheme.label}</span>
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground">
                    {addedCount}/{activeTheme.subcategories.flatMap((s) => s.words).length}
                  </span>
                  <ChevronDown
                    size={14}
                    className={[
                      "text-muted-foreground transition-transform duration-200",
                      themeDropdownOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </div>
              </button>

              {themeDropdownOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-popover border border-border rounded-xl shadow-lg overflow-hidden">
                  <div className="max-h-72 overflow-y-auto py-1">
                    {VOCAB_THEMES.map((theme: VocabTheme) => {
                      const allWords = theme.subcategories.flatMap((s) => s.words);
                      const added = allWords.filter((w: VocabWord) => isWordInDeck(w.hanzi)).length;
                      const isActive = theme.id === activeThemeId;
                      return (
                        <button
                          key={theme.id}
                          onClick={() => handleThemeSelect(theme.id)}
                          className={[
                            "w-full flex items-center justify-between px-3 py-2 text-sm transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-foreground hover:bg-muted",
                          ].join(" ")}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-base leading-none">{theme.emoji}</span>
                            <span>{theme.label}</span>
                          </span>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {added}/{allWords.length}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Row 3: Subcategory chips + view toggle + bulk actions */}
            <div className="flex items-center gap-2">
              {/* Scrollable chips */}
              <div
                ref={subcatScrollRef}
                className="flex items-center gap-1.5 overflow-x-auto flex-1 min-w-0 pb-0.5"
                style={{ scrollbarWidth: "none" }}
              >
                <button
                  onClick={() => setActiveSubcatId("all")}
                  className={[
                    "shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                    activeSubcatId === "all"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  ].join(" ")}
                >
                  All ({activeTheme.subcategories.flatMap((s) => s.words).length})
                </button>
                {activeTheme.subcategories.map((sub: VocabSubcategory) => (
                  <button
                    key={sub.id}
                    onClick={() => setActiveSubcatId(sub.id)}
                    className={[
                      "shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap",
                      activeSubcatId === sub.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    ].join(" ")}
                  >
                    {sub.label} ({sub.words.length})
                  </button>
                ))}
              </div>

              {/* View toggle */}
              <div className="flex items-center gap-0 border border-border rounded-lg overflow-hidden shrink-0">
                <button
                  onClick={() => setViewMode("list")}
                  className={[
                    "p-1.5 transition-colors",
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  ].join(" ")}
                  title="List view"
                  aria-label="Switch to list view"
                >
                  <LayoutList size={14} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={[
                    "p-1.5 transition-colors",
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  ].join(" ")}
                  title="Grid view"
                  aria-label="Switch to grid view"
                >
                  <LayoutGrid size={14} />
                </button>
              </div>

              {/* Bulk actions */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={handleIncludeAll}
                  className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                  title="Include all"
                  aria-label="Include all words"
                >
                  <CheckCircle2 size={15} />
                </button>
                <button
                  onClick={handleIgnoreAll}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                  title="Ignore all"
                  aria-label="Ignore all words"
                >
                  <XCircle size={15} />
                </button>
              </div>
            </div>

            {/* Row 4: Stats */}
            <p className="text-[0.7rem] text-muted-foreground leading-none">
              {filteredEntries.length} words · {addedCount} in deck · {ignoredCount} ignored
            </p>
          </>
        )}
      </div>

      {/* ── Content area ───────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto min-h-0 -mx-1 px-1">

        {sectionMode === "theme" ? (
          <div
            className={[
              viewMode === "grid" ? gridClass : listClass,
              "pb-4 transition-all duration-200",
            ].join(" ")}
          >
            {filteredEntries.map((entry) => (
              <WordCard
                key={entry.key}
                entry={entry}
                inDeck={isWordInDeck(entry.word.hanzi)}
                isIgnored={ignoredKeys.has(entry.key)}
                isLoading={loadingKeys.has(entry.key)}
                viewMode={viewMode}
                onAdd={handleAddToDeck}
                onIgnore={handleToggleIgnore}
                onSpeak={handleSpeak}
              />
            ))}
          </div>
        ) : (
          /* My Words — always uses the current view mode */
          <div className="space-y-3 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-foreground">My Added Words</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Words you've manually added to your deck</p>
            </div>
            {userWords.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
                <Plus size={28} className="opacity-25" />
                <p className="text-sm">No manually added words yet.</p>
                <p className="text-xs opacity-70">Use the Add Word button in your Deck to add custom words.</p>
              </div>
            ) : (
              <div
                className={[
                  viewMode === "grid" ? gridClass : listClass,
                  "transition-all duration-200",
                ].join(" ")}
              >
                {userWords.map((word) => {
                  if (viewMode === "list") {
                    return (
                      <div
                        key={word.id}
                        className="flex items-start gap-3 px-3 py-3 rounded-xl border border-border bg-card"
                      >
                        <div className="w-[4.5rem] shrink-0 pt-0.5">
                          <p
                            className="text-[1.35rem] font-semibold leading-tight text-foreground"
                            style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                          >
                            {word.hanzi}
                          </p>
                          <p className="text-[0.7rem] text-muted-foreground mt-0.5">{word.pinyin}</p>
                        </div>
                        <div className="flex-1 min-w-0 pt-0.5">
                          <ul className="space-y-0.5">
                            {formatFlashcardDefinitions(word.simpleDefinition).map((item, i) => (
                              <li key={i} className="text-sm leading-snug">
                                <span className={i === 0 ? "text-foreground" : "text-foreground/80"}>{item.text}</span>
                                {" "}
                                <span className={`text-xs ${LABEL_STYLES[item.label]}`}>({item.label})</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 shrink-0 pt-0.5">
                          <button
                            onClick={() => handleSpeak(word.hanzi)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Volume2 size={13} />
                          </button>
                          <span className="p-1.5 rounded-lg text-green-600 bg-green-100 dark:bg-green-900/30">
                            <CheckCircle2 size={13} />
                          </span>
                        </div>
                      </div>
                    );
                  }
                  // Grid variant for user words
                  return (
                    <div
                      key={word.id}
                      className="flex flex-col p-3 gap-2 rounded-xl border border-border bg-card"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p
                            className="text-[1.6rem] font-semibold leading-tight text-foreground"
                            style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                          >
                            {word.hanzi}
                          </p>
                          <p className="text-[0.7rem] text-muted-foreground mt-0.5">{word.pinyin}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSpeak(word.hanzi)}
                            className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Volume2 size={13} />
                          </button>
                          <span className="p-1.5 rounded-lg text-green-600 bg-green-100 dark:bg-green-900/30">
                            <CheckCircle2 size={13} />
                          </span>
                        </div>
                      </div>
                      <div className="mt-auto pt-1 border-t border-border/40">
                        <ul className="space-y-0.5">
                          {formatFlashcardDefinitions(word.simpleDefinition).slice(0, 2).map((item, i) => (
                            <li key={i} className="text-xs leading-snug">
                              <span className={i === 0 ? "text-foreground" : "text-foreground/80"}>{item.text}</span>
                              {" "}
                              <span className={`text-xs ${LABEL_STYLES[item.label]}`}>({item.label})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
