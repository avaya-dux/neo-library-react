import { Meta, Story } from "@storybook/react/types-6-0";
import { Avatar, AvatarProps } from "./Avatar";

export default {
  title: "Components/Avatar",
  component: Avatar,
} as Meta<AvatarProps>;

export const Default = () => <Avatar label="Jimmy Bob" />;

export const Template: Story<AvatarProps> = (props: AvatarProps) => (
  <Avatar {...props} />
);

Template.args = { label: "Jimmy Bob" };
