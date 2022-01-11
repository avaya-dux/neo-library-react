import { Meta, Story } from "@storybook/react/types-6-0";
import log from "loglevel";
import { createRef, RefObject } from "react";

import { Button } from "components";

import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem";
import { MenuSeparator } from "./MenuSeparator";
import { MenuProps } from "./MenuTypes";
import { SubMenu } from "./SubMenu";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

const menuLogger = log.getLogger("menu");
menuLogger.enableAll();
const subMenuLogger = log.getLogger("submenu");
subMenuLogger.enableAll();
const keyboardLogger = log.getLogger("menu-keyboard-event-handler");
keyboardLogger.enableAll();
const mouseLogger = log.getLogger("menu-mouse-event-handler");
mouseLogger.enableAll();

export default {
  title: "Components/Dropdown/Menu",
  component: Menu,
} as Meta<MenuProps>;

const refButton = createRef<HTMLButtonElement>();

const button = createButton(refButton, "Action");
function createButton(refButton: RefObject<HTMLButtonElement>, label: string) {
  return (
    <Button ref={refButton} className="neo-dropdown__link-header">
      {label}
    </Button>
  );
}

const Template: Story<MenuProps> = ({ children, ...rest }: MenuProps) => {
  return (
    <Menu ref={refButton} {...rest}>
      {children}
    </Menu>
  );
};

export const OnlySeparator = Template.bind({});
OnlySeparator.args = {
  button,
  children: [<MenuSeparator data-testid="separator-id" key={1} />],
};

export const SimpleMenu = Template.bind({});
SimpleMenu.args = {
  button,
  children: [
    <MenuSeparator key={"a"} />,
    <MenuItem key={1} text="Item1" />,
    <MenuSeparator key={"b"} />,
    <MenuItem key={2} text="Item2" />,
    <MenuItem key={3} text="Item3" />,
  ],
};

export const OneLevelSubMenu = Template.bind({});
OneLevelSubMenu.args = {
  button,
  children: [
    <MenuItem text="Item1" key={1} />,
    <SubMenu key={2} button={<MenuItem text="SubMenu" />}>
      <MenuItem text="Sub Item1" key={"2-1"} />
      <MenuItem text="Sub Item2" key={"2-2"} />
    </SubMenu>,
    <MenuItem text="Item3" key={3} />,
  ],
};

export const TwoLevelSubMenu = Template.bind({});
TwoLevelSubMenu.args = {
  button,
  children: [
    <MenuItem text="Item1" key={"0-0"} />,
    <SubMenu key={"0-1"} button={<MenuItem text="SubMenu" />}>
      <MenuItem key={"0-1-0"} text="Sub Item1" />
      <MenuItem key={"0-1-1"} text="Sub Item2" />
      <MenuItem key={"0-1-2"} text="Sub Item3" />
      <SubMenu key={"0-1-3"} button={<MenuItem text="Sub SubMenu" />}>
        <MenuItem key={"0-1-3-0"} text="Sub Sub Item1" />
        <MenuItem key={"0-1-3-1"} text="Sub Sub Item2" />
        <MenuItem key={"0-1-3-2"} text="Sub Sub Item3" />
      </SubMenu>
    </SubMenu>,
    <MenuItem key={"0-2"} text="Item3" />,
  ],
};

export const ThreeLevelSubMenu = Template.bind({});
ThreeLevelSubMenu.args = {
  button,
  children: [
    <MenuItem key={"1"} text="Item1" />,
    <SubMenu key={"2"} button={<MenuItem text="Level 1 SubMenu" />}>
      <MenuItem key={"2-1"} text="Level 1 Item1" />
      <MenuItem key={"2-2"} text="Level 1 Item2" />
      <MenuItem key={"2-3"} text="Level 1 Item3" />
      <SubMenu key={"2-4"} button={<MenuItem text="Level 2 SubMenu" />}>
        <MenuItem key={"2-4-1"} text="Level 2 Item1" />
        <MenuItem key={"2-4-2"} text="Level 2 Item2" />
        <MenuItem key={"2-4-3"} text="Level 2 Item3" />
        <SubMenu key={"2-4-4"} button={<MenuItem text="Level 3 SubMenu" />}>
          <MenuItem key={"2-4-4-1"} text="Level 3 Item1" />
          <MenuItem key={"2-4-4-2"} text="Level 3 Item2" />
          <MenuItem key={"2-4-4-3"} text="Level 3 Item3" />
        </SubMenu>
      </SubMenu>
    </SubMenu>,
    <MenuItem key={"3"} text="Item3" />,
  ],
};

const RightTemplate: Story<MenuProps> = ({ children, ...rest }: MenuProps) => {
  return (
    <div
      style={{
        border: "solid black",
        height: "500px",
        width: "100%",
        padding: "3px",
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
      }}
    >
      <div style={{}}>
        <Menu ref={refButton} {...rest}>
          {children}
        </Menu>
      </div>
    </div>
  );
};

export const OneLevelSubMenuRight = RightTemplate.bind({});
OneLevelSubMenuRight.args = {
  rightAligned: true,
  button,
  children: [
    <MenuItem key={"1"} text="Item1" />,
    <SubMenu key={"2"} button={<MenuItem text="SubMenu" />}>
      <MenuItem key={"2-1"} text="Sub Item1" />
      <MenuItem key={"2-2"} text="Sub Item2" />
    </SubMenu>,
    <MenuItem key={"3"} text="Item3" />,
  ],
};

const refLeftButton = createRef<HTMLButtonElement>();
const refRightButton = createRef<HTMLButtonElement>();
const leftButton = createButton(refButton, "Left");
const rightButton = createButton(refButton, "Right");

const TwoMenusTemplate: Story<{ left: MenuProps; right: MenuProps }> = ({
  left: { children: leftChildren, ...leftRest },
  right: { children: rightChildren, ...rightRest },
}) => {
  return (
    <div>
      <Menu ref={refLeftButton} {...leftRest}>
        {leftChildren}
      </Menu>
      <span style={{ width: "20rem" }}>&nbsp;</span>
      <Menu ref={refRightButton} {...rightRest}>
        {rightChildren}
      </Menu>
    </div>
  );
};
export const TwoMenus = TwoMenusTemplate.bind({});
TwoMenus.args = {
  left: {
    button: leftButton,
    children: [
      <MenuItem key={"1"} text="Item1" />,
      <SubMenu key={"2"} button={<MenuItem text="SubMenu" />}>
        <MenuItem key={"2-1"} text="Sub Item1" />
        <MenuItem key={"2-2"} text="Sub Item2" />
      </SubMenu>,
      <MenuItem key={"3"} text="Item3" />,
    ],
  },
  right: {
    button: rightButton,
    children: [
      <MenuItem key={"1"} text="Item1" />,
      <SubMenu key={"2"} button={<MenuItem text="SubMenu" />}>
        <MenuItem key={"2-1"} text="Sub Item1" />
        <MenuItem key={"2-2"} text="Sub Item2" />
      </SubMenu>,
      <MenuItem key={"3"} text="Item3" />,
    ],
  },
};
