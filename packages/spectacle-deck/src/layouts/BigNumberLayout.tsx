import type React from "react";
import styled from "styled-components";

import { getHeading, Margins } from "./utils";

const BigValue = styled.div`
  font-family: Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 10rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-secondary);
  text-align: center;
`;

const Caption = styled.div`
  font-family: Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 2rem;
  font-weight: 400;
  color: #ffffffcc;
  text-align: center;
  margin-top: 2rem;
  max-width: 70%;
`;

export function BigNumberLayout({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  const [heading, rest] = getHeading(children);
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: `0 ${Margins.horizontal}`,
      }}
    >
      {heading && (
        <div
          style={{
            position: "absolute",
            top: "3rem",
            opacity: 0.6,
          }}
        >
          {heading}
        </div>
      )}
      <BigValue>{value}</BigValue>
      <Caption>{rest}</Caption>
    </div>
  );
}
