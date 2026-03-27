import React from "react";

import styles from "./layouts.module.css";

export function ColumnsLayout({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  const childrenArray = React.Children.toArray(children);
  return (
    <div
      className={styles.columnsContainer}
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      {childrenArray.map((child, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
