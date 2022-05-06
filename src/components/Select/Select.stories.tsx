import { Meta } from "@storybook/react/types-6-0";
import { useCallback, useEffect, useState } from "react";

import { Button, Form, Sheet } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./utils/SelectTypes";

export default {
  title: "Components/Select/Select",
  component: Select,
} as Meta<SelectProps>;

const foodOptions = [
  <SelectOption value="apple" key="apple">
    Apple
  </SelectOption>,
  <SelectOption value="gravel" key="gravel" helperText="Not a Food" disabled>
    Gravel
  </SelectOption>,
  <SelectOption value="broccoli" key="broccoli" helperText="Vegetable">
    Broccoli
  </SelectOption>,
  <SelectOption value="banana" key="banana">
    Banana
  </SelectOption>,
  <SelectOption value="pear" key="pear">
    Pear
  </SelectOption>,
  <SelectOption value="blueberries" key="blueberries">
    Blueberries
  </SelectOption>,
  <SelectOption value="grapes" key="grapes">
    Grapes
  </SelectOption>,
  <SelectOption value="oranges" key="oranges">
    Oranges
  </SelectOption>,
];

export const DefaultSelects = () => {
  const [favFood, setFavFood] = useState("");
  const [foods, setFoods] = useState<string[]>([]);

  return (
    <Sheet title="Default Single and Multi Select" style={{ width: 400 }}>
      <Select
        label="Select a favorite food"
        helperText="Please select one"
        onSelectedValueChange={(value) => {
          setFavFood(value as string);
        }}
      >
        {foodOptions}
      </Select>

      <Select
        multiple
        label="Select a few nice foods"
        helperText="Please select one or more"
        onSelectedValueChange={(value) => setFoods(value as string[])}
      >
        {foodOptions}
      </Select>

      <hr />

      <div>
        <p>Favorite Food: {favFood || "None selected"}</p>
      </div>

      <div>
        <p>Nice Foods Selection: {foods.length === 0 && "None Selected"}</p>

        <ul>
          {foods.map((food) => (
            <li key={food}>{food}</li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
};

export const DisabledSelect = () => (
  <Select label="I am disabled" disabled>
    <SelectOption>Option 1</SelectOption>
      <SelectOption disabled>Option 2</SelectOption>
      <SelectOption>Option 3</SelectOption>
      <SelectOption>Option 4</SelectOption>
    </Select>
  );

export const RequiredMultipleSelectWithHelperText = () => {
  const helperTextExample = "Please select one";
  const [selectedOption, setSelectedOption] = useState<string[]>(["Choice 1"]);
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);

  const updateSelectedValue = useCallback(
    (value) => {
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
        multiple
        selectedValues={selectedOption}
        onSelectedValueChange={updateSelectedValue}
        label="Select one or more"
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

export const LoadOptions = () => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setOptions(["Option 1", "Option 2", "Option 3", "Option 4"]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Select multiple label="Mock Loading Example" loading={loading}>
      {options.map((option, index) => (
        <SelectOption key={index}>{option}</SelectOption>
      ))}
    </Select>
  );
};

export const SelectsWithoutChildren = () => (
  <Sheet title="No Options for single and multi Select" style={{ width: 400 }}>
    <Select label="Single Select" noOptionsMessage="Empty" />

    <Select label="Multiple Select" multiple />
  </Sheet>
);

export const SelectsWithWrongChildren = () => {
  return (
    <Sheet title="'Wrong' children" style={{ width: 400 }}>
      <Select label="Single Select, <p> element as child">
        <p>Paragraph One</p>
        <p>Paragraph Two</p>
      </Select>

      <Select multiple label="Multi Select, <p> element as child">
        <p>Paragraph One</p>
        <p>Paragraph Two</p>
      </Select>
    </Sheet>
  );
};

export const MoreThanOneMultipleSelect = () => {
  return (
    <Sheet title="Keyboard Navigation between Selects" style={{ width: 400 }}>
      <Select multiple label="First Multiple Select">
        <SelectOption>Option 1</SelectOption>
        <SelectOption>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>

      <Select multiple label="Second Multiple Select">
        <SelectOption>Option 1</SelectOption>
        <SelectOption disabled>Option 2</SelectOption>
        <SelectOption>Option 3</SelectOption>
        <SelectOption>Option 4</SelectOption>
      </Select>
    </Sheet>
  );
};
