import { Meta } from "@storybook/react/types-6-0";

import {
  MultipleSelect,
  MultipleSelectOption,
  TestMultipleSelectProps,
} from "./MultipleSelect";
import { MultipleSelectItem } from "./SelectTypes";

export default {
  title: "Components/Select/Multiple Select",
  component: MultipleSelect,
} as Meta<TestMultipleSelectProps>;

const items: MultipleSelectItem[] = [
  { text: "Option 1" },
  { text: "Option 2", disabled: true },
  { text: "Option 3" },
];

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
