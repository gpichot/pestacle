import type React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-end;
  padding: 4rem 6rem;
  z-index: 1;

  h1,
  h2,
  h3 {
    text-shadow: 0 2px 12px rgba(0, 0, 0, 0.7);
  }
  p {
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
  }
`;

export function FullImageLayout({
  children,
  image,
  position = "bottom",
  dim = 0.4,
}: {
  children: React.ReactNode;
  image: string;
  position?: "center" | "bottom" | "top";
  dim?: number;
}) {
  const justifyMap = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: `rgba(0, 0, 0, ${dim})`,
        }}
      />
      <Overlay style={{ justifyContent: justifyMap[position] }}>
        {children}
      </Overlay>
    </div>
  );
}
