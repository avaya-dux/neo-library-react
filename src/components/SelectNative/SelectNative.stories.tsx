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
  helperText: "Example of helper text",
  errorList: ["Error One", "Error Two"],
};
