import { animated, useSpring } from "@react-spring/web";
import type React from "react";

interface FadeInProps {
  children: React.ReactNode;
  /** Direction to fade in from. Default: "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance in pixels for the translate. Default: 20 */
  distance?: number;
  /** Delay in milliseconds before animation starts. Default: 0 */
  delay?: number;
  /** Duration in milliseconds. Default: 400 */
  duration?: number;
}

export function FadeIn({
  children,
  direction = "up",
  distance = 20,
  delay = 0,
  duration = 400,
}: FadeInProps) {
  const translateMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "translate(0, 0)",
  };

  const styles = useSpring({
    from: { opacity: 0, transform: translateMap[direction] },
    to: { opacity: 1, transform: "translate(0, 0)" },
    delay,
    config: { duration },
  });

  return <animated.div style={styles}>{children}</animated.div>;
}
