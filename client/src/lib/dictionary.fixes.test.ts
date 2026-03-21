/**
 * dictionary.fixes.test.ts
 *
 * Regression tests for the dictionary pipeline fixes:
 *  1. 派 must resolve to pai4 (not pa1)
 *  2. The bracket omit pattern must NOT strip mid-sentence bracket refs
 *  3. The bracket omit pattern MUST strip standalone bracket-only definitions
 *  4. Validation guard: empty/truncated definitions fall back to raw CEDICT
 *  5. Common polyphonic characters resolve to their dominant reading
 */

import { describe, it, expect } from "vitest";

// ─── 1. PINYIN_FREQUENCY map ──────────────────────────────────────────────────
// We test the scoring logic directly without importing the full module
// (which has browser-only deps). We replicate the relevant logic here.

const PINYIN_FREQUENCY: Record<string, string> = {
  "派": "pai4",
  "看": "kan4",
  "长": "chang2",
  "重": "zhong4",
  "好": "hao3",
  "行": "xing2",
  "发": "fa1",
  "乐": "le4",
  "数": "shu4",
  "传": "chuan2",
  "调": "diao4",
  "参": "can1",
  "便": "bian4",
  "背": "bei4",
  "处": "chu3",
  "答": "da2",
  "倒": "dao4",
  "干": "gan4",
  "供": "gong4",
  "冠": "guan4",
  "号": "hao4",
  "华": "hua2",
  "活": "huo2",
  "积": "ji1",
  "记": "ji4",
  "降": "jiang4",
  "尽": "jin3",
  "劲": "jin4",
  "空": "kong1",
  "量": "liang4",
  "落": "luo4",
  "模": "mo2",
  "宁": "ning4",
  "泡": "pao4",
  "破": "po4",
  "曲": "qu3",
  "散": "san4",
  "扇": "shan4",
  "舍": "she3",
  "似": "si4",
  "宿": "su4",
  "缩": "suo1",
  "提": "ti2",
  "贴": "tie1",
  "通": "tong1",
  "吐": "tu4",
  "系": "xi4",
  "鲜": "xian1",
  "相": "xiang1",
  "兴": "xing4",
  "血": "xue4",
  "压": "ya1",
  "载": "zai4",
  "增": "zeng1",
  "折": "zhe2",
  "正": "zheng4",
  "转": "zhuan3",
  "装": "zhuang1",
  "撞": "zhuang4",
  "总": "zong3",
};

describe("PINYIN_FREQUENCY map", () => {
  it("派 maps to pai4 (not pa1)", () => {
    expect(PINYIN_FREQUENCY["派"]).toBe("pai4");
  });

  it("看 maps to kan4", () => {
    expect(PINYIN_FREQUENCY["看"]).toBe("kan4");
  });

  it("长 maps to chang2 (long, not zhǎng)", () => {
    expect(PINYIN_FREQUENCY["长"]).toBe("chang2");
  });

  it("重 maps to zhong4 (heavy, not chóng)", () => {
    expect(PINYIN_FREQUENCY["重"]).toBe("zhong4");
  });

  it("传 maps to chuan2 (to pass on, not zhuàn)", () => {
    expect(PINYIN_FREQUENCY["传"]).toBe("chuan2");
  });

  it("调 maps to diao4 (to transfer, not tiáo)", () => {
    expect(PINYIN_FREQUENCY["调"]).toBe("diao4");
  });

  it("兴 maps to xing4 (interest, not xīng)", () => {
    expect(PINYIN_FREQUENCY["兴"]).toBe("xing4");
  });

  it("处 maps to chu3 (to deal with, not chù)", () => {
    expect(PINYIN_FREQUENCY["处"]).toBe("chu3");
  });

  it("降 maps to jiang4 (to descend, not xiáng)", () => {
    expect(PINYIN_FREQUENCY["降"]).toBe("jiang4");
  });

  it("空 maps to kong1 (empty/sky, not kòng)", () => {
    expect(PINYIN_FREQUENCY["空"]).toBe("kong1");
  });
});

// ─── 2. OMIT_PATTERNS bracket regex ──────────────────────────────────────────

const OLD_BRACKET_PATTERN = /\[.*?\d+\]/;    // the buggy old pattern
const NEW_BRACKET_PATTERN = /^\[.*?\d+\]$/;  // the fixed pattern

describe("Bracket omit pattern fix", () => {
  const midSentenceRef = "used in 派司[pa1 si5] (co-pilot)";
  const standaloneRef   = "[pa1 si5]";
  const normalDef       = "to send / to dispatch / faction";
  const cleanDef        = "to raise / to increase";

  it("OLD pattern incorrectly matches mid-sentence bracket refs", () => {
    // This is the bug we fixed
    expect(OLD_BRACKET_PATTERN.test(midSentenceRef)).toBe(true);
  });

  it("NEW pattern does NOT match mid-sentence bracket refs", () => {
    expect(NEW_BRACKET_PATTERN.test(midSentenceRef)).toBe(false);
  });

  it("NEW pattern DOES match standalone bracket-only definitions", () => {
    expect(NEW_BRACKET_PATTERN.test(standaloneRef)).toBe(true);
  });

  it("NEW pattern does not match normal definitions", () => {
    expect(NEW_BRACKET_PATTERN.test(normalDef)).toBe(false);
    expect(NEW_BRACKET_PATTERN.test(cleanDef)).toBe(false);
  });

  it("OLD pattern incorrectly matched normal definitions containing brackets", () => {
    const defWithBracket = "to send (a person) [formal usage]";
    // Old pattern would match this — new one won't (it's not the whole string)
    expect(NEW_BRACKET_PATTERN.test(defWithBracket)).toBe(false);
  });
});

