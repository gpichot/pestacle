import type React from "react";

interface SpotlightProps {
  children: React.ReactNode;
  /** Whether the spotlight is active. Default: true */
  active?: boolean;
  /** Opacity of the dimmed overlay. Default: 0.7 */
  dimOpacity?: number;
}

export function Spotlight({
  children,
  active = true,
  dimOpacity = 0.7,
}: SpotlightProps) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: `rgba(0, 0, 0, ${active ? dimOpacity : 0})`,
          pointerEvents: active ? "auto" : "none",
          transition: "background 0.4s ease",
          zIndex: 99,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: active ? 100 : "auto",
        }}
      >
        {children}
      </div>
    </>
  );
}
