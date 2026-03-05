/**
 * storyGrammarDB.ts
 *
 * IndexedDB helpers for tracking which grammar points a user has studied
 * in each story. Follows the same pattern as grammarProgressDB.ts.
 *
 * Key: `${textId}::${lessonId}`
 */

export interface StoryGrammarStudiedRow {
  /** Composite key: `${textId}::${lessonId}` */
  key: string;
  textId: string;
  lessonId: string;
  studiedAt: number; // UTC ms timestamp
}

const DB_NAME = "StoryGrammarDB";
const STORE = "studied";
const DB_VER = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: "key" });
        store.createIndex("textId", "textId", { unique: false });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

/** Returns all studied rows for a given story. */
export async function getStudiedForStory(textId: string): Promise<StoryGrammarStudiedRow[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const idx = store.index("textId");
    const req = idx.getAll(textId);
    req.onsuccess = () => resolve(req.result as StoryGrammarStudiedRow[]);
    req.onerror = () => reject(req.error);
  });
}

/** Marks a grammar point as studied in a story. Idempotent. */
export async function markGrammarStudied(textId: string, lessonId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    const row: StoryGrammarStudiedRow = {
      key: `${textId}::${lessonId}`,
      textId,
      lessonId,
      studiedAt: Date.now(),
    };
    store.put(row);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Unmarks a grammar point as studied in a story. */
export async function unmarkGrammarStudied(textId: string, lessonId: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    store.delete(`${textId}::${lessonId}`);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

/** Returns all studied rows across all stories (for sync). */
export async function getAllStudiedRows(): Promise<StoryGrammarStudiedRow[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result as StoryGrammarStudiedRow[]);
    req.onerror = () => reject(req.error);
  });
}

/** Bulk-put rows (used during sync pull). */
export async function putManyStudiedRows(rows: StoryGrammarStudiedRow[]): Promise<void> {
  if (rows.length === 0) return;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    rows.forEach((r) => store.put(r));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
