/**
 * Video Router — tRPC procedures for Video Learning module.
 *
 * Endpoints:
 *  video.fetchTranscript  — fetch timestamped transcript from YouTube via yt-dlp
 *  video.translateLines   — translate an array of Chinese sentences to English via LLM
 *
 * Transcript fetch strategy (yt-dlp + cookie authentication):
 *  yt-dlp is used as the sole method for fetching captions. It authenticates
 *  requests using a Netscape-format cookies file, which allows the server to
 *  act as a signed-in YouTube user — bypassing bot-detection and rate-limiting.
 *
 *  Cookie file resolution order (first found wins):
 *    1. Path set in YOUTUBE_COOKIES_PATH environment variable
 *    2. server/config/youtube_cookies.txt (relative to project root)
 *    3. No cookies (unauthenticated — may fail on rate-limited IPs)
 *
 *  Attempt order per fetch:
 *    1. Manual (human-uploaded) subtitles for preferred languages
 *    2. Auto-generated subtitles for preferred languages
 *    3. Manual subtitles for any available language
 *    4. Auto-generated subtitles for any available language
 *
 *  All attempts use the json3 subtitle format, which is parsed into the same
 *  RawSegment shape the frontend expects for word-clicking and flashcard features.
 *
 *  Error handling:
 *    - 429 Too Many Requests  → user-friendly rate-limit message
 *    - Sign-in required       → user-friendly bot-detection message
 *    - No captions found      → clear message to use the manual paste tab
 *    - yt-dlp not installed   → actionable installation message
 *
 *  Cookie refresh:
 *    Cookies expire over time. To refresh them, run:
 *      yt-dlp --cookies-from-browser "chromium:/home/ubuntu/.browser_data_dir" \
 *        --cookies server/config/youtube_cookies.txt \
 *        --skip-download https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *    Or set YOUTUBE_COOKIES_PATH to point to a cookies file exported from your
 *    browser using the "Get cookies.txt LOCALLY" extension.
 */

import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "../_core/llm";
import { execFile } from "child_process";
import { promisify } from "util";
import { readFile, unlink, mkdtemp, readdir, rm, access } from "fs/promises";
import { tmpdir } from "os";
import { join, resolve, dirname } from "path";
import { fileURLToPath } from "url";

const execFileAsync = promisify(execFile);

// ─── Constants ────────────────────────────────────────────────────────────────

const YT_DLP_PATH = "/usr/local/bin/yt-dlp";
const YT_DLP_TIMEOUT_MS = 60_000; // 60 seconds per attempt

// Resolve the project root (two levels up from server/routers/)
const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "../../");
const DEFAULT_COOKIES_PATH = join(PROJECT_ROOT, "server/config/youtube_cookies.txt");

// ─── Types ────────────────────────────────────────────────────────────────────

interface RawSegment {
  start: number;
  duration: number;
  text: string;
}

interface TranscriptResult {
  videoId: string;
  language: string;
  segments: RawSegment[];
  availableLanguages: string[];
}

// ─── Cookie file resolver ─────────────────────────────────────────────────────

/**
 * Resolve the path to the YouTube cookies file.
 * Returns the path if the file exists and is readable, otherwise null.
 */
async function resolveCookiesPath(): Promise<string | null> {
  const candidates = [
    process.env.YOUTUBE_COOKIES_PATH,
    DEFAULT_COOKIES_PATH,
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {
      // File not found or not readable — try next candidate
    }
  }
  return null;
}

// ─── json3 subtitle format parser ────────────────────────────────────────────
// yt-dlp's json3 format uses an "events" array where each event has:
//   tStartMs      — start time in milliseconds
//   dDurationMs   — duration in milliseconds
//   segs          — array of text segments, each with a "utf8" field

interface Json3Event {
  tStartMs?: number;
  dDurationMs?: number;
  segs?: Array<{ utf8?: string }>;
}

function parseJson3(json3: string): RawSegment[] {
  let data: { events?: Json3Event[] };
  try {
    data = JSON.parse(json3);
  } catch {
    throw new Error("Failed to parse json3 subtitle data — invalid JSON");
  }

  const segments: RawSegment[] = [];
  const events = data.events ?? [];

  for (const event of events) {
    if (!event.segs || event.tStartMs == null) continue;

    const text = event.segs
      .map((s) => s.utf8 ?? "")
      .join("")
      .replace(/\n/g, " ")
      .trim();

    // Skip empty segments and whitespace-only entries
    if (!text || text === " ") continue;

    segments.push({
      start: event.tStartMs / 1000,
      duration: (event.dDurationMs ?? 0) / 1000,
      text,
    });
  }

  return segments;
}

// ─── yt-dlp error classifier ─────────────────────────────────────────────────

