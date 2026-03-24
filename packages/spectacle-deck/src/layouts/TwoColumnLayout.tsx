import React from "react";

import { getHeading, Margins } from "./utils";

function splitAtSeparator(children: React.ReactNode) {
  const allChildren = React.Children.toArray(children);

  const separatorIndex = allChildren.findIndex((child) => {
    if (!React.isValidElement<{ originalType?: string }>(child)) return false;
    return child.props.originalType === "hr";
  });

  if (separatorIndex === -1) {
    const mid = Math.ceil(allChildren.length / 2);
    return [allChildren.slice(0, mid), allChildren.slice(mid)];
  }

  return [
    allChildren.slice(0, separatorIndex),
    allChildren.slice(separatorIndex + 1),
  ];
}

export function TwoColumnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [heading, rest] = getHeading(children);
  const [left, right] = splitAtSeparator(rest);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        marginBottom: "5rem",
      }}
    >
      {heading && (
        <div
          style={{
            backgroundColor: "#ffffff11",
            padding: "2rem 5rem",
            marginBottom: "1rem",
          }}
        >
          {heading}
        </div>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          gap: "2rem",
          padding: `0 ${Margins.horizontal}`,
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1 }}>{left}</div>
        <div style={{ flex: 1 }}>{right}</div>
      </div>
    </div>
  );
}
