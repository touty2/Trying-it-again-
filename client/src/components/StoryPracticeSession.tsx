/**
 * StoryPracticeSession
 *
 * A lightweight, self-contained flashcard practice session for a story's words.
 * It does NOT call reviewFlashcard() — no SRS state is mutated.
 * Progress is kept in local component state only and resets when the user
 * clicks "Reset / Start Over".
 */

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  CheckCircle2,
  X,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { toTonePinyin } from "@/lib/pinyin";
import type { Word, Flashcard } from "@/lib/db";

// ─── helpers ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Mini flashcard ───────────────────────────────────────────────────────────

interface PracticeCardProps {
  word: Word;
  card?: Flashcard;
  onKnow: () => void;
  onDontKnow: () => void;
  index: number;
  total: number;
}

function PracticeCard({ word, onKnow, onDontKnow, index, total }: PracticeCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = useCallback(() => setFlipped((v) => !v), []);

  const examplePair = word.examplePairs?.[0];

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>{index + 1} / {total}</span>
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${(index / total) * 100}%` }}
          />
        </div>
        <span>{total - index} left</span>
      </div>

      {/* Card */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: "1200px" }}
        onClick={handleFlip}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d", position: "relative", width: "100%", minHeight: 180 }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-2xl border border-border/50 bg-card shadow-sm flex flex-col items-center justify-center gap-2 px-6"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span
              className="text-5xl font-bold text-foreground"
              style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
            >
              {word.hanzi}
            </span>
            <span className="text-xs text-muted-foreground mt-1">tap to reveal</span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 rounded-2xl border border-border/50 bg-card shadow-sm flex flex-col items-start justify-center gap-2 px-6 overflow-y-auto"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <span
              className="text-3xl font-bold text-foreground"
              style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
            >
              {word.hanzi}
            </span>
            <span className="text-sm font-medium text-primary">{toTonePinyin(word.pinyin)}</span>
            <span className="text-sm text-foreground">{word.simpleDefinition}</span>
            {word.otherMeanings && word.otherMeanings.length > 0 && (
              <span className="text-xs text-muted-foreground">{word.otherMeanings.slice(0, 2).join("; ")}</span>
            )}
            {examplePair && (
              <div className="mt-2 pt-2 border-t border-border/30 w-full space-y-0.5">
                <p
                  className="text-sm text-foreground"
                  style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                >
                  {examplePair.chinese}
                </p>
                <p className="text-xs text-muted-foreground">{examplePair.english}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Action buttons — only shown after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-2 gap-3"
          >
            <button
              onClick={onDontKnow}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border border-rose-200/80 dark:border-rose-700/40 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 text-rose-600 dark:text-rose-400 transition-all active:scale-[0.97]"
            >
              <RotateCcw size={18} />
              <span className="text-sm font-semibold">Again</span>
            </button>
            <button
              onClick={onKnow}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border border-emerald-200/80 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 transition-all active:scale-[0.97]"
            >
              <CheckCircle2 size={18} />
              <span className="text-sm font-semibold">Got it</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Session complete ─────────────────────────────────────────────────────────

function PracticeComplete({
  known,
  total,
  onReset,
  onClose,
}: {
  known: number;
  total: number;
  onReset: () => void;
  onClose: () => void;
}) {
  const pct = total > 0 ? Math.round((known / total) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-6 space-y-4"
    >
      <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto">
        <CheckCircle2 size={28} className="text-emerald-600 dark:text-emerald-400" />
      </div>
      <div>
        <h3 className="text-lg font-bold text-foreground">Practice Complete!</h3>
        <p className="text-sm text-muted-foreground mt-1">
          You got <span className="font-semibold text-foreground">{known}</span> of{" "}
          <span className="font-semibold text-foreground">{total}</span> words ({pct}%)
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <Button variant="outline" size="sm" onClick={onReset} className="gap-1.5">
          <RotateCcw size={13} />
          Practice Again
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1.5">
          <X size={13} />
          Close
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

interface StoryPracticeSessionProps {
  wordIds: string[];
  onClose: () => void;
}

export default function StoryPracticeSession({ wordIds, onClose }: StoryPracticeSessionProps) {
  const { words, flashcards } = useApp();

  const storyWords = useMemo(
    () => words.filter((w) => wordIds.includes(w.id)),
    [words, wordIds]
  );

  // Build an initial shuffled queue of word IDs
  const buildQueue = useCallback(
    () => shuffle(storyWords.map((w) => w.id)),
    [storyWords]
  );

  const [queue, setQueue] = useState<string[]>(() => buildQueue());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [dontKnowIds, setDontKnowIds] = useState<Set<string>>(new Set());

  const reset = useCallback(() => {
    setQueue(buildQueue());
    setCurrentIdx(0);
    setKnownCount(0);
    setDontKnowIds(new Set());
  }, [buildQueue]);

  const currentWordId = queue[currentIdx];
  const currentWord = storyWords.find((w) => w.id === currentWordId);
  const currentCard = flashcards.find((c) => c.wordId === currentWordId && c.cardType === "recognition");

  const handleKnow = useCallback(() => {
    setKnownCount((n) => n + 1);
    setCurrentIdx((i) => i + 1);
  }, []);

  const handleDontKnow = useCallback(() => {
    setDontKnowIds((prev) => { const s = new Set(prev); s.add(currentWordId); return s; });
    // Requeue 2-3 positions ahead
    setQueue((prev) => {
      const insertAt = Math.min(currentIdx + 3, prev.length);
      const next = [...prev];
      next.splice(insertAt, 0, currentWordId);
      return next;
    });
    setCurrentIdx((i) => i + 1);
  }, [currentWordId, currentIdx]);

  const isDone = currentIdx >= queue.length;

  if (storyWords.length === 0) {
    return (
      <div className="text-center py-6 text-sm text-muted-foreground">
        <BookOpen className="mx-auto mb-2 h-5 w-5 opacity-40" />
        <p>No words to practice yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
          <ChevronRight size={14} className="text-primary" />
          Story Practice
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Reset / Start Over"
          >
            <RotateCcw size={12} />
            Reset
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            title="Close practice"
          >
            <X size={12} />
            Close
          </button>
        </div>
      </div>

      <p className="text-xs text-muted-foreground -mt-2">
        Practice only — this session does not affect your SRS schedule.
      </p>

      {isDone ? (
        <PracticeComplete
          known={knownCount}
          total={storyWords.length}
          onReset={reset}
          onClose={onClose}
        />
      ) : currentWord ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordId}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
          >
            <PracticeCard
              word={currentWord}
              card={currentCard}
              onKnow={handleKnow}
              onDontKnow={handleDontKnow}
              index={currentIdx}
              total={queue.length}
            />
          </motion.div>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
