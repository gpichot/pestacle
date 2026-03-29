import type React from "react";

import styles from "./styled.module.css";

export const Link = (props: { href: string; children: React.ReactNode }) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "var(--color-secondary)", textDecoration: "none" }}
  >
    {props.children} [{props.href}]
  </a>
);

export const Image = (props: React.ComponentProps<"img">) => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <img
      alt=""
      {...props}
      style={{
        objectFit: "contain",
        maxHeight: "30cqh",
        maxWidth: "70cqw",
        ...props.style,
      }}
    />
  </div>
);

export const CustomHeading = (props: React.ComponentProps<"h1">) => (
  <h1 {...props} className={styles.heading} />
);

export const HeadingTwo = (props: React.ComponentProps<"h2">) => (
  <h2 {...props} className={styles.headingTwo} />
);

export const HeadingThree = (props: React.ComponentProps<"h3">) => (
  <h3 {...props} className={styles.headingThree} />
);

export const CustomQuote = (props: React.ComponentProps<"blockquote">) => (
  <blockquote {...props} className={styles.quote} />
);

export const InlineCode = (props: React.ComponentProps<"code">) => (
  <code {...props} className={styles.inlineCode} />
);
