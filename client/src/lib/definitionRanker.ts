/**
 * definitionRanker.ts
 *
 * Ranks and filters CC-CEDICT readings for a given hanzi in context.
 *
 * Ranking order (highest priority first):
 *   1. Contextual / heuristic best match (function-word identity + position)
 *   2. High-frequency modern meanings
 *   3. Other modern meanings
 *   4. Proper name (if detected)
 *   5. Surname
 *   6. Rare meanings
 *   7. Archaic / variant (collapsed)
 *
 * Filtering:
 *   - "old variant of …", "archaic", "classical" → collapsed under "Rare / archaic"
 *   - Surname entries deprioritized unless proper-name context detected
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Reading {
  pinyin: string;
  /** Raw CEDICT definition string (slash-separated) */
  raw: string;
  /** Parsed individual meanings */
  meanings: string[];
}

export interface RankedResult {
  /** The best single reading to show as primary */
  primary: Reading;
  /** Remaining modern readings (non-archaic, non-surname) */
  modern: Reading[];
  /** Surname readings */
  surname: Reading[];
  /** Archaic / variant / rare readings */
  archaic: Reading[];
  /** Whether the word is likely a proper name */
  isProperName: boolean;
  /** Grammar label hint from the best reading */
  grammarHint: string | null;
}

// ─── Common Chinese surnames (top ~200) ──────────────────────────────────────

const COMMON_SURNAMES = new Set([
  "王","李","张","刘","陈","杨","黄","赵","吴","周","徐","孙","马","朱","胡",
  "郭","何","高","林","郑","谢","罗","梁","宋","唐","许","韩","冯","邓","曹",
  "彭","曾","肖","田","董","袁","潘","于","蒋","蔡","余","杜","叶","程","苏",
  "魏","吕","丁","任","沈","姚","卢","傅","钟","姜","崔","谭","廖","范","汪",
  "陆","金","石","戴","贾","韦","夏","邱","方","侯","邹","熊","孟","秦","白",
  "江","阎","薛","尹","段","雷","黎","史","龙","陶","贺","顾","毛","郝","龚",
  "邵","万","钱","严","覃","武","戚","莫","孔","向","常","汤","乔","伍","赖",
  "庄","聂","章","鲁","岳","翟","詹","申","欧","殷","柳","温","柴","卞","牛",
  "都","杜","和","华","曲","裴","施","宁","仇","麻","桂","禹","甘","时","明",
]);

// ─── Archaic / variant detection ─────────────────────────────────────────────

const ARCHAIC_PATTERNS = [
  /^old variant of\b/i,
  /^variant of\b/i,
  /^archaic\b/i,
  /^classical\b/i,
  /^obsolete\b/i,
  /^old form of\b/i,
  /^old character for\b/i,
  /^used in\b.*\bplace of\b/i,
  /\(archaic\)/i,
  /\(classical\)/i,
  /\(literary\)/i,
];

function isArchaicDef(def: string): boolean {
  const first = def.split("/")[0].trim();
  return ARCHAIC_PATTERNS.some((p) => p.test(first));
}

// ─── Surname detection ────────────────────────────────────────────────────────

function isSurnamePinyin(pinyin: string): boolean {
  // Surnames in CEDICT use uppercase first letter: Du1, He2, Li3, etc.
  return /^[A-Z]/.test(pinyin.trim());
}

function isSurnameDef(def: string): boolean {
  const first = def.split("/")[0].trim().toLowerCase();
  return first.startsWith("surname ") || first === "surname";
}

// ─── Proper name detection ────────────────────────────────────────────────────

/**
 * Returns true if the hanzi looks like a person's name:
 *  - 2–3 chars, first char is a common surname
 *  - OR the surrounding sentence context contains name-introduction patterns
 */
