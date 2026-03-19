/**
 * videoLearning.ts — Core types, transcript parser, and localStorage persistence
 * for the Video Learning module.
 *
 * Future-proof architecture:
 *   - TranscriptLine supports optional pinyin / translation (AI-fillable later)
 *   - VideoSession supports metadata for comprehension tracking later
 *   - Parser handles timestamped and plain-text transcripts
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TranscriptLine {
  id: string;
  /** Start time in seconds */
  startSeconds: number;
  /** End time in seconds (null = until next line starts) */
  endSeconds: number | null;
  /** The Chinese sentence text */
  sentence: string;
  /** Optional pinyin (manually added or AI-generated later) */
  pinyin?: string;
  /** Optional English translation (manually added or AI-generated later) */
  translation?: string;
}

export interface VideoSession {
  id: string;
  title: string;
  youtubeUrl: string;
  /** Extracted YouTube video ID */
  videoId: string;
  /** Raw transcript text as pasted by user */
  rawTranscript: string;
  /** Parsed transcript lines */
  lines: TranscriptLine[];
  /** Total video duration in seconds (set after player loads) */
  durationSeconds: number | null;
  createdAt: number;
  updatedAt: number;
}

// ─── YouTube URL / ID utilities ───────────────────────────────────────────────

/**
 * Extract YouTube video ID from various URL formats:
 *   https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *   https://youtu.be/dQw4w9WgXcQ
 *   https://www.youtube.com/embed/dQw4w9WgXcQ
 *   https://www.youtube.com/shorts/dQw4w9WgXcQ
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
    /^([A-Za-z0-9_-]{11})$/, // bare ID
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function buildEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}&rel=0&modestbranding=1`;
}

// ─── Transcript Parser ────────────────────────────────────────────────────────

/**
 * Timestamp patterns supported:
 *   00:12        → 12s
 *   0:12         → 12s
 *   1:23:45      → 5025s
 *   [00:12]      → 12s (bracketed)
 *   (00:12)      → 12s (parenthesised)
 */
const TIMESTAMP_RE = /^[\[\(]?(\d{1,2}):(\d{2})(?::(\d{2}))?[\]\)]?\s*/;

function parseTimestamp(ts: string): number {
  const m = ts.match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
  if (!m) return 0;
  const h = m[3] ? parseInt(m[1]) : 0;
  const min = m[3] ? parseInt(m[2]) : parseInt(m[1]);
  const sec = m[3] ? parseInt(m[3]) : parseInt(m[2]);
  return h * 3600 + min * 60 + sec;
}

function hasTimestamps(text: string): boolean {
  return TIMESTAMP_RE.test(text.trim().split("\n")[0]);
}

function splitIntoSentences(text: string): string[] {
  // Split on Chinese/English sentence-ending punctuation, keeping the delimiter
  return text
    .split(/(?<=[。！？.!?])\s*/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

/**
 * Parse a raw transcript string into structured TranscriptLine[].
 *
 * @param raw        Raw transcript text
 * @param videoDuration  Known video duration in seconds (used for plain-text distribution)
 */
export function parseTranscript(
  raw: string,
  videoDuration?: number
): TranscriptLine[] {
  const trimmed = raw.trim();
  if (!trimmed) return [];

  const lines: TranscriptLine[] = [];

  if (hasTimestamps(trimmed)) {
    // ── Timestamped mode ──────────────────────────────────────────────────
    const rawLines = trimmed.split("\n").filter((l) => l.trim().length > 0);
    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i].trim();
      const tsMatch = line.match(TIMESTAMP_RE);
      if (!tsMatch) continue;

      const startSeconds = parseTimestamp(tsMatch[0]);
      const sentence = line.slice(tsMatch[0].length).trim();
      if (!sentence) continue;

      lines.push({
        id: `line-${i}`,
        startSeconds,
        endSeconds: null, // filled in below
        sentence,
      });
    }

    // Fill endSeconds = next line's startSeconds
    for (let i = 0; i < lines.length - 1; i++) {
      lines[i].endSeconds = lines[i + 1].startSeconds;
    }
    if (lines.length > 0) {
      lines[lines.length - 1].endSeconds = videoDuration ?? null;
    }
  } else {
    // ── Plain text mode ───────────────────────────────────────────────────
    const sentences = splitIntoSentences(trimmed);
    const total = sentences.length;
    const duration = videoDuration ?? total * 5; // fallback: 5s per sentence

    for (let i = 0; i < total; i++) {
      const startSeconds = Math.round((i / total) * duration);
      const endSeconds = Math.round(((i + 1) / total) * duration);
      lines.push({
        id: `line-${i}`,
        startSeconds,
        endSeconds,
        sentence: sentences[i],
      });
    }
  }

  return lines;
}

// ─── localStorage persistence ─────────────────────────────────────────────────

const LS_KEY = "videoLearningSessions";

export function loadSessions(): VideoSession[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as VideoSession[];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: VideoSession[]): void {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(sessions));
  } catch {
    // quota exceeded — silently ignore
  }
}

export function upsertSession(session: VideoSession): VideoSession[] {
  const sessions = loadSessions();
  const idx = sessions.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    sessions[idx] = session;
  } else {
    sessions.unshift(session); // newest first
  }
  saveSessions(sessions);
  return sessions;
}

export function deleteSession(id: string): VideoSession[] {
  const sessions = loadSessions().filter((s) => s.id !== id);
  saveSessions(sessions);
  return sessions;
}

export function generateId(): string {
  return `vs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
