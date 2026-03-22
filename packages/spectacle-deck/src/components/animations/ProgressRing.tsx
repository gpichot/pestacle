import { animated, useSpring } from "@react-spring/web";
import type React from "react";

interface ProgressRingProps {
  /** Progress value from 0 to 100 */
  value: number;
  /** Ring size in pixels. Default: 120 */
  size?: number;
  /** Stroke width in pixels. Default: 8 */
  strokeWidth?: number;
  /** Ring color. Default: "var(--color-secondary)" */
  color?: string;
  /** Track color. Default: "rgba(255,255,255,0.1)" */
  trackColor?: string;
  /** Duration in milliseconds. Default: 1000 */
  duration?: number;
  /** Delay before animating in milliseconds. Default: 0 */
  delay?: number;
  /** Content to display in center */
  children?: React.ReactNode;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
  color = "var(--color-secondary)",
  trackColor = "rgba(255,255,255,0.1)",
  duration = 1000,
  delay = 0,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const { offset } = useSpring({
    from: { offset: circumference },
    to: { offset: circumference - (value / 100) * circumference },
    delay,
    config: { duration },
  });

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width={size}
        height={size}
        style={{ position: "absolute", transform: "rotate(-90deg)" }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <animated.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {children && (
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      )}
    </div>
  );
}
