import { Meta, Story } from "@storybook/react/types-6-0";

import { useState, useEffect } from "react";

import { Form, Button } from "components";

import { Select } from "./Select";
import { MultipleSelectOption, SelectOption } from "./SelectChildren";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Select",
  component: Select,
} as Meta<SelectProps>;

const label = "Test label";

const handleSelectedValueChange = (value: any) => {
  console.log(value);
};

export const DefaultSelect = () => {
  return (
    <Select label={label} onSelectedValueChange={handleSelectedValueChange}>
      <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );
};

export const DefaultMultipleSelect = () => {
  return (
    <Select
      isMultipleSelect
      label={label}
      onSelectedValueChange={handleSelectedValueChange}
    >
      <MultipleSelectOption>Option 1</MultipleSelectOption>
      <MultipleSelectOption disabled>Option 2</MultipleSelectOption>
      <MultipleSelectOption>Option 3</MultipleSelectOption>
      <MultipleSelectOption>Option 4</MultipleSelectOption>
    </Select>
  );
};

export const SelectWithHelperText = () => {
  return (
    <Select isMultipleSelect label={label} helperText={"This is helper text"}>
      <MultipleSelectOption>Option 1</MultipleSelectOption>
      <MultipleSelectOption disabled>Option 2</MultipleSelectOption>
      <MultipleSelectOption>Option 3</MultipleSelectOption>
      <MultipleSelectOption>Option 4</MultipleSelectOption>
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
      <Select
        isMultipleSelect
        values={selectedOption}
        onSelectedValueChange={updateSelectedValue}
        label={label}
        helperText={helperText}
        errorList={errorList}
        required
      >
        <MultipleSelectOption>Choice 1</MultipleSelectOption>
        <MultipleSelectOption>Choice 2</MultipleSelectOption>
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
      <MultipleSelectOption>Choice 1</MultipleSelectOption>
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
    <Select label={label} loading={loading}>
      {options.map((option, index) => (
        <MultipleSelectOption key={index}>{option}</MultipleSelectOption>
      ))}
    </Select>
  );
};

export const MultipleSelectWithoutChildren = () => {
  return <Select label="Test Label" />;
};

export const SelectsWithWrongChildren = () => {
  return (
    <>
      <Select label="Test Label">
        <p>Test wrong child</p>
      </Select>
      <Select isMultipleSelect label="Test Label">
        <p>Test wrong child</p>
      </Select>
    </>
  );
};

// export const MoreThanOneMultipleSelect = () => {
//   return (
//     <>
//       <MultipleSelect label="First Multiple Select">
//         <MultipleSelectOption>Option 1</MultipleSelectOption>
//         <MultipleSelectOption>Option 2</MultipleSelectOption>
//         <MultipleSelectOption>Option 3</MultipleSelectOption>
//         <MultipleSelectOption>Option 4</MultipleSelectOption>
//       </MultipleSelect>
//       <MultipleSelect label="Second Multiple Select">
//         <MultipleSelectOption>Option 1</MultipleSelectOption>
//         <MultipleSelectOption disabled>Option 2</MultipleSelectOption>
//         <MultipleSelectOption>Option 3</MultipleSelectOption>
//         <MultipleSelectOption>Option 4</MultipleSelectOption>
//       </MultipleSelect>
//     </>
//   );
// };
