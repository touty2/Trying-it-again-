/**
 * useFlashcardDirection
 *
 * Manages flashcard direction logic for the three testing modes:
 *   - "forward"  → always ZH→EN
 *   - "reverse"  → always EN→ZH
 *   - "random"   → 50/50 per card, with a 3-consecutive-same guard
 *
 * Direction is locked per card index — it does NOT change on re-render.
 * The guard prevents more than 3 consecutive cards in the same direction.
 */

import { useRef, useCallback } from "react";
import type { TestingMode } from "@/lib/db";

export type CardDirection = "forward" | "reverse";

/**
 * Pick a random direction with a light balancing guard.
 * If the last 3 picks were all the same, force the alternate.
 */
function pickBalancedDirection(history: CardDirection[]): CardDirection {
  const last3 = history.slice(-3);
  const allSame = last3.length === 3 && last3.every((d) => d === last3[0]);

  if (allSame) {
    // Force the other direction to break the streak
    return last3[0] === "forward" ? "reverse" : "forward";
  }

  return Math.random() < 0.5 ? "forward" : "reverse";
}

interface UseFlashcardDirectionReturn {
  /** Get the locked direction for a specific card index */
  getDirection: (cardIndex: number) => CardDirection;
  /** Reset all direction state (call when starting a new session) */
  resetDirections: () => void;
  /** Whether the current mode uses random direction */
  isRandom: boolean;
}

export function useFlashcardDirection(mode: TestingMode): UseFlashcardDirectionReturn {
  // Map from cardIndex → locked direction for that card
  const directionMap = useRef<Map<number, CardDirection>>(new Map());
  // History of directions picked (for balancing)
  const directionHistory = useRef<CardDirection[]>([]);

  const isRandom = mode === "random";

  const getDirection = useCallback(
    (cardIndex: number): CardDirection => {
      // Non-random modes: always the same direction
      if (mode === "forward") return "forward";
      if (mode === "reverse") return "reverse";

      // Random mode: return locked direction if already assigned
      const existing = directionMap.current.get(cardIndex);
      if (existing !== undefined) return existing;

      // Pick a new direction for this card index
      const picked = pickBalancedDirection(directionHistory.current);
      directionMap.current.set(cardIndex, picked);
      directionHistory.current.push(picked);

      return picked;
    },
    [mode]
  );

  const resetDirections = useCallback(() => {
    directionMap.current.clear();
    directionHistory.current = [];
  }, []);

  return { getDirection, resetDirections, isRandom };
}
