import React from "react";

export const Margins = {
  vertical: "4rem",
  horizontal: "7rem",
  horizontalInternal: "2rem",
};

export function getHeading(children: React.ReactNode) {
  const allChild = React.Children.toArray(children);
  if (allChild.length === 0) return [null, allChild];
  const [candidate, ...rest] = allChild;
  if (!React.isValidElement(candidate)) return [null, allChild];
  if (
    ["h2", "h3"].includes(
      (candidate.props as { originalType?: string }).originalType ?? "",
    )
  ) {
    return [candidate, rest];
  }
  return [null, allChild];
}

export function getCode(children: React.ReactNode) {
  const allChild = React.Children.toArray(children);

  if (allChild.length === 0) return [null, allChild];

  const index = allChild.findIndex((child) => {
    if (!React.isValidElement(child)) return false;
    return (child.props as { originalType?: string }).originalType === "pre";
  });

  if (index === -1) return [null, allChild];

  const candidate = allChild[index];
  const rest = allChild.filter((_, i) => i !== index);
  return [candidate, rest];
}

export function getMatchingMdxType(children: React.ReactNode, mdxType: string) {
  const allChild = React.Children.toArray(children);

  const matchFn = (child: React.ReactNode) => {
    if (!React.isValidElement(child)) return false;
    if (typeof child.type !== "function") return false;
    if (child.type.name === mdxType) return true;
    if ("mdxType" in child.type === false) return false;

    return child.type.mdxType === mdxType;
  };

  const matches = allChild.filter(matchFn);

  const rest = allChild.filter((child) => !matchFn(child));

  return [matches, rest];
}

export function getCodeChildren(children: React.ReactNode) {
  const [code, rest] = getCode(children);
  if (code) return [code, rest];

  const [codeStepper, rest2] = getMatchingMdxType(children, "CodeStepper");
  if (codeStepper.length > 0) return [codeStepper, rest2];

  const [codes, rest3] = getMatchingMdxType(children, "FilePane");

  return [codes, rest3];
}
