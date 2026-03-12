/**
 * CC-CEDICT dictionary loader
 * Source: https://cc-cedict.org/ (CC BY-SA 4.0)
 *
 * Two files are loaded lazily:
 *   /cedict.json       — primary single-entry map (hanzi → [pinyin, def])
 *   /cedict-multi.json — supplementary multi-entry map for words with multiple
 *                        readings (hanzi → [[pinyin1, def1], [pinyin2, def2], …])
 *
 * Segmentation algorithm: Frequency-Boosted Forward Maximum Matching with
 *   - User override application (highest priority)
 *   - Proper name detection (surname + given name)
 *   - Directional complement prioritisation (起来, 下去, 出来…)
 *   - Bi-gram look-ahead scoring
 *   - Numeral + measure word handling
 *   - High-frequency word boosting
 *   - Context-aware fallback for unknown characters
 */

export interface CedictEntry {
  hanzi: string;
  pinyin: string;
  definition: string;
}

export interface CedictSegment {
  text: string;
  entry: CedictEntry | null;
  isProperName?: boolean;
  /** True when this segment had no dictionary match (possible segmentation error) */
  isUnknown?: boolean;
  /** True when this segment was produced by a user override */
  isUserOverride?: boolean;
}

// ─── Primary dictionary ───────────────────────────────────────────────────────

let CEDICT: Map<string, CedictEntry> | null = null;
let loadPromise: Promise<Map<string, CedictEntry>> | null = null;

export async function loadCedict(): Promise<Map<string, CedictEntry>> {
  if (CEDICT) return CEDICT;
  if (loadPromise) return loadPromise;

  loadPromise = fetch('https://d2xsxph8kpxj0f.cloudfront.net/310519663368668080/65DJs5pScaLeyJ3iREenot/cedict_b4890d0b.json')
    .then((r) => r.json())
    .then((data: Record<string, [string, string]>) => {
      const map = new Map<string, CedictEntry>();
      for (const [hanzi, [pinyin, definition]] of Object.entries(data)) {
        map.set(hanzi, { hanzi, pinyin, definition });
      }
      CEDICT = map;
      console.log(`[cedict] Loaded ${map.size} entries`);
      return map;
    });

  return loadPromise;
}

// ─── Multi-reading dictionary ─────────────────────────────────────────────────

let CEDICT_MULTI: Map<string, [string, string][]> | null = null;
let multiLoadPromise: Promise<Map<string, [string, string][]>> | null = null;

export async function loadCedictMulti(): Promise<Map<string, [string, string][]>> {
  if (CEDICT_MULTI) return CEDICT_MULTI;
  if (multiLoadPromise) return multiLoadPromise;

  multiLoadPromise = fetch('https://d2xsxph8kpxj0f.cloudfront.net/310519663368668080/65DJs5pScaLeyJ3iREenot/cedict-multi_0ad91ddb.json')
    .then((r) => r.json())
    .then((data: Record<string, [string, string][]>) => {
      const map = new Map<string, [string, string][]>();
      for (const [hanzi, readings] of Object.entries(data)) {
        map.set(hanzi, readings);
      }
      CEDICT_MULTI = map;
      console.log(`[cedict-multi] Loaded ${map.size} multi-reading entries`);
      return map;
    })
    .catch((err) => {
      console.warn('[cedict-multi] Failed to load:', err);
      CEDICT_MULTI = new Map();
      return CEDICT_MULTI;
    });

  return multiLoadPromise;
}

export async function loadAllDicts(): Promise<void> {
  await Promise.all([loadCedict(), loadCedictMulti()]);
}

/**
 * Returns ALL readings for a hanzi.
 * Prefers cedict-multi.json; falls back to cedict.json.
 */
export function getAllReadings(hanzi: string): [string, string][] | null {
  if (!hanzi) return null;
  const normalized = hanzi.trim().normalize('NFC');

  if (CEDICT_MULTI) {
    const multi = CEDICT_MULTI.get(normalized) ?? CEDICT_MULTI.get(hanzi.trim());
    if (multi && multi.length > 0) return multi;
  }

  if (CEDICT) {
    const single = CEDICT.get(normalized) ?? CEDICT.get(hanzi.trim());
    if (single) return [[single.pinyin, single.definition]];
  }

  return null;
}

/**
 * Synchronous lookup — only works after loadCedict() has resolved.
 */
