import type React from "react";

import styles from "./IconBox.module.css";

export function IconBox({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1cqh 0",
      }}
    >
      <div style={{ fontSize: "3.125cqw" }}>{icon}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
