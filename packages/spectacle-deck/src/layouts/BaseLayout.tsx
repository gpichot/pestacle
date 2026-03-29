import type React from "react";

import styles from "./layouts.module.css";

export const BaseLayout = ({
  children,
  title,
  ...otherProps
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"div">, "title">) => {
  return (
    <div
      {...otherProps}
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
      {title && <div className={styles.defaultLayoutHeading}>{title}</div>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: "0 4cqw",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
