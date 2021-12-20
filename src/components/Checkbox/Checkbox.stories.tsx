import { Meta, Story } from "@storybook/react/types-6-0";

import { Checkbox, CheckboxProps } from "./";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
} as Meta<CheckboxProps>;

export const Default = () => (
  <Checkbox label="example label" onChange={() => {}} value="1" checked />
);

const Template: Story<CheckboxProps> = (props: CheckboxProps) => (
  <Checkbox {...props} />
);

export const Templated = Template.bind({});
Templated.args = {
  checked: "indeterminate",
  isLabelHidden: false,
  label: "example label",
  onChange: () => {},
  tooltip: {
    label: "Tooltip for Check",
    position: "right",
  },
  value: "1",
};
