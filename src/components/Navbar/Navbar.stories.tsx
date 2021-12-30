import { Meta, Story } from "@storybook/react/types-6-0";

import { Navbar, NavbarProps } from ".";
import { LeftContentProps } from "./LeftContent/LeftContent";

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

export const NavbarExample: Story<NavbarProps> = () => {
  return <Navbar leftContent={exampleLeftContent} />;
};
