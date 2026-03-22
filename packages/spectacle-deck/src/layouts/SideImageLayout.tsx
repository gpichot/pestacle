import type React from "react";
import styled from "styled-components";
import { Image } from "../components/Image";
import { getMatchingMdxType } from "./utils";

const DivWithHeading = styled.div`
  h2 {
    margin-top: 0;
  }
  h2 strong {
    color: var(--color-secondary);
    font-weight: 400;
  }
`;

/**
 * Parse a ratio like 6/5
 */
function parseRatio(ratio: string) {
  const [a, b] = ratio.split("/");
  return { left: parseInt(a, 10), right: parseInt(b, 10) };
}

export const SidedImageLayout = ({
  children,
  image,
  position,
  height,
  ratio: ratioProp,
}: {
  children: React.ReactNode;
  image?: string;
  position?: "left" | "right";
  ratio?: string;
  height?: number;
}) => {
  const isReversed = position === "left";
  const [component, rest] = getMatchingMdxType(children, "Image") || image;
  const ratio = parseRatio(ratioProp || "6/4");

  if (!image && !component.length) {
    console.error("No image provided for SidedImageLayout");
    return null;
  }
  return (
    <DivWithHeading
      style={{
        display: "flex",
        flexDirection: isReversed ? "row-reverse" : "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <div
        style={{
          flex: `${ratio.left || 6} 0`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isReversed ? "0 7rem 0 4rem" : "0 4rem 0 7rem",
        }}
      >
        {rest}
      </div>
      <div
        style={{
          flex: `${ratio.right || 4} 0`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {component || <Image src={image} />}
      </div>
    </DivWithHeading>
  );
};
