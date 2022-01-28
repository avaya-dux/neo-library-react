import { Meta } from "@storybook/react/types-6-0";

import { SelectProps, MultipleSelectProps } from "./SelectTypes";

import { Select } from "./Select";
import { MultipleSelect } from "./MultipleSelect";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<SelectProps>;

export const SelectExample = () => {
  const options = [
    { text: "Option 1" },
    { text: "Option 2", disabled: true },
    { text: "Option 3" },
  ];

  return <Select label="Test label" items={options} />;
};

export const MultipleSelectExample = () => {
  const options = [
    { text: "Option 1", helperText: "This is a multiple select" },
    { text: "Option 2", disabled: true },
    { text: "Option 3" },
  ];

  return (
    <MultipleSelect
      label="Test label"
      items={options}
    />
  );
};
