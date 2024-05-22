import React from "react";
import { usePestacle } from "./context";

export function SlideWrapper({
  children,
  frontmatter,
}: {
  children: React.ReactNode;
  frontmatter: { layout?: string };
}) {
  const { layouts } = usePestacle();
  const layout = frontmatter?.layout || "default";
  console.log(layouts, layout);
  const Layout = layout in layouts ? layouts[layout] : null;

  if (layout && !Layout) {
    console.warn(`Layout ${layout} not found`);
  }

  if (Layout) {
    return <Layout {...frontmatter}>{children}</Layout>;
  }

  return <>{children}</>;
}
