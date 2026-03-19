/**
 * Unit tests for buildSensesWithLabels and classifyMeaning logic
 */
import { describe, it, expect } from "vitest";
import { rankReadings, buildSensesWithLabels } from "../client/src/lib/definitionRanker";

describe("buildSensesWithLabels", () => {
  it("labels the first sense as 'common' for 汤 (soup)", () => {
    const ranked = rankReadings("汤", [
      ["tāng", "soup/broth/hot water"],
      ["Tāng", "surname Tang"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    expect(senses.length).toBeGreaterThan(0);
    // The first sense should be common (soup/broth)
    expect(senses[0].label).toBe("common");
    expect(senses[0].text.toLowerCase()).toContain("soup");
  });

  it("labels surname senses as 'surname' for 汤", () => {
    const ranked = rankReadings("汤", [
      ["tāng", "soup/broth/hot water"],
      ["Tāng", "surname Tang"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    const surnameSense = senses.find((s) => s.label === "surname");
    expect(surnameSense).toBeDefined();
    expect(surnameSense?.text.toLowerCase()).toContain("surname");
  });

  it("labels grammar senses correctly for 的", () => {
    const ranked = rankReadings("的", [
      ["de", "structural particle: used after an attribute; used to form a nominal expression; used at the end of a declarative sentence for emphasis"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    expect(senses.length).toBeGreaterThan(0);
    expect(senses[0].label).toBe("grammar");
  });

  it("labels measure word senses correctly for 家", () => {
    const ranked = rankReadings("家", [
      ["jiā", "home/family/classifier for families or businesses/refers to the philosophical schools of pre-Han China"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    const mwSense = senses.find((s) => s.label === "measure word");
    expect(mwSense).toBeDefined();
  });

  it("puts common senses before rare senses", () => {
    const ranked = rankReadings("在", [
      ["zài", "at/in/on/located at/present/to exist/to be alive"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    const commonIdx = senses.findIndex((s) => s.label === "common");
    const rareIdx = senses.findIndex((s) => s.label === "rare");
    if (commonIdx !== -1 && rareIdx !== -1) {
      expect(commonIdx).toBeLessThan(rareIdx);
    }
  });

  it("deduplicates identical meanings", () => {
    const ranked = rankReadings("好", [
      ["hǎo", "good/well/proper/good to/easy to/very/so"],
      ["hào", "to be fond of/to have a tendency to/to be prone to"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    const texts = senses.map((s) => s.text.toLowerCase());
    const unique = new Set(texts);
    expect(unique.size).toBe(texts.length);
  });

  it("limits senses to maxSenses", () => {
    const ranked = rankReadings("在", [
      ["zài", "at/in/on/located at/present/to exist/to be alive/indicates action in progress"],
    ]);
    const senses = buildSensesWithLabels(ranked, 3);
    expect(senses.length).toBeLessThanOrEqual(3);
  });

  it("labels old variant senses as 'rare'", () => {
    const ranked = rankReadings("爲", [
      ["wéi", "old variant of 为[wei2]"],
    ]);
    const senses = buildSensesWithLabels(ranked, 8);
    // All senses from archaic readings should not appear in senses (they are filtered by rankReadings)
    // But if they do appear, they should be labelled 'rare'
    for (const s of senses) {
      if (s.text.startsWith("old variant")) {
        expect(s.label).toBe("rare");
      }
    }
  });
});