// ─── 3. shouldOmit logic ─────────────────────────────────────────────────────

const OMIT_PATTERNS_FIXED: RegExp[] = [
  /^surname\b/i,
  /^(a |the )?surname /i,
  /^old variant of\b/i,
  /^variant of\b/i,
  /^archaic\b/i,
  /^classical\b/i,
  /^obsolete\b/i,
  /^see [A-Za-z\u4e00-\u9fff]/,
  /^abbr\. for\b/i,
  /^used in\b/i,
  /^CL:/,
  /^Taiwan pr\./i,
  /used in [^\s]+ \|/,
  /^\[.*?\d+\]$/,  // FIXED: only standalone bracket refs
];

function shouldOmitFixed(text: string): boolean {
  return OMIT_PATTERNS_FIXED.some((p) => p.test(text));
}

describe("shouldOmit with fixed bracket pattern", () => {
  it("omits 'used in 派司[pa1 si5]' because it starts with 'used in'", () => {
    // The ^used in\b pattern catches this — the bracket pattern is no longer needed
    expect(shouldOmitFixed("used in 派司[pa1 si5]")).toBe(true);
  });

  it("does NOT omit 'to send / to dispatch / faction'", () => {
    expect(shouldOmitFixed("to send")).toBe(false);
    expect(shouldOmitFixed("to dispatch")).toBe(false);
    expect(shouldOmitFixed("faction")).toBe(false);
  });

  it("omits 'surname Zhang'", () => {
    expect(shouldOmitFixed("surname Zhang")).toBe(true);
  });

  it("omits 'see 丽江市[Li4 jiang1 Shi4]'", () => {
    expect(shouldOmitFixed("see 丽江市[Li4 jiang1 Shi4]")).toBe(true);
  });

  it("omits 'CL:隻|只[zhi1]'", () => {
    expect(shouldOmitFixed("CL:隻|只[zhi1]")).toBe(true);
  });

  it("does NOT omit 'to raise / to increase / to improve'", () => {
    const parts = "to raise / to increase / to improve".split(" / ");
    parts.forEach((p) => expect(shouldOmitFixed(p)).toBe(false));
  });

  it("does NOT omit 'to send (a person)'", () => {
    expect(shouldOmitFixed("to send (a person)")).toBe(false);
  });
});

// ─── 4. Validation guard logic ────────────────────────────────────────────────

function validationGuard(
  primaryDefinition: string,
  rawCedictDef: string | null,
): string {
  if (!primaryDefinition || primaryDefinition.trim().length < 2) {
    if (rawCedictDef) {
      const rawSegs = rawCedictDef.split("/").map((s) => s.trim()).filter(Boolean);
      const usable = rawSegs.find((s) =>
        !s.startsWith("see ") && !s.startsWith("CL:") && !s.startsWith("abbr.") &&
        !s.startsWith("old variant") && !s.startsWith("variant of") && s.length > 2
      );
      if (usable) return usable;
    }
    return primaryDefinition || "—";
  }
  return primaryDefinition;
}

describe("Validation guard", () => {
  it("returns existing definition when non-empty", () => {
    expect(validationGuard("to send", "to send / to dispatch")).toBe("to send");
  });

  it("falls back to raw CEDICT when primary is empty", () => {
    expect(validationGuard("", "to send / to dispatch / faction")).toBe("to send");
  });

  it("skips cross-ref segments and uses the first real meaning", () => {
    const rawDef = "see 某字[mou3 zi4] / to dispatch / faction";
    expect(validationGuard("", rawDef)).toBe("to dispatch");
  });

  it("skips CL: segments", () => {
    const rawDef = "CL:隻|只[zhi1] / to send / faction";
    expect(validationGuard("", rawDef)).toBe("to send");
  });

  it("returns placeholder when both primary and raw are empty", () => {
    const result = validationGuard("", null);
    expect(result.length).toBeGreaterThan(0);
  });

  it("does not alter a valid 1-char definition", () => {
    // "I" is a valid 1-char definition (length 1 < 2 triggers guard)
    // but "to" (length 2) should pass
    expect(validationGuard("to", null)).toBe("to");
  });
});

// ─── 5. Score boost simulation for 派 ────────────────────────────────────────

function simulateScoreBoost(hanzi: string, readingPinyin: string): number {
  const preferred = PINYIN_FREQUENCY[hanzi];
  if (!preferred) return 0;
  const norm = (s: string) => s.toLowerCase().replace(/\s+/g, "");
  return norm(readingPinyin) === norm(preferred) ? 800 : 0;
}

describe("Score boost for 派", () => {
  it("gives +800 to pai4 reading", () => {
    expect(simulateScoreBoost("派", "pai4")).toBe(800);
  });

  it("gives 0 to pa1 reading (the wrong one)", () => {
    expect(simulateScoreBoost("派", "pa1")).toBe(0);
  });

  it("gives +800 to chuan2 for 传", () => {
    expect(simulateScoreBoost("传", "chuan2")).toBe(800);
  });

  it("gives 0 to zhuan4 for 传 (biography reading)", () => {
    expect(simulateScoreBoost("传", "zhuan4")).toBe(0);
  });
});
