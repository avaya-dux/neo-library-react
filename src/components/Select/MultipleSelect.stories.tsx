import { Meta } from "@storybook/react/types-6-0";

import { useState, useEffect } from "react";

import { Form, Button } from "components";

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
  const helperTextExample = "Please select one";
  const [selectedOption, setSelectedOption] = useState<string[]>(["Choice 1"]);
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);

  const updateSelectedValue = (value: any): any => {
    setSelectedOption(value);
    setHelperText(helperText);
    setErrorList([]);
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedOption.length > 0) {
          alert(`you successfully submitted: ${selectedOption.join(", ")}`);
        }
      }}
    >
      <MultipleSelect
        values={selectedOption}
        onSelectedValueChange={updateSelectedValue}
        label={label}
        helperText={helperText}
        errorList={errorList}
        required
      >
        <MultipleSelectOption>Choice 1</MultipleSelectOption>
        <MultipleSelectOption>Choice 2</MultipleSelectOption>
      </MultipleSelect>
      <Button
        style={{ marginRight: "8px" }}
        type="submit"
        onClick={() => {
          if (selectedOption.length < 1) {
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
          setSelectedOption([]);
          setHelperText(helperTextExample);
          setErrorList([]);
        }}
      >
        Reset
      </Button>
    </Form>
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
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<string[]>([]);

  setTimeout(() => {
    setOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
    setLoading(false);
  }, 2000);

  return (
    <MultipleSelect label={label} loading={loading}>
      {options.map((option, index) => (
        <MultipleSelectOption key={index}>{option}</MultipleSelectOption>
      ))}
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

export const MoreThanOneMultipleSelect = () => {
  return (
    <>
      <MultipleSelect label="First Multiple Select">
        <MultipleSelectOption>Option 1</MultipleSelectOption>
        <MultipleSelectOption>Option 2</MultipleSelectOption>
        <MultipleSelectOption>Option 3</MultipleSelectOption>
        <MultipleSelectOption>Option 4</MultipleSelectOption>
      </MultipleSelect>
      <MultipleSelect label="Second Multiple Select">
        <MultipleSelectOption>Option 1</MultipleSelectOption>
        <MultipleSelectOption disabled>Option 2</MultipleSelectOption>
        <MultipleSelectOption>Option 3</MultipleSelectOption>
        <MultipleSelectOption>Option 4</MultipleSelectOption>
      </MultipleSelect>
    </>
  );
};