export function cedictLookup(hanzi: string): CedictEntry | null {
  if (!CEDICT || !hanzi) return null;
  const normalized = hanzi.trim().replace(/[\u3000\u00a0\ufeff]/g, '').normalize('NFC');
  return CEDICT.get(normalized) ?? CEDICT.get(hanzi.trim()) ?? null;
}

/**
 * Check if primary dictionary is loaded.
 */
export function isCedictLoaded(): boolean {
  return CEDICT !== null;
}

export function isAllDictsLoaded(): boolean {
  return CEDICT !== null && CEDICT_MULTI !== null;
}

// ─── User segmentation overrides ─────────────────────────────────────────────
// Maps a global key ("global:WORD") to a forced split.
// e.g. { "global:马上起": ["马上", "起"] }
let USER_OVERRIDES: Map<string, string[]> = new Map();

export function setSegmentationOverride(key: string, splits: string[]): void {
  USER_OVERRIDES.set(key, splits);
}

export function deleteSegmentationOverride(key: string): void {
  USER_OVERRIDES.delete(key);
}

export function getSegmentationOverride(key: string): string[] | undefined {
  return USER_OVERRIDES.get(key);
}

export function loadSegmentationOverrides(overrides: Record<string, string[]>): void {
  USER_OVERRIDES = new Map(Object.entries(overrides));
}

export function getAllSegmentationOverrides(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  USER_OVERRIDES.forEach((v, k) => { out[k] = v; });
  return out;
}

/**
 * Build all alternative segmentations for a span of Chinese text.
 * Returns up to 8 candidate splits, sorted: all-defined first, then fewest segments.
 */
export function getAlternativeSegmentations(text: string): Array<{ segments: string[]; allDefined: boolean }> {
  if (!CEDICT || !text) return [];
  const n = text.length;
  const results: Array<{ segments: string[]; allDefined: boolean }> = [];
  const seen = new Set<string>();

  function addResult(segs: string[]) {
    const key = segs.join('|');
    if (seen.has(key)) return;
    seen.add(key);
    const allDefined = segs.every(s => CEDICT!.has(s));
    results.push({ segments: segs, allDefined });
  }

  // 1-segment (whole word)
  addResult([text]);

  // 2-part splits
  for (let i = 1; i < n; i++) {
    addResult([text.slice(0, i), text.slice(i)]);
  }

  // 3-part splits (only for text ≤ 6 chars to avoid explosion)
  if (n <= 6) {
    for (let i = 1; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        addResult([text.slice(0, i), text.slice(i, j), text.slice(j)]);
      }
    }
  }

  // Sort: all-defined first, then by fewest segments
  results.sort((a, b) => {
    if (a.allDefined !== b.allDefined) return a.allDefined ? -1 : 1;
    return a.segments.length - b.segments.length;
  });

  return results.slice(0, 8);
}

// ─── Segmentation engine ──────────────────────────────────────────────────────

function isCJKChar(code: number): boolean {
  return (code >= 0x4e00 && code <= 0x9fff) || (code >= 0x3400 && code <= 0x4dbf);
}

/**
 * Top 100+ Chinese surnames (single char).
 * Used for proper name detection.
 */
export const SURNAMES = new Set([
  // ── Top 100 most common Chinese surnames ───────────────────────────────────
  '王','李','张','刘','陈','杨','黄','赵','吴','周','徐','孙','马','朱','胡','郭','何','高','林','郑',
  '谢','罗','梁','宋','唐','许','邓','韩','冯','曹','曾','彭','萧','蔡','潘','田','董','袁','于','余',
  '叶','蒋','杜','苏','魏','程','吕','丁','沈','任','姚','卢','傅','钟','姜','崔','谭','廖','范','汪',
  '陆','金','石','戴','贾','韦','夏','邱','方','侯','邹','熊','孟','秦','白','江','阎','薛','尹','段',
  '雷','黎','史','龙','陶','贺','顾','毛','郝','龚','邵','万','钱','严','覃','武','戚','莫','孔','向',
  '常','汤','康','易','乔','贝','安','费','纪','牛','洪','齐','施','尤','时','鲁',
  // ── Additional common surnames (101-200) ────────────────────────────────────
  '倪','庄','申','屠','蒲','池','柴','阮','席','卫','慕','艾','鱼','容','欧','庾','明','祝','盛','卞',
  '燕','管','左','柳','游','晏','龚','程','邢','滕','殷','罗','葛','奚','索','咸','籍','赖','卓','蓝',
  '党','乌','巫','印','丛','仲','宁','祁','储','靳','盖','益','桂','牟','佟','麻','解','强','柏','水',
  '窦','章','云','苗','权','龚','冉','眭','毕','过','翟','温','别','庄','晋','缪','干','秋','仇','栾',
  '暴','甘','钭','厉','戎','祖','武','符','刁','景','詹','束','龙','叶','幸','司','韶','冷','訾',
]);

