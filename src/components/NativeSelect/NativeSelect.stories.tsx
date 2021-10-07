import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { listOfStates } from "../Select/SampleData";
import { NativeSelect, NativeSelectProps } from "./NativeSelect";

export default {
  title: "Components/Select/Native Select",
  component: NativeSelect,
} as Meta<NativeSelectProps>;

export const NativeSelectExample = () => {
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
        hint="Please choose a State"
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
  hint: "Please choose a State",
  options: listOfStates,
};