function classifyYtDlpError(stderr: string): TRPCError {
  const msg = stderr.toLowerCase();

  if (msg.includes("429") || msg.includes("too many requests")) {
    return new TRPCError({
      code: "TOO_MANY_REQUESTS",
      message:
        "YouTube is rate-limiting caption requests from this server (HTTP 429). " +
        "Please wait a few minutes and try again, or paste the transcript manually using the 'Paste Manually' tab.",
    });
  }

  if (
    msg.includes("sign in") ||
    msg.includes("bot") ||
    msg.includes("confirm you") ||
    msg.includes("login_required")
  ) {
    return new TRPCError({
      code: "UNAUTHORIZED",
      message:
        "YouTube is requiring sign-in to access this video's captions. " +
        "The server's YouTube cookies may have expired. " +
        "Please refresh the cookies file (see server/config/youtube_cookies.txt) " +
        "or paste the transcript manually using the 'Paste Manually' tab.",
    });
  }

  if (msg.includes("video unavailable") || msg.includes("private video")) {
    return new TRPCError({
      code: "BAD_REQUEST",
      message: "This video is unavailable or private.",
    });
  }

  if (msg.includes("enoent") || msg.includes("no such file")) {
    return new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "yt-dlp is not installed on the server. Please install it at /usr/local/bin/yt-dlp.",
    });
  }

  return new TRPCError({
    code: "INTERNAL_SERVER_ERROR",
    message: `yt-dlp encountered an unexpected error: ${stderr.slice(0, 300)}`,
  });
}

// ─── Core yt-dlp invocation ──────────────────────────────────────────────────

/**
 * Run yt-dlp to download subtitles for a given video into a temp directory.
 * Returns the path to the downloaded json3 file and its language code,
 * or null if no subtitle file was written.
 */
async function runYtDlp(
  videoId: string,
  langStr: string,
  autoSubs: boolean,
  outputTemplate: string,
  tmpDir: string,
  cookiesPath: string | null
): Promise<{ filePath: string; lang: string } | null> {
  const subsFlag = autoSubs ? "--write-auto-subs" : "--write-subs";
  const noSubsFlag = autoSubs ? "--no-write-subs" : "--no-write-auto-subs";
  const label = autoSubs ? "auto" : "manual";

  const args = [
    "--js-runtimes", "node",
    "--skip-download",
    subsFlag,
    noSubsFlag,
    "--sub-lang", langStr,
    "--sub-format", "json3",
    "--output", outputTemplate,
    "--no-playlist",
    "--quiet",
    "--no-warnings",
  ];

  // Inject cookies if available — this is the key to bypassing bot-detection
  if (cookiesPath) {
    args.push("--cookies", cookiesPath);
  }

  args.push(`https://www.youtube.com/watch?v=${videoId}`);

  console.log(
    `[video.fetchTranscript] yt-dlp ${label} attempt — videoId=${videoId} langs=${langStr} cookies=${cookiesPath ? "yes" : "no"}`
  );

  let stderr = "";
  try {
    const result = await execFileAsync(YT_DLP_PATH, args, {
      timeout: YT_DLP_TIMEOUT_MS,
    });
    stderr = result.stderr ?? "";
  } catch (err) {
    const e = err as { stderr?: string; message?: string };
    stderr = e.stderr ?? e.message ?? String(err);
    console.warn(
      `[video.fetchTranscript] yt-dlp ${label} failed: ${stderr.slice(0, 300)}`
    );
    // Propagate fatal errors immediately
    if (
      stderr.toLowerCase().includes("429") ||
      stderr.toLowerCase().includes("too many requests") ||
      stderr.toLowerCase().includes("sign in") ||
      stderr.toLowerCase().includes("bot") ||
      stderr.toLowerCase().includes("video unavailable") ||
      stderr.toLowerCase().includes("enoent")
    ) {
      throw classifyYtDlpError(stderr);
    }
    // Non-fatal: no subs available for this attempt — fall through
    return null;
  }

  // Scan the temp directory for any written .json3 file
  try {
    const files = await readdir(tmpDir);
    const subFile = files.find((f) => f.endsWith(".json3"));
    if (!subFile) return null;

    const filePath = join(tmpDir, subFile);
    const content = await readFile(filePath, "utf-8");
    if (!content || content.length === 0) return null;

    // Extract language code from filename: sub.<lang>.json3
    const match = subFile.match(/\.([^.]+)\.json3$/);
    const lang = match?.[1] ?? "unknown";

    console.log(
      `[video.fetchTranscript] yt-dlp ${label} found subtitle file: ${subFile} (lang=${lang})`
    );
    return { filePath, lang };
  } catch {
    return null;
  }
}

// ─── Helper: clean temp dir between attempts ──────────────────────────────────

async function cleanTmpDir(tmpDir: string): Promise<void> {
  try {
    const files = await readdir(tmpDir);
    for (const f of files) await unlink(join(tmpDir, f)).catch(() => {});
  } catch { /* ignore */ }
}

// ─── Main transcript fetch function ──────────────────────────────────────────