export function isProperNameContext(hanzi: string, sentenceContext?: string): boolean {
  if (hanzi.length < 2 || hanzi.length > 4) return false;
  const firstChar = hanzi[0];
  if (!COMMON_SURNAMES.has(firstChar)) return false;

  // If context is provided, look for name-introduction patterns
  if (sentenceContext) {
    const namePatterns = [
      /叫\s*\S{1,3}/,        // 叫XXX (called/named)
      /名字叫/,               // 名字叫
      /名叫/,                 // 名叫
      /是\S{2,3}[，。]/,      // 是XXX，
      /\S{2,3}是[我他她]/,    // XXX是我/他/她
    ];
    if (namePatterns.some((p) => p.test(sentenceContext))) return true;
  }

  // 2-char words starting with common surname are likely names
  return hanzi.length === 2 || hanzi.length === 3;
}

// ─── Function-word identity map ───────────────────────────────────────────────
// Maps a hanzi to its dominant grammatical role regardless of position.
// These override the general position heuristics when matched.

const FUNCTION_WORD_POS: Record<string, PosHint> = {
  // Prepositions / coverbs
  "在":  "preposition",  // at, in, on (location/time)
  "从":  "preposition",  // from
  "往":  "preposition",  // towards
  "向":  "向" as never,  // towards (handled below)
  "对":  "preposition",  // towards, regarding
  "给":  "preposition",  // to, for (recipient)
  "跟":  "preposition",  // with, following
  "比":  "preposition",  // compared to
  "被":  "preposition",  // passive marker (by)
  "把":  "preposition",  // disposal marker (bǎ)
  "让":  "preposition",  // causative (let/make)
  "用":  "preposition",  // using, with (instrument)
  "以":  "preposition",  // using, by means of
  "按":  "preposition",  // according to
  "除了": "preposition", // except for, besides
  "关于": "preposition", // regarding, about
  "对于": "preposition", // regarding, with respect to
  "由":  "preposition",  // by, from, due to
  "为":  "preposition",  // for (purpose/benefit)
  "为了": "preposition", // in order to, for the sake of
  "经过": "preposition", // through, via, after
  "通过": "preposition", // through, by means of
  "根据": "preposition", // according to, based on
  "随着": "preposition", // along with, following
  "离":  "preposition",  // away from, from (distance)
  "到":  "preposition",  // to, until, arriving at
  "朝":  "preposition",  // towards, facing
  // Particles
  "的":  "particle",
  "地":  "particle",
  "得":  "particle",
  "了":  "particle",
  "着":  "particle",
  "过":  "particle",
  "吗":  "particle",
  "呢":  "particle",
  "啊":  "particle",
  "吧":  "particle",
  "嘛":  "particle",
  "嗯":  "particle",
  // Adverbs
  "都":  "adverb",
  "也":  "adverb",
  "还":  "adverb",
  "就":  "adverb",
  "才":  "adverb",
  "已经": "adverb",
  "非常": "adverb",
  "很":  "adverb",
  "太":  "adverb",
  "最":  "adverb",
  "更":  "adverb",
  "再":  "adverb",
  "又":  "adverb",
  "只":  "adverb",
  "一定": "adverb",
  "可能": "adverb",
  "应该": "adverb",
  "必须": "adverb",
  "不":  "adverb",
  "没":  "adverb",
  "别":  "adverb",
  "真":  "adverb",
  "刚":  "adverb",
  "刚才": "adverb",
  "马上": "adverb",
  "立刻": "adverb",
  "经常": "adverb",
  "常常": "adverb",
  "总是": "adverb",
  "有时": "adverb",
  "偶尔": "adverb",
  "一起": "adverb",
  "一直": "adverb",
  "终于": "adverb",
  "终究": "adverb",
  "居然": "adverb",
  "竟然": "adverb",
  "幸好": "adverb",
  "幸亏": "adverb",
  "其实": "adverb",
  "确实": "adverb",
  "当然": "adverb",
  "大概": "adverb",
  "也许": "adverb",
  "几乎": "adverb",
  "甚至": "adverb",
  "尤其": "adverb",
  "特别": "adverb",
  "尽量": "adverb",
  "相当": "adverb",  // 相当 = quite/considerably (adverb usage is most common)
  "十分": "adverb",
  "格外": "adverb",
  "颇":  "adverb",
  // Conjunctions
  "和":  "conjunction",
  "与":  "conjunction",
  "或":  "conjunction",
  "及":  "conjunction",
  "而":  "conjunction",
  "但":  "conjunction",
  "但是": "conjunction",
  "可是": "conjunction",
  "不过": "conjunction",
  "然而": "conjunction",
  "虽然": "conjunction",
  "尽管": "conjunction",
  "因为": "conjunction",
  "所以": "conjunction",
  "因此": "conjunction",
  "如果": "conjunction",
  "要是": "conjunction",
  "假如": "conjunction",
  "只要": "conjunction",
  "只有": "conjunction",
  "除非": "conjunction",
  "不管": "conjunction",
  "无论": "conjunction",
  "既然": "conjunction",
  "不但": "conjunction",
  "不仅": "conjunction",
  "而且": "conjunction",
  "并且": "conjunction",
  "或者": "conjunction",
  "还是": "conjunction",
};

