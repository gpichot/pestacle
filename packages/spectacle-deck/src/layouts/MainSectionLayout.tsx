import type React from "react";
import { FlexBox } from "spectacle";
import frontImage from "../front.png";

export const MainSectionLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <FlexBox
      height="100%"
      width="100%"
      flexDirection="row"
      style={{
        position: "absolute",
        inset: "none",
        right: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ paddingLeft: "8rem", flex: 1 }}>{children}</div>
      <div style={{ flex: "0 0", height: "100%", paddingLeft: "5rem" }}>
        <img src={frontImage} alt="Front" style={{ height: "100%" }} />
      </div>
    </FlexBox>
  );
};
