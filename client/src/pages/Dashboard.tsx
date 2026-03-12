/**
 * Dashboard Tab
 * Design: Structured Scholar
 *  - Words Learned progress bar
 *  - Total learned count
 *  - Review streak
 *  - Due cards today
 *  - Completed texts count
 *  - Suggested re-reads count
 *  - Band breakdown
 */

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  BookOpen,
  Flame,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  Layers,
  BookMarked,
  RotateCcw,
  AlertCircle,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import type { HskBand } from "@/lib/db";

// ─── Band Config ──────────────────────────────────────────────────────────────

const BAND_COLORS: Record<HskBand, string> = {
  "HSK3-I":  "bg-amber-400",
  "HSK3-II": "bg-orange-400",
  "HSK4-I":  "bg-teal-500",
  "HSK4-II": "bg-cyan-500",
  "HSK5-I":  "bg-indigo-500",
  "HSK5-II": "bg-violet-500",
};

const BAND_LABELS: Record<HskBand, string> = {
  "HSK3-I":  "HSK 3-I",
  "HSK3-II": "HSK 3-II",
  "HSK4-I":  "HSK 4-I",
  "HSK4-II": "HSK 4-II",
  "HSK5-I":  "HSK 5-I",
  "HSK5-II": "HSK 5-II",
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  delay?: number;
}

