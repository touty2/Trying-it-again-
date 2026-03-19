/**
 * Story Page — /story/:id
 * Design: Structured Scholar
 *  - Centered, max-w-4xl, generous padding
 *  - No card borders, no box containers, no heavy shadows
 *  - Clean white space reading experience
 *  - CC-CEDICT powered word lookup (118k entries + multi-reading)
 *  - Definition ranking: contextual first, archaic/surname filtered
 *  - Listen Mode: sentence-by-sentence or full-text TTS with mini-player
 *
 * TTS Architecture (v2):
 *  - allSentences: precomputed once via useMemo using splitSentences()
 *  - currentSentenceIndex: single source of truth from useTTS
 *  - Highlight: DOM class-toggle via useEffect — NO React re-render per sentence
 *  - Each span has data-sentence-index="N" for O(1) DOM lookup
 *  - No activeSentence string state — index is the only signal
 */

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Eye, EyeOff, X, Plus, Check, BookMarked, CheckCircle2,
  Headphones, Play, Pause, Square, SkipBack, SkipForward,
  GraduationCap, BookOpen,
} from "lucide-react";
import StoryDeckPanel from "@/components/StoryDeckPanel";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { useSyncNotify } from "@/contexts/SyncContext";
import { cedictSegment, cedictLookup, isCedictLoaded, getAllReadings, type CedictSegment } from "@/lib/cedict";
import { lookupWord } from "@/lib/dictionary";
import { rankReadings } from "@/lib/definitionRanker";
import { useTTS, splitSentences } from "@/hooks/useTTS";
import { useAudioSettings } from "@/hooks/useAudioSettings";
import { GrammarInStory } from "@/components/GrammarInStory";
import { WordPopup } from "@/components/WordPopup";
import { DeckAssignPopup } from "@/components/DeckAssignPopup";
import { useDecks } from "@/hooks/useDecks";
import type { Text } from "@/lib/db";

// ─── Band Config ──────────────────────────────────────────────────────────────

const BAND_PILL: Record<string, string> = {
  "HSK3-I":  "bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50",
  "HSK3-II": "bg-orange-100/70 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50",
  "HSK4-I":  "bg-teal-100/70 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700/50",
  "HSK4-II": "bg-cyan-100/70 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700/50",
  "HSK5-I":  "bg-indigo-100/70 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50",
  "HSK5-II": "bg-violet-100/70 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50",
};

const BAND_LABEL: Record<string, string> = {
  "HSK3-I": "HSK 3-I", "HSK3-II": "HSK 3-II",
  "HSK4-I": "HSK 4-I", "HSK4-II": "HSK 4-II",
  "HSK5-I": "HSK 5-I", "HSK5-II": "HSK 5-II",
};

const SPEED_OPTIONS = [0.75, 0.9, 1.0, 1.1, 1.25, 1.5, 2.0];

// ─── Mini Player ──────────────────────────────────────────────────────────────

interface MiniPlayerProps {
  tts: ReturnType<typeof useTTS>;
  audioSettings: ReturnType<typeof useAudioSettings>;
  onClose: () => void;
  mode: "all" | "sentence";
  /** Called when gender toggle is clicked — parent should restart playback with new voice */
  onGenderChange?: (newGender: "female" | "male") => void;
}

