import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components/Button";

import {
  errorMessagesDemo,
  helperMessagesDemo,
  listOfStates,
} from "../SampleData";
import { NativeSelectProps } from "../SelectTypes";
import { NativeSelect } from "./NativeSelect";

export default {
  title: "Components/Form/Select/Native Select",
  component: NativeSelect,
} as Meta<NativeSelectProps>;

const ListOfStatesArkansasDisabledPlusHint = listOfStates.map((item) => {
  const extraInfo = {
    hint: `state ${item.value}`,
    isDisabled: item.value === "AK",
  };
  return { ...extraInfo, ...item };
});

export const ControlledNativeSelect = () => {
  const [selectedState, updateSelectedState] = useState("");
  const [errorTexts, updateErrorTexts] = useState<string[]>([]);
  return (
    <>
      <p>This is an example of a controlled Native Select.</p>
      <br />
      <NativeSelect
        label="List of States"
        onChange={(e) => {
          updateSelectedState(e.target.value);
        }}
        value={selectedState}
        helperMessages={helperMessagesDemo}
        errorMessages={errorTexts}
        options={ListOfStatesArkansasDisabledPlusHint}
      />
      <Button
        onClick={() => updateSelectedState("UT")}
        label="Set value to UT"
      />
      &nbsp;
      <Button
        onClick={() => updateErrorTexts(errorMessagesDemo)}
        label=" Display errors"
      />
      &nbsp;
      <Button onClick={() => updateErrorTexts([])} label=" Display Helper" />
    </>
  );
};

export const ValidateValuesNativeSelect = () => {
  const [selectedState, updateSelectedState] = useState("0");
  const [isRequired, updateRequired] = useState(true);
  const [errorText, updateErrorText] = useState<string[]>([]);
  const [helperText, updateHelperText] = useState<string[]>([
    "Please choose a State",
  ]);

  const validateSelectValue = (value: string) => {
    if (value === "0") {
      updateErrorText(["Field is required"]);
      updateHelperText(["Please choose a State"]);
      updateRequired(true);
    } else {
      updateHelperText(["Success!"]);
      updateErrorText([]);
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
        onChange={(e) => {
          updateSelectedState(e.target.value);
          validateSelectValue(e.target.value);
        }}
        value={selectedState}
        helperMessages={helperText}
        errorMessages={errorText}
        options={listOfStates}
      />

      <Button
        onClick={() => validateSelectValue(selectedState)}
        label="Submit"
      />
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
