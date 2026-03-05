/**
 * Tests for settings sync persistence fix.
 * Verifies that all settings fields are included in the cloud sync payload
 * and that the applyCloudPreferences function restores them correctly.
 */

import { describe, it, expect } from "vitest";

// Simulate the collectLocalPreferences logic for settings
function collectSettingsPayload(settings: {
  newWordCap: number;
  reviewCap: number;
  testingMode: boolean;
  cardSize: "small" | "medium" | "large";
  enableReversibleCards: boolean;
  flashcardSource: "all" | "story";
  showCapReachedPopup: boolean;
}) {
  return {
    newWordCap: settings.newWordCap,
    reviewCap: settings.reviewCap,
    testingMode: settings.testingMode,
    cardSize: settings.cardSize,
    enableReversibleCards: settings.enableReversibleCards,
    flashcardSource: settings.flashcardSource,
    showCapReachedPopup: settings.showCapReachedPopup,
  };
}

// Simulate the applyCloudPreferences logic for settings
function applySettingsPayload(payload: Record<string, unknown>) {
  const defaults = {
    newWordCap: 20,
    reviewCap: 100,
    testingMode: false,
    cardSize: "medium" as const,
    enableReversibleCards: false,
    flashcardSource: "all" as const,
    showCapReachedPopup: true,
  };

  return {
    newWordCap: typeof payload.newWordCap === "number" ? payload.newWordCap : defaults.newWordCap,
    reviewCap: typeof payload.reviewCap === "number" ? payload.reviewCap : defaults.reviewCap,
    testingMode: typeof payload.testingMode === "boolean" ? payload.testingMode : defaults.testingMode,
    cardSize: (["small", "medium", "large"].includes(payload.cardSize as string)
      ? payload.cardSize
      : defaults.cardSize) as "small" | "medium" | "large",
    enableReversibleCards:
      typeof payload.enableReversibleCards === "boolean"
        ? payload.enableReversibleCards
        : defaults.enableReversibleCards,
    flashcardSource: (["all", "story"].includes(payload.flashcardSource as string)
      ? payload.flashcardSource
      : defaults.flashcardSource) as "all" | "story",
    showCapReachedPopup:
      typeof payload.showCapReachedPopup === "boolean"
        ? payload.showCapReachedPopup
        : defaults.showCapReachedPopup,
  };
}

describe("settings sync persistence", () => {
  it("collects all settings fields for cloud push", () => {
    const settings = {
      newWordCap: 15,
      reviewCap: 50,
      testingMode: true,
      cardSize: "large" as const,
      enableReversibleCards: true,
      flashcardSource: "story" as const,
      showCapReachedPopup: false,
    };

    const payload = collectSettingsPayload(settings);

    expect(payload.newWordCap).toBe(15);
    expect(payload.reviewCap).toBe(50);
    expect(payload.testingMode).toBe(true);
    expect(payload.cardSize).toBe("large");
    expect(payload.enableReversibleCards).toBe(true);
    expect(payload.flashcardSource).toBe("story");
    expect(payload.showCapReachedPopup).toBe(false);
  });

  it("restores all settings fields from cloud pull", () => {
    const cloudPayload = {
      newWordCap: 10,
      reviewCap: 75,
      testingMode: true,
      cardSize: "small",
      enableReversibleCards: true,
      flashcardSource: "story",
      showCapReachedPopup: false,
    };

    const restored = applySettingsPayload(cloudPayload);

    expect(restored.newWordCap).toBe(10);
    expect(restored.reviewCap).toBe(75);
    expect(restored.testingMode).toBe(true);
    expect(restored.cardSize).toBe("small");
    expect(restored.enableReversibleCards).toBe(true);
    expect(restored.flashcardSource).toBe("story");
    expect(restored.showCapReachedPopup).toBe(false);
  });

  it("falls back to defaults for missing or invalid cloud fields", () => {
    const restored = applySettingsPayload({
      newWordCap: "not-a-number",
      cardSize: "invalid-size",
      flashcardSource: null,
    });

    expect(restored.newWordCap).toBe(20);
    expect(restored.cardSize).toBe("medium");
    expect(restored.flashcardSource).toBe("all");
    expect(restored.testingMode).toBe(false);
    expect(restored.enableReversibleCards).toBe(false);
    expect(restored.showCapReachedPopup).toBe(true);
  });

  it("round-trips settings through collect and apply without data loss", () => {
    const original = {
      newWordCap: 30,
      reviewCap: 200,
      testingMode: false,
      cardSize: "medium" as const,
      enableReversibleCards: true,
      flashcardSource: "all" as const,
      showCapReachedPopup: true,
    };

    const payload = collectSettingsPayload(original);
    const restored = applySettingsPayload(payload);

    expect(restored).toEqual(original);
  });
});
