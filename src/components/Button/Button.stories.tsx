import { ComponentStory } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";

import { Button, ButtonProps } from "./Button";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    type: {
      control: { type: "select", options: ["button", "submit", "reset"] },
    },
  },
} as Meta<ButtonProps>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonAnimationSpinner = Template.bind({});
ButtonAnimationSpinner.args = {
  animation: "spinner",
  label: "Test",
  className: "ha-ha",
};

export const ButtonAnimationPulse = Template.bind({});
ButtonAnimationPulse.args = {
  animation: "pulse",
  label: "Test",
};

export const AriaLabel = Template.bind({});
AriaLabel.args = {
  label: "Test",
};

export const Type = Template.bind({});
Type.args = {
  type: "button",
  label: "Test",
};

export const LargeLabelText = Template.bind({});
LargeLabelText.args = {
  label: "Large label text test",
};

export const Badge = Template.bind({});
Badge.args = {
  badge: "100k",
  label: "badge",
};

export const BadgeLongText = Template.bind({});
BadgeLongText.args = {
  badge: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet",
  label: "badge",
};
