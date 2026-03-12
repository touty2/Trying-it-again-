/**
 * useYouTubePlayer — manages a YouTube IFrame API player instance.
 *
 * Architecture:
 *   - Loads the YT IFrame API script once (singleton guard)
 *   - Attaches to a <div id={containerId}> via YT.Player constructor
 *   - Polls getCurrentTime every 100ms while playing (precise transcript sync)
 *   - Exposes stable callbacks (seekTo, play, pause, setPlaybackRate)
 *   - Enables English CC by default via playerVars
 */
import { useCallback, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

export type PlayerState = "unstarted" | "playing" | "paused" | "buffering" | "ended" | "cued";

export interface UseYouTubePlayerOptions {
  /** Enable closed captions by default (default: true) */
  enableCaptions?: boolean;
  /** Preferred caption language (default: "en") */
  captionLanguage?: string;
  /** Poll interval in ms while playing (default: 100) */
  pollIntervalMs?: number;
}

export interface UseYouTubePlayerReturn {
  /** Current playback time in seconds (updates every ~100ms while playing) */
  currentTime: number;
  /** Total video duration in seconds (available after player loads) */
  duration: number | null;
  playerState: PlayerState;
  /** Seek to a specific time and optionally start playback */
  seekTo: (seconds: number, autoPlay?: boolean) => void;
  play: () => void;
  pause: () => void;
  setPlaybackRate: (rate: number) => void;
  /** Raw YT.Player instance — use for advanced API calls */
  playerRef: React.MutableRefObject<YT.Player | null>;
  isReady: boolean;
}

// ─── Singleton API loader ─────────────────────────────────────────────────────

let apiLoaded = false;
let apiLoading = false;
const readyCallbacks: Array<() => void> = [];

function loadYTApi(): Promise<void> {
  if (apiLoaded) return Promise.resolve();
  return new Promise((resolve) => {
    readyCallbacks.push(resolve);
    if (apiLoading) return;
    apiLoading = true;
    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      readyCallbacks.forEach((cb) => cb());
      readyCallbacks.length = 0;
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.appendChild(script);
  });
}

function ytStateToEnum(state: number): PlayerState {
  switch (state) {
    case -1: return "unstarted";
    case 0:  return "ended";
    case 1:  return "playing";
    case 2:  return "paused";
    case 3:  return "buffering";
    case 5:  return "cued";
    default: return "unstarted";
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useYouTubePlayer(
  containerId: string,
  videoId: string | null,
  options: UseYouTubePlayerOptions = {}
): UseYouTubePlayerReturn {
  const {
    enableCaptions = true,
    captionLanguage = "en",
    pollIntervalMs = 100,
  } = options;

  const playerRef = useRef<YT.Player | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState<number | null>(null);
  const [playerState, setPlayerState] = useState<PlayerState>("unstarted");
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentVideoIdRef = useRef<string | null>(null);

  const startPolling = useCallback(() => {
    if (pollRef.current) return;
    pollRef.current = setInterval(() => {
      if (playerRef.current) {
        try {
          const t = playerRef.current.getCurrentTime?.() ?? 0;
          setCurrentTime(t);
        } catch {
          // player not ready yet
        }
      }
    }, pollIntervalMs);
  }, [pollIntervalMs]);

  const stopPolling = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!videoId) return;
    if (videoId === currentVideoIdRef.current && isReady) return;

    let cancelled = false;

    loadYTApi().then(() => {
      if (cancelled) return;

      if (playerRef.current && currentVideoIdRef.current) {
        try {
          playerRef.current.loadVideoById(videoId);
          currentVideoIdRef.current = videoId;
          setCurrentTime(0);
          return;
        } catch {
          // player was destroyed, fall through to create new one
        }
      }

      currentVideoIdRef.current = videoId;

      const playerVars: Record<string, unknown> = {
        rel: 0,
        modestbranding: 1,
        origin: window.location.origin,
        disablekb: 0,
      };

      if (enableCaptions) {
        playerVars.cc_load_policy = 1;
        playerVars.cc_lang_pref = captionLanguage;
        playerVars.hl = captionLanguage;
      }

      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: playerVars as YT.PlayerVars,
        events: {
          onReady: (e: YT.PlayerEvent) => {
            if (cancelled) return;
            setIsReady(true);
            try {
              const d = (e.target as YT.Player).getDuration?.();
              if (d && d > 0) setDuration(d);
            } catch {
              // ignore
            }
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (cancelled) return;
            const state = ytStateToEnum(e.data);
            setPlayerState(state);
            if (state === "playing") {
              startPolling();
              try {
                const d = (e.target as YT.Player).getDuration?.();
                if (d && d > 0) setDuration(d);
              } catch {
                // ignore
              }
            } else {
              stopPolling();
              try {
                const t = (e.target as YT.Player).getCurrentTime?.() ?? 0;
                setCurrentTime(t);
              } catch {
                // ignore
              }
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, containerId]);

  useEffect(() => {
    return () => {
      stopPolling();
      try {
        playerRef.current?.destroy?.();
      } catch {
        // ignore
      }
      playerRef.current = null;
      currentVideoIdRef.current = null;
    };
  }, [stopPolling]);

  const seekTo = useCallback((seconds: number, autoPlay = true) => {
    if (!playerRef.current) return;
    try {
      playerRef.current.seekTo(seconds, true);
      if (autoPlay) playerRef.current.playVideo();
    } catch {
      // ignore
    }
  }, []);

  const play = useCallback(() => {
    try { playerRef.current?.playVideo(); } catch { /* ignore */ }
  }, []);

  const pause = useCallback(() => {
    try { playerRef.current?.pauseVideo(); } catch { /* ignore */ }
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    try { playerRef.current?.setPlaybackRate(rate); } catch { /* ignore */ }
  }, []);

  return { currentTime, duration, playerState, seekTo, play, pause, setPlaybackRate, playerRef, isReady };
}
