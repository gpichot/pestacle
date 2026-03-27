import React from "react";

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
 * Merge a `morph` prop into a style object as `viewTransitionName`.
 */
function morphStyle(
  morph: string | undefined,
  style?: React.CSSProperties,
): React.CSSProperties | undefined {
  if (!morph) return style;
  return { ...style, viewTransitionName: morph };
}

const componentsMap: Record<string, React.ComponentType<any>> = {
  inlineCode: ({ morph, style, ...props }: any) => (
    <InlineCode
      {...props}
      style={morphStyle(morph, {
        fontWeight: 500,
        display: "inline-block",
        ...style,
      })}
    />
  ),
  table: ({ morph, style, ...props }: any) => (
    <table
      {...props}
      style={morphStyle(morph, {
        borderCollapse: "collapse",
        width: "100%",
        textAlign: "center",
        ...style,
      })}
    />
  ),
  tr: ({ morph, style, ...props }: any) => (
    <tr
      {...props}
      style={morphStyle(morph, {
        textAlign: "center",
        color: "white",
        fontFamily: 'Bitter,"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: 24,
        ...style,
      })}
    />
  ),
  td: ({ morph, style, ...props }: any) => (
    <td
      {...props}
      style={morphStyle(morph, {
        textAlign: "center",
        padding: "0.3rem 0",
        color: "white",
        fontFamily: 'Bitter,"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: 24,
        ...style,
      })}
    />
  ),
  h1: ({ morph, style, ...props }: any) => (
    <CustomHeading
      style={morphStyle(morph, {
        fontWeight: 500,
        fontSize: 67,
        flex: "0 1 auto",
        maxWidth: "65%",
        textAlign: "left",
        color: "white",
        ...style,
      })}
    >
      {props.children}
    </CustomHeading>
  ),
  h2: ({ morph, style, ...props }: any) => (
    <HeadingTwo style={morphStyle(morph, style)}>{props.children}</HeadingTwo>
  ),
  h3: ({ morph, style, ...props }: any) => (
    <HeadingThree {...props} style={morphStyle(morph, style)} />
  ),
  img: ({ morph, style, ...props }: any) => (
    <Image {...props} style={morphStyle(morph, style)} />
  ),
  pre: CodeStepper,
  li: ({ morph, style, ...props }: any) => (
    <li {...props} style={morphStyle(morph, { margin: "24px 0", ...style })} />
  ),
  Side: (props: React.ComponentProps<"div">) => <div {...props} />,
  p: ({ morph, style, ...props }: any) => (
    <p
      {...props}
      style={morphStyle(morph, {
        margin: "8px 0",
        padding: "8px 0",
        lineHeight: "2rem",
        ...style,
      })}
    />
  ),
  blockquote: ({ morph, style, ...props }: any) => (
    <CustomQuote {...props} style={morphStyle(morph, style)} />
  ),
  a: ({ children, morph, style, ...props }: any) => {
    const domain = new URL(props.href || "").hostname;
    return (
      <a
        {...props}
        style={morphStyle(morph, {
          color: "var(--color-secondary)",
          textDecoration: "none",
          ...style,
        })}
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
