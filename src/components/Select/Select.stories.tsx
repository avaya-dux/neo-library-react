import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Select, SelectProps } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<SelectProps>;

const options = [
  { label: "Black", value: "1" },
  { label: "Green", value: "2" },
  { label: "White", value: "3" },
];

export const BasicLayout = () => {
  const [color, updateColor] = useState("1");
  return (
    <>
      <Select
        label="Enable Feature"
        value={color}
        hint="Color"
        options={options}
        layout="basic"
      />
      <button onClick={() => updateColor("3")}>change Color</button>
    </>
  );
};

export const BasicLayoutChangeEvent = () => {
  return (
    <>
      <Select
        label="Enable Feature"
        onChange={(event) => {
          console.log("select value-> ", event.target.value);
        }}
        hint="Color"
        options={options}
        layout="basic"
      />
    </>
  );
};

export const StandardLayout = () => {
  // const defaultValue: string | number = 1;
  const [color, updateColor] = useState("1");
  return (
    <>
      <Select
        label="Enable Feature"
        onSelected={(value) => {
          console.log("select value-> ", value);
          updateColor(value);
        }}
        value={color}
        hint="Color"
        options={options}
        layout="standard"
      />
      <button onClick={() => updateColor("3")}>change Color</button>
    </>
  );
};
/*
export const StandardLayoutChangeEvent = () => {
  return (
    <>
      <Select
        label="Enable Feature"
        onChange={(event) => {
          console.log("select value-> ", event.target.value);
        }}
        hint="Color"
        options={options}
        layout="standard"
      />
    </>
  );
};
*/
export const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

Template.args = {
  label: "Enable Feature",
  options: options,
};
