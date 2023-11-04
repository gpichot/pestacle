import React from "react";

export default function FilePane({
  name,
  children,
  priority,
  ...divProps
}: React.ComponentProps<"div"> & { name: string; priority?: number }) {
  return React.isValidElement(children)
    ? React.cloneElement(children, {
        // @ts-expect-error cloning
        priority,
        name,
      })
    : children;
}

FilePane.mdxType = "FilePane";
