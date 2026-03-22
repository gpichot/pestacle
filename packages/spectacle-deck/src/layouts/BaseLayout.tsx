import type React from "react";
import styled from "styled-components";

const DefaultLayoutHeading = styled.div`
  background-color: #ffffff11;
  padding: 2rem 5rem;
  margin-bottom: 1rem;

  h2 {
    margin: 0;
  }
`;

export const BaseLayout = ({
  children,
  title,
  ...otherProps
}: {
  children: React.ReactNode;
  title?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"div">, "title">) => {
  return (
    <div
      {...otherProps}
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        marginBottom: "5rem",
      }}
    >
      {title && <DefaultLayoutHeading>{title}</DefaultLayoutHeading>}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
          padding: "0 4rem",
          flex: 1,
        }}
      >
        {children}
      </div>
    </div>
  );
};