function MiniPlayer({ tts, audioSettings, onClose, mode, onGenderChange }: MiniPlayerProps) {
  const { state, currentSentenceIndex, totalSentences, pause, resume, stop, next, prev, setSpeed, speed } = tts;
  const [showSpeeds, setShowSpeeds] = useState(false);
  const currentGender = audioSettings.settings.storyVoiceGender ?? "female";

  const handleStop = () => {
    stop();
    onClose();
  };

  const toggleGender = () => {
    const nextGender = currentGender === "female" ? "male" : "female";
    audioSettings.update({ storyVoiceGender: nextGender });
    onGenderChange?.(nextGender);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl border border-border/60 bg-card/95 backdrop-blur-md shadow-2xl shadow-black/20"
      style={{ minWidth: 300 }}
    >
      {/* Sentence counter */}
      {mode === "sentence" && totalSentences > 0 && (
        <span className="text-xs text-muted-foreground font-medium mr-1 shrink-0">
          {currentSentenceIndex + 1} / {totalSentences}
        </span>
      )}

      {/* Prev */}
      {mode === "sentence" && (
        <button
          onClick={prev}
          disabled={currentSentenceIndex === 0}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 transition-all"
          title="Previous sentence"
        >
          <SkipBack size={15} />
        </button>
      )}

      {/* Play / Pause */}
      <button
        onClick={state === "playing" ? pause : resume}
        className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all active:scale-95"
        title={state === "playing" ? "Pause" : "Resume"}
      >
        {state === "playing" ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Next */}
      {mode === "sentence" && (
        <button
          onClick={next}
          disabled={currentSentenceIndex >= totalSentences - 1}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 transition-all"
          title="Next sentence"
        >
          <SkipForward size={15} />
        </button>
      )}

      {/* Stop */}
      <button
        onClick={handleStop}
        className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        title="Stop"
      >
        <Square size={14} />
      </button>

      {/* Speed selector */}
      <div className="relative ml-1">
        <button
          onClick={() => setShowSpeeds((v) => !v)}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-muted/50 transition-all"
        >
          {speed === 1.0 ? "1×" : `${speed}×`}
        </button>
        {showSpeeds && (
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl shadow-xl overflow-hidden py-1 z-50">
            {SPEED_OPTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setSpeed(s);
                  audioSettings.update({ playbackSpeed: s });
                  setShowSpeeds(false);
                }}
                className={[
                  "w-full px-4 py-1.5 text-xs font-medium text-left hover:bg-muted/50 transition-colors",
                  s === speed ? "text-primary" : "text-foreground",
                ].join(" ")}
              >
                {s === 1.0 ? "1× (Normal)" : s === 0.75 ? "0.75× (Slow)" : s === 2.0 ? "2× (Fast)" : `${s}×`}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Voice gender toggle */}
      <button
        onClick={toggleGender}
        className="ml-1 flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        title={`Switch to ${currentGender === 'female' ? 'male' : 'female'} voice`}
      >
        {currentGender === "female" ? "♀" : "♂"}
      </button>

      {/* Close */}
      <button
        onClick={handleStop}
        className="ml-1 p-1 text-muted-foreground hover:text-foreground transition-colors"
        title="Close player"
      >
        <X size={13} />
      </button>
    </motion.div>
  );
}

// ─── Segmented Text ───────────────────────────────────────────────────────────

interface SegmentedTextProps {
  text: string;
  textId: string;
  /** Index into the global allSentences array. -1 = no highlight. */
  activeSentenceIndex: number;
  /** The full global sentence array (same as useMemo in parent). */
  allSentences: string[];
  onSpeak: (text: string) => void;
  /** Set of Chinese strings to highlight as grammar patterns (amber wavy underline). */
  grammarPatterns?: Set<string>;
  /** charIndex within the current sentence from onboundary event, -1 when idle */
  activeCharIndex?: number;
}

/**
 * SegmentedText renders the Chinese text with clickable words and TTS highlight.
 *
 * Highlight strategy (no re-render per sentence):
 *  1. Each span gets data-sentence-index="N" where N is the global sentence index.
 *  2. A useEffect watches activeSentenceIndex and directly toggles the CSS class
 *     "tts-active" on matching DOM elements — no React state change, no re-render.
 *  3. CSS for .tts-active is in index.css (background highlight).
 *  4. Scroll: scrollIntoView on the first span with the active index.
 */
