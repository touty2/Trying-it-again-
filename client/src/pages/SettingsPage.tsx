/**
 * Settings Tab — Collapsible Accordion
 * Design: Structured Scholar
 *
 * Section order:
 *  1. Appearance (Fonts, Font size, Line spacing, UI color, Theme)
 *  2. Flashcard Settings (Testing mode, Daily limits, Notifications)
 *  3. Story Reading Settings (Sentence mode, Highlight, Playback speed)
 *  4. Audio & Pronunciation (Voice, Speed, Flashcard audio)
 *  5. Data Management (Export, Import, Reset, About)
 *  6. Cloud Sync (always last)
 */

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings, Bell, Database, Trash2, Download, Upload, Info, Type, Palette,
  Moon, Sun, Volume2, Cloud, CloudOff, Loader2, LogIn, LogOut, RefreshCw,
  ChevronDown, BookOpen, Layers, Play, Star,
} from "lucide-react";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { useZhVoices, getVoiceTier, getAllZhVoices, getBestZhVoice } from "@/hooks/useTTS";
import { useTypography } from "@/contexts/TypographyContext";
import { FONT_OPTIONS } from "@/hooks/useTypographySettings";
import type { ReadingFontFamily } from "@/hooks/useTypographySettings";
import { useThemeCtx } from "@/contexts/ThemeContext";
import { ACCENT_OPTIONS, READING_BG_OPTIONS } from "@/hooks/useThemeSettings";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { useSync } from "@/contexts/SyncContext";
import { useAuth } from "@/_core/hooks/useAuth";
import { SettingsDB, WordDB, FlashcardDB, ReviewLogDB, CompletedTextDB, WordMistakeDB } from "@/lib/db";

// ─── Collapsible Section ──────────────────────────────────────────────────────

interface CollapsibleSectionProps {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: (id: string) => void;
  children: React.ReactNode;
}

function CollapsibleSection({ id, icon, title, subtitle, isOpen, onToggle, children }: CollapsibleSectionProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm mb-3 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="text-primary">{icon}</span>
          <div>
            <p className="font-semibold text-foreground text-sm">{title}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
        </div>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-muted-foreground shrink-0"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-5 pb-5 pt-1 border-t border-border/40 space-y-6">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Review Cap Slider ────────────────────────────────────────────────────────

/**
 * Slider-based daily review cap selector.
 * Range: 10–500 cards/day, plus an "Unlimited" toggle.
 * The slider snaps to steps of 10 up to 100, then 50 up to 500.
 */
const SLIDER_MIN = 10;
const SLIDER_MAX = 500;

/** Map a slider position (0–100) to a card count */
function sliderPosToCount(pos: number): number {
  // 0–50 maps to 10–100 (step 2 per unit → step ~1.8)
  // 50–100 maps to 100–500 (step 8 per unit → step ~8)
  if (pos <= 50) return Math.round(SLIDER_MIN + (pos / 50) * (100 - SLIDER_MIN));
  return Math.round(100 + ((pos - 50) / 50) * (SLIDER_MAX - 100));
}

/** Map a card count to a slider position (0–100) */
function countToSliderPos(count: number): number {
  if (count <= 100) return ((count - SLIDER_MIN) / (100 - SLIDER_MIN)) * 50;
  return 50 + ((count - 100) / (SLIDER_MAX - 100)) * 50;
}

interface ReviewCapSliderProps {
  value: number | null;  // null = unlimited
  onChange: (v: number | null) => void;
  label: string;
  description?: string;
}

function ReviewCapSlider({ value, onChange, label, description }: ReviewCapSliderProps) {
  const isUnlimited = value === null;
  // Slider position (0–100); default to 50 cards when enabling
  const sliderPos = isUnlimited ? countToSliderPos(50) : countToSliderPos(Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, value)));

  const handleSliderChange = (vals: number[]) => {
    const count = sliderPosToCount(vals[0]);
    onChange(count);
  };

  const handleUnlimitedToggle = () => {
    if (isUnlimited) {
      // Enable cap — default to 50
      onChange(50);
    } else {
      onChange(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className="text-sm font-semibold text-primary">
          {isUnlimited ? "Unlimited" : `${value} / day`}
        </span>
      </div>
      {description && (
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
      )}
      <div className="space-y-3">
        <Slider
          min={0}
          max={100}
          step={1}
          value={[sliderPos]}
          onValueChange={handleSliderChange}
          disabled={isUnlimited}
          className={isUnlimited ? "opacity-40" : ""}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground">
          <span>{SLIDER_MIN}</span>
          <span>100</span>
          <span>200</span>
          <span>350</span>
          <span>{SLIDER_MAX}+</span>
        </div>
        <button
          onClick={handleUnlimitedToggle}
          className={`flex items-center gap-2 text-sm px-3 py-1.5 rounded-md border transition-colors ${
            isUnlimited
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
          }`}
        >
          <span className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${
            isUnlimited ? "border-primary-foreground" : "border-muted-foreground"
          }`}>
            {isUnlimited && <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />}
          </span>
          Unlimited
        </button>
      </div>
    </div>
  );
}

// ─── Cap Selector (legacy — kept for new-words-per-day preset buttons) ────────

const NEW_WORD_PRESETS = [10, 20, 30] as const;

interface CapSelectorProps {
  value: number | null;
  onChange: (v: number | null) => void;
  label: string;
}

function CapSelector({ value, onChange, label }: CapSelectorProps) {
  const [customMode, setCustomMode] = useState(
    value !== null && !NEW_WORD_PRESETS.includes(value as typeof NEW_WORD_PRESETS[number])
  );
  const [customVal, setCustomVal] = useState(String(value ?? ""));

  const handlePreset = (v: number | null) => {
    setCustomMode(false);
    onChange(v);
  };

  const handleCustom = () => {
    setCustomMode(true);
  };

  const handleCustomChange = (v: string) => {
    setCustomVal(v);
    const n = parseInt(v, 10);
    if (!isNaN(n) && n > 0) onChange(n);
  };

  return (
    <div>
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {NEW_WORD_PRESETS.map((preset) => (
          <button
            key={preset}
            onClick={() => handlePreset(preset)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              !customMode && value === preset
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
            }`}
          >
            {preset}
          </button>
        ))}
        <button
          onClick={() => handlePreset(null)}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            !customMode && value === null
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
          }`}
        >
          Unlimited
        </button>
        <button
          onClick={handleCustom}
          className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
            customMode
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
          }`}
        >
          Custom
        </button>
      </div>
      {customMode && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3"
        >
          <Input
            type="number"
            min={1}
            value={customVal}
            onChange={(e) => handleCustomChange(e.target.value)}
            placeholder="Enter a number"
            className="w-32"
          />
        </motion.div>
      )}
    </div>
  );
}

