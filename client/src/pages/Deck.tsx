/**
 * Deck Tab — Flashcard Review with SM-2
 * Design: Structured Scholar
 *  - Card front: large hanzi (ZH→EN) or definition (EN→ZH reverse mode)
 *  - Card back: full definition + pinyin + examples
 *  - ✓ / 🔊 symbol buttons below card
 *  - Completion marking: ✓ dims card and excludes from queue
 *  - Three testing modes: forward (ZH→EN), reverse (EN→ZH), random (mixed)
 *  - Random mode: balanced 50/50 with 3-consecutive-same guard
 *  - Bidirectional completion: word fully mastered only when seen in both directions
 */

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  RotateCcw,
  Inbox,
  CheckCircle2,
  Clock,
  Trash2,
  Shuffle,
  Layers,
  AlertTriangle,
  Search,
  X as XIcon,
  ArrowLeft,
  BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { useSyncNotify } from "@/contexts/SyncContext";
import { lookupWord } from "@/lib/dictionary";
import { cedictLookup, getAllReadings } from "@/lib/cedict";
import { formatFlashcardDefinitions, formatFlashcardDefinitionsEnriched, cleanAutoFillDefinition, LABEL_STYLES } from "@/lib/formatDefinitions";
import { FSRS, Rating } from "fsrs-algorithm";
import { useTTS } from "@/hooks/useTTS";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { useFlashcardDirection } from "@/hooks/useFlashcardDirection";
import { CompletedWordDB } from "@/lib/db";
import type { Flashcard, Word, TestingMode, FlashcardSource } from "@/lib/db";
import { loadAndMergeSession, useDeckSessionPersistence, clearSession } from "@/hooks/useDeckSession";
import { toTonePinyin } from "@/lib/pinyin";
import { useDecks } from "@/hooks/useDecks";
import { DecksSidebar } from "@/components/DecksSidebar";

const _fsrsPreview = new FSRS();

/** Mirror of the cap logic in db.ts — keeps button labels honest */
function capInterval(days: number, repsAfterReview: number): number {
  if (repsAfterReview <= 1) return Math.min(days, 1);
  if (repsAfterReview === 2) return Math.min(days, 3);
  if (repsAfterReview === 3) return Math.min(days, 7);
  if (repsAfterReview <= 5)  return Math.min(days, 14);
  return Math.min(days, 30);
}

/** Compute the scheduled days for each rating without mutating state */
function previewIntervals(card: Flashcard): { again: string; hard: string; good: string; easy: string } {
  const fmt = (days: number) => {
    if (days < 1) return "<1d";
    if (days === 1) return "1d";
    if (days < 30) return `${days}d`;
    if (days < 365) return `${Math.round(days / 30)}mo`;
    return `${(days / 365).toFixed(1)}y`;
  };
  try {
    const libCard = {
      due: new Date(card.dueDate),
      stability: card.stability ?? 0,
      difficulty: card.difficulty ?? 5,
      elapsedDays: card.elapsedDays ?? 0,
      scheduledDays: card.scheduledDays ?? 0,
      reps: card.reps ?? card.repetition ?? 0,
      lapses: card.lapses ?? 0,
      state: card.state ?? 0,
      lastReview: card.lastReviewed ? new Date(card.lastReviewed) : undefined,
    };
    const result = _fsrsPreview.schedule(libCard as Parameters<typeof _fsrsPreview.schedule>[0], new Date());
    return {
      again: fmt(result.again.card.scheduledDays), // Again stays uncapped (session requeue)
      hard:  fmt(capInterval(result.hard.card.scheduledDays,  result.hard.card.reps)),
      good:  fmt(capInterval(result.good.card.scheduledDays,  result.good.card.reps)),
      easy:  fmt(capInterval(result.easy.card.scheduledDays,  result.easy.card.reps)),
    };
  } catch {
    return { again: "<1d", hard: "shorter", good: "next", easy: "longer" };
  }
}

// ─── Direction Label ──────────────────────────────────────────────────────────

function DirectionLabel({ direction }: { direction: "forward" | "reverse" }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 select-none">
      {direction === "forward" ? "CN → EN" : "EN → CN"}
    </span>
  );
}

// ─── Flashcard Component ──────────────────────────────────────────────────────

interface FlashCardProps {
  card: Flashcard;
  word: Word;
  onReview: (rating: 1 | 2 | 3 | 4) => void;
  direction: "forward" | "reverse";
  isRandom: boolean;
  isCompleted?: boolean;
  completedForward?: boolean;
  completedReverse?: boolean;
  onMarkCompleted?: () => void;
  onUnmarkCompleted?: () => void;
  /** 1=Small (180px), 2=Medium (220px, default), 3=Large (280px) */
  cardSize?: 1 | 2 | 3;
  /** Card type: recognition (CN→EN) or production (EN→CN) */
  cardType?: "recognition" | "production";
}

const CARD_MIN_HEIGHT: Record<1 | 2 | 3, number> = { 1: 180, 2: 220, 3: 280 };

