import { animated, useSpring } from "@react-spring/web";
import type React from "react";

interface ScaleInProps {
  children: React.ReactNode;
  /** Initial scale. Default: 0 */
  from?: number;
  /** Delay in milliseconds. Default: 0 */
  delay?: number;
  /** Duration in milliseconds. Default: 400 */
  duration?: number;
}

export function ScaleIn({
  children,
  from = 0,
  delay = 0,
  duration = 400,
}: ScaleInProps) {
  const styles = useSpring({
    from: { opacity: 0, transform: `scale(${from})` },
    to: { opacity: 1, transform: "scale(1)" },
    delay,
    config: { duration },
  });

  return <animated.div style={styles}>{children}</animated.div>;
}
