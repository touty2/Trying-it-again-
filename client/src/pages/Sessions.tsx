/**
 * Sessions Tab — Story List
 * Design: Structured Scholar
 *  - Three top-level tabs: All Stories | Suggested Re-read | Completed
 *  - All Stories: band-filter sub-tabs (HSK3-I … HSK5-II)
 *  - Suggested Re-read: texts with ≥2 difficult words, shows word count
 *  - Completed: texts marked as completed, with unmark option
 *  - Each row shows English title + band label + status icons
 */

import { useLocation } from "wouter";
import {
  BookOpen,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useApp } from "@/contexts/AppContext";
import type { Text } from "@/lib/db";

// ─── Band Config ──────────────────────────────────────────────────────────────

const BAND_CONFIG = {
  "HSK3-I":  { label: "HSK 3-I",  pill: "bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50" },
  "HSK3-II": { label: "HSK 3-II", pill: "bg-orange-100/70 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700/50" },
  "HSK4-I":  { label: "HSK 4-I",  pill: "bg-teal-100/70 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-700/50" },
  "HSK4-II": { label: "HSK 4-II", pill: "bg-cyan-100/70 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700/50" },
  "HSK5-I":  { label: "HSK 5-I",  pill: "bg-indigo-100/70 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700/50" },
  "HSK5-II": { label: "HSK 5-II", pill: "bg-violet-100/70 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700/50" },
} as const;

const BAND_ORDER = ["HSK3-I", "HSK3-II", "HSK4-I", "HSK4-II", "HSK5-I", "HSK5-II"] as const;
type Band = (typeof BAND_ORDER)[number];

// ─── Story Row ────────────────────────────────────────────────────────────────

