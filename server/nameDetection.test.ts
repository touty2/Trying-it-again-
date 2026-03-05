/**
 * Tests for Chinese proper name detection logic in cedict.ts.
 *
 * These tests validate the SURNAMES set, NAME_INTRO_WORDS, and
 * COMMON_GIVEN_NAME_CHARS exports — the pure data structures that
 * drive detectProperName() at runtime.
 *
 * The full cedictSegment() function requires a loaded CEDICT dictionary
 * (browser fetch), so we test the data layer here and rely on manual
 * browser testing for end-to-end segmentation.
 */
import { describe, it, expect } from "vitest";
import {
  SURNAMES,
  NAME_INTRO_WORDS,
  COMMON_GIVEN_NAME_CHARS,
} from "../client/src/lib/cedict";

// ─── SURNAMES set ─────────────────────────────────────────────────────────────

describe("SURNAMES set", () => {
  it("contains the top-10 most common Chinese surnames", () => {
    const top10 = ["王", "李", "张", "刘", "陈", "杨", "黄", "赵", "吴", "周"];
    for (const s of top10) {
      expect(SURNAMES.has(s), `Expected SURNAMES to contain '${s}'`).toBe(true);
    }
  });

  it("contains additional common surnames", () => {
    const others = ["徐", "孙", "马", "朱", "胡", "郭", "何", "高", "林", "郑"];
    for (const s of others) {
      expect(SURNAMES.has(s), `Expected SURNAMES to contain '${s}'`).toBe(true);
    }
  });

  it("does NOT contain common non-surname characters", () => {
    const nonSurnames = ["的", "了", "是", "在", "我", "你", "他", "她", "们", "很"];
    for (const c of nonSurnames) {
      expect(SURNAMES.has(c), `Expected SURNAMES NOT to contain '${c}'`).toBe(false);
    }
  });

  it("has at least 100 entries for broad coverage", () => {
    expect(SURNAMES.size).toBeGreaterThanOrEqual(100);
  });
});

// ─── NAME_INTRO_WORDS set ─────────────────────────────────────────────────────

describe("NAME_INTRO_WORDS set", () => {
  it("contains the four primary name-introduction characters", () => {
    expect(NAME_INTRO_WORDS.has("叫")).toBe(true);  // called / named
    expect(NAME_INTRO_WORDS.has("姓")).toBe(true);  // surname is
    expect(NAME_INTRO_WORDS.has("名")).toBe(true);  // name
    expect(NAME_INTRO_WORDS.has("称")).toBe(true);  // referred to as
  });

  it("does NOT contain generic verbs that are not name introducers", () => {
    expect(NAME_INTRO_WORDS.has("是")).toBe(false);
    expect(NAME_INTRO_WORDS.has("有")).toBe(false);
    expect(NAME_INTRO_WORDS.has("说")).toBe(false);
  });
});

// ─── COMMON_GIVEN_NAME_CHARS set ──────────────────────────────────────────────

describe("COMMON_GIVEN_NAME_CHARS set", () => {
  it("contains characters that appear in given names but also have standalone CEDICT entries", () => {
    // These chars would otherwise be rejected by the '!CEDICT.has(given)' guard
    const givenNameChars = ["明", "华", "英", "芳", "伟", "强", "静", "雪", "梅"];
    for (const c of givenNameChars) {
      expect(
        COMMON_GIVEN_NAME_CHARS.has(c),
        `Expected COMMON_GIVEN_NAME_CHARS to contain '${c}'`
      ).toBe(true);
    }
  });

  it("has at least 60 entries for broad given-name coverage", () => {
    expect(COMMON_GIVEN_NAME_CHARS.size).toBeGreaterThanOrEqual(60);
  });

  it("does NOT contain function words that should never be given names", () => {
    const functionWords = ["的", "了", "是", "在", "和", "但", "因", "所"];
    for (const w of functionWords) {
      expect(
        COMMON_GIVEN_NAME_CHARS.has(w),
        `Expected COMMON_GIVEN_NAME_CHARS NOT to contain '${w}'`
      ).toBe(false);
    }
  });
});

// ─── Name pattern coverage ────────────────────────────────────────────────────

describe("name pattern coverage (data-layer assertions)", () => {
  it("surname + 1-char given name: 李明 — both chars are in the right sets", () => {
    expect(SURNAMES.has("李")).toBe(true);
    expect(COMMON_GIVEN_NAME_CHARS.has("明")).toBe(true);
  });

  it("surname + 2-char given name: 王小雨 — surname is recognised", () => {
    expect(SURNAMES.has("王")).toBe(true);
    // 小 and 雨 are common chars; the segmenter treats 2-char given names
    // as valid even if they appear in CEDICT
    expect(SURNAMES.has("小")).toBe(false); // 小 is NOT a surname
    expect(SURNAMES.has("雨")).toBe(false); // 雨 is NOT a surname
  });

  it("叫 + name: intro word is in NAME_INTRO_WORDS", () => {
    expect(NAME_INTRO_WORDS.has("叫")).toBe(true);
  });

  it("姓 + surname: 姓王 — 姓 is in NAME_INTRO_WORDS and 王 is a surname", () => {
    expect(NAME_INTRO_WORDS.has("姓")).toBe(true);
    expect(SURNAMES.has("王")).toBe(true);
  });

  it("surname 张 is in SURNAMES", () => {
    expect(SURNAMES.has("张")).toBe(true);
  });

  it("surname 陈 is in SURNAMES", () => {
    expect(SURNAMES.has("陈")).toBe(true);
  });
});