// ─── Verb-following characters (signals preposition before verb phrase) ───────
// If 在/从/往 is followed by these, it's more likely an aspect/verb usage
const VERB_STARTERS = new Set([
  "做","去","来","走","跑","说","看","想","学","工","玩","吃","喝","睡","买",
  "卖","写","读","听","唱","跳","笑","哭","帮","找","等","用","拿","放","开",
  "关","打","踢","推","拉","坐","站","躺","飞","游","爬","跳","停","继续",
]);

// ─── POS heuristic from context ──────────────────────────────────────────────

/**
 * Given a word and its surrounding sentence, return a POS hint
 * that can be used to prefer certain readings.
 */
export type PosHint =
  | "conjunction"   // between two nouns/clauses
  | "adverb"        // before a verb
  | "measure-word"  // after a numeral
  | "adjective"     // before a noun
  | "preposition"   // before a noun phrase
  | "particle"      // at end of clause
  | "verb"          // main predicate position
  | null;

export function getPosHint(hanzi: string, sentence: string): PosHint {
  if (!sentence) return null;
  const idx = sentence.indexOf(hanzi);
  if (idx < 0) return null;

  const before = sentence.slice(Math.max(0, idx - 3), idx);
  const after  = sentence.slice(idx + hanzi.length, idx + hanzi.length + 4);
  const afterChar = after.trim()[0] ?? "";

  // ── 1. After a numeral → measure word ──────────────────────────────────────
  if (/[一二三四五六七八九十百千万亿两\d]$/.test(before)) return "measure-word";

  // ── 2. At end of clause (before punctuation or end) → particle ─────────────
  if (/^[，。！？、；…]/.test(after) || after.trim() === "") return "particle";

  // ── 3. Function-word identity map (highest confidence) ─────────────────────
  const identityHint = FUNCTION_WORD_POS[hanzi];
  if (identityHint) {
    // Special case: 在 followed by a verb phrase → aspect marker (particle)
    // e.g. 在学习 (is studying), 在看书 (is reading)
    if (hanzi === "在" && VERB_STARTERS.has(afterChar)) {
      return "particle"; // progressive aspect
    }
    // Special case: 在 at start of sentence or after subject → preposition
    // 在中国 → preposition; 在家 → preposition
    if (hanzi === "在") return "preposition";

    // 了 at end of sentence = particle; 了 after verb = aspect particle
    if (hanzi === "了") return "particle";

    // 过 after verb = experiential aspect; 过 alone = verb (to pass)
    if (hanzi === "过") {
      // If immediately after a verb character, it's aspect
      const prevChar = before.trim().slice(-1);
      if (prevChar && /[\u4e00-\u9fff]/.test(prevChar)) return "particle";
      return "verb";
    }

    return identityHint;
  }

  // ── 4. 和/与/或 between two content words → conjunction ─────────────────────
  if (["和", "与", "或", "及", "而"].includes(hanzi)) {
    if (before.trim().length > 0 && after.trim().length > 0) return "conjunction";
  }

  return null;
}

