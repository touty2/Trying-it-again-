/**
 * IndexedDB Persistence Layer
 * Design: Structured Scholar — all user data persists locally
 *
 * Data Models:
 *  - Text: graded reading passages
 *  - Word: vocabulary entries (from texts or manual)
 *  - Flashcard: FSRS spaced repetition state (recognition + production cards)
 *  - Settings: user preferences
 *  - ReviewLog: daily review history for streak tracking
 *
 * FSRS Card IDs:
 *  - Recognition card: "{wordId}-a"  (Chinese → English)
 *  - Production card:  "{wordId}-b"  (English → Chinese)
 */
import { toISODate as _toISODate, fromISODate as _fromISODate, type SM2Quality, LEECH_THRESHOLD } from "../../../shared/sm2";
import { FSRS, State, Rating, type Card as FSRSLibCard } from "fsrs-algorithm";

/** FSRS scheduler factory — creates a scheduler with the given desired retention rate */
function makeFSRS(desiredRetention = 0.85) {
  return new FSRS({ requestRetention: desiredRetention });
}

/** Cached FSRS scheduler. Re-created when desiredRetention changes. */
let _fsrsScheduler = makeFSRS(0.85);
let _lastRetention = 0.85;

/** Get (or rebuild) the FSRS scheduler for the given retention target */
function getScheduler(desiredRetention = 0.85): FSRS {
  if (desiredRetention !== _lastRetention) {
    _fsrsScheduler = makeFSRS(desiredRetention);
    _lastRetention = desiredRetention;
  }
  return _fsrsScheduler;
}

/**
 * Progressive interval cap — prevents cards from disappearing too quickly
 * before they're truly known. FSRS computes the theoretically optimal interval,
 * but we clamp it based on how many successful reviews the card has accumulated.
 *
 * The philosophy: a vague "yes I recognise it" doesn't earn a 10-day break.
 * Cards should pile up and be seen frequently until proven solid.
 *
 *   reps 0-1  (new / seen once)    → max 1 day
 *   reps 2    (seen twice)         → max 3 days
 *   reps 3    (seen three times)   → max 7 days
 *   reps 4-5  (getting solid)      → max 14 days
 *   reps 6+   (well established)   → max 30 days
 *
 * Again (rating 1) always requeues in-session — not affected here.
 */
function capInterval(scheduledDays: number, repsAfterReview: number): number {
  if (repsAfterReview <= 1) return Math.min(scheduledDays, 1);
  if (repsAfterReview === 2) return Math.min(scheduledDays, 3);
  if (repsAfterReview === 3) return Math.min(scheduledDays, 7);
  if (repsAfterReview <= 5)  return Math.min(scheduledDays, 14);
  return Math.min(scheduledDays, 30);
}

/** Convert a Unix timestamp (ms) to an ISO date string (YYYY-MM-DD) */
export function toISODate(ts: number): string { return _toISODate(ts); }
/** Convert an ISO date string (YYYY-MM-DD) to start-of-day UTC timestamp (ms) */
export function fromISODate(iso: string): number { return _fromISODate(iso); }

// ─── Types ────────────────────────────────────────────────────────────────────

export type HskBand = "HSK3-I" | "HSK3-II" | "HSK4-I" | "HSK4-II" | "HSK5-I" | "HSK5-II";

export interface Text {
  id: string;
  title: string;          // Chinese title
  englishTitle?: string;  // English title
  band: HskBand;
  chineseText: string;
  englishTranslation: string;
  recommendedVocabulary: string[]; // array of word IDs
  createdAt: number;
}

export interface ExamplePair {
  chinese: string;
  english: string;
}

export interface Word {
  id: string;
  hanzi: string;
  pinyin: string;
  simpleDefinition: string;
  contextualMeaning?: string;       // meaning specific to the source sentence
  shortContextExplanation?: string; // brief learner-friendly explanation
  otherMeanings?: string[];         // other common meanings from CC-CEDICT
  exampleSentences: string[];       // legacy: Chinese-only sentences
  examplePairs?: ExamplePair[];     // preferred: Chinese + English pairs (up to 3)
  sourceTextId: string | null;
  addedManually: boolean;
  createdAt: number;
}

/** Card type: recognition = CN→EN, production = EN→CN */
export type CardType = "recognition" | "production";

export interface Flashcard {
  /** Primary key: "{wordId}-a" for recognition, "{wordId}-b" for production */
  cardId: string;
  /** The vocabulary word this card belongs to */
  wordId: string;
  /** Card direction */
  cardType: CardType;
  // ── FSRS fields ───────────────────────────────────────────────────────────
  stability: number;       // FSRS stability (days until 90% retention)
  difficulty: number;      // FSRS difficulty (0–10)
  dueDate: number;         // Unix timestamp (ms) when card is due — source of truth
  elapsedDays: number;     // days since last review
  scheduledDays: number;   // days scheduled at last review
  reps: number;            // total successful reviews
  lapses: number;          // total lapses (Again responses)
  isLeech: boolean;         // true when lapses >= LEECH_THRESHOLD (5)
  state: number;           // FSRS State enum: 0=New,1=Learning,2=Review,3=Relearning
  lastReviewed: number | null; // Unix timestamp of last review
  createdAt: number;
  // ── Legacy compat aliases (kept for sync/display) ─────────────────────────
  /** @deprecated use reps */
  repetition: number;
  /** @deprecated use stability */
  interval: number;
  /** @deprecated use difficulty */
  easeFactor: number;
  nextReviewDate: string;  // ISO date string (YYYY-MM-DD)
}

export type TestingMode = "forward" | "reverse" | "random";
export type FlashcardSource = "texts" | "vocab" | "both" | "user";

/** VocabIgnored — tracks which themed vocab words the user has chosen to ignore */
export interface VocabIgnored {
  id: string;       // vocab word ID (e.g. "food-ingredients-0")
  ignoredAt: number;
}

