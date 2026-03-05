/**
 * youtubeTranscript.ts — Client-side YouTube transcript fetcher.
 *
 * Fetches transcripts directly from the browser using the YouTube InnerTube API.
 * Running from the browser bypasses YouTube's server-IP bot detection.
 *
 * Strategy:
 *  1. Call the InnerTube /player endpoint with the WEB client context to get caption track URLs.
 *  2. Fetch the XML caption track for each preferred language.
 *  3. Parse the XML into timestamped segments.
 *
 * Diagnostics: every fetch URL is logged to the browser console before the call is made.
 * No API key required. Works for any public video with captions.
 */

export interface TranscriptSegment {
  start: number;    // seconds
  duration: number; // seconds
  text: string;
}

export interface TranscriptFetchResult {
  language: string;
  segments: TranscriptSegment[];
  availableLanguages: string[];
}

interface CaptionTrack {
  baseUrl: string;
  languageCode: string;
  name?: { simpleText?: string };
  kind?: string; // "asr" = auto-generated
}

// ─── Diagnostic logger ────────────────────────────────────────────────────────

function diagLog(step: string, detail?: string) {
  console.log(`[YouTubeTranscript] ${step}${detail ? " — " + detail : ""}`);
}

function diagError(step: string, err: unknown) {
  const msg = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
  console.error(`[YouTubeTranscript] ✗ ${step} — ${msg}`);
}

// ─── InnerTube player request ─────────────────────────────────────────────────

async function fetchPlayerData(videoId: string): Promise<{
  captionTracks: CaptionTrack[];
  status: string;
  reason?: string;
}> {
  const url = "https://www.youtube.com/youtubei/v1/player?prettyPrint=false";
  const body = {
    context: {
      client: {
        clientName: "WEB",
        clientVersion: "2.20240101.00.00",
        hl: "en",
        timeZone: "UTC",
        utcOffsetMinutes: 0,
      },
    },
    videoId,
  };

  diagLog("fetchPlayerData", `POST ${url} for videoId=${videoId}`);

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (err) {
    diagError("fetchPlayerData network error", err);
    throw new Error(
      `Network error reaching YouTube InnerTube API: ${err instanceof Error ? err.message : String(err)}. ` +
      `Check your internet connection.`
    );
  }

  diagLog("fetchPlayerData response", `status=${res.status} content-type=${res.headers.get("content-type") ?? "none"}`);

  if (!res.ok) {
    const body = await res.text().catch(() => "(unreadable body)");
    diagError("fetchPlayerData non-OK", `status=${res.status} body=${body.slice(0, 200)}`);
    throw new Error(`YouTube InnerTube API returned HTTP ${res.status}. Response: ${body.slice(0, 200)}`);
  }

  let data: {
    playabilityStatus?: { status?: string; reason?: string };
    captions?: {
      playerCaptionsTracklistRenderer?: {
        captionTracks?: CaptionTrack[];
      };
    };
  };

  try {
    data = await res.json();
  } catch (err) {
    diagError("fetchPlayerData JSON parse", err);
    throw new Error(`YouTube returned non-JSON response (unexpected format). ${err instanceof Error ? err.message : ""}`);
  }

  const status = data.playabilityStatus?.status ?? "UNKNOWN";
  const reason = data.playabilityStatus?.reason;
  const captionTracks = data.captions?.playerCaptionsTracklistRenderer?.captionTracks ?? [];

  diagLog("fetchPlayerData parsed", `status=${status} captionTracks=${captionTracks.length} langs=[${captionTracks.map(t => t.languageCode).join(",")}]`);

  return { captionTracks, status, reason };
}

// ─── XML caption track parser ─────────────────────────────────────────────────

function parseXmlCaptions(xml: string): TranscriptSegment[] {
  // Match <text start="..." dur="...">...</text> elements
  const re = /<text\s+start="([^"]+)"\s+dur="([^"]+)"[^>]*>([\s\S]*?)<\/text>/g;
  const segments: TranscriptSegment[] = [];
  let match: RegExpExecArray | null;

  while ((match = re.exec(xml)) !== null) {
    const start = parseFloat(match[1]);
    const duration = parseFloat(match[2]);
    // Decode HTML entities (&amp; &lt; &gt; &quot; &#39; etc.)
    const raw = match[3]
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(parseInt(code, 10)))
      .replace(/<[^>]+>/g, "") // strip any nested XML tags
      .replace(/\n/g, " ")
      .trim();

    if (raw.length > 0) {
      segments.push({ start, duration, text: raw });
    }
  }

  return segments;
}

