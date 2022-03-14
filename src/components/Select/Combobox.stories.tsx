import { Meta } from "@storybook/react/types-6-0";

import { Combobox } from "./Combobox";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Select",
  component: Combobox,
} as Meta<SelectProps>;

const label = "Test label";

const values = ["Option 1", "Option 2", "Option 3"];

export const DefaultCombobox = () => (
  <Combobox label={label}>
    <SelectOption>Apples</SelectOption>
    <SelectOption>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Combobox>
);
