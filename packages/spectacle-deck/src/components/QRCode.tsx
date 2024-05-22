import QrCreator from "qr-creator";
import React, { useContext } from "react";
import { DeckContext } from "spectacle";

export interface QRCodeProps {
  url: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const MapSize = {
  xs: 64,
  sm: 128,
  md: 256,
  lg: 512,
};

export function QRCode({ url, size = "md" }: QRCodeProps) {
  const id = React.useId().replace(/:/g, "___");
  const deck = useContext(DeckContext);
  const width = MapSize[size];
  const backgroundColor = deck.theme?.colors?.primary || "#ffffff";

  React.useEffect(() => {
    const element = document.querySelector(`#${id}`);

    if (!element) return console.error("QRCode element not mounted");

    QrCreator.render(
      {
        text: url,
        radius: 0.5,
        ecLevel: "H", // L, M, Q, H
        fill: deck.theme?.colors?.secondary || "#000000",
        background: backgroundColor,
        size: width,
      },
      element as HTMLElement,
    );

    return () => {
      element.replaceChildren();
    };
  }, [url]);

  return (
    <div
      id={id}
      style={{
        padding: "1rem 1rem 0.6rem 1rem",
        borderRadius: "1rem",
        backgroundColor,
      }}
    />
  );
}
