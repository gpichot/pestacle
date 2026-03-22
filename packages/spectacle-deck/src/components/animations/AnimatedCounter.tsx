import { animated, useSpring } from "@react-spring/web";

import { useInView } from "./useInView";

interface AnimatedCounterProps {
  /** Target number to count to */
  to: number;
  /** Starting number. Default: 0 */
  from?: number;
  /** Duration in milliseconds. Default: 1500 */
  duration?: number;
  /** Delay before starting in milliseconds. Default: 0 */
  delay?: number;
  /** Number of decimal places. Default: 0 */
  decimals?: number;
  /** Prefix string (e.g. "$"). Default: "" */
  prefix?: string;
  /** Suffix string (e.g. "%"). Default: "" */
  suffix?: string;
}

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1500,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
}: AnimatedCounterProps) {
  const [ref, isInView] = useInView<HTMLSpanElement>();

  const { value } = useSpring({
    value: isInView ? to : from,
    delay: isInView ? delay : 0,
    config: { duration },
  });

  return (
    <animated.span ref={ref} style={{ fontFamily: "var(--font-family)" }}>
      {value.to((v) => `${prefix}${v.toFixed(decimals)}${suffix}`)}
    </animated.span>
  );
}
