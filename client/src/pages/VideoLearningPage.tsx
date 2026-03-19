/**
 * VideoLearningPage — YouTube embed + interactive synced transcript.
 *
 * Transcript is fetched via the tRPC video.fetchTranscript endpoint,
 * which uses yt-dlp server-side to bypass YouTube's bot-detection.
 *
 * Features:
 *   - Paste YouTube URL → extract video ID
 *   - YouTube IFrame API embed (all native controls)
 *   - Server-side transcript fetch via tRPC (yt-dlp)
 *   - Structured text-page transcript layout (paragraph groups with timestamp gutter)
 *   - Real-time transcript sync via 100ms polling
 *   - Active segment highlighted; words in active segment are distinctly highlighted
 *   - Click a timestamp → seek + continue playback
 *   - Click a Chinese word → WordPopup (pinyin, definition, add to flashcards)
 *   - Auto-scroll to keep active segment visible (no layout jitter)
 *   - Adjustable transcript font size (persisted in localStorage)
 *   - Clear message when captions are unavailable
 *   - Desktop: video + transcript side-by-side
 *   - Mobile: video stacked above transcript
 */

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Video, ZoomIn, ZoomOut, Loader2, AlertCircle, Volume2, Check, Plus, X, Maximize2, Minimize2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { useApp } from "@/contexts/AppContext";
import {
  cedictSegment,
  cedictLookup,
  isCedictLoaded,
  getAllReadings,
  type CedictSegment,
} from "@/lib/cedict";
import { lookupWord } from "@/lib/dictionary";
import { getBestZhVoice } from "@/hooks/useTTS";
import { WordPopup } from "@/components/WordPopup";

// ─── Constants ────────────────────────────────────────────────────────────────

const LS_FONT_SIZE = "video-transcript-font-size";
const LS_TRANSCRIPT_WIDTH = "video-transcript-width";
const FONT_MIN = 12;
const FONT_MAX = 24;
const FONT_STEP = 2;
const POLL_MS = 100;
/** Group segments into paragraph blocks every N seconds */
const GROUP_INTERVAL = 30;
/** Transcript panel width clamp (px) */
const TRANSCRIPT_MIN_W = 250;
const TRANSCRIPT_MAX_W = 600;
const TRANSCRIPT_DEFAULT_W = 350;

// ─── Global CSS: force YT-injected iframe to fill its wrapper ────────────────
// Injected once at module load. Targets the iframe the YT IFrame API creates
// inside .yt-wrapper so it always fills 100% of the responsive container.
if (typeof document !== "undefined" && !document.getElementById("yt-wrapper-style")) {
  const style = document.createElement("style");
  style.id = "yt-wrapper-style";
  style.textContent = `
    /* Modern: aspect-ratio drives height; height:0 / paddingBottom are ignored */
    .yt-wrapper { height: unset !important; }
    /* Fallback for browsers without aspect-ratio: use padding-bottom trick */
    @supports not (aspect-ratio: 16/9) {
      .yt-wrapper { height: 0 !important; padding-bottom: 56.25% !important; }
    }
    /* Force the YT-API-injected iframe to fill the wrapper in all cases */
    .yt-wrapper iframe {
      position: absolute !important;
      top: 0 !important; left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border: 0 !important;
      display: block !important;
    }
  `;
  document.head.appendChild(style);
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface TranscriptSegment {
  start: number;
  duration: number;
  text: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractVideoId(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (/^[A-Za-z0-9_-]{11}$/.test(trimmed)) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.hostname === "youtu.be") {
      const id = url.pathname.slice(1).split("/")[0];
      if (id && id.length === 11) return id;
    }
    const vParam = url.searchParams.get("v");
    if (vParam && vParam.length === 11) return vParam;
    const parts = url.pathname.split("/").filter(Boolean);
    const embedIdx = parts.indexOf("embed");
    const shortsIdx = parts.indexOf("shorts");
    const idx = embedIdx !== -1 ? embedIdx + 1 : shortsIdx !== -1 ? shortsIdx + 1 : -1;
    if (idx !== -1 && parts[idx]?.length === 11) return parts[idx];
  } catch {
    // not a URL
  }
  return null;
}

