import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { listOfStates } from "./SampleData";
import { Select } from "./Select";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Select",
  component: Select,
} as Meta<SelectProps>;

const optionsWithHint = listOfStates.map((item) => {
  const hint = {
    hint: `state ${item.value}`,
    disabled: item.value === "AK",
  };
  return { ...hint, ...item };
});

export const ControlledSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [errorText, updateErrorText] = useState<undefined | string[]>(
    undefined
  );
  return (
    <>
      <p>
        This is an example of a controlled Select. If you open the console
        window you will see that the selected element value is being displayed
        via <code>console.log</code>
      </p>
      <Select
        label="List of States"
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedStates(value);
        }}
        value={selectedStates}
        helperMessages={["Please choose a State"]}
        errorMessages={errorText}
        options={optionsWithHint}
      />
      <button onClick={() => updateSelectedStates(["UT"])}>
        Set value to "UT"
      </button>
      <button onClick={() => updateErrorText(["Error 1"])}>
        Display error
      </button>
    </>
  );
};

export const ControlledMultipleSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [errorText, updateErrorText] = useState<undefined | string[]>(
    undefined
  );

  return (
    <>
      <Select
        label="List of States"
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedStates(value);
        }}
        isMultipleSelect={true}
        value={selectedStates}
        helperMessages={["Please choose a State"]}
        errorMessages={errorText}
        options={optionsWithHint}
      />
      <button onClick={() => updateSelectedStates(["UT", "AL"])}>
        Set value to "UT", "AL"
      </button>

      <button onClick={() => updateErrorText(["Error 1"])}>
        Display error
      </button>

      <button onClick={() => updateErrorText(undefined)}>Display Helper</button>
    </>
  );
};

export const ValidateValuesSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [isRequired, updateRequired] = useState(true);
  const [errorText, updateErrorText] = useState<undefined | string[]>(
    undefined
  );
  const [helperText, updateHelperText] = useState<undefined | string[]>([
    "Please choose a State",
  ]);

  const onSubmitHandler = () => {
    console.log(selectedStates);
    if (JSON.stringify(selectedStates) === JSON.stringify(["0"])) {
      updateErrorText(["Field is required"]);
      updateHelperText(["Please choose a State"]);
      updateRequired(true);
    } else {
      updateHelperText(["success!"]);
      updateErrorText(undefined);
      updateRequired(false);
    }
  };
  return (
    <>
      <p>This is an example of a select validation and required.</p>
      <Select
        label="List of States"
        required={isRequired}
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedStates(value);
        }}
        value={selectedStates}
        helperMessages={helperText}
        errorMessages={errorText}
        options={optionsWithHint}
      />
      <button onClick={() => onSubmitHandler()}>Submit</button>
    </>
  );
};

const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

export const UncontrolledSelect = Template.bind({});
UncontrolledSelect.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  options: listOfStates,
};

export const SelectError = Template.bind({});
SelectError.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  errorMessages: ["error 1", "error 2"],
  options: listOfStates,
};

export const SelectRequired = Template.bind({});
SelectRequired.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  required: true,
  options: listOfStates,
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  disabled: true,
  options: listOfStates,
};

export const SelectLoading = Template.bind({});
SelectLoading.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  isLoading: true,
  loaderText: <i>Loading...</i>,
  options: listOfStates,
};
