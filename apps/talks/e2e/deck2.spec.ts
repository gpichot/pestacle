import { test } from "@playwright/test";

import { DeckPage } from "./DeckPage";

test.describe("Deck 2 - Hello World", () => {
  let deck: DeckPage;

  test.beforeEach(async ({ page }) => {
    deck = new DeckPage(page);
    await deck.goto("/deck2/");
  });

  test("renders the Hello World heading", async () => {
    await deck.expectTextVisible("Hello World 2");
  });

  test("Hello World slide screenshot", async () => {
    await deck.expectTextVisible("Hello World 2");
    await deck.expectScreenshot("deck2-hello-world.png");
  });
});
