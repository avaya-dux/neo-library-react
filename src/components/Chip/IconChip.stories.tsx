import { Meta, Story } from "@storybook/react/types-6-0";

import { IconChip, IconChipProps } from "./";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/Chips/IconChip",
  component: IconChip,
} as Meta<IconChipProps>;

const Template: Story<IconChipProps> = (props: IconChipProps) => (
  <IconChip {...props} />
);

export const DefaultWithIcon = Template.bind({});
DefaultWithIcon.args = {
  icon: "info",
  text: "Icon Default LTR Info",
  dir: "ltr",
};

export const SuccessWithIconAndTooltip = Template.bind({});
SuccessWithIconAndTooltip.args = {
  variant: "success",
  icon: "link",
  text: "Success Disabled RTL with Link Icon",
  disabled: true,
  dir: "rtl",
  tooltip: { label: "Success", position: "top-left" },
};

export const InfoWithIcon = Template.bind({});
InfoWithIcon.args = {
  variant: "info",
  icon: "info",
  text: "Info with Info Icon",
};

export const AlertWithIcon = Template.bind({});
AlertWithIcon.args = {
  variant: "alert",
  icon: "info",
  text: "Alert with Info Icon",
};

export const WarningWithIconOnRight = Template.bind({});
WarningWithIconOnRight.args = {
  variant: "warning",
  icon: "info",
  dir: "rtl",
  text: "Warning with Info Icon",
};
