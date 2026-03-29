import React, { ViewTransition } from "react";

import { Stepper } from "../engine/Stepper";
import styles from "./ItemsColumn.module.css";

export function ItemsColumn(divProps: React.ComponentProps<"div">) {
  const { style, children, ...props } = divProps;
  const childrenArray = React.Children.toArray(children);
  return (
    <Stepper values={childrenArray} alwaysVisible>
      {(_value, step) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            height: "100%",
            rowGap: "2cqh",
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
              <ViewTransition key={index} name={`items-column-${index}`}>
                <div
                  className={styles.wrapper}
                  style={{ opacity: isVisible ? 1 : 0 }}
                >
                  {child}
                </div>
              </ViewTransition>
            );
          })}
        </div>
      )}
    </Stepper>
  );
}
