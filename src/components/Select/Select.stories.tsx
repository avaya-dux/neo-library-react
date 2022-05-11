import { Meta } from "@storybook/react/types-6-0";
import { useEffect, useState } from "react";

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
        onChange={(value) => setFavFood(value as string)}
      >
        {foodOptions}
      </Select>

      <Select
        helperText="Please select one or more"
        label="Select a few nice foods"
        multiple
        onChange={(value) => setFoods(value as string[])}
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
        onChange={(value) => {
          setFavFood(value as string);
        }}
      >
        {foodOptions}
      </Select>

      <Select
        id="multi-searchable-select"
        helperText="Please select one or more"
        label="Select a few nice foods"
        multiple
        onChange={(value) => setFoods(value as string[])}
        placeholder=""
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

export const DefaultValues = () => (
  <section>
    <Select label="Second Options is selected via `selected` prop">
      <SelectOption>first option</SelectOption>

      <SelectOption selected>second option</SelectOption>
    </Select>

    <Select
      label="Third Option is selected via `defaultValue` prop"
      defaultValue={foodOptions[2].props.value}
    >
      {foodOptions}
    </Select>
  </section>
);

export const RequiredInForm = () => {
  const [selection, setSelection] = useState("2");
  const [selectedFood, setSelectedFood] = useState(foodOptions[4].props.value);
  const [foodErrorList, setFoodErrorList] = useState<string[]>([]);
  const [selectedFoods, setSelectedFoods] = useState([
    foodOptions[4].props.value,
  ]);
  const [foodsErrorList, setFoodsErrorList] = useState<string[]>([]);

  return (
    <section>
      <div style={{ marginBottom: 10 }}>
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
          if (selectedFood || selectedFoods.length) {
            const submission =
              selection === "1" ? selectedFood : selectedFoods.join(", ");
            alert(`you successfully submitted: ${submission}`);
          } else if (selection === "1") {
            setFoodErrorList(["Required"]);
          } else if (selection === "2") {
            setFoodsErrorList(["Required"]);
          }
        }}
      >
        <Select
          label="Would you like to choose a favorite food, or multiple foods?"
          onChange={(v) => setSelection(v as string)}
        >
          <SelectOption value="1">Just One Favorite</SelectOption>

          <SelectOption value="2" selected>
            Multiple Foods
          </SelectOption>
        </Select>

        <Select
          disabled={selection !== "1"}
          errorList={foodErrorList}
          label="Favorite Food"
          onChange={setSelectedFood}
          searchable
          value={selectedFood}
        >
          {foodOptions}
        </Select>

        <Select
          disabled={selection !== "2"}
          errorList={foodsErrorList}
          label="Multiple Foods Selection"
          multiple
          onChange={(value) => setSelectedFoods(value as string[])}
          value={selectedFoods}
        >
          {foodOptions}
        </Select>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="reset"
            variant="secondary"
            onClick={() => {
              setSelectedFood(null);
              setSelectedFoods([]);
              setFoodErrorList([]);
              setFoodsErrorList([]);
            }}
          >
            Reset
          </Button>

          <Button
            style={{ marginRight: "8px" }}
            type="submit"
            onClick={(e) => {
              if (selection === "1" && !selectedFood) {
                setFoodErrorList(["Required"]);
                e.preventDefault();
                e.stopPropagation();
              } else if (selection === "2" && selectedFoods.length === 0) {
                setFoodsErrorList(["Required"]);
                e.preventDefault();
                e.stopPropagation();
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

export const Empty = () => (
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
