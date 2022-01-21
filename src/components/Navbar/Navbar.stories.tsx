import { Meta, Story } from "@storybook/react/types-6-0";

import { MenuItem, SubMenu } from "components";

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
  navbarAvatar: {
    dropdown: {
      children: [
        <MenuItem key={"1"} text="Item1" />,
        <SubMenu key={"2"} button={<MenuItem text="SubMenu" />}>
          <MenuItem key={"2-1"} text="Sub Item1" />
          <MenuItem key={"2-2"} text="Sub Item2" />
        </SubMenu>,
        <MenuItem key={"3"} text="Item3" />,
      ],
    },
  },
};

export const NavbarExample: Story<NavbarProps> = () => {
  return <Navbar {...exampleNavbarProps} />;
};
