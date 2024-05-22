import React from "react";
import {
  Link as SpectacleLink,
  Image as SpectacleImage,
  Heading,
  FlexBox,
} from "spectacle";
import styled from "styled-components";

export const Link = (props: { href: string; children: React.ReactNode }) => (
  <SpectacleLink href={props.href} target="_blank" rel="noopener noreferrer">
    {props.children} [{props.href}]
  </SpectacleLink>
);

const StyledImage = styled(SpectacleImage)`
  object-fit: contain;
  max-height: 30vh;
  max-width: 70vw;
`;

export const Image = (props: React.ComponentProps<typeof SpectacleImage>) => (
  <FlexBox margin="0 0" padding="0 0">
    <StyledImage {...props} />
  </FlexBox>
);

export const CustomHeading = styled(Heading)`
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
