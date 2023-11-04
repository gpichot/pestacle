import React from "react";
import styled from "styled-components";
import { Margins, getHeading } from "./utils";

const CenteredLayoutContent = styled.div`
  h2,
  h3 {
  }
`;
export const CenteredLayout = (
  props: React.ComponentPropsWithoutRef<"div">
) => {
  const [heading, rest] = getHeading(props.children);
  return (
    <div
      {...props}
      style={{
        height: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: `0 ${Margins.horizontal}`,
      }}
    >
      {rest}
      <CenteredLayoutContent
        style={{
          position: "absolute",
          opacity: 0.8,
          marginBottom: "2rem",
          marginTop: "2rem",
          bottom: 0,
        }}
      >
        {heading}
      </CenteredLayoutContent>
    </div>
  );
};
