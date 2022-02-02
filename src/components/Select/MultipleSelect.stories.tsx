import { Meta } from "@storybook/react/types-6-0";

import { MultipleSelect, MultipleSelectOption } from "./MultipleSelect";
import { MultipleSelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Multiple Select",
  component: MultipleSelect,
} as Meta<MultipleSelectProps>;

export const TestMultipleSelect = () => {
  return (
    <MultipleSelect label="Test Label">
      <MultipleSelectOption>Option 1</MultipleSelectOption>
      <MultipleSelectOption>Option 2</MultipleSelectOption>
      <MultipleSelectOption>Option 3</MultipleSelectOption>
      <MultipleSelectOption>Option 4</MultipleSelectOption>
    </MultipleSelect>
  );
};
