import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { Stepper } from "spectacle";
import styled from "styled-components";

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

const ItemColumnWrapperStyled = styled(animated.div)<React.PropsWithChildren>`
  display: flex;
  justify-content: center;
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
