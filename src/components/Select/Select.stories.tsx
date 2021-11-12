import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components/Button";

import {
  ErrorMessagesDemo,
  HelperMessagesDemo,
  listOfStates,
} from "./SampleData";
import { Select } from "./Select";
import { SelectProps } from "./SelectTypes";

export default {
  title: "Components/Select/Select",
  component: Select,
} as Meta<SelectProps>;

const ListOfStatesArkansasDisabledPlusHint = listOfStates.map((item) => {
  const extraInfo = {
    hint: `state ${item.value}`,
    disabled: item.value === "AK",
  };
  return { ...extraInfo, ...item };
});

export const ControlledSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [errorTexts, updateErrorTexts] = useState<undefined | string[]>(
    undefined
  );
  return (
    <>
      <p>
        This is an example of a controlled Select. If you open the console
        window you will see that the selected element value is being displayed
        via <code>console.log</code>
      </p>
      <br />
      <Select
        label="List of States"
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedStates(value);
        }}
        value={selectedStates}
        helperMessages={HelperMessagesDemo}
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
          onClick={() => updateErrorTexts(ErrorMessagesDemo)}
          label=" Display errors"
        />
        &nbsp;
        <Button
          onClick={() => updateErrorTexts(undefined)}
          label=" Display Helper"
        />
      </div>
    </>
  );
};

export const ControlledMultipleSelect = () => {
  const [selectedStates, updateSelectedStates] = useState(["0"]);
  const [errorTexts, updateErrorTexts] = useState<undefined | string[]>(
    undefined
  );

  return (
    <>
      <Select
        label="List of States"
        onChange={(values) => {
          console.log("select values-> ", values);
          updateSelectedStates(values);
        }}
        isMultipleSelect={true}
        value={selectedStates}
        helperMessages={HelperMessagesDemo}
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
          onClick={() => updateErrorTexts(ErrorMessagesDemo)}
          label="Display errors"
        />
        &nbsp;
        <Button
          onClick={() => updateErrorTexts(undefined)}
          label=" Display Helper"
        />
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

  const validateSelectValue = (values: string[]) => {
    if (JSON.stringify(values) === JSON.stringify(["0"])) {
      updateErrorText(["Field is required"]);
      updateHelperText(["Please choose a State"]);
      updateRequired(true);
    } else {
      updateHelperText(["Success!"]);
      updateErrorText(undefined);
      updateRequired(false);
    }
  };
  return (
    <>
      <p>This is an example of a select validation and required.</p>
      <br />
      <Select
        label="List of States"
        required={isRequired}
        onChange={(value) => {
          console.log("select value-> ", value);
          updateSelectedStates(value);
          validateSelectValue(value);
        }}
        value={selectedStates}
        helperMessages={helperText}
        errorMessages={errorText}
        options={ListOfStatesArkansasDisabledPlusHint}
      />
      <Button
        onClick={() => validateSelectValue(selectedStates)}
        label="Submit"
      />
    </>
  );
};

const Template: Story<SelectProps> = (props: SelectProps) => {
  return <Select {...props} />;
};

export const UncontrolledSelect = Template.bind({});
UncontrolledSelect.args = {
  label: "List of States",
  helperMessages: HelperMessagesDemo,
  options: listOfStates,
};

export const SelectError = Template.bind({});
SelectError.args = {
  label: "List of States",
  helperMessages: HelperMessagesDemo,
  errorMessages: ErrorMessagesDemo,
  options: listOfStates,
};

export const SelectRequired = Template.bind({});
SelectRequired.args = {
  label: "List of States",
  helperMessages: HelperMessagesDemo,
  required: true,
  options: listOfStates,
};

export const SelectDisabled = Template.bind({});
SelectDisabled.args = {
  label: "List of States",
  helperMessages: HelperMessagesDemo,
  disabled: true,
  options: listOfStates,
};

export const SelectLoading = Template.bind({});
SelectLoading.args = {
  label: "List of States",
  helperMessages: HelperMessagesDemo,
  isLoading: true,
  loaderText: <i>Loading...</i>,
  options: listOfStates,
};