export interface Settings {
  id: "settings"; // singleton
  dailyNewWordCap: number | null; // null = unlimited
  dailyReviewCap: number | null;  // null = unlimited
  showCapReachedPopup: boolean;
  testingMode: TestingMode;       // flashcard direction mode
  flashcardSource: FlashcardSource; // which pool to draw from
  /** Flashcard card size: 1=Small, 2=Medium (default), 3=Large */
  cardSize: 1 | 2 | 3;
  /** When true, each word gets both a recognition (CN→EN) and production (EN→CN) card */
  enableReversibleCards: boolean;
  /**
   * Desired retention rate (0.70 – 0.99). Controls how aggressively FSRS grows intervals.
   * Higher = more reviews (e.g. 0.90 = review before you forget 10% of the time).
   * Default: 0.85
   */
  desiredRetention: number;
}

export interface ReviewLog {
  date: string; // "YYYY-MM-DD"
  reviewCount: number;
  newWordsAdded: number;
}

/**
 * WordMistake — tracks how many times a word was answered incorrectly.
 * Used to compute Suggested Re-read texts.
 */
export interface WordMistake {
  wordId: string;       // primary key
  sourceTextId: string | null;
  missCount: number;    // total "don't know" responses
  lastMissed: number;   // timestamp
}

/**
 * CompletedWord — marks a flashcard word as fully learned.
 * Completed words are excluded from the default review queue.
 *
 * completedForward: user has confirmed the word in ZH→EN direction at least once
 * completedReverse: user has confirmed the word in EN→ZH direction at least once
 * A word is "fully mastered" only when both flags are true.
 */
export interface CompletedWord {
  wordId: string;           // primary key
  completedAt: number;
  completedForward: boolean;  // confirmed in ZH→EN
  completedReverse: boolean;  // confirmed in EN→ZH
}

/**
 * StoryDeck — tracks which words belong to a specific story's deck.
 * The main deck is simply "all words" — no separate table needed.
 */
export interface StoryDeckEntry {
  /** Composite key: "{storyId}:{wordId}" */
  id: string;
  storyId: string;
  wordId: string;
  addedAt: number;
}

/**
 * CompletedText — marks a story as fully completed.
 */
export interface CompletedText {
  textId: string;       // primary key
  completedAt: number;
}

/**
 * SegmentationOverride — a user-defined correction to how a span of text is split.
 * key: "global:WORD" (e.g. "global:马上起")
 * splits: the corrected word list (e.g. ["马上", "起"])
 */
export interface SegmentationOverride {
  key: string;      // primary key, e.g. "global:马上起"
  splits: string[]; // corrected segmentation
  createdAt: number;
  updatedAt: number;
}

// ─── SRS Algorithm ───────────────────────────────────────────────────────────

/**
 * Two-button rating system:
 *   0 = Don't Know — resets repetition, schedules 1 day, requeues in session
 *   2 = Know       — increments repetition, grows interval (1→4→10→exponential)
 *
 * sessionMissed: pass true if the card was answered "Don't Know" at least once
 * earlier in the current session. When true and quality=2, the card is
 * scheduled for 1 day instead of the normal interval.
 */
/**
 * FSRS rating values — matches fsrs-algorithm library Rating enum.
 *  1 = Again  (complete blackout — requeue immediately)
 *  2 = Hard   (difficult, remembered with effort)
 *  3 = Good   (correct with some hesitation — the normal "Know")
 *  4 = Easy   (perfect, effortless recall)
 *
 * The two main UI buttons map to Again (1) and Good (3).
 * Hard (2) and Easy (4) are available via the extended picker.
 */
export type FSRSRating = 1 | 2 | 3 | 4;
export { SM2Quality };

/** Helper: map our Flashcard to the shape fsrs-algorithm expects */
function toLibCard(card: Flashcard): FSRSLibCard {
  return {
    due: new Date(card.dueDate),
    stability: card.stability ?? 0,
    difficulty: card.difficulty ?? 5,
    elapsedDays: card.elapsedDays ?? 0,
    scheduledDays: card.scheduledDays ?? 0,
    reps: card.reps ?? card.repetition ?? 0,
    lapses: card.lapses ?? 0,
    state: (card.state ?? State.New) as State,
    lastReview: card.lastReviewed ? new Date(card.lastReviewed) : undefined,
  } as FSRSLibCard;
}

/**
 * Apply the real FSRS algorithm to a flashcard and return updated fields.
 *
 * @param card             - Current flashcard state
 * @param rating           - 1=Again, 2=Hard, 3=Good, 4=Easy
 * @param desiredRetention - Target retention rate (0.70–0.99). Default 0.85.
 */
export function applyFSRS(card: Flashcard, rating: FSRSRating, desiredRetention = 0.85): Partial<Flashcard> {
  const libCard = toLibCard(card);
  const now = new Date();
  const result = getScheduler(desiredRetention).schedule(libCard, now);

  // Pick the scheduled card for this rating
  let scheduled: FSRSLibCard;
  if      (rating === Rating.Again) scheduled = result.again.card as FSRSLibCard;
  else if (rating === Rating.Hard)  scheduled = result.hard.card  as FSRSLibCard;
  else if (rating === Rating.Good)  scheduled = result.good.card  as FSRSLibCard;
  else                              scheduled = result.easy.card  as FSRSLibCard;

  const newLapses = rating === Rating.Again ? (card.lapses ?? 0) + 1 : (card.lapses ?? 0);

  // Apply progressive interval cap — keeps cards coming back until truly known
  const rawDays = scheduled.scheduledDays;
  const cappedDays = rating === Rating.Again
    ? rawDays  // Again is always short-term, leave as-is
    : capInterval(rawDays, scheduled.reps);

  // Recompute due date using the capped interval
  const newDueDate = cappedDays === rawDays
    ? scheduled.due.getTime()
    : now.getTime() + cappedDays * 24 * 60 * 60 * 1000;

  return {
    // Real FSRS fields (keep stability/difficulty from FSRS — don't distort the model)
    stability:    scheduled.stability,
    difficulty:   scheduled.difficulty,
    scheduledDays: cappedDays,
    elapsedDays:  scheduled.elapsedDays,
    reps:         scheduled.reps,
    lapses:       newLapses,
    isLeech:      newLapses >= LEECH_THRESHOLD,
    state:        scheduled.state as number,
    // Due date uses capped interval
    dueDate:      newDueDate,
    nextReviewDate: toISODate(newDueDate),
    lastReviewed: now.getTime(),
    // Keep legacy aliases in sync
    interval:     cappedDays,
    repetition:   scheduled.reps,
    easeFactor:   scheduled.difficulty,
  };
}

