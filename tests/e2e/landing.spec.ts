import { test, expect } from "@playwright/test";
import { landingContent } from "@/app/_content/landing";

test.describe("caffienatedweb — agency craft from $99", () => {
  test("Phase 1 hero renders agency positioning, highlights, services, and CTAs", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(
      page.getByText(landingContent.brand.name, { exact: true }).first()
    ).toBeVisible();

    const highlights = page.getByTestId("hero-highlights");
    await expect(highlights).toBeVisible();
    for (const highlight of landingContent.hero.highlights) {
      await expect(highlights.getByText(highlight)).toBeVisible();
    }

    await expect(page.getByTestId("site-cursor-ring")).toHaveCount(1);
    await expect(page.getByTestId("site-cursor-dot")).toHaveCount(1);
    await expect(page.getByTestId("site-cursor-label")).toHaveCount(1);
    await page.mouse.move(240, 240);
    if (test.info().project.name !== "Mobile Safari") {
      await expect(page.getByTestId("site-cursor-ring")).toBeVisible();
    }

    const headline = page.locator("h1");
    await expect(headline).toContainText("WEBSITES");
    await expect(headline).toContainText("AGENCY");
    await expect(headline).toContainText("$199");

    const heroServices = page.getByTestId("hero-service-index");
    for (const service of landingContent.services) {
      await expect(heroServices.getByText(service.label)).toBeVisible();
    }

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

  test("Phase 2 shows agency process, work previews, and the $99 offer", async ({
    page,
  }) => {
    await page.goto("/");

    const section = page.locator("section#pricing");
    await section.scrollIntoViewIfNeeded();

    await expect(section).toBeVisible();
    await expect(
      section.getByText(landingContent.examples.headline)
    ).toBeVisible();

    for (const prop of landingContent.valueProps) {
      await expect(section.getByText(prop.title)).toBeVisible();
    }

    for (const example of landingContent.examples.windows) {
      const browserWindow = section.getByTestId(`example-browser-window-${example.id}`);
      await expect(browserWindow).toBeVisible();
      await expect(browserWindow.getByText(example.urlBar)).toBeVisible();
      await expect(browserWindow.getByText(example.brandName, { exact: true })).toBeVisible();
      await expect(
        browserWindow.locator(`img[alt="${example.brandName} preview"]`)
      ).toBeVisible();
      await expect(browserWindow).toHaveAttribute("href", example.href);
      await expect(browserWindow).toHaveAttribute("target", "_blank");
      await expect(browserWindow).toHaveAttribute("rel", "noopener noreferrer");
    }

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

    const topColor = await colorAt();

    await page.locator("section#pricing").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const midColor = await colorAt();

    await page.locator("section#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const bottomColor = await colorAt();

    expect(topColor, "top vs pricing").toEqual(midColor);
    expect(midColor, "pricing vs finale").not.toEqual(bottomColor);
  });

  test("reduced motion freezes the background and keeps accessible static content", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    await expect(page.locator("h1")).toContainText("AGENCY");
    await expect(page.getByTestId("hero-highlights")).toBeVisible();

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

  test("primary font is the new fancy display face", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const firstFamily = await page.locator("body").evaluate((el) =>
      window.getComputedStyle(el).fontFamily.split(",")[0].trim().toLowerCase()
    );

    expect(firstFamily).toContain("fraunces");
  });

  test("FAQ items are visible, interactive, and preserve native summary behavior", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section#faq");
    await section.scrollIntoViewIfNeeded();

    const firstQuestion = landingContent.faq[0];
    const details = section.locator("details").first();
    const summary = details.locator("summary").first();

    await expect(summary).toContainText(firstQuestion.q);
    await expect(details.locator(".collapse-content")).not.toBeVisible();

    await summary.click();
    await expect(details.locator(".collapse-content")).toBeVisible();
    await expect(details.locator(".collapse-content")).toContainText(
      firstQuestion.a
    );

    await summary.press("Enter");
    await expect(details.locator(".collapse-content")).not.toBeVisible();
    await summary.press("Enter");
    await expect(details.locator(".collapse-content")).toBeVisible();
  });

  test("finale section reveals stats and CTAs when scrolled into view", async ({
    page,
  }) => {
    await page.goto("/");
    const section = page.locator("section#contact");
    await section.scrollIntoViewIfNeeded();

    await expect(section).toBeVisible();
    await expect(section.locator("#elite-headline")).toContainText(
      landingContent.elite.closingHeadline.split(" ")[0]
    );

    for (const item of landingContent.elite.ribbon) {
      await expect(section.getByText(item.label)).toBeVisible();
      await expect(section.getByText(item.value)).toBeVisible();
    }

    await expect(
      section.getByRole("button", { name: landingContent.pricing.ctaLabel })
    ).toBeVisible();
    await expect(
      section.getByRole("link", { name: "Email the studio" })
    ).toBeVisible();
  });

  test("reduced motion keeps new animated surfaces static and accessible", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("h1")).toContainText("AGENCY");

    const section = page.locator("section#faq");
    await section.scrollIntoViewIfNeeded();
    const firstSummary = section.locator("details summary").first();
    await expect(firstSummary).toBeVisible();
    await firstSummary.click();
    await expect(section.locator("details .collapse-content").first()).toBeVisible();

    const finale = page.locator("section#contact");
    await finale.scrollIntoViewIfNeeded();
    await expect(
      finale.getByRole("button", { name: landingContent.pricing.ctaLabel })
    ).toBeVisible();
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
