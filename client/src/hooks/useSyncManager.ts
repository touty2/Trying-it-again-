/**
 * useSyncManager — Cloud sync hook for Chinese Reader
 *
 * Responsibilities:
 *  1. Detect when the user logs in and trigger an initial sync
 *  2. Upload local IndexedDB / localStorage data to the cloud (push)
 *  3. Download cloud data and merge with local (last-write-wins)
 *  4. Expose syncStatus for UI feedback
 *  5. Expose triggerSync() for manual sync
 *  6. Periodic sync every 3 minutes while logged in
 *  7. notifyChange() — debounced sync triggered after user actions
 *
 * Data types synced:
 *  - Flashcards (IndexedDB FlashcardDB + WordDB + CompletedWordDB)
 *  - Completed texts (IndexedDB CompletedTextDB)
 *  - Word mistakes (IndexedDB WordMistakeDB)
 *  - Grammar progress (IndexedDB grammarProgressDB + localStorage "grammarProgress")
 *  - Story grammar studied (IndexedDB storyGrammarDB)
 *  - Vocab ignored (IndexedDB VocabIgnoredDB)
 *  - Preferences: typography, theme, audio, daily caps, video sessions (localStorage)
 *
 * IMPORTANT — avoiding infinite loops:
 *  tRPC useMutation() returns a new object reference on every render.
 *  Including mutation objects directly in useCallback/useEffect dependency
 *  arrays causes infinite re-render loops. We store them in refs so
 *  triggerSync() can always access the latest version without being
 *  recreated on every render.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import { trpc } from "@/lib/trpc";
import {
  WordDB,
  FlashcardDB,
  CompletedTextDB,
  CompletedWordDB,
  WordMistakeDB,
  SettingsDB,
  VocabIgnoredDB,
  StoryDeckDB,
  createFSRSCard,
} from "@/lib/db";
import { idbGetAllGrammarProgress, idbPutManyGrammarProgress } from "@/lib/grammarProgressDB";
import { getAllStudiedRows, putManyStudiedRows, type StoryGrammarStudiedRow } from "@/lib/storyGrammarDB";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SyncStatus =
  | "idle"
  | "syncing"
  | "success"
  | "error"
  | "offline";

export interface SyncState {
  status: SyncStatus;
  lastSyncTime: number | null;
  error: string | null;
}

// ─── Callbacks for in-memory context refresh ──────────────────────────────────
// These are set by SyncContext after the hook is created, so the sync manager
// can refresh React context state after a pull without creating circular deps.

type MergeGrammarCallback = (rows: {
  lessonId: string;
  completed: boolean;
  completedAt: number | null;
  masteryScore: number | null;
  updatedAt: number;
}[]) => void;

let _mergeGrammarFromCloud: MergeGrammarCallback | null = null;

export function registerMergeGrammarCallback(fn: MergeGrammarCallback) {
  _mergeGrammarFromCloud = fn;
}

/**
 * Callback registered by AppContext so the sync manager can call refreshAll()
 * after the pull phase overwrites IndexedDB cards. Without this, in-memory
 * flashcard state stays stale (post-review) while IndexedDB has been overwritten
 * with cloud data, causing a mismatch that shows all cards due again on next load.
 */
type RefreshAllCallback = () => Promise<void>;
let _refreshAllFromSync: RefreshAllCallback | null = null;

export function registerRefreshAllCallback(fn: RefreshAllCallback) {
  _refreshAllFromSync = fn;
}

/**
 * Module-level flag: true while a sync is in progress.
 * AppContext reads this to skip the visibilitychange flashcard reload during
 * an active sync — the sync manager calls refreshAll() itself after the pull,
 * so a concurrent reload would race and could restore stale pre-review state.
 */
let _isSyncActive = false;
export function isSyncActive(): boolean { return _isSyncActive; }

// ─── localStorage keys for preferences ───────────────────────────────────────

const PREF_KEYS = [
  "cr-typography-v2",
  "cr-theme-v1",
  "cr-audio-v1",
  "videoLearningSessions",
] as const;

