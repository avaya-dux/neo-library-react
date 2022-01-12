import { Meta, Story } from "@storybook/react/types-6-0";

import { Navbar, NavbarProps } from ".";
import { LeftContentProps } from "./LeftContent/LeftContent";
import { RightContentProps } from "./RightContent/RightContent";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<NavbarProps>;

const exampleLeftContent: LeftContentProps = {
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
  title: "Product Name",
};

const exampleRightContent: RightContentProps = {
  navButtons: [
    { navButton: { badge: "", icon: "info" }, "aria-label": "Info" },
    { navButton: { badge: "", icon: "settings" }, "aria-label": "Settings" },
  ],
};

export const NavbarExample: Story<NavbarProps> = () => {
  return (
    <Navbar
      leftContent={exampleLeftContent}
      rightContent={exampleRightContent}
    />
  );
};
