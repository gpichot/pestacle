import type React from "react";

import styles from "./layouts.module.css";
import { getHeading, Margins } from "./utils";

export const CenteredLayout = (
  props: React.ComponentPropsWithoutRef<"div">,
) => {
  const [heading, rest] = getHeading(props.children);
  return (
    <div
      {...props}
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: `0 ${Margins.horizontal}`,
      }}
    >
      {rest}
      <div
        className={styles.centeredContent}
        style={{
          position: "absolute",
          opacity: 0.8,
          marginBottom: "2rem",
          marginTop: "2rem",
          bottom: 0,
        }}
      >
        {heading}
      </div>
    </div>
  );
};
