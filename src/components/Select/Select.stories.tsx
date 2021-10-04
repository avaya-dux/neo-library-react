import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Select, SelectProps } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<SelectProps>;

const options = [
  { label: "Alabama", value: "AL" },
  { label: "Alaska", value: "AK" },
  { label: "Arizona", value: "AZ" },
  { label: "Arkansas", value: "AR" },
  { label: "California", value: "CA" },
  { label: "Colorado", value: "CO" },
  { label: "Connecticut", value: "CT" },
  { label: "Delaware", value: "DE" },
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "Hawaii", value: "HI" },
  { label: "Idaho", value: "ID" },
  { label: "Illinois", value: "IL" },
  { label: "Indiana", value: "IN" },
  { label: "Iowa", value: "IA" },
  { label: "Kansas", value: "KS" },
  { label: "Kentucky", value: "KY" },
  { label: "Louisiana", value: "LA" },
  { label: "Maine", value: "ME" },
  { label: "Maryland", value: "MD" },
  { label: "Massachusetts", value: "MA" },
  { label: "Michigan", value: "MI" },
  { label: "Minnesota", value: "MN" },
  { label: "Mississippi", value: "MS" },
  { label: "Missouri", value: "MO" },
  { label: "Montana", value: "MT" },
  { label: "Nebraska", value: "NE" },
  { label: "Nevada", value: "NV" },
  { label: "New Hampshire", value: "NH" },
  { label: "New Jersey", value: "NJ" },
  { label: "New Mexico", value: "NM" },
  { label: "New York", value: "NY" },
  { label: "North Carolina", value: "NC" },
  { label: "North Dakota", value: "ND" },
  { label: "Ohio", value: "OH" },
  { label: "Oklahoma", value: "OK" },
  { label: "Oregon", value: "OR" },
  { label: "Pennsylvania", value: "PA" },
  { label: "Rhode Island", value: "RI" },
  { label: "South Carolina", value: "SC" },
  { label: "South Dakota", value: "SD" },
  { label: "Tennessee", value: "TN" },
  { label: "Texas", value: "TX" },
  { label: "Utah", value: "UT" },
  { label: "Vermont", value: "VT" },
  { label: "Virginia", value: "VA" },
  { label: "Washington", value: "WA" },
  { label: "West Virginia", value: "WV" },
  { label: "Wisconsin", value: "WI" },
  { label: "Wyoming", value: "WY" },
];

export const DemoUpdateByPropChange = () => {
  const [selectedStates, updateSelectedStates] = useState(["AL"]);
  return (
    <>
      <Select
        label="List of States"
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedStates(value);
        }}
        value={selectedStates}
        hint="Please choose a State"
        options={options}
      />
      <button onClick={() => updateSelectedStates(["UT"])}>
        Set value to "UT"
      </button>
    </>
  );
};

export const DemoMultipleSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["AL"]);
  const optionsWithHint = options.map((item) => {
    const hint = { hint: `state ${item.value}` };
    return { ...hint, ...item };
  });
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
        hint="Please choose a State"
        options={optionsWithHint}
      />
      <button onClick={() => updateSelectedStates(["UT", "AL"])}>
        Set value to "UT", "AL"
      </button>
    </>
  );
};

export const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

Template.args = {
  label: "List of States",
  hint: "Please choose a State",
  options: options,
};