// ─── Preferred definition keywords per POS ───────────────────────────────────
// Maps posHint → keywords that should appear in the first meaning of the best reading.

const POS_KEYWORDS: Partial<Record<string, string[]>> = {
  conjunction:    ["conj", "and", "together with", "joining", "or", "but", "however", "although", "because", "therefore"],
  adverb:         ["adv", "all", "both", "entirely", "even", "already", "very", "quite", "just", "only", "still", "again", "always", "never"],
  "measure-word": ["classifier", "measure word", "MW", "for "],
  adjective:      ["adj", "good", "big", "small", "beautiful", "happy", "sad", "fast", "slow"],
  preposition:    ["prep", "at", "in", "on", "from", "to", "by", "for", "with", "towards", "regarding", "according"],
  particle:       ["particle", "aspect marker", "modal", "indicates", "used after", "used at"],
  verb:           ["to ", "verb"],
};

// ─── Pinyin frequency map ───────────────────────────────────────────────────
// For common polyphonic characters, maps hanzi → the preferred pinyin reading
// (in CC-CEDICT numeric tone format). The preferred reading receives a +800 score
// boost so it reliably wins over the less common reading when no stronger
// contextual signal (POS hint, function-word identity) is present.
//
// Only include words where one reading is overwhelmingly more common in everyday
// speech. Words whose reading is fully determined by context (e.g. 的/地/得/了/着)
// are handled by the function-word identity maps above and are omitted here.