function StoryRow({
  text,
  badge,
  badgeClass,
  actionIcon,
  onAction,
}: {
  text: Text;
  badge?: string;
  badgeClass?: string;
  actionIcon?: React.ReactNode;
  onAction?: (e: React.MouseEvent) => void;
}) {
  const [, navigate] = useLocation();
  const band = BAND_CONFIG[text.band as Band];

  return (
    <button
      onClick={() => navigate(`/story/${text.id}`)}
      className="w-full flex items-center justify-between py-4 border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors px-2 -mx-2 rounded-md text-left group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <BookOpen size={15} className="text-muted-foreground shrink-0" />
        <span className="text-sm font-medium text-foreground truncate">
          {text.englishTitle || text.title}
        </span>
        {band && (
          <span className={`hidden sm:inline-flex text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${band.pill}`}>
            {band.label}
          </span>
        )}
        {badge && (
          <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0 ${badgeClass}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0 ml-2">
        {actionIcon && (
          <span
            onClick={onAction}
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded"
          >
            {actionIcon}
          </span>
        )}
        <ChevronRight
          size={15}
          className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
        />
      </div>
    </button>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState({ icon, message }: { icon: React.ReactNode; message: string }) {
  return (
    <div className="py-16 text-center text-muted-foreground">
      <div className="mx-auto mb-3 opacity-25 flex justify-center">{icon}</div>
      <p className="text-sm">{message}</p>
    </div>
  );
}

// ─── Sessions Page ────────────────────────────────────────────────────────────

export default function Sessions() {
  const {
    texts,
    isLoading,
    completedTextIds,
    markTextCompleted,
    unmarkTextCompleted,
    resetTextMistakes,
    getSuggestedRereadTexts,
  } = useApp();

  const grouped = BAND_ORDER.reduce(
    (acc, band) => {
      acc[band] = texts.filter((t) => t.band === band);
      return acc;
    },
    {} as Record<Band, Text[]>
  );

  const suggestedReread = getSuggestedRereadTexts();
  const completedTexts = texts.filter((t) => completedTextIds.has(t.id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-7 h-7 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-1.5">Reading Sessions</h2>
        <p className="text-sm text-muted-foreground">
          Select a story to begin reading. Tap any word to look it up.
        </p>
      </div>

      {/* Top-level tabs: All | Re-read | Completed */}
      <Tabs defaultValue="all">
        <TabsList className="flex h-auto gap-0 bg-transparent p-0 mb-6 border-b border-border/40 pb-0 rounded-none w-full justify-start">
          <TabsTrigger
            value="all"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-colors px-4 py-2 text-sm font-medium"
          >
            All Stories
            <span className="ml-1.5 text-[11px] text-muted-foreground/60">{texts.length}</span>
          </TabsTrigger>
          <TabsTrigger
            value="reread"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-amber-500 data-[state=active]:text-amber-600 dark:data-[state=active]:text-amber-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-colors px-4 py-2 text-sm font-medium"
          >
            <AlertCircle size={13} className="mr-1.5 inline-block" />
            Suggested Re-read
            {suggestedReread.length > 0 && (
              <span className="ml-1.5 text-[11px] bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded-full">
                {suggestedReread.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-colors px-4 py-2 text-sm font-medium"
          >
            <CheckCircle2 size={13} className="mr-1.5 inline-block" />
            Completed
            {completedTexts.length > 0 && (
              <span className="ml-1.5 text-[11px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full">
                {completedTexts.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* ── All Stories tab ── */}
        <TabsContent value="all" className="mt-0 focus-visible:outline-none">
          <Tabs defaultValue="HSK3-I">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent p-0 mb-4 border-b border-border/30 pb-0 rounded-none">
              {BAND_ORDER.map((band) => (
                <TabsTrigger
                  key={band}
                  value={band}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-muted-foreground hover:text-foreground transition-colors px-3 py-2 text-sm font-medium"
                >
                  {BAND_CONFIG[band].label}
                  <span className="ml-1.5 text-[11px] text-muted-foreground/60">
                    {grouped[band].length}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            {BAND_ORDER.map((band) => (
              <TabsContent key={band} value={band} className="mt-0 focus-visible:outline-none">
                {grouped[band].length === 0 ? (
                  <EmptyState icon={<BookOpen size={36} />} message="No stories in this band yet." />
                ) : (
                  <div className="mt-2">
                    {grouped[band].map((text) => (
                      <StoryRow
                        key={text.id}
                        text={text}
                        badge={completedTextIds.has(text.id) ? "Completed" : undefined}
                        badgeClass="bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50"
                        actionIcon={
                          completedTextIds.has(text.id) ? (
                            <CheckCircle2 size={15} className="text-emerald-500" />
                          ) : undefined
                        }
                        onAction={
                          completedTextIds.has(text.id)
                            ? (e) => { e.stopPropagation(); unmarkTextCompleted(text.id); }
                            : undefined
                        }
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        {/* ── Suggested Re-read tab ── */}
        <TabsContent value="reread" className="mt-0 focus-visible:outline-none">
          {suggestedReread.length === 0 ? (
            <EmptyState
              icon={<AlertCircle size={36} />}
              message="No texts flagged for re-read yet. Keep reviewing flashcards and difficult texts will appear here."
            />
          ) : (
            <div className="mt-2">
              <p className="text-xs text-muted-foreground mb-4">
                These texts have ≥2 words you repeatedly missed. Re-reading them will reinforce your vocabulary.
              </p>
              {suggestedReread.map(({ text, difficultCount }) => (
                <StoryRow
                  key={text.id}
                  text={text}
                  badge={`${difficultCount} difficult word${difficultCount > 1 ? "s" : ""}`}
                  badgeClass="bg-amber-100/70 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700/50"
                  actionIcon={<RotateCcw size={14} className="text-muted-foreground/60" />}
                  onAction={(e) => { e.stopPropagation(); resetTextMistakes(text.id); }}
                />
              ))}
            </div>
          )}
        </TabsContent>

        {/* ── Completed tab ── */}
        <TabsContent value="completed" className="mt-0 focus-visible:outline-none">
          {completedTexts.length === 0 ? (
            <EmptyState
              icon={<CheckCircle2 size={36} />}
              message="No completed texts yet. Mark a story as completed after reading it."
            />
          ) : (
            <div className="mt-2">
              {completedTexts.map((text) => (
                <StoryRow
                  key={text.id}
                  text={text}
                  badge="Completed"
                  badgeClass="bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700/50"
                  actionIcon={<RotateCcw size={14} className="text-muted-foreground/60" />}
                  onAction={(e) => { e.stopPropagation(); unmarkTextCompleted(text.id); }}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