/**
 * Apply an Again (rating=1) response without changing the due date.
 * Used when the card is requeued in the session and we only want to
 * record the lapse immediately — the full reschedule happens on eventual Good.
 */
export function applyDontKnow(card: Flashcard): Partial<Flashcard> {
  const newLapses = (card.lapses ?? 0) + 1;
  return {
    lapses: newLapses,
    isLeech: newLapses >= LEECH_THRESHOLD,
    // Slightly reduce difficulty to signal the card is harder
    difficulty: Math.min(10, (card.difficulty ?? 5) + 0.2),
    easeFactor: Math.max(1.3, (card.easeFactor ?? 2.5) - 0.2),
  };
}

/** @deprecated Use applyFSRS. Kept for backwards-compat in server tests. */
export function applySM2(card: Flashcard, quality: SM2Quality): Partial<Flashcard> {
  return applyFSRS(card, quality === 0 ? Rating.Again : Rating.Good);
}

/**
 * Create a brand-new FSRS Flashcard for a given word.
 * cardType: "recognition" = CN→EN, "production" = EN→CN
 */
export function createFSRSCard(wordId: string, cardType: CardType): Flashcard {
  const now = Date.now();
  const cardId = cardType === "recognition" ? `${wordId}-a` : `${wordId}-b`;
  return {
    cardId,
    wordId,
    cardType,
    stability: 2.5,
    difficulty: 5.0,
    dueDate: now,
    elapsedDays: 0,
    scheduledDays: 1,
    reps: 0,
    lapses: 0,
    isLeech: false,
    state: State.New,
    lastReviewed: null,
    createdAt: now,
    // SM2 aliases
    repetition: 0,
    interval: 1,
    easeFactor: 2.5,
    nextReviewDate: toISODate(now),
  };
}

/**
 * Categorise a set of flashcards into due-today, overdue, and new buckets.
 *
 * - overdue:  dueDate < start of today (missed reviews from previous days)
 * - dueToday: dueDate is today (scheduled for today) OR never reviewed (new cards are always due)
 * - newCards: never reviewed (lastReviewed === null) — subset of dueToday
 *
 * Completed words (passed as a Set) are excluded from all counts.
 */
export function getDueStats(
  cards: Pick<Flashcard, "wordId" | "dueDate" | "lastReviewed">[],
  _completedWordIds: Set<string>  // kept for API compat but no longer used to suppress
): { dueToday: number; overdue: number; newCards: number } {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  const tomorrowStartMs = todayStartMs + 24 * 60 * 60 * 1000;

  let dueToday = 0;
  let overdue = 0;
  let newCards = 0;

  for (const card of cards) {
    // completedWordIds no longer suppresses cards from the queue — "learned" is visual only
    if (card.lastReviewed === null) {
      // New cards are always immediately due — count in both buckets
      newCards++;
      dueToday++;
    } else if (card.dueDate < todayStartMs) {
      overdue++;
    } else if (card.dueDate < tomorrowStartMs) {
      dueToday++;
    }
  }

  return { dueToday, overdue, newCards };
}

// ─── IndexedDB Setup ──────────────────────────────────────────────────────────

const DB_NAME = "ChineseReaderDB";
const DB_VERSION = 12; // v12: always re-seed stories from contentData on load

