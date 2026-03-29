import type React from "react";

import { layoutStyles } from "../layouts/styled";

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
    <object
      className={layoutStyles.svgObject}
      type="image/svg+xml"
      data={src}
      style={{
        height: height || "100%",
        minWidth: "30cqw",
        width: width || "100%",
        ...style,
      }}
    >
      SVG
    </object>
  );
}

Image.mdxType = "Image";