/**
 * Context words that introduce a name (叫, 是, 姓, 名叫, 名字叫).
 * When one of these immediately precedes a surname, name detection is boosted.
 */
export const NAME_INTRO_WORDS = new Set(['叫','姓','名','称']);

/**
 * Characters that are very common in given names and should NOT be rejected
 * even if they appear in CEDICT as standalone words.
 * (e.g. 明, 华, 芳, 英, 丽, 伟, 强, 勇, 磊, 涛, 静, 婷, 雪, 梅, 兰, 菊)
 */
export const COMMON_GIVEN_NAME_CHARS = new Set([
  '明','华','英','芳','丽','伟','强','勇','磊','涛','静','婷','雪','梅','兰','菊','莲','玉',
  '珍','珠','云','霞','燕','凤','娟','秀','红','艳','萍','莉','敏','慧','洁','晶','颖','欣',
  '杰','俊','鹏','飞','龙','虎','豪','刚','军','辉','亮','斌','文','武','博','超','浩','宇',
  '宁','平','安','康','健','乐','欢','笑','悦','怡','心','志','远','达','成','立','兴','旺',
  '建','国','民','生','新','光','荣','贵','富','财','福','寿','吉','祥','瑞','庆','喜','春',
  '夏','秋','冬','晨','晓','阳','朝','日','月','星','海','江','河','山','峰','岭','林','森',
  '木','竹','松','柏','桃','李','梨','苹','桂','菊','荷','莲','兰','草','花','叶','枝',
]);

/**
 * Characters that cannot appear in a given name (function words, particles, numerals).
 */
const NOT_GIVEN_NAME = new Set([
  '的','了','在','是','有','和','与','或','但','而','也','都','就','才','还','只','已',
  '经','被','把','让','给','对','从','向','为','以','于','不','很','太','最','更','再','又',
  '吗','呢','啊','吧','嘛','呀','哦','哈','嗯','哎','唉','哇','哟','喂',
  '这','那','哪','谁','什','么','怎','几','多','少','每','各','某','另',
  '一','二','三','四','五','六','七','八','九','十','百','千','万','亿',
]);

/**
 * Title/role words that follow a surname (surname + title ≠ full name).
 * e.g. 陈老师 → 陈 + 老师, NOT a person named 陈老
 */
const TITLE_WORDS = new Set([
  '老师','先生','女士','同学','同志','教授','医生','经理','主任','队长','队员','书记',
  '部长','局长','市长','省长','校长','院长','所长','处长','科长','班长','组长','厂长',
  '老','小','大',
]);

/**
 * Numerals that can start a numeral+measure phrase.
 */
const NUMERALS = new Set([
  '一','二','三','四','五','六','七','八','九','十','百','千','万','亿','两','几','多','半','每',
]);

/**
 * Measure words. When preceded by a numeral, the numeral should be kept separate
 * unless the numeral+measure combo is in HIGH_FREQ_MULTI (e.g. 一次, 两个).
 */
const MEASURE_WORDS = new Set([
  '个','本','张','件','只','条','块','双','套','把','瓶','杯','碗','盘','箱','袋',
  '次','遍','回','趟','番','下','声','步','笔','份','段','层','排','行','列','队','组',
  '种','类','样','批','堆','串','片','粒','颗','棵','株','朵','束','根','枝','支',
  '匹','头','尾','群','窝','代','届','期','季','年','月','日','天',
]);

/**
 * High-frequency 2+ char words that should be preferred over obscure same-length matches.
 * Score: len + 10
 *
 * KEY ADDITIONS vs. original:
 *  - Directional complements (起来, 下去, 出来…) — the #1 source of segmentation errors
 *  - 马上, 立刻, 赶快 and other common adverbs
 *  - Expanded conjunctions, modal verbs, pronouns, verbs, nouns
 */
