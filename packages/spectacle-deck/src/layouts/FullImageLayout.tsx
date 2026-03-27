import React from "react";

import styles from "./layouts.module.css";
import { getMatchingMdxType } from "./utils";

export function FullImageLayout({
  children,
  image,
  position = "bottom",
  dim = 0,
  fit = "cover",
  backgroundColor,
  margin,
  padding,
}: {
  children: React.ReactNode;
  image?: string;
  position?: "center" | "bottom" | "top";
  dim?: number;
  fit?: "cover" | "contain";
  backgroundColor?: string;
  margin?: string;
  padding?: string;
}) {
  const [images, rest] = getMatchingMdxType(children, "Image");
  const firstImage = images[0];

  const backgroundImage =
    image ||
    (React.isValidElement<{ src?: string }>(firstImage)
      ? firstImage.props.src
      : undefined);

  const justifyMap = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: backgroundImage
            ? `url(${backgroundImage})`
            : undefined,
          backgroundSize: fit,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundOrigin: padding ? "content-box" : undefined,
          backgroundColor: backgroundColor,
          margin: margin,
          padding: padding,
        }}
      />
      {dim > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: `rgba(0, 0, 0, ${dim})`,
          }}
        />
      )}
      <div
        className={styles.fullImageOverlay}
        style={{
          justifyContent: justifyMap[position],
          ...(padding ? { padding } : {}),
        }}
      >
        {firstImage ? rest : children}
      </div>
    </div>
  );
}
