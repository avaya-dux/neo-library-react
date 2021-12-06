import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components/Button";

import {
  errorMessagesDemo,
  helperMessagesDemo,
  listOfStates,
} from "./SampleData";
import { Select } from "./Select";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Form/Select/Select",
  component: Select,
} as Meta<SelectProps>;

const ListOfStatesArkansasDisabledPlusHint = listOfStates.map((item) => {
  const extraInfo = {
    hint: `state ${item.value}`,
    isDisabled: item.value === "AK",
  };
  return { ...extraInfo, ...item };
});

export const ControlledSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [errorTexts, updateErrorTexts] = useState<string[]>([]);
  return (
    <>
      <p>This is an example of a controlled Select.</p>
      <br />
      <Select
        label="List of States"
        onSelect={(value) => {
          updateSelectedStates(value);
        }}
        value={selectedStates}
        helperMessages={helperMessagesDemo}
        errorMessages={errorTexts}
        options={ListOfStatesArkansasDisabledPlusHint}
      />
      <br />
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => updateSelectedStates(["UT"])}
          label="Set value to UT"
        />
        &nbsp;
        <Button
          onClick={() => updateErrorTexts(errorMessagesDemo)}
          label=" Display errors"
        />
        &nbsp;
        <Button onClick={() => updateErrorTexts([])} label=" Display Helper" />
      </div>
    </>
  );
};

export const ControlledMultipleSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [errorTexts, updateErrorTexts] = useState<string[]>([]);

  return (
    <>
      <Select
        label="List of States"
        onSelect={(values) => {
          updateSelectedStates(values);
        }}
        isMultipleSelect={true}
        value={selectedStates}
        helperMessages={helperMessagesDemo}
        errorMessages={errorTexts}
        options={ListOfStatesArkansasDisabledPlusHint}
      />
      <br />
      <div
        style={{
          width: "100%",
          maxWidth: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => updateSelectedStates(["UT", "AL"])}
          label="Set values to UT, AL"
        />
        &nbsp;
        <Button
          onClick={() => updateErrorTexts(errorMessagesDemo)}
          label="Display errors"
        />
        &nbsp;
        <Button onClick={() => updateErrorTexts([])} label=" Display Helper" />
      </div>
    </>
  );
};

export const ValidateValuesSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [isRequired, updateRequired] = useState(true);
  const [errorText, updateErrorText] = useState<undefined | string[]>(
    undefined
  );
  const [helperText, updateHelperText] = useState<undefined | string[]>([
    "Please choose a State",
  ]);

  const [isDisabled, updateIsDisabled] = useState(true);
  const validateSelectValue = (values: string[]) => {
    if (JSON.stringify(values) === JSON.stringify(["0"])) {
      updateErrorText(["Field is required"]);
      updateHelperText(["Please choose a State"]);
      updateRequired(true);
    } else {
      updateHelperText(["Form values are valid"]);
      updateErrorText(undefined);
      updateRequired(false);
      updateIsDisabled(false);
    }
  };
  return (
    <>
      <p>This is an example of a select validation and required.</p>
      <br />
      <form action="./">
        <input
          type="hidden"
          name="path"
          value="/story/components-form-select-select--validate-values-select"
        />
        <Select
          name="state"
          label="List of States"
          required={isRequired}
          onSelect={(value) => {
            console.log("select value-> ", value);
            updateSelectedStates(value);
            validateSelectValue(value);
          }}
          value={selectedStates}
          helperMessages={helperText}
          errorMessages={errorText}
          options={ListOfStatesArkansasDisabledPlusHint}
          isMultipleSelect={true}
        />
        <Button
          type="button"
          onClick={() => validateSelectValue(selectedStates)}
          label="Validate"
        />

        <Button type="submit" disabled={isDisabled} label="Submit" />
      </form>
    </>
  );
};

const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

export const UncontrolledSelect = Template.bind({});
UncontrolledSelect.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  options: listOfStates,
};

export const EmptySelect = Template.bind({});
EmptySelect.args = {
  label: "Empty Select",
  helperMessages: [],
  options: [],
};

export const SelectError = Template.bind({});
SelectError.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  errorMessages: errorMessagesDemo,
  options: listOfStates,
};

export const SelectRequired = Template.bind({});
SelectRequired.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  required: true,
  options: listOfStates,
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  disabled: true,
  options: listOfStates,
};

export const SelectLoading = Template.bind({});
SelectLoading.args = {
  label: "List of States",
  helperMessages: helperMessagesDemo,
  isLoading: true,
  loaderText: <i>Loading...</i>,
  options: listOfStates,
};