const HIGH_FREQ_MULTI = new Set([
  // ── Directional complements (verb + direction) ─────────────────────────────
  // These are the most common segmentation errors: 马上起来 → 马上 + 起来
  '起来','下来','上来','出来','进来','回来','过来','开来','起去',
  '下去','上去','出去','进去','回去','过去','开去',
  // Verb + 来/去 compounds that must stay together
  '走来','走去','跑来','跑去','飞来','飞去','带来','带去',
  '拿来','拿去','送来','送去','搬来','搬去','跳来','跳去',
  '看来','看去','说来','说去','想来','想去',
  // ── Common adverbs / time words ────────────────────────────────────────────
  '马上','立刻','立即','赶快','赶紧','已经','正在','刚才','刚刚',
  '一直','一起','一般','一样','一定','一共','一切','一些','一边',
  '本来','本身','本地','本科','本次',
  '现在','以前','以后','以为','以上','以下','之前','之后','之间','之中',
  '今天','明天','昨天','后天','前天','今年','明年','去年',
  '最近','最后','最好','最大','最小','最多','最少','最新','最高','最低',
  '经常','偶尔','从来','从不','从没','向来','一向','历来',
  '终于','终究','毕竟','究竟','到底','其实','确实','的确',
  '甚至','至少','至多','几乎','差不多','大概','大约','也许','可能',
  '非常','特别','十分','相当','极其','格外','尤其','尤为',
  // ── Conjunctions / discourse markers ──────────────────────────────────────
  '因为','所以','虽然','但是','如果','要是','假如','假设',
  '不管','不论','不但','不仅','不只','不光','不过',
  '而且','并且','同时','另外','此外','除此之外',
  '然后','接着','于是','因此','所以','从而','进而',
  '虽然','尽管','即使','就算','哪怕','不管怎样',
  '总之','总的来说','换句话说','也就是说',
  '不仅如此','除了','除非','只要','只有','只是',
  // ── Modal / auxiliary verbs ─────────────────────────────────────────────────
  '可以','可能','可是','可爱','可惜','可见',
  '应该','应当','必须','必要','需要','需求',
  '不要','不是','不好','不行','不用','不对','不错','不同','不能','不会',
  '不得不','不得了','不知道','不一定','不一样',
  '没有','没关系','没什么','没办法','没问题',
  '能够','能不能','会不会','要不要','可不可以',
  // ── Pronouns / demonstratives ───────────────────────────────────────────────
  '他们','她们','我们','你们','它们','大家','自己','彼此','对方',
  '什么','怎么','为什么','哪里','哪个','哪些','哪儿',
  '这个','那个','这些','那些','这里','那里','这儿','那儿',
  '这样','那样','这么','那么','这种','那种','这次','那次',
  '任何','所有','每个','每次','每天','每年','每月',
  // ── Common verbs ────────────────────────────────────────────────────────────
  '学习','工作','生活','休息','旅行','旅游','购物','购买',
  '知道','觉得','认为','喜欢','希望','想到','想起','想象',
  '开始','结束','完成','继续','停止','发现','发展','发生',
  '告诉','问题','回答','解释','解决','处理','帮助','支持',
  '参加','参与','举行','举办','进行','完成','实现','达到',
  '看见','看到','听到','听见','感到','感觉','感谢','感激',
  '认识','了解','理解','明白','清楚','知道','记得','忘记',
  '决定','打算','计划','准备','开始','继续','放弃','坚持',
  '出现','消失','变化','改变','增加','减少','提高','降低',
  '注意','小心','当心','担心','害怕','紧张','放松','高兴',
  // ── Common nouns ─────────────────────────────────────────────────────────────
  '时间','地方','方法','方面','方向','方式','方案',
  '问题','原因','结果','目的','目标','计划','方案','过程',
  '同学','老师','朋友','家人','父母','孩子','学生','老人',
  '学校','医院','银行','超市','公司','政府','社会','国家',
  '语言','文化','历史','科学','技术','经济','政治','法律',
  '生命','生活','工作','学习','爱情','友情','感情','关系',
  '机会','条件','情况','环境','气候','天气','季节',
  '意思','意见','想法','看法','观点','态度','立场',
  // ── Chinese language / study ─────────────────────────────────────────────────
  '中文','中国','中心','中间','中学','中午','中级','中等','中华',
  '说话','说明','说法','说服','说起','说到',
  '汉字','汉语','普通话','词语','语法','语句','语气',
  // ── Location words ───────────────────────────────────────────────────────────
  '地方','地图','地球','地铁','地点','地区','地位','地道',
  '上面','下面','里面','外面','前面','后面','左边','右边',
  '旁边','中间','附近','周围','对面','远处','近处',
  // ── Adjectives ───────────────────────────────────────────────────────────────
  '高兴','快乐','难过','担心','害怕','生气','着急','伤心',
  '漂亮','聪明','努力','认真','仔细','清楚','简单','复杂',
  '重要','必要','必须','特别','普通','一般','正常','特殊',
  '有趣','有用','有效','有名','有意思','有意义',
  '好看','好听','好吃','好喝','好玩','好用','好像','好似',
  '容易','困难','方便','麻烦','安全','危险','健康','快乐',
  // ── Sports / competition ─────────────────────────────────────────────────────
  '队长','队员','教练','裁判','冠军','比分','得分',
  '打球','比赛','运动','篮球','足球','网球','乒乓球','排球',
  // ── Numeral+measure combos that must stay together ────────────────────────────
  '一次','两次','三次','再次','这次','那次','每次','多次',
  '一本','两本','一张','两张','一件','两件','一个','两个','三个',
  '一年','两年','一天','两天','一月','两月','一周','两周',
  '一点','一点儿','有点','有点儿','一会儿','一下','一下子',
  '一起','一同','一共','一致','一定','一般','一样',
  // ── Titles / honorifics ───────────────────────────────────────────────────────
  '先生','女士','同志','教授','医生','经理','主任','校长',
  // ── Grammar patterns ─────────────────────────────────────────────────────────
  '越来越','越来','越好','越多','越大','越小',
  '一方面','另一方面','一边','一边儿',
  '除了','除非','即使','即便','哪怕',
  '对于','关于','由于','至于','在于',
  '来说','来看','来讲','来得及','来不及',
  '下去','下来','上去','上来',
  // ── Common 3-char compounds ───────────────────────────────────────────────────
  '为什么','怎么样','怎么办','什么时候','什么地方',
  '没关系','没问题','没办法','没意思','没意义',
  '不知道','不一定','不一样','不可以','不可能',
  '有意思','有意义','有问题','有机会','有时候',
  '很多人','很多时候','很长时间',
  '对不起','没关系','不客气','不好意思',
  '差不多','说不定','说不清','看不见','听不懂',
  '做不到','来不及','来得及','用不着','用得着',
  // Opportunity / chance
  '机会','可能','条件','环境','情况','状况',
  // jing/xue/jiao/ru/geng compounds - must NOT be split by HIGH_FREQ_SINGLE
  '经历','经过','经验','经典','经营','经理','经常','经济',
  '教育','教学','教室','教材','教师','教授','教导','教练',
  '学会','学到','学好','学过','学期','学者','学科','学分',
  '如何','如果','如同','如此','如实','如意','如题',
  '更加','更好','更多','更大','更高','更新','更换','更深',
  // yi/zhi/jiu/cai/hai compounds - prevent single-char split
  '已知','已有','已完','已过','已经',
  '只有','只是','只能','只好','只要','只知',
  '就是','就要','就能','就好','就在','就这',
  '才能','才是','才好','才知','才有',
  '还是','还有','还能','还好','还要','还未',
  // dui/cong/xiang/wei/yi/yu compounds - prevent single-char split
  '对象','对话','对应','对比','对方','对待','对错',
  '从来','从事','从而','从未','从小','从前','从中','从新',
  '向前','向后','向上','向下','向左','向右','向内','向外',
  '为了','为什','为人','为常','为此','为主','为奇',
  '以为','以上','以下','以内','以外','以后','以前','以及',
  '于是','于其','于事','于心','于人',
]);

