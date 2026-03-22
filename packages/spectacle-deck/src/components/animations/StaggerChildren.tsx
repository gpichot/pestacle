import { animated, useSprings } from "@react-spring/web";
import React from "react";

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
      from: { opacity: 0, transform: translateMap[direction] },
      to: { opacity: 1, transform: "translate(0, 0)" },
      delay: delay + i * stagger,
      config: { duration },
    })),
  );

  return (
    <>
      {springs.map((style, i) => (
        <animated.div key={i} style={style}>
          {items[i]}
        </animated.div>
      ))}
    </>
  );
}
