/**
 * WordPopup — shared word lookup popup for StoryPage and VideoLearningPage.
 *
 * Features:
 *  - Pinyin + labeled definitions from CC-CEDICT
 *  - Add to Deck button
 *  - Refresh Definition: re-queries dictionary and shows alternative segmentations
 *  - Merge/Split controls: user can correct segmentation errors
 *  - Local fix persistence via SegmentationOverrideDB (IndexedDB, v7)
 *  - Cloud sync via trpc.sync.pushSegmentationOverrides
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Check, RefreshCw, ChevronDown, Scissors, Merge, Trash2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import { useSyncNotify } from "@/contexts/SyncContext";
import { trpc } from "@/lib/trpc";
import {
  cedictLookup,
  getAllReadings,
  getAlternativeSegmentations,
  setSegmentationOverride,
  deleteSegmentationOverride as cedictDeleteOverride,
  type CedictSegment,
} from "@/lib/cedict";
import { lookupWord } from "@/lib/dictionary";
import { getGrammarLabel } from "@/lib/grammarLabel";
import { rankReadings, getPosHint, getContextualLabel, splitMeanings } from "@/lib/definitionRanker";
import { toTonePinyin } from "@/lib/pinyin";
import { formatDefinitionsWithLabels, LABEL_STYLES } from "@/lib/formatDefinitions";
import { SegmentationOverrideDB } from "@/lib/db";
import { getBestZhVoice } from "@/hooks/useTTS";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Build per-character pinyin for a multi-char word by concatenating each
 * character's primary pinyin reading. Used as a fallback for proper names
 * that are not in CEDICT as a unit (e.g. 王小雨 → "Wáng Xiǎo Yǔ").
 */
function buildCharByCharPinyin(hanzi: string): string | null {
  const parts: string[] = [];
  for (const ch of hanzi) {
    const entry = cedictLookup(ch);
    if (!entry) return null;
    // Capitalise first letter of each syllable for names
    const syllable = entry.pinyin.trim();
    parts.push(syllable.charAt(0).toUpperCase() + syllable.slice(1));
  }
  return parts.join(" ");
}

function resolveWordInfo(hanzi: string) {
  const cedict = cedictLookup(hanzi);
  if (cedict) return { pinyin: cedict.pinyin, definition: cedict.definition };
  const local = lookupWord(hanzi);
  if (local) return { pinyin: local.pinyin, definition: local.definition };
  return null;
}