/**
 * High-frequency single chars that should beat obscure 2-char matches
 * (but NOT 3+ char compounds).
 * Score: len + 3 (only when longest candidate is ≤ 2 chars)
 */
const HIGH_FREQ_SINGLE = new Set([
  '说','看','听','写','读','走','跑','吃','喝','睡','买','卖','学','教',
  '用','做','来','去','到','在','有','是','不','也','都','很','太','最',
  '更','再','又','就','才','还','只','已','经','被','把','让','给','对',
  '从','向','为','以','于','与','和','但','而','或','因','所','如',
  '地','的','得','了','着','过','吗','呢','啊','吧','嘛',
]);

/**
 * Try to detect a proper name (surname + given name) starting at position i.
 * Returns [nameString, length] or null.
 *
 * Rules:
 *  1. First char must be a known surname.
 *  2. Must NOT be followed by a title word (陈老师 → 陈 + 老师).
 *  3. Context boost: if the char before the surname is a NAME_INTRO_WORD (叫/姓/名),
 *     confidence is raised and we accept even chars that appear in CEDICT.
 *  4. 3-char name (surname + 2-char given name):
 *       - Both given-name chars must be valid CJK and not in NOT_GIVEN_NAME.
 *       - Accept if: (a) given2 not in CEDICT, OR (b) context boost, OR
 *         (c) either char is in COMMON_GIVEN_NAME_CHARS.
 *  5. 2-char name (surname + 1-char given name):
 *       - given1 must be valid CJK, not in NOT_GIVEN_NAME.
 *       - Accept if: (a) given1 not a surname, OR (b) context boost.
 *       - Reject if the full 2-char string is a high-frequency non-name word
 *         (e.g. 中国, 北京) — checked via HIGH_FREQ_MULTI.
 */
