import type React from "react";

import styles from "./DocumentationItem.module.css";

export function Doc({
  label,
  link,
  children,
}: {
  label: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.docWrapper}>
      <div className={styles.docContainer}>
        {children && <div className={styles.docContent}>{children}</div>}
        <div>
          <a
            className={styles.docLink}
            target="_blank"
            rel="noopener noreferrer"
            href={link}
          >
            {label}
          </a>
        </div>
      </div>
    </div>
  );
}

export function DocItem({ label, link }: { label: string; link: string }) {
  return (
    <a
      className={styles.docLinkItem}
      target="_blank"
      rel="noopener noreferrer"
      href={link}
    >
      {label}
    </a>
  );
}