function FlashCard({
  card: _card,
  word,
  onReview,
  direction: _direction,
  isRandom,
  isCompleted = false,
  completedForward = false,
  completedReverse = false,
  onMarkCompleted,
  onUnmarkCompleted,
  cardSize = 2,
  cardType = "recognition",
}: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [slowMode, setSlowMode] = useState(false);
  const backRef = useRef<HTMLDivElement>(null);
  const [backHeight, setBackHeight] = useState<number | null>(null);
  useEffect(() => {
    if (!backRef.current) return;
    const ro = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height;
      if (h) setBackHeight(h);
    });
    ro.observe(backRef.current);
    return () => ro.disconnect();
  }, []);
  const { settings: audioSettings } = useAudioSettings();
  const tts = useTTS({ preferredVoiceURI: audioSettings.preferredVoiceURI });
  const pairs = word.examplePairs ?? word.exampleSentences.map((s) => ({ chinese: s, english: "" }));
  const minCardHeight = CARD_MIN_HEIGHT[cardSize];

  // Fallback definition: if the stored simpleDefinition is blank, pull the first
  // definition line from CEDICT so no card ever shows a blank.
  const cedictEntry = cedictLookup(word.hanzi);
  const fallbackDefinition: string = (() => {
    if (word.simpleDefinition?.trim()) return word.simpleDefinition.trim();
    if (cedictEntry?.definition) {
      // CEDICT definitions are slash-separated; take the first meaningful segment
      const parts = cedictEntry.definition.split("/").map((s) => s.trim()).filter(Boolean);
      return parts[0] ?? "";
    }
    return "";
  })();

  // Enriched definitions for the back face — with CEDICT fallback if the result is empty
  const getBackDefinitions = () => {
    const enriched = formatFlashcardDefinitionsEnriched(word.hanzi, word.simpleDefinition, word.otherMeanings, getAllReadings(word.hanzi));
    if (enriched.length > 0) return enriched;
    // CEDICT fallback: build labeled meanings from the raw definition string
    if (cedictEntry?.definition) {
      const parts = cedictEntry.definition.split("/").map((s) => s.trim()).filter(Boolean).slice(0, 4);
      return parts.map((text, i) => ({ text, label: (i === 0 ? "common" : "less common") as import("@/lib/formatDefinitions").FrequencyLabel }));
    }
    return [];
  };

  // Preview intervals for button labels
  const intervals = previewIntervals(_card);

  // Production cards always show EN→CN regardless of testing mode
  const direction = cardType === "production" ? "reverse" : _direction;
  const reverseMode = direction === "reverse";

  const handleFlip = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-action-btn]')) return;
    setFlipped((v) => !v);
  };

  const handleReview = (rating: 1 | 2 | 3 | 4) => {
    setFlipped(false);
    setTimeout(() => onReview(rating), 150);
  };

  // Spacebar shortcut: flip card if not flipped, trigger Good if already flipped
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      e.preventDefault();
      if (!flipped) {
        setFlipped(true);
      } else {
        handleReview(3); // Good on spacebar
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSpeak = () => tts.speakDual(word.hanzi, slowMode ? 0.65 : audioSettings.playbackSpeed);

  // Completion badge text — in random mode, show which directions are done
  const completionBadge = isCompleted ? (
    <div className="flex items-center justify-center gap-1.5 mb-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
      <CheckCircle2 size={13} />
      <span>Marked as learned</span>
      <button
        data-action-btn
        onClick={onUnmarkCompleted}
        className="ml-1 text-muted-foreground hover:text-foreground underline"
      >
        undo
      </button>
    </div>
  ) : isRandom && (completedForward || completedReverse) ? (
    <div className="flex items-center justify-center gap-2 mb-2 text-[10px] text-muted-foreground">
      <span className={completedForward ? "text-emerald-500 font-semibold" : "opacity-40"}>CN→EN ✓</span>
      <span className="opacity-30">·</span>
      <span className={completedReverse ? "text-emerald-500 font-semibold" : "opacity-40"}>EN→CN ✓</span>
    </div>
  ) : null;

  // ── Front face content depends on direction ──
  const frontContent = reverseMode ? (
    // EN→ZH: show English definition on front
    <div className="flex flex-col items-center justify-center gap-3 px-8 text-center">
      {isRandom && (
        <div className="mb-1">
          <DirectionLabel direction="reverse" />
        </div>
      )}
      <p className="text-2xl font-semibold text-foreground leading-snug">
        {fallbackDefinition || word.hanzi}
      </p>
      {word.otherMeanings && word.otherMeanings.length > 0 && (
        <p className="text-sm text-muted-foreground">
          also: {word.otherMeanings.slice(0, 2).join("; ")}
        </p>
      )}
      <p className="text-xs text-muted-foreground tracking-widest uppercase mt-2">tap to reveal Chinese</p>
    </div>
  ) : (
    // ZH→EN: show hanzi only on front (pinyin reserved for back)
    <div className="flex flex-col items-center justify-center gap-4 px-8">
      {isRandom && (
        <div className="absolute top-4 left-0 right-0 flex justify-center">
          <DirectionLabel direction="forward" />
        </div>
      )}
      <p
        className="text-8xl font-bold text-foreground leading-none tracking-tight"
        style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
      >
        {word.hanzi}
      </p>
      <p className="text-xs text-muted-foreground tracking-widest uppercase">tap card to reveal</p>
    </div>
  );

  // ── Back face content depends on direction ──
  // Layout: fixed header (hanzi + pinyin + definition) always visible at top,
  // example sentences scroll below so the card height stays compact.
  const backContent = reverseMode ? (
    // EN→ZH back: hanzi prominently, then definition, then scrollable examples
    <div className="flex flex-col w-full text-center">
      {/* Fixed header — always visible */}
      <div className="px-6 pt-6 pb-4 text-center">
        <p
          className="text-6xl font-bold text-foreground leading-none tracking-tight mb-2"
          style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
        >
          {word.hanzi}
        </p>
        <p className="text-base text-primary font-medium">{toTonePinyin(word.pinyin)}</p>
      </div>
      <div className="px-6 pb-4 border-t border-border/30 pt-4 text-left">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Definition</p>
        <ul className="space-y-1.5">
          {getBackDefinitions().map((item, i) => (
            <li key={i} className="text-sm leading-snug">
              <span className={i === 0 ? "text-foreground font-medium" : "text-foreground/80"}>{item.text}</span>
              {" "}
              <span className={`text-xs ${LABEL_STYLES[item.label]}`}>({item.label})</span>
            </li>
          ))}
          {getBackDefinitions().length === 0 && (
            <li className="text-sm text-muted-foreground italic">No definition available</li>
          )}
        </ul>
      </div>
      {/* Scrollable examples */}
      {pairs.length > 0 && (
        <div
          className="border-t border-border/30 px-6 py-4 text-left overflow-y-auto"
          style={{ maxHeight: 160 }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">From the story</p>
          <div className="space-y-3">
            {pairs.map((pair, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-3">
                <p
                  className="text-sm text-foreground leading-relaxed"
                  style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                >
                  {pair.chinese}
                </p>
                {pair.english && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed italic">{pair.english}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    // ZH→EN back: hanzi + pinyin + definition fixed, examples scroll below
    <div className="flex flex-col w-full text-center">
      {/* Fixed header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <p
          className="text-5xl font-bold text-foreground leading-none tracking-tight mb-2"
          style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
        >
          {word.hanzi}
        </p>
        <p className="text-base text-primary font-medium">{toTonePinyin(word.pinyin)}</p>
      </div>
      <div className="px-6 pb-4 border-t border-border/30 pt-4 text-left">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">Definition</p>
        <ul className="space-y-1.5">
          {getBackDefinitions().map((item, i) => (
            <li key={i} className="text-sm leading-snug">
              <span className={i === 0 ? "text-foreground font-medium" : "text-foreground/80"}>{item.text}</span>
              {" "}
              <span className={`text-xs ${LABEL_STYLES[item.label]}`}>({item.label})</span>
            </li>
          ))}
          {getBackDefinitions().length === 0 && (
            <li className="text-sm text-muted-foreground italic">No definition available</li>
          )}
        </ul>
      </div>
      {/* Scrollable examples */}
      {pairs.length > 0 && (
        <div
          className="border-t border-border/30 px-6 py-4 text-left overflow-y-auto"
          style={{ maxHeight: 160 }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-3">From the story</p>
          <div className="space-y-4">
            {pairs.map((pair, i) => (
              <div key={i} className="border-l-2 border-primary/30 pl-3">
                <p
                  className="text-sm text-foreground leading-relaxed"
                  style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                >
                  {pair.chinese}
                </p>
                {pair.english && (
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed italic">{pair.english}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`w-full max-w-lg mx-auto transition-opacity duration-300 ${isCompleted ? "opacity-50" : ""}`}>
      {/* Completion badge */}
      {completionBadge}

      {/* Card wrapper — height is the larger of the front minHeight and the measured back content height.
           This ensures long definitions on the back are never clipped. */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
          style={{
            transformStyle: "preserve-3d",
            position: "relative",
            width: "100%",
            // Grow the container to fit whichever face is taller
            minHeight: Math.max(minCardHeight, backHeight ?? 0),
          }}
        >
          {/* ── Front Face ── */}
          <div
            className="absolute inset-0 rounded-2xl border border-border/50 bg-card shadow-sm flex flex-col items-center justify-center overflow-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            {frontContent}
          </div>

          {/* ── Back Face ── — absolutely positioned, scrollable when content overflows */}
          <div
            ref={backRef}
            className="absolute inset-0 rounded-2xl border border-border/50 bg-card shadow-sm overflow-y-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            onClick={(e) => {
              // Allow scrolling without flipping the card back
              if ((e.target as HTMLElement).closest('[data-action-btn]')) return;
              // Only flip back if the user didn't scroll
              if (e.currentTarget.scrollTop > 0) { e.stopPropagation(); return; }
            }}
          >
            {backContent}
          </div>
        </motion.div>
      </div>

      {/* ── Below-card action row: always visible ── */}
      <div className="mt-4 flex items-center justify-center gap-3">
        {/* ✓ Mark as learned — shown only on front face */}
        {!flipped && !isCompleted && (
          <button
            data-action-btn
            onClick={onMarkCompleted}
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-emerald-200/80 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/60 text-emerald-600 dark:text-emerald-400 shadow-xs hover:shadow-sm transition-all duration-150 active:scale-[0.96]"
            title="Mark as learned (exclude from queue)"
            aria-label="Mark as learned"
          >
            <CheckCircle2 size={20} />
          </button>
        )}
        {/* 🔊 Speaker — always shown, plays dual voice */}
        {tts.hasSpeech && (
          <button
            data-action-btn
            onClick={handleSpeak}
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-border/60 dark:border-border/40 bg-card hover:bg-muted/60 dark:hover:bg-muted/30 text-muted-foreground hover:text-primary shadow-xs hover:shadow-sm transition-all duration-150 active:scale-[0.96]"
            title="Listen (female then male voice)"
            aria-label="Listen"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </button>
        )}
        {/* Slow toggle */}
        {tts.hasSpeech && (
          <button
            data-action-btn
            onClick={() => setSlowMode((v) => !v)}
            className={[
              "text-[10px] font-semibold px-2.5 py-1.5 rounded-lg border transition-all duration-150 active:scale-[0.96]",
              slowMode
                ? "bg-primary/10 border-primary/30 text-primary shadow-xs"
                : "border-border/50 text-muted-foreground/60 hover:text-muted-foreground hover:border-border/80",
            ].join(" ")}
            title="Toggle slow pronunciation"
          >
            {slowMode ? "SLOW" : "0.65×"}
          </button>
        )}
      </div>

      {/* ── Review Buttons (shown after flip) ── */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="mt-4 space-y-2"
          >
            {/* Primary row: Again + Good */}
            <div className="grid grid-cols-2 gap-3">
              {/* Again — rating 1 */}
              <button
                onClick={() => handleReview(1)}
                className="group flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl border border-rose-200/80 dark:border-rose-700/40 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 hover:border-rose-300 dark:hover:border-rose-600/60 text-rose-600 dark:text-rose-400 shadow-xs hover:shadow-sm transition-all duration-150 active:scale-[0.96]"
              >
                <RotateCcw size={18} className="transition-transform duration-150 group-hover:rotate-[-20deg]" />
                <span className="text-sm font-semibold tracking-tight">Again</span>
                <span className="text-[10px] font-medium text-rose-400/80 dark:text-rose-500/80">{intervals.again}</span>
              </button>
              {/* Good — rating 3 */}
              <button
                onClick={() => handleReview(3)}
                className="group flex flex-col items-center gap-1.5 py-4 px-2 rounded-xl border border-emerald-200/80 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 hover:border-emerald-300 dark:hover:border-emerald-600/60 text-emerald-600 dark:text-emerald-400 shadow-xs hover:shadow-sm transition-all duration-150 active:scale-[0.96]"
              >
                <CheckCircle2 size={18} />
                <span className="text-sm font-semibold tracking-tight">Good</span>
                <span className="text-[10px] font-medium text-emerald-400/80 dark:text-emerald-500/80">{intervals.good}</span>
              </button>
            </div>
            {/* Secondary row: Hard + Easy (smaller, muted) */}
            <div className="grid grid-cols-2 gap-2">
              {/* Hard — rating 2 */}
              <button
                onClick={() => handleReview(2)}
                className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg border border-amber-200/60 dark:border-amber-700/30 bg-amber-50/60 dark:bg-amber-950/20 hover:bg-amber-100/80 dark:hover:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium transition-all duration-150 active:scale-[0.97] opacity-80 hover:opacity-100"
              >
                <span className="font-semibold">Hard</span>
                <span className="text-[9px] text-amber-400/70 dark:text-amber-500/70">{intervals.hard}</span>
              </button>
              {/* Easy — rating 4 */}
              <button
                onClick={() => handleReview(4)}
                className="flex flex-col items-center gap-0.5 py-2 px-2 rounded-lg border border-sky-200/60 dark:border-sky-700/30 bg-sky-50/60 dark:bg-sky-950/20 hover:bg-sky-100/80 dark:hover:bg-sky-900/30 text-sky-600 dark:text-sky-400 text-xs font-medium transition-all duration-150 active:scale-[0.97] opacity-80 hover:opacity-100"
              >
                <span className="font-semibold">Easy</span>
                <span className="text-[9px] text-sky-400/70 dark:text-sky-500/70">{intervals.easy}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  );
}

// ─── Session Complete ─────────────────────────────────────────────────────────

function SessionComplete({ reviewed, onReset }: { reviewed: number; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 size={32} className="text-emerald-600 dark:text-emerald-400" />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-1">Session Complete!</h3>
      <p className="text-muted-foreground text-sm mb-6">
        You reviewed {reviewed} card{reviewed !== 1 ? "s" : ""} today.
      </p>
      <Button variant="outline" onClick={onReset} className="gap-2">
        <RotateCcw size={14} />
        Review Again
      </Button>
    </motion.div>
  );
}

// ─── Manual Add Dialog ────────────────────────────────────────────────────────

interface ManualAddDialogProps {
  open: boolean;
  onClose: () => void;
  decks: import("@/hooks/useDecks").CustomDeck[];
  mainDeck: import("@/hooks/useDecks").CustomDeck | null;
  addWordToDecks: (wordId: string, deckIds: string[]) => Promise<void>;
}

function ManualAddDialog({ open, onClose, decks, mainDeck, addWordToDecks }: ManualAddDialogProps) {
  const { addManualWord } = useApp();
  const [hanzi, setHanzi] = useState("");
  const [pinyin, setPinyin] = useState("");
  const [definition, setDefinition] = useState("");
  const [examples, setExamples] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedDeckId, setSelectedDeckId] = useState<string>("");

  // Default to Main Deck whenever the dialog opens or decks change
  useEffect(() => {
    if (open && mainDeck && !selectedDeckId) {
      setSelectedDeckId(mainDeck.id);
    }
  }, [open, mainDeck, selectedDeckId]);

  // Reset form when dialog closes
  useEffect(() => {
    if (!open) {
      setHanzi(""); setPinyin(""); setDefinition(""); setExamples("");
      setSelectedDeckId(mainDeck?.id ?? "");
    }
  }, [open, mainDeck]);

  const handleHanziChange = (val: string) => {
    setHanzi(val);
    if (!val.trim()) {
      // Clear all auto-filled fields when hanzi is emptied
      setPinyin("");
      setDefinition("");
      setExamples("");
      return;
    }
    const cedict = cedictLookup(val.trim());
    const local = lookupWord(val.trim());
    const entry = cedict ?? local;
    if (entry) {
      setPinyin(toTonePinyin(entry.pinyin));
      setDefinition(cleanAutoFillDefinition(entry.definition));
    }
  };

  const handleSubmit = async () => {
    if (!hanzi.trim()) {
      toast.error("Hanzi is required");
      return;
    }
    setLoading(true);
    try {
      const word = await addManualWord({
        hanzi: hanzi.trim(),
        pinyin: pinyin.trim(),
        simpleDefinition: definition.trim(),
        exampleSentences: examples.split("\n").map((s) => s.trim()).filter(Boolean),
        sourceTextId: null,
        addedManually: true,
      });
      // Assign to the selected deck (defaults to Main Deck)
      const targetDeckId = selectedDeckId || mainDeck?.id;
      if (targetDeckId) {
        await addWordToDecks(word.id, [targetDeckId]);
      }
      const deckName = decks.find((d) => d.id === targetDeckId)?.name ?? "deck";
      toast.success(`Added "${hanzi.trim()}" to ${deckName}`);
      onClose();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Failed to add word";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Word Manually</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label htmlFor="hanzi">Chinese (required)</Label>
            <Input
              id="hanzi"
              value={hanzi}
              onChange={(e) => handleHanziChange(e.target.value)}
              placeholder="e.g. 非常"
              className="mt-1"
              style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)", fontSize: "1.1rem" }}
            />
          </div>
          <div>
            <Label htmlFor="pinyin">Pinyin (auto-filled if in dictionary)</Label>
            <Input
              id="pinyin"
              value={pinyin}
              onChange={(e) => setPinyin(e.target.value)}
              placeholder="e.g. fēicháng"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="definition">Definition</Label>
            <Input
              id="definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              placeholder="e.g. very; extremely"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="examples">Example sentences (one per line, optional)</Label>
            <Textarea
              id="examples"
              value={examples}
              onChange={(e) => setExamples(e.target.value)}
              placeholder={"他非常努力。\n这个问题非常重要。"}
              className="mt-1 min-h-[80px]"
              style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
            />
          </div>
          <div>
            <Label htmlFor="deck-select">Add to deck</Label>
            <Select
              value={selectedDeckId}
              onValueChange={setSelectedDeckId}
            >
              <SelectTrigger id="deck-select" className="mt-1 w-full">
                <SelectValue placeholder="Select a deck" />
              </SelectTrigger>
              <SelectContent>
                {decks.map((deck) => (
                  <SelectItem key={deck.id} value={deck.id}>
                    {deck.name}{deck.isMain ? " (default)" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Adding…" : "Add to Deck"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Word List Item ───────────────────────────────────────────────────────────

function WordListItem({
  word,
  card,
  isCompleted,
  completedForward,
  completedReverse,
  onDelete,
  onToggleComplete,
}: {
  word: Word;
  card: Flashcard | undefined;
  isCompleted: boolean;
  completedForward?: boolean;
  completedReverse?: boolean;
  onDelete: () => void;
  onToggleComplete: () => void;
}) {
  const dueDate = card ? new Date(card.dueDate) : null;
  const isDue = dueDate ? dueDate.getTime() <= Date.now() : false;
  const daysUntil = dueDate
    ? Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;
  return (
    <div className={`flex items-center justify-between py-3 px-4 rounded-lg hover:bg-muted/40 transition-colors group ${isCompleted ? "opacity-50" : ""}`}>
      <div className="flex items-center gap-3 min-w-0">
        {isCompleted && <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />}
        <span
          className="text-xl font-bold text-foreground shrink-0"
          style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
        >
          {word.hanzi}
        </span>
        <div className="min-w-0">
          <p className="text-sm text-primary font-medium truncate">{toTonePinyin(word.pinyin)}</p>
          <p className="text-xs text-muted-foreground truncate">{word.simpleDefinition?.trim() || cedictLookup(word.hanzi)?.definition?.split("/")[0]?.trim() || "—"}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        {/* Direction completion indicators */}
        {(completedForward || completedReverse) && !isCompleted && (
          <div className="flex gap-1 text-[9px] font-semibold">
            <span className={completedForward ? "text-emerald-500" : "text-muted-foreground/30"}>CN→EN</span>
            <span className={completedReverse ? "text-emerald-500" : "text-muted-foreground/30"}>EN→CN</span>
          </div>
        )}
        {isDue && !isCompleted ? (
          <Badge variant="outline" className="text-xs bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50">Due</Badge>
        ) : isCompleted ? (
          <Badge variant="outline" className="text-xs bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700/50">Learned</Badge>
        ) : daysUntil !== null ? (
          <span className="text-xs text-muted-foreground">in {daysUntil}d</span>
        ) : null}
        {card && !isCompleted && (
          <span className="text-xs text-muted-foreground">×{card.reps}</span>
        )}
        <button
          onClick={onToggleComplete}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
          title={isCompleted ? "Unmark as learned" : "Mark as learned"}
        >
          <CheckCircle2 size={14} />
        </button>
        <button
          onClick={onDelete}
          className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Flashcard Source Selector ───────────────────────────────────────────────
const SOURCE_OPTIONS: { value: FlashcardSource; label: string; title: string }[] = [
  { value: "both", label: "All", title: "Draw from all sources" },
  { value: "texts", label: "Texts", title: "Only words added from reading sessions" },
  { value: "vocab", label: "Vocab", title: "Only words added from vocabulary pages" },
  { value: "user", label: "My Words", title: "Only manually added words" },
];
function FlashcardSourceSelector({
  value,
  onChange,
}: {
  value: FlashcardSource;
  onChange: (source: FlashcardSource) => void;
}) {
  return (
    <div className="flex rounded-lg border border-border overflow-hidden" role="group" aria-label="Flashcard source">
      {SOURCE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          title={opt.title}
          className={[
            "px-3 py-1.5 text-xs font-medium transition-colors",
            value === opt.value
              ? "bg-secondary text-secondary-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Testing Mode Selector ────────────────────────────────────────────────────
const MODE_OPTIONS: { value: TestingMode; label: string; title: string }[] = [
  { value: "forward", label: "ZH→EN", title: "Chinese to English" },
  { value: "reverse", label: "EN→ZH", title: "English to Chinese" },
  { value: "random", label: "Mixed", title: "Random direction (balanced)" },
];

function TestingModeSelector({
  value,
  onChange,
}: {
  value: TestingMode;
  onChange: (mode: TestingMode) => void;
}) {
  return (
    <div className="flex rounded-lg border border-border overflow-hidden" role="group" aria-label="Testing mode">
      {MODE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          title={opt.title}
          className={[
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium transition-colors",
            value === opt.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          ].join(" ")}
        >
          {opt.value === "random" && <Shuffle size={11} />}
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Deck Page ────────────────────────────────────────────────────────────────

type DeckView = "review" | "list";

export default function Deck() {
  const {
    words,
    flashcards,
    reviewFlashcard,
    removeWord,
    getDueCards,
    getWordById,
    getStoryDeckWordIds,
    settings,
    updateSettings,
    todayReviews,
    completedWordIds,
    markWordCompleted,
    unmarkWordCompleted,
  } = useApp();

  const notifyChange = useSyncNotify();
  const [location, navigate] = useLocation();

  // ── Custom decks ──────────────────────────────────────────────────────────
  const decksMgr = useDecks();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDeckId, setActiveDeckId] = useState<string | null>(null);

  // Compute card counts per deck from decksMgr.deckCards
  const deckCardCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const deck of decksMgr.decks) {
      counts[deck.id] = decksMgr.getDeckWordIds(deck.id).length;
    }
    return counts;
  }, [decksMgr.decks, decksMgr.deckCards]);

  // Parse story filter from URL: /deck?storyId=xxx&storyTitle=yyy
  const urlParams = useMemo(() => {
    const search = typeof window !== "undefined" ? window.location.search : "";
    const p = new URLSearchParams(search);
    return {
      storyId: p.get("storyId") ?? null,
      storyTitle: p.get("storyTitle") ?? null,
    };
  }, [location]);
  const storyFilter = urlParams.storyId;
  const storyFilterTitle = urlParams.storyTitle;

  // Story deck word IDs (loaded async when storyFilter is active)
  const [storyWordIds, setStoryWordIds] = useState<Set<string> | null>(null);
  useEffect(() => {
    if (!storyFilter) { setStoryWordIds(null); return; }
    getStoryDeckWordIds(storyFilter).then((ids) => setStoryWordIds(new Set(ids)));
  }, [storyFilter, getStoryDeckWordIds, flashcards]);

  const [view, setView] = useState<DeckView>("review");

  // ── Session persistence: restore from localStorage on mount ──────────────
  // When a story filter is active we NEVER restore from localStorage — the
  // queue must be built from story-scoped cards only, which are loaded async.
  // For the main deck we merge the saved session as before.
  const isStoryMode = !!urlParams.storyId;

  const [sessionRestored, setSessionRestored] = useState<boolean>(() => {
    if (isStoryMode) return false;
    const currentDue = getDueCards().map((c) => c.cardId);
    const merged = loadAndMergeSession(currentDue);
    return !!(merged && merged.sessionReviewed > 0);
  });
  const [reviewQueue, setReviewQueue] = useState<string[]>(() => {
    if (isStoryMode) return []; // populated later once storyWordIds loads
    const currentDue = getDueCards().map((c) => c.cardId);
    const merged = loadAndMergeSession(currentDue);
    if (merged && merged.queue.length > 0) return merged.queue;
    return currentDue;
  });
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [sessionReviewed, setSessionReviewed] = useState<number>(() => {
    if (isStoryMode) return 0;
    const currentDue = getDueCards().map((c) => c.cardId);
    const merged = loadAndMergeSession(currentDue);
    return merged ? merged.sessionReviewed : 0;
  });
  // Track cards that have been requeued due to "Again" so we can show a
  // "requeued" indicator and avoid double-counting them in the progress bar.
  const [requeuedWordIds, setRequeuedWordIds] = useState<Set<string>>(() => {
    if (isStoryMode) return new Set();
    const currentDue = getDueCards().map((c) => c.cardId);
    const merged = loadAndMergeSession(currentDue);
    return merged ? new Set(merged.requeuedIds) : new Set();
  });

  // Once storyWordIds loads (async), build the initial story-scoped queue
  const storyQueueInitialized = useRef(false);
  useEffect(() => {
    if (!isStoryMode || !storyWordIds || storyQueueInitialized.current) return;
    storyQueueInitialized.current = true;
    const all = getDueCards();
    const storyCards = all.filter((c) => storyWordIds.has(c.wordId));
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const newCards = shuffle(storyCards.filter((c) => !c.lastReviewed).map((c) => c.cardId));
    const dueCards2 = shuffle(storyCards.filter((c) => c.lastReviewed).map((c) => c.cardId));
    setReviewQueue([...newCards, ...dueCards2]);
    setCurrentIdx(0);
    setSessionReviewed(0);
    setRequeuedWordIds(new Set());
  }, [isStoryMode, storyWordIds, getDueCards]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [wordSearch, setWordSearch] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Bidirectional completion state (loaded from IndexedDB)
  const [completedDetails, setCompletedDetails] = useState<Map<string, { forward: boolean; reverse: boolean }>>(new Map());

  // Load completed details on mount and when completedWordIds changes
  const loadedRef = useRef(false);
  if (!loadedRef.current) {
    loadedRef.current = true;
    CompletedWordDB.getAll().then((all) => {
      const map = new Map<string, { forward: boolean; reverse: boolean }>();
      for (const cw of all) {
        map.set(cw.wordId, {
          forward: cw.completedForward ?? true,
          reverse: cw.completedReverse ?? false,
        });
      }
      setCompletedDetails(map);
    });
  }

  // ── Persist session state to localStorage on every change ───────────────
  useDeckSessionPersistence(reviewQueue, currentIdx, sessionReviewed, requeuedWordIds);

  const testingMode = settings.testingMode ?? "forward";
  const { getDirection, resetDirections, isRandom } = useFlashcardDirection(testingMode);

  // When story filter is active, restrict due cards to story deck words only
  const getFilteredDueCards = useCallback(() => {
    const all = getDueCards();
    if (!storyFilter || !storyWordIds) return all;
    return all.filter((c) => storyWordIds.has(c.wordId));
  }, [getDueCards, storyFilter, storyWordIds]);

  const dueCards = useMemo(() => getFilteredDueCards(), [getFilteredDueCards, flashcards, completedWordIds, storyWordIds]);

  // Leech cards: excluded from normal queue, shown separately for manual review
  const leechCards = useMemo(
    () => flashcards.filter((c) => c.isLeech),
    [flashcards]
  );
  const currentCardId = reviewQueue[currentIdx];
  // Support both cardId-based queue (new FSRS) and wordId-based queue (legacy sessions)
  const currentCard = currentCardId
    ? (flashcards.find((c) => c.cardId === currentCardId) ?? flashcards.find((c) => c.wordId === currentCardId))
    : undefined;
  const currentWordId = currentCard?.wordId ?? currentCardId;
  const currentWord = currentWordId ? getWordById(currentWordId) : undefined;
  const currentDirection = currentCardId !== undefined ? getDirection(currentIdx) : "forward";

  const startReview = useCallback(() => {
    clearSession();
    const all = getFilteredDueCards();

    // Separate new (never reviewed) and due cards
    const newCards = all.filter((c) => !c.lastReviewed).map((c) => c.cardId);
    const reviewCards = all.filter((c) => c.lastReviewed).map((c) => c.cardId);

    // Shuffle each group independently so you can't predict what's next
    const shuffle = <T,>(arr: T[]): T[] => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    // New cards first (shuffled), then due cards (shuffled)
    const due = [...shuffle(newCards), ...shuffle(reviewCards)];
    setReviewQueue(due);
    setCurrentIdx(0);
    setSessionReviewed(0);
    setRequeuedWordIds(new Set());
    resetDirections();
  }, [getFilteredDueCards, resetDirections]);

  const handleModeChange = useCallback(
    async (mode: TestingMode) => {
      await updateSettings({ ...settings, testingMode: mode });
      // Reset direction map when mode changes
      resetDirections();
    },
    [settings, updateSettings, resetDirections]
  );
  const handleSourceChange = useCallback(
    async (source: FlashcardSource) => {
      clearSession();
      await updateSettings({ ...settings, flashcardSource: source });
      const due = getDueCards().map((c) => c.cardId);
      setReviewQueue(due);
      setCurrentIdx(0);
      setSessionReviewed(0);
    },
    [settings, updateSettings, getDueCards]
  );

  const handleReview = useCallback(
    async (rating: 1 | 2 | 3 | 4) => {
      if (!currentCardId) return;

      if (rating === 1) {
        // ── Again ───────────────────────────────────────────────────────────────
        // Write lightweight lapse update, then requeue the card 2-3 positions ahead.
        await reviewFlashcard(currentCardId, 1);
        setRequeuedWordIds((prev) => new Set(Array.from(prev).concat(currentCardId)));
        setReviewQueue((prev) => {
          const insertAt = Math.min(currentIdx + 1 + 2, prev.length);
          const next = [...prev];
          next.splice(insertAt, 0, currentCardId);
          return next;
        });
        setCurrentIdx((prev) => prev + 1);
        toast.info("Card will reappear in 2–3 cards", { duration: 1800 });
        notifyChange();
        return;
      }

      // ── Hard / Good / Easy (2 / 3 / 4) ──────────────────────────────────────
      const cap = settings.dailyReviewCap;
      if (cap !== null && todayReviews >= cap) {
        toast.warning(`Daily review cap (${cap}) reached!`);
        return;
      }
      await reviewFlashcard(currentCardId, rating);
      setSessionReviewed((prev) => prev + 1);
      setRequeuedWordIds((prev) => {
        const next = new Set(prev);
        next.delete(currentCardId);
        return next;
      });
      setCurrentIdx((prev) => prev + 1);
      notifyChange();
    },
    [currentCardId, reviewFlashcard, requeuedWordIds, settings.dailyReviewCap, todayReviews, currentIdx, notifyChange]
  );

  const handleMarkCompleted = useCallback(async () => {
    if (!currentWordId) return;

    if (isRandom) {
      // In random mode: mark the specific direction that was just shown
      await CompletedWordDB.markDirection(currentWordId, currentDirection);

      // Check if both directions are now complete
      const updated = await CompletedWordDB.getById(currentWordId);
      const bothDone = updated?.completedForward && updated?.completedReverse;

      setCompletedDetails((prev) => {
        const next = new Map(prev);
        const existing = next.get(currentWordId) ?? { forward: false, reverse: false };
        next.set(currentWordId, {
          forward: existing.forward || currentDirection === "forward",
          reverse: existing.reverse || currentDirection === "reverse",
        });
        return next;
      });

      if (bothDone) {
        await markWordCompleted(currentWordId);
        toast.success("Mastered in both directions — excluded from review queue");
      } else {
        const remaining = currentDirection === "forward" ? "EN→ZH" : "CN→EN";
        toast.success(`${currentDirection === "forward" ? "CN→EN" : "EN→CN"} confirmed ✓ — still needs ${remaining}`);
      }
    } else {
      // Non-random mode: mark both directions at once (legacy behaviour)
      await markWordCompleted(currentWordId);
      toast.success("Marked as learned — excluded from review queue");
    }

    setSessionReviewed((prev) => prev + 1);
    setCurrentIdx((prev) => prev + 1);
    notifyChange();
  }, [currentWordId, currentDirection, isRandom, markWordCompleted, notifyChange]);

  const isSessionDone = currentIdx >= reviewQueue.length;

  // Dismiss the "session restored" banner after 4 seconds
  useEffect(() => {
    if (!sessionRestored) return;
    const t = setTimeout(() => setSessionRestored(false), 4000);
    return () => clearTimeout(t);
  }, [sessionRestored]);

  // When the user returns to this tab, merge any newly-due cards into the queue.
  // This handles the case where cards became due while the tab was in the background.
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      // Only append newly-due cards; don't disrupt the current card position
      setReviewQueue((prev) => {
        const currentDue = getDueCards().map((c) => c.cardId);
        const existingSet = new Set(prev);
        const newlyDue = currentDue.filter((id) => !existingSet.has(id));
        if (newlyDue.length === 0) return prev;
        return [...prev, ...newlyDue];
      });
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [getDueCards]);

  return (
    <div>
      {/* Return to Story banner — shown when reviewing a story-filtered deck */}
      {storyFilter && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/5 px-4 py-2.5">
          <BookOpen size={14} className="shrink-0 text-primary" />
          <span className="text-sm text-foreground flex-1">
            Reviewing <span className="font-semibold">{storyFilterTitle ?? storyFilter}</span>
          </span>
          <button
            onClick={() => navigate(`/sessions`)}
            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
            title="Return to story"
          >
            <ArrowLeft size={13} />
            Back to Stories
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          {storyFilter ? (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-0.5">
                Story Deck
              </h2>
              <p className="text-sm text-muted-foreground">
                {storyFilterTitle ?? storyFilter} · {storyWordIds?.size ?? 0} words · {dueCards.length} due
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-0.5">Flashcard Deck</h2>
              <p className="text-sm text-muted-foreground">
                {words.length} word{words.length !== 1 ? "s" : ""} · {dueCards.length} due
                {completedWordIds.size > 0 && ` · ${completedWordIds.size} learned`}
              </p>
            </>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Flashcard source selector */}
          <FlashcardSourceSelector value={settings.flashcardSource ?? "both"} onChange={handleSourceChange} />
          {/* Testing mode selector */}
          <TestingModeSelector value={testingMode} onChange={handleModeChange} />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddDialog(true)}
            className="gap-1.5"
          >
            <Plus size={14} />
            Add Word
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSidebarOpen(true)}
            className="gap-1.5"
            title="Manage decks"
          >
            <Layers size={14} />
            Decks
          </Button>
          <div className="flex rounded-lg border border-border overflow-hidden">
            <button
              onClick={() => setView("review")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === "review" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              Review
            </button>
            <button
              onClick={() => setView("list")}
              className={`px-3 py-1.5 text-xs font-medium transition-colors ${view === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              All Words
            </button>
          </div>
        </div>
      </div>

      {/* Session-restored banner */}
      {sessionRestored && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-2.5 text-sm text-primary">
          <RotateCcw size={14} className="shrink-0" />
          <span>Session restored — continuing from card {currentIdx + 1} of {reviewQueue.length}</span>
          <button
            onClick={() => setSessionRestored(false)}
            className="ml-auto text-muted-foreground hover:text-foreground text-xs"
          >
            dismiss
          </button>
        </div>
      )}

      {/* Review View */}
      {view === "review" && (
        <div>
          {words.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Inbox size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium mb-1">Your deck is empty</p>
              <p className="text-sm">Tap words in reading sessions to add them here.</p>
            </div>
          ) : dueCards.length === 0 && reviewQueue.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <CheckCircle2 size={40} className="mx-auto mb-3 opacity-30 text-emerald-500 dark:text-emerald-400" />
              <p className="font-medium mb-1 text-foreground">All caught up!</p>
              <p className="text-sm mb-4">No cards due right now. Come back later.</p>
              <Button variant="outline" size="sm" onClick={startReview} className="gap-1.5">
                <RotateCcw size={14} />
                Review All Anyway
              </Button>
            </div>
          ) : isSessionDone ? (
            <>
              <SessionComplete reviewed={sessionReviewed} onReset={startReview} />
              {leechCards.length > 0 && (
                <div className="mt-6 border border-amber-200 dark:border-amber-700/50 rounded-xl p-4 bg-amber-50/50 dark:bg-amber-900/10">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400" />
                    <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">
                      {leechCards.length} Leech Card{leechCards.length !== 1 ? "s" : ""} — Needs Attention
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    These cards have failed 5+ times and are paused from the normal queue. Review them separately or remove them.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {leechCards.map((c) => {
                      const w = getWordById(c.wordId);
                      return w ? (
                        <span key={c.cardId} className="inline-flex items-center gap-1 text-xs bg-background border rounded px-2 py-1">
                          <span className="font-medium">{w.hanzi}</span>
                          <span className="text-muted-foreground">({c.lapses} fails)</span>
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </>
          ) : currentWord && currentCard ? (
            <AnimatePresence mode="wait">
                <motion.div
                key={currentCardId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">
                      {currentIdx + 1} / {reviewQueue.length}
                    </span>
                    {requeuedWordIds.has(currentCardId ?? "") && (
                      <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/50 rounded px-1.5 py-0.5">
                        requeued
                      </span>
                    )}
                  </div>
                  <div className="flex-1 mx-4 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${((currentIdx) / reviewQueue.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{reviewQueue.length - currentIdx} left</span>
                </div>
                <FlashCard
                  card={currentCard}
                  word={currentWord}
                  onReview={handleReview}
                  direction={currentDirection}
                  isRandom={isRandom}
                  isCompleted={completedWordIds.has(currentWordId ?? "")}
                  completedForward={completedDetails.get(currentWordId ?? "")?.forward}
                  completedReverse={completedDetails.get(currentWordId ?? "")?.reverse}
                  onMarkCompleted={handleMarkCompleted}
                  onUnmarkCompleted={() => currentWordId && unmarkWordCompleted(currentWordId)}
                  cardSize={(settings.cardSize ?? 2) as 1 | 2 | 3}
                  cardType={currentCard?.cardType ?? "recognition"}
                />
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>
      )}

      {/* List View */}
      {view === "list" && (
        <div className="space-y-3">
          {/* Search bar */}
          {words.length > 0 && (
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                value={wordSearch}
                onChange={(e) => setWordSearch(e.target.value)}
                placeholder="Search words…"
                className="w-full pl-9 pr-9 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              {wordSearch && (
                <button
                  onClick={() => setWordSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <XIcon size={13} />
                </button>
              )}
            </div>
          )}

          {words.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Inbox size={40} className="mx-auto mb-3 opacity-30" />
              <p>No words in deck yet.</p>
            </div>
          ) : (() => {
            const q = wordSearch.trim().toLowerCase();
            const filtered = q
              ? words.filter(
                  (w) =>
                    w.hanzi.includes(wordSearch.trim()) ||
                    w.pinyin.toLowerCase().includes(q) ||
                    (w.simpleDefinition ?? "").toLowerCase().includes(q)
                )
              : words;
            if (filtered.length === 0) {
              return (
                <div className="text-center py-10 text-muted-foreground text-sm">
                  No words match &ldquo;{wordSearch}&rdquo;
                </div>
              );
            }
            return (
              <div className="rounded-xl border border-border bg-card overflow-hidden divide-y divide-border/50">
                {filtered.map((word) => {
                  const card = flashcards.find((c) => c.wordId === word.id);
                  const details = completedDetails.get(word.id);
                  return (
                    <WordListItem
                      key={word.id}
                      word={word}
                      card={card}
                      isCompleted={completedWordIds.has(word.id)}
                      completedForward={details?.forward}
                      completedReverse={details?.reverse}
                      onDelete={() => setDeleteConfirmId(word.id)}
                      onToggleComplete={() =>
                        completedWordIds.has(word.id)
                          ? unmarkWordCompleted(word.id)
                          : markWordCompleted(word.id)
                      }
                    />
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* Delete confirmation dialog */}
      <AlertDialog open={!!deleteConfirmId} onOpenChange={(open) => { if (!open) setDeleteConfirmId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete word?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirmId && (() => {
                const w = words.find((x) => x.id === deleteConfirmId);
                return w ? (
                  <>
                    <span className="font-semibold text-foreground" style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}>{w.hanzi}</span>
                    {" "}({w.simpleDefinition}) will be permanently removed from your deck and all review history will be lost.
                  </>
                ) : "This word will be permanently removed.";
              })()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                if (deleteConfirmId) {
                  removeWord(deleteConfirmId);
                  setDeleteConfirmId(null);
                  toast.success("Word deleted");
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ManualAddDialog
        open={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        decks={decksMgr.decks}
        mainDeck={decksMgr.mainDeck}
        addWordToDecks={decksMgr.addWordToDecks}
      />

      {/* Decks sidebar */}
      <DecksSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        decks={decksMgr}
        deckCardCounts={deckCardCounts}
        activeDeckId={activeDeckId}
        onSelectDeck={setActiveDeckId}
      />
    </div>
  );
}
