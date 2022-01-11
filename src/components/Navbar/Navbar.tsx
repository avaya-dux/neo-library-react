import { FunctionComponent } from "react";

import { LeftContent, LeftContentProps } from "./LeftContent/LeftContent";
import { RightContent, RightContentProps } from "./RightContent/RightContent";

export interface NavbarProps {
  leftContent: LeftContentProps;
  rightContent: RightContentProps;
}

/**
 * Navbars are used to orient users, and to access different areas within an interface.
 *
 * This Component receives props for the left and right content areas
 * @example
 * const exampleLeftContent: LeftContentProps = {
  logo: {
    link: "https://design.avayacloud.com",
    src: "http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png",
    alt: "Link to Avaya",
  },
  search: {
    clearable: false,
    disabled: false,
    placeholder: "Search",
    startIcon: "search",
    "aria-label": "search",
  },
  productName: "Product Name",
};

const exampleRightContent: RightContentProps = {
  navButtons: [
    { navButton: { badge: "", icon: "info" }, "aria-label": "Info" },
    { navButton: { badge: "", icon: "settings" }, "aria-label": "Settings" },
  ],
};
 * @example
 * <Navbar
      leftContent={exampleLeftContent}
      rightContent={exampleRightContent}
    />
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
