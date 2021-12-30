import { FunctionComponent } from "react";

import { LeftContent, LeftContentProps } from "./LeftContent/LeftContent";

export interface NavbarProps {
  leftContent: LeftContentProps;
}

export const Navbar: FunctionComponent<NavbarProps> = ({ leftContent }) => {
  return (
    <nav className="neo-navbar">
      <LeftContent {...leftContent} />
    </nav>
  );
};
