import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { NativeSelect } from "./NativeSelect";
import { listOfStates } from "./SampleData";
import { NativeSelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Native Select",
  component: NativeSelect,
} as Meta<NativeSelectProps>;

const ListOfStatesArkansasDisabledPlusHint = listOfStates.map((item) => {
  const extraInfo = {
    hint: `state ${item.value}`,
    disabled: item.value === "AK",
  };
  return { ...extraInfo, ...item };
});

export const ControlledNativeSelect = () => {
  const [selectedState, updateSelectedState] = useState("");
  return (
    <>
      <p>
        This is an example of a controlled Native Select. If you open the
        console window you will see that the selected element value is being
        displayed via <code>console.log</code>
      </p>
      <br />
      <NativeSelect
        label="List of States"
        onChange={(value) => {
          console.log("selected value-> ", value);
          updateSelectedState(value);
        }}
        value={selectedState}
        helperMessages={["Please choose a State"]}
        options={ListOfStatesArkansasDisabledPlusHint}
      />
      <button onClick={() => updateSelectedState("UT")}>
        Set value to "UT"
      </button>
    </>
  );
};

export const ValidateValuesNativeSelect = () => {
  const [selectedState, updateSelectedState] = useState("0");
  const [isRequired, updateRequired] = useState(true);
  const [errorText, updateErrorText] = useState<undefined | string[]>(
    undefined
  );
  const [helperText, updateHelperText] = useState<undefined | string[]>([
    "Please choose a State",
  ]);

  const onSubmitHandler = () => {
    console.log(selectedState);
    if (selectedState === "0") {
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
      <br />
      <NativeSelect
        label="List of States"
        required={isRequired}
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedState(value);
        }}
        value={selectedState}
        helperMessages={helperText}
        errorMessages={errorText}
        options={listOfStates}
      />
      <button onClick={() => onSubmitHandler()}>Submit</button>
    </>
  );
};

const Template: Story<NativeSelectProps> = (props: NativeSelectProps) => {
  return <NativeSelect {...props} />;
};

export const UncontrolledNativeSelect = Template.bind({});
UncontrolledNativeSelect.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  options: listOfStates,
};

export const NativeSelectError = Template.bind({});
NativeSelectError.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  errorMessages: ["error 1", "error 2"],
  options: listOfStates,
};

export const NativeSelectRequired = Template.bind({});
NativeSelectRequired.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  required: true,
  options: listOfStates,
};

export const NativeSelectDisabled = Template.bind({});
NativeSelectDisabled.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  disabled: true,
  options: listOfStates,
};

export const NativeSelectLoading = Template.bind({});
NativeSelectLoading.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  isLoading: true,
  options: listOfStates,
};
