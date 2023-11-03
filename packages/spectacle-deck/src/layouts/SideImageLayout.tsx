import React from "react";
import styled from "styled-components";
import { SVGObject } from "./styled";

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

  if (!image) {
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
        {children}
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
        {!image.endsWith(".svg") ? (
          <img
            src={image}
            alt="image"
            style={{
              height: height || "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <SVGObject
            type="image/svg+xml"
            data={image}
            style={{
              height: height || "100%",
              minWidth: "30vw",
              width: "100%",
            }}
          />
        )}
      </div>
    </DivWithHeading>
  );
};
