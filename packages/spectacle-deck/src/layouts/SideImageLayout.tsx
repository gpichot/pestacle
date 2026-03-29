import type React from "react";

import { Image } from "../components/Image";
import styles from "./layouts.module.css";
import { getMatchingMdxType } from "./utils";

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
    <div
      className={styles.divWithHeading}
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
          padding: isReversed ? "0 7cqw 0 4cqw" : "0 4cqw 0 7cqw",
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
    </div>
  );
};
