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

export function Danger({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "red" }}>{children}</div>;
}

export function Doc({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "blue" }}>{children}</div>;
}

export function FilePane({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "green" }}>{children}</div>;
}

export function Information({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "orange" }}>{children}</div>;
}

export function ItemsColumn({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "items" }}>{children}</div>;
}

export function Success({ children }: { children: React.ReactNode }) {
  return <div style={{ color: "green" }}>{children}</div>;
}

export function Side({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
