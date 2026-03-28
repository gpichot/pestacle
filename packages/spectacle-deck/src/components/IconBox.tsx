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
        padding: "1rem 0",
      }}
    >
      <div style={{ fontSize: 60 }}>{icon}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