const PINYIN_FREQUENCY: Record<string, string> = {
  // ── Verbs / adjectives with one dominant reading ──────────────────────────
  "看": "kan4",      // to look/watch (kān = to look after, rare in speech)
  "长": "chang2",   // long / to grow (zhǎng = to grow up, less common as standalone)
  "重": "zhong4",   // heavy / important (chóng = again/repeat, less common standalone)
  "好": "hao3",     // good (hào = to like/be fond of, much rarer)
  "行": "xing2",    // to walk / OK (háng = row/profession, less common standalone)
  "发": "fa1",      // to send / to develop (fà = hair, only in 头发)
  "乐": "le4",      // happy / music (yuè = music, only in 音乐/乐器 compounds)
  "数": "shu4",     // number / several (shǔ = to count, less common standalone)
  "省": "sheng3",   // province / to save (xǐng = to introspect, rare)
  "还": "hai2",     // still / also (huán = to return, much rarer standalone)
  "觉": "jue2",     // to feel / to sense (jiào = sleep, only in 睡觉)
  "种": "zhong3",   // kind / type / seed (zhòng = to plant, less common standalone)
  "差": "cha4",     // bad / lacking (chā = difference; chāi = errand)
  "为": "wei4",     // for / because of (wéi = to be/act as, less common standalone)
  "空": "kong4",    // free time / empty (kōng = empty space/sky, context-dependent)
  "假": "jia3",     // fake / holiday (jià = vacation, only in 放假/假期)
  "处": "chu3",     // to deal with / place (chù = place/location, both common)
  "当": "dang1",    // to serve as / when (dàng = appropriate/to pawn, less common)
  "分": "fen1",     // to divide / minute (fèn = portion/share, less common standalone)
  "更": "geng4",    // even more (gēng = to change/night watch, rare in speech)
  "教": "jiao1",    // to teach (jiào = religion/to make, less common standalone)
  "累": "lei4",     // tired (lěi = to accumulate; léi = rope, both rarer)
  "难": "nan2",     // difficult (nàn = disaster/calamity, rare standalone)
  "强": "qiang2",   // strong (qiǎng = to force; jiàng = stubborn, both rarer)
  "少": "shao3",    // few / little (shào = young, only in 少年/少女)
  "应": "ying1",    // should / to respond (yìng = to respond, both common)
  "中": "zhong1",   // middle / China (zhòng = to hit/be hit by, much rarer standalone)
  "大": "da4",      // big (dài = only in 大夫 dàifu, rare)
  "地": "di4",      // ground / earth (de = structural particle, handled by ALWAYS_PART)
  "都": "dou1",     // all / both (dū = capital city, rare standalone)
  "过": "guo4",     // to pass / aspect marker (guō = surname only)
  "和": "he2",      // and / together with (hé = same; huó = to mix; hè = to respond)
  "话": "hua4",     // speech / words (huà = single reading, included for completeness)
  "会": "hui4",     // can / will / meeting (kuài = accounting, rare standalone)
  "家": "jia1",     // home / family (jiā = single dominant reading)
  "间": "jian1",    // between / room (jiàn = gap/interval, less common standalone)
  "角": "jiao3",    // corner / horn / jiao (coin) (jué = role, only in 角色)
  "解": "jie3",     // to understand / to untie (jiè = to escort; xiè = surname)
  "近": "jin4",     // near (jìn = single dominant reading)
  "尽": "jin3",     // to the utmost (jìn = to exhaust/use up, both common)
  "卷": "juan4",    // exam paper / volume (juǎn = to roll up, both common)
  "开": "kai1",     // to open (kāi = single dominant reading)
  "可": "ke3",      // can / may (kè = only in 可汗, rare)
  "块": "kuai4",    // piece / lump / yuan (kuài = single dominant reading)
  "来": "lai2",     // to come (lái = single dominant reading)
  "老": "lao3",     // old (lǎo = single dominant reading)
  "了": "le5",      // particle (liǎo = to finish, handled by ALWAYS_PART)
  "量": "liang4",   // quantity / to measure (liáng = to measure, both common)
  "没": "mei2",     // not have / no (mò = to sink, rare standalone)
  "明": "ming2",    // bright / clear (míng = single dominant reading)
  "那": "na4",      // that (nà = single dominant reading; nǎ = which, different char)
  "年": "nian2",    // year (nián = single dominant reading)
  "朋": "peng2",    // friend (péng = single dominant reading)
  "期": "qi1",      // period / to expect (qī = single dominant reading)
  "起": "qi3",      // to rise / to start (qǐ = single dominant reading)
  "前": "qian2",    // front / before (qián = single dominant reading)
  "钱": "qian2",    // money (qián = single dominant reading)
  "切": "qie1",     // to cut (qiē = to cut; qiè = to correspond to, both common)
  "亲": "qin1",     // parent / dear (qìng = in-law, only in 亲家)
  "情": "qing2",    // feeling / emotion (qíng = single dominant reading)
  "请": "qing3",    // please / to invite (qǐng = single dominant reading)
  "去": "qu4",      // to go (qù = single dominant reading)
  "然": "ran2",     // so / like that (rán = single dominant reading)
  "人": "ren2",     // person (rén = single dominant reading)
  "日": "ri4",      // day / sun (rì = single dominant reading)
  "如": "ru2",      // like / as if (rú = single dominant reading)
  "上": "shang4",   // up / above / to go up (shàng = dominant; shǎng = a while ago)
  "身": "shen1",    // body (shēn = single dominant reading)
  "什": "shen2",    // what (shén = single dominant reading)
  "生": "sheng1",   // to give birth / student (shēng = dominant; xìng = surname only)
  "时": "shi2",     // time / when (shí = dominant; shì = surname only)
  "事": "shi4",     // matter / thing (shì = single dominant reading)
  "是": "shi4",     // to be (shì = single dominant reading)
  "手": "shou3",    // hand (shǒu = single dominant reading)
  "说": "shuo1",    // to speak (shuō = single dominant reading)
  "思": "si1",      // to think (sī = dominant; sāi = only in 于思, rare)
  "所": "suo3",     // place / that which (suǒ = single dominant reading)
  "听": "ting1",    // to listen (tīng = single dominant reading)
  "同": "tong2",    // same / together (tóng = dominant; tòng = in 胡同, rare)
  "头": "tou2",     // head (tóu = dominant; tou = suffix, neutral tone)
  "外": "wai4",     // outside (wài = single dominant reading)
  "文": "wen2",     // language / culture (wén = single dominant reading)
  "问": "wen4",     // to ask (wèn = single dominant reading)
  "我": "wo3",      // I / me (wǒ = single dominant reading)
  "想": "xiang3",   // to think / to want (xiǎng = single dominant reading)
  "小": "xiao3",    // small (xiǎo = single dominant reading)
  "写": "xie3",     // to write (xiě = single dominant reading)
  "学": "xue2",     // to study (xué = single dominant reading)
  "颜": "yan2",     // color / face (yán = single dominant reading)
  "要": "yao4",     // to want / must (yào = dominant; yāo = to invite, rare)
  "也": "ye3",      // also (yě = single dominant reading)
  "一": "yi1",      // one (yī = dominant; tone sandhi handled in speech)
  "以": "yi3",      // by means of / already (yǐ = single dominant reading)
  "意": "yi4",      // meaning / intention (yì = single dominant reading)
  "因": "yin1",     // because / cause (yīn = single dominant reading)
  "用": "yong4",    // to use (yòng = single dominant reading)
  "有": "you3",     // to have (yǒu = single dominant reading)
  "又": "you4",     // again / also (yòu = single dominant reading)
  "与": "yu3",      // and / with (yǔ = dominant; yù = to participate, rare)
  "语": "yu3",      // language (yǔ = single dominant reading)
  "原": "yuan2",    // original / source (yuán = single dominant reading)
  "月": "yue4",     // month / moon (yuè = single dominant reading)
  "在": "zai4",     // at / in / to be at (zài = single dominant reading)
  "怎": "zen3",     // how (zěn = single dominant reading)
  "这": "zhe4",     // this (zhè = single dominant reading)
  "知": "zhi1",     // to know (zhī = dominant; zhì = surname only)
  "只": "zhi3",     // only / just (zhǐ = dominant; zhī = classifier for animals)
  "子": "zi3",      // child / son (zǐ = dominant; zi = neutral tone suffix)
  "自": "zi4",      // self (zì = single dominant reading)
  "走": "zou3",     // to walk (zǒu = single dominant reading)
  "做": "zuo4",     // to do / to make (zuò = single dominant reading)
  // ── Common compounds where a character has a non-obvious reading ─────────────
  "睡": "shui4",    // to sleep (shuì = single dominant reading)
  "着": "zhe5",     // aspect particle (zháo = to touch; zhuó = to wear, both rarer)
  "得": "de5",      // structural particle (dé = to get; děi = must, both common)
  "的": "de5",      // structural particle (dí = indeed; dì = target, both rare)
};

