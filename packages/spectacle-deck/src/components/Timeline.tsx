import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { Stepper } from "spectacle";
import styled from "styled-components";

import {
  TimelineItemBody,
  TimelineItemContent,
  TimelineItemContentPhantom,
  TimelineItemTitle,
} from "./Timeline.styled";

const TimelineItemStyled = styled(animated.div)<{
  isOdd?: boolean;
  isEven?: boolean;
}>`
  flex: 1;
  flex-flow: column nowrap;
  display: inline-flex;

  &:nth-child(odd) {
    &,
    ${TimelineItemContent} {
      flex-direction: column;
    }
  }
  &:nth-child(even) {
    &,
    ${TimelineItemContent} {
      flex-direction: column-reverse;
    }
  }
`;

const TimelineItemGuide = styled(animated.div)`
  width: 100%;
  padding-top: 2px;
  display: flex;
  flex-flow: row;
  align-items: center;

  svg {
    height: 28px;
    width: 28px;
    path {
      fill: #ffffff;
    }
    margin-right: 4px;
  }
`;

const TimelineItemGuideLine = styled(animated.div)`
  border-top: 4px solid #ffffff;
  margin-right: 4px;
`;

const style = {
  display: "flex",
  position: "relative" as const,
  flexFlow: "row nowrap",
  alignItems: "center",
};

export default function Timeline(
  props: React.ComponentPropsWithoutRef<"div"> & {
    activeIndex?: number;
  },
) {
  const { activeIndex, ...rest } = props;
  const children = React.Children.toArray(rest.children);

  if (activeIndex != null) {
    return (
      <div {...rest} style={{ ...style, ...rest.style }}>
        {children.map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return React.cloneElement(child, {
            // @ts-expect-error cloning
            isPhantom: activeIndex < index,
            isLast: activeIndex === index,
          });
        })}
      </div>
    );
  }

  return (
    <Stepper
      {...rest}
      values={children}
      activeStyle={style}
      inactiveStyle={style}
    >
      {(_value, step) => {
        return children.map((child, index) => {
          if (!React.isValidElement(child)) {
            return child;
          }
          return React.cloneElement(child, {
            // @ts-expect-error cloning
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
    isOdd?: boolean;
    isEven?: boolean;
  },
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
    <TimelineItemStyled
      {...rest}
      style={{
        ...appearStyles,
      }}
    >
      <TimelineItemContentPhantom>
        <TimelineItemTitle>{title}</TimelineItemTitle>
        <TimelineItemBody>{children}</TimelineItemBody>
      </TimelineItemContentPhantom>
      <TimelineItemGuide style={colorStyles}>
        <Hexagon />
        <TimelineItemGuideLine style={guideLineProps} />
      </TimelineItemGuide>
      <TimelineItemContent>
        <TimelineItemTitle>{title}</TimelineItemTitle>
        <TimelineItemBody>{children}</TimelineItemBody>
      </TimelineItemContent>
    </TimelineItemStyled>
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