// ─── Slider Row ───────────────────────────────────────────────────────────────

function SliderRow({
  label,
  value,
  min,
  max,
  step,
  display,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  display: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded">
          {display}
        </span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        className="w-full"
      />
    </div>
  );
}

//// ─── Cloud Sync Section ───────────────────────────────────────────────────────────

function CloudSyncSection() {
  const { user, isAuthenticated, logout } = useAuth();
  const { syncState, triggerSync, isSyncing } = useSync();
  const [forceSyncing, setForceSyncing] = useState(false);

  const formatLastSync = (ts: number | null): string => {
    if (!ts) return "Never synced";
    const diff = Date.now() - ts;
    if (diff < 60_000) return "Just now";
    if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} minute${Math.floor(diff / 60_000) === 1 ? "" : "s"} ago`;
    if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)} hour${Math.floor(diff / 3_600_000) === 1 ? "" : "s"} ago`;
    return `${Math.floor(diff / 86_400_000)} day${Math.floor(diff / 86_400_000) === 1 ? "" : "s"} ago`;
  };

  const handleManualSync = async () => {
    try {
      await triggerSync();
      toast.success("Sync complete — your progress is backed up.");
    } catch {
      toast.error("Sync failed. Check your connection and try again.");
    }
  };

  /**
   * Force Full Sync: clears the hasSynced guard so the next triggerSync
   * re-pulls everything from the cloud and re-pushes all local data.
   * This resolves divergence between devices.
   */
  const handleForceSync = async () => {
    setForceSyncing(true);
    try {
      // Clear the local last-sync marker so the sync manager treats this as a fresh login
      localStorage.removeItem("cr-last-sync");
      await triggerSync();
      toast.success("Force sync complete — all devices are now in sync.");
    } catch {
      toast.error("Force sync failed. Check your connection and try again.");
    } finally {
      setForceSyncing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg bg-muted/40 border border-border/60 p-4">
          <p className="text-sm text-foreground font-medium mb-1">Back up your progress</p>
          <p className="text-xs text-muted-foreground mb-3">
            Sign in to automatically sync your flashcards, completed texts, and settings across devices.
            Your data is always stored locally — the cloud is an optional backup.
          </p>
          <Button size="sm" className="gap-1.5" onClick={() => { window.location.href = '/login'; }}>
            <LogIn size={14} />
            Sign in to sync
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Account info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
            <span className="text-sm font-bold text-primary">
              {(user as { name?: string })?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {(user as { name?: string })?.name ?? "Signed in"}
            </p>
            <p className="text-xs text-muted-foreground">
              {(user as { email?: string })?.email ?? ""}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => logout()}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <LogOut size={14} />
          Sign out
        </Button>
      </div>

      {/* Sync status */}
      <div className="rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {isSyncing ? (
              <Loader2 size={14} className="animate-spin text-primary" />
            ) : syncState.status === "error" ? (
              <CloudOff size={14} className="text-destructive" />
            ) : syncState.status === "success" ? (
              <Cloud size={14} className="text-primary" />
            ) : (
              <Cloud size={14} className="text-muted-foreground" />
            )}
            <span className="text-sm font-medium text-foreground">
              {isSyncing
                ? "Syncing…"
                : syncState.status === "error"
                ? "Sync error"
                : syncState.status === "success"
                ? "Synced"
                : "Cloud sync"}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleManualSync}
            disabled={isSyncing}
            className="gap-1.5"
          >
            <RefreshCw size={13} className={isSyncing ? "animate-spin" : ""} />
            {isSyncing ? "Syncing…" : "Sync now"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {syncState.status === "error"
            ? `Error: ${syncState.error ?? "Unknown error"}`
            : `Last synced: ${formatLastSync(syncState.lastSyncTime)}`}
        </p>
        <p className="text-[10px] text-muted-foreground mt-2">
          Syncs flashcards, completed texts, word mistakes, grammar progress, and preferences.
          Sync runs automatically when you sign in and every 3 minutes.
        </p>
      </div>

      {/* Force Full Sync */}
      <div className="rounded-lg border border-amber-200/60 bg-amber-50/40 dark:border-amber-800/40 dark:bg-amber-950/20 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground mb-0.5">Devices out of sync?</p>
            <p className="text-xs text-muted-foreground">
              If your phone and desktop show different flashcard counts after syncing, use this to
              force a complete re-sync — pulling all cloud data and pushing all local data.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleForceSync}
            disabled={isSyncing || forceSyncing}
            className="gap-1.5 shrink-0 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30"
          >
            <RefreshCw size={13} className={(isSyncing || forceSyncing) ? "animate-spin" : ""} />
            {(isSyncing || forceSyncing) ? "Syncing…" : "Force full sync"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Settings Page ────────────────────────────────────────────────────────────

const SECTION_IDS = [
  "appearance",
  "flashcard",
  "story",
  "audio",
  "data",
  "sync",
] as const;

type SectionId = typeof SECTION_IDS[number];

function getInitialOpenSection(): SectionId | null {
  try {
    const saved = localStorage.getItem("cr-settings-open-section");
    if (saved && SECTION_IDS.includes(saved as SectionId)) return saved as SectionId;
  } catch { /* ignore */ }
  return "appearance";
}

export default function SettingsPage() {
  const { settings, updateSettings, words, flashcards, refreshAll } = useApp();
  const { settings: typo, update: updateTypo, reset: resetTypo } = useTypography();
  const { settings: theme, update: updateTheme, reset: resetTheme } = useThemeCtx();
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [importing, setImporting] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

  // Accordion state — only one section open at a time
  const [openSection, setOpenSection] = useState<SectionId | null>(getInitialOpenSection);

  const handleToggle = (id: string) => {
    const newOpen = openSection === id ? null : (id as SectionId);
    setOpenSection(newOpen);
    try {
      if (newOpen) localStorage.setItem("cr-settings-open-section", newOpen);
      else localStorage.removeItem("cr-settings-open-section");
    } catch { /* ignore */ }
  };

  const handleNewWordCapChange = async (v: number | null) => {
    await updateSettings({ ...settings, dailyNewWordCap: v });
    toast.success("Settings saved");
  };

  const handleReviewCapChange = async (v: number | null) => {
    await updateSettings({ ...settings, dailyReviewCap: v });
    toast.success("Settings saved");
  };

  const handlePopupToggle = async (checked: boolean) => {
    await updateSettings({ ...settings, showCapReachedPopup: checked });
    toast.success("Settings saved");
  };

  const handleExport = async () => {
    const [allWords, allCards, logs, completedTexts, wordMistakes] = await Promise.all([
      WordDB.getAll(),
      FlashcardDB.getAll(),
      ReviewLogDB.getAll(),
      CompletedTextDB.getAll(),
      WordMistakeDB.getAll(),
    ]);
    const data = {
      exportedAt: new Date().toISOString(),
      version: 2,
      words: allWords,
      flashcards: allCards,
      reviewLogs: logs,
      completedTexts,
      wordMistakes,
      settings,
      preferences: {
        typography: localStorage.getItem("cr-typography-v2"),
        theme: localStorage.getItem("cr-theme-v1"),
        audio: localStorage.getItem("cr-audio-v1"),
      },
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chinese-reader-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImporting(true);
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (!data.words || !data.flashcards) {
        throw new Error("Invalid backup file — missing required fields.");
      }
      let wordCount = 0;
      if (Array.isArray(data.words)) {
        for (const w of data.words) {
          if (w.id && w.hanzi) { await WordDB.put(w); wordCount++; }
        }
      }
      let cardCount = 0;
      if (Array.isArray(data.flashcards)) {
        for (const c of data.flashcards) {
          if (c.wordId) { await FlashcardDB.put(c); cardCount++; }
        }
      }
      if (Array.isArray(data.completedTexts)) {
        for (const ct of data.completedTexts) {
          if (ct.textId) await CompletedTextDB.markCompleted(ct.textId);
        }
      }
      if (data.settings) {
        await SettingsDB.put({ id: "settings", ...data.settings });
      }
      if (data.preferences) {
        if (data.preferences.typography) localStorage.setItem("cr-typography-v2", data.preferences.typography);
        if (data.preferences.theme) localStorage.setItem("cr-theme-v1", data.preferences.theme);
        if (data.preferences.audio) localStorage.setItem("cr-audio-v1", data.preferences.audio);
      }
      await refreshAll();
      toast.success(`Import complete — ${wordCount} words and ${cardCount} flashcards restored.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to import backup file.");
    } finally {
      setImporting(false);
      if (importInputRef.current) importInputRef.current.value = "";
    }
  };

  const handleReset = async () => {
    const allWords = await WordDB.getAll();
    const allCards = await FlashcardDB.getAll();
    for (const w of allWords) await WordDB.delete(w.id);
    for (const c of allCards) await FlashcardDB.delete(c.wordId);
    await SettingsDB.reset();
    await refreshAll();
    toast.success("All progress reset");
    setShowResetDialog(false);
  };

  const selectedFont = FONT_OPTIONS.find((f) => f.value === typo.fontFamily) ?? FONT_OPTIONS[0];
  const { settings: audio, update: updateAudio } = useAudioSettings();
  const { voices: zhVoices, loading: voicesLoading } = useZhVoices();
  const [showAllVoices, setShowAllVoices] = useState(false);
  const [previewingVoiceURI, setPreviewingVoiceURI] = useState<string | null>(null);

  const handleVoicePreview = (voiceURI: string | null) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const voice = voiceURI ? voices.find((v) => v.voiceURI === voiceURI) ?? null : getBestZhVoice(null, null);
    const utt = new SpeechSynthesisUtterance("你好，这是语音预览。");
    utt.lang = "zh-CN";
    utt.rate = 0.9;
    utt.pitch = 1.0;
    utt.volume = 1.0;
    if (voice) utt.voice = voice;
    setPreviewingVoiceURI(voiceURI ?? "__auto__");
    utt.onend = () => setPreviewingVoiceURI(null);
    utt.onerror = () => setPreviewingVoiceURI(null);
    window.speechSynthesis.speak(utt);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Settings</h2>
        <p className="text-sm text-muted-foreground">Customize your learning experience.</p>
      </div>

      {/* ── 1. Appearance ── */}
      <CollapsibleSection
        id="appearance"
        icon={<Palette size={16} />}
        title="Appearance"
        subtitle="Fonts, colors, and reading theme"
        isOpen={openSection === "appearance"}
        onToggle={handleToggle}
      >
        {/* Font Family */}
        <div>
          <p className="text-sm font-medium text-foreground mb-2">Reading font</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {FONT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateTypo({ fontFamily: opt.value as ReadingFontFamily })}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm border transition-all text-left ${
                  typo.fontFamily === opt.value
                    ? "bg-primary text-primary-foreground border-primary shadow-sm"
                    : "border-border text-foreground hover:border-primary/50 hover:bg-muted/40"
                }`}
              >
                <span className="text-xl leading-none shrink-0" style={{ fontFamily: opt.css }}>
                  {opt.preview}
                </span>
                <span className={`font-medium text-xs ${typo.fontFamily === opt.value ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <SliderRow
          label="Font size"
          value={typo.fontSize}
          min={80}
          max={160}
          step={5}
          display={`${(typo.fontSize / 100).toFixed(2)}rem`}
          onChange={(v) => updateTypo({ fontSize: v })}
        />

        {/* Line Height Slider */}
        <SliderRow
          label="Line spacing"
          value={typo.lineHeight}
          min={15}
          max={40}
          step={1}
          display={(typo.lineHeight / 10).toFixed(1)}
          onChange={(v) => updateTypo({ lineHeight: v })}
        />

        {/* Paragraph Spacing Slider */}
        <SliderRow
          label="Paragraph spacing"
          value={typo.paraSpacing}
          min={5}
          max={30}
          step={1}
          display={`${(typo.paraSpacing / 10).toFixed(1)}rem`}
          onChange={(v) => updateTypo({ paraSpacing: v })}
        />

        {/* Live Preview */}
        <div className="rounded-lg border border-border/50 bg-muted/20 p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-3">
            Live preview — <span className="normal-case">{selectedFont.label}</span>
          </p>
          <p style={{ fontFamily: "var(--reading-font-family)", fontSize: "var(--reading-font-size)", lineHeight: "var(--reading-line-height)", marginBottom: "var(--reading-para-spacing)" }}>
            他每天早上都会去公园散步，呼吸新鲜空气，感受大自然的美好。
          </p>
          <p style={{ fontFamily: "var(--reading-font-family)", fontSize: "var(--reading-font-size)", lineHeight: "var(--reading-line-height)" }}>
            虽然天气有点冷，但他还是坚持出门，因为他觉得运动对身体很重要。
          </p>
        </div>

        <button onClick={resetTypo} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
          Reset typography to defaults
        </button>

        {/* Dark / Light Mode */}
        <div className="pt-4 border-t border-border/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme.darkMode ? <Moon size={15} className="text-muted-foreground" /> : <Sun size={15} className="text-muted-foreground" />}
              <div>
                <p className="text-sm font-medium text-foreground">Dark mode</p>
                <p className="text-xs text-muted-foreground">Switch to a dark reading theme</p>
              </div>
            </div>
            <Switch
              checked={theme.darkMode}
              onCheckedChange={(checked) => updateTheme({ darkMode: checked })}
            />
          </div>
        </div>

        {/* Accent Color */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Accent color</p>
          <div className="flex flex-wrap gap-2.5">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateTheme({ accentColor: opt.value })}
                title={opt.label}
                className={`relative w-9 h-9 rounded-full border-2 transition-all ${
                  theme.accentColor === opt.value
                    ? "border-foreground scale-110 shadow-md"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: opt.color }}
              >
                {theme.accentColor === opt.value && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Current: <span className="font-medium text-foreground capitalize">{theme.accentColor}</span>
          </p>
        </div>

        {/* Reading Background */}
        <div>
          <p className="text-sm font-medium text-foreground mb-3">Reading background</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {READING_BG_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  const isDark = opt.value === "dark";
                  updateTheme({ readingBg: opt.value, darkMode: isDark });
                }}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  theme.readingBg === opt.value
                    ? "border-primary shadow-sm"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <div className="w-8 h-8 rounded-full border border-border/50 shadow-inner" style={{ backgroundColor: opt.swatch }} />
                <div className="text-center">
                  <p className="text-xs font-medium text-foreground leading-tight">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{opt.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button onClick={resetTheme} className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2">
          Reset theme to defaults
        </button>
      </CollapsibleSection>

      {/* ── 2. Flashcard Settings ── */}
      <CollapsibleSection
        id="flashcard"
        icon={<Layers size={16} />}
        title="Flashcard Settings"
        subtitle="Testing mode, daily limits, and study preferences"
        isOpen={openSection === "flashcard"}
        onToggle={handleToggle}
      >
        {/* Testing Mode */}
        <div>
          <p className="text-sm font-medium text-foreground mb-1">Testing mode</p>
          <p className="text-xs text-muted-foreground mb-3">
            Choose how flashcards are presented. Change this in the Deck tab header as well.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { value: "forward", label: "ZH → EN", desc: "Chinese first" },
              { value: "reverse", label: "EN → ZH", desc: "English first" },
              { value: "random",  label: "Mixed",   desc: "Balanced random" },
            ] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateSettings({ ...settings, testingMode: opt.value })}
                className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg border-2 text-center transition-all ${
                  settings.testingMode === opt.value
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-bold text-foreground">{opt.label}</span>
                <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Limits */}
        <div className="pt-4 border-t border-border/40">
          <CapSelector
            value={settings.dailyNewWordCap}
            onChange={handleNewWordCapChange}
            label="New words per day"
          />
        </div>
        <div className="pt-4 border-t border-border/40">
          <ReviewCapSlider
            value={settings.dailyReviewCap}
            onChange={handleReviewCapChange}
            label="Reviews per day"
            description="Limit how many cards you review each day. Oldest-due cards are always prioritised. Set to Unlimited to review all due cards."
          />
        </div>

        {/* Card Size */}
        <div className="pt-4 border-t border-border/40">
          <p className="text-sm font-medium text-foreground mb-1">Flashcard size</p>
          <p className="text-xs text-muted-foreground mb-3">
            Adjust how tall the flashcard appears. Smaller cards leave more room for the review buttons.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {([{value: 1, label: "Small", desc: "Compact"}, {value: 2, label: "Medium", desc: "Default"}, {value: 3, label: "Large", desc: "Spacious"}] as const).map((opt) => (
              <button
                key={opt.value}
                onClick={() => updateSettings({ ...settings, cardSize: opt.value })}
                className={`flex flex-col items-center gap-1 px-3 py-3 rounded-lg border-2 text-center transition-all ${
                  (settings.cardSize ?? 2) === opt.value
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border hover:border-primary/40"
                }`}
              >
                <span className="text-sm font-bold text-foreground">{opt.label}</span>
                <span className="text-[10px] text-muted-foreground">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="pt-4 border-t border-border/40 flex items-center justify-between">
          <div>
            <Label htmlFor="cap-popup" className="text-sm font-medium">
              Show popup when daily cap is reached
            </Label>
            <p className="text-xs text-muted-foreground mt-0.5">
              A toast notification will appear when you hit your new word limit.
            </p>
          </div>
          <Switch
            id="cap-popup"
            checked={settings.showCapReachedPopup}
            onCheckedChange={handlePopupToggle}
          />
        </div>
      </CollapsibleSection>

      {/* ── 3. Story Reading Settings ── */}
      <CollapsibleSection
        id="story"
        icon={<BookOpen size={16} />}
        title="Story Reading"
        subtitle="Sentence mode, highlight behavior, and playback"
        isOpen={openSection === "story"}
        onToggle={handleToggle}
      >
        <div className="rounded-lg bg-muted/30 border border-border/50 p-4">
          <p className="text-sm font-medium text-foreground mb-1">Sentence-by-sentence playback</p>
          <p className="text-xs text-muted-foreground">
            In story pages, use the sentence mode button (S) in the TTS player to toggle between full-text and sentence-by-sentence playback. The current sentence is highlighted automatically during playback.
          </p>
        </div>
        <div className="rounded-lg bg-muted/30 border border-border/50 p-4">
          <p className="text-sm font-medium text-foreground mb-1">Highlight behavior</p>
          <p className="text-xs text-muted-foreground">
            Sentences are highlighted in real time as they are spoken. Highlighting uses DOM class-toggling for smooth, flicker-free updates. Dialogue (e.g. 张明说："…") is treated as a single sentence.
          </p>
        </div>
        <div className="rounded-lg bg-muted/30 border border-border/50 p-4">
          <p className="text-sm font-medium text-foreground mb-1">Playback speed</p>
          <p className="text-xs text-muted-foreground">
            Adjust playback speed in the Audio &amp; Pronunciation section below, or directly in the TTS player on any story page.
          </p>
        </div>
      </CollapsibleSection>

      {/* ── 4. Audio & Pronunciation ── */}
      <CollapsibleSection
        id="audio"
        icon={<Volume2 size={16} />}
        title="Audio & Pronunciation"
        subtitle="Voice selection, playback speed, and flashcard audio"
        isOpen={openSection === "audio"}
        onToggle={handleToggle}
      >
        {/* Playback speed */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Playback speed</p>
            <span className="text-sm font-semibold text-primary">{audio.playbackSpeed === 1.0 ? "1× Normal" : `${audio.playbackSpeed}×`}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {[0.75, 0.9, 1.0, 1.1, 1.25, 1.5, 2.0].map((s) => (
              <button
                key={s}
                onClick={() => updateAudio({ playbackSpeed: s })}
                className={[
                  "px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all",
                  audio.playbackSpeed === s
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                ].join(" ")}
              >
                {s === 1.0 ? "1×" : `${s}×`}
              </button>
            ))}
          </div>
        </div>

        {/* Story voice gender */}
        <div className="pt-4 border-t border-border/40">
          <p className="text-sm font-medium text-foreground mb-2">Story reading voice gender</p>
          <p className="text-xs text-muted-foreground mb-3">Selects a male or female voice for story TTS playback. Applies when no specific voice is pinned below.</p>
          <div className="flex gap-2">
            {(["female", "male"] as const).map((g) => (
              <button
                key={g}
                onClick={() => updateAudio({ storyVoiceGender: g })}
                className={[
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all",
                  audio.storyVoiceGender === g
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                ].join(" ")}
              >
                {g === "female" ? "\u2640 Female" : "\u2642 Male"}
              </button>
            ))}
          </div>
        </div>

        {/* Slow flashcard toggle */}
        <div className="flex items-center justify-between pt-4 border-t border-border/40">
          <div>
            <p className="text-sm font-medium text-foreground">Slow pronunciation on flashcards</p>
            <p className="text-xs text-muted-foreground">Default to 0.65× speed for flashcard audio</p>
          </div>
          <Switch
            checked={audio.slowFlashcard}
            onCheckedChange={(checked) => updateAudio({ slowFlashcard: checked })}
          />
        </div>

        {/* Voice selector — rich card picker with quality tiers and preview */}
        <div className="pt-4 border-t border-border/40">
          {(() => {
            const allVoices = getAllZhVoices();
            const displayVoices = showAllVoices ? allVoices : zhVoices;

            // Detect stale saved URI
            const savedURIIsStale =
              !!audio.preferredVoiceURI &&
              !voicesLoading &&
              allVoices.length > 0 &&
              !allVoices.find((v) => v.voiceURI === audio.preferredVoiceURI);
            if (savedURIIsStale) updateAudio({ preferredVoiceURI: null });

            const tierColors: Record<1 | 2 | 3 | 4, string> = {
              1: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300",
              2: "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
              3: "bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300",
              4: "bg-muted text-muted-foreground",
            };

            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">Mandarin voice</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Select the voice used for all Chinese text-to-speech</p>
                  </div>
                  {voicesLoading && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Loader2 size={11} className="animate-spin" />Loading…
                    </span>
                  )}
                </div>

                {savedURIIsStale && (
                  <div className="mb-3 rounded-md bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 px-3 py-2">
                    <p className="text-xs text-amber-700 dark:text-amber-400">Your saved voice is no longer available. Falling back to the best available voice.</p>
                    <button onClick={() => updateAudio({ preferredVoiceURI: null })} className="mt-1 text-xs text-amber-700 dark:text-amber-400 underline underline-offset-2 hover:no-underline">Clear preference</button>
                  </div>
                )}

                {voicesLoading ? (
                  <div className="space-y-2">{[1,2,3].map((i) => <div key={i} className="h-14 rounded-xl bg-muted/50 animate-pulse" />)}</div>
                ) : allVoices.length === 0 ? (
                  <div className="rounded-xl bg-muted/30 border border-border/50 p-4">
                    <p className="text-sm text-muted-foreground">No Mandarin voices found on this device. Install a Chinese language pack in your OS settings to enable voice selection.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {/* Auto option */}
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => updateAudio({ preferredVoiceURI: null })}
                      onKeyDown={(e) => e.key === 'Enter' && updateAudio({ preferredVoiceURI: null })}
                      className={[
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer",
                        !audio.preferredVoiceURI
                          ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                          : "border-border/60 bg-card hover:border-border hover:bg-muted/30",
                      ].join(" ")}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Star size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">Auto — best available</p>
                        <p className="text-xs text-muted-foreground truncate">{allVoices[0]?.name ?? "No voice"}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleVoicePreview(null); }}
                          className="flex items-center justify-center w-7 h-7 rounded-lg border border-border/60 bg-background hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                          title="Preview this voice"
                        >
                          {previewingVoiceURI === "__auto__" ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                        </button>
                        {!audio.preferredVoiceURI && <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">Active</span>}
                      </div>
                    </div>

                    {/* Voice cards */}
                    {displayVoices.map((v) => {
                      const tier = getVoiceTier(v);
                      const isActive = audio.preferredVoiceURI === v.voiceURI;
                      const isPreviewing = previewingVoiceURI === v.voiceURI;
                      return (
                        <div
                          key={v.voiceURI}
                          role="button"
                          tabIndex={0}
                          onClick={() => updateAudio({ preferredVoiceURI: v.voiceURI })}
                          onKeyDown={(e) => e.key === 'Enter' && updateAudio({ preferredVoiceURI: v.voiceURI })}
                          className={[
                            "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer",
                            isActive
                              ? "border-primary/50 bg-primary/5 ring-1 ring-primary/20"
                              : "border-border/60 bg-card hover:border-border hover:bg-muted/30",
                          ].join(" ")}
                        >
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground shrink-0 text-sm font-bold">
                            {v.lang.startsWith("zh-TW") ? "TW" : "CN"}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-foreground truncate">{v.name}</p>
                            <p className="text-xs text-muted-foreground">{v.lang}{v.localService ? " · local" : " · cloud"}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tierColors[tier.level]}`}>{tier.label}</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleVoicePreview(v.voiceURI); }}
                              className="flex items-center justify-center w-7 h-7 rounded-lg border border-border/60 bg-background hover:bg-muted/60 text-muted-foreground hover:text-foreground transition-all"
                              title="Preview this voice"
                            >
                              {isPreviewing ? <Loader2 size={12} className="animate-spin" /> : <Play size={12} />}
                            </button>
                            {isActive && <span className="text-[10px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded">Active</span>}
                          </div>
                        </div>
                      );
                    })}

                    {/* Show all / show less toggle */}
                    {allVoices.length > zhVoices.length && (
                      <button
                        onClick={() => setShowAllVoices((v) => !v)}
                        className="w-full text-xs text-muted-foreground hover:text-foreground py-1.5 transition-colors"
                      >
                        {showAllVoices ? `Show fewer voices` : `Show all ${allVoices.length} voices`}
                      </button>
                    )}
                    <p className="text-[10px] text-muted-foreground pt-0.5">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">Neural HD</span> = Google/Microsoft cloud neural (highest quality) · <span className="font-semibold text-blue-600 dark:text-blue-400">Neural</span> = offline neural · <span className="font-semibold text-violet-600 dark:text-violet-400">Neural TW</span> = Taiwan neural
                    </p>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </CollapsibleSection>

      {/* ── 5. Data Management ── */}
      <CollapsibleSection
        id="data"
        icon={<Database size={16} />}
        title="Data Management"
        subtitle="Export, import, reset, and app info"
        isOpen={openSection === "data"}
        onToggle={handleToggle}
      >
        {/* Export */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Export data</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Download all your words, cards, and progress as JSON.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} className="gap-1.5 shrink-0">
            <Download size={14} />
            Export
          </Button>
        </div>

        {/* Import */}
        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <div>
            <p className="text-sm font-medium text-foreground">Import backup</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Restore from a previously exported JSON backup file.
            </p>
          </div>
          <div>
            <input
              ref={importInputRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={handleImportFile}
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => importInputRef.current?.click()}
              disabled={importing}
              className="gap-1.5 shrink-0"
            >
              {importing ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
              {importing ? "Importing…" : "Import"}
            </Button>
          </div>
        </div>

        {/* Reset */}
        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <div>
            <p className="text-sm font-medium text-destructive">Reset all progress</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Deletes all words, flashcards, and review history. Cannot be undone.
            </p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setShowResetDialog(true)}
            className="gap-1.5 shrink-0"
          >
            <Trash2 size={14} />
            Reset
          </Button>
        </div>

        {/* About */}
        <div className="pt-3 border-t border-border/40 space-y-2 text-sm text-muted-foreground">
          <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-2">About</p>
          {[
            ["Words in deck", words.length],
            ["Flashcards", flashcards.length],
            ["Storage", "IndexedDB (local) + Cloud"],
            ["SRS Algorithm", "SM-2"],
            ["Dictionary", "CC-CEDICT (118k entries)"],
            ["Segmentation", "Longest-match"],
          ].map(([label, value]) => (
            <div key={String(label)} className="flex justify-between">
              <span>{label}</span>
              <span className="font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      {/* ── 6. Cloud Sync (always last) ── */}
      <CollapsibleSection
        id="sync"
        icon={<Cloud size={16} />}
        title="Cloud Sync"
        subtitle="Login, sync status, and backup"
        isOpen={openSection === "sync"}
        onToggle={handleToggle}
      >
        <CloudSyncSection />
      </CollapsibleSection>

      {/* ── Reset Dialog ── */}
      <AlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset all progress?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all your words, flashcards, and review history.
              Reading texts will be kept. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReset}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, reset everything
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