let dbInstance: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Texts store
      if (!db.objectStoreNames.contains("texts")) {
        const textStore = db.createObjectStore("texts", { keyPath: "id" });
        textStore.createIndex("band", "band", { unique: false });
      }

      // Words store
      if (!db.objectStoreNames.contains("words")) {
        const wordStore = db.createObjectStore("words", { keyPath: "id" });
        wordStore.createIndex("hanzi", "hanzi", { unique: false });
        wordStore.createIndex("sourceTextId", "sourceTextId", { unique: false });
      }

      // DB_VERSION 8: migrate existing flashcards from SM-2 (wordId PK) to FSRS (cardId PK).
      // We must recreate the store since IDB doesn't allow changing keyPath in-place.
      if (event.oldVersion > 0 && event.oldVersion < 8 && db.objectStoreNames.contains("flashcards")) {
        // Read all old cards first, then recreate store
        const migrTx = (event.target as IDBOpenDBRequest).transaction!;
        const oldStore = migrTx.objectStore("flashcards");
        const getAllReq = oldStore.getAll();
        getAllReq.onsuccess = () => {
          const oldCards = getAllReq.result as Array<Record<string, unknown>>;
          db.deleteObjectStore("flashcards");
          const newStore = db.createObjectStore("flashcards", { keyPath: "cardId" });
          newStore.createIndex("dueDate", "dueDate", { unique: false });
          newStore.createIndex("wordId", "wordId", { unique: false });
          for (const old of oldCards) {
            const wordId = old.wordId as string;
            const cardId = `${wordId}-a`;
            const migratedCard: Flashcard = {
              cardId,
              wordId,
              cardType: "recognition",
              stability: Number(old.easeFactor ?? 2.5),
              difficulty: 5.0,
              dueDate: Number(old.dueDate ?? Date.now()),
              elapsedDays: 0,
              scheduledDays: Number(old.interval ?? 1),
              reps: Number(old.repetition ?? 0),
              lapses: 0,
              isLeech: false,
              state: Number(old.repetition ?? 0) === 0 ? State.New : State.Review,
              lastReviewed: (old.lastReviewed as number | null) ?? null,
              createdAt: Number(old.createdAt ?? Date.now()),
              repetition: Number(old.repetition ?? 0),
              interval: Number(old.interval ?? 1),
              easeFactor: Number(old.easeFactor ?? 2.5),
              nextReviewDate: (old.nextReviewDate as string) ?? new Date(Number(old.dueDate ?? Date.now())).toISOString().slice(0, 10),
            };
            newStore.put(migratedCard);
          }
        };
      } else if (!db.objectStoreNames.contains("flashcards")) {
        // Fresh install: create with new schema
        const cardStore = db.createObjectStore("flashcards", { keyPath: "cardId" });
        cardStore.createIndex("dueDate", "dueDate", { unique: false });
        cardStore.createIndex("wordId", "wordId", { unique: false });
      }

      // Settings store (singleton)
      if (!db.objectStoreNames.contains("settings")) {
        db.createObjectStore("settings", { keyPath: "id" });
      }

      // Review logs store
      if (!db.objectStoreNames.contains("reviewLogs")) {
        db.createObjectStore("reviewLogs", { keyPath: "date" });
      }

      // Word mistakes store (for Suggested Re-read)
      if (!db.objectStoreNames.contains("wordMistakes")) {
        const mistakeStore = db.createObjectStore("wordMistakes", { keyPath: "wordId" });
        mistakeStore.createIndex("sourceTextId", "sourceTextId", { unique: false });
      }

      // Completed words store
      if (!db.objectStoreNames.contains("completedWords")) {
        db.createObjectStore("completedWords", { keyPath: "wordId" });
      }

      // DB_VERSION 4: migrate existing completedWords to add direction flags
      if (event.oldVersion < 4 && event.oldVersion > 0 && db.objectStoreNames.contains("completedWords")) {
        const migrTx = (event.target as IDBOpenDBRequest).transaction!;
        const cwStore = migrTx.objectStore("completedWords");
        const cursorReq = cwStore.openCursor();
        cursorReq.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
          if (!cursor) return;
          const rec = cursor.value as CompletedWord;
          if (rec.completedForward === undefined) {
            cursor.update({ ...rec, completedForward: true, completedReverse: false });
          }
          cursor.continue();
        };
      }

      // Completed texts store
      if (!db.objectStoreNames.contains("completedTexts")) {
        db.createObjectStore("completedTexts", { keyPath: "textId" });
      }
      // DB_VERSION 5: vocab ignored store
      if (!db.objectStoreNames.contains("vocabIgnored")) {
        db.createObjectStore("vocabIgnored", { keyPath: "id" });
      }
      // DB_VERSION 7: segmentation overrides store
      if (!db.objectStoreNames.contains("segmentationOverrides")) {
        db.createObjectStore("segmentationOverrides", { keyPath: "key" });
      }
      // DB_VERSION 9: story deck memberships
      if (!db.objectStoreNames.contains("storyDecks")) {
        const sdStore = db.createObjectStore("storyDecks", { keyPath: "id" });
        sdStore.createIndex("storyId", "storyId", { unique: false });
        sdStore.createIndex("wordId", "wordId", { unique: false });
      }
      // DB_VERSION 10: custom user-created decks
      if (!db.objectStoreNames.contains("customDecks")) {
        db.createObjectStore("customDecks", { keyPath: "id" });
      }
      // DB_VERSION 10: deck-card junction (which words belong to which custom deck)
      if (!db.objectStoreNames.contains("deckCards")) {
        const dcStore = db.createObjectStore("deckCards", { keyPath: "id" });
        dcStore.createIndex("deckId", "deckId", { unique: false });
        dcStore.createIndex("wordId", "wordId", { unique: false });
      }
      // DB_VERSION 11: per-review history for retention analytics
      if (!db.objectStoreNames.contains("cardReviewHistory")) {
        const rhStore = db.createObjectStore("cardReviewHistory", { keyPath: "id", autoIncrement: true });
        rhStore.createIndex("cardId", "cardId", { unique: false });
        rhStore.createIndex("reviewedAt", "reviewedAt", { unique: false });
      }
    };

    request.onsuccess = (event) => {
      dbInstance = (event.target as IDBOpenDBRequest).result;
      resolve(dbInstance);
    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

function tx<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T>
): Promise<T> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = fn(store);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      })
  );
}

function txAll<T>(
  storeName: string,
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => IDBRequest<T[]>
): Promise<T[]> {
  return openDB().then(
    (db) =>
      new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, mode);
        const store = transaction.objectStore(storeName);
        const request = fn(store);
        request.onsuccess = () => resolve(request.result ?? []);
        request.onerror = () => reject(request.error);
      })
  );
}

// ─── Text CRUD ────────────────────────────────────────────────────────────────

export const TextDB = {
  getAll: (): Promise<Text[]> => txAll("texts", "readonly", (s) => s.getAll()),
  getById: (id: string): Promise<Text | undefined> => tx("texts", "readonly", (s) => s.get(id)),
  getByBand: (band: HskBand): Promise<Text[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("texts", "readonly");
          const store = transaction.objectStore("texts");
          const index = store.index("band");
          const request = index.getAll(band);
          request.onsuccess = () => resolve(request.result ?? []);
          request.onerror = () => reject(request.error);
        })
    ),
  put: (text: Text): Promise<IDBValidKey> => tx("texts", "readwrite", (s) => s.put(text)),
  delete: (id: string): Promise<undefined> => tx("texts", "readwrite", (s) => s.delete(id)),
};

// ─── Word CRUD ────────────────────────────────────────────────────────────────

export const WordDB = {
  getAll: (): Promise<Word[]> => txAll("words", "readonly", (s) => s.getAll()),
  getById: (id: string): Promise<Word | undefined> => tx("words", "readonly", (s) => s.get(id)),
  getByHanzi: (hanzi: string): Promise<Word[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("words", "readonly");
          const store = transaction.objectStore("words");
          const index = store.index("hanzi");
          const request = index.getAll(hanzi);
          request.onsuccess = () => resolve(request.result ?? []);
          request.onerror = () => reject(request.error);
        })
    ),
  put: (word: Word): Promise<IDBValidKey> => tx("words", "readwrite", (s) => s.put(word)),
  delete: (id: string): Promise<undefined> => tx("words", "readwrite", (s) => s.delete(id)),
};

// ─── Flashcard CRUD ───────────────────────────────────────────────────────────

