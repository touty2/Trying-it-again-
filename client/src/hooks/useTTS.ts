/**
 * useTTS — browser-native SpeechSynthesis TTS hook
 *
 * Voice priority (most natural first):
 *   Tier 1 — Google Neural (zh-CN): "Google 普通话" — warm, natural, conversational
 *   Tier 2 — Microsoft Neural (zh-CN): Xiaoxiao, Yunxi, Xiaoyi, Yunjian, Yunyang
 *   Tier 3 — Microsoft Neural (zh-TW): HsiaoChen, YunJhe
 *   Tier 4 — Any zh-CN local voice
 *   Tier 5 — Any zh voice
 *   (Avoided: Huihui, Kangkang, Yaoyao — old SAPI voices, robotic)
 *
 * Sentence splitting on 。！？.!? boundaries
 * Sequential playback with currentSentenceIndex tracking
 * Play / Pause / Resume / Stop / Next / Prev controls
 * speakWord() for single-word pronunciation (flashcards, word popup)
 * speakDual() alias for speakWord (flashcard compatibility)
 * hasSpeech: false if no Chinese voices available (console warning shown)
 */
import { useState, useEffect, useRef, useCallback } from "react";

// ─── Sentence splitting ───────────────────────────────────────────────────────

export function splitSentences(text: string): string[] {
  const sentences: string[] = [];
  let current = "";
  let depth = 0;
  const OPEN_QUOTES  = new Set(['\u201c', '\u300c', '\u300e', '\uff08', '\u300a', '\u3008', '\u3010', '\u3014']);
  const CLOSE_QUOTES = new Set(['\u201d', '\u300d', '\u300f', '\uff09', '\u300b', '\u3009', '\u3011', '\u3015']);
  const SENTENCE_END = new Set(['\u3002', '\uff01', '\uff1f', '.', '!', '?']);
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    current += ch;
    if (OPEN_QUOTES.has(ch)) {
      depth++;
    } else if (CLOSE_QUOTES.has(ch)) {
      depth = Math.max(0, depth - 1);
      if (depth === 0 && current.length >= 2) {
        const prev = current[current.length - 2];
        if (SENTENCE_END.has(prev)) {
          const trimmed = current.trim();
          if (trimmed) sentences.push(trimmed);
          current = "";
        }
      }
    } else if (SENTENCE_END.has(ch) && depth === 0) {
      while (i + 1 < text.length) {
        const next = text[i + 1];
        if (CLOSE_QUOTES.has(next) || next === '\u2026') { i++; current += text[i]; }
        else break;
      }
      const trimmed = current.trim();
      if (trimmed) sentences.push(trimmed);
      current = "";
    }
  }
  const remaining = current.trim();
  if (remaining) sentences.push(remaining);
  if (import.meta.env.DEV) {
    console.debug('[TTS] splitSentences ->', sentences.map((s, i) => `[${i}] ${s}`));
  }
  return sentences;
}

// ─── Voice selection ──────────────────────────────────────────────────────────

// Old Microsoft SAPI voices — robotic, always deprioritised
const LEGACY_SAPI_NAMES = ["Huihui", "Kangkang", "Yaoyao", "Lili"];

// Tier 1: Best natural voices — Google Neural OR Microsoft Online (Natural)
// Microsoft "Online (Natural)" voices are cloud-streamed neural voices, equal
// quality to Google Neural. Both score 200 so the gender preference decides.
const TIER1_PATTERNS = [
  "Google 普通话",
  "Google Chinese",
  "Google zh",
  "Online (Natural)",  // Microsoft cloud neural voices (Xiaoxiao, Yunxi, etc.)
  "Natural",           // Catch-all for any browser labelling them differently
];

// Tier 2: Microsoft Neural zh-CN voices (offline/local, still very natural)
const TIER2_PATTERNS = [
  "Xiaoxiao",  // warm, conversational female — best for learning
  "Yunxi",     // natural male
  "Xiaoyi",   // gentle female
  "Yunjian",  // expressive male
  "Yunyang",  // professional male
  "Xiaomo",   // gentle female
  "Xiaoqiu", // calm female
];

