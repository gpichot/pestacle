import { test } from "@playwright/test";

import { DeckPage } from "./DeckPage";

test.describe("Deck 1 - Crossing the bridge", () => {
  let deck: DeckPage;

  test.beforeEach(async ({ page }) => {
    deck = new DeckPage(page);
    await deck.goto("/deck1/");
  });

  test("renders the title slide", async () => {
    await deck.expectTextsVisible([
      "Crossing the bridge",
      "Seamless strategies for updating and migrating libraries",
    ]);
  });

  test("title slide screenshot", async () => {
    await deck.expectScreenshot("deck1-title-slide.png");
  });

  test("navigates to the History slide with arrow key", async () => {
    await deck.nextSlide();
    await deck.expectTextVisible("History");
  });

  test("History slide contains timeline items", async () => {
    await deck.goToSlide(1);

    await deck.expectTextVisible("History");
    await deck.expectFirstTextVisible("React");
    await deck.expectTextsVisible(["2011", "May 2013"]);
  });

  test("History slide screenshot", async () => {
    await deck.goToSlide(1);
    await deck.expectTextVisible("History");
    await deck.expectScreenshot("deck1-history-slide.png");
  });

  test("navigates to code + table slide", async () => {
    await deck.goToSlide(2);

    await deck.expectTextsVisible(["Hello, world!", "foo", "bar", "baz"]);
  });

  test("code + table slide screenshot", async () => {
    await deck.goToSlide(2);
    await deck.expectTextVisible("Hello, world!");
    await deck.expectScreenshot("deck1-code-table-slide.png");
  });

  test("navigates to the quote slide", async () => {
    await deck.goToSlide(3);

    await deck.expectTextVisible(
      "React is a JavaScript library for building user interfaces",
    );
  });

  test("quote slide screenshot", async () => {
    await deck.goToSlide(3);
    await deck.expectTextVisible(
      "React is a JavaScript library for building user interfaces",
    );
    await deck.expectScreenshot("deck1-quote-slide.png");
  });

  test("navigates to 'Why should you care?' slide", async () => {
    await deck.goToSlide(4);

    await deck.expectTextVisible("Why should you care?");
  });

  test("navigates to feedback slide with QR code", async () => {
    await deck.goToSlide(5);

    await deck.expectTextVisible("Feedback");
  });

  test("feedback slide screenshot", async () => {
    await deck.goToSlide(5);
    await deck.expectTextVisible("Feedback");
    await deck.expectScreenshot("deck1-feedback-slide.png");
  });

  test("can navigate back with ArrowLeft", async () => {
    await deck.nextSlide();
    await deck.expectTextVisible("History");

    await deck.previousSlide();
    await deck.expectTextVisible("Crossing the bridge");
  });
});
