import React from "react";

export default function FilePane({
  name,
  children,
  priority,
  minWidth,
  ...divProps
}: React.ComponentProps<"div"> & {
  name: string;
  priority?: number;
  minWidth?: string;
}) {
  const content = React.isValidElement(children)
    ? React.cloneElement(children, {
        // @ts-expect-error cloning
        priority,
        name,
      })
    : children;

  if (minWidth) {
    return (
      <div {...divProps} style={{ minWidth, ...divProps.style }}>
        {content}
      </div>
    );
  }

  return content;
}

FilePane.mdxType = "FilePane";
