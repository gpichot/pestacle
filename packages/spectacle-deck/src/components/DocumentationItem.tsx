import type React from "react";
import styled from "styled-components";

const DocWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 10000;

  .docContent {
    display: none;
  }

  &:hover .docContent {
    display: flex;
  }
`;

const DocContainer = styled.div`
  margin: 2rem 1rem;
  background-color: #333;
  border: 1px solid #333;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
`;

const DocLink = styled.a`
  text-decoration: none;
  font-weight: normal;
  font-family: var(--font-family);
  color: var(--color-secondary);
`;

const DocLinkItem = styled(DocLink)`
  width: fit-content;
  display: inline-block;
  background-color: #333;
  border: 1px solid #333;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  margin: 0.25rem 0;
`;

const DocContent = styled.div`
  display: flex;
  flex-flow: column-reverse nowrap;
  position: absolute;
  right: 1rem;
  bottom: 4.5rem;
  text-align: right;
  border-radius: 0.5rem;
  align-items: flex-end;
`;

export function Doc({
  label,
  link,
  children,
}: {
  label: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <DocWrapper>
      <DocContainer>
        {children && <DocContent>{children}</DocContent>}
        <div>
          <DocLink target="_blank" rel="noopener noreferrer" href={link}>
            {label}
          </DocLink>
        </div>
      </DocContainer>
    </DocWrapper>
  );
}

export function DocItem({ label, link }: { label: string; link: string }) {
  return (
    <DocLinkItem target="_blank" rel="noopener noreferrer" href={link}>
      {label}
    </DocLinkItem>
  );
}
