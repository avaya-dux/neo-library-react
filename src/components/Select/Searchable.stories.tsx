import { Meta } from "@storybook/react/types-6-0";
import { useCallback, useEffect, useState } from "react";

import { Button, Form } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./utils/SelectTypes";

export default {
  title: "Components/Select/Searchable",
  component: Select,
} as Meta<SelectProps>;

const label = "Test label";

const values = ["Apples"];

export const DefaultSearchable = () => (
  <Select label={label} searchable>
    <SelectOption>Apples</SelectOption>
    <SelectOption>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Select>
);

export const MultipleSelectSearchable = () => (
  <Select label={label} multiple searchable values={values}>
    <SelectOption>Apples</SelectOption>
    <SelectOption disabled>Bananas</SelectOption>
    <SelectOption>Oranges</SelectOption>
  </Select>
);

export const DisabledSearchable = () => {
  // BUG: allows typing while disabled
  return (
    <Select label={label} searchable disabled>
      <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );
};

export const RequiredMultipleSelectSearchableHelperText = () => {
  const helperTextExample = "Please select one";
  const [selectedValues, setSelectedValues] = useState<string[]>(["Choice 1"]);
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);

  const updateSelectedValue = useCallback(
    (value: string | string[]): void => {
      console.log(value);
      console.log(selectedValues);

      setSelectedValues(value as string[]);

      setHelperText(helperText);
      setErrorList([]);
    },
    [selectedValues, setHelperText, helperText, setErrorList]
  );

  // BUG: if users start typing, it is a bad UX (plus, dropdown stops working on click, we need to add a "no results found" message)
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
        multiple
        searchable
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

export const LoadingMultipleSelectSearchable = () => {
  const [loading, setLoading] = useState(true);
  const options: string[] = ["Option 1", "Option 2", "Option 3", "Option 4"];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Select multiple searchable label={label} loading={loading}>
      {options.map((option, index) => (
        <SelectOption key={index}>{option}</SelectOption>
      ))}
    </Select>
  );
};
