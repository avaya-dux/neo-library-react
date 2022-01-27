import { Meta, Story } from "@storybook/react/types-6-0";

import { Button } from "components";

import { Menu, MenuItem, MenuProps, MenuSeparator } from "./";

export default {
  title: "Components/Menu",
  component: Menu,
} as Meta<MenuProps>;

export const SimpleMenu = () => {
  return (
    <Menu menuRootElement={<Button>Open Menu</Button>}>
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuItem>Menu Item 3</MenuItem>
    </Menu>
  );
};

const Template: Story<MenuProps> = ({ children, ...rest }: MenuProps) => {
  return <Menu {...rest}>{children}</Menu>;
};
export const SimpleMenuTemplated = Template.bind({});
SimpleMenuTemplated.args = {
  menuRootElement: <Button>Open Menu</Button>,
  children: [
    <MenuItem>Item1</MenuItem>,
    <MenuItem>Item2</MenuItem>,
    <MenuItem>Item3</MenuItem>,
  ],
};

const MenuButton = <Button>Open Menu</Button>;
export const WithSeperator = () => {
  return (
    <Menu menuRootElement={MenuButton}>
      <MenuItem>Menu Item 1</MenuItem>
      <MenuItem>Menu Item 2</MenuItem>
      <MenuSeparator />
      <MenuItem>Menu Item 3</MenuItem>
      <MenuItem>Menu Item 4</MenuItem>
    </Menu>
  );
};
