import React from "react";
import LayoutContainer from "./LayoutContainer";
import LayoutContent from "./LayoutContent";
import LayoutWrapper from "./LayoutWrapper";
import LayoutRoot from "./LayoutRoot";
export default function MainLayout(props) {
  return (
    <LayoutRoot>
      <LayoutWrapper>
        <LayoutContainer>
          <LayoutContent>{props.children}</LayoutContent>
        </LayoutContainer>
      </LayoutWrapper>
    </LayoutRoot>
  );
}