function collectLocalPreferences(): Record<string, unknown> {
  const prefs: Record<string, unknown> = {};
  for (const key of PREF_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) prefs[key] = JSON.parse(raw);
    } catch {
      // ignore parse errors
    }
  }
  return prefs;
}

function applyCloudPreferences(data: Record<string, unknown>): void {
  for (const key of PREF_KEYS) {
    const val = data[key];
    if (val !== undefined && val !== null) {
      try {
        localStorage.setItem(key, typeof val === "string" ? val : JSON.stringify(val));
      } catch {
        // ignore quota errors
      }
    }
  }
  // Also restore grammarProgress if present (legacy key used by GrammarProgressContext)
  const gp = data["grammarProgress"];
  if (gp && typeof gp === "object") {
    try {
      localStorage.setItem("grammarProgress", JSON.stringify(gp));
    } catch { /* ignore */ }
  }
  // Restore app settings (daily caps, testing mode, card size, etc.) to IndexedDB
  const s = data["cr-settings-v1"];
  if (s && typeof s === "object") {
    try {
      const patch = s as Record<string, unknown>;
      SettingsDB.get().then((current) => {
        const merged = {
          ...current,
          ...(patch.dailyNewWordCap !== undefined      && { dailyNewWordCap:      patch.dailyNewWordCap as number | null }),
          ...(patch.dailyReviewCap !== undefined       && { dailyReviewCap:       patch.dailyReviewCap as number | null }),
          ...(patch.showCapReachedPopup !== undefined  && { showCapReachedPopup:  patch.showCapReachedPopup as boolean }),
          ...(patch.testingMode !== undefined          && { testingMode:          patch.testingMode as string }),
          ...(patch.cardSize !== undefined             && { cardSize:             patch.cardSize as 1 | 2 | 3 }),
          ...(patch.enableReversibleCards !== undefined && { enableReversibleCards: patch.enableReversibleCards as boolean }),
          // F1 fix: restore desiredRetention from cloud
          ...(patch.desiredRetention !== undefined         && { desiredRetention:      patch.desiredRetention as number }),
        };
        SettingsDB.put(merged as Parameters<typeof SettingsDB.put>[0]);
      }).catch(() => { /* best-effort */ });
    } catch { /* ignore */ }
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useSyncManager(userId: number | null | undefined) {
  const [syncState, setSyncState] = useState<SyncState>({
    status: "idle",
    lastSyncTime: null,
    error: null,
  });

  // Track whether we've done the initial sync for this session
  const hasSyncedRef = useRef(false);
  const isSyncingRef = useRef(false);

  // ── Stable refs for tRPC mutations ──────────────────────────────────────────
  const pushFlashcardsMut       = trpc.sync.pushFlashcards.useMutation();
  const pushCompletedTextsMut   = trpc.sync.pushCompletedTexts.useMutation();
  const pushWordMistakesMut     = trpc.sync.pushWordMistakes.useMutation();
  const pushPreferencesMut      = trpc.sync.pushPreferences.useMutation();
  const pushGrammarProgressMut  = trpc.grammar.push.useMutation();
  const pushStoryGrammarMut     = trpc.storyGrammar.push.useMutation();
  const pushVocabIgnoredMut     = trpc.vocabIgnored.push.useMutation();
  const pushStoryDecksMut       = trpc.sync.pushStoryDecks.useMutation();

  const pushFlashcardsRef       = useRef(pushFlashcardsMut);
  const pushCompletedTextsRef   = useRef(pushCompletedTextsMut);
  const pushWordMistakesRef     = useRef(pushWordMistakesMut);
  const pushPreferencesRef      = useRef(pushPreferencesMut);
  const pushGrammarProgressRef  = useRef(pushGrammarProgressMut);
  const pushStoryGrammarRef     = useRef(pushStoryGrammarMut);
  const pushVocabIgnoredRef     = useRef(pushVocabIgnoredMut);
  const pushStoryDecksRef       = useRef(pushStoryDecksMut);

  pushFlashcardsRef.current       = pushFlashcardsMut;
  pushCompletedTextsRef.current   = pushCompletedTextsMut;
  pushWordMistakesRef.current     = pushWordMistakesMut;
  pushPreferencesRef.current      = pushPreferencesMut;
  pushGrammarProgressRef.current  = pushGrammarProgressMut;
  pushStoryGrammarRef.current     = pushStoryGrammarMut;
  pushVocabIgnoredRef.current     = pushVocabIgnoredMut;
  pushStoryDecksRef.current       = pushStoryDecksMut;

  const utils = trpc.useUtils();

  /**
   * Full bidirectional sync.
   * Dependencies: only `userId` and `utils` — mutations accessed via refs.
   */
  const triggerSync = useCallback(async () => {
    if (!userId || isSyncingRef.current) return;
    if (!navigator.onLine) {
      setSyncState((s) => ({ ...s, status: "offline" }));
      return;
    }

    isSyncingRef.current = true;
    _isSyncActive = true;
    setSyncState({ status: "syncing", lastSyncTime: null, error: null });

    try {
      // ── 1. Pull cloud data ──────────────────────────────────────────────────
      const [
        cloudFlashcards,
        cloudCompletedTexts,
        cloudWordMistakes,
        cloudPrefs,
        cloudGrammarProgress,
        cloudStoryGrammar,
        cloudVocabIgnored,
      ] = await Promise.all([
        utils.sync.pullFlashcards.fetch(),
        utils.sync.pullCompletedTexts.fetch(),
        utils.sync.pullWordMistakes.fetch(),
        utils.sync.pullPreferences.fetch(),
        utils.grammar.pull.fetch(),
        utils.storyGrammar.pull.fetch(),
        utils.vocabIgnored.pull.fetch(),
      ]);

      // ── 2. Load local data ──────────────────────────────────────────────────
      const [
        localWords,
        localFlashcards,
        localCompletedTexts,
        localWordMistakes,
        localSettings,
        localCompletedWords,
        localStoryGrammar,
        localVocabIgnored,
      ] = await Promise.all([
        WordDB.getAll(),
        FlashcardDB.getAll(),
        CompletedTextDB.getAll(),
        WordMistakeDB.getAll(),
        SettingsDB.get(),
        CompletedWordDB.getAll(),
        getAllStudiedRows(),
        VocabIgnoredDB.getAll(),
      ]);

      // ── 3. Merge flashcards (cloud → local, last-write-wins by lastReviewed) ─
      // Index by cardId (new FSRS) with wordId fallback for legacy data
      const localFlashcardMap    = new Map(localFlashcards.map((c) => [c.cardId ?? c.wordId, c]));
      const localWordMap         = new Map(localWords.map((w) => [w.id, w]));
      const localCompletedWordMap = new Map(localCompletedWords.map((cw) => [cw.wordId, cw]));

      for (const cloudCard of cloudFlashcards.items) {
        // Support both cardId (new) and wordId (legacy) as the lookup key
        const cloudKey = (cloudCard as { cardId?: string }).cardId ?? cloudCard.wordId;
        const localCard = localFlashcardMap.get(cloudKey) ?? localFlashcardMap.get(cloudCard.wordId);

        // Conflict resolution: cloud wins only when it is STRICTLY NEWER than local.
        // Equal timestamps mean local is at least as fresh (just reviewed and pushed),
        // so local wins. Cards that exist only on cloud (no localCard) always pull down.
        const localLR = localCard?.lastReviewed ?? 0;
        const cloudLR = cloudCard.lastReviewed ?? 0;
        const cloudWins = !localCard || cloudLR > localLR;

        if (cloudWins) {
          if (!localWordMap.has(cloudCard.wordId)) {
            const word = {
              id: cloudCard.wordId,
              hanzi: cloudCard.hanzi,
              pinyin: cloudCard.pinyin,
              simpleDefinition: cloudCard.simpleDefinition,
              contextualMeaning: cloudCard.contextualMeaning ?? undefined,
              otherMeanings: (cloudCard.otherMeanings as string[] | null) ?? undefined,
              exampleSentences: [],
              examplePairs: (cloudCard.examplePairsJson as { chinese: string; english: string }[] | null) ?? undefined,
              sourceTextId: cloudCard.sourceTextId ?? null,
              addedManually: cloudCard.addedManually ?? false,
              createdAt: cloudCard.createdAt,
            };
            await WordDB.put(word);
            localWordMap.set(cloudCard.wordId, word);
          }

          // Build a proper FSRS card from cloud data
          const cloudCardTyped = cloudCard as { cardId?: string; cardType?: string };
          const cardType = (cloudCardTyped.cardType === "production" ? "production" : "recognition") as "recognition" | "production";
          const baseCard = createFSRSCard(cloudCard.wordId, cardType);
          // Prefer explicit cardId from cloud; fall back to generated one
          const resolvedCardId = cloudCardTyped.cardId ?? baseCard.cardId;
          const card = {
            ...baseCard,
            cardId: resolvedCardId,
            cardType,
            stability: Number((cloudCard as unknown as { stability?: number }).stability ?? (cloudCard as unknown as { easeFactor?: number }).easeFactor ?? 2.5),
            difficulty: Number((cloudCard as unknown as { difficulty?: number }).difficulty ?? 5.0),
            dueDate: cloudCard.dueDate,
            scheduledDays: Number((cloudCard as { scheduledDays?: number }).scheduledDays ?? (cloudCard as { interval?: number }).interval ?? 1),
            reps: Number((cloudCard as { reps?: number }).reps ?? (cloudCard as { repetition?: number }).repetition ?? 0),
            elapsedDays: Number((cloudCard as { elapsedDays?: number }).elapsedDays ?? 0),
            // F2 fix: preserve state from cloud instead of recomputing from reps.
            // Recomputing always yields 0 (New) or 2 (Review), which silently promotes
            // Relearning (3) cards to Review state after a sync.
            state: (cloudCard as { state?: number }).state ?? (((cloudCard as { reps?: number }).reps ?? (cloudCard as { repetition?: number }).repetition ?? 0) === 0 ? 0 : 2),
            lastReviewed: cloudCard.lastReviewed ?? null,
            createdAt: cloudCard.createdAt,
            nextReviewDate: new Date(cloudCard.dueDate).toISOString().slice(0, 10),
          };
          await FlashcardDB.put(card);
          localFlashcardMap.set(resolvedCardId, card);
        }

        const cloudForward = cloudCard.completedForward ?? false;
        const cloudReverse = cloudCard.completedReverse ?? false;
        if (cloudForward || cloudReverse) {
          const localCW = localCompletedWordMap.get(cloudCard.wordId);
          const mergedForward = (localCW?.completedForward ?? false) || cloudForward;
          const mergedReverse = (localCW?.completedReverse ?? false) || cloudReverse;
          if (mergedForward !== (localCW?.completedForward ?? false) || mergedReverse !== (localCW?.completedReverse ?? false)) {
            if (mergedForward) await CompletedWordDB.markDirection(cloudCard.wordId, "forward");
            if (mergedReverse) await CompletedWordDB.markDirection(cloudCard.wordId, "reverse");
          }
          if (mergedForward && mergedReverse && !localCW) {
            await CompletedWordDB.markCompleted(cloudCard.wordId);
          }
        }
      }

      // ── 4. Merge completed texts (cloud → local) ────────────────────────────
      const localCompletedTextMap = new Map(localCompletedTexts.map((c) => [c.textId, c]));
      for (const cloudItem of cloudCompletedTexts.items) {
        if (!localCompletedTextMap.has(cloudItem.textId)) {
          await CompletedTextDB.markCompleted(cloudItem.textId);
          localCompletedTextMap.set(cloudItem.textId, {
            textId: cloudItem.textId,
            completedAt: cloudItem.completedAt,
          });
        }
      }

       // ── 5. Merge word mistakes (take max missCount) ———————————————————————
      const localMistakeMap = new Map(localWordMistakes.map((m) => [m.wordId, m]));
      for (const cloudMistake of cloudWordMistakes.items) {
        const local = localMistakeMap.get(cloudMistake.wordId);
        if (!local || local.missCount < cloudMistake.missCount) {
          const targetCount = cloudMistake.missCount;
          const currentCount = local?.missCount ?? 0;
          // F7 fix: pass the cloud lastMissed timestamp so the original miss time
          // is preserved instead of being overwritten with the sync time.
          const cloudLastMissed = (cloudMistake as { lastMissed?: number }).lastMissed;
          for (let i = currentCount; i < targetCount; i++) {
            await WordMistakeDB.recordMiss(
              cloudMistake.wordId,
              cloudMistake.sourceTextId ?? null,
              // Only pass the timestamp on the last iteration (the most recent miss)
              i === targetCount - 1 ? cloudLastMissed : undefined
            );
          }
        }
      }

      // ── 6. Merge preferences (cloud → local) ───────────────────────────────
      if (cloudPrefs.data) {
        applyCloudPreferences(cloudPrefs.data as Record<string, unknown>);
      }

      // ── 7. Merge grammar progress (cloud → local, last-write-wins) ──────────
      const localGrammarProgress = await idbGetAllGrammarProgress();
      const localGrammarMap = new Map(localGrammarProgress.map((g) => [g.lessonId, g]));
      for (const cloudRow of cloudGrammarProgress) {
        const local = localGrammarMap.get(cloudRow.lessonId);
        if (!local || cloudRow.updatedAt > local.updatedAt) {
          localGrammarMap.set(cloudRow.lessonId, {
            lessonId:     cloudRow.lessonId,
            completed:    cloudRow.completed,
            completedAt:  cloudRow.completedAt,
            masteryScore: cloudRow.masteryScore,
            updatedAt:    cloudRow.updatedAt,
          });
        }
      }
      const mergedGrammarProgress = Array.from(localGrammarMap.values());
      if (mergedGrammarProgress.length > 0) {
        await idbPutManyGrammarProgress(mergedGrammarProgress);
        // Also refresh the in-memory GrammarProgressContext so UI updates immediately
        if (_mergeGrammarFromCloud) {
          _mergeGrammarFromCloud(mergedGrammarProgress);
        }
      }

      // ── 8. Merge story grammar studied (cloud → local, last-write-wins) ──────
      const localStoryGrammarMap = new Map(localStoryGrammar.map((r) => [r.key, r]));
      const newStoryRows: StoryGrammarStudiedRow[] = [];
      for (const cloudRow of cloudStoryGrammar) {
        const key = `${cloudRow.textId}::${cloudRow.lessonId}`;
        const local = localStoryGrammarMap.get(key);
        if (!local || cloudRow.studiedAt > local.studiedAt) {
          const row: StoryGrammarStudiedRow = {
            key,
            textId:    cloudRow.textId,
            lessonId:  cloudRow.lessonId,
            studiedAt: cloudRow.studiedAt,
          };
          newStoryRows.push(row);
          localStoryGrammarMap.set(key, row);
        }
      }
      if (newStoryRows.length > 0) {
        await putManyStudiedRows(newStoryRows);
      }

      // ── Post-pull: refresh in-memory React state so it matches what was just
      // written to IndexedDB. Without this, the in-memory flashcards array stays
      // at the post-review state while IndexedDB may have been overwritten by the
      // pull. The next page load then reads stale IndexedDB data and shows all
      // cards as due again.
      if (_refreshAllFromSync) {
        try { await _refreshAllFromSync(); } catch { /* best-effort */ }
      }

      // ── 9. Merge vocab ignored (cloud → local, OR logic: once ignored stays) ─
      const localVocabIgnoredSet = new Set(localVocabIgnored.map((v) => v.id));
      for (const cloudItem of cloudVocabIgnored) {
        if (!localVocabIgnoredSet.has(cloudItem.vocabId)) {
          await VocabIgnoredDB.ignore(cloudItem.vocabId);
          localVocabIgnoredSet.add(cloudItem.vocabId);
        }
      }

      // ── 10. Push local data to cloud ────────────────────────────────────────
      const [mergedWords, mergedFlashcards, mergedCompletedTexts, mergedWordMistakes, mergedCompletedWords] =
        await Promise.all([
          WordDB.getAll(),
          FlashcardDB.getAll(),
          CompletedTextDB.getAll(),
          WordMistakeDB.getAll(),
          CompletedWordDB.getAll(),
        ]);

      const mergedWordMap          = new Map(mergedWords.map((w) => [w.id, w]));
      const mergedCompletedWordMap = new Map(mergedCompletedWords.map((cw) => [cw.wordId, cw]));

      // Push flashcards
      if (mergedFlashcards.length > 0) {
        const flashcardItems = mergedFlashcards
          .map((card) => {
            const word = mergedWordMap.get(card.wordId);
            if (!word) return null;
            const cw = mergedCompletedWordMap.get(card.wordId);
            return {
              wordId:           card.wordId,
              cardId:           card.cardId,
              cardType:         card.cardType,
              hanzi:            word.hanzi,
              pinyin:           word.pinyin,
              simpleDefinition: word.simpleDefinition,
              contextualMeaning: word.contextualMeaning ?? null,
              otherMeanings:    word.otherMeanings ?? null,
              examplePairsJson: word.examplePairs ?? null,
              sourceTextId:     word.sourceTextId ?? null,
              addedManually:    word.addedManually,
              // FSRS fields
              stability:        card.stability,
              difficulty:       card.difficulty,
              scheduledDays:    card.scheduledDays,
              elapsedDays:      card.elapsedDays,
              reps:             card.reps,
              lapses:           card.lapses,
              isLeech:          card.isLeech ?? false,
              state:            card.state,
              // Legacy compat fields (kept for old clients)
              easeFactor:       card.stability,
              interval:         card.scheduledDays,
              repetition:       card.reps,
              dueDate:          card.dueDate,
              lastReviewed:     card.lastReviewed ?? null,
              isCompleted:      cw !== undefined,
              completedAt:      cw?.completedAt ?? null,
              completedForward: cw?.completedForward ?? false,
              completedReverse: cw?.completedReverse ?? false,
              createdAt:        card.createdAt,
            };
          })
          .filter((item): item is NonNullable<typeof item> => item !== null);

        await pushFlashcardsRef.current.mutateAsync({ items: flashcardItems });
      }

      // Push completed texts
      if (mergedCompletedTexts.length > 0) {
        await pushCompletedTextsRef.current.mutateAsync({
          items: mergedCompletedTexts.map((c) => ({
            textId:      c.textId,
            completedAt: c.completedAt,
          })),
        });
      }

      // Push word mistakes
      if (mergedWordMistakes.length > 0) {
        await pushWordMistakesRef.current.mutateAsync({
          items: mergedWordMistakes.map((m) => ({
            wordId:      m.wordId,
            sourceTextId: m.sourceTextId ?? null,
            missCount:   m.missCount,
            lastMissed:  m.lastMissed,
          })),
        });
      }

      // Push preferences (includes typography, theme, audio, video sessions)
      const localPrefs = collectLocalPreferences();
      // Push ALL settings fields so they restore on other devices
      localPrefs["cr-settings-v1"] = {
        dailyNewWordCap:      localSettings.dailyNewWordCap,
        dailyReviewCap:      localSettings.dailyReviewCap,
        showCapReachedPopup: localSettings.showCapReachedPopup,
        testingMode:         localSettings.testingMode,
        cardSize:            localSettings.cardSize,
        enableReversibleCards: localSettings.enableReversibleCards,
        // F1 fix: include desiredRetention so it survives cross-device sync
        desiredRetention:    localSettings.desiredRetention,
      };
      // Also include grammarProgress localStorage blob for cross-device restore
      try {
        const gpRaw = localStorage.getItem("grammarProgress");
        if (gpRaw) localPrefs["grammarProgress"] = JSON.parse(gpRaw);
      } catch { /* ignore */ }
      await pushPreferencesRef.current.mutateAsync({ data: localPrefs });

      // Push grammar progress
      if (mergedGrammarProgress.length > 0) {
        await pushGrammarProgressRef.current.mutateAsync({
          items: mergedGrammarProgress.map((g) => ({
            lessonId:     g.lessonId,
            completed:    g.completed,
            completedAt:  g.completedAt,
            masteryScore: g.masteryScore,
          })),
        });
      }

      // Push story grammar studied
      const allStoryGrammar = Array.from(localStoryGrammarMap.values());
      if (allStoryGrammar.length > 0) {
        await pushStoryGrammarRef.current.mutateAsync({
          items: allStoryGrammar.map((r) => ({
            textId:    r.textId,
            lessonId:  r.lessonId,
            studiedAt: r.studiedAt,
          })),
        });
      }

      // Push vocab ignored
      const allVocabIgnored = await VocabIgnoredDB.getAll();
      if (allVocabIgnored.length > 0) {
        await pushVocabIgnoredRef.current.mutateAsync({
          items: allVocabIgnored.map((v) => ({
            vocabId:   v.id,
            ignoredAt: v.ignoredAt,
          })),
        });
      }

      // Push story deck memberships
      try {
        const allStoryDeckEntries = await StoryDeckDB.getAll();
        if (allStoryDeckEntries.length > 0) {
          // Group by storyId
          const byStory = new Map<string, string[]>();
          for (const e of allStoryDeckEntries) {
            if (!byStory.has(e.storyId)) byStory.set(e.storyId, []);
            byStory.get(e.storyId)!.push(e.wordId);
          }
          const decks = Array.from(byStory.entries()).map(([storyId, wordIds]) => ({ storyId, wordIds }));
          await pushStoryDecksRef.current.mutateAsync({ decks });
        }
      } catch (storyDeckErr) {
        // F8 fix: log story deck sync errors instead of silently swallowing them.
        // Still best-effort (won't abort the overall sync), but now visible in console.
        console.warn("[SyncManager] Story deck sync failed (best-effort):", storyDeckErr);
      }

      // ── 11. Update sync state ───────────────────────────────────────────────
      const now = Date.now();
      localStorage.setItem("cr-last-sync", String(now));
      setSyncState({ status: "success", lastSyncTime: now, error: null });
      hasSyncedRef.current = true;
    } catch (err) {
      console.error("[SyncManager] Sync failed:", err);
      setSyncState((s) => ({
        ...s,
        status: "error",
        error: err instanceof Error ? err.message : "Sync failed",
      }));
      hasSyncedRef.current = false;
    } finally {
      isSyncingRef.current = false;
      _isSyncActive = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, utils]);

  // Auto-sync on login
  useEffect(() => {
    if (!userId || hasSyncedRef.current) return;
    const stored = localStorage.getItem("cr-last-sync");
    if (stored) {
      setSyncState((s) => ({ ...s, lastSyncTime: Number(stored) }));
    }
    const timer = setTimeout(() => { triggerSync(); }, 1500);
    return () => clearTimeout(timer);
  }, [userId, triggerSync]);

  // Periodic sync every 3 minutes
  useEffect(() => {
    if (!userId) return;
    const INTERVAL_MS = 3 * 60 * 1000;
    const id = setInterval(() => {
      if (!isSyncingRef.current) triggerSync();
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [userId, triggerSync]);

  // Debounced change-triggered sync (10s window)
  const changeDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notifyChange = useCallback(() => {
    if (!userId) return;
    if (changeDebounceRef.current) clearTimeout(changeDebounceRef.current);
    changeDebounceRef.current = setTimeout(() => {
      if (!isSyncingRef.current) triggerSync();
    }, 10_000);
  }, [userId, triggerSync]);

  // Reset on logout
  useEffect(() => {
    if (!userId) {
      hasSyncedRef.current = false;
      setSyncState({ status: "idle", lastSyncTime: null, error: null });
      if (changeDebounceRef.current) {
        clearTimeout(changeDebounceRef.current);
        changeDebounceRef.current = null;
      }
    }
  }, [userId]);

  return {
    syncState,
    triggerSync,
    notifyChange,
    isSyncing: syncState.status === "syncing",
  };
}
