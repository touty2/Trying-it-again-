/**
 * useAudioSettings — persists TTS preferences in localStorage.
 *
 * Keys stored under "cr-audio-v1":
 *   playbackSpeed: number (0.75 | 0.9 | 1.0 | 1.1 | 1.25 | 1.5 | 2.0)
 *   slowFlashcard: boolean  (use 0.75x for flashcard pronunciation)
 *   sentenceByDefault: boolean (default to sentence-by-sentence mode)
 *   autoContinue: boolean  (auto-advance in sentence-by-sentence mode)
 *   preferredVoiceURI: string | null (URI of preferred zh-CN voice)
 */

import { useState, useCallback } from "react";

export interface AudioSettings {
  playbackSpeed: number;
  slowFlashcard: boolean;
  sentenceByDefault: boolean;
  autoContinue: boolean;
  preferredVoiceURI: string | null;
  /** Gender preference for story reading TTS: 'female' | 'male' */
  storyVoiceGender: "female" | "male";
}

const STORAGE_KEY = "cr-audio-v1";

const DEFAULTS: AudioSettings = {
  playbackSpeed: 1.0,
  slowFlashcard: false,
  sentenceByDefault: false,
  autoContinue: false,
  preferredVoiceURI: null,
  storyVoiceGender: "female",
};

function load(): AudioSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function save(s: AudioSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore quota errors
  }
}

export function useAudioSettings() {
  const [settings, setSettings] = useState<AudioSettings>(load);

  const update = useCallback((patch: Partial<AudioSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save(DEFAULTS);
    setSettings(DEFAULTS);
  }, []);

  return { settings, update, reset };
}
