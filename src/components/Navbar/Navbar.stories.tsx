import { Meta, Story } from "@storybook/react/types-6-0";

import { Navbar, NavbarProps } from ".";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<NavbarProps>;

const exampleNavbarProps: NavbarProps = {
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
  navButtons: [
    { badge: "", icon: "info", "aria-label": "Info" },
    { badge: "", icon: "settings", "aria-label": "Settings" },
  ],
};

export const NavbarExample: Story<NavbarProps> = () => {
  return <Navbar {...exampleNavbarProps} />;
};