// Tier 3: Microsoft Neural zh-TW voices
const TIER3_PATTERNS = ["HsiaoChen", "YunJhe", "HsiaoYu"];

export function scoreVoice(v: SpeechSynthesisVoice): number {
  const name = v.name;

  // Always deprioritise old robotic SAPI voices
  if (LEGACY_SAPI_NAMES.some((n) => name.includes(n))) return -10;

  // Tier 1: Google Neural or Microsoft Online (Natural) — most natural
  // Only match zh voices to avoid accidentally picking non-Chinese natural voices
  if (v.lang.startsWith("zh") && TIER1_PATTERNS.some((p) => name.includes(p))) return 200;

  // Tier 2: Microsoft Neural zh-CN (offline/local)
  const tier2Idx = TIER2_PATTERNS.findIndex((p) => name.includes(p));
  if (tier2Idx !== -1) return 150 - tier2Idx;

  // Tier 3: Microsoft Neural zh-TW
  const tier3Idx = TIER3_PATTERNS.findIndex((p) => name.includes(p));
  if (tier3Idx !== -1) return 100 - tier3Idx;

  // Tier 4: Any zh-CN
  if (v.lang === "zh-CN") return 50;

  // Tier 5: Any zh
  if (v.lang.startsWith("zh")) return 30;

  return 0;
}

// Known male voice name fragments (Microsoft Neural zh-CN/zh-TW)
const MALE_VOICE_NAMES = ["Yunxi", "Yunjian", "Yunyang", "YunJhe", "Yunfeng", "Yunhao"];
// Known female voice name fragments (Microsoft Neural zh-CN/zh-TW)
const FEMALE_VOICE_NAMES = ["Xiaoxiao", "Xiaoyi", "Xiaomo", "Xiaoqiu", "HsiaoChen", "HsiaoYu", "Xiaochen", "Xiaorui"];

function voiceMatchesGender(v: SpeechSynthesisVoice, gender: "female" | "male"): boolean {
  const name = v.name;
  if (gender === "male") return MALE_VOICE_NAMES.some((n) => name.includes(n));
  return FEMALE_VOICE_NAMES.some((n) => name.includes(n));
}

export function getBestZhVoice(
  preferredURI?: string | null,
  gender?: "female" | "male" | null
): SpeechSynthesisVoice | null {
  if (typeof window === "undefined" || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) return null;
  const zhVoices = voices.filter((v) => v.lang.startsWith("zh"));
  if (zhVoices.length === 0) return null;

  // If user has manually pinned a voice URI, honour it ONLY if no gender
  // preference is set OR the pinned voice matches the requested gender.
  // This allows the gender toggle to override a pinned voice.
  if (preferredURI) {
    const preferred = zhVoices.find((v) => v.voiceURI === preferredURI);
    if (preferred) {
      // If no gender preference, always use pinned voice
      if (!gender) return preferred;
      // If pinned voice matches gender, use it
      if (voiceMatchesGender(preferred, gender)) return preferred;
      // Pinned voice doesn't match gender — fall through to gender-based selection
    }
  }

  // If a gender preference is set, try to find a matching voice first
  if (gender) {
    const genderVoices = zhVoices.filter((v) => voiceMatchesGender(v, gender));
    if (genderVoices.length > 0) {
      return genderVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
    }
    // No gender-specific voice found — fall through to best available
  }

  // Fallback: best available zh voice by score
  return zhVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a))[0];
}

// ─── Deduplication ───────────────────────────────────────────────────────────

/**
 * Remove duplicate voices that differ only in voiceURI suffix.
 * e.g. "Microsoft Xiaoxiao Online (Natural) - zh-CN" and
 *      "Microsoft Xiaoxiao Online (Natural) - zh-CN (en-US)" are the same voice.
 * Keep the one with the higher score (or the first one if equal).
 */
function deduplicateVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  const seen = new Map<string, SpeechSynthesisVoice>();
  for (const v of voices) {
    // Normalise name: strip trailing " (en-US)" or " (fr-FR)" locale suffixes
    const normName = v.name.replace(/\s*\([a-z]{2}-[A-Z]{2}\)\s*$/i, "").trim();
    const existing = seen.get(normName);
    if (!existing || scoreVoice(v) > scoreVoice(existing)) {
      seen.set(normName, v);
    }
  }
  return Array.from(seen.values());
}

