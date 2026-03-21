/**
 * formatDefinitions.ts
 *
 * Smart, learner-focused definition formatter for CC-CEDICT data.
 *
 * Core principle: show what is useful, omit what is not.
 *
 * Rules
 * ─────
 * 1. OMIT entirely: surname readings, archaic/variant/obsolete meanings,
 *    and any meaning that is clearly unhelpful to a learner (e.g. "see X5678").
 * 2. CLASSIFY each remaining meaning:
 *      (measure word) — classifiers / MW entries
 *      (grammar)      — particles, aspect markers, structural markers
 *      (common)       — the primary, most-used meaning
 *      (less common)  — secondary meanings that are still genuinely useful
 * 3. ORDER: common → grammar → measure word → less common
 * 4. SINGLE meaning? Just show it labelled (common) — no extra noise.
 * 5. CAP at 4 displayed meanings. Learners don't need more.
 *
 * Examples
 * ─────────
 *   猫  →  cat (common)
 *   家  →  home, family (common) / measure word for shops, companies (measure word)
 *   在  →  at, in, on (common) / action in progress marker (grammar) / to exist (less common)
 *   美  →  beautiful, pretty (common) / America, American (less common)
 *   汤  →  soup, broth (common) / surname Tang (omitted)
 */

export type FrequencyLabel =
  | "common"
  | "less common"
  | "rare"
  | "grammar"
  | "measure word";

export interface LabeledMeaning {
  text: string;
  label: FrequencyLabel;
}

// ─── Omit patterns — these meanings are never shown ──────────────────────────

const OMIT_PATTERNS: RegExp[] = [
  // Surnames
  /^surname\b/i,
  /^(a |the )?surname /i,
  // Archaic / variant / obsolete
  /^old variant of\b/i,
  /^variant of\b/i,
  /^archaic\b/i,
  /^classical\b/i,
  /^obsolete\b/i,
  /^old form of\b/i,
  /^old character for\b/i,
  /\(archaic\)/i,
  /\(classical\)/i,
  /\(literary\)/i,
  /\(old\)/i,
  /\(archaic usage\)/i,
  /\(classical usage\)/i,
  /\(historical\)/i,
  /\bhistorical usage\b/i,
  // Cross-references with no standalone meaning
  /^see [A-Za-z\u4e00-\u9fff]/,
  /^abbr\. for\b/i,
  /^abbr for\b/i,
  // Place names / proper nouns with no general usage value
  /^used in\b/i,
  /^(a )?place name\b/i,
  /^(a )?city in\b/i,
  /^(a )?county in\b/i,
  /^(a )?district in\b/i,
  /^(a )?province in\b/i,
  /^(a )?town in\b/i,
  /^(a )?village in\b/i,
  // Raw CEDICT classifier cross-reference codes, e.g. "CL:隻|只[zhi1]"
  /^CL:/,
  // Taiwan pronunciation notes (learner noise)
  /^Taiwan pr\./i,
  // Slang/vulgar annotations that obscure the primary meaning
  /^\(Tw\) \(slang\)/i,
  // CEDICT internal notation noise — only omit when the bracket reference IS the definition
  // (e.g. a standalone "[he2 shui3]" entry), NOT when embedded mid-sentence
  /used in [^\s]+ \|/,
  /^\[.*?\d+\]$/,  // definition is ONLY a pinyin bracket reference (nothing else)
];

// ─── Grammar patterns ─────────────────────────────────────────────────────────

const GRAMMAR_PATTERNS: RegExp[] = [
  /\bparticle\b/i,
  /\baspect marker\b/i,
  /\bmodal particle\b/i,
  /\bprogressive\b/i,
  /\bindicates\b/i,
  /\bused after\b/i,
  /\bused at the end\b/i,
  /\bcomplement marker\b/i,
  /\bstructural particle\b/i,
  /\bpossessive particle\b/i,
  /\baction in progress\b/i,
  /\baspect\b.*\bmarker\b/i,
  /\btopic marker\b/i,
  /\bsubjunctive\b/i,
  /\bconjunction\b/i,
  /\bpreposition\b/i,
  /\bsuffix\b/i,
  /\bgrammatical\b/i,
];

// ─── Measure word patterns ────────────────────────────────────────────────────

