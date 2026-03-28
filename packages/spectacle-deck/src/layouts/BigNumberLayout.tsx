import type React from "react";

import styles from "./layouts.module.css";
import { getHeading, Margins } from "./utils";

export function BigNumberLayout({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  const [heading, rest] = getHeading(children);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: `0 ${Margins.horizontal}`,
      }}
    >
      {heading && (
        <div
          style={{
            position: "absolute",
            top: "3rem",
            opacity: 0.6,
          }}
        >
          {heading}
        </div>
      )}
      <div className={styles.bigValue}>{value}</div>
      <div className={styles.bigCaption}>{rest}</div>
    </div>
  );
}
