/**
 * GrammarInStory
 *
 * Renders the "Grammar in this story" section below the story text.
 * Features:
 *  - Grammar highlight toggle (colors grammar patterns in the story text)
 *  - 2–3 grammar cards with title, formula, quick explanation
 *  - "Mark as studied" button per card
 *  - "See full lesson →" link to /grammar?lesson=<id>
 *  - Repeats-in-library note if the lesson appears in another story
 */

import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { GraduationCap, CheckCircle2, Circle, ExternalLink, Highlighter, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GrammarLessonModal } from "@/components/GrammarLessonModal";
import { ALL_GRAMMAR_LESSONS, GrammarLesson } from "@/lib/grammarData";
import { STORY_GRAMMAR_MAP } from "@/lib/storyGrammarMap";
import { markGrammarStudied, unmarkGrammarStudied, getStudiedForStory } from "@/lib/storyGrammarDB";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { useSyncNotify } from "@/contexts/SyncContext";

// ─── Band accent colours ────────────────────────────────────────────────────
const BAND_ACCENT: Record<string, string> = {
  "HSK3-I":  "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-700",
  "HSK3-II": "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-700",
  "HSK4-I":  "text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-700",
  "HSK4-II": "text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/20 border-cyan-200 dark:border-cyan-700",
  "HSK5-I":  "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-700",
  "HSK5-II": "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/20 border-violet-200 dark:border-violet-700",
};
const BAND_DOT: Record<string, string> = {
  "HSK3-I":  "bg-amber-500",
  "HSK3-II": "bg-orange-500",
  "HSK4-I":  "bg-teal-500",
  "HSK4-II": "bg-cyan-500",
  "HSK5-I":  "bg-indigo-500",
  "HSK5-II": "bg-violet-500",
};

// ─── Grammar pattern matching ────────────────────────────────────────────────
/**
 * Build a set of Chinese strings to highlight from a grammar lesson's examples.
 * We use the `highlight` field of each example, plus the lesson's formula key characters.
 */
