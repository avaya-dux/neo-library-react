import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Select, SelectProps } from "./Select";
import { listOfStates } from "./SampleData";

export default {
  title: "Components/Select/Select",
  component: Select,
} as Meta<SelectProps>;

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
        helperText={["Please choose a State"]}
        options={listOfStates}
      />
      <button onClick={() => updateSelectedStates(["UT"])}>
        Set value to "UT"
      </button>
    </>
  );
};

export const DemoMultipleSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["AL"]);
  const optionsWithHint = listOfStates.map((item) => {
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
        helperText={["Please choose a State"]}
        options={optionsWithHint}
      />
      <button onClick={() => updateSelectedStates(["UT", "AL"])}>
        Set value to "UT", "AL"
      </button>
    </>
  );
};

const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

export const DefaultSelect = Template.bind({});
DefaultSelect.args = {
  label: "List of States",
  helperText: ["Please choose a State"],
  errorText: ["error 1", "error 2"],
  options: listOfStates,
};
