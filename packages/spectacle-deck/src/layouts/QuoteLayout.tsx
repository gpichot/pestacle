import type React from "react";

import styles from "./layouts.module.css";
import { getMatchingMdxType } from "./utils";

function invariant(condition: any, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

export function QuoteLayout({
  children,
  author,
  sourceUrl,
}: {
  children: React.ReactNode;
  author: string;
  sourceUrl?: string;
}) {
  const [blockquote, rest] = getMatchingMdxType(children, "blockquote");
  invariant(rest, "QuoteLayout can only have one blockquote");
  return (
    <div className={styles.quoteBase}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          textAlign: "center",
          margin: "0 4rem 0 12rem",
        }}
      >
        <div
          style={{
            flex: 1,
            padding: "0 12rem 0 2rem",
            boxSizing: "border-box",
          }}
          className="blockquote"
        >
          {blockquote}
        </div>
        <div className="source" style={{ flex: 1, padding: "0 4rem" }}>
          {
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {author}
            </a>
          }
        </div>
      </div>
    </div>
  );
}