const MEASURE_PATTERNS: RegExp[] = [
  /\bclassifier\b/i,
  /\bmeasure word\b/i,
  /\bMW\b/,
  /^classifier for\b/i,
  /^measure word for\b/i,
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function shouldOmit(text: string): boolean {
  return OMIT_PATTERNS.some((p) => p.test(text));
}

/**
 * Strip trailing or embedded annotations that add noise without adding meaning for learners.
 * Handles CEDICT-specific patterns like classifier codes, Taiwan pronunciation notes,
 * and over-long parenthetical qualifiers.
 */
function cleanMeaning(text: string): string {
  return text
    // Remove CEDICT classifier codes entirely e.g. "(CL:個|个[ge4])"
    .replace(/\s*\(CL:[^)]+\)/g, "")
    // Remove Taiwan pronunciation notes
    .replace(/;\s*Taiwan pr\.[^;]*/gi, "")
    .replace(/\s*\(Taiwan pr\.[^)]*\)/gi, "")
    // Remove "(Tw) (slang) ..." type annotations  
    .replace(/;\s*\(Tw\)[^;]*/gi, "")
    // Remove archaic/literary/dialectal qualifiers at end
    .replace(/\s*\((literary|archaic|classical|historical|old|dated|formal|rare|dialect|dialectal|colloquial|slang|vulgar|offensive|derogatory|euphemism|figurative|figuratively|fig\.|abbrev\.|abbr\.)\)\s*$/i, "")
    // Remove CEDICT cross-reference brackets e.g. [pin1 yin1]
    .replace(/\s*\[[a-z\d\s|，,]+\]/gi, "")
    // Trim trailing semicolons and whitespace
    .replace(/[;,\s]+$/, "")
    .trim();
}

function isGrammar(text: string): boolean {
  return GRAMMAR_PATTERNS.some((p) => p.test(text));
}

function isMeasureWord(text: string): boolean {
  return MEASURE_PATTERNS.some((p) => p.test(text));
}

function classifyMeaning(text: string, position: number): FrequencyLabel {
  if (isMeasureWord(text)) return "measure word";
  if (isGrammar(text)) return "grammar";
  if (position === 0) return "common";
  return "less common";
}

// ─── Main formatter ───────────────────────────────────────────────────────────

/**
 * Takes the ranked result from rankReadings() and produces a clean ordered
 * list of LabeledMeaning objects ready for display.
 *
 * Surname and archaic readings are omitted entirely.
 * Grammar and measure word meanings are promoted regardless of position.
 * Maximum 4 items displayed.
 */
export function formatDefinitionsWithLabels(params: {
  primaryMeanings: string[];
  otherModernMeanings: string[][];   // array of meaning arrays per other reading
  surnameMeanings: string[][];       // omitted entirely
  archaicMeanings: string[][];       // omitted entirely
  maxItems?: number;
}): LabeledMeaning[] {
  const { primaryMeanings, otherModernMeanings, maxItems = 4 } = params;
  const seen = new Set<string>();
  const result: LabeledMeaning[] = [];

  function add(text: string, label: FrequencyLabel) {
    if (shouldOmit(text)) return;
    const cleaned = cleanMeaning(text);
    const key = cleaned.toLowerCase().trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push({ text: cleaned, label });
  }

  // 1. Primary reading — all meanings, classified
  primaryMeanings.forEach((m, i) => {
    add(m, classifyMeaning(m, i));
  });

  // 2. Other modern readings — first meaning of each, classified
  for (const meanings of otherModernMeanings) {
    if (meanings.length === 0) continue;
    const first = meanings[0];
    // Treat as less common unless it's a grammar/MW entry
    const label = isMeasureWord(first) ? "measure word"
                : isGrammar(first)     ? "grammar"
                : "less common";
    add(first, label);
  }

  // Sort: common first, then grammar, then measure word, then less common
  const ORDER: Record<FrequencyLabel, number> = {
    common: 0,
    grammar: 1,
    "measure word": 2,
    "less common": 3,
    rare: 4,
  };
  result.sort((a, b) => ORDER[a.label] - ORDER[b.label]);

  return result.slice(0, maxItems);
}

// ─── Simple formatter for stored flashcard data ───────────────────────────────

/**
 * Formats a flashcard's stored simpleDefinition + otherMeanings into labeled
 * meanings. Used in the Deck card back face where we don't have full CEDICT
 * ranked data available.
 *
 * Surname, archaic, and cross-reference meanings are omitted.
 * Grammar and measure word meanings are labelled correctly.
 * Maximum 4 items displayed.
 */
