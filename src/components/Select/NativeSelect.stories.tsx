import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { NativeSelect } from "./NativeSelect";
import { NativeSelectProps } from "./SelectTypes";
import { listOfStates } from "./SampleData";

export default {
  title: "Components/Select/Native Select",
  component: NativeSelect,
} as Meta<NativeSelectProps>;

export const ControlledNativeSelect = () => {
  const [selectedState, updateSelectedState] = useState([""]);
  return (
    <>
      <p>
        This is an example of a controlled Native Select. If you open the
        console window you will see that the selected element value is being
        displayed via <code>console.log</code>
      </p>
      <NativeSelect
        label="List of States"
        onChange={(values) => {
          console.log("selected value-> ", values);
          updateSelectedState(values);
        }}
        value={selectedState}
        helperText={["Please choose a State"]}
        options={listOfStates}
      />
      <button onClick={() => updateSelectedState(["UT"])}>
        Set value to "UT"
      </button>
    </>
  );
};

const Template: Story<NativeSelectProps> = (props: NativeSelectProps) => {
  return <NativeSelect {...props} />;
};

export const UncontrolledNativeSelect = Template.bind({});
UncontrolledNativeSelect.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  options: listOfStates,
};

export const NativeSelectError = Template.bind({});
NativeSelectError.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  errorText: ["error 1", "error 2"],
  options: listOfStates,
};

export const NativeSelectRequired = Template.bind({});
NativeSelectRequired.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  required: true,
  options: listOfStates,
};

export const NativeSelectDisabled = Template.bind({});
NativeSelectDisabled.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  disabled: true,
  options: listOfStates,
};

export const NativeSelectLoading = Template.bind({});
NativeSelectLoading.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  isLoading: true,
  options: listOfStates,
};
