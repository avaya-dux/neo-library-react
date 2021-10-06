import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { listOfStates } from "../Select/SampleData";
import { NativeSelect, NativeSelectProps } from "./NativeSelect";

export default {
  title: "Components/Select/NativeSelect",
  component: NativeSelect,
} as Meta<NativeSelectProps>;

export const NativeSelectExample = () => {
  const [color, updateColor] = useState("AL");
  return (
    <>
      <NativeSelect
        label="List of States"
        onChange={(event) => {
          console.log("selected value-> ", event.target.value);
          updateColor(event.target.value);
        }}
        value={color}
        hint="Please choose a State"
        options={listOfStates}
      />
      <button onClick={() => updateColor("UT")}>Set value to "UT"</button>
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