function detectProperName(text: string, i: number): [string, number] | null {
  if (!CEDICT) return null;
  if (!SURNAMES.has(text[i])) return null;

  // ── Context boost: 叫/姓/名 immediately before this position ─────────────────
  const contextBoost = i > 0 && NAME_INTRO_WORDS.has(text[i - 1]);

  // ── Title guard: surname + title word → NOT a full name ──────────────────────
  if (i + 1 < text.length) {
    // Single-char title (老, 小, 大)
    if (TITLE_WORDS.has(text[i + 1])) return null;
    // Multi-char title (老师, 先生, 经理…)
    for (const title of Array.from(TITLE_WORDS)) {
      if (title.length < 2) continue;
      const end = i + 1 + title.length;
      if (end <= text.length && text.slice(i + 1, end) === title) return null;
    }
  }

  // ── Helper: is a char valid as a given-name character? ───────────────────────
  function isValidGivenChar(c: string): boolean {
    return isCJKChar(c.charCodeAt(0)) && !NOT_GIVEN_NAME.has(c);
  }

  // ── Try 3-char name: surname + 2-char given name ─────────────────────────────
  if (i + 3 <= text.length) {
    const given2 = text.slice(i + 1, i + 3);
    const c1 = given2[0], c2 = given2[1];
    if (isValidGivenChar(c1) && isValidGivenChar(c2)) {
      const notInDict = !CEDICT.has(given2);
      const hasGivenNameChar = COMMON_GIVEN_NAME_CHARS.has(c1) || COMMON_GIVEN_NAME_CHARS.has(c2);
      // Accept if: not a dictionary word, OR context boost, OR contains a common given-name char
      if (notInDict || contextBoost || hasGivenNameChar) {
        // But reject if the 2-char given part is itself a HIGH_FREQ_MULTI word (e.g. 北京, 中国)
        if (!HIGH_FREQ_MULTI.has(given2)) {
          return [text.slice(i, i + 3), 3];
        }
      }
    }
  }

  // ── Try 2-char name: surname + 1-char given name ─────────────────────────────
  if (i + 2 <= text.length) {
    const given1 = text[i + 1];
    if (isValidGivenChar(given1)) {
      // Reject if the full 2-char string is a high-frequency non-name compound
      const full2 = text.slice(i, i + 2);
      if (HIGH_FREQ_MULTI.has(full2)) return null;
      // Accept if: context boost, OR given1 is a common given-name char,
      // OR given1 is not itself a surname
      if (contextBoost || COMMON_GIVEN_NAME_CHARS.has(given1) || !SURNAMES.has(given1)) {
        return [full2, 2];
      }
    }
  }

  return null;
}

