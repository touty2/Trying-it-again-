/**
 * DeckAssignPopup — shown when adding a word from a story.
 * Lets the user choose which decks to add the word to.
 *
 * Features:
 *  - Checkbox list of all decks (Main Deck pre-checked)
 *  - "Remember my choice" option (persisted to localStorage)
 *  - Skips the popup entirely if only Main Deck exists
 */

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { BookOpen } from "lucide-react";
import { type CustomDeck } from "@/hooks/useDecks";

const REMEMBER_KEY = "cr-deck-assign-remember";
const SAVED_DECKS_KEY = "cr-deck-assign-saved";

export interface DeckAssignPopupProps {
  open: boolean;
  onClose: () => void;
  decks: CustomDeck[];
  /** Called with the list of deckIds the user confirmed */
  onConfirm: (deckIds: string[]) => void;
  /** The word being added (for display) */
  hanzi?: string;
}

function loadSavedDeckIds(decks: CustomDeck[]): string[] | null {
  try {
    const remember = localStorage.getItem(REMEMBER_KEY);
    if (remember !== "true") return null;
    const saved = localStorage.getItem(SAVED_DECKS_KEY);
    if (!saved) return null;
    const ids: string[] = JSON.parse(saved);
    // Filter to only valid deck ids
    const validIds = new Set(decks.map((d) => d.id));
    return ids.filter((id) => validIds.has(id));
  } catch {
    return null;
  }
}

export function DeckAssignPopup({
  open,
  onClose,
  decks,
  onConfirm,
  hanzi,
}: DeckAssignPopupProps) {
  const mainDeck = decks.find((d) => d.isMain);
  const customDecks = decks.filter((d) => !d.isMain);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => {
    const saved = loadSavedDeckIds(decks);
    if (saved) return new Set(saved);
    return new Set(mainDeck ? [mainDeck.id] : []);
  });
  const [remember, setRemember] = useState(() => {
    try { return localStorage.getItem(REMEMBER_KEY) === "true"; } catch { return false; }
  });

  // Reset selection when popup opens
  useEffect(() => {
    if (!open) return;
    const saved = loadSavedDeckIds(decks);
    if (saved) {
      setSelectedIds(new Set(saved));
    } else {
      setSelectedIds(new Set(mainDeck ? [mainDeck.id] : []));
    }
  }, [open, decks, mainDeck]);

  const toggle = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleConfirm = () => {
    const ids = Array.from(selectedIds);
    if (remember) {
      try {
        localStorage.setItem(REMEMBER_KEY, "true");
        localStorage.setItem(SAVED_DECKS_KEY, JSON.stringify(ids));
      } catch { /* ignore */ }
    } else {
      try {
        localStorage.removeItem(REMEMBER_KEY);
        localStorage.removeItem(SAVED_DECKS_KEY);
      } catch { /* ignore */ }
    }
    onConfirm(ids);
    onClose();
  };

  // If only Main Deck exists, skip the popup and auto-confirm
  useEffect(() => {
    if (open && customDecks.length === 0 && mainDeck) {
      onConfirm([mainDeck.id]);
      onClose();
    }
  }, [open, customDecks.length, mainDeck, onConfirm, onClose]);

  if (customDecks.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen size={16} />
            Add to decks
            {hanzi && (
              <span className="text-muted-foreground font-normal text-sm ml-1">
                — {hanzi}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-1">
          {decks.map((deck) => (
            <div
              key={deck.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => toggle(deck.id)}
            >
              <Checkbox
                id={`deck-${deck.id}`}
                checked={selectedIds.has(deck.id)}
                onCheckedChange={() => toggle(deck.id)}
              />
              <Label
                htmlFor={`deck-${deck.id}`}
                className="flex-1 cursor-pointer text-sm"
              >
                {deck.name}
                {deck.isMain && (
                  <span className="ml-1.5 text-xs text-muted-foreground">(Main)</span>
                )}
              </Label>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 pt-1 pb-1">
          <Switch
            id="remember-choice"
            checked={remember}
            onCheckedChange={setRemember}
            className="scale-90"
          />
          <Label htmlFor="remember-choice" className="text-xs text-muted-foreground cursor-pointer">
            Remember my choice
          </Label>
        </div>

        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            disabled={selectedIds.size === 0}
          >
            Add to {selectedIds.size} deck{selectedIds.size !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
