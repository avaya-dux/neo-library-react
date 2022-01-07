import { Meta, Story } from "@storybook/react/types-6-0";

import { SelectNative, SelectNativeProps } from ".";

export default {
  title: "Components/Select Native",
  component: SelectNative,
} as Meta<SelectNativeProps>;

const Template: Story<SelectNativeProps> = (props) => (
  <SelectNative {...props}>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </SelectNative>
);

export const Templated = Template.bind({});
Templated.args = {
  label: "Choose a car:",
  helperText: "example of helper text",
  errorList: ["error one", "error two"],
};

// TODO: form example (with dynamic error text)
// TODO: loading to new options
// TODO: value controlled (buttons to update value)
// TODO: default value

// TODO: add updated stories to tests