// ─── Reading scorer ───────────────────────────────────────────────────────────

/**
 * Score a reading: higher = better match for the given context.
 * Returns a number; higher is better.
 */
function scoreReading(
  reading: Reading,
  hanzi: string,
  posHint: PosHint,
  isName: boolean,
): number {
  const def = reading.raw;
  const firstMeaning = reading.meanings[0] ?? "";
  const firstLower = firstMeaning.toLowerCase();

  let score = 0;

  // Heavily penalize archaic/variant
  if (isArchaicDef(def)) return -1000;

  // Penalize surname unless it's a proper name context
  if (isSurnamePinyin(reading.pinyin) || isSurnameDef(def)) {
    if (isName) return 50; // promote if name context
    return -500;
  }

  // Prefer lowercase pinyin (common readings) over uppercase (surnames/proper)
  if (/^[a-z]/.test(reading.pinyin.trim())) score += 100;

  // POS hint matching — strong boost when definition matches expected POS
  if (posHint) {
    const keywords = POS_KEYWORDS[posHint] ?? [];
    if (keywords.some((kw) => firstLower.includes(kw))) {
      score += 400;
    }
    // Extra boost: if the entire first meaning is very short and matches (e.g. "at/in/on")
    if (firstMeaning.length < 30 && keywords.some((kw) => firstLower.includes(kw))) {
      score += 100;
    }
  }

  // ── Pinyin frequency boost ──────────────────────────────────────────────────
  // If this hanzi has a known preferred reading, boost that reading by +800.
  // This fires before POS hinting so it acts as a strong prior for polyphonic
  // characters where one reading is overwhelmingly more common in everyday speech.
  const preferredPinyin = PINYIN_FREQUENCY[hanzi];
  if (preferredPinyin) {
    // Normalize both sides: lowercase, strip spaces for comparison
    const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");
    if (norm(reading.pinyin) === norm(preferredPinyin)) {
      score += 800;
    }
  }

  // Prefer shorter, cleaner definitions (more common words tend to have concise defs)
  if (reading.meanings.length >= 2 && reading.meanings.length <= 6) score += 20;

  // Prefer definitions that don't start with "see " (cross-references)
  if (!firstLower.startsWith("see ")) score += 30;

  // ── Hard-coded identity boosts (highest confidence) ──────────────────────
  // These ensure common function words always get their grammatical reading first.

  const ALWAYS_ADVERB = new Set(["都","也","还","就","才","已经","非常","很","太","最","更","再","又","只","真","刚","马上","立刻","经常","常常","总是","一直","终于","居然","竟然","其实","确实","当然","大概","也许","几乎","甚至","尤其","特别","尽量"]);
  const ALWAYS_CONJ   = new Set(["和","与","或","及","而","但","但是","可是","不过","然而","虽然","尽管","因为","所以","因此","如果","要是","假如","只要","只有","除非","不管","无论","既然","不但","不仅","而且","并且","或者"]);
  const ALWAYS_PART   = new Set(["的","地","得","了","着","过","吗","呢","啊","吧","嘛","嗯"]);
  const ALWAYS_PREP   = new Set(["在","从","往","对","给","跟","比","被","把","让","用","以","按","由","为","离","到","朝","向","除了","关于","对于","为了","经过","通过","根据","随着"]);

  if (ALWAYS_ADVERB.has(hanzi)) {
    if (firstLower.includes("all") || firstLower.includes("both") || firstLower.includes("entirely") ||
        firstLower.includes("adv") || firstLower.includes("very") || firstLower.includes("just") ||
        firstLower.includes("still") || firstLower.includes("already") || firstLower.includes("only") ||
        firstLower.includes("even") || firstLower.includes("again") || firstLower.includes("quite")) {
      score += 600;
    }
  }

  if (ALWAYS_CONJ.has(hanzi)) {
    if (firstLower.includes("and") || firstLower.includes("conj") || firstLower.includes("joining") ||
        firstLower.includes("together with") || firstLower.includes("or") || firstLower.includes("but") ||
        firstLower.includes("however") || firstLower.includes("although") || firstLower.includes("because") ||
        firstLower.includes("therefore") || firstLower.includes("if") || firstLower.includes("unless")) {
      score += 600;
    }
  }

  if (ALWAYS_PART.has(hanzi)) {
    if (firstLower.includes("particle") || firstLower.includes("aspect") || firstLower.includes("indicates") ||
        firstLower.includes("used after") || firstLower.includes("modal")) {
      score += 600;
    }
  }

  if (ALWAYS_PREP.has(hanzi)) {
    // Boost preposition/coverb readings: "at/in/on/from/to/by/for/with/towards"
    if (firstLower.includes("prep") || firstLower.includes(" at ") || firstLower.includes(" in ") ||
        firstLower.includes(" on ") || firstLower.includes("from") || firstLower.includes(" to ") ||
        firstLower.includes(" by ") || firstLower.includes(" for ") || firstLower.includes("with") ||
        firstLower.includes("towards") || firstLower.includes("regarding") || firstLower.includes("according") ||
        firstLower.includes("passive") || firstLower.includes("disposal") || firstLower.includes("using") ||
        firstLower.includes("located") || firstLower.includes("indicates location") ||
        firstLower.includes("away from") || firstLower.includes("compared") ||
        // 在 specific: "in", "at", "on" as first word
        (hanzi === "在" && /^(in|at|on|located|indicates)\b/i.test(firstMeaning))) {
      score += 700;
    }
    // Penalize "to exist" / "to be alive" / "to live" for 在 when used as preposition
    if (hanzi === "在" && (firstLower.includes("to exist") || firstLower.includes("to be alive") ||
        firstLower.includes("alive") || firstLower.includes("living"))) {
      score -= 400;
    }
    // Penalize "to compare" for 比 when used as preposition
    if (hanzi === "比" && firstLower.includes("to compare")) {
      score -= 200;
    }
    // Penalize "to give" for 给 when it's a preposition marker
    if (hanzi === "给" && posHint === "preposition" && firstLower.startsWith("to give")) {
      score -= 100;
    }
  }

  return score;
}