/**
 * Frequency-Boosted Forward Maximum Matching segmentation with bi-gram look-ahead.
 *
 * Priority order:
 *  0. User override (highest priority — exact span match)
 *  1. Proper name detection (surname + given name)
 *  2. HIGH_FREQ_MULTI words (score = len + 10)
 *  3. Bi-gram look-ahead bonus (up to +5 for splits that leave a good next word)
 *  4. Longer dictionary matches (score = len)
 *  5. HIGH_FREQ_SINGLE chars when competing with ≤2-char matches (score = len + 3)
 *  6. Numeral+measure combos not in HIGH_FREQ_MULTI are penalized (score = 1)
 *  7. Context-aware fallback: unknown chars flagged with isUnknown = true
 *
 * Only works after loadCedict() has resolved.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cedictSegment(text: string, _version?: number): CedictSegment[] {
  if (!CEDICT) return [{ text, entry: null }];
  const segments: CedictSegment[] = [];
  let i = 0;
  const maxLen = 8; // increased from 6 to catch longer compounds

  // Helper: score a single word candidate
  function scoreCandidate(word: string, len: number, longestLen: number): number {
    if (HIGH_FREQ_MULTI.has(word)) return len + 10;
    if (len === 1 && HIGH_FREQ_SINGLE.has(word) && longestLen <= 2) return len + 3;
    if (len === 2 && NUMERALS.has(word[0]) && MEASURE_WORDS.has(word[1]) && !HIGH_FREQ_MULTI.has(word)) return 1;
    return len;
  }

  while (i < text.length) {
    const charCode = text.charCodeAt(i);

    // Non-CJK character: pass through as-is
    if (!isCJKChar(charCode)) {
      segments.push({ text: text[i], entry: null });
      i++;
      continue;
    }

    // ── Step 0: User override (highest priority) ────────────────────────────
    let overrideApplied = false;
    for (let len = Math.min(maxLen, text.length - i); len >= 2; len--) {
      const span = text.slice(i, i + len);
      const overrideKey = `global:${span}`;
      const override = USER_OVERRIDES.get(overrideKey);
      if (override && override.length > 0) {
        for (const part of override) {
          const entry = CEDICT.get(part) ?? null;
          segments.push({ text: part, entry, isUserOverride: true });
        }
        i += len;
        overrideApplied = true;
        break;
      }
    }
    if (overrideApplied) continue;

    // ── Step 1: Proper name detection ──────────────────────────────────────
    const nameResult = detectProperName(text, i);
    if (nameResult) {
      const [nameStr, nameLen] = nameResult;
      const surnameEntry = CEDICT.get(text[i]) ?? null;
      segments.push({ text: nameStr, entry: surnameEntry, isProperName: true });
      i += nameLen;
      continue;
    }

    // ── Step 2: Collect all dictionary matches ─────────────────────────────
    const candidates: Array<{ len: number; word: string; entry: CedictEntry }> = [];
    for (let len = Math.min(maxLen, text.length - i); len >= 1; len--) {
      const word = text.slice(i, i + len);
      const entry = CEDICT.get(word);
      if (entry) candidates.push({ len, word, entry });
    }

    if (candidates.length === 0) {
      // Context-aware fallback: emit the char flagged as unknown
      segments.push({ text: text[i], entry: null, isUnknown: true });
      i++;
      continue;
    }

    // ── Step 3: Score candidates with bi-gram look-ahead ───────────────────
    const longestLen = candidates[0].len;
    let best = candidates[0];
    let bestScore = -1;

    for (const c of candidates) {
      let score = scoreCandidate(c.word, c.len, longestLen);

      // Bi-gram look-ahead: prefer splits that leave a high-scoring next word.
      // This is what fixes 马上起来 → 马上 + 起来 instead of 马上起 + 来.
      if (score > 1 && i + c.len < text.length) {
        const nextPos = i + c.len;
        let nextBestScore = 0;
        for (let nlen = Math.min(maxLen, text.length - nextPos); nlen >= 1; nlen--) {
          const nword = text.slice(nextPos, nextPos + nlen);
          if (CEDICT.has(nword)) {
            const ns = scoreCandidate(nword, nlen, nlen);
            if (ns > nextBestScore) nextBestScore = ns;
            break;
          }
        }
        // Add up to 5 bonus points based on next-word quality
        score += Math.min(5, nextBestScore * 0.35);
      }

      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }

    // If the winner is a penalized numeral+measure combo, emit just the numeral
    if (
      best.len === 2 &&
      NUMERALS.has(best.word[0]) &&
      MEASURE_WORDS.has(best.word[1]) &&
      !HIGH_FREQ_MULTI.has(best.word)
    ) {
      const numEntry = CEDICT.get(text[i]) ?? null;
      segments.push({ text: text[i], entry: numEntry });
      i++;
      continue;
    }

    segments.push({ text: best.word, entry: best.entry });
    i += best.len;
  }

  return segments;
}