function buildGrammarPatterns(lesson: GrammarLesson): Set<string> {
  const patterns = new Set<string>();
  for (const ex of lesson.examples) {
    if (ex.highlight) {
      // highlight may be a single character or a short phrase
      ex.highlight.split(/[,，、\s]+/).forEach((p) => {
        const trimmed = p.trim();
        if (trimmed) patterns.add(trimmed);
      });
    }
  }
  return patterns;
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props {
  textId: string;
  /** Whether the grammar highlight toggle is on (controlled by parent). */
  highlightOn: boolean;
  onToggleHighlight: () => void;
  /** Called with the full set of patterns to highlight whenever lessons/toggle change. */
  onPatternsChange: (patterns: Set<string>) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function GrammarInStory({ textId, highlightOn, onToggleHighlight, onPatternsChange }: Props) {
  const { isAuthenticated } = useAuth();
  const notifyChange = useSyncNotify();
  const pushMut = trpc.storyGrammar.push.useMutation();

  // Resolve grammar lessons for this story
  const lessonIds = STORY_GRAMMAR_MAP[textId] ?? [];
  const lessons = lessonIds
    .map((id) => ALL_GRAMMAR_LESSONS.find((l) => l.id === id))
    .filter(Boolean) as GrammarLesson[];

  // Local studied state: Set of lessonIds studied in this story
  const [studiedSet, setStudiedSet] = useState<Set<string>>(new Set());
  const [modalLesson, setModalLesson] = useState<GrammarLesson | null>(null);
  const [expanded, setExpanded] = useState(true);

  // Load studied state from IndexedDB on mount
  useEffect(() => {
    getStudiedForStory(textId).then((rows) => {
      setStudiedSet(new Set(rows.map((r) => r.lessonId)));
    });
  }, [textId]);

  // Propagate grammar patterns to parent whenever lessons or toggle changes
  useEffect(() => {
    if (!highlightOn || lessons.length === 0) {
      onPatternsChange(new Set());
      return;
    }
    const combined = new Set<string>();
    lessons.forEach((l) => {
      buildGrammarPatterns(l).forEach((p) => combined.add(p));
    });
    onPatternsChange(combined);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightOn, textId, lessonIds.join(",")]);

  const handleToggleStudied = useCallback(async (lessonId: string) => {
    const isStudied = studiedSet.has(lessonId);
    const next = new Set(studiedSet);
    if (isStudied) {
      next.delete(lessonId);
      await unmarkGrammarStudied(textId, lessonId);
    } else {
      next.add(lessonId);
      await markGrammarStudied(textId, lessonId);
      // Sync to cloud if logged in
      if (isAuthenticated) {
        pushMut.mutate({
          items: [{ textId, lessonId, studiedAt: Date.now() }],
        });
        notifyChange();
      }
    }
    setStudiedSet(next);
  }, [studiedSet, textId, isAuthenticated, pushMut, notifyChange]);

  if (lessons.length === 0) return null;

  const studiedCount = lessons.filter((l) => studiedSet.has(l.id)).length;

  return (
    <div className="mt-10 border border-border/60 rounded-xl overflow-hidden">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border/40">
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
        >
          <GraduationCap size={16} className="text-primary" />
          Grammar in this story
          <Badge variant="secondary" className="text-xs px-1.5 py-0 ml-1">
            {studiedCount}/{lessons.length}
          </Badge>
          {expanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
        </button>

        {/* Highlight toggle */}
        <button
          onClick={onToggleHighlight}
          className={[
            "flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border transition-all",
            highlightOn
              ? "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700"
              : "bg-transparent text-muted-foreground border-border hover:border-amber-300 hover:text-amber-600 dark:hover:text-amber-400",
          ].join(" ")}
          title="Highlight grammar patterns in the text"
        >
          <Highlighter size={13} />
          {highlightOn ? "Highlights on" : "Highlight grammar"}
        </button>
      </div>

      {/* ── Cards ── */}
      {expanded && (
        <div className="divide-y divide-border/40">
          {lessons.map((lesson) => {
            const isStudied = studiedSet.has(lesson.id);
            const bandClass = BAND_ACCENT[lesson.band] ?? "text-muted-foreground bg-muted border-border";
            const dotClass = BAND_DOT[lesson.band] ?? "bg-muted-foreground";

            return (
              <div key={lesson.id} className="px-4 py-4 space-y-2.5">
                {/* Title row */}
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => handleToggleStudied(lesson.id)}
                    className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    title={isStudied ? "Mark as not studied" : "Mark as studied"}
                  >
                    {isStudied
                      ? <CheckCircle2 size={18} className="text-green-500" />
                      : <Circle size={18} />
                    }
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-foreground leading-snug">
                        {lesson.title}
                      </span>
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${bandClass}`}>
                        <span className={`inline-block w-1.5 h-1.5 rounded-full mr-1 ${dotClass}`} />
                        {lesson.band.replace("-", " ")}
                      </span>
                    </div>

                    {/* Formula */}
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 leading-relaxed">
                      {lesson.formula}
                    </p>
                  </div>

                  {/* Open full lesson */}
                  <button
                    onClick={() => setModalLesson(lesson)}
                    className="flex-shrink-0 flex items-center gap-1 text-xs text-primary hover:underline"
                    title="Open full lesson"
                  >
                    <ExternalLink size={12} />
                    Full lesson
                  </button>
                </div>

                {/* Quick explanation */}
                <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                  {lesson.explanation.length > 220
                    ? lesson.explanation.slice(0, 220) + "…"
                    : lesson.explanation}
                </p>

                {/* Example */}
                {lesson.examples[0] && (
                  <div className="pl-7">
                    <div className="inline-block rounded-lg bg-muted/50 px-3 py-2 text-sm space-y-0.5">
                      <p className="font-medium text-foreground" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                        {lesson.examples[0].chinese}
                      </p>
                      <p className="text-xs text-muted-foreground">{lesson.examples[0].pinyin}</p>
                      <p className="text-xs text-muted-foreground italic">{lesson.examples[0].english}</p>
                    </div>
                  </div>
                )}

                {/* Also see link — if this lesson appears in other texts */}
                {lesson.appearsInTexts && lesson.appearsInTexts.length > 1 && (
                  <p className="pl-7 text-xs text-muted-foreground">
                    Also appears in other stories.{" "}
                    <Link
                      href={`/grammar?lesson=${lesson.id}`}
                      className="text-primary hover:underline inline-flex items-center gap-0.5"
                    >
                      See in Grammar library <ExternalLink size={10} />
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── Lesson modal ── */}
      {modalLesson && (
        <GrammarLessonModal lesson={modalLesson} onClose={() => setModalLesson(null)} />
      )}
    </div>
  );
}
