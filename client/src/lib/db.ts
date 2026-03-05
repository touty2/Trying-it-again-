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
import { FSRS, Rating, State } from "fsrs-algorithm";

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

// ─── FSRS Algorithm ───────────────────────────────────────────────────────────

/**
 * FSRS rating grades (maps to the 4-button UI):
 *   1 = Again  (Don't Know)  — resets to Relearning
 *   2 = Hard   (Nearly)      — short interval
 *   3 = Good   (Know)        — normal interval
 *   4 = Easy   (Very Easy)   — long interval
 */
export type FSRSRating = 1 | 2 | 3 | 4;

/** @deprecated Use FSRSRating. SM2Quality kept for backwards-compat in tests. */
export type SM2Quality = 0 | 1 | 2;

/** Map legacy SM-2 quality to FSRS rating */
export function sm2ToFSRS(q: SM2Quality): FSRSRating {
  if (q === 0) return Rating.Again as FSRSRating;
  if (q === 1) return Rating.Hard as FSRSRating;
  return Rating.Good as FSRSRating;
}

/** Convert a Unix timestamp (ms) to an ISO date string (YYYY-MM-DD) */
export function toISODate(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10);
}

/** Convert an ISO date string (YYYY-MM-DD) to start-of-day Unix timestamp (ms) */
export function fromISODate(iso: string): number {
  return new Date(iso + "T00:00:00.000Z").getTime();
}

const _fsrs = new FSRS();

/**
 * Apply FSRS algorithm to a flashcard and return updated fields.
 *
 * Ratings:
 *   1 = Again  (Don't Know)  → short interval, relearning
 *   2 = Hard   (Nearly)      → slightly longer
 *   3 = Good   (Know)        → normal FSRS interval
 *   4 = Easy   (Very Easy)   → long interval
 *
 * Returns updated Flashcard fields (partial — merge with existing card).
 */
export function applyFSRS(card: Flashcard, rating: FSRSRating): Partial<Flashcard> {
  const now = new Date();
  // Build FSRS card object from stored state (library uses camelCase)
  const fsrsCard = _fsrs.createEmptyCard();
  fsrsCard.stability = card.stability;
  fsrsCard.difficulty = card.difficulty;
  fsrsCard.elapsedDays = card.elapsedDays;
  fsrsCard.scheduledDays = card.scheduledDays;
  fsrsCard.reps = card.reps;
  fsrsCard.lapses = card.lapses;
  fsrsCard.state = card.state as State;
  if (card.lastReviewed) fsrsCard.lastReview = new Date(card.lastReviewed);
  fsrsCard.due = card.lastReviewed ? new Date(card.lastReviewed) : now;

  const result = _fsrs.schedule(fsrsCard, now);
  let updated;
  if (rating === Rating.Again) updated = result.again.card;
  else if (rating === Rating.Hard) updated = result.hard.card;
  else if (rating === Rating.Good) updated = result.good.card;
  else updated = result.easy.card;

  const newDueDate = updated.due instanceof Date ? updated.due.getTime() : Date.now();
  const newInterval = updated.scheduledDays ?? 1;
  return {
    stability: updated.stability,
    difficulty: updated.difficulty,
    elapsedDays: updated.elapsedDays ?? 0,
    scheduledDays: newInterval,
    reps: updated.reps,
    lapses: updated.lapses,
    state: updated.state,
    dueDate: newDueDate,
    nextReviewDate: toISODate(newDueDate),
    lastReviewed: now.getTime(),
    // Legacy compat aliases
    repetition: updated.reps,
    interval: newInterval,
    easeFactor: updated.stability,
  };
}

/** @deprecated Use applyFSRS. Kept for backwards-compat in server tests. */
export function applySM2(card: Flashcard, quality: SM2Quality): Partial<Flashcard> {
  return applyFSRS(card, sm2ToFSRS(quality));
}

/**
 * Create a brand-new FSRS Flashcard for a given word.
 * cardType: "recognition" = CN→EN, "production" = EN→CN
 */
export function createFSRSCard(wordId: string, cardType: CardType): Flashcard {
  const now = Date.now();
  const cardId = cardType === "recognition" ? `${wordId}-a` : `${wordId}-b`;
  const empty = _fsrs.createEmptyCard();
  return {
    cardId,
    wordId,
    cardType,
    stability: empty.stability,
    difficulty: empty.difficulty,
    dueDate: now,
    elapsedDays: empty.elapsedDays,
    scheduledDays: empty.scheduledDays,
    reps: empty.reps,
    lapses: empty.lapses,
    state: empty.state,
    lastReviewed: null,
    createdAt: now,
    // Legacy compat aliases
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
 * - dueToday: dueDate is today (scheduled for today)
 * - newCards: never reviewed (lastReviewed === null)
 *
 * Completed words (passed as a Set) are excluded from all counts.
 */
export function getDueStats(
  cards: Flashcard[],
  completedWordIds: Set<string>
): { dueToday: number; overdue: number; newCards: number } {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayStartMs = todayStart.getTime();
  const tomorrowStartMs = todayStartMs + 24 * 60 * 60 * 1000;

  let dueToday = 0;
  let overdue = 0;
  let newCards = 0;

  for (const card of cards) {
    if (completedWordIds.has(card.wordId)) continue;
    if (card.lastReviewed === null) {
      newCards++;
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
const DB_VERSION = 9; // v9: storyDecks store for story-specific deck memberships

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

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
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
          // go back one day
          const d = new Date(current);
          d.setDate(d.getDate() - 1);
          current = d.toISOString().slice(0, 10);
        } else {
          break;
        }
      }
      return streak;
    }),
};

// ─── Seed Data ────────────────────────────────────────────────────────────────

/**
 * Seeds all 120 graded reading texts from the content module.
 * Uses DB_VERSION bump to re-seed when content is updated.
 * recommendedVocabulary stores raw hanzi strings (looked up in dictionary at runtime).
 */
export async function seedSampleTexts(): Promise<void> {
  const existing = await TextDB.getAll();
  // Re-seed if we have fewer texts than the full content set (handles version upgrades)
  if (existing.length >= 120) return;
  // Clear old sample texts before re-seeding
  for (const t of existing) {
    await TextDB.delete(t.id);
  }
  const { CONTENT_TEXTS } = await import("./contentData");
  for (const ct of CONTENT_TEXTS) {
    const text: Text = {
      id: ct.id,
      title: ct.title,
      englishTitle: ct.englishTitle,
      band: ct.band,
      chineseText: ct.chineseText,
      englishTranslation: ct.englishTranslation,
      recommendedVocabulary: ct.recommendedVocabulary, // hanzi strings
      createdAt: Date.now(),
    };
    await TextDB.put(text);
  }
}

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
