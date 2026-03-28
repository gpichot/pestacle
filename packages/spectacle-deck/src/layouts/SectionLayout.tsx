import type React from "react";

import styles from "./layouts.module.css";

export const SectionLayout = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.sectionLayout}>{children}</div>
);
