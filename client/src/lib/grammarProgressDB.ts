/**
 * grammarProgressDB — standalone IndexedDB helpers for grammar progress.
 *
 * These are used by useSyncManager (which cannot import the full
 * useGrammarProgress hook because hooks cannot be called outside React).
 */

export interface GrammarProgressRow {
  lessonId:     string;
  completed:    boolean;
  completedAt:  number | null;
  masteryScore: number | null;
  updatedAt:    number;
}

const DB_NAME = "GrammarProgressDB";
const STORE   = "progress";
const DB_VER  = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VER);
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: "lessonId" });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

export async function idbGetAllGrammarProgress(): Promise<GrammarProgressRow[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE, "readonly");
    const store = tx.objectStore(STORE);
    const req   = store.getAll();
    req.onsuccess = () => resolve(req.result as GrammarProgressRow[]);
    req.onerror   = () => reject(req.error);
  });
}

export async function idbPutManyGrammarProgress(rows: GrammarProgressRow[]): Promise<void> {
  if (rows.length === 0) return;
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx    = db.transaction(STORE, "readwrite");
    const store = tx.objectStore(STORE);
    rows.forEach((r) => store.put(r));
    tx.oncomplete = () => resolve();
    tx.onerror    = () => reject(tx.error);
  });
}
