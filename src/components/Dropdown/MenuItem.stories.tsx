import "@avaya/neo/neo/dist/css/neo/neo.min.css";
import { Meta, Story } from "@storybook/react/types-6-0";
import { MenuItem } from "./MenuItem";
import { MenuItemProps } from "./MenuTypes";

export default {
  title: "Components/Layout/Dropdown/MenuItem",
  component: MenuItem,
} as Meta<MenuItemProps>;

const Template: Story<MenuItemProps> = (props: MenuItemProps) => {
  return (
    <div role="menu">
      <MenuItem {...props} />
    </div>
  );
};

export const Item = Template.bind({});
Item.args = {
  text: "text",
};
