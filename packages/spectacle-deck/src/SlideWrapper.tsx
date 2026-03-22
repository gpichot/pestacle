import type React from "react";

import { usePestacle } from "./context";

export function SlideWrapper({
  children,
  frontmatter,
}: {
  children: React.ReactNode;
  frontmatter: { layout?: string };
}) {
  const { layouts } = usePestacle();
  const layoutName = frontmatter?.layout || "default";
  const Layout = layoutName in layouts ? layouts[layoutName] : null;

  if (layoutName && layoutName !== "default" && !Layout) {
    throw new Error(
      `Layout "${layoutName}" not found. Available layouts: ${Object.keys(layouts).join(", ")}`,
    );
  }

  if (Layout) {
    return <Layout {...frontmatter}>{children}</Layout>;
  }

  return <>{children}</>;
}
