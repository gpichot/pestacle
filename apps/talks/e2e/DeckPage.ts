import { type Page, type Locator, expect } from "@playwright/test";

export class DeckPage {
  readonly page: Page;
  readonly fullscreenButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.fullscreenButton = page.locator(".spectacle-fullscreen-button");
  }

  async goto(deckPath: string) {
    await this.page.goto(deckPath, { waitUntil: "domcontentloaded" });
    await this.fullscreenButton.waitFor();
  }

  async nextSlide() {
    await this.page.keyboard.press("ArrowRight");
  }

  async previousSlide() {
    await this.page.keyboard.press("ArrowLeft");
  }

  async goToSlide(index: number) {
    for (let i = 0; i < index; i++) {
      await this.nextSlide();
    }
  }

  async expectTextVisible(text: string) {
    await expect(this.page.locator(`text=${text}`)).toBeVisible();
  }

  async expectTextsVisible(texts: string[]) {
    for (const text of texts) {
      await expect(this.page.locator(`text=${text}`)).toBeVisible();
    }
  }

  async expectFirstTextVisible(text: string) {
    await expect(this.page.locator(`text=${text}`).first()).toBeVisible();
  }

  async expectScreenshot(name: string) {
    await expect(this.page).toHaveScreenshot(name);
  }
}