// ─── Fetch a single caption track ────────────────────────────────────────────

async function fetchCaptionXml(track: CaptionTrack, lang: string): Promise<TranscriptSegment[]> {
  const url = `${track.baseUrl}&fmt=srv3&lang=${lang}`;
  diagLog("fetchCaptionXml", `GET ${url.slice(0, 120)}... lang=${lang}`);

  let res: Response;
  try {
    res = await fetch(url);
  } catch (err) {
    diagError("fetchCaptionXml network error", err);
    throw new Error(`Network error fetching caption track: ${err instanceof Error ? err.message : String(err)}`);
  }

  diagLog("fetchCaptionXml response", `status=${res.status} content-type=${res.headers.get("content-type") ?? "none"}`);

  if (!res.ok) {
    throw new Error(`Caption track fetch returned HTTP ${res.status} for lang=${lang}`);
  }

  const xml = await res.text();
  diagLog("fetchCaptionXml body", `${xml.length} chars received`);

  const segments = parseXmlCaptions(xml);
  diagLog("fetchCaptionXml parsed", `${segments.length} segments for lang=${lang}`);

  return segments;
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Fetch the transcript for a YouTube video from the browser.
 * Tries each preferred language in order, then falls back to the first available track.
 *
 * All fetch URLs are logged to the browser console before each call.
 * Errors include the exact HTTP status, response body snippet, and step name.
 *
 * @throws Error with a user-friendly message if no transcript is available.
 */
export async function fetchYouTubeTranscriptClient(
  videoId: string,
  preferredLanguages: string[] = ["zh", "zh-Hans", "zh-TW", "zh-CN", "en"]
): Promise<TranscriptFetchResult> {
  diagLog("start", `videoId=${videoId} preferredLanguages=[${preferredLanguages.join(",")}]`);

  const { captionTracks, status, reason } = await fetchPlayerData(videoId);

  if (captionTracks.length === 0) {
    if (status === "LOGIN_REQUIRED") {
      const msg = `YouTube requires sign-in to access this video (status=LOGIN_REQUIRED${reason ? ": " + reason : ""}). Make sure you are signed in to YouTube in this browser.`;
      diagError("no captions", msg);
      throw new Error(msg);
    }
    if (status === "UNPLAYABLE" || status === "ERROR") {
      const msg = `This video is unavailable or private (status=${status}${reason ? ": " + reason : ""}).`;
      diagError("no captions", msg);
      throw new Error(msg);
    }
    const msg = `This video does not have captions (status=${status}). Only videos with auto-generated or manual captions can be used.`;
    diagError("no captions", msg);
    throw new Error(msg);
  }

  const availableLanguages = captionTracks.map((t) => t.languageCode);
  diagLog("caption tracks found", `available=[${availableLanguages.join(",")}]`);

  // Try preferred languages first
  for (const lang of preferredLanguages) {
    const track = captionTracks.find((t) => t.languageCode === lang);
    if (!track) {
      diagLog("skip lang", `${lang} not in available tracks`);
      continue;
    }

    try {
      const segments = await fetchCaptionXml(track, lang);
      if (segments.length > 0) {
        diagLog("success", `lang=${lang} segments=${segments.length}`);
        return { language: lang, segments, availableLanguages };
      }
      diagLog("empty segments", `lang=${lang} — trying next`);
    } catch (err) {
      diagError(`fetchCaptionXml lang=${lang}`, err);
      // Try next language
      continue;
    }
  }

  // Fallback: try any available track (prefer non-ASR / manual first)
  diagLog("fallback", "trying all available tracks");
  const sortedTracks = [...captionTracks].sort((a, b) => {
    // Prefer manual captions over auto-generated
    const aAsr = a.kind === "asr" ? 1 : 0;
    const bAsr = b.kind === "asr" ? 1 : 0;
    return aAsr - bAsr;
  });

  for (const track of sortedTracks) {
    try {
      const segments = await fetchCaptionXml(track, track.languageCode);
      if (segments.length > 0) {
        diagLog("fallback success", `lang=${track.languageCode} segments=${segments.length}`);
        return { language: track.languageCode, segments, availableLanguages };
      }
    } catch (err) {
      diagError(`fallback lang=${track.languageCode}`, err);
      continue;
    }
  }

  const msg = `Could not fetch a transcript for this video. Available tracks: [${availableLanguages.join(",")}]. The captions may be in an unsupported format or temporarily unavailable.`;
  diagError("all attempts failed", msg);
  throw new Error(msg);
}
