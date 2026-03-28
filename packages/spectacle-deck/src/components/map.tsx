import React, { ViewTransition } from "react";

import CodeStepper from "./CodeStepper/CodeStepper";
import { Mermaid } from "./Mermaid";
import { QRCode } from "./QRCode";
import {
  CustomHeading,
  CustomQuote,
  HeadingThree,
  HeadingTwo,
  Image,
  InlineCode,
} from "./styled";

/**
 * Wrap content in a <ViewTransition> if a morph name is provided.
 */
function MorphWrap({
  morph,
  children,
}: {
  morph?: string;
  children: React.ReactNode;
}) {
  if (!morph) return children;
  return <ViewTransition name={morph}>{children}</ViewTransition>;
}

const componentsMap: Record<string, React.ComponentType<any>> = {
  inlineCode: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <InlineCode
        {...props}
        style={{
          fontWeight: 500,
          display: "inline-block",
          ...style,
        }}
      />
    </MorphWrap>
  ),
  table: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <table
        {...props}
        style={{
          borderCollapse: "collapse",
          width: "100%",
          textAlign: "center",
          ...style,
        }}
      />
    </MorphWrap>
  ),
  tr: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <tr {...props} style={{ textAlign: "center", ...style }} />
    </MorphWrap>
  ),
  td: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <td
        {...props}
        style={{ textAlign: "center", padding: "0.3rem 0", ...style }}
      />
    </MorphWrap>
  ),
  h1: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <CustomHeading
        style={{
          fontWeight: 500,
          fontSize: 67,
          flex: "0 1 auto",
          maxWidth: "65%",
          textAlign: "left",
          color: "white",
          ...style,
        }}
      >
        {props.children}
      </CustomHeading>
    </MorphWrap>
  ),
  h2: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <HeadingTwo style={style}>{props.children}</HeadingTwo>
    </MorphWrap>
  ),
  h3: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <HeadingThree {...props} style={style} />
    </MorphWrap>
  ),
  img: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <Image {...props} style={style} />
    </MorphWrap>
  ),
  pre: CodeStepper,
  li: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <li {...props} style={{ margin: "24px 0", ...style }} />
    </MorphWrap>
  ),
  Side: (props: React.ComponentProps<"div">) => <div {...props} />,
  p: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <p
        {...props}
        style={{
          margin: "8px 0",
          padding: "8px 0",
          lineHeight: "1.6",
          ...style,
        }}
      />
    </MorphWrap>
  ),
  blockquote: ({ morph, style, ...props }: any) => (
    <MorphWrap morph={morph}>
      <CustomQuote {...props} style={style} />
    </MorphWrap>
  ),
  a: ({ children, morph, style, ...props }: any) => {
    const domain = new URL(props.href || "").hostname;
    return (
      <MorphWrap morph={morph}>
        <a
          {...props}
          style={{
            color: "var(--color-secondary)",
            textDecoration: "none",
            ...style,
          }}
        >
          {children}{" "}
          <small
            style={{
              color: "#ffffff44",
            }}
          >
            ({domain})
          </small>
        </a>
      </MorphWrap>
    );
  },
  directive: (props: React.ComponentProps<"div">) => {
    // @ts-expect-error
    if (props._name === "qrcode") {
      // @ts-expect-error
      const url = React.Children.toArray(props.children)[0].props.href;
      return <QRCode url={url} />;
    }
    // @ts-expect-error
    if (props._name === "mermaid") {
      const text = React.Children.toArray(props.children)
        .map((child) => {
          if (typeof child === "string") return child;
          if (React.isValidElement(child)) {
            // @ts-expect-error accessing children
            return child.props.children;
          }
          return "";
        })
        .join("");
      return <Mermaid chart={text} />;
    }
    return <div {...props} />;
  },
} as const;

export default componentsMap;
