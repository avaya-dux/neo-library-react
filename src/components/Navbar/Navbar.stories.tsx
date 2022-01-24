import { useState, useEffect, useCallback } from "react";

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
  navMenuToggleBtn: {
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
    clearable: true,
    disabled: false,
    placeholder: "Search",
    startIcon: "search",
    "aria-label": "search",
  },
};
NavbarWithSearch.decorators = [
  (Story) => {
    const [searchString, getSearchString] = useState("");

    const inputListener = useCallback((e) => {
      const inputData = e.target.value;
      getSearchString(searchString + inputData);
    }, []);

    useEffect(() => {
      document.addEventListener("input", inputListener);
      return () => {
        document.removeEventListener("input", inputListener);
      };
    }, [searchString]);

    return (
      <>
        <Story />
        <p>You are searching for: {searchString}</p>
      </>
    );
  },
];

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
    <>
      <Navbar logo={logo} sticky />
      <div style={{ height: "400px", overflowY: "auto" }}>
        <div style={{ height: "500px" }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            egestas orci sit amet mi dapibus condimentum. Etiam placerat
            facilisis velit in congue. Donec ut commodo augue, quis hendrerit
            lorem. Etiam ac pulvinar magna. Etiam vel eros euismod, imperdiet
            sem sit amet, ultricies nisl. Duis consectetur vitae sapien et
            blandit. Cras vel eleifend justo. In interdum aliquam diam ut porta.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            turpis eros, dignissim non elit eget, mollis dapibus massa. Maecenas
            ultricies vulputate lacinia. Vestibulum blandit leo erat, eget
            semper eros rhoncus ac. Proin quis purus quis magna dignissim
            sollicitudin eu auctor mauris. Mauris quis purus sed mauris commodo
            viverra. Vivamus porttitor consequat facilisis. Aenean dignissim
            tortor ac dapibus sollicitudin. Duis tempor sapien in ante eleifend
            ornare. Praesent viverra lectus vitae nunc semper viverra. Nunc sit
            amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
            molestie. Integer molestie sollicitudin dapibus. Nulla facilisi.
            Integer congue bibendum urna ut pretium. Nulla vitae bibendum purus.
            Integer dui ligula, varius nec porttitor malesuada, fringilla id
            ante. Nunc sagittis luctus enim, eu vestibulum ante egestas quis.
            Nam ut porttitor metus, nec sodales velit. Fusce et est fringilla,
            convallis diam fermentum, auctor libero. Maecenas interdum neque
            quis quam tempus, quis facilisis odio pellentesque. Vivamus mattis
            ante a accumsan gravida. Nullam volutpat pulvinar feugiat. Sed
            bibendum erat velit, sagittis tempor eros condimentum ut.
            Suspendisse feugiat nec odio at maximus. Integer nec ligula ac felis
            porttitor consequat et id nisl. Donec vulputate massa massa, nec
            lobortis magna lobortis vitae. Pellentesque pharetra tincidunt
            libero, ac porta eros sagittis sed. Proin porttitor id purus eu
            rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
            nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit
            amet malesuada. Integer at mauris vel purus pellentesque volutpat at
            nec tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta
            ut sed nisi. Etiam volutpat metus risus, et vestibulum magna
            malesuada semper. In condimentum elit felis, at auctor lectus
            elementum sit amet. Sed vehicula tellus enim, facilisis mollis
            turpis imperdiet ac. Morbi et odio at ipsum ullamcorper mollis. Sed
            vestibulum, mauris vitae hendrerit eleifend, nisl arcu imperdiet ex,
            ut bibendum eros urna quis orci. Maecenas urna libero, condimentum
            id dignissim id, semper sed velit. Duis sodales est eu mauris ma
          </p>
        </div>
      </div>
    </>
  );
};
