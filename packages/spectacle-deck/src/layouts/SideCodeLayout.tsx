import type React from "react";

import { ColumnsLayout } from "./columns";
import styles from "./layouts.module.css";
import { getCodeChildren, Margins } from "./utils";

export function SidedCodeLayout({
  children,
  position = "right",
}: {
  children: React.ReactNode;
  position?: "left" | "right";
}) {
  const [code, rest] = getCodeChildren(children);

  return (
    <ColumnsLayout reverse={position === "left"}>
      <div
        style={{
          marginLeft: Margins.horizontal,
          paddingRight: Margins.horizontalInternal,
        }}
      >
        {rest}
      </div>
      <div
        className={styles.codeSide}
        style={{
          backgroundColor: "#1d2021",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {code}
      </div>
    </ColumnsLayout>
  );
}
