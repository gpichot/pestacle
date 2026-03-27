import type React from "react";
import styled from "styled-components";

export const Link = (props: { href: string; children: React.ReactNode }) => (
  <a
    href={props.href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: "var(--color-secondary)", textDecoration: "none" }}
  >
    {props.children} [{props.href}]
  </a>
);

export const Image = (props: React.ComponentProps<"img">) => (
  <div
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    <img
      alt=""
      {...props}
      style={{
        objectFit: "contain",
        maxHeight: "30vh",
        maxWidth: "70vw",
        ...props.style,
      }}
    />
  </div>
);

export const CustomHeading = styled.h1`
  font-family: Bitter, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 67px;
  font-weight: 500;

  strong {
    color: var(--color-secondary);
    font-weight: 500;
  }
`;

export const CustomQuote = styled.blockquote`
  margin: 1rem 0;
  padding-left: 1.5rem;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0.8;

  > * {
    padding: 0 !important;
  }
`;

export const InlineCode = styled.code`
  filter: brightness(1.05);
  zoom: 1.1;
  &:before,
  &:after {
    content: "\`";
    font-size: 0.8em;
  }
`;

export const HeadingTwo = styled.h2`
  font-family: Bitter, \"Helvetica Neue\", Helvetica, Arial, sans-serif;
  font-size: 55px;
  font-weight: 400;

  strong {
    color: var(--color-secondary);
    font-weight: 500;
  }
`;

export const HeadingThree = styled.h3`
  font-family: Bitter, \"Helvetica Neue\", Helvetica, Arial, sans-serif;
  font-size: 40px;
  font-weight: 400;
  margin-top: 0;

  strong {
    color: var(--color-secondary);
    font-weight: 500;
  }
`;