function buildLabeledDefs(hanzi: string, sentence?: string, isProperNameHint?: boolean) {
  const allReadings = getAllReadings(hanzi);
  const ranked = allReadings ? rankReadings(hanzi, allReadings, sentence) : null;
  const legacyInfo = !allReadings ? resolveWordInfo(hanzi) : null;
  const legacyMeanings = legacyInfo ? splitMeanings(legacyInfo.definition) : [];
  const otherModern = ranked?.modern ?? [];
  const surnameReadings = ranked?.surname ?? [];
  const archaicReadings = ranked?.archaic ?? [];
  const labeled = ranked
    ? formatDefinitionsWithLabels({
        primaryMeanings: ranked.primary.meanings,
        otherModernMeanings: otherModern.map((r) => r.meanings),
        surnameMeanings: surnameReadings.map((r) => r.meanings),
        archaicMeanings: archaicReadings.map((r) => r.meanings),
        maxItems: 6,
      })
    : legacyMeanings.map((m, i) => ({
        text: m,
        label: (i === 0 ? "common" : "less common") as import("@/lib/formatDefinitions").FrequencyLabel,
      }));
  // isProperName: prefer the hint from the segmenter (most accurate), fall back to ranker
  const isProperName = isProperNameHint ?? (ranked?.isProperName ?? false);
  // For proper names not in CEDICT as a unit, build pinyin char-by-char (e.g. 王小雨 → Wáng Xiǎo Yǔ)
  const rawPinyin = ranked?.primary.pinyin ?? legacyInfo?.pinyin ?? null;
  const primaryPinyin = rawPinyin ?? (isProperName && hanzi.length > 1 ? buildCharByCharPinyin(hanzi) : null);
  const posHint = sentence ? getPosHint(hanzi, sentence) : null;
  const grammarLabel = getGrammarLabel(hanzi, ranked?.primary.raw ?? legacyInfo?.definition ?? "");
  const contextualLabel = getContextualLabel(hanzi, posHint, isProperName);
  // Fallback: if all meanings were filtered out but CEDICT has data, show the raw first meaning
  // This handles words where all entries are surnames/archaic but the word still has a real meaning
  let finalLabeled = labeled;
  if (labeled.length === 0) {
    if (isProperName) {
      finalLabeled = [{ text: "Chinese personal name", label: "common" as import("@/lib/formatDefinitions").FrequencyLabel }];
    } else if (ranked && ranked.primary.meanings.length > 0) {
      // Show the raw first meaning from CEDICT even if it was filtered
      const rawFirst = ranked.primary.meanings[0];
      finalLabeled = [{ text: rawFirst, label: "common" as import("@/lib/formatDefinitions").FrequencyLabel }];
    } else if (allReadings && allReadings.length > 0) {
      // Last resort: show the raw definition string from the first reading
      // getAllReadings returns [pinyin, definition] tuples
      const rawDef = allReadings[0][1].split("/")[0].trim();
      if (rawDef) finalLabeled = [{ text: rawDef, label: "common" as import("@/lib/formatDefinitions").FrequencyLabel }];
    } else if (legacyInfo?.definition) {
      finalLabeled = [{ text: legacyInfo.definition, label: "common" as import("@/lib/formatDefinitions").FrequencyLabel }];
    }
  }
  return { labeled: finalLabeled, primaryPinyin, grammarLabel, isProperName, contextualLabel };
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WordPopupProps {
  segment: CedictSegment;
  position: { x: number; y: number };
  onClose: () => void;
  sourceTextId?: string | null;
  sentence?: string;
  onSpeak?: (text: string) => void;
  /** Called when the user applies a segmentation correction — parent should re-segment */
  onSegmentationFixed?: () => void;
  /** Whether to use createPortal (VideoLearningPage needs this) */
  usePortal?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WordPopup({
  segment,
  position,
  onClose,
  sourceTextId,
  sentence,
  onSpeak,
  onSegmentationFixed,
  usePortal = false,
}: WordPopupProps) {
  const { addWordToDeck, isWordInDeck, settings } = useApp();
  const notifyChange = useSyncNotify();
  const pushOverrides = trpc.sync.pushSegmentationOverrides.useMutation();
  const deleteOverride = trpc.sync.deleteSegmentationOverride.useMutation();

  const [added, setAdded] = useState(false);
  const [showAltSegs, setShowAltSegs] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [defs, setDefs] = useState(() => buildLabeledDefs(segment.text, sentence, segment.isProperName));
  const [altSegs, setAltSegs] = useState<Array<{ segments: string[]; allDefined: boolean }>>([]);
  const [applyingKey, setApplyingKey] = useState<string | null>(null);

  const popupRef = useRef<HTMLDivElement>(null);
  const inDeck = isWordInDeck(segment.text);
  const hasData = defs.labeled.length > 0;

  // Close on outside click
  useEffect(() => {
    function handleOutside(e: MouseEvent | TouchEvent) {
      const target = e instanceof TouchEvent
        ? (e.touches[0]?.target ?? e.changedTouches[0]?.target)
        : (e as MouseEvent).target;
      if (popupRef.current && target instanceof Node && !popupRef.current.contains(target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleOutside as EventListener);
    document.addEventListener("touchstart", handleOutside as EventListener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handleOutside as EventListener);
      document.removeEventListener("touchstart", handleOutside as EventListener);
    };
  }, [onClose]);

  const style: React.CSSProperties = {
    position: "fixed",
    left: Math.min(Math.max(8, position.x), window.innerWidth - 310),
    top: Math.min(position.y + 8, window.innerHeight - 460),
    zIndex: 1000,
  };

  // ── Add to deck ──────────────────────────────────────────────────────────────
  const handleAdd = async () => {
    const result = await addWordToDeck(segment.text, sourceTextId ?? null);
    if (result.alreadyExists) {
      toast.info("Already in your deck");
    } else if (result.capReached) {
      if (settings.showCapReachedPopup) {
        toast.warning(`Daily new word cap (${settings.dailyNewWordCap}) reached!`, {
          description: "Increase your cap in Settings to add more words today.",
        });
      }
    } else if (result.success) {
      setAdded(true);
      toast.success(`Added "${segment.text}" to deck`);
    }
  };

  // ── Speak ────────────────────────────────────────────────────────────────────
  const handleSpeak = () => {
    if (onSpeak) { onSpeak(segment.text); return; }
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(segment.text);
    utt.lang = "zh-CN";
    utt.rate = 0.9;
    const voice = getBestZhVoice(null);
    if (voice) utt.voice = voice;
    window.speechSynthesis.speak(utt);
  };

  // ── Refresh definition ───────────────────────────────────────────────────────
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    // Re-derive definitions (dictionary is already loaded in memory)
    setDefs(buildLabeledDefs(segment.text, sentence, segment.isProperName));
    // Compute alternative segmentations
    const alts = getAlternativeSegmentations(segment.text);
    setAltSegs(alts);
    setShowAltSegs(true);
    setIsRefreshing(false);
  }, [segment.text, sentence]);

  // ── Apply segmentation correction ────────────────────────────────────────────
  const handleApplyCorrection = useCallback(async (splits: string[]) => {
    const key = `global:${segment.text}`;
    setApplyingKey(splits.join("|"));
    try {
      // 1. Apply to in-memory cedict engine immediately
      setSegmentationOverride(key, splits);
      // 2. Persist to IndexedDB
      await SegmentationOverrideDB.put(key, splits);
      // 3. Try to sync to cloud (non-blocking — user may not be logged in)
      pushOverrides.mutate(
        { items: [{ key, splits }] },
        {
          onError: () => {
            // Silently fail — local fix is already saved
          },
        }
      );
      notifyChange();
      toast.success(
        `Segmentation fixed: ${splits.join(" + ")}`,
        { description: "This correction is saved and will apply everywhere." }
      );
      onSegmentationFixed?.();
      onClose();
    } catch (err) {
      console.error("[WordPopup] Failed to save segmentation override:", err);
      toast.error("Failed to save correction");
    } finally {
      setApplyingKey(null);
    }
  }, [segment.text, pushOverrides, notifyChange, onSegmentationFixed, onClose]);

  // ── Remove existing correction ───────────────────────────────────────────────
  const handleRemoveCorrection = useCallback(async () => {
    const key = `global:${segment.text}`;
    try {
      cedictDeleteOverride(key);
      await SegmentationOverrideDB.delete(key);
      deleteOverride.mutate({ key }, { onError: () => {} });
      toast.success("Correction removed");
      onSegmentationFixed?.();
      onClose();
    } catch {
      toast.error("Failed to remove correction");
    }
  }, [segment.text, onSegmentationFixed, onClose]);

  const isUserOverride = segment.isUserOverride ?? false;

  // ── Render ───────────────────────────────────────────────────────────────────
  const content = (
    <motion.div
      ref={popupRef}
      style={style}
      initial={{ opacity: 0, scale: 0.93, y: -6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93, y: -6 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="w-[19rem] rounded-xl border border-border bg-card shadow-xl shadow-black/10 overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border/50">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-end gap-2.5 flex-wrap">
              <p
                className="text-3xl font-bold leading-none text-foreground"
                style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
              >
                {segment.text}
              </p>
              <button
                onClick={handleSpeak}
                className="mb-0.5 text-muted-foreground hover:text-primary transition-colors"
                title="Listen"
              >
                <Volume2 size={14} />
              </button>
            </div>
            {defs.primaryPinyin && (
              <p className="text-sm text-primary font-medium mt-1 leading-tight">{toTonePinyin(defs.primaryPinyin)}</p>
            )}
            <div className="flex flex-wrap gap-1 mt-1.5">
              {defs.grammarLabel && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50">
                  {defs.grammarLabel}
                </span>
              )}
              {defs.isProperName && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100/70 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700/50">
                  name
                </span>
              )}
              {!defs.isProperName && segment.text.length >= 2 && defs.labeled.length > 0 && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100/70 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50">
                  compound
                </span>
              )}
              {isUserOverride && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-100/70 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50">
                  corrected
                </span>
              )}
              {segment.isUnknown && !isUserOverride && (
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-rose-100/70 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-700/50">
                  unknown
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors mt-0.5 shrink-0">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* Definitions */}
      <div className="px-4 pt-3 pb-2 max-h-48 overflow-y-auto">
        {defs.labeled.length > 0 ? (
          <ul className="space-y-1.5">
            {defs.labeled.map((item, i) => (
              <li key={i} className="text-sm leading-snug">
                <span className={i === 0 ? "text-foreground font-medium" : "text-foreground/80"}>{item.text}</span>
                {" "}
                <span className={`text-xs ${LABEL_STYLES[item.label]}`}>({item.label})</span>
              </li>
            ))}
          </ul>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground italic">No definition found</p>
            {segment.text.length > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                This may be a segmentation error. Use "Fix segmentation" below to correct it.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Segmentation correction panel */}
      <div className="px-4 pb-1">
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          <RefreshCw size={11} className={isRefreshing ? "animate-spin" : ""} />
          {showAltSegs ? "Hide alternatives" : "Fix segmentation"}
          <ChevronDown size={11} className={`transition-transform ${showAltSegs ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {showAltSegs && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="pb-2 space-y-1.5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium mb-2">
                  Choose correct split:
                </p>
                {altSegs.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic">No alternatives found</p>
                ) : (
                  altSegs.map((alt) => {
                    const key = alt.segments.join("|");
                    const isApplying = applyingKey === key;
                    return (
                      <button
                        key={key}
                        onClick={() => handleApplyCorrection(alt.segments)}
                        disabled={isApplying}
                        className={[
                          "w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs border transition-all",
                          alt.allDefined
                            ? "border-emerald-200 dark:border-emerald-700/50 bg-emerald-50/50 dark:bg-emerald-900/20 hover:bg-emerald-100/70 dark:hover:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200"
                            : "border-border bg-muted/30 hover:bg-muted/60 text-foreground/70",
                        ].join(" ")}
                      >
                        <span className="flex items-center gap-1 flex-wrap">
                          {alt.segments.map((s, i) => (
                            <span key={i} className="flex items-center gap-0.5">
                              {i > 0 && <span className="text-muted-foreground">+</span>}
                              <span
                                className="font-medium"
                                style={{ fontFamily: "var(--reading-font-family, 'Noto Sans SC', sans-serif)" }}
                              >
                                {s}
                              </span>
                            </span>
                          ))}
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          {alt.allDefined && (
                            <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">✓ defined</span>
                          )}
                          {isApplying ? (
                            <RefreshCw size={10} className="animate-spin" />
                          ) : (
                            <Scissors size={10} />
                          )}
                        </span>
                      </button>
                    );
                  })
                )}

                {isUserOverride && (
                  <button
                    onClick={handleRemoveCorrection}
                    className="w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs border border-rose-200 dark:border-rose-700/50 bg-rose-50/50 dark:bg-rose-900/20 hover:bg-rose-100/70 dark:hover:bg-rose-900/40 text-rose-700 dark:text-rose-400 transition-all"
                  >
                    <Trash2 size={10} />
                    Remove my correction
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action */}
      <div className="px-4 pb-4 pt-1">
        {inDeck || added ? (
          <div className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <Check size={14} />
            In deck
          </div>
        ) : hasData ? (
          <Button size="sm" className="w-full gap-1.5" onClick={handleAdd}>
            <Plus size={14} />
            Add to Deck
          </Button>
        ) : (
          <Button size="sm" variant="outline" className="w-full gap-1.5" onClick={handleAdd}>
            <Plus size={14} />
            Add characters to Deck
          </Button>
        )}
      </div>
    </motion.div>
  );

  return usePortal ? createPortal(content, document.body) : content;
}
