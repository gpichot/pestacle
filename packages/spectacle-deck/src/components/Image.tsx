import type React from "react";

import { SVGObject } from "../layouts/styled";

export interface ImageProps extends React.ComponentProps<"img"> {}

export function Image(props: ImageProps) {
  const { src, height, width, style, ...otherProps } = props;
  if (!src?.endsWith(".svg")) {
    return (
      <img
        alt=""
        src={src}
        {...otherProps}
        style={{
          width,
          height: height || "100%",
          objectFit: "cover",
          objectPosition: "center",
          ...style,
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
        width: width || "100%",
        ...style,
      }}
    />
  );
}

Image.mdxType = "Image";
