/**
 * DecksSidebar — slides in from the right to manage custom flashcard decks.
 *
 * Features:
 *  - Lists Main Deck + custom decks with card count and included toggle
 *  - Create new deck via "+" button
 *  - Three-dot menu: rename, delete, open settings
 *  - Per-deck settings panel: direction, autoAddFromStories
 */

import { useState } from "react";
import { nanoid } from "nanoid";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Settings2,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { type CustomDeck, type UseDecksReturn } from "@/hooks/useDecks";

interface DecksSidebarProps {
  open: boolean;
  onClose: () => void;
  decks: UseDecksReturn;
  /** Map of deckId → card count (from parent, which knows the word list) */
  deckCardCounts: Record<string, number>;
  /** Currently active deck filter (null = Main Deck / all words) */
  activeDeckId: string | null;
  onSelectDeck: (deckId: string | null) => void;
}

// ─── Create Deck Dialog ───────────────────────────────────────────────────────

function CreateDeckDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    const trimmed = name.trim();
    if (!trimmed) { toast.error("Deck name is required"); return; }
    setLoading(true);
    try {
      await onCreate(trimmed);
      setName("");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>New Deck</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Label htmlFor="deck-name">Deck name</Label>
          <Input
            id="deck-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. HSK 4 Verbs"
            className="mt-1.5"
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} disabled={loading || !name.trim()}>
            {loading ? "Creating…" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Rename Deck Dialog ───────────────────────────────────────────────────────

function RenameDeckDialog({
  deck,
  onClose,
  onRename,
}: {
  deck: CustomDeck;
  onClose: () => void;
  onRename: (name: string) => Promise<void>;
}) {
  const [name, setName] = useState(deck.name);
  const [loading, setLoading] = useState(false);

  const handleRename = async () => {
    const trimmed = name.trim();
    if (!trimmed) { toast.error("Deck name is required"); return; }
    setLoading(true);
    try {
      await onRename(trimmed);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename Deck</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <Label htmlFor="rename-deck">New name</Label>
          <Input
            id="rename-deck"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5"
            onKeyDown={(e) => e.key === "Enter" && handleRename()}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleRename} disabled={loading || !name.trim()}>
            {loading ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Deck Settings Panel ──────────────────────────────────────────────────────

function DeckSettingsPanel({
  deck,
  onClose,
  onUpdate,
}: {
  deck: CustomDeck;
  onClose: () => void;
  onUpdate: (settings: CustomDeck["settings"]) => Promise<void>;
}) {
  const [direction, setDirection] = useState<CustomDeck["settings"]["direction"]>(
    deck.settings?.direction ?? "forward"
  );
  const [autoAdd, setAutoAdd] = useState(deck.settings?.autoAddFromStories ?? false);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await onUpdate({ direction, autoAddFromStories: autoAdd });
      toast.success("Deck settings saved");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>
            <span className="flex items-center gap-2">
              <Settings2 size={16} />
              {deck.name} — Settings
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 py-2">
          <div>
            <Label>Card direction</Label>
            <Select value={direction} onValueChange={(v) => setDirection(v as CustomDeck["settings"]["direction"])}>
              <SelectTrigger className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="forward">ZH → EN</SelectItem>
                <SelectItem value="reverse">EN → ZH</SelectItem>
                <SelectItem value="both">Both directions</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Auto-add from stories</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Words tapped in reading sessions are added to this deck automatically
              </p>
            </div>
            <Switch checked={autoAdd} onCheckedChange={setAutoAdd} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Deck Row ─────────────────────────────────────────────────────────────────

function DeckRow({
  deck,
  cardCount,
  isActive,
  onSelect,
  onToggleIncluded,
  onRename,
  onDelete,
  onSettings,
}: {
  deck: CustomDeck;
  cardCount: number;
  isActive: boolean;
  onSelect: () => void;
  onToggleIncluded: (included: boolean) => void;
  onRename: () => void;
  onDelete: () => void;
  onSettings: () => void;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group",
        isActive ? "bg-primary/10 text-primary" : "hover:bg-muted/50",
      ].join(" ")}
    >
      {/* Deck name + card count — clicking selects the deck */}
      <button
        className="flex-1 flex items-center gap-2.5 min-w-0 text-left"
        onClick={onSelect}
      >
        <BookOpen size={15} className={isActive ? "text-primary" : "text-muted-foreground"} />
        <div className="min-w-0">
          <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-foreground"}`}>
            {deck.name}
            {deck.isMain && (
              <Badge variant="outline" className="ml-2 text-[10px] py-0 px-1.5 font-normal">
                Main
              </Badge>
            )}
          </p>
          <p className="text-xs text-muted-foreground">{cardCount} word{cardCount !== 1 ? "s" : ""}</p>
        </div>
      </button>

      {/* Included toggle */}
      <Switch
        checked={deck.included}
        onCheckedChange={onToggleIncluded}
        className="shrink-0"
        title={deck.included ? "Included in reviews" : "Excluded from reviews"}
      />

      {/* Three-dot menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-muted transition-all">
            <MoreHorizontal size={14} className="text-muted-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={onSettings}>
            <Settings2 size={13} className="mr-2" />
            Settings
          </DropdownMenuItem>
          {!deck.isMain && (
            <>
              <DropdownMenuItem onClick={onRename}>
                <Pencil size={13} className="mr-2" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onDelete}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 size={13} className="mr-2" />
                Delete deck
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {isActive && <ChevronRight size={13} className="text-primary shrink-0" />}
    </div>
  );
}

// ─── DecksSidebar ─────────────────────────────────────────────────────────────

export function DecksSidebar({
  open,
  onClose,
  decks: decksMgr,
  deckCardCounts,
  activeDeckId,
  onSelectDeck,
}: DecksSidebarProps) {
  const [showCreate, setShowCreate] = useState(false);
  const [renamingDeck, setRenamingDeck] = useState<CustomDeck | null>(null);
  const [settingsDeck, setSettingsDeck] = useState<CustomDeck | null>(null);

  const handleCreate = async (name: string) => {
    const deck = await decksMgr.createDeck(name);
    toast.success(`Deck "${deck.name}" created`);
  };

  const handleDelete = async (deck: CustomDeck) => {
    if (!confirm(`Delete "${deck.name}"? This cannot be undone.`)) return;
    await decksMgr.deleteDeck(deck.id);
    toast.success(`Deck "${deck.name}" deleted`);
    // If the deleted deck was active, reset to main
    if (activeDeckId === deck.id) onSelectDeck(null);
  };

  return (
    <>
      <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
        <SheetContent side="right" className="w-80 sm:w-80 p-0 flex flex-col">
          <SheetHeader className="px-4 py-4 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">Decks</SheetTitle>
              <Button
                size="sm"
                variant="outline"
                className="h-7 gap-1 text-xs"
                onClick={() => setShowCreate(true)}
              >
                <Plus size={12} />
                New Deck
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Toggle to include/exclude decks from combined review sessions.
            </p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-2 px-2">
            {decksMgr.decks.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                No decks yet
              </div>
            ) : (
              <div className="space-y-0.5">
                {decksMgr.decks.map((deck) => (
                  <DeckRow
                    key={deck.id}
                    deck={deck}
                    cardCount={deckCardCounts[deck.id] ?? 0}
                    isActive={activeDeckId === deck.id || (activeDeckId === null && deck.isMain)}
                    onSelect={() => {
                      onSelectDeck(deck.isMain ? null : deck.id);
                      onClose();
                    }}
                    onToggleIncluded={(included) => decksMgr.setDeckIncluded(deck.id, included)}
                    onRename={() => setRenamingDeck(deck)}
                    onDelete={() => handleDelete(deck)}
                    onSettings={() => setSettingsDeck(deck)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
            Cards can belong to multiple decks. SRS progress is shared across all decks.
          </div>
        </SheetContent>
      </Sheet>

      {/* Create dialog */}
      <CreateDeckDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />

      {/* Rename dialog */}
      {renamingDeck && (
        <RenameDeckDialog
          deck={renamingDeck}
          onClose={() => setRenamingDeck(null)}
          onRename={(name) => decksMgr.renameDeck(renamingDeck.id, name)}
        />
      )}

      {/* Settings panel */}
      {settingsDeck && (
        <DeckSettingsPanel
          deck={settingsDeck}
          onClose={() => setSettingsDeck(null)}
          onUpdate={(settings) => decksMgr.updateDeckSettings(settingsDeck.id, settings)}
        />
      )}
    </>
  );
}
