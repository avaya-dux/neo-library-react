import { Meta } from "@storybook/react/types-6-0";
import { useCallback, useEffect, useState } from "react";

import { Button, Form, Sheet } from "components";

import { Select } from "./Select";
import { SelectOption } from "./SelectOption";
import { SelectProps } from "./utils/SelectTypes";

export default {
  title: "Components/Select",
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

export const BasicSelects = () => {
  const [favFood, setFavFood] = useState("");
  const [foods, setFoods] = useState<string[]>([]);

  return (
    <Sheet title="Default Single and Multi Select" style={{ width: 400 }}>
      <Select
        helperText="Please select one"
        label="Select a favorite food"
        onSelectedValueChange={(value) => setFavFood(value as string)}
      >
        {foodOptions}
      </Select>

      <Select
        helperText="Please select one or more"
        label="Select a few nice foods"
        multiple
        onSelectedValueChange={(value) => setFoods(value as string[])}
      >
        {foodOptions}
      </Select>

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

export const Searchable = () => {
  const [favFood, setFavFood] = useState("");
  const [foods, setFoods] = useState<string[]>([]);

  return (
    <Sheet title="Searchable Single and Multi Select" style={{ width: 400 }}>
      <Select
        helperText="Please select one"
        label="Select a favorite food"
        searchable
        onSelectedValueChange={(value) => {
          setFavFood(value as string);
        }}
      >
        {foodOptions}
      </Select>

      {/* BUG: attempting to toggle the same option multiple times does not work */}
      <Select
        id="multi-searchable-select"
        helperText="Please select one or more"
        label="Select a few nice foods"
        multiple
        onSelectedValueChange={(value) => setFoods(value as string[])}
        searchable
      >
        {foodOptions}
      </Select>

      <div>
        <p>Favorite Food: {favFood || "None selected"}</p>
      </div>

      <div>
        <p>Foods Selection: {foods.length === 0 && "None Selected"}</p>

        <ul>
          {foods.map((food) => (
            <li key={food}>{food}</li>
          ))}
        </ul>
      </div>
    </Sheet>
  );
};

export const Disabled = () => (
  <Select label="I am disabled" disabled>
    <SelectOption>Option 1</SelectOption>
    <SelectOption disabled>Option 2</SelectOption>
    <SelectOption>Option 3</SelectOption>
    <SelectOption>Option 4</SelectOption>
  </Select>
);

export const RequiredInForm = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedFood, setSelectedFood] = useState(foodOptions[4].props.value);
  const [errorList, setErrorList] = useState<string[]>([]);

  const updateSelectedValue = useCallback(
    (value) => {
      setSelectedOption(value);
      setErrorList([]);
    },
    [setSelectedOption, setErrorList]
  );

  return (
    <section>
      <div style={{ marginBottom: 10 }}>
        {/* BUG: not working as intended */}
        <b>IMPORTANT NOTE:</b>

        <p>
          Reset and Submit are not working as intended. Please stay tuned for
          updates
        </p>
      </div>

      <Form
        id="select-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedOption.length > 0) {
            alert(`you successfully submitted: ${selectedOption}`);
          }
        }}
      >
        <Select
          errorList={errorList}
          label="Would you like to choose a favorite food? Or multiple foods?"
          onSelectedValueChange={updateSelectedValue}
          required
        >
          <SelectOption value="1">Just One Favorite</SelectOption>

          <SelectOption value="2" selected>
            Multiple Foods
          </SelectOption>
        </Select>

        <Select
          disabled={selectedOption !== "1"}
          label="Favorite Food"
          onSelectedValueChange={setSelectedFood}
          searchable
          value={selectedFood}
        >
          {foodOptions}
        </Select>

        <Select
          defaultValue={[foodOptions[0].props.value]}
          disabled={selectedOption !== "2"}
          label="Multiple Foods Selection"
          multiple
        >
          {foodOptions}
        </Select>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              // BUG: reset not working as intended
              setSelectedOption("");
              setErrorList([]);
            }}
          >
            Reset
          </Button>

          <Button
            style={{ marginRight: "8px" }}
            type="submit"
            onClick={() => {
              if (selectedOption.length < 1) {
                setErrorList(["This is a required field"]);
              }
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </section>
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
