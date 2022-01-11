import { FunctionComponent } from "react";

import { LeftContent, LeftContentProps } from "./LeftContent/LeftContent";
import { RightContent, RightContentProps } from "./RightContent/RightContent";

export interface NavbarProps {
  leftContent: LeftContentProps;
  rightContent: RightContentProps;
}

/**
 * Navbar are used when several choices are available and multiple selections are allowed.
 *
 * @example
 * <Checkbox label="Checkbox 1" value="Checkbox 1" name="Checkbox Group Name"/>
 *
 * @see https://design.avayacloud.com/components/web/checkbox-web
 */

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
