/**
 * StoryDeckPanel
 * Displayed at the bottom of each story page.
 * Shows words added to this story's deck, progress, and a Review button.
 * Also hosts an isolated "Story Practice" session that does not affect SRS.
 *
 * Persistence fix: wordIds are fetched from IndexedDB on every render where
 * `words` or `flashcards` changes, so newly added words always appear and
 * the list survives accordion collapse/expand cycles.
 */

import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { getDueStats } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, RotateCcw, X, Dumbbell } from "lucide-react";
import StoryPracticeSession from "@/components/StoryPracticeSession";

interface StoryDeckPanelProps {
  storyId: string;
  storyTitle: string;
}

export default function StoryDeckPanel({ storyId, storyTitle }: StoryDeckPanelProps) {
  const { getStoryDeckWordIds, removeWordFromStoryDeck, words, flashcards, completedWordIds } = useApp();
  const [, navigate] = useLocation();

  const [wordIds, setWordIds] = useState<string[]>([]);
  const [practiceOpen, setPracticeOpen] = useState(false);

  // Track whether we've done the initial load so we don't flash "empty" before data arrives
  const [loaded, setLoaded] = useState(false);

  // Use a ref to avoid stale closure issues in the refresh callback
  const storyIdRef = useRef(storyId);
  storyIdRef.current = storyId;

  const refresh = useCallback(async () => {
    const ids = await getStoryDeckWordIds(storyIdRef.current);
    setWordIds(ids);
    setLoaded(true);
  }, [getStoryDeckWordIds]);

  // Re-fetch whenever words or flashcards change (covers: new word added, word deleted,
  // accordion collapse/expand, navigation back to this story).
  // Using words.length + flashcards.length as a lightweight change signal.
  const wordsLen = words.length;
  const cardsLen = flashcards.length;
  useEffect(() => {
    refresh();
  }, [refresh, wordsLen, cardsLen, storyId]);

  const storyWords = words.filter((w) => wordIds.includes(w.id));
  const storyCards = flashcards.filter((c) => wordIds.includes(c.wordId));

  // Due stats for story deck cards only
  const stats = getDueStats(storyCards, completedWordIds);
  const dueCount = stats.dueToday + stats.overdue + stats.newCards;

  // "Learned" = word has been reviewed at least once (reps > 0)
  const learnedCount = storyCards.filter(
    (c) => c.cardType === "recognition" && c.reps > 0
  ).length;
  const totalCount = storyWords.length;
  const progressPct = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  const handleReview = () => {
    navigate(`/deck?storyId=${encodeURIComponent(storyId)}&storyTitle=${encodeURIComponent(storyTitle)}`);
  };

  const handleRemove = async (wordId: string) => {
    await removeWordFromStoryDeck(wordId, storyId);
    await refresh();
  };

  // Show nothing while loading to avoid flash of "empty" state
  if (!loaded) {
    return (
      <div className="py-4 text-center text-xs text-muted-foreground animate-pulse">
        Loading story deck…
      </div>
    );
  }

  if (totalCount === 0) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        <BookOpen className="mx-auto mb-2 h-5 w-5 opacity-40" />
        <p>No words saved from this story yet.</p>
        <p className="mt-1 text-xs">Tap any word while reading to add it to this story's deck.</p>
      </div>
    );
  }

  // Practice mode — renders inline, replacing the normal panel content
  if (practiceOpen) {
    return (
      <StoryPracticeSession
        wordIds={wordIds}
        onClose={() => setPracticeOpen(false)}
      />
    );
  }

  return (
    <div className="space-y-4 pt-1">
      {/* Stats row */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
          {totalCount} word{totalCount !== 1 ? "s" : ""}
        </span>
        {dueCount > 0 && (
          <span className="rounded-full bg-orange-100 px-2 py-0.5 font-medium text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            {dueCount} due
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{learnedCount}/{totalCount} words reviewed</span>
          <span>{progressPct}%</span>
        </div>
        <Progress value={progressPct} className="h-1.5" />
      </div>

      {/* Action buttons row */}
      <div className="flex gap-2">
        <Button
          onClick={handleReview}
          className="flex-1 gap-2"
          size="sm"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {dueCount > 0
            ? `Review ${dueCount} due card${dueCount !== 1 ? "s" : ""}`
            : totalCount > 0
            ? "Review All Words"
            : "All caught up!"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPracticeOpen(true)}
          className="gap-1.5 shrink-0"
          title="Practice this story's words (does not affect SRS)"
        >
          <Dumbbell className="h-3.5 w-3.5" />
          Practice
        </Button>
      </div>

      {/* Word list */}
      <div className="space-y-1">
        {storyWords.map((word) => {
          const card = storyCards.find((c) => c.wordId === word.id && c.cardType === "recognition");
          const reviewed = (card?.reps ?? 0) > 0;
          return (
            <div
              key={word.id}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                    reviewed ? "bg-green-500" : "bg-orange-400"
                  }`}
                />
                <span className="font-medium text-sm truncate">{word.hanzi}</span>
                <span className="text-xs text-muted-foreground truncate hidden sm:block">
                  {word.simpleDefinition}
                </span>
              </div>
              <button
                onClick={() => handleRemove(word.id)}
                className="ml-2 flex-shrink-0 rounded p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                title="Remove from story deck"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
