/**
 * useDecks — custom flashcard deck management hook.
 *
 * Manages decks locally in IndexedDB (CustomDeckDB + DeckCardDB) and
 * syncs with the server via tRPC when the user is authenticated.
 *
 * Design:
 *  - Local-first: all reads/writes go to IndexedDB immediately.
 *  - Cloud sync: mutations are mirrored to the server in the background.
 *  - Main Deck: auto-created on first load; cannot be deleted or renamed.
 *  - Shared SRS: card progress lives in sync_flashcards, not in decks.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import { CustomDeck, CustomDeckDB, DeckCardDB, DeckCardEntry } from "@/lib/db";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export type { CustomDeck, DeckCardEntry };

export interface UseDecksReturn {
  decks: CustomDeck[];
  deckCards: DeckCardEntry[];
  isLoading: boolean;

  /** Get wordIds in a specific deck */
  getDeckWordIds: (deckId: string) => string[];
  /** Get all deckIds a word belongs to */
  getWordDeckIds: (wordId: string) => string[];
  /** Check if a word is in a specific deck */
  isWordInDeck: (deckId: string, wordId: string) => boolean;

  /** The Main Deck (always present) */
  mainDeck: CustomDeck | null;

  createDeck: (name: string, settings?: CustomDeck["settings"]) => Promise<CustomDeck>;
  renameDeck: (deckId: string, name: string) => Promise<void>;
  deleteDeck: (deckId: string) => Promise<void>;
  setDeckIncluded: (deckId: string, included: boolean) => Promise<void>;
  updateDeckSettings: (deckId: string, settings: CustomDeck["settings"]) => Promise<void>;

  addWordToDecks: (wordId: string, deckIds: string[]) => Promise<void>;
  removeWordFromDeck: (deckId: string, wordId: string) => Promise<void>;

  /** Get all wordIds that are due across all included decks */
  getIncludedDeckWordIds: () => string[];

  refreshDecks: () => Promise<void>;
}

