import { Meta } from "@storybook/react/types-6-0";

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

export const DefaultSelect = () => {
  return (
    <Select
      label="Test label"
      items={items}
      onSelectedValueChange={handleSelectedValueChange}
    />
  );
};

export const SelectWithHelperText = () => {
  return (
    <Select label="Test label" items={items} helperText="This is helper text" />
  );
};

export const DisabledSelect = () => {
  return <Select label="Test label" items={items} disabled={true} />;
};

export const LoadingSelect = () => {
  return <Select label="Test label" items={items} loading={true} />;
};

export const RequiredSelect = () => {
  return <Select label="Test label" items={items} required />;
};

export const ErrorSelect = () => {
  return (
    <Select label="Test label" items={items} errorList={["This is an error"]} />
  );
};
