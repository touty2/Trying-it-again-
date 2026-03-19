import { useState, useCallback, useMemo } from "react";
import { X, ChevronDown, ChevronRight, CheckCircle2, XCircle, RotateCcw, Zap, BookOpen, Trophy } from "lucide-react";
import type { GrammarLesson, GrammarExercise } from "@/lib/grammarData";
import { useGrammarProgress } from "@/hooks/useGrammarProgress";

interface Props {
  lesson: GrammarLesson;
  onClose: () => void;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getPromptText(ex: GrammarExercise): string {
  return ex.question ?? ex.prompt ?? "";
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Exercise state types ────────────────────────────────────────────────────

type FeedbackState = "idle" | "correct" | "incorrect";

interface ExState {
  input: string;
  feedback: FeedbackState;
  reorderWords: string[];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function FillBlankBlock({
  exercises,
  intensive,
}: {
  exercises: GrammarExercise[];
  intensive: boolean;
}) {
  const list = useMemo(
    () => (intensive ? shuffle(exercises) : exercises),
    [exercises, intensive]
  );
  const [states, setStates] = useState<ExState[]>(() =>
    list.map(() => ({ input: "", feedback: "idle", reorderWords: [] }))
  );

  const handleCheck = () => {
    setStates((prev) =>
      prev.map((s, i) => ({
        ...s,
        feedback:
          s.input.trim().toLowerCase() ===
          list[i].answer.trim().toLowerCase()
            ? "correct"
            : "incorrect",
      }))
    );
  };

  const handleReset = () => {
    setStates(list.map(() => ({ input: "", feedback: "idle", reorderWords: [] })));
  };

  const allAnswered = states.every((s) => s.input.trim() !== "");
  const allChecked = states.every((s) => s.feedback !== "idle");

  return (
    <div className="space-y-2">
      {list.map((ex, i) => {
        const prompt = getPromptText(ex);
        const s = states[i];
        return (
          <div key={ex.id + i} className="space-y-1">
            <p className="text-sm text-foreground leading-relaxed">{prompt}</p>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 min-w-0 px-2 py-1 text-sm border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your answer…"
                value={s.input}
                onChange={(e) => {
                  const val = e.target.value;
                  setStates((prev) =>
                    prev.map((x, j) =>
                      j === i ? { ...x, input: val, feedback: "idle" } : x
                    )
                  );
                }}
                onKeyDown={(e) => e.key === "Enter" && handleCheck()}
              />
              {s.feedback === "correct" && (
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              )}
              {s.feedback === "incorrect" && (
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
              )}
            </div>
            {s.feedback === "incorrect" && (
              <p className="text-xs text-muted-foreground pl-1">
                ✓ {list[i].answer}
                {ex.hint && <span className="ml-2 italic">({ex.hint})</span>}
              </p>
            )}
          </div>
        );
      })}
      <div className="flex gap-2 pt-1">
        <button
          disabled={!allAnswered}
          onClick={handleCheck}
          className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Check Answers
        </button>
        {allChecked && (
          <button
            onClick={handleReset}
            className="px-3 py-1 text-xs rounded border hover:bg-muted transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>
    </div>
  );
}

function ReorderCard({
  ex,
  intensive,
}: {
  ex: GrammarExercise;
  intensive: boolean;
}) {
  const initialWords = useMemo(
    () => (intensive ? shuffle(ex.words ?? []) : shuffle(ex.words ?? [])),
    [ex.id, intensive]
  );
  const [bank, setBank] = useState<string[]>(initialWords);
  const [chosen, setChosen] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const pick = (idx: number) => {
    setFeedback("idle");
    setChosen((c) => [...c, bank[idx]]);
    setBank((b) => b.filter((_, i) => i !== idx));
  };
  const unpick = (idx: number) => {
    setFeedback("idle");
    setBank((b) => [...b, chosen[idx]]);
    setChosen((c) => c.filter((_, i) => i !== idx));
  };
  const check = () => {
    setFeedback(
      chosen.join("") === ex.answer.replace(/[。？！，、]/g, "").replace(/\s/g, "")
        ? "correct"
        : "incorrect"
    );
  };
  const reset = () => {
    setBank(initialWords);
    setChosen([]);
    setFeedback("idle");
  };

  return (
    <div className="space-y-2 p-2 rounded border bg-muted/20">
      {/* Chosen area */}
      <div className="min-h-[2rem] flex flex-wrap gap-1 p-1 rounded border border-dashed bg-background">
        {chosen.length === 0 && (
          <span className="text-xs text-muted-foreground self-center px-1">
            Tap words to build the sentence
          </span>
        )}
        {chosen.map((w, i) => (
          <button
            key={i}
            onClick={() => unpick(i)}
            className="px-2 py-0.5 text-sm rounded bg-primary/10 hover:bg-primary/20 transition-colors"
          >
            {w}
          </button>
        ))}
      </div>
      {/* Word bank */}
      <div className="flex flex-wrap gap-1">
        {bank.map((w, i) => (
          <button
            key={i}
            onClick={() => pick(i)}
            className="px-2 py-0.5 text-sm rounded border hover:bg-muted transition-colors"
          >
            {w}
          </button>
        ))}
      </div>
      {/* Feedback */}
      {feedback === "correct" && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> Correct!
        </p>
      )}
      {feedback === "incorrect" && (
        <p className="text-xs text-red-600">
          <XCircle className="w-3 h-3 inline mr-1" />
          {ex.answer}
        </p>
      )}
      <div className="flex gap-2">
        <button
          disabled={chosen.length === 0}
          onClick={check}
          className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Check
        </button>
        <button
          onClick={reset}
          className="px-3 py-1 text-xs rounded border hover:bg-muted transition-colors flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>
    </div>
  );
}

function TranslateBlock({
  exercises,
  intensive,
}: {
  exercises: GrammarExercise[];
  intensive: boolean;
}) {
  const list = useMemo(
    () => (intensive ? shuffle(exercises) : exercises),
    [exercises, intensive]
  );
  const [states, setStates] = useState<ExState[]>(() =>
    list.map(() => ({ input: "", feedback: "idle", reorderWords: [] }))
  );
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    list.map(() => false)
  );

  const reveal = (i: number) =>
    setRevealed((r) => r.map((v, j) => (j === i ? true : v)));

  const handleCheck = (i: number) => {
    const s = states[i];
    const correct =
      s.input.trim().toLowerCase() ===
      list[i].answer.trim().toLowerCase();
    setStates((prev) =>
      prev.map((x, j) =>
        j === i ? { ...x, feedback: correct ? "correct" : "incorrect" } : x
      )
    );
  };

  return (
    <div className="space-y-3">
      {list.map((ex, i) => {
        const prompt = getPromptText(ex);
        const s = states[i];
        const dir = ex.direction ?? "en-to-cn";
        return (
          <div key={ex.id + i} className="space-y-1 p-2 rounded border bg-muted/10">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-medium leading-relaxed flex-1">{prompt}</p>
              <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">
                {dir === "en-to-cn" ? "EN→CN" : "CN→EN"}
              </span>
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 min-w-0 px-2 py-1 text-sm border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Your translation…"
                value={s.input}
                onChange={(e) => {
                  const val = e.target.value;
                  setStates((prev) =>
                    prev.map((x, j) =>
                      j === i ? { ...x, input: val, feedback: "idle" } : x
                    )
                  );
                }}
              />
              <button
                onClick={() => handleCheck(i)}
                disabled={!s.input.trim()}
                className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity shrink-0"
              >
                Check
              </button>
            </div>
            {s.feedback === "correct" && (
              <p className="text-xs text-green-600 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Correct!
              </p>
            )}
            {s.feedback === "incorrect" && (
              <div className="text-xs text-red-600">
                <XCircle className="w-3 h-3 inline mr-1" />
                {revealed[i] ? (
                  <span>{list[i].answer}</span>
                ) : (
                  <button
                    onClick={() => reveal(i)}
                    className="underline hover:no-underline"
                  >
                    Show answer
                  </button>
                )}
              </div>
            )}
            {ex.hint && s.feedback === "idle" && (
              <p className="text-[11px] text-muted-foreground italic">{ex.hint}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

function OtherExerciseCard({ ex }: { ex: GrammarExercise }) {
  const [input, setInput] = useState("");
  const [feedback, setFeedback] = useState<FeedbackState>("idle");

  const check = () => {
    setFeedback(
      input.trim().toLowerCase() === ex.answer.trim().toLowerCase()
        ? "correct"
        : "incorrect"
    );
  };

  return (
    <div className="space-y-1 p-2 rounded border bg-muted/10">
      <p className="text-xs text-muted-foreground uppercase tracking-wide">
        {ex.type.replace("-", " ")}
      </p>
      <p className="text-sm">{getPromptText(ex)}</p>
      {ex.options && (
        <div className="flex flex-wrap gap-1">
          {ex.options.map((o) => (
            <button
              key={o}
              onClick={() => { setInput(o); setFeedback("idle"); }}
              className={`px-2 py-0.5 text-sm rounded border transition-colors ${
                input === o ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      )}
      {!ex.options && (
        <input
          className="w-full px-2 py-1 text-sm border rounded bg-background focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="Your answer…"
          value={input}
          onChange={(e) => { setInput(e.target.value); setFeedback("idle"); }}
        />
      )}
      <div className="flex items-center gap-2">
        <button
          disabled={!input.trim()}
          onClick={check}
          className="px-3 py-1 text-xs rounded bg-primary text-primary-foreground disabled:opacity-40 hover:opacity-90 transition-opacity"
        >
          Check
        </button>
        {feedback === "correct" && (
          <span className="text-xs text-green-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Correct!
          </span>
        )}
        {feedback === "incorrect" && (
          <span className="text-xs text-red-600">
            <XCircle className="w-3 h-3 inline mr-1" />
            {ex.answer}
          </span>
        )}
      </div>
      {ex.explanation && feedback !== "idle" && (
        <p className="text-xs text-muted-foreground">{ex.explanation}</p>
      )}
    </div>
  );
}

// ─── Collapsible section ─────────────────────────────────────────────────────

function Section({
  title,
  count,
  defaultOpen,
  children,
}: {
  title: string;
  count: number;
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border rounded overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-3 py-2 bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-medium"
      >
        <span>{title}</span>
        <span className="flex items-center gap-2 text-muted-foreground text-xs">
          <span>{count} questions</span>
          {open ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </span>
      </button>
      {open && <div className="p-3">{children}</div>}
    </div>
  );
}

// ─── Main modal ──────────────────────────────────────────────────────────────

export function GrammarLessonModal({ lesson, onClose }: Props) {
  const { progress, markComplete, markIncomplete } = useGrammarProgress();
  const prog = progress[lesson.id];
  const isComplete = prog?.completed ?? false;

  const [tab, setTab] = useState<"lesson" | "exercises">("lesson");
  const [intensive, setIntensive] = useState(false);

  // Group exercises by type
  const fillBlanks = lesson.exercises.filter((e) => e.type === "fill-blank");
  const reorders = lesson.exercises.filter((e) => e.type === "reorder");
  const translates = lesson.exercises.filter((e) => e.type === "translate");
  const others = lesson.exercises.filter(
    (e) => !["fill-blank", "reorder", "translate"].includes(e.type)
  );

  const totalExercises = lesson.exercises.length;

  const handleMarkComplete = useCallback(() => {
    if (isComplete) {
      markIncomplete(lesson.id);
    } else {
      markComplete(lesson.id);
    }
  }, [lesson.id, isComplete, markComplete, markIncomplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-background rounded-xl shadow-2xl my-4 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-4 border-b gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                {lesson.band}
              </span>
              {isComplete && (
                <span className="text-xs flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="w-3 h-3" /> Complete
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-bold mt-1 leading-tight">
              {lesson.title}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">{lesson.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 p-1.5 rounded hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex border-b">
          {(["lesson", "exercises"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === t
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "lesson" ? (
                <span className="flex items-center justify-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Lesson
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> Practice
                  <span className="text-xs text-muted-foreground">({totalExercises})</span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-4">
          {tab === "lesson" && (
            <>
              {/* Formula */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                <p className="text-xs text-muted-foreground mb-1 font-medium uppercase tracking-wide">
                  Structure
                </p>
                <p className="text-sm font-mono font-semibold text-primary">
                  {lesson.formula}
                </p>
              </div>

              {/* Explanation */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                  Explanation
                </h3>
                <p className="text-sm leading-relaxed">{lesson.explanation}</p>
              </div>

              {/* Usage rules */}
              {lesson.usageRules.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Usage Rules
                  </h3>
                  <ul className="space-y-1">
                    {lesson.usageRules.map((r, i) => (
                      <li key={i} className="text-sm flex gap-2">
                        <span className="text-primary mt-0.5 shrink-0">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Examples */}
              {lesson.examples.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Examples
                  </h3>
                  <div className="space-y-2">
                    {lesson.examples.map((ex, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg border bg-muted/20 space-y-0.5"
                      >
                        <p className="text-base font-medium leading-snug">
                          {ex.highlight ? (
                            ex.chinese.split(ex.highlight).map((part, j, arr) => (
                              <span key={j}>
                                {part}
                                {j < arr.length - 1 && (
                                  <span className="text-primary font-bold">
                                    {ex.highlight}
                                  </span>
                                )}
                              </span>
                            ))
                          ) : (
                            ex.chinese
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">{ex.pinyin}</p>
                        <p className="text-xs text-foreground/70">{ex.english}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Common mistake */}
              {lesson.commonMistake && (
                <div className="p-3 rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950/20 dark:border-orange-800">
                  <h3 className="text-xs font-semibold text-orange-700 dark:text-orange-400 uppercase tracking-wide mb-1.5">
                    Common English Speaker Mistake
                  </h3>
                  <p className="text-sm text-orange-900 dark:text-orange-200 mb-2">
                    {lesson.commonMistake.description}
                  </p>
                  <div className="space-y-1 text-xs">
                    <p className="text-red-600 dark:text-red-400">
                      ✗ {lesson.commonMistake.wrongExample}
                    </p>
                    <p className="text-green-600 dark:text-green-400">
                      ✓ {lesson.commonMistake.correctExample}
                    </p>
                    {lesson.commonMistake.explanation && (
                      <p className="text-muted-foreground italic mt-1">
                        {lesson.commonMistake.explanation}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Comparison */}
              {lesson.comparison && (
                <div className="p-3 rounded-lg border bg-muted/20">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
                    Comparison: {lesson.comparison.structure}
                  </h3>
                  <p className="text-sm">{lesson.comparison.difference}</p>
                </div>
              )}

              {/* Appears in */}
              {lesson.appearsInTexts && lesson.appearsInTexts.length > 0 && (
                <div className="p-3 rounded-lg border bg-blue-50 dark:bg-blue-950/20">
                  <h3 className="text-xs font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-1.5">
                    Appears In
                  </h3>
                  <ul className="space-y-0.5">
                    {lesson.appearsInTexts.map((t, i) => (
                      <li key={i} className="text-xs text-blue-800 dark:text-blue-300">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}

          {tab === "exercises" && (
            <>
              {/* Practice mode toggle */}
              <div className="flex items-center justify-between p-2 rounded-lg border bg-muted/20">
                <div>
                  <p className="text-sm font-medium">
                    {intensive ? "Intensive Practice" : "Standard Practice"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {intensive
                      ? "Randomized order, all exercises"
                      : "Guided order, grouped by type"}
                  </p>
                </div>
                <button
                  onClick={() => setIntensive((v) => !v)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors ${
                    intensive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <Zap className="w-3 h-3" />
                  {intensive ? "Intensive" : "Standard"}
                </button>
              </div>

              {/* Fill in the blank */}
              {fillBlanks.length > 0 && (
                <Section
                  title="Fill in the Blank"
                  count={fillBlanks.length}
                  defaultOpen={true}
                >
                  <FillBlankBlock exercises={fillBlanks} intensive={intensive} />
                </Section>
              )}

              {/* Sentence reordering */}
              {reorders.length > 0 && (
                <Section
                  title="Sentence Reordering"
                  count={reorders.length}
                  defaultOpen={false}
                >
                  <div className="space-y-3">
                    {(intensive ? shuffle(reorders) : reorders).map((ex) => (
                      <ReorderCard key={ex.id} ex={ex} intensive={intensive} />
                    ))}
                  </div>
                </Section>
              )}

              {/* Translation */}
              {translates.length > 0 && (
                <Section
                  title="Translation"
                  count={translates.length}
                  defaultOpen={false}
                >
                  <TranslateBlock exercises={translates} intensive={intensive} />
                </Section>
              )}

              {/* Other exercises */}
              {others.length > 0 && (
                <Section
                  title="Other Exercises"
                  count={others.length}
                  defaultOpen={false}
                >
                  <div className="space-y-2">
                    {others.map((ex) => (
                      <OtherExerciseCard key={ex.id} ex={ex} />
                    ))}
                  </div>
                </Section>
              )}

              {lesson.exercises.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No exercises available for this lesson yet.
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-3 border-t gap-2">
          <button
            onClick={handleMarkComplete}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors ${
              isComplete
                ? "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700"
                : "hover:bg-muted"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {isComplete ? "Completed" : "Mark Complete"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs rounded border hover:bg-muted transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
