import { expect, test } from "@playwright/test";

test.describe("scroll performance contract", () => {
  test("keeps the espresso ground stable outside intentional mocha surfaces", async ({
    page,
  }) => {
    // Given: the landing page is rendered at a desktop viewport.
    await page.goto("/");

    // When: the browser resolves the background of each primary-ground section.
    const backgrounds = await page
      .locator("#top, #contact")
      .evaluateAll((sections) =>
        sections.map(
          (section) => window.getComputedStyle(section).backgroundColor,
        ),
      );

    // Then: each section uses the body's single Deep Espresso background.
    const bodyBackground = await page
      .locator("body")
      .evaluate((body) => window.getComputedStyle(body).backgroundColor);
    expect(new Set(backgrounds)).toEqual(new Set([bodyBackground]));
  });

  test("keeps story text and bubbles free of repaint-heavy effects", async ({
    page,
  }) => {
    // Given: the pinned story and portfolio surfaces are mounted.
    await page.goto("/");

    // When: their computed paint effects are inspected.
    const storyEffects = await page
      .locator(".cw-story-beat")
      .evaluateAll((beats) =>
        beats.map((beat) => window.getComputedStyle(beat).clipPath),
      );
    const bubbleEffects = await page
      .locator(".cw-story-bubble")
      .evaluateAll((bubbles) =>
        bubbles.map((bubble) => window.getComputedStyle(bubble).filter),
      );

    // Then: scrolling never animates masks, blur, or layout-bound effects.
    expect(storyEffects).toHaveLength(4);
    expect(new Set(storyEffects)).toEqual(new Set(["none"]));
    expect(bubbleEffects).toHaveLength(8);
    expect(new Set(bubbleEffects)).toEqual(new Set(["none"]));
  });

  test("keeps heavy React diagnostics opt-in during development", async ({
    page,
  }) => {
    // Given: the app starts with the default development environment.
    await page.goto("/");

    // When: application-wide scripts are inspected.
    const diagnosticScripts = page.locator(
      "script[src*='react-scan'], script[src*='react-grab']",
    );

    // Then: no diagnostic overlay is loaded unless explicitly enabled.
    await expect(diagnosticScripts).toHaveCount(0);
  });
});
