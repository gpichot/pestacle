import React from "react";
import styled from "styled-components";

const DivWithHeading = styled.div`
  h2 {
    margin-top: 0;
  }
  h2 strong {
    color: var(--color-secondary);
    font-weight: 400;
  }
`;

const ColumnsContainer = styled(DivWithHeading)`
  display: flex;
  flex-direction: row;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  alignitems: center;
`;

export function ColumnsLayout({
  children,
  reverse,
}: {
  children: React.ReactNode;
  reverse?: boolean;
}) {
  const childrenArray = React.Children.toArray(children);
  return (
    <ColumnsContainer
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
      }}
    >
      {childrenArray.map((child, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: "100%",
            display: "flex",
            flexFlow: "column",
            justifyContent: "center",
            boxSizing: "border-box",
          }}
        >
          {child}
        </div>
      ))}
    </ColumnsContainer>
  );
}
