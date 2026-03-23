const Patterns = {
  FragmentProd: /^\s*_jsxs\(_Fragment, {\s*children:|\s*\}\);$/g,
  FragmentDev: /^\s*<>\s*|\s*<\/>;\s*$/g,
};
/**
 * Extracts the main code from the MDX file and returns it as a string.
 */
export function extractMainCodeAsChildren(
  source: string,
  { isJsx }: { isJsx: boolean },
) {
  // Retrieve `const _components = {` line
  // up to return statement
  const start = source.indexOf("const _components = {");
  const end = source.indexOf("\n}", start);
  const components = source.slice(start, end);

  if (!components) {
    return "";
  }

  // We want to remove the fragment if there is one.
  // Otherwise, introspection in the MDX layout will fail.
  const lines = components.split("\n");
  // All that is before the return statement
  const returnPos = lines.findIndex((line) => line.includes("return"));
  const header = lines.slice(0, returnPos).join("\n");
  // The return statement multilines without the return keyword
  const footer = lines.slice(returnPos).join("\n").replace("return", "");

  if (isJsx) {
    const finalFooter = footer
      .replace(Patterns.FragmentDev, " ")
      .replace(/;$/, "");
    return `${header}
  const {wrapper: MDXLayout} = _components;
  return <MDXLayout {...props}>${finalFooter}</MDXLayout>;
  `.trim();
  }

  const finalFooter = footer.match(/^\s*_jsxs?\(_Fragment,/gm)
    ? footer.replace(Patterns.FragmentProd, " ")
    : footer;
  return `
${header}
  const _content = ${finalFooter};
  const {wrapper: MDXLayout} = _components;
   return MDXLayout ? _jsx(MDXLayout, {
    ...props,
    children: _content
  }) : _content;
  `.trim();

  //const withWrapper = components.replace(
  //  /};\s*return/gm,
  //  "};\n  const {wrapper: MDXLayout} = "
  //);

  //const hasLayout = withWrapper.match(/\n\s*return (<>|_jsxs\(_Fragment)/gm);
  //if (hasLayout) {
  //  return withWrapper
  //    .replace(/\n\s*return <>/gm, "\nreturn <MDXLayout {...props}>")
  //    .replace(/<\/>;\s*$/gm, "</MDXLayout>;\n")
  //    .replace(
  //      /return _jsxs?\(_Fragment, \{/,
  //      "  return _jsx(MDXLayout, {...props,"
  //    );
  //}

  //const result = withWrapper
  //  .replace(/\n\s*return\s*</gm, "\nreturn <MDXLayout {...props}><")
  //  .replace(/>;\s*$/gm, "></MDXLayout>;\n")
  //  .replace(
  //    /return _jsxs?\(_components/gm,
  //    "  return _jsx(MDXLayout, {...props, children: _jsx(_components"
  //  )
  //  .replace(/}\);$/gm, "})});");

  //return result;
}
