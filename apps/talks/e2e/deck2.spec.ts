import { test, expect } from "@playwright/test";

test.describe("Deck 2 - Hello World", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/deck2/", { waitUntil: "domcontentloaded" });
    await page.locator(".spectacle-fullscreen-button").waitFor();
  });

  test("renders the Hello World heading", async ({ page }) => {
    await expect(page.locator("text=Hello World 2")).toBeVisible();
  });

  test("Hello World slide screenshot", async ({ page }) => {
    await expect(page.locator("text=Hello World 2")).toBeVisible();
    await expect(page).toHaveScreenshot("deck2-hello-world.png");
  });
});
