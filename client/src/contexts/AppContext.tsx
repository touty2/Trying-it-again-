// @refresh reset
/**
 * App State Context
 * Design: Structured Scholar — central state management for all app data
 *
 * Provides:
 *  - All texts, words, flashcards, settings
 *  - Actions: addWord, addToFlashcards, reviewCard, updateSettings, etc.
 *  - Daily cap tracking
 *  - CC-CEDICT dictionary loaded on startup
 *  - Completion tracking (words + texts)
 *  - Suggested re-read (texts with ≥2 repeatedly missed words)
 */

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import {
  FlashcardDB,
  ReviewLogDB,
  CardReviewHistoryDB,
  SettingsDB,
  WordDB,
  WordMistakeDB,
  CompletedWordDB,
  CompletedTextDB,
  StoryDeckDB,
  applyFSRS,
  createFSRSCard,
  getDueStats,
  toISODate,
  type Flashcard,
  type Settings,
  type FSRSRating,
  type Text,
  type Word,
  type WordMistake,
} from "@/lib/db";
import { CONTENT_TEXTS } from "@/lib/contentData";
import { lookupWord } from "@/lib/dictionary";
import { loadCedict, loadCedictMulti, cedictLookup, getAllReadings } from "@/lib/cedict";
import { rankReadings } from "@/lib/definitionRanker";
import { formatDefinitionsWithLabels } from "@/lib/formatDefinitions";

// ─── Context Types ────────────────────────────────────────────────────────────

interface AppState {
  texts: Text[];
  words: Word[];
  flashcards: Flashcard[];
  settings: Settings;
  todayNewWords: number;
  todayReviews: number;
  streak: number;
  isLoading: boolean;

  // Completion & mistake tracking
  completedWordIds: Set<string>;
  completedTextIds: Set<string>;
  wordMistakes: WordMistake[];

  // Actions
  addWordToDeck: (hanzi: string, sourceTextId?: string | null) => Promise<{ success: boolean; alreadyExists: boolean; capReached: boolean }>;
  /** Add a word to a story-specific deck (also adds to main deck if not already there). */
  addWordToStoryDeck: (wordId: string, storyId: string) => Promise<void>;
  /** Remove a word from a story deck only (keeps it in the main deck). */
  removeWordFromStoryDeck: (wordId: string, storyId: string) => Promise<void>;
  /** Get all word IDs in a story deck (from local IndexedDB). */
  getStoryDeckWordIds: (storyId: string) => Promise<string[]>;
  addManualWord: (word: Omit<Word, "id" | "createdAt">) => Promise<Word>;
  removeWord: (wordId: string) => Promise<void>;
  /**
   * Review a flashcard by its cardId.
   * Returns { applied: true } on success, or { applied: false, reason: 'cap' } when
   * the daily review cap has been reached (rating !== 1 only — Again is always applied).
   * Callers MUST check the return value before advancing the session queue.
   */
  reviewFlashcard: (cardId: string, rating: FSRSRating) => Promise<{ applied: boolean; reason?: 'cap' }>;
  updateSettings: (settings: Settings) => Promise<void>;
  refreshAll: () => Promise<void>;
  isWordInDeck: (hanzi: string) => boolean;
  getDueCards: () => Flashcard[];
  /** Returns counts for Due Today, Overdue, and New (never reviewed) cards */
  getDueStats: () => { dueToday: number; overdue: number; newCards: number; leechCards: number };
  getWordById: (id: string) => Word | undefined;
  getTextById: (id: string) => Text | undefined;

  // Completion actions
  markWordCompleted: (wordId: string) => Promise<void>;
  unmarkWordCompleted: (wordId: string) => Promise<void>;
  markTextCompleted: (textId: string) => Promise<void>;
  unmarkTextCompleted: (textId: string) => Promise<void>;
  resetTextMistakes: (textId: string) => Promise<void>;
  /** Returns texts where ≥2 words have been missed ≥2 times */
  getSuggestedRereadTexts: () => { text: Text; difficultCount: number }[];
  /** Gentle reset: sets all card due dates to now, keeps all SRS data */
  resetDueDates: () => Promise<void>;
  /** Nuclear reset: resets all cards to initial New state (reps=0, interval=0, due now) */
  resetDeck: () => Promise<void>;
}

