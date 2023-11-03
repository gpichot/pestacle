import React from "react";
import { SVGObject } from "../layouts/styled";

export interface ImageProps extends React.ComponentProps<"img"> {}

export function Image(props: ImageProps) {
  const { src, height } = props;
  if (!src?.endsWith(".svg")) {
    return (
      <img
        src={src}
        alt="image"
        style={{
          height: height || "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    );
  }
  return (
    <SVGObject
      type="image/svg+xml"
      data={src}
      style={{
        height: height || "100%",
        minWidth: "30vw",
        width: "100%",
      }}
    />
  );
}

Image.mdxType = "Image";
