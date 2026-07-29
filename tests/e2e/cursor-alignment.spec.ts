import { test, expect } from "@playwright/test";

async function assertDotAlignedWith(page: import("@playwright/test").Page, targetX: number, targetY: number) {
  await page.mouse.move(targetX, targetY);

  await expect
    .poll(async () => {
      const center = await page
        .getByTestId("site-cursor-dot")
        .evaluate((dot) => {
          const rect = dot.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          };
        });

      return Math.max(
        Math.abs(center.x - targetX),
        Math.abs(center.y - targetY),
      );
    })
    .toBeLessThanOrEqual(8);
}

test("cursor dot aligns on book-a-call and live-work hover targets", async ({ page, isMobile }) => {
  test.skip(isMobile, "custom cursor is disabled on non-fine pointers");

  await page.goto("/");
  await page.waitForLoadState("networkidle");

  await expect(page.getByTestId("site-cursor-dot")).toHaveCount(1);
  await expect(page.getByTestId("site-cursor-label")).toHaveCount(1);

  const trigger = page.getByTestId("booking-trigger").first();
  await trigger.scrollIntoViewIfNeeded();
  const triggerBox = await trigger.boundingBox();
  if (!triggerBox) throw new Error("Booking trigger has no bounding box");
  await assertDotAlignedWith(
    page,
    triggerBox.x + triggerBox.width / 2,
    triggerBox.y + triggerBox.height / 2
  );

  const gymLink = page.getByTestId("work-link-ironhaus");
  await gymLink.scrollIntoViewIfNeeded();
  const gymBox = await gymLink.boundingBox();
  if (!gymBox) throw new Error("Ironhaus work link has no bounding box");
  await assertDotAlignedWith(
    page,
    gymBox.x + gymBox.width / 2,
    gymBox.y + gymBox.height / 2
  );
});
