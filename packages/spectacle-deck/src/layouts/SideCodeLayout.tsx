import type React from "react";
import styled from "styled-components";

import { ColumnsLayout } from "./columns";
import { getCodeChildren, Margins } from "./utils";

const CodeSide = styled.div`
  pre {
    font-size: 0.9rem;
  }
`;

export function SidedCodeLayout({
  children,
  position = "right",
}: {
  children: React.ReactNode;
  position?: "left" | "right";
}) {
  const [code, rest] = getCodeChildren(children);

  return (
    <ColumnsLayout reverse={position === "left"}>
      <div
        style={{
          marginLeft: Margins.horizontal,
          paddingRight: Margins.horizontalInternal,
        }}
      >
        {rest}
      </div>
      <CodeSide
        style={{
          backgroundColor: "#1d2021",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {code}
      </CodeSide>
    </ColumnsLayout>
  );
}
