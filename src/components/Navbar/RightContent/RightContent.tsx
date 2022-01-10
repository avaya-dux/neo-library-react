import { FunctionComponent } from "react";

import { NavbarNavButton, NavbarNavButtonProps } from "./NavbarNavButton";

export interface RightContentProps {
  navButtons: NavbarNavButtonProps[];
}

export const RightContent: FunctionComponent<RightContentProps> = ({
  navButtons,
}) => {
  return (
    <div className="neo-nav">
      {navButtons.map((navButton) => {
        return (
          <div className="neo-badge__navbutton">
            <NavbarNavButton {...navButton} />
          </div>
        );
      })}
    </div>
  );
};