function StatCard({ icon, label, value, sub, accent = "text-primary", delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 bg-primary/10">
        <span className={accent}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      {sub && <p className="text-xs text-muted-foreground/70 mt-1">{sub}</p>}
    </motion.div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = "bg-primary" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Dashboard Page ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const {
    words,
    flashcards,
    streak,
    todayNewWords,
    todayReviews,
    settings,
    texts,
    completedTextIds,
    getSuggestedRereadTexts,
    getDueStats,
  } = useApp();

  // Date-based SRS counts — computed fresh on every render from real-world date
  const { dueToday, overdue, newCards } = useMemo(
    () => getDueStats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getDueStats, flashcards]
  );

  // Total actionable cards (due today + overdue + new)
  const dueCount = dueToday + overdue + newCards;

  const learnedCount = useMemo(() => {
    return flashcards.filter((c) => c.repetition >= 2).length;
  }, [flashcards]);

  const completedTextsCount = completedTextIds.size;

  const suggestedRereadCount = useMemo(() => {
    return getSuggestedRereadTexts().length;
  }, [getSuggestedRereadTexts]);

  const totalWords = words.length;
  const learnedGoal = Math.max(totalWords, 100);

  // Band breakdown
  const bandBreakdown = useMemo(() => {
    const counts: Partial<Record<HskBand, number>> = {};
    words.forEach((w) => {
      const sourceText = texts.find((t) => t.id === w.sourceTextId);
      if (sourceText) {
        counts[sourceText.band] = (counts[sourceText.band] ?? 0) + 1;
      }
    });
    return counts;
  }, [words, texts]);

  // Daily cap progress
  const newWordCap = settings.dailyNewWordCap;

  // Continue Reading — last story opened, persisted in localStorage
  const [lastReadStoryId, setLastReadStoryId] = useState<string | null>(null);
  useEffect(() => {
    setLastReadStoryId(localStorage.getItem("lastReadStoryId"));
  }, []);
  const lastReadStory = lastReadStoryId ? texts.find((t) => t.id === lastReadStoryId) : null;
  const [, navigate] = useLocation();

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">Dashboard</h2>
        <p className="text-sm text-muted-foreground">Your learning progress at a glance.</p>
      </div>

      {/* Continue Reading Card */}
      {lastReadStory && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => navigate(`/story/${lastReadStory.id}`)}
          className="w-full flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors px-5 py-4 mb-5 text-left group"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
              <BookOpen size={17} className="text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary/70 mb-0.5">Continue Reading</p>
              <p className="text-sm font-semibold text-foreground truncate">{lastReadStory.englishTitle ?? lastReadStory.title}</p>
              <p className="text-xs text-muted-foreground truncate">{lastReadStory.title}</p>
            </div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
        </motion.button>
      )}

      {/* Stat Cards — Row 1: Core learning stats */}
      <div className="grid grid-cols-2 gap-3 mb-3 sm:grid-cols-4">
        <StatCard
          icon={<BookOpen size={18} />}
          label="Words in Deck"
          value={totalWords}
          accent="text-primary"
          delay={0}
        />
        <StatCard
          icon={<CheckCircle2 size={18} />}
          label="Words Learned"
          value={learnedCount}
          sub="≥2 successful reviews"
          accent="text-emerald-500 dark:text-emerald-400"
          delay={0.05}
        />
        <StatCard
          icon={<Flame size={18} />}
          label="Review Streak"
          value={`${streak}d`}
          sub={streak > 0 ? "Keep it up!" : "Start reviewing!"}
          accent="text-orange-500"
          delay={0.1}
        />
        <StatCard
          icon={<Clock size={18} />}
          label="Total Due"
          value={dueCount}
          sub={dueCount > 0 ? `${overdue > 0 ? overdue + " overdue" : "all on time"}` : "All caught up!"}
          accent={overdue > 0 ? "text-red-500 dark:text-red-400" : "text-amber-600"}
          delay={0.15}
        />
      </div>

      {/* Stat Cards — Row 2: SRS queue breakdown */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <StatCard
          icon={<Clock size={18} />}
          label="Due Today"
          value={dueToday}
          sub={dueToday > 0 ? "Scheduled today" : "None today"}
          accent="text-amber-600"
          delay={0.2}
        />
        <StatCard
          icon={<AlertCircle size={18} />}
          label="Overdue"
          value={overdue}
          sub={overdue > 0 ? "Missed days" : "All caught up!"}
          accent={overdue > 0 ? "text-red-500 dark:text-red-400" : "text-emerald-500 dark:text-emerald-400"}
          delay={0.25}
        />
        <StatCard
          icon={<Sparkles size={18} />}
          label="New"
          value={newCards}
          sub={newCards > 0 ? "Never reviewed" : "None pending"}
          accent="text-indigo-500 dark:text-indigo-400"
          delay={0.3}
        />
      </div>

      {/* Stat Cards — Row 3: Reading progress */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <StatCard
          icon={<BookMarked size={18} />}
          label="Texts Completed"
          value={completedTextsCount}
          sub={completedTextsCount > 0 ? "Stories finished" : "Start reading!"}
          accent="text-teal-500 dark:text-teal-400"
          delay={0.35}
        />
        <StatCard
          icon={<RotateCcw size={18} />}
          label="Suggested Re-reads"
          value={suggestedRereadCount}
          sub={suggestedRereadCount > 0 ? "Texts with tricky words" : "No re-reads needed"}
          accent="text-violet-500 dark:text-violet-400"
          delay={0.4}
        />
      </div>

      {/* Words Learned Progress */}
      <div className="rounded-xl border border-border bg-card p-5 mb-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Words Learned</h3>
          </div>
          <span className="text-sm font-bold text-primary">{learnedCount} / {learnedGoal}</span>
        </div>
        <ProgressBar value={learnedCount} max={learnedGoal} color="bg-primary" />
        <p className="text-xs text-muted-foreground mt-2">
          {learnedGoal - learnedCount > 0
            ? `${learnedGoal - learnedCount} more to reach your goal`
            : "Goal reached! Set a higher target."}
        </p>
      </div>

      {/* Today's Progress */}
      <div className="rounded-xl border border-border bg-card p-5 mb-4 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={16} className="text-indigo-600" />
          <h3 className="font-semibold text-foreground text-sm">Today's Activity</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">New words added</span>
              <span className="font-medium text-foreground">
                {todayNewWords}
                {newWordCap !== null && <span className="text-muted-foreground"> / {newWordCap}</span>}
              </span>
            </div>
            {newWordCap !== null && (
              <ProgressBar value={todayNewWords} max={newWordCap} color="bg-indigo-500" />
            )}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Cards reviewed</span>
              <span className="font-medium text-foreground">
                {todayReviews}
                {settings.dailyReviewCap !== null && (
                  <span className="text-muted-foreground"> / {settings.dailyReviewCap}</span>
                )}
              </span>
            </div>
            {settings.dailyReviewCap !== null && (
              <ProgressBar value={todayReviews} max={settings.dailyReviewCap} color="bg-primary" />
            )}
          </div>
        </div>
      </div>

      {/* Band Breakdown */}
      {Object.keys(bandBreakdown).length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={16} className="text-violet-600" />
            <h3 className="font-semibold text-foreground text-sm">Words by Band</h3>
          </div>
          <div className="space-y-3">
            {(Object.entries(bandBreakdown) as [HskBand, number][]).map(([band, count]) => (
              <div key={band}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{BAND_LABELS[band]}</span>
                  <span className="font-medium text-foreground">{count}</span>
                </div>
                <ProgressBar
                  value={count}
                  max={Math.max(...Object.values(bandBreakdown) as number[])}
                  color={BAND_COLORS[band]}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {totalWords === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <BookOpen size={32} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Start reading and adding words to see your progress here.</p>
        </div>
      )}
    </div>
  );
}
