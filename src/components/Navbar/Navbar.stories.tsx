import { Meta, Story } from "@storybook/react/types-6-0";
import { cloneElement, FormEvent, useState } from "react";

import {
  Menu,
  MenuItem,
  SubMenu,
  TextInput,
  Avatar,
  Tabs,
  Tab,
  TabList,
  AgentCard,
} from "components";

import { Navbar, NavbarProps } from ".";
import { Logo, LinkLogo } from "./LeftContent";
import { NavbarAvatar, NavbarButton } from "./RightContent";
import fpo from "./logo-fpo.png";

export default {
  title: "Components/Navbar",
  component: Navbar,
} as Meta<NavbarProps>;

const logo = <Logo src={fpo} />;

const linkLogo = (
  <LinkLogo
    link="https://design.avayacloud.com"
    src={fpo}
    alt="Link to Avaya"
  />
);

const search = (
  <TextInput
    clearable={true}
    disabled={false}
    placeholder="Search"
    startIcon="search"
    aria-label="search"
  />
);

const navbarAvatar = (
  <NavbarAvatar
    avatar={<Avatar initials="MD" />}
    dropdown={
      <Menu itemAlignment="right">
        <MenuItem key={"1"}>Item1</MenuItem>
        <SubMenu key={"2"} menuRootElement={<MenuItem>Sub Menu</MenuItem>}>
          <MenuItem key={"2-1"}>Sub Item1</MenuItem>
          <MenuItem key={"2-2"}>Sub Item2</MenuItem>
        </SubMenu>
        <MenuItem key={"3"}>Item3</MenuItem>
      </Menu>
    }
  />
);

const navMenuToggleBtn = (
  <NavbarButton
    aria-label="Toggle Menu"
    onClick={() => alert("Menu toggle clicked")}
    icon="menu"
  />
);

const Template: Story<NavbarProps> = (props: NavbarProps) => {
  return <Navbar {...props} />;
};

export const BasicNavbar = Template.bind({});
BasicNavbar.args = {
  logo,
};

export const NavbarWithNavigationToggle = Template.bind({});
NavbarWithNavigationToggle.args = {
  logo: linkLogo,
  navMenuToggleBtn,
};

export const NavbarWithTitle = Template.bind({});
NavbarWithTitle.args = {
  logo,
  title: "Product Name",
};

export const NavbarWithSearch = Template.bind({});
NavbarWithSearch.args = {
  logo,
  search,
};
NavbarWithSearch.decorators = [
  (Story, context) => {
    const [searchString, setSearchString] = useState("");

    const captureSearchString = (e: FormEvent) => {
      setSearchString((e.target as HTMLInputElement).value);
    };

    const args = { ...context.args };

    const searchWithHandler = cloneElement(args.search!, {
      onChange: captureSearchString,
    });

    return (
      <>
        <Story args={{ ...args, search: searchWithHandler }} />
        <p>You are searching for: {searchString}</p>
      </>
    );
  },
];

export const NavbarWithNavButtons = Template.bind({});
NavbarWithNavButtons.args = {
  logo,
  navButtons: [
    <NavbarButton icon="info" aria-label="Info" />,
    <NavbarButton icon="settings" aria-label="Settings" />,
  ],
};

export const NavbarWithAvatar = Template.bind({});
NavbarWithAvatar.args = {
  logo,
  navbarAvatar,
  navButtons: [
    <NavbarButton icon="info" aria-label="Info" />,
    <NavbarButton icon="settings" aria-label="Settings" />,
  ],
};

export const NavbarWithAvatarAndDropdown = Template.bind({});
NavbarWithAvatarAndDropdown.args = {
  logo,
  navbarAvatar,
};

export const NavbarWithTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const onTabChange = (activeTabIndex: number) => {
    setActiveTabIndex(activeTabIndex);
  };
  const contentToToggle = {
    0: "Tab 1 content",
    1: "Tab 2 content",
    2: "Tab 3 content",
  };
  return (
    <>
      <Navbar
        logo={logo}
        navbarTabs={
          <Tabs onTabChange={onTabChange}>
            <TabList>
              <Tab id="tab1">Tab1</Tab>
              <Tab id="tab2">Tab2</Tab>
              <Tab id="tab3">Tab3</Tab>
            </TabList>
          </Tabs>
        }
      />
      <h4 style={{ marginTop: "30px" }}>{contentToToggle[activeTabIndex]}</h4>
    </>
  );
};

