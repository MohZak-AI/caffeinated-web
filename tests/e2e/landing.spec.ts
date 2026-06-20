import { test, expect } from "@playwright/test";
import { landingContent } from "@/app/_content/landing";

test.describe("caffeinatedweb — fast, flexible, from $99", () => {
  test("Phase 1 hero renders brand, highlights, services, CTAs, and illustration", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByText(landingContent.brand.name, { exact: true }).first()
    ).toBeVisible();

    // Value-prop highlights (fast / flexible) replace the old global claims.
    const highlights = page.getByTestId("hero-highlights");
    await expect(highlights).toBeVisible();
    for (const highlight of landingContent.hero.highlights) {
      await expect(highlights.getByText(highlight)).toBeVisible();
    }

    // Headline preserved (playful origin identity)
    const headline = page.locator("h1");
    await expect(headline).toContainText("CREATING");
    await expect(headline).toContainText("FANCY");
    await expect(headline).toContainText("FAST");
    await expect(headline).toContainText("WEBSITES");

    // Services
    for (const service of landingContent.services) {
      await expect(page.getByText(service.label)).toBeVisible();
    }

    // Illustration with accessible name + aria
    const illustration = page.getByRole("img", {
      name: landingContent.illustration.title,
    });
    await expect(illustration).toBeVisible();

    for (const testId of [
      "illustration-service-startup",
      "illustration-service-coding",
      "illustration-service-scalable",
    ]) {
      await expect(page.getByTestId(testId)).toBeVisible();
    }

    // Navigation CTAs + section anchors
    await expect(page.locator('a[href="#contact"]').first()).toBeVisible();
    await expect(page.locator('a[href="#pricing"]').first()).toBeVisible();
    await expect(page.locator("section#contact")).toBeVisible();
    await expect(page.locator("section#pricing")).toBeVisible();
  });

  test("booking dialog opens from primary CTA and closes", async ({ page }) => {
    await page.goto("/");

    const cta = page.getByTestId("booking-trigger").first();
    await expect(cta).toBeVisible();
    await cta.click();

    const dialog = page.getByRole("dialog", {
      name: landingContent.booking.title,
    });
    await expect(dialog).toBeVisible();
    // The live scheduler is the Calendly embed.
    const scheduler = dialog.getByTestId("booking-scheduler");
    await expect(scheduler).toBeVisible();
    await expect(scheduler).toHaveAttribute(
      "src",
      landingContent.booking.defaultSchedulingUrl
    );
    expect(landingContent.booking.defaultSchedulingUrl).toContain("calendly.com");
    await expect(
      dialog.getByText(landingContent.booking.description)
    ).toBeVisible();

    await page
      .getByRole("button", { name: landingContent.booking.closeLabel })
      .click();
    await expect(dialog).not.toBeVisible();
  });

  test("booking dialog opens via keyboard and restores focus on Escape", async ({
    page,
  }) => {
    await page.goto("/");

    const cta = page.getByTestId("booking-trigger").first();
    await cta.focus();
    await cta.press("Enter");

    const dialog = page.getByRole("dialog", {
      name: landingContent.booking.title,
    });
    await expect(dialog).toBeVisible();

    const closeButton = dialog.getByRole("button", {
      name: landingContent.booking.closeLabel,
    });
    await expect(closeButton).toBeFocused();

    await closeButton.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(cta).toBeFocused();
  });

  test("Phase 2 shows the 'did you know' facts and the $99 offer", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.locator("section#pricing");
    await section.scrollIntoViewIfNeeded();

    await expect(
      section.getByText(landingContent.didYouKnow.headline)
    ).toBeVisible();

    for (const fact of landingContent.didYouKnow.facts) {
      await expect(section.getByText(fact.stat).first()).toBeVisible();
    }

    for (const prop of landingContent.valueProps) {
      await expect(section.getByText(prop.title).first()).toBeVisible();
    }

    // The $99 offer card with the inclusive line items.
    const pricingCard = page.getByTestId("pricing-card");
    await expect(pricingCard).toBeVisible();
    await expect(
      pricingCard.getByText(landingContent.pricing.price, { exact: true })
    ).toBeVisible();
    for (const item of landingContent.pricing.includes) {
      await expect(pricingCard.getByText(item)).toBeVisible();
    }
    await expect(
      pricingCard.getByTestId("booking-trigger")
    ).toBeVisible();
  });

  test("scroll-triggered background morphs across the three phases", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const backdrop = page.getByTestId("scroll-phase-backdrop");
    await expect(backdrop).toBeVisible();

    const colorAt = async () => {
      return backdrop.evaluate((el) => {
        const cs = window.getComputedStyle(el);
        return cs.backgroundColor;
      });
    };

    // Top of page — playful (cream).
    const topColor = await colorAt();

    // Scroll the offer section into view (deep-tech / charcoal).
    await page.locator("section#pricing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const midColor = await colorAt();

    // Scroll to the finale (elite / ivory).
    await page.locator("section#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const bottomColor = await colorAt();

    expect(topColor, "top vs pricing").not.toEqual(midColor);
    expect(midColor, "pricing vs finale").not.toEqual(bottomColor);
  });

  test("reduced motion freezes the background and keeps accessible static content", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const illustration = page.getByRole("img", {
      name: landingContent.illustration.title,
    });
    await expect(illustration).toBeVisible();
    await expect(illustration).toHaveAttribute("aria-labelledby");

    const reactPanel = page.getByTestId("react-code-panel");
    await expect(reactPanel).toContainText("ConversionHero");
    await expect(reactPanel).toContainText("motion.section");

    const nodePanel = page.getByTestId("node-code-panel");
    await expect(nodePanel).toContainText("app.listen(3000)");

    // No motion-driven backdrop under reduced motion; the static cream
    // backdrop should hold across scroll positions.
    await expect(page.getByTestId("scroll-phase-backdrop")).toHaveCount(0);

    const staticBackdrop = page.locator(".scroll-phase-backdrop");
    const read = () =>
      staticBackdrop.evaluate(
        (el) => window.getComputedStyle(el).backgroundColor
      );

    const top = await read();
    await page.locator("section#pricing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const mid = await read();
    await page.locator("section#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const bottom = await read();

    expect(top).toEqual(mid);
    expect(mid).toEqual(bottom);
  });

  test("responsive layout has no horizontal overflow", async ({ page }) => {
    for (const viewport of [
      { width: 375, height: 812 },
      { width: 768, height: 1024 },
      { width: 1280, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await page.waitForLoadState("networkidle");

      const body = page.locator("body");
      const scrollWidth = await body.evaluate((el) => el.scrollWidth);
      const clientWidth = await body.evaluate((el) => el.clientWidth);
      expect(scrollWidth, `overflow at ${viewport.width}px`).toBe(clientWidth);
    }
  });
});