function SegmentedText({ text, textId, activeSentenceIndex, allSentences, onSpeak, grammarPatterns, activeCharIndex = -1 }: SegmentedTextProps) {
  const [activeSegment, setActiveSegment] = useState<{
    segment: CedictSegment;
    position: { x: number; y: number };
    key: number;
    sentence: string;
  } | null>(null);
  const { isWordInDeck } = useApp();
  const [dictReady, setDictReady] = useState(isCedictLoaded());
  // Increment to force re-segmentation after user applies a correction
  const [segVersion, setSegVersion] = useState(0);
  const handleSegmentationFixed = useCallback(() => {
    setActiveSegment(null);
    setSegVersion((v) => v + 1);
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dictReady) return;
    const interval = setInterval(() => {
      if (isCedictLoaded()) {
        setDictReady(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [dictReady]);

  // ── Sentence-level highlight via DOM class-toggle (no React re-render) ─────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove sentence highlight from all previously highlighted spans
    container.querySelectorAll<HTMLElement>(".tts-active").forEach((el) => {
      el.classList.remove("tts-active");
    });

    if (activeSentenceIndex < 0) return;

    // Add sentence highlight to all spans with the active sentence index
    const selector = `[data-sentence-index="${activeSentenceIndex}"]`;
    const spans = container.querySelectorAll<HTMLElement>(selector);
    let firstEl: HTMLElement | null = null;
    spans.forEach((el) => {
      el.classList.add("tts-active");
      if (!firstEl) firstEl = el;
    });

    // Smooth scroll to first span of the active sentence
    if (firstEl) {
      (firstEl as HTMLElement).scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [activeSentenceIndex]);

  // ── Word-level highlight via onboundary charIndex ─────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove word highlight from previously highlighted span
    container.querySelectorAll<HTMLElement>(".tts-word-active").forEach((el) => {
      el.classList.remove("tts-word-active");
    });

    if (activeCharIndex < 0 || activeSentenceIndex < 0) return;

    // Find the span whose char range contains activeCharIndex
    // Spans have data-char-start and data-char-end attributes (within-sentence offsets)
    const sentenceSpans = container.querySelectorAll<HTMLElement>(
      `[data-sentence-index="${activeSentenceIndex}"][data-char-start]`
    );
    sentenceSpans.forEach((el) => {
      const start = parseInt(el.getAttribute("data-char-start") ?? "-1", 10);
      const end = parseInt(el.getAttribute("data-char-end") ?? "-1", 10);
      if (start >= 0 && activeCharIndex >= start && activeCharIndex < end) {
        el.classList.add("tts-word-active");
      }
    });
  }, [activeCharIndex, activeSentenceIndex]);

  const tapKeyRef = useRef(0);

  const handleWordClick = useCallback((segment: CedictSegment, sentence: string, e: React.MouseEvent) => {
    if (!/[\u4e00-\u9fff\u3400-\u4dbf]/.test(segment.text)) return;
    e.stopPropagation();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    tapKeyRef.current += 1;
    setActiveSegment({ segment, position: { x: rect.left, y: rect.bottom }, key: tapKeyRef.current, sentence });
  }, []);

  const handleClose = useCallback(() => setActiveSegment(null), []);
  const activeText = activeSegment?.segment.text ?? null;
  const paragraphs = text.split("\n\n").filter(Boolean);

  if (!dictReady) {
    return (
      <div ref={containerRef}>
        {paragraphs.map((para, pIdx) => (
          <p
            key={pIdx}
            className="mb-6 last:mb-0"
            style={{
              fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)",
              fontSize: "var(--reading-font-size, 1.1rem)",
              lineHeight: "var(--reading-line-height, 2.6)",
              marginBottom: "var(--reading-para-spacing, 1.6rem)",
            }}
          >
            {para}
          </p>
        ))}
        <p className="text-xs text-muted-foreground mt-2 animate-pulse">Loading dictionary…</p>
      </div>
    );
  }

  // Build a char-offset → global-sentence-index map for the full text.
  // This maps each character position to its sentence index in allSentences.
  const charToSentenceIndex: number[] = [];
  {
    let offset = 0;
    for (let si = 0; si < allSentences.length; si++) {
      const sent = allSentences[si];
      for (let ci = 0; ci < sent.length; ci++) {
        charToSentenceIndex[offset + ci] = si;
      }
      offset += sent.length;
    }
  }

  // Track global char position across paragraphs
  // Paragraphs are split by "\n\n" which is stripped, so account for the separators
  const paraOffsets: number[] = [];
  {
    let pos = 0;
    const parts = text.split("\n\n");
    for (const part of parts) {
      if (part) {
        paraOffsets.push(pos);
        pos += part.length + 2; // +2 for the "\n\n" separator
      }
    }
  }

  return (
    <div ref={containerRef}>
      {paragraphs.map((para, pIdx) => {
        // segVersion in the key forces re-render when user applies a correction
        const paraSegments = cedictSegment(para, segVersion);
        const paraStart = paraOffsets[pIdx] ?? 0;

        let charPos = 0;

        return (
          <p
            key={pIdx}
            className="last:mb-0"
            style={{
              fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)",
              fontSize: "var(--reading-font-size, 1.1rem)",
              lineHeight: "var(--reading-line-height, 2.6)",
              marginBottom: "var(--reading-para-spacing, 1.6rem)",
            }}
          >
            {paraSegments.map((seg, sIdx) => {
              const segGlobalStart = paraStart + charPos;
              charPos += seg.text.length;

              // Look up the sentence index for the first char of this segment
              const sentIdx = charToSentenceIndex[segGlobalStart] ?? -1;

              // Compute char offset within the sentence (for word-level TTS highlight)
              const sentStart = sentIdx >= 0
                ? allSentences.slice(0, sentIdx).reduce((acc, s) => acc + s.length, 0)
                : -1;
              const charWithinSentStart = sentStart >= 0 ? segGlobalStart - sentStart : -1;
              const charWithinSentEnd = charWithinSentStart >= 0 ? charWithinSentStart + seg.text.length : -1;

              const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf]/.test(seg.text);
              const inDeck = isChinese && isWordInDeck(seg.text);

              if (!isChinese) {
                return (
                  <span
                    key={sIdx}
                    data-sentence-index={sentIdx >= 0 ? sentIdx : undefined}
                    className="text-foreground/60 transition-colors duration-200"
                  >
                    {seg.text}
                  </span>
                );
              }

              const isActive = activeText === seg.text;
              const isGrammar = !!(grammarPatterns && grammarPatterns.size > 0 && grammarPatterns.has(seg.text));

              return (
                <span
                  key={sIdx}
                  data-sentence-index={sentIdx >= 0 ? sentIdx : undefined}
                  data-char-start={charWithinSentStart >= 0 ? charWithinSentStart : undefined}
                  data-char-end={charWithinSentEnd >= 0 ? charWithinSentEnd : undefined}
                  onClick={(e) => handleWordClick(seg, allSentences[sentIdx] ?? para, e)}
                  className={[
                    "cursor-pointer rounded px-0.5 transition-colors duration-200",
                    isGrammar ? "grammar-highlight" : "",
                    isActive
                      ? "bg-primary/15 dark:bg-primary/25 text-primary ring-1 ring-primary/30"
                      : inDeck
                        ? "text-emerald-600 dark:text-emerald-400 underline decoration-emerald-300 dark:decoration-emerald-600 decoration-dotted underline-offset-2 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                        : "hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary",
                  ].join(" ")}
                  style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                >
                  {seg.text}
                </span>
              );
            })}
          </p>
        );
      })}

      <AnimatePresence>
        {activeSegment && (
          <WordPopup
            key={activeSegment.key}
            segment={activeSegment.segment}
            position={activeSegment.position}
            onClose={handleClose}
            sourceTextId={textId}
            sentence={activeSegment.sentence}
            onSpeak={onSpeak}
            onSegmentationFixed={handleSegmentationFixed}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Recommended Vocabulary ───────────────────────────────────────────────────

function RecommendedVocabInner({ wordIds, textId }: { wordIds: string[]; textId: string }) {
  const { addWordToDeck, isWordInDeck, settings } = useApp();
  const decksMgr = useDecks();
  const [ignored, setIgnored] = useState<Set<string>>(new Set());
  const [addedSet, setAddedSet] = useState<Set<string>>(new Set());
  const [pendingWord, setPendingWord] = useState<string | null>(null);

  const visible = wordIds.filter((entry) => !ignored.has(entry));
  if (visible.length === 0) return null;

  const resolveEntry = (hanzi: string) => {
    const trimmed = hanzi.trim();
    const readings = getAllReadings(trimmed);
    if (readings) {
      const ranked = rankReadings(trimmed, readings);
      return { hanzi: trimmed, pinyin: ranked.primary.pinyin, def: ranked.primary.meanings[0] ?? "" };
    }
    const cedict = cedictLookup(trimmed);
    if (cedict) return { hanzi: trimmed, pinyin: cedict.pinyin, def: cedict.definition };
    const local = lookupWord(trimmed);
    return { hanzi: trimmed, pinyin: local?.pinyin ?? "", def: local?.definition ?? "" };
  };

  return (
    <>
    <div className="divide-y divide-border/40">
        {visible.map((entry) => {
          const info = resolveEntry(entry);
          const inDeck = isWordInDeck(info.hanzi) || addedSet.has(info.hanzi);
          return (
            <div key={entry} className="flex items-center justify-between py-4 gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2.5 flex-wrap">
                  <span className="text-xl font--semibold text-foreground" style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}>
                    {info.hanzi}
                  </span>
                  {info.pinyin && <span className="text-sm text-primary font-medium">{info.pinyin}</span>}
                </div>
                {info.def && <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{info.def}</p>}
              </div>
              {inDeck ? (
                <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium shrink-0">
                  <Check size={14} />
                  In deck
                </div>
              ) : (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1.5 shrink-0"
                    onClick={() => {
                      // If only Main Deck exists, skip popup and add directly
                      if (decksMgr.decks.filter((d) => !d.isMain).length === 0) {
                        addWordToDeck(info.hanzi, textId).then((result) => {
                          if (result.success) {
                            setAddedSet((prev) => new Set([...Array.from(prev), info.hanzi]));
                            toast.success(`Added "${info.hanzi}" to deck`);
                          } else if (result.alreadyExists) {
                            toast.info("Already in your deck");
                          } else if (result.capReached && settings.showCapReachedPopup) {
                            toast.warning(`Daily cap reached`);
                          }
                        });
                      } else {
                        setPendingWord(info.hanzi);
                      }
                    }}
                  >
                    <Plus size={13} />
                    Add
                  </Button>
                  <button
                    onClick={() => setIgnored((prev) => { const next = new Set(Array.from(prev)); next.add(entry); return next; })}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:border-foreground/30 active:scale-95 transition-all"
                  >
                    Ignore
                  </button>
                </>
              )}
            </div>
          );
        })}
    </div>
      {/* Deck assignment popup */}
      {pendingWord && (
        <DeckAssignPopup
          open={!!pendingWord}
          onClose={() => setPendingWord(null)}
          decks={decksMgr.decks}
          hanzi={pendingWord}
          onConfirm={async (deckIds) => {
            const word = pendingWord;
            // Always add to main deck via AppContext (for SRS tracking)
            const result = await addWordToDeck(word, textId);
            // Also add to any additional custom decks
            const customDeckIds = deckIds.filter((id) => {
              const d = decksMgr.decks.find((dk) => dk.id === id);
              return d && !d.isMain;
            });
            if (customDeckIds.length > 0) {
              await decksMgr.addWordToDecks(word, customDeckIds);
            }
            if (result.success || result.alreadyExists) {
              setAddedSet((prev) => new Set([...Array.from(prev), word]));
              toast.success(`Added "${word}" to ${deckIds.length} deck${deckIds.length !== 1 ? "s" : ""}`);
            } else if (result.capReached && settings.showCapReachedPopup) {
              toast.warning(`Daily cap reached`);
            }
          }}
        />
      )}
    </>
  );
}

// ─── Story Page ─────────────────────────────────────────────────────────────────

export default function StoryPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { texts, isLoading, completedTextIds, markTextCompleted, unmarkTextCompleted } = useApp();
  const notifyChange = useSyncNotify();
  const [showTranslation, setShowTranslation] = useState(false);
  const [listenMode, setListenMode] = useState<"all" | "sentence" | null>(null);
  const [grammarHighlightOn, setGrammarHighlightOn] = useState(false);
  const [grammarPatterns, setGrammarPatterns] = useState<Set<string>>(new Set());

  const { settings: audioSettings, update: updateAudioSettings } = useAudioSettings();

  const text: Text | undefined = texts.find((t) => t.id === id);

  // Track last-read story for Dashboard "Continue Reading" card
  useEffect(() => {
    if (text) {
      localStorage.setItem("lastReadStoryId", text.id);
    }
  }, [text]);

  // ── Precompute sentences ONCE — single source of truth for TTS + highlight ──
  const allSentences = useMemo(() => {
    if (!text) return [];
    return splitSentences(text.chineseText);
  }, [text]);

  const tts = useTTS({
    preferredVoiceURI: audioSettings.preferredVoiceURI,
    defaultSpeed: audioSettings.playbackSpeed,
    voiceGender: audioSettings.storyVoiceGender,
  });

  // Stop TTS when leaving the page
  useEffect(() => {
    return () => {
      tts.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Single source of truth: activeSentenceIndex ──────────────────────────
  // -1 when idle (no highlight), tts.currentSentenceIndex when playing/paused
  const activeSentenceIndex = tts.state === "idle" ? -1 : tts.currentSentenceIndex;

  const handlePlayAll = useCallback(() => {
    if (!text) return;
    setListenMode("all");
    tts.playAll(text.chineseText);
  }, [text, tts]);

  const handlePlaySentence = useCallback(() => {
    if (!text || allSentences.length === 0) return;
    setListenMode("sentence");
    tts.playSentence(allSentences, 0);
  }, [text, allSentences, tts]);

  const handlePlayerClose = useCallback(() => {
    tts.stop();
    setListenMode(null);
  }, [tts]);

  const handleSpeak = useCallback((word: string) => {
    tts.speakWord(word);
  }, [tts]);

  // When gender is toggled mid-playback, restart from the current sentence
  // so the new voice takes effect immediately (voiceGenderRef updates but the
  // already-queued utterance uses the old voice).
  const handleGenderChange = useCallback(() => {
    if (!text || tts.state === "idle") return;
    const idx = tts.currentSentenceIndex;
    if (listenMode === "sentence") {
      // Small delay to let voiceGenderRef update before restarting
      setTimeout(() => tts.playSentence(allSentences, idx), 50);
    } else if (listenMode === "all") {
      setTimeout(() => tts.playSentence(allSentences, idx), 50);
    }
  }, [text, tts, listenMode, allSentences]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!text) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <p className="text-muted-foreground mb-4">Story not found.</p>
        <Button variant="outline" onClick={() => navigate("/sessions")}>
          <ArrowLeft size={14} className="mr-1.5" />
          Back to list
        </Button>
      </div>
    );
  }

  const bandLabel = BAND_LABEL[text.band] ?? text.band;
  const bandPill = BAND_PILL[text.band] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      {/* Back button */}
      <button
        onClick={() => navigate("/sessions")}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
      >
        <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
        All stories
      </button>

      {/* Story header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${bandPill}`}>
            {bandLabel}
          </span>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground leading-snug">
          {text.englishTitle || text.title}
        </h1>
        {text.englishTitle && (
          <p className="mt-1.5 text-base text-muted-foreground" style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}>
            {text.title}
          </p>
        )}

        {/* Mark as Read button */}
        <div className="flex items-center gap-2 mt-4">
          {!completedTextIds.has(text.id) ? (
            <button
              onClick={() => { markTextCompleted(text.id); notifyChange(); }}
              className="flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-lg border border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
            >
              <Check size={14} />
              Mark as Read
            </button>
          ) : (
            <button
              onClick={() => { unmarkTextCompleted(text.id); notifyChange(); }}
              className="flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-all"
            >
              <CheckCircle2 size={14} />
              Completed
            </button>
          )}
        </div>

        {/* Listen Mode buttons */}
        {tts.hasSpeech && (
          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={listenMode ? handlePlayerClose : handlePlayAll}
              className={[
                "flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-lg border transition-all",
                listenMode === "all" && tts.state !== "idle"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
              ].join(" ")}
            >
              <Headphones size={14} />
              {listenMode === "all" && tts.state !== "idle" ? "Listening…" : "Listen"}
            </button>
            <button
              onClick={listenMode === "sentence" && tts.state !== "idle" ? handlePlayerClose : handlePlaySentence}
              className={[
                "flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-lg border transition-all",
                listenMode === "sentence" && tts.state !== "idle"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30",
              ].join(" ")}
            >
              <Play size={13} />
              Sentence by sentence
            </button>
          </div>
        )}
      </div>

      {/* Chinese text */}
      <div className="text-foreground">
        <SegmentedText
          text={text.chineseText}
          textId={text.id}
          activeSentenceIndex={activeSentenceIndex}
          activeCharIndex={tts.state === "idle" ? -1 : tts.activeCharIndex}
          allSentences={allSentences}
          onSpeak={handleSpeak}
          grammarPatterns={grammarPatterns}
        />
      </div>

      {/* Translation toggle */}
      <div className="mt-8 flex items-center gap-2">
        <button
          onClick={() => setShowTranslation((v) => !v)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
          {showTranslation ? "Hide translation" : "Show English translation"}
        </button>
      </div>

      {/* English translation */}
      <AnimatePresence>
        {showTranslation && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-4 pt-4 border-t border-border/30"
          >
            <div className="space-y-4">
              {text.englishTranslation.split(/\n\n|\n/).filter(Boolean).map((para, i) => (
                <p key={i} className="text-[0.95rem] text-muted-foreground leading-[1.85]">{para}</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom accordion: Vocab / Grammar / Deck ── */}
      <Accordion type="multiple" className="mt-10 border border-border/50 rounded-xl overflow-hidden divide-y divide-border/50">

        {/* Vocabulary */}
        {text.recommendedVocabulary.length > 0 && (
          <AccordionItem value="vocab" className="border-0">
            <AccordionTrigger className="px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&>svg]:ml-1">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <BookMarked size={15} className="text-primary" />
                Vocabulary
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {text.recommendedVocabulary.length}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-2">
              <RecommendedVocabInner wordIds={text.recommendedVocabulary} textId={text.id} />
            </AccordionContent>
          </AccordionItem>
        )}

        {/* Grammar */}
        <AccordionItem value="grammar" className="border-0">
          <AccordionTrigger className="px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&>svg]:ml-1">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <GraduationCap size={15} className="text-primary" />
              Grammar
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-0 pb-0">
            <GrammarInStory
              textId={text.id}
              highlightOn={grammarHighlightOn}
              onToggleHighlight={() => setGrammarHighlightOn((v) => !v)}
              onPatternsChange={setGrammarPatterns}
            />
          </AccordionContent>
        </AccordionItem>

        {/* Story Deck */}
        <AccordionItem value="deck" className="border-0">
          <AccordionTrigger className="px-5 py-3.5 hover:no-underline hover:bg-muted/30 transition-colors [&>svg]:ml-1">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <BookOpen size={15} className="text-primary" />
              Story Deck
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-2">
            <StoryDeckPanel storyId={text.id} storyTitle={text.title} />
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      {/* Bottom back button */}
      <div className="mt-12 pt-8 border-t border-border/30">
        <button
          onClick={() => navigate("/sessions")}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
        >
          <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to all stories
        </button>
      </div>

      {/* Floating mini player */}
      <AnimatePresence>
        {listenMode && tts.state !== "idle" && (
          <MiniPlayer
            tts={tts}
            audioSettings={{ settings: audioSettings, update: updateAudioSettings, reset: () => {} }}
            onClose={handlePlayerClose}
            mode={listenMode}
            onGenderChange={handleGenderChange}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