export const FlashcardDB = {
  getAll: (): Promise<Flashcard[]> => txAll("flashcards", "readonly", (s) => s.getAll()),
  /** Get a card by its cardId (primary key) */
  getByCardId: (cardId: string): Promise<Flashcard | undefined> =>
    tx("flashcards", "readonly", (s) => s.get(cardId)),
  /** Get all cards for a given wordId (may return 1 or 2 cards) */
  getByWordId: (wordId: string): Promise<Flashcard[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("flashcards", "readonly");
          const store = transaction.objectStore("flashcards");
          const index = store.index("wordId");
          const request = index.getAll(wordId);
          request.onsuccess = () => resolve(request.result ?? []);
          request.onerror = () => reject(request.error);
        })
    ),
  getDue: (): Promise<Flashcard[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const now = Date.now();
          const transaction = db.transaction("flashcards", "readonly");
          const store = transaction.objectStore("flashcards");
          const index = store.index("dueDate");
          const range = IDBKeyRange.upperBound(now);
          const request = index.getAll(range);
          request.onsuccess = () => resolve(request.result ?? []);
          request.onerror = () => reject(request.error);
        })
    ),
  put: (card: Flashcard): Promise<IDBValidKey> => tx("flashcards", "readwrite", (s) => s.put(card)),
  /** Update a card by its cardId */
  update: (cardId: string, updates: Partial<Flashcard>): Promise<IDBValidKey> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("flashcards", "readwrite");
          const store = transaction.objectStore("flashcards");
          const getReq = store.get(cardId);
          getReq.onsuccess = () => {
            const existing = getReq.result as Flashcard | undefined;
            if (!existing) {
              reject(new Error(`Flashcard not found: ${cardId}`));
              return;
            }
            const updated = { ...existing, ...updates };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(putReq.result);
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        })
    ),
  /** Delete all cards for a wordId (both recognition and production) */
  deleteByWordId: (wordId: string): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("flashcards", "readwrite");
          const store = transaction.objectStore("flashcards");
          const index = store.index("wordId");
          const request = index.getAllKeys(wordId);
          request.onsuccess = () => {
            const keys = request.result;
            let pending = keys.length;
            if (pending === 0) { resolve(); return; }
            for (const key of keys) {
              const delReq = store.delete(key);
              delReq.onsuccess = () => { if (--pending === 0) resolve(); };
              delReq.onerror = () => reject(delReq.error);
            }
          };
          request.onerror = () => reject(request.error);
        })
    ),
  /** @deprecated Use deleteByWordId */
  delete: (wordId: string): Promise<void> => FlashcardDB.deleteByWordId(wordId),

  /**
   * Reset Due Dates (gentle) — sets every card's dueDate to now so all cards
   * appear as due today. All other SRS data (stability, difficulty, reps,
   * lapses, state) is preserved.
   */
  resetDueDates: (): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("flashcards", "readwrite");
          const store = transaction.objectStore("flashcards");
          const getAllReq = store.getAll();
          getAllReq.onsuccess = () => {
            const cards = getAllReq.result as Flashcard[];
            const now = Date.now();
            const today = toISODate(now);
            let pending = cards.length;
            if (pending === 0) { resolve(); return; }
            for (const card of cards) {
              const updated = { ...card, dueDate: now, nextReviewDate: today };
              const putReq = store.put(updated);
              putReq.onsuccess = () => { if (--pending === 0) resolve(); };
              putReq.onerror = () => reject(putReq.error);
            }
          };
          getAllReq.onerror = () => reject(getAllReq.error);
        })
    ),

  /**
   * Reset Deck (nuclear) — resets every card to its initial New state:
   * reps=0, lapses=0, stability=2.5, difficulty=5, scheduledDays=1,
   * elapsedDays=0, state=New, lastReviewed=null, dueDate=now.
   * Preserves cardId, wordId, cardType, and createdAt.
   */
  resetDeck: (): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("flashcards", "readwrite");
          const store = transaction.objectStore("flashcards");
          const getAllReq = store.getAll();
          getAllReq.onsuccess = () => {
            const cards = getAllReq.result as Flashcard[];
            const now = Date.now();
            const today = toISODate(now);
            let pending = cards.length;
            if (pending === 0) { resolve(); return; }
            for (const card of cards) {
              const fresh: Flashcard = {
                ...card,
                stability: 2.5,
                difficulty: 5.0,
                dueDate: now,
                elapsedDays: 0,
                scheduledDays: 1,
                reps: 0,
                lapses: 0,
                isLeech: false,
                state: 0, // State.New
                lastReviewed: null,
                nextReviewDate: today,
                // legacy aliases
                repetition: 0,
                interval: 1,
                easeFactor: 2.5,
              };
              const putReq = store.put(fresh);
              putReq.onsuccess = () => { if (--pending === 0) resolve(); };
              putReq.onerror = () => reject(putReq.error);
            }
          };
          getAllReq.onerror = () => reject(getAllReq.error);
        })
    ),
};

// ─── Settings CRUD ────────────────────────────────────────────────────────────

const DEFAULT_SETTINGS: Settings = {
  id: "settings",
  dailyNewWordCap: 20,
  dailyReviewCap: null,
  showCapReachedPopup: true,
  testingMode: "forward",
  flashcardSource: "both",
  cardSize: 2,
  enableReversibleCards: false,
  desiredRetention: 0.85,
};

export const SettingsDB = {
  get: (): Promise<Settings> =>
    tx<Settings | undefined>("settings", "readonly", (s) => s.get("settings")).then(
      (s) => s ? { ...DEFAULT_SETTINGS, ...s } : DEFAULT_SETTINGS
    ),
  put: (settings: Settings): Promise<IDBValidKey> =>
    tx("settings", "readwrite", (s) => s.put(settings)),
  reset: (): Promise<IDBValidKey> =>
    tx("settings", "readwrite", (s) => s.put(DEFAULT_SETTINGS)),
};

// ─── Review Log CRUD ──────────────────────────────────────────────────────────

/**
 * Returns today's date as a YYYY-MM-DD string in the user's LOCAL timezone.
 * Using local time ensures review logs match the user's calendar day, not UTC.
 * e.g. a user in UTC+8 reviewing at 11 PM local gets today's local date, not yesterday's UTC date.
 */
function todayStr(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Subtract one calendar day from a YYYY-MM-DD string, using local time arithmetic.
 * Avoids the UTC-parse bug: new Date("YYYY-MM-DD") parses as UTC midnight,
 * which in UTC+ timezones gives the previous local day.
 */
function prevDayStr(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m - 1, d); // local midnight — no UTC offset issue
  dt.setDate(dt.getDate() - 1);
  const ny = dt.getFullYear();
  const nm = String(dt.getMonth() + 1).padStart(2, '0');
  const nd = String(dt.getDate()).padStart(2, '0');
  return `${ny}-${nm}-${nd}`;
}

