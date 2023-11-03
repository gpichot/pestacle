import React from "react";
import styled from "styled-components";
import { SVGObject } from "./styled";
import { getMatchingMdxType } from "./utils";
import { Image } from "../components/Image";

const DivWithHeading = styled.div`
  h2 {
    margin-top: 0;
  }
  h2 strong {
    color: #f49676;
    font-weight: 400;
  }
`;

export const SidedImageLayout = ({
  children,
  image,
  position,
  height,
}: {
  children: React.ReactNode;
  image?: string;
  position?: "left" | "right";
  height?: number;
}) => {
  const isReversed = position === "left";
  const [component, rest] = getMatchingMdxType(children, "Image") || image;

  if (!image && !component.length) {
    console.error("No image provided for SidedImageLayout");
    return null;
  }
  return (
    <DivWithHeading
      style={{
        display: "flex",
        flexDirection: isReversed ? "row-reverse" : "row",
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isReversed ? "0 7rem 0 4rem" : "0 4rem 0 7rem",
        }}
      >
        {rest}
      </div>
      <div
        style={{
          flex: 1,
          maxWidth: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        {component || <Image src={image} />}
      </div>
    </DivWithHeading>
  );
};
