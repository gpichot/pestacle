import { animated, useSpring } from "@react-spring/web";
import type React from "react";

import { useInView } from "./useInView";

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
  const [ref, isInView] = useInView();

  const styles = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView ? "scale(1)" : `scale(${from})`,
    delay: isInView ? delay : 0,
    config: { duration },
  });

  return (
    <animated.div ref={ref} style={styles}>
      {children}
    </animated.div>
  );
}
