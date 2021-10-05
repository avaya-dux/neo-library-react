import { Meta, Story } from "@storybook/react/types-6-0";

import { BasicChip, BasicChipProps } from "./";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/Chips/BasicChip",
  component: BasicChip,
} as Meta<BasicChipProps>;

const Template: Story<BasicChipProps> = (props: BasicChipProps) => (
  <BasicChip {...props} />
);

export const Default = Template.bind({});
Default.args = {
  text: "Basic Default",
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  text: "Basic Success",
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  text: "Basic Disabled Right to Left Info",
  disabled: true,
  dir: "rtl",
};

export const Alert = Template.bind({});
Alert.args = {
  variant: "alert",
  text: "Basic Chip",
  disabled: true,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  text: "Basic Chip",
};