export const ReviewLogDB = {
  getAll: (): Promise<ReviewLog[]> => txAll("reviewLogs", "readonly", (s) => s.getAll()),
  getToday: (): Promise<ReviewLog> =>
    tx<ReviewLog | undefined>("reviewLogs", "readonly", (s) => s.get(todayStr())).then(
      (log) => log ?? { date: todayStr(), reviewCount: 0, newWordsAdded: 0 }
    ),
  incrementReview: (): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const date = todayStr();
          const transaction = db.transaction("reviewLogs", "readwrite");
          const store = transaction.objectStore("reviewLogs");
          const getReq = store.get(date);
          getReq.onsuccess = () => {
            const existing: ReviewLog = getReq.result ?? { date, reviewCount: 0, newWordsAdded: 0 };
            const putReq = store.put({ ...existing, reviewCount: existing.reviewCount + 1 });
            putReq.onsuccess = () => resolve();
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        })
    ),
  incrementNewWord: (): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const date = todayStr();
          const transaction = db.transaction("reviewLogs", "readwrite");
          const store = transaction.objectStore("reviewLogs");
          const getReq = store.get(date);
          getReq.onsuccess = () => {
            const existing: ReviewLog = getReq.result ?? { date, reviewCount: 0, newWordsAdded: 0 };
            const putReq = store.put({ ...existing, newWordsAdded: existing.newWordsAdded + 1 });
            putReq.onsuccess = () => resolve();
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        })
    ),
  getStreak: (): Promise<number> =>
    txAll<ReviewLog>("reviewLogs", "readonly", (s) => s.getAll()).then((logs) => {
      if (logs.length === 0) return 0;
      const sorted = logs
        .filter((l) => l.reviewCount > 0)
        .sort((a, b) => b.date.localeCompare(a.date));
      if (sorted.length === 0) return 0;

      const today = todayStr();
      let streak = 0;
      let current = today;

      for (const log of sorted) {
        if (log.date === current) {
          streak++;
          // go back one calendar day using local-time arithmetic
          current = prevDayStr(current);
        } else {
          break;
        }
      }
      return streak;
    }),
};


// ─── Word Mistake CRUD ────────────────────────────────────────────────────────

export const WordMistakeDB = {
  getAll: (): Promise<WordMistake[]> => txAll("wordMistakes", "readonly", (s) => s.getAll()),
  getById: (wordId: string): Promise<WordMistake | undefined> =>
    tx("wordMistakes", "readonly", (s) => s.get(wordId)),
  recordMiss: (wordId: string, sourceTextId: string | null): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("wordMistakes", "readwrite");
          const store = transaction.objectStore("wordMistakes");
          const getReq = store.get(wordId);
          getReq.onsuccess = () => {
            const existing: WordMistake | undefined = getReq.result;
            const updated: WordMistake = {
              wordId,
              sourceTextId,
              missCount: (existing?.missCount ?? 0) + 1,
              lastMissed: Date.now(),
            };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve();
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        })
    ),
  /** Reset mistakes for all words from a given text (after re-read) */
  resetForText: (textId: string): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("wordMistakes", "readwrite");
          const store = transaction.objectStore("wordMistakes");
          const index = store.index("sourceTextId");
          const req = index.getAll(textId);
          req.onsuccess = () => {
            const items: WordMistake[] = req.result ?? [];
            let pending = items.length;
            if (pending === 0) { resolve(); return; }
            for (const item of items) {
              const del = store.delete(item.wordId);
              del.onsuccess = () => { if (--pending === 0) resolve(); };
              del.onerror = () => reject(del.error);
            }
          };
          req.onerror = () => reject(req.error);
        })
    ),
  delete: (wordId: string): Promise<undefined> =>
    tx("wordMistakes", "readwrite", (s) => s.delete(wordId)),
};

// ─── Completed Word CRUD ──────────────────────────────────────────────────────

export const CompletedWordDB = {
  getAll: (): Promise<CompletedWord[]> => txAll("completedWords", "readonly", (s) => s.getAll()),
  getById: (wordId: string): Promise<CompletedWord | undefined> =>
    tx<CompletedWord | undefined>("completedWords", "readonly", (s) => s.get(wordId)),
  isCompleted: (wordId: string): Promise<boolean> =>
    tx<CompletedWord | undefined>("completedWords", "readonly", (s) => s.get(wordId)).then(
      (r) => r !== undefined
    ),
  /**
   * Mark a word as completed for a specific direction.
   * A word is only fully mastered when both completedForward and completedReverse are true.
   */
  markDirection: (wordId: string, direction: "forward" | "reverse"): Promise<IDBValidKey> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("completedWords", "readwrite");
          const store = transaction.objectStore("completedWords");
          const getReq = store.get(wordId);
          getReq.onsuccess = () => {
            const existing: CompletedWord | undefined = getReq.result;
            const updated: CompletedWord = {
              wordId,
              completedAt: existing?.completedAt ?? Date.now(),
              completedForward: existing?.completedForward ?? false,
              completedReverse: existing?.completedReverse ?? false,
              [direction === "forward" ? "completedForward" : "completedReverse"]: true,
            };
            const putReq = store.put(updated);
            putReq.onsuccess = () => resolve(putReq.result);
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        })
    ),
  /** Legacy: mark completed in both directions at once (used by manual ✓ button in non-random mode) */
  markCompleted: (wordId: string): Promise<IDBValidKey> =>
    tx("completedWords", "readwrite", (s) =>
      s.put({ wordId, completedAt: Date.now(), completedForward: true, completedReverse: true } as CompletedWord)
    ),
  unmarkCompleted: (wordId: string): Promise<undefined> =>
    tx("completedWords", "readwrite", (s) => s.delete(wordId)),
};

// ─── Completed Text CRUD ──────────────────────────────────────────────────────

export const CompletedTextDB = {
  getAll: (): Promise<CompletedText[]> => txAll("completedTexts", "readonly", (s) => s.getAll()),
  isCompleted: (textId: string): Promise<boolean> =>
    tx<CompletedText | undefined>("completedTexts", "readonly", (s) => s.get(textId)).then(
      (r) => r !== undefined
    ),
  markCompleted: (textId: string): Promise<IDBValidKey> =>
    tx("completedTexts", "readwrite", (s) =>
      s.put({ textId, completedAt: Date.now() } as CompletedText)
    ),
  unmarkCompleted: (textId: string): Promise<undefined> =>
    tx("completedTexts", "readwrite", (s) => s.delete(textId)),
};