async function fetchYouTubeTranscript(
  videoId: string,
  preferredLanguages: string[]
): Promise<TranscriptResult> {
  const cookiesPath = await resolveCookiesPath();

  console.log(
    `[video.fetchTranscript] Starting fetch — videoId=${videoId} langs=[${preferredLanguages.join(",")}] cookies=${cookiesPath ?? "none"}`
  );

  const tmpDir = await mkdtemp(join(tmpdir(), "yt-transcript-"));
  const outputTemplate = join(tmpDir, "sub");
  const langStr = preferredLanguages.join(",");

  try {
    // ── Attempt 1: manual subtitles for preferred languages ───────────────
    let result = await runYtDlp(videoId, langStr, false, outputTemplate, tmpDir, cookiesPath);

    // ── Attempt 2: auto-generated subtitles for preferred languages ───────
    if (!result) {
      await cleanTmpDir(tmpDir);
      result = await runYtDlp(videoId, langStr, true, outputTemplate, tmpDir, cookiesPath);
    }

    // ── Attempt 3: manual subtitles for any available language ────────────
    if (!result) {
      await cleanTmpDir(tmpDir);
      result = await runYtDlp(videoId, "all", false, outputTemplate, tmpDir, cookiesPath);
    }

    // ── Attempt 4: auto-generated subtitles for any available language ────
    if (!result) {
      await cleanTmpDir(tmpDir);
      result = await runYtDlp(videoId, "all", true, outputTemplate, tmpDir, cookiesPath);
    }

    // ── No captions found ─────────────────────────────────────────────────
    if (!result) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "No captions found for this video. The video may not have captions " +
          "in Chinese or English, or captions may be disabled. " +
          "You can paste a transcript manually using the 'Paste Manually' tab.",
      });
    }

    // ── Parse the json3 file ──────────────────────────────────────────────
    const json3Content = await readFile(result.filePath, "utf-8");
    await unlink(result.filePath).catch(() => {});

    const segments = parseJson3(json3Content);

    if (segments.length === 0) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message:
          "Captions were found but contained no readable text segments. " +
          "The captions may be in an unsupported format.",
      });
    }

    console.log(
      `[video.fetchTranscript] Success — lang=${result.lang} segments=${segments.length}`
    );

    return {
      videoId,
      language: result.lang,
      segments,
      availableLanguages: [result.lang],
    };
  } finally {
    // Always clean up the temp directory
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {});
  }
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const videoRouter = router({
  /**
   * Fetch a timestamped transcript from YouTube using yt-dlp with cookie auth.
   * Prefers Chinese (zh, zh-Hans, zh-TW, zh-CN), then falls back to English.
   * Returns segments in { start, duration, text } format compatible with the
   * frontend word-clicking and flashcard features.
   */
  fetchTranscript: publicProcedure
    .input(
      z.object({
        videoId: z.string().min(1).max(20),
        preferredLanguages: z
          .array(z.string())
          .optional()
          .default(["zh", "zh-Hans", "zh-TW", "zh-CN", "en"]),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await fetchYouTubeTranscript(
          input.videoId,
          input.preferredLanguages
        );
        return result;
      } catch (err) {
        if (err instanceof TRPCError) throw err;

        const message =
          err instanceof Error ? err.message : String(err);
        console.error(
          `[video.fetchTranscript] Unexpected error: ${message}`
        );
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to fetch transcript: ${message}`,
        });
      }
    }),

  /**
   * Translate an array of Chinese sentences to English using the LLM.
   * Batches up to 100 sentences per call.
   */
  translateLines: protectedProcedure
    .input(
      z.object({
        sentences: z.array(z.string()).min(1).max(100),
        sourceLanguage: z.string().optional().default("zh"),
        targetLanguage: z.string().optional().default("en"),
      })
    )
    .mutation(async ({ input }) => {
      const { sentences, sourceLanguage, targetLanguage } = input;

      const numbered = sentences
        .map((s, i) => `${i + 1}. ${s}`)
        .join("\n");

      const langName = sourceLanguage === "zh" ? "Chinese" : sourceLanguage;
      const targetName = targetLanguage === "en" ? "English" : targetLanguage;

      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are a professional ${langName}-to-${targetName} translator. 
Translate each numbered sentence accurately and naturally. 
Return ONLY a JSON array of translated strings in the same order, with no extra text.
Example output: ["translation 1", "translation 2", "translation 3"]`,
          },
          {
            role: "user",
            content: `Translate these ${langName} sentences to ${targetName}:\n\n${numbered}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "translations",
            strict: true,
            schema: {
              type: "object",
              properties: {
                translations: {
                  type: "array",
                  items: { type: "string" },
                },
              },
              required: ["translations"],
              additionalProperties: false,
            },
          },
        },
      });

      const content = (response as { choices?: Array<{ message?: { content?: string } }> })?.choices?.[0]?.message?.content;
      if (!content) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "LLM returned empty response",
        });
      }

      try {
        const parsed = JSON.parse(content) as { translations: string[] };
        return { translations: parsed.translations };
      } catch {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to parse translation response",
        });
      }
    }),
});
