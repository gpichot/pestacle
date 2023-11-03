import React from "react";
import { animated, useSpring } from "react-spring";
import classnames from "classnames";
import { Stepper } from "spectacle";

import styles from "./Timeline.module.scss";

export default function Timeline(props: React.ComponentPropsWithoutRef<"div">) {
  const children = React.Children.toArray(props.children);
  return (
    <Stepper {...props} values={children} className={styles["timeline"]}>
      {(value, step) => {
        return children.map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return React.cloneElement(child, {
            isPhantom: step < index,
            isLast: step === index,
          });
        });
      }}
    </Stepper>
  );
}

function getItemOpacity({
  isLast,
  isPhantom,
}: {
  isLast?: boolean;
  isPhantom?: boolean;
}) {
  if (isPhantom) return 0;
  if (isLast) return 1;
  return 0.5;
}

export function TimelineItem(
  props: React.ComponentPropsWithoutRef<"div"> & {
    isPhantom?: boolean;
    isLast?: boolean;
  }
) {
  const { children, title, isPhantom, isLast, ...rest } = props;
  const guideLineProps = useSpring({
    width: isPhantom || isLast ? "0%" : "100%",
  });
  const appearStyles = useSpring({
    opacity: getItemOpacity({ isPhantom, isLast }),
  });
  const colorStyles = useSpring({ opacity: isPhantom || isLast ? 1 : 0.15 });
  return (
    <animated.div
      {...rest}
      className={styles["timelineItem"]}
      style={{
        ...appearStyles,
      }}
    >
      <div
        className={classnames(
          styles["timelineItemContent"],
          styles["timelineItemContentPhantom"]
        )}
      >
        <div className={styles["timelineItemTitle"]}>{title}</div>
        <div className={styles["timelineItemBody"]}>{children}</div>
      </div>
      <animated.div className={styles["timelineItemGuide"]} style={colorStyles}>
        <Hexagon />
        <animated.div
          className={styles["timelineItemGuideLine"]}
          style={guideLineProps}
        />
      </animated.div>
      <div className={styles["timelineItemContent"]}>
        <div className={styles["timelineItemTitle"]}>{title}</div>
        <div className={styles["timelineItemBody"]}>{children}</div>
      </div>
    </animated.div>
  );
}

function Hexagon() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.64717 20L0 15.0094V5.00134L8.64717 0L17.289 5.00134V15.0094L8.64717 20ZM1.48222 14.141L8.64717 18.2846L15.8068 14.141V5.85902L8.64717 1.71536L1.48222 5.85902V14.141Z"
        fill="#F49676"
      ></path>
      <path
        d="M 8.758 16.01 L 3.549 13.004 L 3.549 6.975 L 8.758 3.963 L 13.964 6.975 L 13.964 13.004 L 8.758 16.01 Z"
        fill="#F49676"
      ></path>
    </svg>
  );
}
