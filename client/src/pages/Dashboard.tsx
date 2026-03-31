/**
 * Dashboard — clean redesign
 *
 * Layout:
 *  1. Countdown hero  — time until next review (or "Review now" CTA)
 *  2. Three stat cards — Words in Deck · In Rotation · Streak
 *  3. Today's Activity — cards reviewed + new words added (progress bars)
 *  4. Continue Reading shortcut (if a story was opened before)
 *  5. Words by Band breakdown (only when data exists)
 */

import { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  BookOpen,
  Flame,
  Clock,
  BarChart3,
  Layers,
  ChevronRight,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import type { HskBand } from "@/lib/db";
import { Button } from "@/components/ui/button";

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Format a millisecond duration as "Xh Ym" or "Xm" */
function formatDuration(ms: number): string {
  const totalMinutes = Math.ceil(ms / 60_000);
  if (totalMinutes <= 0) return "now";
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) return `${minutes}m`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}m`;
}

/** Format an absolute timestamp as a friendly time string */
function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

// ─── Countdown Hook ───────────────────────────────────────────────────────────

/**
 * Returns the milliseconds until the nearest future dueDate across all
 * flashcards that have been reviewed at least once (state > 0).
 * Updates every 30 seconds. Returns null if no future reviews are scheduled.
 */
function useNextReviewCountdown(flashcards: { dueDate: number; lastReviewed: number | null }[]) {
  const getMs = useCallback(() => {
    const now = Date.now();
    // Only look at cards that have been reviewed at least once and are scheduled in the future
    const futureDueDates = flashcards
      .filter((c) => c.lastReviewed !== null && c.dueDate > now)
      .map((c) => c.dueDate);
    if (futureDueDates.length === 0) return null;
    return Math.min(...futureDueDates) - now;
  }, [flashcards]);

  const [msUntilNext, setMsUntilNext] = useState<number | null>(getMs);

  useEffect(() => {
    setMsUntilNext(getMs());
    const id = setInterval(() => setMsUntilNext(getMs()), 30_000);
    return () => clearInterval(id);
  }, [getMs]);

  return msUntilNext;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ value, max, color = "bg-primary" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      />
    </div>
  );
}

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3 bg-muted">
        <span className={accent}>{icon}</span>
      </div>
      <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      {sub && <p className="text-xs text-muted-foreground/60 mt-1">{sub}</p>}
    </motion.div>
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
    getDueStats,
  } = useApp();

  const [, navigate] = useLocation();

  // ── Due counts ──────────────────────────────────────────────────────────────
  const { dueToday, overdue, newCards } = useMemo(
    () => getDueStats(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [getDueStats, flashcards]
  );
  const dueNow = dueToday + overdue + newCards;

  // ── "In Rotation" — cards reviewed at least once ────────────────────────────
  // This is a truthful SRS metric: the card has entered the spaced repetition
  // schedule. It does not claim mastery — just that the system is tracking it.
  const inRotation = useMemo(
    () => flashcards.filter((c) => c.lastReviewed !== null).length,
    [flashcards]
  );

  // ── Next review countdown ───────────────────────────────────────────────────
  const msUntilNext = useNextReviewCountdown(flashcards);

  // Compute the absolute timestamp of the next review for the subtitle
  const nextReviewTs = useMemo(() => {
    const now = Date.now();
    const futureDueDates = flashcards
      .filter((c) => c.lastReviewed !== null && c.dueDate > now)
      .map((c) => c.dueDate);
    if (futureDueDates.length === 0) return null;
    return Math.min(...futureDueDates);
  }, [flashcards]);

  // ── Band breakdown ──────────────────────────────────────────────────────────
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

  // ── Continue Reading ────────────────────────────────────────────────────────
  const [lastReadStoryId, setLastReadStoryId] = useState<string | null>(null);
  useEffect(() => {
    setLastReadStoryId(localStorage.getItem("lastReadStoryId"));
  }, []);
  const lastReadStory = lastReadStoryId ? texts.find((t) => t.id === lastReadStoryId) : null;

  // ── Daily cap ───────────────────────────────────────────────────────────────
  const newWordCap = settings.dailyNewWordCap;

  // ── Countdown hero content ──────────────────────────────────────────────────
  const heroContent = useMemo(() => {
    if (dueNow > 0) {
      return {
        type: "due" as const,
        headline: `${dueNow} card${dueNow !== 1 ? "s" : ""} ready`,
        sub: overdue > 0 ? `${overdue} overdue` : "Scheduled for today",
      };
    }
    if (msUntilNext === null) {
      // No reviewed cards at all — deck is empty or never started
      return {
        type: "empty" as const,
        headline: words.length === 0 ? "Add words to get started" : "Start your first review",
        sub: words.length === 0 ? "Read a story and tap words to add them" : `${words.length} word${words.length !== 1 ? "s" : ""} in your deck`,
      };
    }
    return {
      type: "countdown" as const,
      headline: formatDuration(msUntilNext),
      sub: nextReviewTs ? `Next review at ${formatTime(nextReviewTs)}` : "Until your next review",
    };
  }, [dueNow, overdue, msUntilNext, nextReviewTs, words.length]);

  return (
    <div className="space-y-4">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-foreground">Dashboard</h2>
      </div>

      {/* ── Hero: countdown / due now ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl border p-6 shadow-sm ${
          heroContent.type === "due"
            ? "border-primary/30 bg-primary/5"
            : heroContent.type === "countdown"
            ? "border-border bg-card"
            : "border-border bg-card"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {heroContent.type === "due" ? (
                <RefreshCw size={15} className="text-primary shrink-0" />
              ) : (
                <Clock size={15} className="text-muted-foreground shrink-0" />
              )}
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {heroContent.type === "due" ? "Ready to review" : heroContent.type === "countdown" ? "Next review in" : "Get started"}
              </span>
            </div>
            <p className={`text-3xl font-bold tabular-nums ${heroContent.type === "due" ? "text-primary" : "text-foreground"}`}>
              {heroContent.headline}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{heroContent.sub}</p>
          </div>
          {(heroContent.type === "due" || heroContent.type === "empty") && (
            <Button
              size="sm"
              className="shrink-0 gap-1.5"
              onClick={() => navigate("/deck")}
            >
              {heroContent.type === "due" ? "Review" : "Go to Deck"}
              <ArrowRight size={14} />
            </Button>
          )}
        </div>
      </motion.div>

      {/* ── Three stat cards ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={<BookOpen size={16} />}
          label="Words in Deck"
          value={words.length}
          accent="text-primary"
          delay={0.05}
        />
        <StatCard
          icon={<RefreshCw size={16} />}
          label="In Rotation"
          value={inRotation}
          sub="Reviewed at least once"
          accent="text-teal-500 dark:text-teal-400"
          delay={0.1}
        />
        <StatCard
          icon={<Flame size={16} />}
          label="Streak"
          value={`${streak}d`}
          sub={streak > 0 ? "Keep it up!" : "Start today"}
          accent="text-orange-500"
          delay={0.15}
        />
      </div>

      {/* ── Today's Activity ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl border border-border bg-card p-5 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 size={15} className="text-indigo-500" />
          <h3 className="font-semibold text-foreground text-sm">Today's Activity</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Cards reviewed</span>
              <span className="font-semibold text-foreground tabular-nums">
                {todayReviews}
                {settings.dailyReviewCap !== null && (
                  <span className="text-muted-foreground font-normal"> / {settings.dailyReviewCap}</span>
                )}
              </span>
            </div>
            {settings.dailyReviewCap !== null ? (
              <ProgressBar value={todayReviews} max={settings.dailyReviewCap} color="bg-primary" />
            ) : (
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: todayReviews > 0 ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">New words added</span>
              <span className="font-semibold text-foreground tabular-nums">
                {todayNewWords}
                {newWordCap !== null && (
                  <span className="text-muted-foreground font-normal"> / {newWordCap}</span>
                )}
              </span>
            </div>
            {newWordCap !== null && (
              <ProgressBar value={todayNewWords} max={newWordCap} color="bg-indigo-500" />
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Continue Reading ──────────────────────────────────────────────── */}
      {lastReadStory && (
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => navigate(`/story/${lastReadStory.id}`)}
          className="w-full flex items-center justify-between rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors px-5 py-4 text-left group shadow-sm"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <BookOpen size={15} className="text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Continue Reading</p>
              <p className="text-sm font-semibold text-foreground truncate">{lastReadStory.englishTitle ?? lastReadStory.title}</p>
            </div>
          </div>
          <ChevronRight size={15} className="text-muted-foreground group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
        </motion.button>
      )}

      {/* ── Words by Band ─────────────────────────────────────────────────── */}
      {Object.keys(bandBreakdown).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-border bg-card p-5 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-4">
            <Layers size={15} className="text-violet-500" />
            <h3 className="font-semibold text-foreground text-sm">Words by Band</h3>
          </div>
          <div className="space-y-3">
            {(Object.entries(bandBreakdown) as [HskBand, number][]).map(([band, count]) => (
              <div key={band}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{BAND_LABELS[band]}</span>
                  <span className="font-semibold text-foreground tabular-nums">{count}</span>
                </div>
                <ProgressBar
                  value={count}
                  max={Math.max(...(Object.values(bandBreakdown) as number[]))}
                  color={BAND_COLORS[band]}
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* ── Empty state ───────────────────────────────────────────────────── */}
      {words.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          <BookOpen size={28} className="mx-auto mb-2 opacity-30" />
          <p className="text-sm">Read a story and tap words to add them to your deck.</p>
        </div>
      )}
    </div>
  );
}
