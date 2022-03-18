import { Meta } from "@storybook/react/types-6-0";

import { useState, useEffect, useCallback } from "react";

import { Form, Button } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Combobox",
  component: Select,
} as Meta<SelectProps>;

const label = "Test label";

const values = ["Apples"];

export const DefaultCombobox = () => (
  <Select label={label} isCombobox>
    <SelectOption>Apples</SelectOption>
    <SelectOption>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Select>
);

export const MultipleSelectCombobox = () => (
  <Select label={label} isMultipleSelect isCombobox values={values}>
    <SelectOption>Apples</SelectOption>
    <SelectOption disabled>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Select>
);

export const DisabledCombobox = () => {
  return (
    <Select label={label} isCombobox disabled>
      <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );
};

export const RequiredMultipleSelectComboboxHelperText = () => {
  const helperTextExample = "Please select one";
  const [selectedValues, setSelectedValues] = useState<string[]>(["Choice 1"]);
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);

  const updateSelectedValue = useCallback(
    (value: any): any => {
      console.log(value);
      console.log(selectedValues);

      setSelectedValues(value);

      setHelperText(helperText);
      setErrorList([]);
    },
    [selectedValues, setHelperText, helperText, setErrorList]
  );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedValues.length > 0) {
          alert(`you successfully submitted: ${selectedValues.join(", ")}`);
        }
      }}
    >
      <Select
        isMultipleSelect
        isCombobox
        values={selectedValues}
        onSelectedValueChange={updateSelectedValue}
        label={label}
        helperText={helperText}
        errorList={errorList}
        required
      >
        <SelectOption>Choice 1</SelectOption>
        <SelectOption>Choice 2</SelectOption>
      </Select>
      <Button
        style={{ marginRight: "8px" }}
        type="submit"
        onClick={() => {
          if (selectedValues.length < 1) {
            setHelperText("");
            setErrorList(["This is a required field"]);
          }
        }}
      >
        Submit
      </Button>
      <Button
        type="reset"
        onClick={() => {
          setSelectedValues([]);
          setHelperText(helperTextExample);
          setErrorList([]);
        }}
      >
        Reset
      </Button>
    </Form>
  );
};

export const LoadingMultipleSelectCombobox = () => {
  const [loading, setLoading] = useState(true);
  const options: string[] = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const fakeLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fakeLoad();
    return () => {};
  });

  return (
    <Select isMultipleSelect isCombobox label={label} loading={loading}>
      {options.map((option, index) => (
        <SelectOption key={index}>{option}</SelectOption>
      ))}
    </Select>
  );
};
