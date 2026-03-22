import type React from "react";

import { ColumnsLayout } from "./columns";
import { getMatchingMdxType, Margins } from "./utils";

export function SideLayout({
  children,
  position = "right",
}: {
  children: React.ReactNode;
  position?: "right" | "left";
}) {
  const [side, rest] = getMatchingMdxType(children, "Side");
  return (
    <ColumnsLayout reverse={position === "left"}>
      <div style={{ marginLeft: Margins.horizontal }}>{rest}</div>
      <div
        style={{
          marginLeft: Margins.horizontalInternal,
          padding: `0 ${Margins.vertical}`,
          backgroundColor: "#00000044",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {side}
      </div>
    </ColumnsLayout>
  );
}
