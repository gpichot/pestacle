import React from "react";
import { Deck as SpectacleDeck, Slide } from "spectacle";

export type SlideType = {
  slideComponent: React.ElementType<unknown>;
};

export type DeckType = {
  metadata: Record<string, unknown>;
  slides: SlideType[];
};

export function Deck({ deck }: { deck: DeckType }) {
  return (
    <React.StrictMode>
      <SpectacleDeck>
        {deck.slides.map((slide, i) => {
          const Component = slide.slideComponent;
          return (
            <Slide key={i}>
              <Component />
            </Slide>
          );
        })}
      </SpectacleDeck>
    </React.StrictMode>
  );
}