// Maximum number of voices shown in the Settings picker by default
const MAX_VOICES_IN_PICKER = 5;

/**
 * Returns a human-readable quality tier label for a voice.
 * Used by the Settings voice picker to show quality badges.
 */
export function getVoiceTier(v: SpeechSynthesisVoice): { label: string; level: 1 | 2 | 3 | 4 } {
  const score = scoreVoice(v);
  if (score >= 200) return { label: "Neural HD", level: 1 };
  if (score >= 140) return { label: "Neural", level: 2 };
  if (score >= 90)  return { label: "Neural TW", level: 3 };
  return { label: "Standard", level: 4 };
}

/**
 * Returns ALL available Mandarin voices (no cap), sorted by quality.
 * Used by the Settings voice picker when the user wants to see all voices.
 */
export function getAllZhVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.startsWith("zh") && scoreVoice(v) >= 0)
    .sort((a, b) => scoreVoice(b) - scoreVoice(a));
}

/**
 * Returns the top-N highest-quality, deduplicated Mandarin voices.
 * Excludes legacy SAPI voices (score < 0) and non-zh languages.
 * Capped at MAX_VOICES_IN_PICKER to avoid overwhelming the user.
 */
export function getZhVoices(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !window.speechSynthesis) return [];
  const all = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.startsWith("zh") && scoreVoice(v) >= 0)
    .sort((a, b) => scoreVoice(b) - scoreVoice(a));
  const deduped = deduplicateVoices(all);
  return deduped.slice(0, MAX_VOICES_IN_PICKER);
}

// Keep legacy export used by SettingsPage voice picker
export function getAvailableZhVoices(): SpeechSynthesisVoice[] {
  return getZhVoices();
}

/**
 * useZhVoices — React hook that waits for the voiceschanged event before
 * populating the voice list. Returns { voices, loading } where loading is
 * true until the browser has fired voiceschanged at least once.
 *
 * Safe to call in multiple components — each gets its own subscription.
 */
export function useZhVoices(): { voices: SpeechSynthesisVoice[]; loading: boolean } {
  // Lazy initialiser: try synchronous load first (works in Firefox + Safari)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => getZhVoices());
  const [loading, setLoading] = useState<boolean>(() => getZhVoices().length === 0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const refresh = () => {
      const v = getZhVoices();
      setVoices(v);
      setLoading(false);
      console.log(
        `[TTS] voices loaded (${v.length} Mandarin voices): ${v.map((x) => x.name).join(", ") || "(none)"}`
      );
    };

    // Immediate check — Chrome sometimes has voices ready before the event
    const immediate = getZhVoices();
    if (immediate.length > 0) {
      setVoices(immediate);
      setLoading(false);
    }

    window.speechSynthesis.addEventListener("voiceschanged", refresh);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", refresh);
  }, []);

  return { voices, loading };
}

// ─── Core speak primitive ─────────────────────────────────────────────────────

