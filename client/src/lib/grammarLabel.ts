/**
 * grammarLabel.ts
 * Infers a grammar/part-of-speech label from a CC-CEDICT definition string.
 * Returns a short human-readable label like "particle", "measure word", "verb", etc.
 */

export type GrammarLabel =
  | "particle"
  | "measure word"
  | "conjunction"
  | "adverb"
  | "preposition"
  | "pronoun"
  | "verb"
  | "adjective"
  | "noun"
  | "numeral"
  | "interjection"
  | "auxiliary"
  | "complement"
  | null;

/** Map of definition substring patterns → grammar label (checked in order) */
const PATTERNS: [RegExp, GrammarLabel][] = [
  // Particles (structural, modal, aspect)
  [/\b(particle|aspect marker|modal particle|structural particle|possessive particle|complement marker)\b/i, "particle"],
  // Measure words / classifiers
  [/\b(classifier|measure word)\b/i, "measure word"],
  // Conjunctions
  [/\b(conjunction|conj\.|correlative conjunction)\b/i, "conjunction"],
  // Adverbs
  [/\b(adverb|adverbial|adv\.)\b/i, "adverb"],
  // Prepositions / coverbs
  [/\b(preposition|coverb)\b/i, "preposition"],
  // Pronouns
  [/\b(pronoun|reflexive pronoun|demonstrative pronoun)\b/i, "pronoun"],
  // Auxiliaries / modal verbs
  [/\b(auxiliary verb|modal verb|can;|may;|must;|should;|ought to)\b/i, "auxiliary"],
  // Interjections
  [/\b(interjection|exclamation)\b/i, "interjection"],
  // Numerals
  [/\b(numeral|ordinal number|cardinal number)\b/i, "numeral"],
  // Complement
  [/\bcomplement\b/i, "complement"],
  // Adjectives (before verbs to avoid "stative verb" being caught as verb)
  [/\b(adjective|adj\.)\b/i, "adjective"],
  // Verbs
  [/\bto (be|have|do|go|come|say|get|make|know|think|take|see|look|want|give|use|find|tell|ask|seem|feel|try|leave|call|keep|let|begin|show|hear|play|run|move|live|believe|hold|bring|happen|write|provide|sit|stand|lose|pay|meet|include|continue|set|learn|change|lead|understand|watch|follow|stop|create|speak|read|spend|grow|open|walk|win|offer|remember|love|consider|appear|buy|wait|serve|die|send|expect|build|stay|fall|cut|reach|kill|remain|suggest|raise|pass|sell|require|report|decide|pull|break|wish|need|receive|agree|develop|draw|push|pick|claim|explain|carry|throw|fight|produce|eat|sleep|drive|fly|swim|climb|jump|dance|sing|cook|clean|wash|fix|help|teach|study|work|travel|visit|meet|join|leave|return|arrive|start|finish|complete|prepare|plan|choose|decide|allow|prevent|protect|support|improve|increase|reduce|control|manage|organize|design|create|build|develop|test|check|review|update|maintain|install|configure|deploy|monitor|analyze|process|store|retrieve|display|show|hide|enable|disable|add|remove|delete|insert|update|select|filter|sort|search|find|replace|copy|move|rename|save|load|import|export|print|share|send|receive|upload|download|sync|backup|restore|reset|refresh|reload|submit|cancel|confirm|approve|reject|accept|decline|invite|request|respond|reply|forward|redirect|connect|disconnect|login|logout|register|authenticate|authorize|verify|validate|encrypt|decrypt|compress|decompress|convert|transform|format|parse|serialize|deserialize|encode|decode|hash|sign|verify)\b/i, "verb"],
  [/\bto [a-z]/i, "verb"],
];

/**
 * Well-known single-character grammar words with fixed labels.
 * These override pattern matching for common ambiguous characters.
 */
const FIXED_LABELS: Record<string, GrammarLabel> = {
  的: "particle",
  地: "particle",
  得: "particle",
  了: "particle",
  着: "particle",
  过: "particle",
  吗: "particle",
  呢: "particle",
  啊: "particle",
  吧: "particle",
  嘛: "particle",
  嗯: "interjection",
  哦: "interjection",
  哇: "interjection",
  哈: "interjection",
  哎: "interjection",
  哟: "interjection",
  个: "measure word",
  张: "measure word",
  条: "measure word",
  块: "measure word",
  件: "measure word",
  位: "measure word",
  次: "measure word",
  遍: "measure word",
  本: "measure word",
  把: "preposition",  // 把 is primarily a preposition/coverb
  杯: "measure word",
  碗: "measure word",
  瓶: "measure word",
  双: "measure word",
  套: "measure word",
  间: "measure word",
  层: "measure word",
  栋: "measure word",
  辆: "measure word",
  匹: "measure word",
  头: "measure word",
  我: "pronoun",
  你: "pronoun",
  他: "pronoun",
  她: "pronoun",
  它: "pronoun",
  我们: "pronoun",
  你们: "pronoun",
  他们: "pronoun",
  她们: "pronoun",
  这: "pronoun",
  那: "pronoun",
  哪: "pronoun",
  谁: "pronoun",
  什么: "pronoun",
  怎么: "pronoun",
  为什么: "pronoun",
  和: "conjunction",
  或: "conjunction",
  但: "conjunction",
  但是: "conjunction",
  虽然: "conjunction",
  因为: "conjunction",
  所以: "conjunction",
  如果: "conjunction",
  要是: "conjunction",
  不管: "conjunction",
  不论: "conjunction",
  既然: "conjunction",
  而且: "conjunction",
  不但: "conjunction",
  不仅: "conjunction",
  否则: "conjunction",
  不然: "conjunction",
  在: "preposition",
  从: "preposition",
  到: "preposition",
  向: "preposition",
  为: "preposition",
  给: "preposition",
  跟: "preposition",
  被: "preposition",
  比: "preposition",
  按照: "preposition",
  根据: "preposition",
  关于: "preposition",
  除了: "preposition",
  都: "adverb",
  也: "adverb",
  还: "adverb",
  就: "adverb",
  才: "adverb",
  已经: "adverb",
  非常: "adverb",
  很: "adverb",
  太: "adverb",
  最: "adverb",
  更: "adverb",
  再: "adverb",
  又: "adverb",
  只是: "adverb",
  仅: "adverb",
  不: "adverb",
  没: "adverb",
  没有: "adverb",
  别: "adverb",
  不要: "adverb",
  一定: "adverb",
  必须: "adverb",
  应该: "adverb",
  可能: "adverb",
  大概: "adverb",
  也许: "adverb",
  可以: "auxiliary",
  能: "auxiliary",
  会: "auxiliary",
  要: "auxiliary",
  想: "auxiliary",
  敢: "auxiliary",
  肯: "auxiliary",
  愿意: "auxiliary",
};

/**
 * Returns a grammar label for a given hanzi + definition string.
 * Returns null if no label can be determined.
 */
export function getGrammarLabel(hanzi: string, definition: string): GrammarLabel {
  // Check fixed labels first
  if (FIXED_LABELS[hanzi] !== undefined) return FIXED_LABELS[hanzi];

  // Check definition patterns
  for (const [pattern, label] of PATTERNS) {
    if (pattern.test(definition)) return label;
  }

  return null;
}

/** Human-readable display for a grammar label */
export function formatGrammarLabel(label: GrammarLabel): string {
  if (!label) return "";
  return label;
}
