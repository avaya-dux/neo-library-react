import { Meta, Story } from "@storybook/react/types-6-0";

import { SelectProps, SelectItem } from "./SelectTypes";

import { Select } from "./Select";

export default {
  title: "Components/Select/Custom Select",
  component: Select,
} as Meta<SelectProps>;

const items: SelectItem[] = [
  { text: "Option 1" },
  { text: "Option 2", disabled: true },
  { text: "Option 3" },
];
const handleSelectedValueChange = (value: any) => {
  console.log(value);
};

const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  label: "Test label",
  items: items,
  id: "neo-select",
  onSelectedValueChange: handleSelectedValueChange,
};

export const SelectWithHelperText = Template.bind({});
SelectWithHelperText.args = {
  ...DefaultSelect.args,
  helperText: "This is helper text",
};

export const DisabledSelect = Template.bind({});
DisabledSelect.args = {
  ...DefaultSelect.args,
  disabled: true,
};

export const LoadingSelect = Template.bind({});
LoadingSelect.args = {
  ...DefaultSelect.args,
  loading: true,
};

export const RequiredSelect = Template.bind({});
RequiredSelect.args = {
  ...DefaultSelect.args,
  required: true,
};

export const ErrorSelect = Template.bind({});
ErrorSelect.args = {
  ...DefaultSelect.args,
  errorList: ["This is an error"],
};
