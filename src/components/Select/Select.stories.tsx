import { Meta } from "@storybook/react/types-6-0";
import { useCallback, useEffect, useState } from "react";

import { Button, Form } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Select",
  component: Select,
} as Meta<SelectProps>;

const label = "Test label";

const handleSelectedValueChange = (value: string | string[]) => {
  console.log(value);
};

export const DefaultSelects = () => {
  return (
    <>
      <Select label={label} onSelectedValueChange={handleSelectedValueChange}>
        <SelectOption>Option 1</SelectOption>
        <SelectOption disabled>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>
      <Select
        isMultipleSelect
        label={label}
        onSelectedValueChange={handleSelectedValueChange}
      >
        <SelectOption>Option 1</SelectOption>
        <SelectOption disabled>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>
    </>
  );
};

export const SelectWithHelperText = () => {
  return (
    <Select
      isMultipleSelect
      label={label}
      helperText="This is helper text"
      id="neo-select"
    >
      <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );
};

export const DisabledSelect = () => {
  return (
    <Select label={label} disabled>
      <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );
};

export const RequiredMultipleSelectWithHelperText = () => {
  const helperTextExample = "Please select one";
  const [selectedOption, setSelectedOption] = useState<string[]>(["Choice 1"]);
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);

  const updateSelectedValue = useCallback(
    (value: any): any => {
      setSelectedOption(value);
      setHelperText(helperText);
      setErrorList([]);
    },
    [setSelectedOption, setHelperText, helperText, setErrorList]
  );

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedOption.length > 0) {
          alert(`you successfully submitted: ${selectedOption.join(", ")}`);
        }
      }}
    >
      <Select
        isMultipleSelect
        values={selectedOption}
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
    <Select
      isMultipleSelect
      label={label}
      errorList={["This is an error message"]}
      disabled
    >
      <SelectOption>Choice 1</SelectOption>
    </Select>
  );
};

export const LoadingMultipleSelect = () => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<string[]>([]);

  const fakeLoad = () => {
    setTimeout(() => {
      setOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fakeLoad();
    return () => {};
  }, []);

  return (
    <Select isMultipleSelect label={label} loading={loading}>
      {options.map((option, index) => (
        <SelectOption key={index}>{option}</SelectOption>
      ))}
    </Select>
  );
};

export const SelectsWithoutChildren = () => {
  return (
    <>
      <Select label="Test Label" />
      <Select label="Test label" isMultipleSelect />
    </>
  );
};

export const SelectsWithWrongChildren = () => {
  return (
    <>
      <Select label="Test Label">
        <p>Test wrong child</p>
      </Select>
      <Select label="Test Label">
        <SelectOption>Option 1</SelectOption>
      </Select>
      <Select isMultipleSelect label="Test Label">
        <p>Test wrong child</p>
      </Select>
      <Select isMultipleSelect label="Test Label">
        <SelectOption>Option 1</SelectOption>
      </Select>
    </>
  );
};

export const MoreThanOneMultipleSelect = () => {
  return (
    <>
      <Select isMultipleSelect label="First Multiple Select">
        <SelectOption>Option 1</SelectOption>
        <SelectOption>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>
      <Select isMultipleSelect label="Second Multiple Select">
        <SelectOption>Option 1</SelectOption>
        <SelectOption disabled>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>
    </>
  );
};
