import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components/Button";
import {
  errorMessagesDemo,
  helperMessagesDemo,
  listOfStates,
  longTextOptions,
} from "components/Select/SampleData";
import { NativeSelectProps } from "components/Select/SelectTypes";

import { NativeSelect } from "./NativeSelect";

export default {
  title: "Components/Form/Native Select",
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
        defaultValue={selectedState}
        helperMessages={helperMessagesDemo}
        errorMessages={errorTexts}
        options={ListOfStatesArkansasDisabledPlusHint}
      />
      <Button onClick={() => updateSelectedState("UT")}>Set value to UT</Button>
      &nbsp;
      <Button onClick={() => updateErrorTexts(errorMessagesDemo)}>
        Display errors
      </Button>
      &nbsp;
      <Button onClick={() => updateErrorTexts([])}>Display Helper</Button>
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
      updateHelperText([""]);
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
        defaultValue={selectedState}
        helperMessages={helperText}
        errorMessages={errorText}
        options={listOfStates}
      />

      <Button onClick={() => validateSelectValue(selectedState)}>Submit</Button>
    </>
  );
};

export const NativeSelectLongText = () => {
  return (
    <div
      style={{ display: "flex", width: "100%", justifyContent: "space-around" }}
    >
      <NativeSelect label="Long text" options={longTextOptions} />
      &nbsp;
      <NativeSelect label="Long text" options={longTextOptions} />
      &nbsp;
      <NativeSelect label="Long text" options={longTextOptions} />
    </div>
  );
};

const Template: Story<NativeSelectProps> = (props: NativeSelectProps) => {
  return <NativeSelect {...props} />;
};

export const UncontrolledNativeSelect = Template.bind({});
UncontrolledNativeSelect.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  options: listOfStates,
};

export const NativeSelectError = Template.bind({});
NativeSelectError.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  errorMessages: errorMessagesDemo,
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

export const NativeSelectCustomPlaceholder = Template.bind({});
NativeSelectCustomPlaceholder.args = {
  label: "List of States",
  helperMessages: ["Please choose a State"],
  options: listOfStates.slice(1, 3),
  placeholder: "This is a custom placeholder",
};
