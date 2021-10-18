import { Meta, Story } from "@storybook/react/types-6-0";
import { Avatar, AvatarProps, SmallAvatarProps } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
} as Meta<AvatarProps>;

export const Default = () => <Avatar label="Jimmy Bob" />;

export const Template: Story<AvatarProps> = (props: AvatarProps) => (
  <Avatar {...props} />
);

Template.args = { label: "Jimmy Bob" };

const SmallTemplate: Story<SmallAvatarProps> = (props: SmallAvatarProps) => (
  <Avatar {...props} />
);

export const SmallBot = SmallTemplate.bind({});
SmallBot.args = {
  label: "Small Bot",
  variant: "bot",
  size: "sm",
};
