import type React from "react";

import styles from "./layouts.module.css";
import { getHeading, getMatchingMdxType, Margins } from "./utils";

export function TwoColumnLayout({ children }: { children: React.ReactNode }) {
  const [heading, rest] = getHeading(children);
  const [columnContent, leftContent] = getMatchingMdxType(rest, "Column");

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        marginBottom: "5cqh",
      }}
    >
      {heading && (
        <div
          style={{
            backgroundColor: "#ffffff11",
            padding: "2cqh 5cqw",
            marginBottom: "1cqh",
          }}
        >
          {heading}
        </div>
      )}
      <div
        className={styles.responsiveRow}
        style={{
          flex: 1,
          gap: "2cqw",
          padding: `0 ${Margins.horizontal}`,
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>{leftContent}</div>
        <div style={{ flex: 1 }}>{columnContent}</div>
      </div>
    </div>
  );
}
