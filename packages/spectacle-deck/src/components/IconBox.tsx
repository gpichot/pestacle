import React from "react";
import styled from "styled-components";

const IconBoxContent = styled.div`
  * {
    margin: 0.2rem !important;
    padding: 0 !important;
  }
`;

export function IconBox({
  children,
  icon,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem 0",
      }}
    >
      <div style={{ fontSize: 60 }}>{icon}</div>
      <IconBoxContent>{children}</IconBoxContent>
    </div>
  );
}
