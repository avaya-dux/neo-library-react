import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Select, SelectProps } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<SelectProps>;

const options = [
  { label: "Black", value: "black" },
  { label: "Green", value: "green" },
  { label: "White", value: "white" },
];

export const Default = () => {
  const [color, updateColor] = useState("white");
  return (
    <>
      <Select
        label="Enable Feature"
        onChange={(event) => {
          console.log("select value-> ", event.target.value);
          updateColor(event.target.value);
        }}
        value={color}
        hint="Color"
        options={options}
      />
      <button onClick={() => updateColor("green")}>change Color</button>
    </>
  );
};

export const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

Template.args = {
  label: "Enable Feature",
  options: options,
};