// ─── VocabIgnored CRUD ────────────────────────────────────────────────────────
export const VocabIgnoredDB = {
  getAll: (): Promise<VocabIgnored[]> => txAll("vocabIgnored", "readonly", (s) => s.getAll()),
  getAllIds: (): Promise<Set<string>> =>
    txAll<VocabIgnored>("vocabIgnored", "readonly", (s) => s.getAll()).then(
      (all) => new Set(all.map((v) => v.id))
    ),
  ignore: (id: string): Promise<IDBValidKey> =>
    tx("vocabIgnored", "readwrite", (s) => s.put({ id, ignoredAt: Date.now() } as VocabIgnored)),
  unignore: (id: string): Promise<undefined> =>
    tx("vocabIgnored", "readwrite", (s) => s.delete(id)),
  isIgnored: (id: string): Promise<boolean> =>
    tx<VocabIgnored | undefined>("vocabIgnored", "readonly", (s) => s.get(id)).then(
      (r) => r !== undefined
    ),
};

// ─── Story Deck CRUD ─────────────────────────────────────────────────────────────
export const StoryDeckDB = {
  /** Add a word to a story deck (idempotent). */
  addWord: (storyId: string, wordId: string): Promise<IDBValidKey> => {
    const entry: StoryDeckEntry = {
      id: `${storyId}:${wordId}`,
      storyId,
      wordId,
      addedAt: Date.now(),
    };
    return tx("storyDecks", "readwrite", (s) => s.put(entry));
  },

  /** Remove a word from a story deck only (keeps it in the main deck). */
  removeWord: (storyId: string, wordId: string): Promise<undefined> =>
    tx("storyDecks", "readwrite", (s) => s.delete(`${storyId}:${wordId}`)),

  /** Check if a word is in a story deck. */
  hasWord: (storyId: string, wordId: string): Promise<boolean> =>
    tx<StoryDeckEntry | undefined>("storyDecks", "readonly", (s) =>
      s.get(`${storyId}:${wordId}`)
    ).then((r) => r !== undefined),

  /** Get all word IDs in a story deck. */
  getWordIds: (storyId: string): Promise<string[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("storyDecks", "readonly");
          const store = transaction.objectStore("storyDecks");
          const index = store.index("storyId");
          const req = index.getAll(storyId);
          req.onsuccess = () =>
            resolve((req.result as StoryDeckEntry[]).map((e) => e.wordId));
          req.onerror = () => reject(req.error);
        })
    ),

  /** Get all entries (for sync). */
  getAll: (): Promise<StoryDeckEntry[]> =>
    txAll("storyDecks", "readonly", (s) => s.getAll()),

  /** Bulk-put entries (used during sync pull). */
  putAll: (entries: StoryDeckEntry[]): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("storyDecks", "readwrite");
          const store = transaction.objectStore("storyDecks");
          let pending = entries.length;
          if (pending === 0) { resolve(); return; }
          for (const entry of entries) {
            const req = store.put(entry);
            req.onsuccess = () => { if (--pending === 0) resolve(); };
            req.onerror = () => reject(req.error);
          }
        })
    ),
};

// ─── Segmentation Override CRUD ───────────────────────────────────────────────
export const SegmentationOverrideDB = {
  getAll: (): Promise<SegmentationOverride[]> =>
    txAll("segmentationOverrides", "readonly", (s) => s.getAll()),

  get: (key: string): Promise<SegmentationOverride | undefined> =>
    tx<SegmentationOverride | undefined>("segmentationOverrides", "readonly", (s) => s.get(key)),

  put: (key: string, splits: string[]): Promise<IDBValidKey> => {
    const now = Date.now();
    return tx("segmentationOverrides", "readwrite", (s) =>
      s.put({ key, splits, createdAt: now, updatedAt: now } as SegmentationOverride)
    );
  },

  delete: (key: string): Promise<undefined> =>
    tx("segmentationOverrides", "readwrite", (s) => s.delete(key)),

  /** Load all overrides into the in-memory cedict engine. Call once on app init. */
  loadIntoEngine: async (): Promise<void> => {
    const { loadSegmentationOverrides } = await import("./cedict");
    const all = await SegmentationOverrideDB.getAll();
    const map: Record<string, string[]> = {};
    for (const o of all) map[o.key] = o.splits;
    loadSegmentationOverrides(map);
  },
};

// ─── Custom Deck Types ────────────────────────────────────────────────────────

export type DeckDirection = "forward" | "reverse" | "both";

export interface CustomDeck {
  /** nanoid — also used as the server-side deck id */
  id: string;
  name: string;
  /** true for the single Main Deck (cannot be deleted or renamed) */
  isMain: boolean;
  /** included in combined review sessions */
  included: boolean;
  settings: {
    direction: DeckDirection;
    autoAddFromStories: boolean;
  };
  createdAt: number;
  updatedAt: number;
}

export interface DeckCardEntry {
  /** composite key: "{deckId}:{wordId}" */
  id: string;
  deckId: string;
  wordId: string;
  addedAt: number;
}

// ─── CustomDeckDB ─────────────────────────────────────────────────────────────

