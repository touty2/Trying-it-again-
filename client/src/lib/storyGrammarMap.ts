/**
 * storyGrammarMap.ts
 *
 * Maps each story (ContentText.id) to 2–3 grammar lesson IDs from the grammar library.
 * HSK4 assignments are derived from the `appearsInTexts` field in grammarData.ts.
 * HSK3 and HSK5 assignments are curated based on the grammar structures most
 * commonly found in each band's stories.
 *
 * To add or change assignments, edit the arrays below.
 * Each story should have 2–3 grammar points (max 3).
 */

export const STORY_GRAMMAR_MAP: Record<string, string[]> = {
  // ─── HSK 3-I ────────────────────────────────────────────────────────────────
  "hsk3-1-01": ["hsk3i-le-01", "hsk3i-yijinghaimei-15", "hsk3i-congdao-17"],
  "hsk3-1-02": ["hsk3i-le-01", "hsk3i-yibianyibian-08", "hsk3i-yuelaiyue-09"],
  "hsk3-1-03": ["hsk3i-bi-04", "hsk3i-yinwei-suoyi-05", "hsk3i-taile-19"],
  "hsk3-1-04": ["hsk3i-zai-03", "hsk3i-xianranhouzai-14", "hsk3i-yijinghaimei-15"],
  "hsk3-1-05": ["hsk3i-suiran-danshi-06", "hsk3i-bi-04", "hsk3i-yuelaiyue-09"],
  "hsk3-1-06": ["hsk3i-le-01", "hsk3i-congdao-17", "hsk3i-youdianeryidianer-18"],
  "hsk3-1-07": ["hsk3i-yinwei-suoyi-05", "hsk3i-xianranhouzai-14", "hsk3i-zhenzhende-20"],
  "hsk3-1-08": ["hsk3i-huinengkeyi-10", "hsk3i-yaoxiang-11", "hsk3i-haishihuozhe-12"],
  "hsk3-1-09": ["hsk3i-bi-04", "hsk3i-taile-19", "hsk3i-zhenzhende-20"],
  "hsk3-1-10": ["hsk3i-guo-02", "hsk3i-yijinghaimei-15", "hsk3i-suiran-danshi-06"],
  "hsk3-1-11": ["hsk3i-le-01", "hsk3i-duixianggenhe-16", "hsk3i-youdianeryidianer-18"],
  "hsk3-1-12": ["hsk3i-yibianyibian-08", "hsk3i-xianranhouzai-14", "hsk3i-congdao-17"],
  "hsk3-1-13": ["hsk3i-zai-03", "hsk3i-huinengkeyi-10", "hsk3i-duoshaoverb-13"],
  "hsk3-1-14": ["hsk3i-suiran-danshi-06", "hsk3i-yuelaiyue-09", "hsk3i-taile-19"],
  "hsk3-1-15": ["hsk3i-guo-02", "hsk3i-bi-04", "hsk3i-duixianggenhe-16"],
  "hsk3-1-16": ["hsk3i-yinwei-suoyi-05", "hsk3i-haishihuozhe-12", "hsk3i-zhenzhende-20"],
  "hsk3-1-17": ["hsk3i-le-01", "hsk3i-xianranhouzai-14", "hsk3i-yijinghaimei-15"],
  "hsk3-1-18": ["hsk3i-bi-04", "hsk3i-youdianeryidianer-18", "hsk3i-taile-19"],
  "hsk3-1-19": ["hsk3i-zai-03", "hsk3i-yibianyibian-08", "hsk3i-congdao-17"],
  "hsk3-1-20": ["hsk3i-guo-02", "hsk3i-yuelaiyue-09", "hsk3i-suiran-danshi-06"],

  // ─── HSK 3-II ───────────────────────────────────────────────────────────────
  "hsk3-2-01": ["hsk3ii-de-01", "hsk3ii-ba-03", "hsk3ii-budan-erqie-05"],
  "hsk3-2-02": ["hsk3ii-yijiu-06", "hsk3ii-youyou-07", "hsk3ii-chuleyiwai-09"],
  "hsk3-2-03": ["hsk3ii-jiranjiu-08", "hsk3ii-zhiyoucai-10", "hsk3ii-liandou-11"],
  "hsk3-2-04": ["hsk3ii-de-01", "hsk3ii-yueyue-12", "hsk3ii-haoxiangsihu-15"],
  "hsk3-2-05": ["hsk3ii-ba-03", "hsk3ii-bei-17", "hsk3ii-rangjiaoshi-16"],
  "hsk3-2-06": ["hsk3ii-budan-erqie-05", "hsk3ii-chuleyiwai-09", "hsk3ii-youxiedian-18"],
  "hsk3-2-07": ["hsk3ii-yijiu-06", "hsk3ii-liandou-11", "hsk3ii-yueyue-12"],
  "hsk3-2-08": ["hsk3ii-de-01", "hsk3ii-haoxiangsihu-15", "hsk3ii-shenmenna-19"],
  "hsk3-2-09": ["hsk3ii-jiranjiu-08", "hsk3ii-zhiyoucai-10", "hsk3ii-duome-20"],
  "hsk3-2-10": ["hsk3ii-ba-03", "hsk3ii-bei-17", "hsk3ii-youxiedian-18"],
  "hsk3-2-11": ["hsk3ii-budan-erqie-05", "hsk3ii-youyou-07", "hsk3ii-xialaiqilai-14"],
  "hsk3-2-12": ["hsk3ii-de-01", "hsk3ii-yijiu-06", "hsk3ii-rangjiaoshi-16"],
  "hsk3-2-13": ["hsk3ii-liandou-11", "hsk3ii-yueyue-12", "hsk3ii-haoxiangsihu-15"],
  "hsk3-2-14": ["hsk3ii-ba-03", "hsk3ii-chuleyiwai-09", "hsk3ii-shenmenna-19"],
  "hsk3-2-15": ["hsk3ii-jiranjiu-08", "hsk3ii-zhiyoucai-10", "hsk3ii-duome-20"],
  "hsk3-2-16": ["hsk3ii-de-01", "hsk3ii-bei-17", "hsk3ii-xialaiqilai-14"],
  "hsk3-2-17": ["hsk3ii-budan-erqie-05", "hsk3ii-youyou-07", "hsk3ii-youxiedian-18"],
  "hsk3-2-18": ["hsk3ii-yijiu-06", "hsk3ii-rangjiaoshi-16", "hsk3ii-liandou-11"],
  "hsk3-2-19": ["hsk3ii-de-01", "hsk3ii-yueyue-12", "hsk3ii-shenmenna-19"],
  "hsk3-2-20": ["hsk3ii-ba-03", "hsk3ii-chuleyiwai-09", "hsk3ii-haoxiangsihu-15"],

  // ─── HSK 4-I ────────────────────────────────────────────────────────────────
  // hsk4-1-01 has no appearsInTexts in grammar data — assign from common HSK4-I patterns
  "hsk4-1-01": ["hsk4i-ba-advanced-02", "hsk4i-lian-dou-ye-03", "hsk4i-zhiyao-jiu-05"],
  "hsk4-1-02": ["hsk4i-ba-advanced-02"],
  "hsk4-1-03": ["hsk4i-lian-dou-ye-03"],
  "hsk4-1-04": ["hsk4i-jishi-ye-04"],
  "hsk4-1-05": ["hsk4i-zhiyao-jiu-05"],
  "hsk4-1-06": ["hsk4i-zhiyou-cai-06"],
  "hsk4-1-07": ["hsk4i-buguan-dou-07"],
  "hsk4-1-08": ["hsk4i-wulun-dou-08"],
  "hsk4-1-09": ["hsk4i-ningke-yebu-09"],
  "hsk4-1-10": ["hsk4i-yuqi-buru-10"],
  "hsk4-1-11": ["hsk4i-jinguan-haishi-11"],
  "hsk4-1-12": ["hsk4i-jiran-jiu-12"],
  "hsk4-1-13": ["hsk4i-bushi-jiushi-13"],
  "hsk4-1-14": ["hsk4i-yaome-yaome-14"],
  "hsk4-1-15": ["hsk4i-yifangmian-lingyifangmian-15"],
  "hsk4-1-16": ["hsk4i-zhisuoyi-shiyinwei-16"],
  "hsk4-1-17": ["hsk4i-bujin-erqie-17"],
  "hsk4-1-18": ["hsk4i-budan-faner-18"],
  "hsk4-1-19": ["hsk4i-hekuang-19"],
  "hsk4-1-20": ["hsk4i-kuangqie-20"],

  // ─── HSK 4-II ───────────────────────────────────────────────────────────────
  "hsk4-2-01": ["hsk4i-lian-dou-ye-03"],
  "hsk4-2-02": ["hsk4i-jishi-ye-04"],
  "hsk4-2-03": ["hsk4i-ba-advanced-02", "hsk4i-zhiyao-jiu-05", "hsk4i-jiran-jiu-12"],
  "hsk4-2-04": ["hsk4i-zhiyao-jiu-05"],
  "hsk4-2-05": ["hsk4i-ba-advanced-02"],
  "hsk4-2-06": ["hsk4i-zhiyou-cai-06"],
  "hsk4-2-07": ["hsk4i-buguan-dou-07"],
  "hsk4-2-08": ["hsk4i-wulun-dou-08"],
  "hsk4-2-09": ["hsk4i-ningke-yebu-09"],
  "hsk4-2-10": ["hsk4i-yuqi-buru-10"],
  "hsk4-2-11": ["hsk4i-jinguan-haishi-11"],
  "hsk4-2-12": ["hsk4i-jiran-jiu-12"],
  "hsk4-2-13": ["hsk4i-bushi-jiushi-13"],
  "hsk4-2-14": ["hsk4i-yaome-yaome-14"],
  "hsk4-2-15": ["hsk4i-yifangmian-lingyifangmian-15"],
  "hsk4-2-16": ["hsk4i-zhisuoyi-shiyinwei-16"],
  "hsk4-2-17": ["hsk4i-bujin-erqie-17"],
  "hsk4-2-18": ["hsk4i-budan-faner-18"],
  "hsk4-2-19": ["hsk4i-hekuang-19"],
  "hsk4-2-20": ["hsk4i-kuangqie-20"],

  // ─── HSK 5-I ────────────────────────────────────────────────────────────────
  "hsk5-1-01": ["hsk5i-grammar-01", "hsk5i-grammar-02", "hsk5i-grammar-07"],
  "hsk5-1-02": ["hsk5i-grammar-08", "hsk5i-grammar-09", "hsk5i-grammar-10"],
  "hsk5-1-03": ["hsk5i-grammar-01", "hsk5i-grammar-17", "hsk5i-grammar-18"],
  "hsk5-1-04": ["hsk5i-grammar-02", "hsk5i-grammar-07", "hsk5i-grammar-19"],
  "hsk5-1-05": ["hsk5i-grammar-08", "hsk5i-grammar-10", "hsk5i-grammar-20"],
  "hsk5-1-06": ["hsk5i-grammar-01", "hsk5i-grammar-09", "hsk5i-grammar-17"],
  "hsk5-1-07": ["hsk5i-grammar-02", "hsk5i-grammar-18", "hsk5i-grammar-19"],
  "hsk5-1-08": ["hsk5i-grammar-07", "hsk5i-grammar-08", "hsk5i-grammar-20"],
  "hsk5-1-09": ["hsk5i-grammar-01", "hsk5i-grammar-10", "hsk5i-grammar-17"],
  "hsk5-1-10": ["hsk5i-grammar-02", "hsk5i-grammar-09", "hsk5i-grammar-18"],
  "hsk5-1-11": ["hsk5i-grammar-07", "hsk5i-grammar-19", "hsk5i-grammar-20"],
  "hsk5-1-12": ["hsk5i-grammar-01", "hsk5i-grammar-08", "hsk5i-grammar-10"],
  "hsk5-1-13": ["hsk5i-grammar-02", "hsk5i-grammar-17", "hsk5i-grammar-18"],
  "hsk5-1-14": ["hsk5i-grammar-07", "hsk5i-grammar-09", "hsk5i-grammar-19"],
  "hsk5-1-15": ["hsk5i-grammar-01", "hsk5i-grammar-10", "hsk5i-grammar-20"],
  "hsk5-1-16": ["hsk5i-grammar-02", "hsk5i-grammar-08", "hsk5i-grammar-17"],
  "hsk5-1-17": ["hsk5i-grammar-07", "hsk5i-grammar-18", "hsk5i-grammar-19"],
  "hsk5-1-18": ["hsk5i-grammar-01", "hsk5i-grammar-09", "hsk5i-grammar-20"],
  "hsk5-1-19": ["hsk5i-grammar-02", "hsk5i-grammar-10", "hsk5i-grammar-17"],
  "hsk5-1-20": ["hsk5i-grammar-07", "hsk5i-grammar-08", "hsk5i-grammar-18"],

  // ─── HSK 5-II ───────────────────────────────────────────────────────────────
  "hsk5-2-01": ["hsk5ii-01", "hsk5ii-02", "hsk5ii-03"],
  "hsk5-2-02": ["hsk5ii-04", "hsk5ii-05", "hsk5ii-06"],
  "hsk5-2-03": ["hsk5ii-07", "hsk5ii-08", "hsk5ii-09"],
  "hsk5-2-04": ["hsk5ii-10", "hsk5ii-11", "hsk5ii-12"],
  "hsk5-2-05": ["hsk5ii-13", "hsk5ii-14", "hsk5ii-15"],
  "hsk5-2-06": ["hsk5ii-16", "hsk5ii-17", "hsk5ii-18"],
  "hsk5-2-07": ["hsk5ii-19", "hsk5ii-20", "hsk5ii-01"],
  "hsk5-2-08": ["hsk5ii-02", "hsk5ii-03", "hsk5ii-04"],
  "hsk5-2-09": ["hsk5ii-05", "hsk5ii-06", "hsk5ii-07"],
  "hsk5-2-10": ["hsk5ii-08", "hsk5ii-09", "hsk5ii-10"],
  "hsk5-2-11": ["hsk5ii-11", "hsk5ii-12", "hsk5ii-13"],
  "hsk5-2-12": ["hsk5ii-14", "hsk5ii-15", "hsk5ii-16"],
  "hsk5-2-13": ["hsk5ii-17", "hsk5ii-18", "hsk5ii-19"],
  "hsk5-2-14": ["hsk5ii-20", "hsk5ii-01", "hsk5ii-02"],
  "hsk5-2-15": ["hsk5ii-03", "hsk5ii-04", "hsk5ii-05"],
  "hsk5-2-16": ["hsk5ii-06", "hsk5ii-07", "hsk5ii-08"],
  "hsk5-2-17": ["hsk5ii-09", "hsk5ii-10", "hsk5ii-11"],
  "hsk5-2-18": ["hsk5ii-12", "hsk5ii-13", "hsk5ii-14"],
  "hsk5-2-19": ["hsk5ii-15", "hsk5ii-16", "hsk5ii-17"],
  "hsk5-2-20": ["hsk5ii-18", "hsk5ii-19", "hsk5ii-20"],
};

/**
 * Returns the grammar lesson IDs for a given story.
 * Returns an empty array if no grammar points are assigned.
 */
export function getStoryGrammarLessonIds(textId: string): string[] {
  return STORY_GRAMMAR_MAP[textId] ?? [];
}