function speakPromise(
  text: string,
  voice: SpeechSynthesisVoice | null,
  rate: number,
  token: { cancelled: boolean },
  onBoundary?: (charIndex: number) => void,
  onSpeechStart?: () => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (token.cancelled) { reject(new Error("cancelled")); return; }
    const synth = window.speechSynthesis;
    synth.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "zh-CN";
    // Slightly slower than default for clarity; user speed multiplier applied on top
    utt.rate = Math.max(0.1, Math.min(10, rate * 0.95));
    // Neutral pitch — avoids the artificially high pitch of legacy SAPI voices
    utt.pitch = 1.0;
    // Full volume
    utt.volume = 1.0;
    if (voice) utt.voice = voice;

    // Track whether the first boundary event has fired for this utterance.
    // We use the first boundary event as the true "speech has started" signal
    // because the browser buffers audio before speaking — the onstart event
    // fires too early (before audio output begins) on many voices/platforms.
    let speechStarted = false;

    utt.onstart = () => {
      // onstart fires when the utterance is dequeued for synthesis, which is
      // slightly before actual audio output on cloud/neural voices. We use it
      // as a fallback for voices that never fire onboundary (e.g. some iOS voices).
      if (!token.cancelled && !speechStarted) {
        speechStarted = true;
        onSpeechStart?.();
      }
    };
    utt.onend = () => {
      if (!token.cancelled) resolve();
      else reject(new Error("cancelled"));
    };
    utt.onboundary = (e) => {
      if (token.cancelled) return;
      // The very first boundary event is the most reliable signal that audio
      // output has actually begun. Advance the sentence highlight here.
      if (!speechStarted) {
        speechStarted = true;
        onSpeechStart?.();
      }
      if (e.name === "word" && onBoundary) {
        onBoundary(e.charIndex);
      }
    };
    utt.onerror = (e) => {
      if (e.error === "interrupted" || e.error === "canceled") {
        reject(new Error("cancelled"));
      } else if (e.error === "not-allowed") {
        // iOS requires a direct user gesture to unlock speechSynthesis.
        // Resolve silently so the UI doesn't break — user must tap a button.
        console.warn("[TTS] not-allowed: requires a user gesture on this browser");
        resolve();
      } else {
        console.warn("[TTS] utterance error:", e.error);
        // Resolve instead of reject so a single bad utterance doesn't
        // abort the whole playback queue (common on some Android browsers).
        resolve();
      }
    };
    synth.speak(utt);
    // Safety timeout: if onend never fires (a known Chrome/Android bug),
    // resolve after a generous buffer so playback isn't stuck forever.
    const safetyMs = Math.max(8000, (text.length / (rate * 0.95)) * 600);
    const safetyTimer = setTimeout(() => {
      if (!token.cancelled) resolve();
    }, safetyMs);
    const origOnend = utt.onend;
    utt.onend = (e) => { clearTimeout(safetyTimer); (origOnend as ((e: SpeechSynthesisEvent) => void))?.(e); };
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type PlaybackState = "idle" | "playing" | "paused";
// Legacy alias kept for compatibility
export type TtsState = PlaybackState;
export type TTSEngine = "browser";

export interface TTSControls {
  state: PlaybackState;
  currentSentenceIndex: number;
  totalSentences: number;
  sentences: string[];
  engine: TTSEngine;
  hasSpeech: boolean;
  speed: number;
  /** charIndex of the word boundary currently being spoken, -1 when idle */
  activeCharIndex: number;
  playAll: (text: string) => void;
  playSentence: (sentences: string[], index: number) => void;
  speakWord: (text: string, rate?: number) => void;
  speakDual: (text: string, rate?: number) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  setSpeed: (rate: number) => void;
}

// ─── useTTS hook ──────────────────────────────────────────────────────────────

export function useTTS(options?: {
  preferredVoiceURI?: string | null;
  defaultSpeed?: number;
  onSentenceChange?: (index: number) => void;
  voiceGender?: "female" | "male";
  /** @deprecated — ignored, kept for API compatibility */
  serverVoice?: string;
  /** Called on each word boundary event with the charIndex within the current sentence */
  onWordBoundary?: (charIndex: number) => void;
}): TTSControls {
  const [state, setState] = useState<PlaybackState>("idle");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [sentences, setSentences] = useState<string[]>([]);
  const [speed, setSpeedState] = useState(options?.defaultSpeed ?? 1.0);
  const [hasSpeech, setHasSpeech] = useState(false);
  const [activeCharIndex, setActiveCharIndex] = useState(-1);

  const stateRef = useRef<PlaybackState>("idle");
  const currentIdxRef = useRef(0);
  const sentencesRef = useRef<string[]>([]);
  const speedRef = useRef(options?.defaultSpeed ?? 1.0);
  const preferredVoiceRef = useRef(options?.preferredVoiceURI ?? null);
  const voiceGenderRef = useRef(options?.voiceGender ?? null);
  const tokenRef = useRef<{ cancelled: boolean }>({ cancelled: false });
  const onWordBoundaryRef = useRef(options?.onWordBoundary);
  useEffect(() => { onWordBoundaryRef.current = options?.onWordBoundary; }, [options?.onWordBoundary]);
  // Internal boundary handler that updates activeCharIndex state
  const handleBoundary = useCallback((ci: number) => {
    setActiveCharIndex(ci);
    onWordBoundaryRef.current?.(ci);
  }, []);

  useEffect(() => { preferredVoiceRef.current = options?.preferredVoiceURI ?? null; }, [options?.preferredVoiceURI]);
  useEffect(() => { voiceGenderRef.current = options?.voiceGender ?? null; }, [options?.voiceGender]);

  // Detect Chinese voice availability.
  // On mobile (iOS/Android) voices load asynchronously and may not be available
  // on the first call. We optimistically show TTS buttons if speechSynthesis
  // exists at all, then refine once voices are confirmed. We also poll for up
  // to 3 seconds in case voiceschanged never fires (common on iOS Safari).
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    // Optimistically enable TTS as soon as the API is present — mobile browsers
    // always have at least a system voice even if zh voices load late.
    setHasSpeech(true);
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const zhVoices = voices.filter((v) => v.lang.startsWith("zh"));
      if (zhVoices.length > 0) {
        setHasSpeech(true);
      } else if (voices.length > 0) {
        // No zh voices but other voices exist — keep TTS enabled so the
        // browser can still attempt to speak Chinese with a fallback voice.
        setHasSpeech(true);
        console.warn("[TTS] No dedicated Mandarin voice found; using system default");
      }
      // If voices.length === 0 we leave hasSpeech as true and wait for the
      // voiceschanged event or the polling interval below.
    };
    checkVoices();
    window.speechSynthesis.addEventListener("voiceschanged", checkVoices);
    // Polling fallback for iOS Safari which sometimes never fires voiceschanged
    const intervals = [300, 800, 1500, 3000];
    const timers = intervals.map((ms) => setTimeout(checkVoices, ms));
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", checkVoices);
      timers.forEach(clearTimeout);
    };
  }, []);

  // Cancel on unmount
  useEffect(() => {
    return () => {
      tokenRef.current.cancelled = true;
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const newToken = useCallback((): { cancelled: boolean } => {
    tokenRef.current.cancelled = true;
    const t = { cancelled: false };
    tokenRef.current = t;
    return t;
  }, []);

  const playSentenceAt = useCallback(
    async (sents: string[], startIdx: number, token: { cancelled: boolean }) => {
      if (sents.length === 0 || startIdx >= sents.length) {
        setState("idle"); stateRef.current = "idle";
        setCurrentIdx(0); currentIdxRef.current = 0;
        return;
      }
      setState("playing"); stateRef.current = "playing";

      // Pre-set the index for the very first sentence so the UI shows something
      // immediately when the user presses play. For subsequent sentences the
      // index is advanced inside onSpeechStart (first boundary / onstart event)
      // so the highlight moves exactly when audio output begins.
      setCurrentIdx(startIdx); currentIdxRef.current = startIdx;
      options?.onSentenceChange?.(startIdx);

      for (let i = startIdx; i < sents.length; i++) {
        if (token.cancelled) break;

        const voice = getBestZhVoice(preferredVoiceRef.current, voiceGenderRef.current);
        if (i === startIdx) {
          // Log active voice at the start of each playback session
          console.log(
            `[TTS] playback started — voice: "${voice?.name ?? "(none)"}" | lang: ${voice?.lang ?? "?"} | local: ${voice?.localService ?? false} | speed: ${speedRef.current}x`
          );
        }

        // Capture i in a const so the closure inside onSpeechStart is stable
        const sentIdx = i;
        // onSpeechStart fires on the first boundary/onstart of this utterance —
        // that is the true moment audio output begins, so we advance the
        // sentence highlight here instead of before speakPromise().
        const onSpeechStart = () => {
          if (token.cancelled) return;
          setCurrentIdx(sentIdx); currentIdxRef.current = sentIdx;
          options?.onSentenceChange?.(sentIdx);
          setActiveCharIndex(-1); // reset word highlight for new sentence
        };

        try {
          await speakPromise(sents[i], voice, speedRef.current, token, handleBoundary, onSpeechStart);
        } catch {
          break;
        }
        // Wait while paused
        while ((stateRef.current as string) === "paused" && !token.cancelled) {
          await new Promise((r) => setTimeout(r, 100));
        }
        if (token.cancelled) break;

      }
      if (!token.cancelled) {
        setState("idle"); stateRef.current = "idle";
        setCurrentIdx(0); currentIdxRef.current = 0;
        setSentences([]); sentencesRef.current = [];
        setActiveCharIndex(-1);
      }
    },
    [options, handleBoundary]
  );

  const playAll = useCallback(
    (text: string) => {
      const sents = splitSentences(text);
      const token = newToken();
      setSentences(sents); sentencesRef.current = sents;
      setCurrentIdx(0); currentIdxRef.current = 0;
      playSentenceAt(sents, 0, token);
    },
    [newToken, playSentenceAt]
  );

  const playSentence = useCallback(
    (sents: string[], index: number) => {
      const token = newToken();
      setSentences(sents); sentencesRef.current = sents;
      setCurrentIdx(index); currentIdxRef.current = index;
      playSentenceAt(sents, index, token);
    },
    [newToken, playSentenceAt]
  );

  const speakWord = useCallback(
    (text: string, rate?: number) => {
      const token = newToken();
      setSentences([]); sentencesRef.current = [];
      setState("playing"); stateRef.current = "playing";
      setCurrentIdx(0); currentIdxRef.current = 0;
      const voice = getBestZhVoice(preferredVoiceRef.current, voiceGenderRef.current);
      console.log(
        `[TTS] speakWord — "${text}" | voice: "${voice?.name ?? "(none)"}" | lang: ${voice?.lang ?? "?"} | speed: ${(rate ?? speedRef.current)}x`
      );
      speakPromise(text, voice, rate ?? speedRef.current, token)
        .then(() => { if (!token.cancelled) { setState("idle"); stateRef.current = "idle"; } })
        .catch(() => { if (!token.cancelled) { setState("idle"); stateRef.current = "idle"; } });
    },
    [newToken]
  );

  const speakDual = useCallback(
    (text: string, rate?: number) => { speakWord(text, rate); },
    [speakWord]
  );

  const pause = useCallback(() => {
    if (stateRef.current !== "playing") return;
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.pause();
    setState("paused"); stateRef.current = "paused";
  }, []);

  const resume = useCallback(() => {
    if (stateRef.current !== "paused") return;
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.resume();
    setState("playing"); stateRef.current = "playing";
  }, []);

  const stop = useCallback(() => {
    newToken();
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setState("idle"); stateRef.current = "idle";
    setCurrentIdx(0); currentIdxRef.current = 0;
    setSentences([]); sentencesRef.current = [];
    setActiveCharIndex(-1);
  }, [newToken]);

  const next = useCallback(() => {
    const sents = sentencesRef.current;
    if (sents.length === 0) return;
    const nextIdx = currentIdxRef.current + 1;
    if (nextIdx < sents.length) {
      const token = newToken();
      setCurrentIdx(nextIdx); currentIdxRef.current = nextIdx;
      playSentenceAt(sents, nextIdx, token);
    } else {
      stop();
    }
  }, [newToken, playSentenceAt, stop]);

  const prev = useCallback(() => {
    const sents = sentencesRef.current;
    if (sents.length === 0) return;
    const prevIdx = Math.max(0, currentIdxRef.current - 1);
    const token = newToken();
    setCurrentIdx(prevIdx); currentIdxRef.current = prevIdx;
    playSentenceAt(sents, prevIdx, token);
  }, [newToken, playSentenceAt]);

  const setSpeed = useCallback(
    (rate: number) => {
      setSpeedState(rate);
      speedRef.current = rate;
      if (stateRef.current === "playing") {
        const sents = sentencesRef.current;
        const idx = currentIdxRef.current;
        const token = newToken();
        playSentenceAt(sents, idx, token);
      }
    },
    [newToken, playSentenceAt]
  );

  return {
    state,
    currentSentenceIndex: currentIdx,
    totalSentences: sentences.length,
    sentences,
    engine: "browser" as TTSEngine,
    hasSpeech,
    speed,
    activeCharIndex,
    playAll,
    playSentence,
    speakWord,
    speakDual,
    pause,
    resume,
    stop,
    next,
    prev,
    setSpeed,
  };
}
