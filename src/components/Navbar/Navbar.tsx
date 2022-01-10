import { FunctionComponent } from "react";

import { LeftContent, LeftContentProps } from "./LeftContent/LeftContent";
import { RightContent, RightContentProps } from "./RightContent/RightContent";

export interface NavbarProps {
  leftContent: LeftContentProps;
  rightContent: RightContentProps;
}

export const Navbar: FunctionComponent<NavbarProps> = ({
  leftContent,
  rightContent,
}) => {
  return (
    <nav className="neo-navbar">
      <LeftContent {...leftContent} />
      <RightContent {...rightContent} />
    </nav>
  );
};