export const CustomDeckDB = {
  getAll: (): Promise<CustomDeck[]> =>
    txAll("customDecks", "readonly", (s) => s.getAll()),

  get: (id: string): Promise<CustomDeck | undefined> =>
    tx<CustomDeck | undefined>("customDecks", "readonly", (s) => s.get(id)),

  put: (deck: CustomDeck): Promise<IDBValidKey> =>
    tx("customDecks", "readwrite", (s) => s.put(deck)),

  delete: (id: string): Promise<undefined> =>
    tx("customDecks", "readwrite", (s) => s.delete(id)),

  /** Ensure the Main Deck exists. Returns it. */
  ensureMainDeck: async (mainId: string): Promise<CustomDeck> => {
    const existing = await CustomDeckDB.get(mainId);
    if (existing) return existing;
    const deck: CustomDeck = {
      id: mainId,
      name: "Main Deck",
      isMain: true,
      included: true,
      settings: { direction: "forward", autoAddFromStories: true },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await CustomDeckDB.put(deck);
    return deck;
  },
};

// ─── DeckCardDB ───────────────────────────────────────────────────────────────

export const DeckCardDB = {
  getAll: (): Promise<DeckCardEntry[]> =>
    txAll("deckCards", "readonly", (s) => s.getAll()),

  getByDeck: (deckId: string): Promise<DeckCardEntry[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("deckCards", "readonly");
          const store = transaction.objectStore("deckCards");
          const index = store.index("deckId");
          const req = index.getAll(deckId);
          req.onsuccess = () => resolve(req.result ?? []);
          req.onerror = () => reject(req.error);
        })
    ),

  getByWord: (wordId: string): Promise<DeckCardEntry[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("deckCards", "readonly");
          const store = transaction.objectStore("deckCards");
          const index = store.index("wordId");
          const req = index.getAll(wordId);
          req.onsuccess = () => resolve(req.result ?? []);
          req.onerror = () => reject(req.error);
        })
    ),

  add: (deckId: string, wordId: string): Promise<IDBValidKey> => {
    const entry: DeckCardEntry = {
      id: `${deckId}:${wordId}`,
      deckId,
      wordId,
      addedAt: Date.now(),
    };
    return tx("deckCards", "readwrite", (s) => s.put(entry));
  },

  remove: (deckId: string, wordId: string): Promise<undefined> =>
    tx("deckCards", "readwrite", (s) => s.delete(`${deckId}:${wordId}`)),

  has: (deckId: string, wordId: string): Promise<boolean> =>
    tx<DeckCardEntry | undefined>("deckCards", "readonly", (s) =>
      s.get(`${deckId}:${wordId}`)
    ).then((r) => r !== undefined),

  putAll: (entries: DeckCardEntry[]): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("deckCards", "readwrite");
          const store = transaction.objectStore("deckCards");
          let pending = entries.length;
          if (pending === 0) { resolve(); return; }
          for (const entry of entries) {
            const req = store.put(entry);
            req.onsuccess = () => { if (--pending === 0) resolve(); };
            req.onerror = () => reject(req.error);
          }
        })
    ),

  /** Remove all entries for a deck (when deck is deleted). */
  deleteByDeck: (deckId: string): Promise<void> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("deckCards", "readwrite");
          const store = transaction.objectStore("deckCards");
          const index = store.index("deckId");
          const req = index.getAllKeys(deckId);
          req.onsuccess = () => {
            const keys = req.result;
            let pending = keys.length;
            if (pending === 0) { resolve(); return; }
            for (const key of keys) {
              const del = store.delete(key);
              del.onsuccess = () => { if (--pending === 0) resolve(); };
              del.onerror = () => reject(del.error);
            }
          };
          req.onerror = () => reject(req.error);
        })
    ),
};

// ─── Card Review History ──────────────────────────────────────────────────────

/**
 * CardReviewHistoryEntry — one record per "Know" button press.
 *
 * Stored in IndexedDB "cardReviewHistory" (autoIncrement id).
 * Used for retention analytics: you can query all reviews for a card,
 * compute per-card retention curves, or export to CSV.
 *
 * Fields:
 *   id          — autoIncrement PK (IndexedDB assigns this)
 *   cardId      — FK to flashcards.cardId
 *   wordId      — FK to words.id (denormalised for convenience)
 *   hanzi       — the Chinese word (denormalised for readability)
 *   reviewedAt  — Unix timestamp (ms) when Know was pressed
 *   rating      — 0 = Don't Know (legacy), 2 = Know
 *   sessionMissed — true if the card was missed earlier in the same session
 *   oldInterval   — interval (days) before this review
 *   newInterval   — interval (days) after this review
 *   oldRepetition — repetition count before this review
 *   newRepetition — repetition count after this review
 *   oldEaseFactor — ease factor before this review
 *   newEaseFactor — ease factor after this review
 */
export interface CardReviewHistoryEntry {
  id?: number;          // autoIncrement — omit on insert
  cardId: string;
  wordId: string;
  hanzi: string;
  reviewedAt: number;   // UTC ms
  rating: 0 | 1 | 2 | 3 | 4;
  sessionMissed: boolean;
  oldInterval: number;
  newInterval: number;
  oldRepetition: number;
  newRepetition: number;
  oldEaseFactor: number;
  newEaseFactor: number;
}

export const CardReviewHistoryDB = {
  /** Append a single review record. Returns the autoIncrement id. */
  add: (entry: Omit<CardReviewHistoryEntry, "id">): Promise<number> =>
    tx<IDBValidKey>("cardReviewHistory", "readwrite", (s) => s.add(entry)).then((k) => k as number),

  /** Get all reviews for a specific card, sorted oldest-first. */
  getByCardId: (cardId: string): Promise<CardReviewHistoryEntry[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("cardReviewHistory", "readonly");
          const store = transaction.objectStore("cardReviewHistory");
          const index = store.index("cardId");
          const req = index.getAll(cardId);
          req.onsuccess = () =>
            resolve(
              (req.result as CardReviewHistoryEntry[]).sort(
                (a, b) => a.reviewedAt - b.reviewedAt
              )
            );
          req.onerror = () => reject(req.error);
        })
    ),

  /** Get all reviews within a date range (UTC ms). */
  getByDateRange: (from: number, to: number): Promise<CardReviewHistoryEntry[]> =>
    openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("cardReviewHistory", "readonly");
          const store = transaction.objectStore("cardReviewHistory");
          const index = store.index("reviewedAt");
          const req = index.getAll(IDBKeyRange.bound(from, to));
          req.onsuccess = () => resolve(req.result as CardReviewHistoryEntry[]);
          req.onerror = () => reject(req.error);
        })
    ),

  /** Get all reviews ever (for export / analytics). */
  getAll: (): Promise<CardReviewHistoryEntry[]> =>
    txAll("cardReviewHistory", "readonly", (s) => s.getAll()),

  /** Count total reviews today. */
  countToday: (): Promise<number> => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return openDB().then(
      (db) =>
        new Promise((resolve, reject) => {
          const transaction = db.transaction("cardReviewHistory", "readonly");
          const store = transaction.objectStore("cardReviewHistory");
          const index = store.index("reviewedAt");
          const req = index.count(IDBKeyRange.bound(start.getTime(), end.getTime()));
          req.onsuccess = () => resolve(req.result);
          req.onerror = () => reject(req.error);
        })
    );
  },
};
