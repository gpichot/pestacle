import { animated, useSpring } from "@react-spring/web";
import React from "react";

import { Stepper } from "../engine/Stepper";
import styles from "./ItemsColumn.module.css";

export function ItemsColumn(divProps: React.ComponentProps<"div">) {
  const { style, children, ...props } = divProps;
  const childrenArray = React.Children.toArray(children);
  return (
    <Stepper values={childrenArray}>
      {(_value, step) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyItems: "center",
            alignItems: "stretch",
            height: "100%",
            rowGap: "2rem",
            ...style,
          }}
          {...props}
        >
          {childrenArray.map((child, index) => {
            const isVisible = index <= step;
            if (!React.isValidElement(child)) {
              return child;
            }
            return (
              <ItemColumnWrapper key={index} isVisible={isVisible}>
                {child}
              </ItemColumnWrapper>
            );
          })}
        </div>
      )}
    </Stepper>
  );
}

function ItemColumnWrapper({
  children,
  isVisible,
  ...props
}: React.ComponentPropsWithRef<"div"> & { isVisible: boolean }) {
  const springStyles = useSpring({ opacity: isVisible ? 1 : 0 });
  return (
    <animated.div className={styles.wrapper} style={springStyles} {...props}>
      {children}
    </animated.div>
  );
}