export const StickyNavbar: Story<NavbarProps> = () => {
  return (
    <>
      <Navbar logo={logo} sticky />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
        velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
        pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
        ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
        eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
        elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
        Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
        purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
        purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
        Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
        ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
        Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
        molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
        congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
        ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
        luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
        nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
        auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
        odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
        volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
        condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
        ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
        massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
        tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
        eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
        nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
        malesuada. Integer at mauris vel purus pellentesque volutpat at nec
        tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
        nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
        In condimentum elit felis, at auctor lectus elementum sit amet. Sed
        vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
        odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
        eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
        Maecenas urna libero, condimentum id dignissim id, semper sed velit.
        Duis sodales est eu mauris ma
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
        velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
        pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
        ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
        eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
        elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
        Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
        purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
        purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
        Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
        ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
        Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
        molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
        congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
        ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
        luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
        nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
        auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
        odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
        volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
        condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
        ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
        massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
        tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
        eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
        nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
        malesuada. Integer at mauris vel purus pellentesque volutpat at nec
        tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
        nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
        In condimentum elit felis, at auctor lectus elementum sit amet. Sed
        vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
        odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
        eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
        Maecenas urna libero, condimentum id dignissim id, semper sed velit.
        Duis sodales est eu mauris ma
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        egestas orci sit amet mi dapibus condimentum. Etiam placerat facilisis
        velit in congue. Donec ut commodo augue, quis hendrerit lorem. Etiam ac
        pulvinar magna. Etiam vel eros euismod, imperdiet sem sit amet,
        ultricies nisl. Duis consectetur vitae sapien et blandit. Cras vel
        eleifend justo. In interdum aliquam diam ut porta. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit. Integer turpis eros, dignissim non
        elit eget, mollis dapibus massa. Maecenas ultricies vulputate lacinia.
        Vestibulum blandit leo erat, eget semper eros rhoncus ac. Proin quis
        purus quis magna dignissim sollicitudin eu auctor mauris. Mauris quis
        purus sed mauris commodo viverra. Vivamus porttitor consequat facilisis.
        Aenean dignissim tortor ac dapibus sollicitudin. Duis tempor sapien in
        ante eleifend ornare. Praesent viverra lectus vitae nunc semper viverra.
        Nunc sit amet tincidunt dolor. Aliquam consectetur nunc eget pharetra
        molestie. Integer molestie sollicitudin dapibus. Nulla facilisi. Integer
        congue bibendum urna ut pretium. Nulla vitae bibendum purus. Integer dui
        ligula, varius nec porttitor malesuada, fringilla id ante. Nunc sagittis
        luctus enim, eu vestibulum ante egestas quis. Nam ut porttitor metus,
        nec sodales velit. Fusce et est fringilla, convallis diam fermentum,
        auctor libero. Maecenas interdum neque quis quam tempus, quis facilisis
        odio pellentesque. Vivamus mattis ante a accumsan gravida. Nullam
        volutpat pulvinar feugiat. Sed bibendum erat velit, sagittis tempor eros
        condimentum ut. Suspendisse feugiat nec odio at maximus. Integer nec
        ligula ac felis porttitor consequat et id nisl. Donec vulputate massa
        massa, nec lobortis magna lobortis vitae. Pellentesque pharetra
        tincidunt libero, ac porta eros sagittis sed. Proin porttitor id purus
        eu rhoncus. Vestibulum pellentesque orci eget euismod blandit. Aenean
        nec quam eu lectus vulputate tincidunt. Aenean dictum in urna sit amet
        malesuada. Integer at mauris vel purus pellentesque volutpat at nec
        tellus. Cras at pulvinar felis. Proin vel leo in ex porta porta ut sed
        nisi. Etiam volutpat metus risus, et vestibulum magna malesuada semper.
        In condimentum elit felis, at auctor lectus elementum sit amet. Sed
        vehicula tellus enim, facilisis mollis turpis imperdiet ac. Morbi et
        odio at ipsum ullamcorper mollis. Sed vestibulum, mauris vitae hendrerit
        eleifend, nisl arcu imperdiet ex, ut bibendum eros urna quis orci.
        Maecenas urna libero, condimentum id dignissim id, semper sed velit.
        Duis sodales est eu mauris ma
      </p>
    </>
  );
};

export const NavbarWithAgentCard = () => {
  return (
    <Navbar
      logo={logo}
      agentCard={
        <AgentCard
          agentName="Bob Boberson"
          agentStatus="connected"
          avatar={<Avatar />}
        />
      }
    ></Navbar>
  );
};
