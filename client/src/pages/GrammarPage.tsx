/**
 * GrammarPage — main grammar hub.
 *
 * Layout:
 *   - Header with overall progress summary
 *   - 6 band accordions (HSK3-I → HSK5-II)
 *   - Each band shows: progress bar, lesson list
 *   - Click a lesson → opens GrammarLessonModal
 */

import { useState, useMemo, useEffect } from "react";
import { useSearch } from "wouter";
import {
  ALL_GRAMMAR_LESSONS,
  GRAMMAR_BAND_META,
  GRAMMAR_LESSONS_BY_BAND,
  GrammarBand,
  GrammarLesson,
} from "@/lib/grammarData";
import { useGrammarProgress } from "@/hooks/useGrammarProgress";
import { GrammarLessonModal } from "@/components/GrammarLessonModal";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  ChevronRight,
  BookOpen,
  CheckCircle2,
  Circle,
  GraduationCap,
} from "lucide-react";

const BAND_ORDER: GrammarBand[] = [
  "HSK3-I",
  "HSK3-II",
  "HSK4-I",
  "HSK4-II",
  "HSK5-I",
  "HSK5-II",
];

const BAND_COLORS: Record<GrammarBand, string> = {
  "HSK3-I":  "bg-amber-500",
  "HSK3-II": "bg-orange-500",
  "HSK4-I":  "bg-teal-500",
  "HSK4-II": "bg-cyan-500",
  "HSK5-I":  "bg-indigo-500",
  "HSK5-II": "bg-violet-500",
};

const BAND_TEXT_COLORS: Record<GrammarBand, string> = {
  "HSK3-I":  "text-amber-600 dark:text-amber-400",
  "HSK3-II": "text-orange-600 dark:text-orange-400",
  "HSK4-I":  "text-teal-600 dark:text-teal-400",
  "HSK4-II": "text-cyan-600 dark:text-cyan-400",
  "HSK5-I":  "text-indigo-600 dark:text-indigo-400",
  "HSK5-II": "text-violet-600 dark:text-violet-400",
};

const BAND_BG_COLORS: Record<GrammarBand, string> = {
  "HSK3-I":  "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
  "HSK3-II": "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800",
  "HSK4-I":  "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800",
  "HSK4-II": "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-800",
  "HSK5-I":  "bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800",
  "HSK5-II": "bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-800",
};

export default function GrammarPage() {
  const { progress, getBandStats } =
    useGrammarProgress();

  const [openBands, setOpenBands] = useState<Set<GrammarBand>>(
    () => new Set<GrammarBand>(["HSK3-I"])
  );
  const [selectedLesson, setSelectedLesson] = useState<GrammarLesson | null>(
    null
  );

  // Support deep-linking: /grammar?lesson=<id> opens the lesson modal directly
  const search = useSearch();
  useEffect(() => {
    const params = new URLSearchParams(search);
    const lessonId = params.get("lesson");
    if (!lessonId) return;
    const found = ALL_GRAMMAR_LESSONS.find((l) => l.id === lessonId);
    if (found) {
      setSelectedLesson(found);
      setOpenBands((prev) => {
        const next = new Set(prev);
        next.add(found.band);
        return next;
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const toggleBand = (band: GrammarBand) => {
    setOpenBands((prev) => {
      const next = new Set(prev);
      if (next.has(band)) next.delete(band);
      else next.add(band);
      return next;
    });
  };

  // Overall stats
  const totalLessons    = ALL_GRAMMAR_LESSONS.length;
  const completedTotal  = useMemo(
    () => ALL_GRAMMAR_LESSONS.filter((l) => progress[l.id]?.completed).length,
    [progress]
  );
  const overallPct = totalLessons > 0 ? Math.round((completedTotal / totalLessons) * 100) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* ── Header ── */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Grammar</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {totalLessons} structured lessons across 6 HSK bands
        </p>
      </div>

      {/* ── Overall progress card ── */}
      <div className="rounded-xl border bg-card p-4 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Overall Progress</span>
          <span className="text-muted-foreground">
            {completedTotal} / {totalLessons} lessons
          </span>
        </div>
        <Progress value={overallPct} className="h-2" />
        <div className="flex flex-wrap gap-2 pt-1">
          {BAND_ORDER.map((band) => {
            const stats = getBandStats(band);
            const pct   = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
            return (
              <div
                key={band}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span
                  className={`w-2 h-2 rounded-full ${BAND_COLORS[band]}`}
                />
                <span>{GRAMMAR_BAND_META[band].label}</span>
                <span className="font-medium">{pct}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Band accordions ── */}
      <div className="space-y-3">
        {BAND_ORDER.map((band) => {
          const meta    = GRAMMAR_BAND_META[band];
          const lessons = GRAMMAR_LESSONS_BY_BAND[band];
          const stats   = getBandStats(band);
          const pct     = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
          const isOpen  = openBands.has(band);

          return (
            <div
              key={band}
              className={`rounded-xl border overflow-hidden ${BAND_BG_COLORS[band]}`}
            >
              {/* Band header */}
              <button
                onClick={() => toggleBand(band)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${BAND_COLORS[band]}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-semibold text-sm ${BAND_TEXT_COLORS[band]}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {meta.description}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Progress value={pct} className="h-1 flex-1 max-w-[120px]" />
                    <span className="text-xs text-muted-foreground">
                      {stats.completed}/{stats.total}
                    </span>
                  </div>
                </div>
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              {/* Lesson list */}
              {isOpen && (
                <div className="border-t divide-y divide-border/50 bg-background/60">
                  {lessons.map((lesson) => {
                    const prog      = progress[lesson.id];
                    const done      = prog?.completed ?? false;
                    const score     = prog?.masteryScore;
                    const exCount   = lesson.exercises.length;

                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors cursor-pointer group"
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        {/* Completion icon */}
                        <div className="flex-shrink-0">
                          {done ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-muted-foreground/40 group-hover:text-muted-foreground transition-colors" />
                          )}
                        </div>

                        {/* Lesson info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-2 flex-wrap">
                            <span className="text-xs text-muted-foreground w-5 flex-shrink-0">
                              {lesson.order}.
                            </span>
                            <span className={`text-sm font-medium leading-snug ${done ? "text-muted-foreground line-through" : ""}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 ml-7">
                            <span className="text-xs text-muted-foreground truncate">
                              {lesson.formula}
                            </span>
                          </div>
                        </div>

                        {/* Right side badges */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {score != null && (
                            <Badge
                              variant="secondary"
                              className={`text-xs px-1.5 py-0 ${score >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"}`}
                            >
                              {score}%
                            </Badge>
                          )}
                          {exCount > 0 && (
                            <Badge variant="outline" className="text-xs px-1.5 py-0">
                              {exCount} ex
                            </Badge>
                          )}
                          <BookOpen className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Lesson modal ── */}
      {selectedLesson && (
        <GrammarLessonModal
          lesson={selectedLesson}
          onClose={() => setSelectedLesson(null)}
        />
      )}
    </div>
  );
}
