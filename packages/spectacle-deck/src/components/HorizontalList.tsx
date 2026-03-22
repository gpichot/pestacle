import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { Stepper } from "spectacle";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-gap: 2rem;
`;

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
        <Container
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
        </Container>
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
        ></path>
        <text
          x="9"
          y="11"
          text-anchor="middle"
          dominant-baseline="middle"
          fill="#f49676"
          style={{ fontSize: "50%" }}
        >
          {position}
        </text>
        <path
          d="M 8.758 16.01 L 3.549 13.004 L 3.549 6.975 L 8.758 3.963 L 13.964 6.975 L 13.964 13.004 L 8.758 16.01 Z"
          fill="transparent"
        ></path>
      </svg>
    </div>
  );
}

const Item = styled(animated.div)`
  display: flex;
  flex-direction: column;
  font-family: Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif;
`;
const ItemHead = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.3rem;
  margin-bottom: 0.4rem;

  p {
    margin: 0;
  }
`;
const ItemContent = styled.div`
  > * {
    font-size: 1rem;
    padding: 4px !important;
    line-height: 1.5rem !important;
    margin-top: 0;
  }
`;

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
    config: { duration: 300 },
    immediate: !isVisible,
  });
  return (
    <Item style={opacityStyles}>
      <ItemHead>
        <Pill position={position} />
        <p>{title}</p>
      </ItemHead>

      <ItemContent>{children}</ItemContent>
    </Item>
  );
}
