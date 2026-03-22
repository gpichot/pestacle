import type React from "react";
import styled from "styled-components";

interface SpotlightProps {
  children: React.ReactNode;
  /** Whether the spotlight is active. Default: true */
  active?: boolean;
  /** Opacity of the dimmed overlay. Default: 0.7 */
  dimOpacity?: number;
}

const Overlay = styled.div<{ $active: boolean; $dimOpacity: number }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, ${(p) => (p.$active ? p.$dimOpacity : 0)});
  pointer-events: ${(p) => (p.$active ? "auto" : "none")};
  transition: background 0.4s ease;
  z-index: 99;
`;

const Content = styled.div<{ $active: boolean }>`
  position: relative;
  z-index: ${(p) => (p.$active ? 100 : "auto")};
`;

export function Spotlight({
  children,
  active = true,
  dimOpacity = 0.7,
}: SpotlightProps) {
  return (
    <>
      <Overlay $active={active} $dimOpacity={dimOpacity} />
      <Content $active={active}>{children}</Content>
    </>
  );
}
