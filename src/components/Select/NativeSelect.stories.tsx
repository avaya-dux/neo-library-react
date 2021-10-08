import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { NativeSelect, NativeSelectProps } from "./NativeSelect";
import { listOfStates } from "./SampleData";

export default {
  title: "Components/Select/Native Select",
  component: NativeSelect,
} as Meta<NativeSelectProps>;

export const DemoNativeSelect = () => {
  const [selectedState, updateSelectedState] = useState("");
  return (
    <>
      <NativeSelect
        label="List of States"
        onChange={(event) => {
          console.log("selected value-> ", event.target.value);
          updateSelectedState(event.target.value);
        }}
        value={selectedState}
        helperText={["Please choose a State"]}
        options={listOfStates}
      />
      <button onClick={() => updateSelectedState("UT")}>
        Set value to "UT"
      </button>
    </>
  );
};

const Template: Story<NativeSelectProps> = (props: NativeSelectProps) => {
  return <NativeSelect {...props} />;
};

export const DefaultNativeSelect = Template.bind({});
DefaultNativeSelect.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  options: listOfStates,
};

export const SelectError = Template.bind({});
SelectError.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  errorText: ["error 1", "error 2"],
  options: listOfStates,
};

export const SelectRequired = Template.bind({});
SelectRequired.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  required: true,
  options: listOfStates,
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  disabled: true,
  options: listOfStates,
};