function getActiveIndex(segments: TranscriptSegment[], currentTime: number): number {
  if (segments.length === 0) return -1;
  let active = 0;
  for (let i = 0; i < segments.length; i++) {
    if (currentTime >= segments[i].start) active = i;
    else break;
  }
  return active;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function isCJK(ch: string): boolean {
  const cp = ch.codePointAt(0) ?? 0;
  return (cp >= 0x4e00 && cp <= 0x9fff) ||
    (cp >= 0x3400 && cp <= 0x4dbf) ||
    (cp >= 0x20000 && cp <= 0x2a6df) ||
    (cp >= 0xf900 && cp <= 0xfaff);
}



// ─── YouTube IFrame Player ────────────────────────────────────────────────────

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

let ytApiPromise: Promise<void> | null = null;
function loadYTApi(): Promise<void> {
  if (ytApiPromise) return ytApiPromise;
  ytApiPromise = new Promise((resolve) => {
    if (window.YT?.Player) { resolve(); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    }
  });
  return ytApiPromise;
}

interface PlayerHandle {
  seekTo: (t: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

interface YouTubeEmbedProps {
  videoId: string;
  onTimeUpdate: (t: number) => void;
  playerRef: React.MutableRefObject<PlayerHandle | null>;
  onReady?: (duration: number) => void;
}

function YouTubeEmbed({ videoId, onTimeUpdate, playerRef, onReady }: YouTubeEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cancelled = false;
    let ytPlayer: YT.Player | null = null;

    loadYTApi().then(() => {
      if (cancelled || !container) return;
      container.innerHTML = "";
      const div = document.createElement("div");
      container.appendChild(div);

      ytPlayer = new window.YT.Player(div, {
        videoId,
        playerVars: { rel: 0, modestbranding: 1, origin: window.location.origin },
        events: {
          onReady: () => {
            if (cancelled) return;
            const duration = (() => { try { return ytPlayer?.getDuration() ?? 0; } catch { return 0; } })();
            playerRef.current = {
              seekTo: (t) => {
                try { ytPlayer?.seekTo(t, true); ytPlayer?.playVideo(); } catch { /* ignore */ }
              },
              getCurrentTime: () => {
                try { return ytPlayer?.getCurrentTime() ?? 0; } catch { return 0; }
              },
              getDuration: () => {
                try { return ytPlayer?.getDuration() ?? 0; } catch { return 0; }
              },
            };
            if (duration > 0) onReady?.(duration);
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (cancelled) return;
            if (e.data === window.YT.PlayerState.PLAYING) {
              if (pollRef.current) clearInterval(pollRef.current);
              pollRef.current = setInterval(() => {
                try { onTimeUpdate(ytPlayer?.getCurrentTime() ?? 0); } catch { /* ignore */ }
              }, POLL_MS);
            } else {
              if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
              try { onTimeUpdate(ytPlayer?.getCurrentTime() ?? 0); } catch { /* ignore */ }
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
      try { ytPlayer?.destroy(); } catch { /* ignore */ }
      playerRef.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    /*
     * Responsive 16:9 wrapper.
     * Uses aspect-ratio (modern) with padding-bottom 56.25% fallback.
     * The YT API injects an <iframe> into containerRef; we force it to fill
     * the container via a global CSS rule injected once below.
     */
    <div
      className="yt-wrapper rounded-xl overflow-hidden bg-black shadow-lg"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        /* Fallback for browsers without aspect-ratio support */
        paddingBottom: "var(--yt-pb, 0)",
        height: 0,
      }}
    >
      {/* containerRef fills the entire wrapper; YT API appends iframe here */}
      <div ref={containerRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </div>
  );
}


// ─── Segmented Word ───────────────────────────────────────────────────────────

interface SegmentedWordProps {
  seg: CedictSegment;
  isActive: boolean;
  sentence: string;
  fontSize: number;
  isInDeck: boolean;
  onWordClick: (seg: CedictSegment, e: React.MouseEvent) => void;
}

function SegmentedWord({ seg, isActive, sentence, fontSize, isInDeck, onWordClick }: SegmentedWordProps) {
  const isChinese = seg.text.length > 0 && isCJK(seg.text[0]);
  const hasEntry = seg.entry !== null || getAllReadings(seg.text) !== null;

  if (!isChinese) {
    // Non-Chinese text (punctuation, spaces, Latin) — render plain
    return (
      <span
        className={isActive ? "text-foreground" : "text-muted-foreground"}
        style={{ fontSize }}
      >
        {seg.text}
      </span>
    );
  }

  return (
    <span
      onClick={(e) => onWordClick(seg, e)}
      className={[
        "inline-block cursor-pointer rounded transition-colors duration-100 px-px",
        isActive
          ? "text-foreground hover:bg-primary/20"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        isInDeck ? "border-b border-primary/40" : "",
        hasEntry ? "hover:text-primary" : "",
      ].join(" ")}
      style={{ fontSize }}
      title={hasEntry ? `Click to look up "${seg.text}"` : undefined}
    >
      {seg.text}
    </span>
  );
}

// ─── Transcript Panel ─────────────────────────────────────────────────────────

interface TranscriptPanelProps {
  segments: TranscriptSegment[];
  currentTime: number;
  fontSize: number;
  onSeek: (t: number) => void;
  /** When true, hides the timestamp gutter (manual transcripts have no meaningful timestamps) */
  isManual?: boolean;
}

interface SegmentGroup {
  groupStart: number;
  segments: Array<{ index: number; seg: TranscriptSegment }>;
}

function TranscriptPanel({ segments, currentTime, fontSize, onSeek, isManual }: TranscriptPanelProps) {
  const { isWordInDeck } = useApp();
  const activeIdx = getActiveIndex(segments, currentTime);
  const activeRef = useRef<HTMLDivElement>(null);
  const userScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [cedictReady, setCedictReady] = useState(isCedictLoaded());
  const [segVersion, setSegVersion] = useState(0);
  const [selectedWord, setSelectedWord] = useState<{
    seg: CedictSegment;
    position: { x: number; y: number };
    sentence: string;
  } | null>(null);
  const handleSegmentationFixed = useCallback(() => {
    setSelectedWord(null);
    setSegVersion((v) => v + 1);
  }, []);

  // Wait for CEDICT to load
  useEffect(() => {
    if (cedictReady) return;
    const interval = setInterval(() => {
      if (isCedictLoaded()) {
        setCedictReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [cedictReady]);

  // Auto-scroll to active segment, but pause when user manually scrolls
  useEffect(() => {
    if (activeIdx < 0 || userScrollingRef.current) return;
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [activeIdx]);

  const handleScroll = () => {
    userScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      userScrollingRef.current = false;
    }, 3000);
  };

  // Group segments into paragraph blocks
  const groups = useMemo<SegmentGroup[]>(() => {
    if (segments.length === 0) return [];
    const result: SegmentGroup[] = [];
    let currentGroup: SegmentGroup | null = null;
    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const groupBucket = Math.floor(seg.start / GROUP_INTERVAL) * GROUP_INTERVAL;
      if (!currentGroup || groupBucket !== currentGroup.groupStart) {
        currentGroup = { groupStart: groupBucket, segments: [] };
        result.push(currentGroup);
      }
      currentGroup.segments.push({ index: i, seg });
    }
    return result;
  }, [segments]);

  // Tokenize all segment texts (memoized)
  const tokenized = useMemo<Map<number, CedictSegment[]>>(() => {
    const map = new Map<number, CedictSegment[]>();
    for (const group of groups) {
      for (const { index, seg } of group.segments) {
        map.set(index, cedictSegment(seg.text, segVersion));
      }
    }
    return map;
  }, [groups, cedictReady, segVersion]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleWordClick = useCallback((wordSeg: CedictSegment, e: React.MouseEvent) => {
    e.stopPropagation();
    const hasData = wordSeg.entry !== null || getAllReadings(wordSeg.text) !== null || lookupWord(wordSeg.text) !== null;
    if (!hasData) return;
    setSelectedWord({
      seg: wordSeg,
      position: { x: e.clientX, y: e.clientY },
      sentence: "",
    });
  }, []);

  const closePopup = useCallback(() => setSelectedWord(null), []);

  return (
    <div
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto min-h-0 px-4 py-4"
      style={{ scrollBehavior: "smooth" }}
    >
      {/* Paragraph groups */}
      <div className="space-y-6">
        {groups.map((group) => {
          // Check if any segment in this group is active
          const groupActive = group.segments.some(({ index }) => index === activeIdx);
          // Find the first active segment ref target
          const firstActiveInGroup = group.segments.find(({ index }) => index === activeIdx);

          return (
            <div
              key={group.groupStart}
              className="flex gap-3"
            >
              {/* Timestamp gutter — hidden for manual transcripts */}
              {!isManual && (
                <button
                  onClick={() => onSeek(group.segments[0].seg.start)}
                  className={[
                    "shrink-0 w-10 pt-0.5 text-right font-mono tabular-nums transition-colors",
                    groupActive
                      ? "text-primary"
                      : "text-muted-foreground/40 hover:text-muted-foreground",
                  ].join(" ")}
                  style={{ fontSize: 10 }}
                  title={`Seek to ${formatTime(group.segments[0].seg.start)}`}
                >
                  {formatTime(group.segments[0].seg.start)}
                </button>
              )}

              {/* Paragraph text */}
              <div
                className={[
                  "flex-1 leading-relaxed transition-colors duration-150",
                  groupActive ? "" : "",
                ].join(" ")}
              >
                {group.segments.map(({ index, seg }) => {
                  const isActive = index === activeIdx;
                  const words = tokenized.get(index) ?? [{ text: seg.text, entry: null }];

                  return (
                    <span
                      key={index}
                      ref={isActive ? activeRef : undefined}
                      className={[
                        "inline transition-colors duration-150 rounded",
                        isActive ? "bg-primary/10" : "",
                      ].join(" ")}
                    >
                      {words.map((wordSeg, wi) => (
                        <SegmentedWord
                          key={wi}
                          seg={wordSeg}
                          isActive={isActive}
                          sentence={seg.text}
                          fontSize={fontSize}
                          isInDeck={isCJK(wordSeg.text[0] ?? "") ? isWordInDeck(wordSeg.text) : false}
                          onWordClick={handleWordClick}
                        />
                      ))}
                      {/* Space between segments within same group */}
                      {" "}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Word popup */}
      <AnimatePresence>
        {selectedWord && (
          <WordPopup
            segment={selectedWord.seg}
            position={selectedWord.position}
            onClose={closePopup}
            sentence={selectedWord.sentence}
            onSegmentationFixed={handleSegmentationFixed}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type TranscriptState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; segments: TranscriptSegment[]; language: string }
  | { status: "error"; message: string };

/** Parse plain Chinese text into fake TranscriptSegments (no timestamps) */
function parseManualTranscript(text: string): TranscriptSegment[] {
  const raw = text.split(/(?<=[。！？.!?\n])/).map((s) => s.trim()).filter(Boolean);
  if (raw.length === 0) return [{ start: 0, duration: 9999, text: text.trim() }];
  return raw.map((line, i) => ({ start: i * 5, duration: 5, text: line }));
}

export default function VideoLearningPage() {
  const [inputValue, setInputValue] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [inputError, setInputError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [fontSize, setFontSize] = useState<number>(() => {
    const stored = localStorage.getItem(LS_FONT_SIZE);
    return stored ? parseInt(stored, 10) : 15;
  });
  const [transcript, setTranscript] = useState<TranscriptState>({ status: "idle" });
  const [showManualPaste, setShowManualPaste] = useState(false);
  const [manualText, setManualText] = useState("");
  // Track whether the current transcript was manually pasted (no real timestamps)
  const [isManualTranscript, setIsManualTranscript] = useState(false);
  const playerRef = useRef<PlayerHandle | null>(null);

  /**
   * Called by YouTubeEmbed when the player is ready and reports a valid duration.
   * If the current transcript was manually pasted, redistribute its segment timestamps
   * evenly across the actual video duration so highlighting and click-to-seek work.
   */
  const handlePlayerReady = useCallback((duration: number) => {
    setTranscript((prev) => {
      if (prev.status !== "success") return prev;
      // Only redistribute if this is a manual transcript (language === "manual")
      if (prev.language !== "manual") return prev;
      if (duration <= 0 || prev.segments.length === 0) return prev;
      const count = prev.segments.length;
      const segDuration = duration / count;
      const redistributed = prev.segments.map((seg, i) => ({
        ...seg,
        start: i * segDuration,
        duration: segDuration,
      }));
      return { ...prev, segments: redistributed };
    });
  }, []);

  const handleTimeUpdate = useCallback((t: number) => setCurrentTime(t), []);

  const fetchTranscriptMutation = trpc.video.fetchTranscript.useMutation({
    onSuccess: (data) => {
      setTranscript({
        status: "success",
        segments: data.segments,
        language: data.language,
      });
    },
    onError: (err) => {
      setTranscript({
        status: "error",
        message: err.message || "Failed to fetch transcript.",
      });
    },
  });

  const loadVideo = useCallback((id: string) => {
    setVideoId(id);
    setCurrentTime(0);
    setTranscript({ status: "loading" });
    fetchTranscriptMutation.mutate({
      videoId: id,
      preferredLanguages: ["zh", "zh-Hans", "zh-TW", "zh-CN", "en"],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoad = () => {
    const id = extractVideoId(inputValue);
    if (!id) {
      setInputError("Could not find a valid YouTube video ID. Please paste a YouTube URL or video ID.");
      setVideoId(null);
      return;
    }
    setInputError(null);
    loadVideo(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLoad();
  };

  const handleClear = () => {
    setInputValue("");
    setVideoId(null);
    setInputError(null);
    setCurrentTime(0);
    setTranscript({ status: "idle" });
    setShowManualPaste(false);
    setManualText("");
    setIsManualTranscript(false);
    fetchTranscriptMutation.reset();
  };

  const handleManualLoad = () => {
    const trimmed = manualText.trim();
    if (!trimmed) return;
    const segs = parseManualTranscript(trimmed);
    setIsManualTranscript(true);
    setTranscript({ status: "success", segments: segs, language: "manual" });
    setShowManualPaste(false);
    // If the player is already loaded, redistribute timestamps immediately
    const duration = playerRef.current?.getDuration() ?? 0;
    if (duration > 0 && segs.length > 0) {
      const segDuration = duration / segs.length;
      const redistributed = segs.map((seg, i) => ({
        ...seg,
        start: i * segDuration,
        duration: segDuration,
      }));
      setTranscript({ status: "success", segments: redistributed, language: "manual" });
    }
  };

  const handleSeek = useCallback((t: number) => {
    playerRef.current?.seekTo(t);
  }, []);

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => {
      const next = Math.min(FONT_MAX, Math.max(FONT_MIN, prev + delta));
      localStorage.setItem(LS_FONT_SIZE, String(next));
      return next;
    });
  };

  // ─── Focus Mode ─────────────────────────────────────────────────────────────
  // Layout-only toggle: expands video to ~87% width, keeps transcript visible.
  // Does NOT unmount transcript, recreate iframe, or touch any timing logic.
  const [isFocusMode, setIsFocusMode] = useState(false);

  // ESC key exits Focus Mode
  useEffect(() => {
    if (!isFocusMode) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFocusMode(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isFocusMode]);

  // ─── Draggable Transcript Resize ─────────────────────────────────────────────
  // Drag the divider between video and transcript to resize the transcript panel.
  // Width is clamped between TRANSCRIPT_MIN_W and TRANSCRIPT_MAX_W and persisted
  // in localStorage. No transcript logic or iframe is touched.
  const [transcriptWidth, setTranscriptWidth] = useState<number>(() => {
    const stored = localStorage.getItem(LS_TRANSCRIPT_WIDTH);
    const parsed = stored ? parseInt(stored, 10) : NaN;
    return isNaN(parsed) ? TRANSCRIPT_DEFAULT_W : Math.max(TRANSCRIPT_MIN_W, Math.min(TRANSCRIPT_MAX_W, parsed));
  });

  // Persist width whenever it changes
  useEffect(() => {
    localStorage.setItem(LS_TRANSCRIPT_WIDTH, String(transcriptWidth));
  }, [transcriptWidth]);

  const [isDragging, setIsDragging] = useState(false);

  const startResize = useCallback((e: React.MouseEvent) => {
    // Only activate on desktop (lg+); on mobile panels are stacked vertically
    if (window.innerWidth < 1024) return;
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = transcriptWidth;
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      // Dragging left increases transcript width (video shrinks)
      const delta = startX - moveEvent.clientX;
      const newWidth = Math.max(TRANSCRIPT_MIN_W, Math.min(TRANSCRIPT_MAX_W, startWidth + delta));
      setTranscriptWidth(newWidth);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    // Lock body cursor + selection for the entire drag so hovering other
    // elements doesn't flicker the cursor or select text
    document.body.style.userSelect = "none";
    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }, [transcriptWidth]);

  const hasVideo = Boolean(videoId);
  // Show the main content area when there's a video OR a manual transcript loaded
  const hasContent = hasVideo || (isManualTranscript && transcript.status === "success");
  const segments = transcript.status === "success" ? transcript.segments : [];
  const transcriptLanguage = transcript.status === "success" ? transcript.language : null;

  return (
    // In Focus Mode: fixed full-viewport overlay so nav/sidebar collapse behind it.
    // The wrapper uses CSS transitions for a smooth 300ms resize.
    <div
      className={[
        isFocusMode
          ? "fixed inset-0 z-50 bg-background flex flex-col p-4 overflow-hidden"
          : "space-y-5",
      ].join(" ")}
    >
      {/* Header — hidden in Focus Mode to maximise space */}
      {!isFocusMode && (
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Video size={22} className="text-primary" />
            Video
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Paste a YouTube URL to watch and read along with the transcript.
          </p>
        </div>
      )}

      {/* URL Input — animates out in Focus Mode, back in when exiting */}
      <motion.div
        initial={false}
        animate={isFocusMode
          ? { height: 0, opacity: 0, marginBottom: 0, overflow: "hidden" }
          : { height: "auto", opacity: 1, marginBottom: 0, overflow: "visible" }
        }
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="shrink-0"
      >
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => { setInputValue(e.target.value); setInputError(null); }}
          onKeyDown={handleKeyDown}
          placeholder="Paste YouTube URL or video ID…"
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
        />
        <button
          onClick={handleLoad}
          disabled={!inputValue.trim()}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Load
        </button>
        {hasVideo && (
          <button
            onClick={handleClear}
            className="px-3 py-2 text-sm font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      </motion.div>

      {/* Input error — also hidden in focus mode */}
      {inputError && !isFocusMode && (
        <p className="text-sm text-destructive">{inputError}</p>
      )}

      {/* ── Main content: video + transcript ─────────────────────────────────── */}
      {hasContent && (
        <div
          className={[
            // Shared: always side-by-side on large screens, stacked on small
            // No gap here — the draggable divider provides the visual separation
            "flex transition-all duration-300",
            isFocusMode
              // Focus Mode: fills remaining viewport height, no page scroll
              ? "flex-col lg:flex-row flex-1 min-h-0 items-stretch"
              // Default: natural page flow, stacked on mobile
              : "flex-col lg:flex-row lg:items-start gap-0",
          ].join(" ")}
          // Prevent text selection while dragging
            style={isDragging ? { cursor: "col-resize" } : undefined}
        >
          {/* ── Video column — only shown when a video is loaded ──────────────── */}
          {/* flex-1 so it takes all remaining space after the transcript panel */}
          {hasVideo && <div
            className={[
              "min-w-0 transition-all duration-300",
              isFocusMode
                // Focus Mode: video takes all remaining space (transcript is fixed-width)
                ? "flex-1"
                // Default: flex-1 on desktop (fills space left by transcript panel)
                : "w-full lg:flex-1",
            ].join(" ")}
          >
            {/* Focus Mode button sits above the video, right-aligned */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setIsFocusMode((v) => !v)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                title={isFocusMode ? "Exit Focus Mode (Esc)" : "Enter Focus Mode"}
              >
                {isFocusMode ? (
                  <><Minimize2 size={13} /> Exit Focus</>  
                ) : (
                  <><Maximize2 size={13} /> Focus Mode</>
                )}
              </button>
            </div>

            {/* The YouTube iframe — never unmounted, never recreated */}
            <YouTubeEmbed
              videoId={videoId!}
              onTimeUpdate={handleTimeUpdate}
              playerRef={playerRef}
              onReady={handlePlayerReady}
            />
          </div>}

          {/* ── Draggable Divider — only shown when video is present ──────────────── */}
          {hasVideo && (
          <div
            onMouseDown={startResize}
            className="hidden lg:flex items-center justify-center w-3 shrink-0 cursor-col-resize group"
            title="Drag to resize transcript"
          >
            {/* Visual handle: thin line that brightens on hover/drag */}
            <div
              className={[
                "w-0.5 h-full rounded-full transition-colors duration-150",
                isDragging
                  ? "bg-primary"
                  : "bg-border group-hover:bg-primary/60",
              ].join(" ")}
            />
          </div>
          )}

          {/* ── Transcript column ────────────────────────────────────────────── */}
          {/* IMPORTANT: this div is never unmounted — layout only changes via inline style */}
          <div
            className={[
              "flex flex-col border border-border rounded-xl bg-card",
              // On mobile: full width, natural height. On desktop: fixed draggable width.
              isFocusMode
                ? "w-full lg:shrink-0 min-h-0"
                : "w-full lg:shrink-0",
            ].join(" ")}
            style={{
              // Desktop: use draggable width. Mobile: auto.
              // In Focus Mode: fill remaining height.
              ...(isFocusMode ? {} : { height: "min(560px, 70vh)" }),
              // Only apply fixed width on desktop (lg+)
              ...(window.innerWidth >= 1024 ? {
                width: `${transcriptWidth}px`,
                // Instant resize while dragging; subtle ease when released
                transition: isDragging ? "width 0ms" : "width 150ms ease",
                willChange: isDragging ? "width" : "auto",
              } : {}),
            }}
          >
            {/* Transcript header */}
            <div className="flex items-center justify-between px-3 py-2.5 border-b border-border bg-muted/30 shrink-0">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Transcript
                {transcriptLanguage && (
                  <span className="ml-2 font-normal normal-case text-muted-foreground/60">
                    · {transcriptLanguage}
                  </span>
                )}
              </span>
              {/* Font size controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => changeFontSize(-FONT_STEP)}
                  disabled={fontSize <= FONT_MIN}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Decrease font size"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="text-[11px] text-muted-foreground w-6 text-center tabular-nums">{fontSize}</span>
                <button
                  onClick={() => changeFontSize(FONT_STEP)}
                  disabled={fontSize >= FONT_MAX}
                  className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Increase font size"
                >
                  <ZoomIn size={14} />
                </button>
              </div>
            </div>

            {/* Transcript body — flex-1 so it fills remaining height in both modes */}
            <div className="flex-1 min-h-0 overflow-hidden flex flex-col relative">
              {transcript.status === "loading" && (
                <div className="flex flex-col items-center justify-center flex-1 gap-2 text-muted-foreground">
                  <Loader2 size={20} className="animate-spin" />
                  <p className="text-sm">Fetching transcript…</p>
                </div>
              )}

              {transcript.status === "error" && (
                <div className="flex flex-col items-center justify-center flex-1 gap-3 px-5 text-center">
                  <AlertCircle size={20} className="text-destructive/70 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{transcript.message}</p>
                  <button
                    onClick={() => setShowManualPaste(true)}
                    className="text-xs text-primary underline underline-offset-2 hover:no-underline"
                  >
                    Paste transcript manually
                  </button>
                </div>
              )}

              {transcript.status === "success" && segments.length === 0 && (
                <div className="flex flex-col items-center justify-center flex-1 gap-2 px-4 text-center">
                  <AlertCircle size={20} className="text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No transcript segments found for this video.</p>
                </div>
              )}

              {/* TranscriptPanel is NEVER unmounted — it stays mounted in both modes */}
              {transcript.status === "success" && segments.length > 0 && (
                <TranscriptPanel
                  segments={segments}
                  currentTime={currentTime}
                  fontSize={fontSize}
                  onSeek={handleSeek}
                  isManual={isManualTranscript}
                />
              )}

              {transcript.status === "idle" && (
                <div className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-2">
                  <p className="text-sm text-muted-foreground opacity-60">
                    Transcript will appear here once loaded.
                  </p>
                  <button
                    onClick={() => setShowManualPaste(true)}
                    className="text-xs text-primary underline underline-offset-2 hover:no-underline"
                  >
                    Paste transcript manually
                  </button>
                </div>
              )}

              {/* Manual paste overlay */}
              {showManualPaste && (
                <div className="absolute inset-0 z-10 flex flex-col gap-3 p-4 bg-card rounded-xl">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">Paste Chinese transcript</p>
                    <button
                      onClick={() => setShowManualPaste(false)}
                      className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <textarea
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    placeholder="Paste Chinese text here… It will be split into clickable segments for word lookup."
                    className="flex-1 w-full resize-none rounded-lg border border-border bg-background text-foreground text-sm px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    autoFocus
                  />
                  <button
                    onClick={handleManualLoad}
                    disabled={!manualText.trim()}
                    className="w-full py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    Load transcript
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!hasContent && !inputError && (
        <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground gap-3">
          <Video size={40} className="opacity-20" />
          <p className="text-sm">No video loaded yet.</p>
          <p className="text-xs opacity-70">
            Paste a YouTube URL above and press <strong>Load</strong> or hit Enter.
          </p>
          <div className="flex items-center gap-2 text-xs opacity-60">
            <span>— or —</span>
          </div>
          <button
            onClick={() => setShowManualPaste(true)}
            className="text-xs text-primary underline underline-offset-2 hover:no-underline"
          >
            Paste Chinese text without a video
          </button>
        </div>
      )}

      {/* Manual paste overlay when no video is loaded */}
      {showManualPaste && !hasVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg flex flex-col gap-3 p-5 bg-card rounded-xl border border-border shadow-xl">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Paste Chinese transcript</p>
              <button
                onClick={() => setShowManualPaste(false)}
                className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <textarea
              value={manualText}
              onChange={(e) => setManualText(e.target.value)}
              placeholder="Paste Chinese text here… It will be split into clickable segments for word lookup."
              className="h-48 w-full resize-none rounded-lg border border-border bg-background text-foreground text-sm px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              autoFocus
            />
            <button
              onClick={handleManualLoad}
              disabled={!manualText.trim()}
              className="w-full py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Load transcript
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
