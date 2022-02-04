import { Meta, Story } from "@storybook/react/types-6-0";

import { MultipleSelect, MultipleSelectOption } from "./MultipleSelect";
import { MultipleSelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Multiple Select",
  component: MultipleSelect,
} as Meta<MultipleSelectProps>;

const label = "Test label";

const handleSelectedValueChange = (value: any) => {
  console.log(value);
};

export const DefaultMultipleSelect = () => {
  return (
    <MultipleSelect
      label={label}
      onSelectedValueChange={handleSelectedValueChange}
    >
      <MultipleSelectOption>Option 1</MultipleSelectOption>
      <MultipleSelectOption disabled>Option 2</MultipleSelectOption>
      <MultipleSelectOption>Option 3</MultipleSelectOption>
      <MultipleSelectOption>Option 4</MultipleSelectOption>
    </MultipleSelect>
  );
};

export const RequiredMultipleSelectWithHelperText = () => {
  return (
    <MultipleSelect label={label} helperText="This is helper text" required>
      <MultipleSelectOption>Choice 1</MultipleSelectOption>
      <MultipleSelectOption>Choice 2</MultipleSelectOption>
    </MultipleSelect>
  );
};

export const DisabledMultipleSelectWithErrorState = () => {
  return (
    <MultipleSelect
      label={label}
      errorList={["This is an error message"]}
      disabled
    >
      <MultipleSelectOption>Choice 1</MultipleSelectOption>
    </MultipleSelect>
  );
};

export const LoadingMultipleSelect = () => {
  return (
    <MultipleSelect label={label} loading>
      <MultipleSelectOption>Choice 1</MultipleSelectOption>
    </MultipleSelect>
  );
};

export const MultipleSelectWithoutChildren = () => {
  return <MultipleSelect label="Test Label" />;
};

export const MultipleSelectWithWrongChildren = () => {
  return (
    <MultipleSelect label="Test Label">
      <p>Test wrong child</p>
    </MultipleSelect>
  );
};
