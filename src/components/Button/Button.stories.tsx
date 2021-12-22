import { ComponentStory } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";

import { Button, ButtonProps } from "./Button";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/Button",
  component: Button,
} as Meta<ButtonProps>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const AnimationSpinner = Template.bind({});
AnimationSpinner.args = {
  animation: "spinner",
  children: "Test",
  className: "ha-ha",
};

export const AnimationPulse = Template.bind({});
AnimationPulse.args = {
  animation: "pulse",
  children: "Test",
};

export const Badge = Template.bind({});
Badge.args = {
  badge: "100k",
  children: "badge",
};

export const BadgeLongText = Template.bind({});
BadgeLongText.args = {
  badge: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
  children: "badge",
};
