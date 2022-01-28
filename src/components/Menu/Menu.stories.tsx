import { Meta, Story } from "@storybook/react/types-6-0";

import { Button } from "components";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuProps,
  MenuSeparator,
  SubMenu,
} from "./";

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta<MenuProps>;

export const SimpleMenu = () => (
  <Menu menuRootElement={<Button>Open Menu</Button>}>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
    <MenuItem>Menu Item 3</MenuItem>
  </Menu>
);

const Template: Story<MenuProps> = ({ children, ...rest }: MenuProps) => (
  <section style={{ display: "flex", justifyContent: "center" }}>
    <Menu {...rest}>{children}</Menu>
  </section>
);
export const SimpleMenuTemplated = Template.bind({});
SimpleMenuTemplated.args = {
  menuRootElement: <MenuButton>Open Menu</MenuButton>,
  children: [
    <MenuItem key="1">Item1</MenuItem>,
    <MenuItem key="2">Item2</MenuItem>,
    <MenuItem key="3">Item3</MenuItem>,
  ],
};

export const SimpleMenuRightAlignedTemplated = Template.bind({});
SimpleMenuRightAlignedTemplated.args = {
  menuRootElement: <MenuButton>Open Menu</MenuButton>,
  children: [
    <MenuItem key="1">Item1</MenuItem>,
    <MenuItem key="2">Item2</MenuItem>,
    <MenuItem key="3">Item3</MenuItem>,
  ],
  itemAlignment: "right",
};

export const FunctionalMenu = () => (
  <section>
    <Menu
      menuRootElement={
        <MenuButton onClick={() => console.log("Functional Menu opened")}>
          Functional Menu
        </MenuButton>
      }
    >
      <MenuItem onClick={() => console.log("first menu item was clicked")}>
        Console log click
      </MenuItem>
      <MenuItem disabled>Menu Item 2</MenuItem>
      <MenuItem>
        <a
          href="https://design.avayacloud.com/components/web/setup-web"
          target="_blank"
        >
          Go to Portal
        </a>
      </MenuItem>
    </Menu>
  </section>
);

export const MenuSeperator = () => (
  <Menu menuRootElement={<MenuButton />}>
    <MenuItem>Menu Item 1</MenuItem>
    <MenuItem>Menu Item 2</MenuItem>
    <MenuSeparator />
    <MenuItem>Menu Item 3</MenuItem>
    <MenuItem>Menu Item 4</MenuItem>
  </Menu>
);

export const MultiLevelSubMenu = () => (
  <Menu menuRootElement={<MenuButton />}>
    <MenuItem>Item1</MenuItem>
    <SubMenu menuRootElement={<MenuItem>SubMenu</MenuItem>}>
      <MenuItem>Sub Item1</MenuItem>
      <MenuItem>Sub Item2</MenuItem>
      <MenuItem>Sub Item3</MenuItem>
      <SubMenu menuRootElement={<MenuItem>Sub SubMenu</MenuItem>}>
        <MenuItem>Sub Sub Item1</MenuItem>
        <MenuItem>Sub Sub Item2</MenuItem>
        <MenuItem>Sub Sub Item3</MenuItem>
      </SubMenu>
    </SubMenu>
    <MenuItem>Item3</MenuItem>
  </Menu>
);

// BUG-797: If you mouse click on both submenus, the first submenu does not close. Keybaord navigation works beautifully.
export const TwoMenus = () => (
  <section style={{ display: "flex", justifyContent: "space-between" }}>
    <Menu
      menuRootElement={<MenuButton>Menu One</MenuButton>}
      itemAlignment="left"
    >
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>

    <Menu
      menuRootElement={<MenuButton>Menu Two</MenuButton>}
      itemAlignment="right"
    >
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>
  </section>
);