export const AppContext = createContext<AppState | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Stories are served directly from contentData.ts — no IndexedDB caching needed
  const texts: Text[] = CONTENT_TEXTS as Text[];
  const [words, setWords] = useState<Word[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [settings, setSettings] = useState<Settings>({
    id: "settings",
    dailyNewWordCap: 20,
    dailyReviewCap: null,
    showCapReachedPopup: true,
    testingMode: "forward",
    flashcardSource: "both",
    cardSize: 2,
    enableReversibleCards: false,
    desiredRetention: 0.85,
  });
  const [todayNewWords, setTodayNewWords] = useState(0);
  const [todayReviews, setTodayReviews] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // New state for completion tracking
  const [completedWordIds, setCompletedWordIds] = useState<Set<string>>(new Set());
  const [completedTextIds, setCompletedTextIds] = useState<Set<string>>(new Set());
  const [wordMistakes, setWordMistakes] = useState<WordMistake[]>([]);

  const wordsRef = useRef<Word[]>([]);
  wordsRef.current = words;

  const textsRef = useRef<Text[]>(texts);
  textsRef.current = texts;

  const flashcardsRef = useRef<Flashcard[]>([]);
  flashcardsRef.current = flashcards;

  const settingsRef = useRef<Settings>(settings);
  settingsRef.current = settings;

  const todayNewWordsRef = useRef(0);
  todayNewWordsRef.current = todayNewWords;

  // F12: keep a ref so reviewFlashcard can read the current count without
  // being listed as a dependency (avoids stale-closure issues).
  const todayReviewsRef = useRef(0);
  todayReviewsRef.current = todayReviews;

  const wordMistakesRef = useRef<WordMistake[]>([]);
  wordMistakesRef.current = wordMistakes;

  const completedWordIdsRef = useRef<Set<string>>(new Set());
  completedWordIdsRef.current = completedWordIds;

  const refreshAll = useCallback(async () => {
    const [allWords, allCards, s, todayLog, streakVal,
           completedWords, completedTexts, mistakes] = await Promise.all([
      WordDB.getAll(),
      FlashcardDB.getAll(),
      SettingsDB.get(),
      ReviewLogDB.getToday(),
      ReviewLogDB.getStreak(),
      CompletedWordDB.getAll(),
      CompletedTextDB.getAll(),
      WordMistakeDB.getAll(),
    ]);
    setWords(allWords);
    setFlashcards(allCards);
    setSettings(s);
    setTodayNewWords(todayLog.newWordsAdded);
    setTodayReviews(todayLog.reviewCount);
    setStreak(streakVal);
    setCompletedWordIds(new Set(completedWords.map((c) => c.wordId)));
    setCompletedTextIds(new Set(completedTexts.map((c) => c.textId)));
    setWordMistakes(mistakes);
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // Load CC-CEDICT dictionary
      await Promise.all([
        loadCedict(),
        loadCedictMulti(),
      ]);
      await refreshAll();
      setIsLoading(false);
    })();
  }, [refreshAll]);

  // Refresh flashcards when the user returns to the tab (e.g. after leaving overnight)
  // This ensures newly-due cards appear without requiring a full page reload.
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // Only reload flashcard data (lightweight — no dictionary reload)
        FlashcardDB.getAll().then((cards) => setFlashcards(cards));
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const isWordInDeck = useCallback(
    (hanzi: string): boolean => {
      return wordsRef.current.some((w) => w.hanzi === hanzi);
    },
    []
  );

  const addWordToDeck = useCallback(
    async (hanzi: string, sourceTextId: string | null = null): Promise<{ success: boolean; alreadyExists: boolean; capReached: boolean }> => {
      // Check if already in deck
      const existing = wordsRef.current.find((w) => w.hanzi === hanzi);
      if (existing) {
        // Word already in main deck — still add to story deck if applicable
        if (sourceTextId) {
          await StoryDeckDB.addWord(sourceTextId, existing.id);
        }
        return { success: false, alreadyExists: true, capReached: false };
      }

      // Check daily new word cap
      const cap = settingsRef.current.dailyNewWordCap;
      if (cap !== null && todayNewWordsRef.current >= cap) {
        return { success: false, alreadyExists: false, capReached: true };
      }

      // Look up using the full ranked pipeline so the stored definition is always clean.
      // getAllReadings uses CC-CEDICT multi (all readings), rankReadings picks the best one,
      // formatDefinitionsWithLabels filters noise. Falls back to local dict if CEDICT not loaded.
      const allReadings = getAllReadings(hanzi);
      const localEntry = lookupWord(hanzi);

      let pinyin: string;
      let primaryDefinition: string;
      let otherMeanings: string[] = [];

      if (allReadings && allReadings.length > 0) {
        const ranked = rankReadings(hanzi, allReadings);
        pinyin = ranked.primary.pinyin;
        // Use formatDefinitionsWithLabels to get clean, filtered meanings
        const labeled = formatDefinitionsWithLabels({
          primaryMeanings: ranked.primary.meanings,
          otherModernMeanings: ranked.modern.map((r) => r.meanings),
          surnameMeanings: [],   // exclude surnames entirely
          archaicMeanings: [],   // exclude archaic entirely
          maxItems: 6,
        });
        const cleaned = labeled.filter((l) => l.label !== "rare");
        primaryDefinition = cleaned[0]?.text ?? ranked.primary.meanings[0] ?? "";
        otherMeanings = cleaned.slice(1).map((l) => l.text).filter(Boolean);
      } else {
        // Fallback: local dict
        const cedictEntry = cedictLookup(hanzi);
        pinyin = cedictEntry?.pinyin ?? localEntry?.pinyin ?? "";
        const rawDef = cedictEntry?.definition ?? localEntry?.definition ?? "";
        const parts = rawDef.split("/").map((s: string) => s.trim()).filter(Boolean);
        primaryDefinition = parts[0] ?? rawDef;
        otherMeanings = parts.slice(1).filter(Boolean);
      }

      // Extract contextual meaning and example pairs from source text
      const exampleSentences: string[] = [];
      const examplePairs: { chinese: string; english: string }[] = [];
      let contextualMeaning: string | undefined;
      let shortContextExplanation: string | undefined;

      if (sourceTextId) {
        const sourceText = textsRef.current.find((t) => t.id === sourceTextId);
        if (sourceText) {
          const chineseSentences = sourceText.chineseText
            .split(/[。！？\n]+/)
            .map((s) => s.trim())
            .filter((s) => s.length >= 4);

          const englishSentences = sourceText.englishTranslation
            .split(/[.!?\n]+/)
            .map((s) => s.trim())
            .filter((s) => s.length >= 4);

          const matchingSentences = chineseSentences.filter(
            (s) => s.includes(hanzi) && s.length <= 80
          );

          for (let i = 0; i < Math.min(matchingSentences.length, 3); i++) {
            const chSentence = matchingSentences[i];
            const chIdx = chineseSentences.indexOf(chSentence);
            const enSentence =
              englishSentences[chIdx] ??
              englishSentences[Math.min(chIdx, englishSentences.length - 1)] ??
              "";
            examplePairs.push({
              chinese: chSentence + "。",
              english: enSentence.endsWith(".") ? enSentence : enSentence + ".",
            });
            exampleSentences.push(chSentence);
          }

          if (matchingSentences.length > 0) {
            contextualMeaning = primaryDefinition;
            shortContextExplanation = `In this context: ${primaryDefinition}`;
          }
        }
      }

      // ── Validation guard: never save a truncated or empty definition ────────
      // If the pipeline produced nothing useful, fall back to the raw CEDICT first
      // segment rather than saving an empty or cross-reference-only definition.
      if (!primaryDefinition || primaryDefinition.trim().length < 2) {
        // Try raw CEDICT as a last resort
        const rawEntry = cedictLookup(hanzi);
        if (rawEntry) {
          const rawSegs = rawEntry.definition.split("/").map((s: string) => s.trim()).filter(Boolean);
          // Pick the first segment that isn't a pure cross-ref or classifier code
          const usable = rawSegs.find((s: string) =>
            !s.startsWith("see ") && !s.startsWith("CL:") && !s.startsWith("abbr.") &&
            !s.startsWith("old variant") && !s.startsWith("variant of") && s.length > 2
          );
          if (usable) {
            primaryDefinition = usable;
            if (otherMeanings.length === 0) {
              otherMeanings = rawSegs.filter((s: string) => s !== usable && s.length > 2).slice(0, 3);
            }
          }
        }
      }
      // If still empty after all fallbacks, use the hanzi itself as a placeholder
      // so the card is never saved with a blank definition.
      if (!primaryDefinition || primaryDefinition.trim().length < 2) {
        primaryDefinition = hanzi;
      }

      const wordId = nanoid();
      const word: Word = {
        id: wordId,
        hanzi,
        pinyin,
        simpleDefinition: primaryDefinition,
        contextualMeaning,
        shortContextExplanation,
        otherMeanings: otherMeanings.length > 0 ? otherMeanings : undefined,
        exampleSentences,
        examplePairs: examplePairs.length > 0 ? examplePairs : undefined,
        sourceTextId,
        addedManually: false,
        createdAt: Date.now(),
      };

      // Create recognition card (CN→EN) — always created
      const recognitionCard = createFSRSCard(wordId, "recognition");
      const newCards: Flashcard[] = [recognitionCard];
      await WordDB.put(word);
      await FlashcardDB.put(recognitionCard);

      // Create production card (EN→CN) — only when reversible cards enabled
      if (settingsRef.current.enableReversibleCards) {
        const productionCard = createFSRSCard(wordId, "production");
        newCards.push(productionCard);
        await FlashcardDB.put(productionCard);
      }

      await ReviewLogDB.incrementNewWord();
      // Also add to story deck if added from a story
      if (sourceTextId) {
        await StoryDeckDB.addWord(sourceTextId, wordId);
      }
      setWords((prev) => [...prev, word]);
      setFlashcards((prev) => [...prev, ...newCards]);
      setTodayNewWords((prev) => prev + 1);

      return { success: true, alreadyExists: false, capReached: false };
    },
    []
  );

  const addManualWord = useCallback(async (wordData: Omit<Word, "id" | "createdAt">): Promise<Word> => {
    const cap = settingsRef.current.dailyNewWordCap;
    if (cap !== null && todayNewWordsRef.current >= cap) {
      throw new Error("Daily new word cap reached");
    }

    const wordId = nanoid();
    const word: Word = {
      ...wordData,
      id: wordId,
      createdAt: Date.now(),
    };

    const recognitionCard = createFSRSCard(wordId, "recognition");
    const newCards: Flashcard[] = [recognitionCard];
    await WordDB.put(word);
    await FlashcardDB.put(recognitionCard);

    if (settingsRef.current.enableReversibleCards) {
      const productionCard = createFSRSCard(wordId, "production");
      newCards.push(productionCard);
      await FlashcardDB.put(productionCard);
    }

    await ReviewLogDB.incrementNewWord();
    setWords((prev) => [...prev, word]);
    setFlashcards((prev) => [...prev, ...newCards]);
    setTodayNewWords((prev) => prev + 1);

    return word;
  }, []);

  const removeWord = useCallback(async (wordId: string): Promise<void> => {
    await WordDB.delete(wordId);
    await FlashcardDB.deleteByWordId(wordId);
    setWords((prev) => prev.filter((w) => w.id !== wordId));
    setFlashcards((prev) => prev.filter((c) => c.wordId !== wordId));
  }, []);

  const reviewFlashcard = useCallback(async (cardId: string, rating: FSRSRating): Promise<{ applied: boolean; reason?: 'cap' }> => {
    const card = flashcardsRef.current.find((c) => c.cardId === cardId);
    if (!card) return { applied: false };

    // F12 fix: enforce the daily review cap centrally so every caller is gated
    // (Deck.tsx UI, keyboard shortcuts, any future callers).
    // Again (rating 1) is exempt — requeueing for short-term relearning must
    // never be blocked; only completed reviews (2/3/4) count toward the cap.
    if (rating !== 1) {
      const cap = settingsRef.current.dailyReviewCap;
      if (cap !== null && todayReviewsRef.current >= cap) {
        // Return a typed result so callers can avoid advancing the session queue.
        return { applied: false, reason: 'cap' };
      }
    }

    const wordId = card.wordId;
    const oldInterval = card.interval;
    const oldRepetition = card.repetition;
    const oldEaseFactor = card.easeFactor;

    let updates: Partial<Flashcard>;
    // All ratings — including Again (1) — go through the real FSRS scheduler.
    // This ensures stability, state, and scheduledDays are correctly updated on
    // every press, so repeated Again presses properly penalise the card's interval.
    // The in-session requeue (2–3 cards ahead) is handled separately in Deck.tsx.
    updates = applyFSRS(card, rating, settingsRef.current.desiredRetention ?? 0.85);
    await FlashcardDB.update(cardId, updates);
    if (rating !== 1) await ReviewLogDB.incrementReview(); // only count non-Again as completed

    // Log this review for retention analytics (fire-and-forget)
    const word = wordsRef.current.find((w) => w.id === wordId);
    CardReviewHistoryDB.add({
      cardId,
      wordId,
      hanzi: word?.hanzi ?? "",
      reviewedAt: Date.now(),
      rating,
      sessionMissed: false,
      oldInterval,
      newInterval: updates.interval ?? oldInterval,
      oldRepetition,
      newRepetition: updates.repetition ?? oldRepetition,
      oldEaseFactor,
      newEaseFactor: updates.easeFactor ?? oldEaseFactor,
    }).catch(() => { /* non-critical — ignore write errors */ });

    // Track mistakes for Suggested Re-read (Again = rating 1)
    if (rating === 1) {
      const word = wordsRef.current.find((w) => w.id === wordId);
      await WordMistakeDB.recordMiss(wordId, word?.sourceTextId ?? null);
      setWordMistakes((prev) => {
        const existing = prev.find((m) => m.wordId === wordId);
        if (existing) {
          return prev.map((m) =>
            m.wordId === wordId
              ? { ...m, missCount: m.missCount + 1, lastMissed: Date.now() }
              : m
          );
        }
        return [...prev, {
          wordId,
          sourceTextId: word?.sourceTextId ?? null,
          missCount: 1,
          lastMissed: Date.now(),
        }];
      });
    }

    setFlashcards((prev) =>
      prev.map((c) => (c.cardId === cardId ? { ...c, ...updates } : c))
    );
    setTodayReviews((prev) => prev + 1);
    ReviewLogDB.getStreak().then(setStreak);
    return { applied: true };
  }, []);

  const updateSettings = useCallback(async (newSettings: Settings): Promise<void> => {
    await SettingsDB.put(newSettings);
    setSettings(newSettings);
  }, []);

  const getDueCards = useCallback((): Flashcard[] => {
    // getDueCards returns ALL due cards without applying the daily cap.
    // The daily review cap is now enforced inside reviewFlashcard (F12 fix) AND
    // also at the UI layer in Deck.tsx for the toast warning. The queue is still
    // pre-loaded in full so the session can resume after a cap reset without a reload.
    // The daily new-word cap (settings.dailyNewWordCap) is enforced in addWordToDeck
    // and addManualWord before cards are created, so it gates card creation, not review.
    // Include ALL cards due now or in the past (no arbitrary cap).
    // Sort oldest-due first so the most overdue cards are reviewed first.
    const now = Date.now();
    const source = settingsRef.current.flashcardSource ?? "both";
    const due = flashcardsRef.current.filter((c) => {
      if (c.dueDate > now) return false;
      // NOTE: completedWordIds is a visual "mastery" badge only — completed words
      // still appear in the SRS queue on their scheduled due date.
      // Only leech cards (too many lapses) are suppressed from the normal queue.
      if (c.isLeech) return false; // leech cards excluded from normal queue
      if (source === "both") return true;
      const word = wordsRef.current.find((w) => w.id === c.wordId);
      if (!word) return true;
      if (source === "texts") return word.sourceTextId !== null && !word.addedManually;
      if (source === "vocab") return word.sourceTextId === null && !word.addedManually;
      if (source === "user") return word.addedManually === true;
      return true;
    });
    due.sort((a, b) => a.dueDate - b.dueDate);
    return due;
  }, []);

  /**
   * getDueStats — returns categorised card counts based on real-world date.
   * Runs entirely from in-memory refs so it is synchronous and always fresh.
   * Called on every render of Dashboard and Deck without any DB round-trip.
   */
  const getDueStatsCallback = useCallback(
    (): { dueToday: number; overdue: number; newCards: number; leechCards: number } => {
      // BUG-A fix: use getDueCards() (which applies the flashcardSource filter) so the
      // Dashboard stats match exactly what the user will see in the Deck queue.
      // Previously getDueStats used flashcardsRef.current directly, ignoring the source
      // filter — so Dashboard showed 105 due while Deck showed 39 (flashcardSource='vocab').
      const filteredDue = getDueCards();
      return getDueStats(filteredDue, completedWordIdsRef.current);
    },
    [getDueCards]
  );

  const getWordById = useCallback((id: string): Word | undefined => {
    return wordsRef.current.find((w) => w.id === id);
  }, []);

  const getTextById = useCallback((id: string): Text | undefined => {
    return textsRef.current.find((t) => t.id === id);
  }, []);

  // ─── Completion Actions ───────────────────────────────────────────────────

  const markWordCompleted = useCallback(async (wordId: string): Promise<void> => {
    await CompletedWordDB.markCompleted(wordId);
    setCompletedWordIds((prev) => new Set(Array.from(prev).concat(wordId)));
  }, []);

  const unmarkWordCompleted = useCallback(async (wordId: string): Promise<void> => {
    await CompletedWordDB.unmarkCompleted(wordId);
    setCompletedWordIds((prev) => {
      const next = new Set(prev);
      next.delete(wordId);
      return next;
    });
  }, []);

  const markTextCompleted = useCallback(async (textId: string): Promise<void> => {
    await CompletedTextDB.markCompleted(textId);
    setCompletedTextIds((prev) => new Set(Array.from(prev).concat(textId)));
  }, []);

  const unmarkTextCompleted = useCallback(async (textId: string): Promise<void> => {
    await CompletedTextDB.unmarkCompleted(textId);
    setCompletedTextIds((prev) => {
      const next = new Set(prev);
      next.delete(textId);
      return next;
    });
  }, []);

  const resetDueDates = useCallback(async (): Promise<void> => {
    await FlashcardDB.resetDueDates();
    await refreshAll();
  }, [refreshAll]);

  const resetDeck = useCallback(async (): Promise<void> => {
    await FlashcardDB.resetDeck();
    // Clear completedWords so the learned badges reset alongside the cards
    const allCompleted = await CompletedWordDB.getAll();
    await Promise.all(allCompleted.map((cw) => CompletedWordDB.unmarkCompleted(cw.wordId)));
    await refreshAll();
  }, [refreshAll]);

  const resetTextMistakes = useCallback(async (textId: string): Promise<void> => {
    await WordMistakeDB.resetForText(textId);
    setWordMistakes((prev) =>
      prev.filter((m) => m.sourceTextId !== textId)
    );
  }, []);

  const getSuggestedRereadTexts = useCallback((): { text: Text; difficultCount: number }[] => {
    // Words missed ≥2 times
    const hardWords = wordMistakesRef.current.filter((m) => m.missCount >= 2);
    // Group by sourceTextId
    const countByText = new Map<string, number>();
    for (const m of hardWords) {
      if (!m.sourceTextId) continue;
      countByText.set(m.sourceTextId, (countByText.get(m.sourceTextId) ?? 0) + 1);
    }
    // Filter to texts with ≥2 difficult words, not already completed
    const result: { text: Text; difficultCount: number }[] = [];
    for (const [textId, count] of Array.from(countByText.entries())) {
      if (count < 2) continue;
      const text = textsRef.current.find((t) => t.id === textId);
      if (!text) continue;
      result.push({ text, difficultCount: count });
    }
    return result.sort((a, b) => b.difficultCount - a.difficultCount);
  }, []);

  // ─── Story Deck Actions ────────────────────────────────────────────────────

  const addWordToStoryDeck = useCallback(async (wordId: string, storyId: string) => {
    await StoryDeckDB.addWord(storyId, wordId);
  }, []);

  const removeWordFromStoryDeck = useCallback(async (wordId: string, storyId: string) => {
    await StoryDeckDB.removeWord(storyId, wordId);
  }, []);

  const getStoryDeckWordIds = useCallback(async (storyId: string): Promise<string[]> => {
    return StoryDeckDB.getWordIds(storyId);
  }, []);

  return (
    <AppContext.Provider
      value={{
        texts,
        words,
        flashcards,
        settings,
        todayNewWords,
        todayReviews,
        streak,
        isLoading,
        completedWordIds,
        completedTextIds,
        wordMistakes,
        addWordToDeck,
        addManualWord,
        removeWord,
        reviewFlashcard,
        updateSettings,
        refreshAll,
        isWordInDeck,
        getDueCards,
        getDueStats: getDueStatsCallback,
        getWordById,
        getTextById,
        markWordCompleted,
        unmarkWordCompleted,
        markTextCompleted,
        unmarkTextCompleted,
        resetTextMistakes,
        getSuggestedRereadTexts,
        resetDueDates,
        resetDeck,
        addWordToStoryDeck,
        removeWordFromStoryDeck,
        getStoryDeckWordIds,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook (re-exported from dedicated hook file for Vite Fast Refresh) ─────
export { useApp } from "@/hooks/useApp";