export function formatFlashcardDefinitions(
  simpleDefinition: string,
  otherMeanings?: string[],
): LabeledMeaning[] {
  const seen = new Set<string>();
  const result: LabeledMeaning[] = [];

  function add(text: string, label: FrequencyLabel) {
    if (shouldOmit(text)) return;
    const cleaned = cleanMeaning(text);
    const key = cleaned.toLowerCase().trim();
    if (!key || seen.has(key)) return;
    seen.add(key);
    result.push({ text: cleaned, label });
  }

  // Primary definition — always (common) unless it's a grammar/MW entry
  if (simpleDefinition) {
    const label = isMeasureWord(simpleDefinition) ? "measure word"
                : isGrammar(simpleDefinition)     ? "grammar"
                : "common";
    add(simpleDefinition, label);
  }

  // Other meanings
  if (otherMeanings) {
    otherMeanings.forEach((m, i) => {
      const label = isMeasureWord(m) ? "measure word"
                  : isGrammar(m)     ? "grammar"
                  : i === 0 && result.length === 0 ? "common"
                  : "less common";
      add(m, label);
    });
  }

  // Sort: common → grammar → measure word → less common
  const ORDER: Record<FrequencyLabel, number> = {
    common: 0,
    grammar: 1,
    "measure word": 2,
    "less common": 3,
    rare: 4,
  };
  result.sort((a, b) => ORDER[a.label] - ORDER[b.label]);

  return result.slice(0, 4);
}


// ─── CC-CEDICT-enriched flashcard definitions ─────────────────────────────────

import { rankReadings } from "./definitionRanker";

/**
 * Like formatFlashcardDefinitions, but enriches with live CC-CEDICT readings
 * when available. The allReadings param comes from getAllReadings(hanzi) in cedict.ts.
 * Falls back to the stored simpleDefinition if CC-CEDICT isn't loaded yet.
 */
export function formatFlashcardDefinitionsEnriched(
  hanzi: string,
  simpleDefinition: string,
  otherMeanings?: string[],
  allReadings?: [string, string][] | null,
): LabeledMeaning[] {
  // If we have CC-CEDICT multi-readings, use the full ranked pipeline
  if (allReadings && allReadings.length > 0) {
    const ranked = rankReadings(hanzi, allReadings);
    const result = formatDefinitionsWithLabels({
      primaryMeanings: ranked.primary.meanings,
      otherModernMeanings: ranked.modern.map((r) => r.meanings),
      surnameMeanings: ranked.surname.map((r) => r.meanings),
      archaicMeanings: ranked.archaic.map((r) => r.meanings),
      maxItems: 4,
    });
    if (result.length > 0) return result;
  }

  // Fall back to stored definitions
  return formatFlashcardDefinitions(simpleDefinition, otherMeanings);
}

// ─── Auto-fill definition cleaner ───────────────────────────────────────────

/**
 * Cleans a raw CEDICT definition string for use as a pre-filled value in the
 * Add Word dialog. Strips classifier codes (CL:...), abbreviation cross-refs,
 * archaic/variant entries, and pinyin bracket noise, then joins the remaining
 * segments with "; ".
 *
 * Example: "ointment / paste / CL:帖[tie3]" → "ointment; paste"
 * Example: "to raise / to increase / to improve" → "to raise; to increase; to improve"
 */
export function cleanAutoFillDefinition(rawDefinition: string): string {
  if (!rawDefinition) return "";
  const segments = rawDefinition.split(" / ");
  const cleaned = segments
    .filter((seg) => !shouldOmit(seg.trim()))
    .map((seg) => cleanMeaning(seg.trim()))
    .filter(Boolean);
  return cleaned.join("; ");
}

// ─── Label badge renderer helper ─────────────────────────────────────────────

/** CSS class sets for each label (Tailwind) */
export const LABEL_STYLES: Record<FrequencyLabel, string> = {
  common:          "text-emerald-600 dark:text-emerald-400",
  "less common":   "text-muted-foreground",
  rare:            "text-muted-foreground/60 italic",
  grammar:         "text-amber-600 dark:text-amber-400",
  "measure word":  "text-sky-600 dark:text-sky-400",
};
