import { animated, useSprings } from "@react-spring/web";
import React from "react";

import { useInView } from "./useInView";

interface StaggerChildrenProps {
  children: React.ReactNode;
  /** Delay between each child in milliseconds. Default: 100 */
  stagger?: number;
  /** Initial delay before first child animates. Default: 0 */
  delay?: number;
  /** Animation duration per child in milliseconds. Default: 400 */
  duration?: number;
  /** Direction to fade in from. Default: "up" */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Distance in pixels for the translate. Default: 20 */
  distance?: number;
}

export function StaggerChildren({
  children,
  stagger = 100,
  delay = 0,
  duration = 400,
  direction = "up",
  distance = 20,
}: StaggerChildrenProps) {
  const [ref, isInView] = useInView();
  const items = React.Children.toArray(children);

  const translateMap = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "translate(0, 0)",
  };

  const springs = useSprings(
    items.length,
    items.map((_, i) => ({
      opacity: isInView ? 1 : 0,
      transform: isInView ? "translate(0, 0)" : translateMap[direction],
      delay: isInView ? delay + i * stagger : 0,
      config: { duration },
    })),
  );

  return (
    <div ref={ref}>
      {springs.map((style, i) => (
        <animated.div key={i} style={style}>
          {/* @ts-expect-error react-spring types lag behind React 19 ReactNode */}
          {items[i]}
        </animated.div>
      ))}
    </div>
  );
}
