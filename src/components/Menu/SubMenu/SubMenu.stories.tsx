import { Meta, Story } from "@storybook/react/types-6-0";
import { MouseEvent, MouseEventHandler } from "react";

import { MenuItem } from "../MenuItem";
import { MenuSeparator } from "../MenuSeparator";
import { SubMenuProps } from "../MenuTypes";
import { SubMenu } from "./SubMenu";

export default {
  title: "Components/Menu/Sub Menu",
  component: SubMenu,
} as Meta<SubMenuProps>;

const Template: Story<SubMenuProps> = (props: SubMenuProps) => {
  return (
    <div role="menu">
      <SubMenu {...props}>
        <MenuItem>Item1</MenuItem>
        <MenuSeparator />
        <MenuItem>Item2</MenuItem>
        <MenuItem>Item3</MenuItem>
      </SubMenu>
    </div>
  );
};

export const WithSeparator = Template.bind({});

const onClickHandler: MouseEventHandler = (e: MouseEvent) => {
  alert("Please click on action ENTER_SUB_MENU to open the sub menu.");
  e.preventDefault();
};

WithSeparator.args = {
  button: <MenuItem onClick={onClickHandler}>SubMenu</MenuItem>,
};