export function useDecks(): UseDecksReturn {
  const [decks, setDecks] = useState<CustomDeck[]>([]);
  const [deckCards, setDeckCards] = useState<DeckCardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  const decksRef = useRef<CustomDeck[]>([]);
  decksRef.current = decks;
  const deckCardsRef = useRef<DeckCardEntry[]>([]);
  deckCardsRef.current = deckCards;

  // tRPC mutations (fire-and-forget server sync)
  const createDeckMut = trpc.decks.create.useMutation();
  const renameDeckMut = trpc.decks.rename.useMutation();
  const deleteDeckMut = trpc.decks.delete.useMutation();
  const setIncludedMut = trpc.decks.setIncluded.useMutation();
  const updateSettingsMut = trpc.decks.updateSettings.useMutation();
  const addCardsMut = trpc.decks.addCards.useMutation();
  const removeCardMut = trpc.decks.removeCard.useMutation();

  const refreshDecks = useCallback(async () => {
    const [allDecks, allCards] = await Promise.all([
      CustomDeckDB.getAll(),
      DeckCardDB.getAll(),
    ]);
    setDecks(allDecks.sort((a, b) => {
      if (a.isMain) return -1;
      if (b.isMain) return 1;
      return a.createdAt - b.createdAt;
    }));
    setDeckCards(allCards);
  }, []);

  // Initial load — ensure Main Deck exists
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      // Main deck id is stable per-user but since this is local-first,
      // we use a fixed key "main" for the local store.
      await CustomDeckDB.ensureMainDeck("main");
      await refreshDecks();
      setIsLoading(false);
    })();
  }, [refreshDecks]);

  // ── Derived helpers ────────────────────────────────────────────────────────

  const getDeckWordIds = useCallback((deckId: string): string[] => {
    return deckCardsRef.current
      .filter((e) => e.deckId === deckId)
      .map((e) => e.wordId);
  }, []);

  const getWordDeckIds = useCallback((wordId: string): string[] => {
    return deckCardsRef.current
      .filter((e) => e.wordId === wordId)
      .map((e) => e.deckId);
  }, []);

  const isWordInDeck = useCallback((deckId: string, wordId: string): boolean => {
    return deckCardsRef.current.some((e) => e.deckId === deckId && e.wordId === wordId);
  }, []);

  const mainDeck = decks.find((d) => d.isMain) ?? null;

  const getIncludedDeckWordIds = useCallback((): string[] => {
    const includedDeckIds = new Set(
      decksRef.current.filter((d) => d.included).map((d) => d.id)
    );
    const wordIds = new Set<string>();
    for (const entry of deckCardsRef.current) {
      if (includedDeckIds.has(entry.deckId)) wordIds.add(entry.wordId);
    }
    return Array.from(wordIds);
  }, []);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const createDeck = useCallback(async (
    name: string,
    settings: CustomDeck["settings"] = { direction: "forward", autoAddFromStories: false }
  ): Promise<CustomDeck> => {
    const id = nanoid();
    const now = Date.now();
    const deck: CustomDeck = {
      id,
      name,
      isMain: false,
      included: true,
      settings,
      createdAt: now,
      updatedAt: now,
    };
    await CustomDeckDB.put(deck);
    setDecks((prev) => [...prev, deck]);

    // Mirror to server (best-effort)
    if (isAuthenticated) {
      createDeckMut.mutate({ id, name, settings });
    }

    return deck;
  }, [isAuthenticated, createDeckMut]);

  const renameDeck = useCallback(async (deckId: string, name: string): Promise<void> => {
    const deck = decksRef.current.find((d) => d.id === deckId);
    if (!deck || deck.isMain) return;
    const updated = { ...deck, name, updatedAt: Date.now() };
    await CustomDeckDB.put(updated);
    setDecks((prev) => prev.map((d) => d.id === deckId ? updated : d));

    if (isAuthenticated) {
      renameDeckMut.mutate({ deckId, name });
    }
  }, [isAuthenticated, renameDeckMut]);

  const deleteDeck = useCallback(async (deckId: string): Promise<void> => {
    const deck = decksRef.current.find((d) => d.id === deckId);
    if (!deck || deck.isMain) return;
    await DeckCardDB.deleteByDeck(deckId);
    await CustomDeckDB.delete(deckId);
    setDecks((prev) => prev.filter((d) => d.id !== deckId));
    setDeckCards((prev) => prev.filter((e) => e.deckId !== deckId));

    if (isAuthenticated) {
      deleteDeckMut.mutate({ deckId });
    }
  }, [isAuthenticated, deleteDeckMut]);

  const setDeckIncluded = useCallback(async (deckId: string, included: boolean): Promise<void> => {
    const deck = decksRef.current.find((d) => d.id === deckId);
    if (!deck) return;
    const updated = { ...deck, included, updatedAt: Date.now() };
    await CustomDeckDB.put(updated);
    setDecks((prev) => prev.map((d) => d.id === deckId ? updated : d));

    if (isAuthenticated) {
      setIncludedMut.mutate({ deckId, included });
    }
  }, [isAuthenticated, setIncludedMut]);

  const updateDeckSettings = useCallback(async (
    deckId: string,
    settings: CustomDeck["settings"]
  ): Promise<void> => {
    const deck = decksRef.current.find((d) => d.id === deckId);
    if (!deck) return;
    const updated = { ...deck, settings, updatedAt: Date.now() };
    await CustomDeckDB.put(updated);
    setDecks((prev) => prev.map((d) => d.id === deckId ? updated : d));

    if (isAuthenticated) {
      updateSettingsMut.mutate({ deckId, settings });
    }
  }, [isAuthenticated, updateSettingsMut]);

  const addWordToDecks = useCallback(async (wordId: string, deckIds: string[]): Promise<void> => {
    const newEntries: DeckCardEntry[] = [];
    for (const deckId of deckIds) {
      const already = deckCardsRef.current.some((e) => e.deckId === deckId && e.wordId === wordId);
      if (!already) {
        await DeckCardDB.add(deckId, wordId);
        newEntries.push({ id: `${deckId}:${wordId}`, deckId, wordId, addedAt: Date.now() });
      }
    }
    if (newEntries.length > 0) {
      setDeckCards((prev) => [...prev, ...newEntries]);
    }

    if (isAuthenticated && deckIds.length > 0) {
      // Group by deckId and send one mutation per deck
      for (const deckId of deckIds) {
        addCardsMut.mutate({ deckId, wordIds: [wordId] });
      }
    }
  }, [isAuthenticated, addCardsMut]);

  const removeWordFromDeck = useCallback(async (deckId: string, wordId: string): Promise<void> => {
    await DeckCardDB.remove(deckId, wordId);
    setDeckCards((prev) => prev.filter((e) => !(e.deckId === deckId && e.wordId === wordId)));

    if (isAuthenticated) {
      removeCardMut.mutate({ deckId, wordId });
    }
  }, [isAuthenticated, removeCardMut]);

  return {
    decks,
    deckCards,
    isLoading,
    getDeckWordIds,
    getWordDeckIds,
    isWordInDeck,
    mainDeck,
    createDeck,
    renameDeck,
    deleteDeck,
    setDeckIncluded,
    updateDeckSettings,
    addWordToDecks,
    removeWordFromDeck,
    getIncludedDeckWordIds,
    refreshDecks,
  };
}
