import { Story } from "@storybook/react";

import { CheckboxGroup, CheckboxGroupProps } from "./CheckboxGroup";

export default {
  title: "Components/Checkbox Group",
  component: CheckboxGroup,
};

const DefaultCheckboxArray = [
  {
    label: "Check 1",
    value: "Check 1",
    checked: true,
    onChange: () => {},
  },
  {
    label: "Check 2",
    value: "Check 2",
    onChange: () => {},
  },
  {
    label: "Check 3",
    value: "Check 3",
    onChange: () => {},
  },
  {
    label: "Check 4",
    value: "Check 4",
    onChange: () => {},
    disabled: true,
  },
  {
    label: "Check 5",
    value: "Check 5",
    onChange: () => {},
    tooltip: "Tooltip for Check",
  },
  {
    label: "Check 6",
    value: "Check 6",
    indeterminate: true,
    onChange: () => {},
  },
  {
    label: "Check 7",
    value: "Check 7",
    disabled: true,
    indeterminate: true,
    checked: true,
    onChange: () => {},
  },
];

const Template: Story<CheckboxGroupProps> = (args: CheckboxGroupProps) => (
  <CheckboxGroup {...args} />
);

export const DefaultCheckboxGroup = Template.bind({});
DefaultCheckboxGroup.args = {
  checkboxes: DefaultCheckboxArray,
  groupName: "Default Checkbox Group",
  defaultChecked: ["Check 1", "Check 4", "Check 6"],
  onChange: () => {},
};

export const InlineCheckboxGroup = Template.bind({});
InlineCheckboxGroup.args = {
  checkboxes: DefaultCheckboxArray,
  groupName: "Inline Checkbox Group",
  defaultChecked: ["Check 1", "Check 4", "Check 6"],
  inline: true,
  onChange: () => {},
};
