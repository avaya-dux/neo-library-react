import { Meta, Story } from "@storybook/react/types-6-0";

import { LinkItem, LinkItemProps } from "./LinkItem";

export default {
  title: "Components/LinkItem",
  component: LinkItem,
} as Meta;

const Template: Story<LinkItemProps> = (args) => <LinkItem {...args} />;
const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
  event.preventDefault();
  console.log("Clicked on Link Item");
};
const handledisable = (event: React.MouseEvent<HTMLAnchorElement>): void => {
  event.preventDefault();
  console.log("Clicked on disabled Link Item");
};
const hoverFunction = (): void => {
  console.log("hovered on the item");
};
const focusFunction = (): void => {
  console.log("foucused on the item");
};
export const SimpleLink = Template.bind({});
SimpleLink.args = {
  label: `Link 1`,
  url: `#`,
  onClick: handleClick,
  hover: hoverFunction,
  isFocused: focusFunction,
};
export const ActiveLink = Template.bind({});
ActiveLink.args = {
  label: `Link 2`,
  url: `#`,
  active: true,
  onClick: handleClick,
};

export const DisabledLink = Template.bind({});
DisabledLink.args = {
  label: `Link 3`,
  disabled: true,
  onClick: handledisable,
};
