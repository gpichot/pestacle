import React from "react";
import styled from "styled-components";
import { getMatchingMdxType } from "./utils";
import { BaseLayout } from "./BaseLayout";

function invariant(condition: any, message: string) {
  if (!condition) {
    throw new Error(message);
  }
}

const QuoteBaseLayout = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  .blockquote > * {
    border-left: 0;
  }
  .blockquote {
  text-align: justify;
    position: relative;
  }
  .blockquote > :first-child {
    &:before {
      content: "“";
      position: absolute;
      font-size: 16rem;
      left: -5rem;
      font-family: serif;
      top: 50%;
      transform: translateY(-50%);
      color: #ffffff22;
    }
    &:after {
      content: "”";
      position: absolute;
      font-size: 16rem;
      right: 3rem;
      bottom: -5rem;
      font-family: serif;
      color: #ffffff22;
      pointer-events: none;
    }
  }
  .blockquote * {
    line-height: 3.5rem !important;
    font-size: 2.5rem;
  }
  .source {
    font-family: Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif;
    box-sizing: border-box;
    width: 100%;
    margin-top: 4rem;
    text-align: right;
    font-size: 2rem;
    a {
      text-decoration: none;
      color: #ffffff77;
    }
  }
`;
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
    <QuoteBaseLayout>
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
    </QuoteBaseLayout>
  );
}
