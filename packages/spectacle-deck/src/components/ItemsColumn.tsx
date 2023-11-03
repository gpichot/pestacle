import React from "react";
import { Stepper } from "spectacle";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

export function ItemsColumn(divProps: React.ComponentProps<"div">) {
  const { style, children, ...props } = divProps;
  const childrenArray = React.Children.toArray(children);
  return (
    <Stepper values={childrenArray}>
      {(value, step) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
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

const ItemColumnWrapperStyled = styled(animated.div)`
  * {
    text-align: center !important;
  }
`;

function ItemColumnWrapper({
  children,
  isVisible,
  ...props
}: React.ComponentPropsWithRef<"div"> & { isVisible: boolean }) {
  const styles = useSpring({ opacity: isVisible ? 1 : 0 });
  return (
    <ItemColumnWrapperStyled style={styles} {...props}>
      {children}
    </ItemColumnWrapperStyled>
  );
}
