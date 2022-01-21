import { Meta, Story } from "@storybook/react/types-6-0";

import { MenuItem, SubMenu } from "components";

import { Navbar, NavbarProps } from ".";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<NavbarProps>;

const logo = {
  link: "https://design.avayacloud.com",
  src: "http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png",
  alt: "Link to Avaya",
};

const Template: Story<NavbarProps> = (props: NavbarProps) => {
  return <Navbar {...props} />;
};

export const BasicNavbar = Template.bind({});
BasicNavbar.args = {
  logo: logo,
};

export const NavbarWithLeftNavigationToggle = Template.bind({});
NavbarWithLeftNavigationToggle.args = {
  logo: logo,
  leftNavigationToggle: {
    "aria-label": "Toggle Menu",
    onClick: () => console.log("Menu toggle clicked"),
  },
};

export const NavbarWithTitle = Template.bind({});
NavbarWithTitle.args = {
  logo: logo,
  title: "Product Name",
};

export const NavbarWithSearch = Template.bind({});
NavbarWithSearch.args = {
  logo: logo,
  search: {
    clearable: false,
    disabled: false,
    placeholder: "Search",
    startIcon: "search",
    "aria-label": "search",
  },
};

export const NavbarWithNavButtons = Template.bind({});
NavbarWithNavButtons.args = {
  logo: logo,
  navButtons: [
    { badge: "", icon: "info", "aria-label": "Info" },
    { badge: "", icon: "settings", "aria-label": "Settings" },
  ],
};

export const NavbarWithAvatar = Template.bind({});
NavbarWithAvatar.args = {
  logo: logo,
  navbarAvatar: {
    avatar: {
      initials: "MD",
    },
  },
  navButtons: [
    { badge: "", icon: "info", "aria-label": "Info" },
    { badge: "", icon: "settings", "aria-label": "Settings" },
  ],
};

export const NavbarWithAvatarAndDropdown = Template.bind({});
NavbarWithAvatarAndDropdown.args = {
  logo: logo,
  navbarAvatar: {
    avatar: {
      variant: "generic",
    },
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

export const StickyNavbar: Story<NavbarProps> = () => {
  return (
    <div style={{ height: "400px", overflowY: "auto" }}>
      <div style={{ height: "500px" }}>
        <Navbar logo={logo} sticky />
      </div>
    </div>
  );
};
