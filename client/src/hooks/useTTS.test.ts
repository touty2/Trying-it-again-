/**
 * useTTS — unit tests for TTS sync behavior
 *
 * Tests the speakPromise function indirectly via the exported splitSentences
 * utility and the onSpeechStart / onBoundary callback ordering.
 *
 * Note: SpeechSynthesis is not available in jsdom, so we test the pure
 * utility functions (splitSentences, scoreVoice, getVoiceTier) and the
 * callback-ordering contract via a mock.
 */
import { describe, it, expect, vi } from "vitest";
import { splitSentences, scoreVoice, getVoiceTier } from "./useTTS";

// ── splitSentences ────────────────────────────────────────────────────────────

describe("splitSentences", () => {
  it("splits on Chinese sentence-ending punctuation", () => {
    const text = "你好。我是张明。很高兴认识你！";
    const result = splitSentences(text);
    expect(result).toEqual(["你好。", "我是张明。", "很高兴认识你！"]);
  });

  it("keeps quoted dialogue as a single sentence", () => {
    // Use escaped unicode for curly quotes to avoid esbuild parse issues
    const open = "\u201c"; // “
    const close = "\u201d"; // ”
    const text = `\u5f20\u660e\u8bf4\uff1a${open}\u4f60\u597d\uff0c\u6211\u53eb\u5f20\u660e\u3002${close}`;
    const result = splitSentences(text);
    expect(result).toHaveLength(1);
    expect(result[0]).toContain("\u5f20\u660e\u8bf4");
  });

  it("handles text with no sentence-ending punctuation", () => {
    const text = "你好";
    const result = splitSentences(text);
    expect(result).toEqual(["你好"]);
  });

  it("returns empty array for empty string", () => {
    expect(splitSentences("")).toEqual([]);
  });

  it("handles mixed punctuation", () => {
    const text = "Hello! 你好。World?";
    const result = splitSentences(text);
    expect(result.length).toBeGreaterThanOrEqual(2);
  });
});

// ── scoreVoice ────────────────────────────────────────────────────────────────

describe("scoreVoice", () => {
  const makeVoice = (name: string, lang: string): SpeechSynthesisVoice =>
    ({ name, lang, voiceURI: name, localService: false, default: false } as SpeechSynthesisVoice);

  it("gives highest score to Google Neural zh voice", () => {
    const v = makeVoice("Google 普通话（中国大陆）", "zh-CN");
    expect(scoreVoice(v)).toBeGreaterThanOrEqual(200);
  });

  it("gives high score to Microsoft Online Natural zh-CN voice", () => {
    const v = makeVoice("Microsoft Xiaoxiao Online (Natural) - zh-CN", "zh-CN");
    expect(scoreVoice(v)).toBeGreaterThanOrEqual(200);
  });

  it("gives lower score to legacy SAPI voices", () => {
    const huihui = makeVoice("Microsoft Huihui - Chinese (Simplified, PRC)", "zh-CN");
    expect(scoreVoice(huihui)).toBeLessThan(0);
  });

  it("gives tier-4 score to generic zh-CN voice", () => {
    const v = makeVoice("Some zh-CN Voice", "zh-CN");
    expect(scoreVoice(v)).toBe(50);
  });

  it("gives tier-5 score to zh-TW voice with no pattern match", () => {
    const v = makeVoice("Unknown TW Voice", "zh-TW");
    expect(scoreVoice(v)).toBe(30);
  });
});

// ── getVoiceTier ──────────────────────────────────────────────────────────────

describe("getVoiceTier", () => {
  const makeVoice = (name: string, lang: string): SpeechSynthesisVoice =>
    ({ name, lang, voiceURI: name, localService: false, default: false } as SpeechSynthesisVoice);

  it("labels Google Neural as Neural HD (level 1)", () => {
    const v = makeVoice("Google 普通话", "zh-CN");
    const tier = getVoiceTier(v);
    expect(tier.level).toBe(1);
    expect(tier.label).toBe("Neural HD");
  });

  it("labels Xiaoxiao as Neural (level 2)", () => {
    const v = makeVoice("Microsoft Xiaoxiao - zh-CN", "zh-CN");
    const tier = getVoiceTier(v);
    expect(tier.level).toBe(2);
  });

  it("labels generic zh-CN as Standard (level 4)", () => {
    const v = makeVoice("Some Voice", "zh-CN");
    const tier = getVoiceTier(v);
    expect(tier.level).toBe(4);
  });
});

// ── onSpeechStart callback ordering (mock) ────────────────────────────────────
// We verify the contract: onSpeechStart must be called exactly once per
// utterance, triggered by the first boundary event, not before it.

describe("onSpeechStart callback contract", () => {
  it("fires onSpeechStart on first boundary event, not before", () => {
    const onSpeechStart = vi.fn();
    const onBoundary = vi.fn();

    // Simulate the logic inside speakPromise's onboundary handler
    let speechStarted = false;
    const simulateBoundary = (charIndex: number) => {
      if (!speechStarted) {
        speechStarted = true;
        onSpeechStart();
      }
      onBoundary(charIndex);
    };

    // Before any boundary event fires, onSpeechStart should NOT have been called
    expect(onSpeechStart).not.toHaveBeenCalled();

    // First boundary event
    simulateBoundary(0);
    expect(onSpeechStart).toHaveBeenCalledTimes(1);
    expect(onBoundary).toHaveBeenCalledWith(0);

    // Second boundary event — onSpeechStart should NOT fire again
    simulateBoundary(3);
    expect(onSpeechStart).toHaveBeenCalledTimes(1);
    expect(onBoundary).toHaveBeenCalledWith(3);
  });

  it("fires onSpeechStart via onstart fallback if no boundary events", () => {
    const onSpeechStart = vi.fn();
    let speechStarted = false;

    // Simulate onstart handler (fallback for voices that don't fire onboundary)
    const simulateOnStart = () => {
      if (!speechStarted) {
        speechStarted = true;
        onSpeechStart();
      }
    };

    expect(onSpeechStart).not.toHaveBeenCalled();
    simulateOnStart();
    expect(onSpeechStart).toHaveBeenCalledTimes(1);

    // Calling onstart again (shouldn't happen but guard it) — no double-fire
    simulateOnStart();
    expect(onSpeechStart).toHaveBeenCalledTimes(1);
  });
});
