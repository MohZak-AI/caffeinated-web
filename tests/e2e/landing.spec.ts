import { expect, test } from "@playwright/test";
import { landingContract } from "./landing-contract";

test.describe("Caffienated Web conversational landing page", () => {
  test("presents the five-section coffee conversation with exact public copy", async ({
    page,
  }) => {
    // Given: the rebuilt landing page is loaded.
    await page.goto("/");

    // When: the main decision path is inspected.
    const sections = page.locator("main > section");
    await expect(sections).toHaveCount(5);
    await expect(sections.nth(0)).toHaveAttribute("id", "top");
    await expect(sections.nth(1)).toHaveAttribute("id", "story");
    await expect(sections.nth(2)).toHaveAttribute("id", "work");
    await expect(sections.nth(3)).toHaveAttribute("id", "faq");
    await expect(sections.nth(4)).toHaveAttribute("id", "contact");

    // Then: every section carries the independently approved copy.
    const hero = sections.nth(0);
    await expect(hero).toContainText(landingContract.hero.badge);
    await expect(hero.getByRole("heading", { level: 1 })).toHaveText(
      landingContract.hero.headline,
    );
    await expect(hero).toContainText(landingContract.hero.subheadline);
    await expect(hero.getByRole("heading", { level: 1 })).not.toContainText(
      "$199",
    );
    await expect(
      hero.getByTestId("booking-trigger").first(),
    ).toHaveText(landingContract.hero.cta);
    await expect(hero).toContainText(landingContract.hero.microcopy);
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: landingContract.work.title,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: landingContract.faq.title,
      }),
    ).toBeVisible();
    await expect(page.locator("#contact")).toContainText(
      landingContract.finalCta.headline,
    );
    await expect(page.locator("#contact")).toContainText(
      landingContract.finalCta.subheadline,
    );
    await expect(page.locator("#contact")).toContainText(
      landingContract.finalCta.emailLabel,
    );
    await expect(page.locator("#contact")).toContainText(
      landingContract.finalCta.button,
    );

    const visibleCopy = await page.locator("body").innerText();
    expect(visibleCopy).not.toMatch(/\p{Emoji_Presentation}/u);
  });

  test("links the four story beats to scroll progress", async ({ page }) => {
    // Given: a motion-capable desktop viewport.
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    const story = page.getByTestId("pinned-story");
    await expect(story).toBeVisible();
    await expect(story).toHaveCSS("position", "sticky");

    const beats = landingContract.story.map((line) =>
      page.getByText(line, { exact: true }),
    );
    for (const beat of beats) {
      await expect(beat).toBeAttached();
    }

    // When: each quarter of the story is reached.
    const scrollStoryTo = async (progress: number) => {
      await story.evaluate((element, targetProgress) => {
        const container = element.parentElement;
        if (!container) return;

        const start = container.getBoundingClientRect().top + window.scrollY;
        const distance = container.scrollHeight - window.innerHeight;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(0, start + distance * targetProgress);
      }, progress);
    };

    const expectBeatVisible = async (index: number) => {
      await expect
        .poll(async () =>
          beats[index]?.evaluate((element) =>
            Number(window.getComputedStyle(element).opacity),
          ),
        )
        .toBeGreaterThan(0.8);
    };

    // Then: the matching beat owns the center stage.
    await scrollStoryTo(0.08);
    await expectBeatVisible(0);
    await scrollStoryTo(0.34);
    await expectBeatVisible(1);
    await scrollStoryTo(0.59);
    await expectBeatVisible(2);
    await scrollStoryTo(0.86);
    await expectBeatVisible(3);
  });

  test("uses the animated coffee artwork in the hero", async ({ page }) => {
    // Given: the landing page hero is visible.
    await page.goto("/");

    // When: the hero artwork source is inspected.
    const heroArtwork = page.locator("#top figure img");

    // Then: the coffee GIF is the displayed hero asset.
    await expect(heroArtwork).toHaveAttribute(
      "src",
      /caffinated-web\.gif$/,
    );
  });

  test("uses a stacked story with no bubbles on mobile", async ({ page }) => {
    // Given: a mobile viewport without a reduced-motion override.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // When: the story fallback is inspected.
    const story = page.getByTestId("pinned-story");

    // Then: it is normal-flow content with the bubble layer disabled.
    await expect(story).toHaveCSS("position", "relative");
    await expect(page.locator(".cw-story-bubble")).toHaveCount(8);
    await expect(page.locator(".cw-story-bubbles")).toBeHidden();
    for (const line of landingContract.story) {
      await expect(page.getByText(line, { exact: true })).toBeVisible();
    }
  });

  test("shows all story copy statically when reduced motion is requested", async ({
    page,
  }) => {
    // Given: reduced motion is enabled.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    // When: the story is inspected.
    const storyContainer = page.locator(".cw-scroll-story");
    const story = page.getByTestId("pinned-story");

    // Then: all copy is normal-flow and immediately readable.
    await expect(story).toHaveCSS("position", "relative");
    const storyHeight = await storyContainer.evaluate(
      (element) => element.getBoundingClientRect().height,
    );
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    expect(storyHeight).toBeLessThan(viewportHeight * 2);

    for (const line of landingContract.story) {
      const beat = page.getByText(line, { exact: true });
      await expect(beat).toBeVisible();
      await expect(beat).toHaveCSS("opacity", "1");
      await expect(beat).toHaveCSS("position", "relative");
    }
    await expect(page.locator(".cw-story-bubbles")).toBeHidden();
  });

  test("shows the portfolio notes and exact transparent pricing answers", async ({
    page,
  }) => {
    // Given: the landing page is loaded.
    await page.goto("/");

    // When: work and FAQ content are inspected.
    const work = page.locator("section#work");
    await expect(work).toContainText(landingContract.work.subheading);
    for (const project of landingContract.work.projects) {
      const link = work.getByTestId(`work-link-${project.id}`);
      await expect(link).toHaveAttribute("href", project.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toContainText(project.name);
      await expect(link).toContainText(project.note);
    }

    // Then: the public pricing is exact and no vague monthly phrase remains.
    const faq = page.locator("section#faq");
    for (const item of landingContract.faq.faq) {
      await expect(
        faq.getByText(item.question, { exact: true }),
      ).toBeVisible();
      await expect(faq.getByText(item.answer, { exact: true })).toBeAttached();
    }
    await expect(page.locator("body")).not.toContainText("low monthly fee");
  });

  test("uses the specified surfaces and accessible CTA color pairing", async ({
    page,
  }) => {
    // Given: the five-section page is rendered.
    await page.goto("/");

    // When: section and CTA colors resolve in the browser.
    const surfaces = await page
      .locator("#work, #faq")
      .evaluateAll((elements) =>
        elements.map(
          (element) => window.getComputedStyle(element).backgroundColor,
        ),
      );
    const ctaColors = await page.locator("[data-cta='primary']").evaluateAll(
      (elements) =>
        elements.map((element) => {
          const style = window.getComputedStyle(element);
          return {
            background: style.backgroundColor,
            color: style.color,
          };
        }),
    );

    // Then: mocha carries sections 3/4 and every CTA is amber/espresso.
    expect(new Set(surfaces)).toEqual(new Set(["rgb(30, 22, 17)"]));
    expect(ctaColors.length).toBeGreaterThan(0);
    expect(new Set(ctaColors.map(({ background }) => background))).toEqual(
      new Set(["rgb(212, 155, 84)"]),
    );
    expect(new Set(ctaColors.map(({ color }) => color))).toEqual(
      new Set(["rgb(18, 13, 10)"]),
    );
  });

  test("reuses one fixed bubble pool through every story crossing", async ({
    page,
  }) => {
    // Given: the desktop story owns eight pooled pixel bubbles.
    await page.goto("/");
    const bubbles = page.locator(".cw-story-bubble");
    await expect(bubbles).toHaveCount(8);

    // When: the viewport crosses all three blend boundaries.
    const story = page.getByTestId("pinned-story");
    for (const progress of [0.26, 0.51, 0.76]) {
      await story.evaluate((element, targetProgress) => {
        const container = element.parentElement;
        if (!container) return;
        const start = container.getBoundingClientRect().top + window.scrollY;
        const distance = container.scrollHeight - window.innerHeight;
        window.scrollTo(0, start + distance * targetProgress);
      }, progress);
    }

    // Then: crossings replay the pool without allocating new elements.
    await expect(bubbles).toHaveCount(8);
  });

  test("opens the booking dialog and restores focus on Escape", async ({
    page,
  }) => {
    // Given: the hero booking action has hydrated.
    await page.goto("/");

    const trigger = page.getByTestId("booking-trigger").first();
    await expect(trigger).toHaveAttribute("data-booking-ready", "true");
    await trigger.focus();
    await trigger.press("Enter");

    // When: the native dialog opens.
    const dialog = page.getByRole("dialog", {
      name: landingContract.booking.title,
    });
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByTestId("booking-scheduler"),
    ).toHaveAttribute("src", landingContract.booking.schedulingUrl);
    const externalLink = dialog.getByTestId("booking-external-link");
    await expect(externalLink).toHaveAttribute(
      "href",
      landingContract.booking.schedulingUrl,
    );
    await expect(externalLink).toHaveAttribute("target", "_blank");
    await expect(
      dialog.getByRole("link", {
        name: landingContract.booking.externalLinkLabel,
      }),
    ).toBeVisible();

    const closeButton = dialog.getByRole("button", {
      name: landingContract.booking.closeLabel,
    });
    await expect(closeButton).toBeFocused();
    await closeButton.press("Escape");

    // Then: the dialog closes and focus returns to its trigger.
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
  });

  test("keeps the mobile layout inside the viewport", async ({ page }) => {
    // Given: a narrow mobile viewport.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    // When: the full document width is measured.
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: window.innerWidth,
    }));

    // Then: no section or animation introduces horizontal overflow.
    expect(dimensions.documentWidth).toBeLessThanOrEqual(
      dimensions.viewportWidth,
    );
    await expect(
      page.getByRole("heading", {
        level: 2,
        name: landingContract.finalCta.headline,
      }),
    ).toBeVisible();
  });
});
