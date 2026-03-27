import { animated, useSpring } from "@react-spring/web";
import React from "react";

import { Stepper } from "../engine/Stepper";
import styles from "./HorizontalList.module.css";

export default function HorizontalList({
  children,
  columns = 3,
}: {
  columns?: number;
  children: React.ReactNode;
}) {
  const items = React.Children.toArray(children);
  return (
    <Stepper values={items}>
      {(_, step) => (
        <div
          className={styles.container}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
          }}
        >
          {items.map((item, k) => {
            if (!React.isValidElement(item)) {
              return item;
            }
            return React.cloneElement(item, {
              // @ts-expect-error cloning
              position: k + 1,
              isVisible: k <= step,
              isLast: k === step,
            });
          })}
        </div>
      )}
    </Stepper>
  );
}

function Pill({ position }: { position: number }) {
  return (
    <div
      style={{ width: 48, transform: "translate(-25%, -25%)", opacity: 0.9 }}
    >
      <svg
        width="48"
        height="48"
        viewBox="0 0 18 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.64717 20L0 15.0094V5.00134L8.64717 0L17.289 5.00134V15.0094L8.64717 20ZM1.48222 14.141L8.64717 18.2846L15.8068 14.141V5.85902L8.64717 1.71536L1.48222 5.85902V14.141Z"
          fill="#ffffff"
        />
        <text
          x="9"
          y="11"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#f49676"
          style={{ fontSize: "50%" }}
        >
          {position}
        </text>
        <path
          d="M 8.758 16.01 L 3.549 13.004 L 3.549 6.975 L 8.758 3.963 L 13.964 6.975 L 13.964 13.004 L 8.758 16.01 Z"
          fill="transparent"
        />
      </svg>
    </div>
  );
}

function getItemOpacity({
  isLast,
  isVisible,
}: {
  isLast?: boolean;
  isVisible?: boolean;
}) {
  if (isLast) return 1;
  if (isVisible) return 0.7;
  return 0;
}
export function HorizontalListItem({
  title,
  children,
  position,
  isVisible,
  isLast,
}: {
  title: string;
  position: number;
  isVisible?: boolean;
  isLast?: boolean;
  children: React.ReactNode;
}) {
  const opacityStyles = useSpring({
    opacity: getItemOpacity({ isVisible, isLast }),
  });
  return (
    <animated.div className={styles.item} style={opacityStyles}>
      <div className={styles.itemHead}>
        <Pill position={position} />
        <p>{title}</p>
      </div>

      <div className={styles.itemContent}>{children}</div>
    </animated.div>
  );
}
