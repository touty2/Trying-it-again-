/**
 * StoryDeckPanel
 * Displayed at the bottom of each story page.
 * Shows words added to this story's deck, progress, and a Review button.
 */

import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useApp } from "@/contexts/AppContext";
import { FlashcardDB, getDueStats } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, RotateCcw, X } from "lucide-react";

interface StoryDeckPanelProps {
  storyId: string;
  storyTitle: string;
}

export default function StoryDeckPanel({ storyId, storyTitle }: StoryDeckPanelProps) {
  const { getStoryDeckWordIds, removeWordFromStoryDeck, words, flashcards, completedWordIds } = useApp();
  const [, navigate] = useLocation();

  const [wordIds, setWordIds] = useState<string[]>([]);

  const refresh = useCallback(async () => {
    const ids = await getStoryDeckWordIds(storyId);
    setWordIds(ids);
  }, [storyId, getStoryDeckWordIds]);

  useEffect(() => {
    refresh();
  }, [refresh, flashcards]); // re-run when flashcards change (new word added)

  const storyWords = words.filter((w) => wordIds.includes(w.id));
  const storyCards = flashcards.filter((c) => wordIds.includes(c.wordId));

  // Due stats for story deck cards only
  const stats = getDueStats(storyCards, completedWordIds);
  const dueCount = stats.dueToday + stats.overdue + stats.newCards;

  // "Learned" = word has been reviewed at least once (reps > 0) and not lapsed recently
  const learnedCount = storyCards.filter(
    (c) => c.cardType === "recognition" && c.reps > 0
  ).length;
  const totalCount = storyWords.length;
  const progressPct = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;

  const handleReview = () => {
    // Navigate to Deck page with story filter
    navigate(`/deck?storyId=${encodeURIComponent(storyId)}&storyTitle=${encodeURIComponent(storyTitle)}`);
  };

  const handleRemove = async (wordId: string) => {
    await removeWordFromStoryDeck(wordId, storyId);
    await refresh();
  };

  if (totalCount === 0) {
  return (
    <div className="text-center py-4 text-sm text-muted-foreground">
      <BookOpen className="mx-auto mb-2 h-5 w-5 opacity-40" />
      <p>No words saved from this story yet.</p>
      <p className="mt-1 text-xs">Tap any word while reading to add it to this story's deck.</p>
    </div>
  );
}

  // Deck has words — show stats + list inline (accordion handles expand/collapse)
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

      {/* Review button */}
      <Button
        onClick={handleReview}
        className="w-full gap-2"
        size="sm"
        disabled={dueCount === 0 && totalCount > 0 && learnedCount === totalCount}
      >
        <RotateCcw className="h-3.5 w-3.5" />
        {dueCount > 0 ? `Review ${dueCount} due card${dueCount !== 1 ? "s" : ""}` : "All caught up!"}
      </Button>

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
