import React from "react";
import { mdxComponentMap } from "spectacle";
import {
  CustomHeading,
  CustomQuote,
  HeadingThree,
  HeadingTwo,
  InlineCode,
  Image,
} from "./styled";

import CodeStepper from "./CodeStepper/CodeStepper";

const componentsMap = {
  ...mdxComponentMap,
  inlineCode: (props: React.ComponentPropsWithoutRef<"code">) => (
    <InlineCode
      {...props}
      style={{
        fontWeight: 500,
        display: "inline-block",
      }}
    />
  ),
  table: (props: React.ComponentPropsWithoutRef<"table">) => (
    <table
      {...props}
      style={{
        borderCollapse: "collapse",
        width: "100%",
        textAlign: "center",
      }}
    />
  ),
  tr: (props: React.ComponentPropsWithoutRef<"tr">) => (
    <tr
      {...props}
      style={{
        textAlign: "center",
        color: "white",
        fontFamily: 'Bitter,"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: 24,
      }}
    />
  ),
  td: (props: React.ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      style={{
        textAlign: "center",
        padding: "0.3rem 0",
        color: "white",
        fontFamily: 'Bitter,"Helvetica Neue",Helvetica,Arial,sans-serif',
        fontSize: 24,
      }}
    />
  ),
  h1: (props: React.ComponentProps<"h1">) => (
    <CustomHeading
      fontSize="h1"
      fontWeight={400}
      color="white"
      style={{
        fontSize: 67,
        flex: "0 1 65vw",
        maxWidth: "65%",
        textAlign: "left",
      }}
    >
      {props.children}
    </CustomHeading>
  ),
  h2: (props: React.ComponentProps<"h2">) => (
    <HeadingTwo>{props.children}</HeadingTwo>
  ),
  h3: (props: React.ComponentPropsWithoutRef<"h3">) => (
    <HeadingThree {...props} />
  ),
  img: (props: React.ComponentProps<typeof Image>) => <Image {...props} />,
  pre: CodeStepper,
  li: (props: React.ComponentProps<"li">) => (
    <li {...props} style={{ margin: "24px 0" }} />
  ),
  Side: (props: React.ComponentProps<"div">) => <div {...props} />,
  p: (props: React.ComponentProps<"p">) => {
    const Text = mdxComponentMap.p!;
    return (
      <Text
        style={{ margin: "8px 0", padding: "8px 0", lineHeight: "2rem" }}
        {...props}
      />
    );
  },
  blockquote: (props: React.ComponentProps<"blockquote">) => (
    <CustomQuote {...props} />
  ),
  a: ({ children, ...props }: React.ComponentProps<"a">) => {
    const domain = new URL(props.href || "").hostname;
    return (
      <a {...props} style={{ color: "#f49676", textDecoration: "none" }}>
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
} as const;

export default componentsMap;
