export function extractMainCodeAsChildren(source: string) {
  // Retrieve `const _components = {` line
  // up to return statement
  const start = source.indexOf("const _components = {");
  const end = source.indexOf("\n}", start);
  const components = source.slice(start, end);

  if (!components) {
    return "";
  }
  const withWrapper = components.replace(
    /};\s*return/gm,
    "};\n  const {wrapper: MDXLayout} = _components;\nreturn"
  );

  const hasLayout = withWrapper.match(/\n\s*return (<>|_jsxs\(_Fragment)/gm);
  if (hasLayout) {
    return withWrapper
      .replace(/\n\s*return <>/gm, "\nreturn <MDXLayout {...props}>")
      .replace(/<\/>;\s*$/gm, "</MDXLayout>;\n")
      .replace(
        /return _jsxs?\(_Fragment, \{/,
        "  return _jsx(MDXLayout, {...props,"
      );
  }

  const result = withWrapper
    .replace(/\n\s*return\s*</gm, "\nreturn <MDXLayout {...props}><")
    .replace(/>;\s*$/gm, "></MDXLayout>;\n")
    .replace(
      /return _jsxs?\(_components/gm,
      "  return _jsx(MDXLayout, {...props, children: _jsx(_components"
    )
    .replace(/}\);$/gm, "})});");

  return result;
}