// ─── Main ranking function ────────────────────────────────────────────────────

/**
 * Split a raw CEDICT definition string into individual meanings.
 */
export function splitMeanings(raw: string): string[] {
  return raw.split("/").map((s) => s.trim()).filter(Boolean);
}

/**
 * Rank all readings for a hanzi given optional sentence context.
 *
 * @param hanzi      The Chinese word being looked up
 * @param readings   All CEDICT readings: array of [pinyin, raw_def]
 * @param sentence   The full sentence the word appears in (optional)
 */
export function rankReadings(
  hanzi: string,
  readings: [string, string][],
  sentence?: string,
): RankedResult {
  const posHint = sentence ? getPosHint(hanzi, sentence) : null;
  const isName = isProperNameContext(hanzi, sentence);

  // Parse readings
  const parsed: Reading[] = readings.map(([pinyin, raw]) => ({
    pinyin,
    raw,
    meanings: splitMeanings(raw),
  }));

  // Classify each reading
  const archaic: Reading[] = [];
  const surname: Reading[] = [];
  const modern: Reading[] = [];

  for (const r of parsed) {
    if (isArchaicDef(r.raw)) {
      archaic.push(r);
    } else if (isSurnamePinyin(r.pinyin) || isSurnameDef(r.raw)) {
      surname.push(r);
    } else {
      modern.push(r);
    }
  }

  // If no modern readings, fall back to all non-archaic
  const candidates = modern.length > 0 ? modern : [...surname, ...archaic];

  // Score and sort modern readings
  const scored = candidates
    .map((r) => ({ r, score: scoreReading(r, hanzi, posHint, isName) }))
    .sort((a, b) => b.score - a.score);

  const primary = scored[0]?.r ?? parsed[0];
  const otherModern = scored.slice(1).map((s) => s.r);

  // Grammar hint from primary reading
  let grammarHint: string | null = null;
  if (posHint) {
    grammarHint = posHint.replace("-", " ");
  }

  return {
    primary,
    modern: otherModern,
    surname: isName ? [] : surname,
    archaic,
    isProperName: isName,
    grammarHint,
  };
}

// ─── Contextual label ─────────────────────────────────────────────────────────

/**
 * Returns a human-readable label for why this meaning was chosen first.
 */
export function getContextualLabel(
  hanzi: string,
  posHint: PosHint,
  isProperName: boolean,
): string | null {
  if (isProperName) return "Proper name (person)";
  if (!posHint) return null;
  const labels: Partial<Record<string, string>> = {
    conjunction:    "Used as conjunction in this sentence",
    adverb:         "Used as adverb in this sentence",
    "measure-word": "Used as measure word in this sentence",
    adjective:      "Used as adjective in this sentence",
    preposition:    "Used as preposition in this sentence",
    particle:       "Used as particle in this sentence",
    verb:           "Used as verb in this sentence",
  };
  return labels[posHint] ?? null;
}
