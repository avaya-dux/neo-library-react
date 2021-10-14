import { Meta, Story } from "@storybook/react/types-6-0";

import { ClosableChip, ClosableChipProps } from "./";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/Chips/ClosableChip",
  component: ClosableChip,
} as Meta<ClosableChipProps>;

const Template: Story<ClosableChipProps> = (props: ClosableChipProps) => (
  <ClosableChip {...props} />
);

export const ClosableDefault = Template.bind({});
ClosableDefault.args = {
  id: "default",
  text: "Closable Default",
  onClick: (e) => {
    e.preventDefault();
    console.log((e.target as HTMLElement).getAttribute("id"));
  },
};

export const ClosableSuccess = Template.bind({});
ClosableSuccess.args = {
  id: "success",
  variant: "success",
  text: "Closable Disabled Success",
  disabled: true,
};

export const ClosableInfo = Template.bind({});
ClosableInfo.args = {
  id: "info",
  variant: "info",
  text: "Closable Info",
};

export const ClosableAlert = Template.bind({});
ClosableAlert.args = {
  id: "alert",
  variant: "alert",
  text: "Closable Alert",
};

export const ClosableWarning = Template.bind({});
ClosableWarning.args = {
  id: "warning",
  variant: "warning",
  text: "Closable Disabled Warning",
  disabled: true,
};

export const ClosableWarningWithTooltip = Template.bind({});
ClosableWarningWithTooltip.args = {
  variant: "warning",
  text: "Closable Warning With Tooltip",
  tooltip: { label: "Warning" },
};
