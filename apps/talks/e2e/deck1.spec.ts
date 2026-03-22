import { test, expect } from "@playwright/test";

test.describe("Deck 1 - Crossing the bridge", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/deck1/", { waitUntil: "domcontentloaded" });
    // Wait for the deck to be fully rendered
    await page.locator(".spectacle-fullscreen-button").waitFor();
  });

  test("renders the title slide", async ({ page }) => {
    await expect(page.locator("text=Crossing the bridge")).toBeVisible();
    await expect(
      page.locator(
        "text=Seamless strategies for updating and migrating libraries"
      )
    ).toBeVisible();
  });

  test("title slide screenshot", async ({ page }) => {
    await expect(page).toHaveScreenshot("deck1-title-slide.png");
  });

  test("navigates to the History slide with arrow key", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("text=History")).toBeVisible();
  });

  test("History slide contains timeline items", async ({ page }) => {
    await page.keyboard.press("ArrowRight");

    await expect(page.locator("text=History")).toBeVisible();
    await expect(page.locator("text=React")).first().toBeVisible();
    await expect(page.locator("text=2011")).toBeVisible();
    await expect(page.locator("text=May 2013")).toBeVisible();
  });

  test("History slide screenshot", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("text=History")).toBeVisible();
    await expect(page).toHaveScreenshot("deck1-history-slide.png");
  });

  test("navigates to code + table slide", async ({ page }) => {
    // Navigate to 3rd slide (code block + table)
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");

    await expect(page.locator("text=Hello, world!")).toBeVisible();
    await expect(page.locator("text=foo")).toBeVisible();
    await expect(page.locator("text=bar")).toBeVisible();
    await expect(page.locator("text=baz")).toBeVisible();
  });

  test("code + table slide screenshot", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("text=Hello, world!")).toBeVisible();
    await expect(page).toHaveScreenshot("deck1-code-table-slide.png");
  });

  test("navigates to the quote slide", async ({ page }) => {
    // Navigate to the 4th slide (quote)
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("ArrowRight");
    }

    await expect(
      page.locator(
        "text=React is a JavaScript library for building user interfaces"
      )
    ).toBeVisible();
  });

  test("quote slide screenshot", async ({ page }) => {
    for (let i = 0; i < 3; i++) {
      await page.keyboard.press("ArrowRight");
    }
    await expect(
      page.locator(
        "text=React is a JavaScript library for building user interfaces"
      )
    ).toBeVisible();
    await expect(page).toHaveScreenshot("deck1-quote-slide.png");
  });

  test("navigates to 'Why should you care?' slide", async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      await page.keyboard.press("ArrowRight");
    }

    await expect(
      page.locator("text=Why should you care?")
    ).toBeVisible();
  });

  test("navigates to feedback slide with QR code", async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("ArrowRight");
    }

    await expect(page.locator("text=Feedback")).toBeVisible();
  });

  test("feedback slide screenshot", async ({ page }) => {
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press("ArrowRight");
    }
    await expect(page.locator("text=Feedback")).toBeVisible();
    await expect(page).toHaveScreenshot("deck1-feedback-slide.png");
  });

  test("can navigate back with ArrowLeft", async ({ page }) => {
    await page.keyboard.press("ArrowRight");
    await expect(page.locator("text=History")).toBeVisible();

    await page.keyboard.press("ArrowLeft");
    await expect(page.locator("text=Crossing the bridge")).toBeVisible();
  });
});
