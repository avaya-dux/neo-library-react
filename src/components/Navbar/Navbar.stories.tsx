import { Meta, Story } from "@storybook/react/types-6-0";

import { Navbar, NavbarProps } from ".";
import { LeftContentProps } from "./LeftContent/LeftContent";
import { RightContentProps } from "./RightContent/RightContent";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<NavbarProps>;

const exampleLeftContent: LeftContentProps = {
  logo: { link: "", src: "" },
  search: {
    clearable: false,
    disabled: false,
    placeholder: "Search",
    startIcon: "search",
  },
  productName: "Product Name",
};

const exampleRightContent: RightContentProps = {
  navButtons: [{ navButton: { badge: "0", icon: "accept" } }],
};

export const NavbarExample: Story<NavbarProps> = () => {
  return (
    <Navbar
      leftContent={exampleLeftContent}
      rightContent={exampleRightContent}
    />
  );
};
