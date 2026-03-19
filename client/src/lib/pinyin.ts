/**
 * Converts numeric-tone pinyin (CC-CEDICT format) to diacritic pinyin.
 * e.g. "jin3 zhang1" → "jǐn zhāng"
 *      "ni3 hao3"    → "nǐ hǎo"
 *      "ma5" / "ma0" → "ma"  (neutral tone)
 *
 * Placement rules (standard CC-CEDICT / Pinyin spec):
 *   1. If there is an 'a' or 'e', it takes the mark.
 *   2. If there is 'ou', the 'o' takes the mark.
 *   3. Otherwise the last vowel (a e i o u ü v) takes the mark.
 */

const TONE_MARKS: Record<string, string[]> = {
  a: ["ā", "á", "ǎ", "à", "a"],
  e: ["ē", "é", "ě", "è", "e"],
  i: ["ī", "í", "ǐ", "ì", "i"],
  o: ["ō", "ó", "ǒ", "ò", "o"],
  u: ["ū", "ú", "ǔ", "ù", "u"],
  ü: ["ǖ", "ǘ", "ǚ", "ǜ", "ü"],
  v: ["ǖ", "ǘ", "ǚ", "ǜ", "ü"], // CC-CEDICT uses 'v' for ü
};

const VOWELS = new Set(["a", "e", "i", "o", "u", "ü", "v"]);

/**
 * Convert a single pinyin syllable with numeric tone to diacritic form.
 * e.g. "zhang1" → "zhāng", "lv4" → "lǜ", "ma5" → "ma"
 */
function convertSyllable(syllable: string): string {
  // Extract trailing tone digit (1-5, where 5 = neutral)
  const match = syllable.match(/^([a-züv]+)([1-5])$/i);
  if (!match) return syllable; // already converted or not numeric

  const [, body, toneStr] = match;
  const tone = parseInt(toneStr, 10);
  const lower = body.toLowerCase();

  // Tone 5 = neutral, no mark
  if (tone === 5) return body;

  const toneIdx = tone - 1; // 0-based index into TONE_MARKS arrays

  // Rule 1: 'a' or 'e' always takes the mark
  for (const vowel of ["a", "e"]) {
    const idx = lower.indexOf(vowel);
    if (idx !== -1) {
      return body.slice(0, idx) + TONE_MARKS[vowel][toneIdx] + body.slice(idx + 1);
    }
  }

  // Rule 2: 'ou' → 'o' takes the mark
  const ouIdx = lower.indexOf("ou");
  if (ouIdx !== -1) {
    return body.slice(0, ouIdx) + TONE_MARKS["o"][toneIdx] + body.slice(ouIdx + 1);
  }

  // Rule 3: last vowel takes the mark
  for (let i = lower.length - 1; i >= 0; i--) {
    const ch = lower[i];
    if (VOWELS.has(ch)) {
      const marks = TONE_MARKS[ch];
      if (marks) {
        return body.slice(0, i) + marks[toneIdx] + body.slice(i + 1);
      }
    }
  }

  // Fallback: return as-is
  return body;
}

/**
 * Convert a full pinyin string (space-separated syllables) from numeric to diacritic.
 * Handles mixed strings gracefully — syllables without a tone digit are left unchanged.
 *
 * e.g. "jin3 zhang1"  → "jǐn zhāng"
 *      "Zhong1 guo2"  → "Zhōng guó"
 *      "nǐ hǎo"       → "nǐ hǎo"  (already converted, unchanged)
 */
export function toTonePinyin(pinyin: string): string {
  if (!pinyin) return pinyin;
  return pinyin
    .split(" ")
    .map((syllable) => {
      // Preserve capitalisation: if original starts with uppercase, capitalise result
      const isCapital = syllable.length > 0 && syllable[0] === syllable[0].toUpperCase() && syllable[0] !== syllable[0].toLowerCase();
      const converted = convertSyllable(syllable.toLowerCase());
      if (isCapital && converted.length > 0) {
        return converted[0].toUpperCase() + converted.slice(1);
      }
      return converted;
    })
    .join(" ");
}
