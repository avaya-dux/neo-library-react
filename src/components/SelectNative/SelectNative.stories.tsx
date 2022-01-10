import { Meta, Story } from "@storybook/react/types-6-0";
import { useEffect, useState } from "react";

import { Button, Form } from "components";

import { SelectNative, SelectNativeProps } from ".";

export default {
  title: "Components/Select Native",
  component: SelectNative,
} as Meta<SelectNativeProps>;

const Template: Story<SelectNativeProps> = (props) => (
  <SelectNative {...props}>
    <option value="volvo">Volvo</option>
    <option value="saab">Saab</option>
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </SelectNative>
);

export const Templated = Template.bind({});
Templated.args = {
  label: "Choose a car:",
  helperText: "example of helper text",
  errorList: ["error one", "error two"],
};

export const FormSubmission = () => {
  const helperTextExample = "example of helper text";
  const [helperText, setHelperText] = useState(helperTextExample);
  const [errorList, setErrorList] = useState<string[]>([]);
  const [chosenCar, setChosenCar] = useState("");

  useEffect(() => {
    if (chosenCar !== "") {
      setHelperText(helperTextExample);
      setErrorList([]);
    }
  }, [chosenCar]);

  return (
    <Form
      inline
      onSubmit={(e) => {
        e.preventDefault();
        alert(`you successfully submitted: ${chosenCar}`);
      }}
    >
      <SelectNative
        defaultValue=""
        errorList={errorList}
        helperText={helperText}
        label="Choose a car:"
        onChange={(e) => setChosenCar((e.target as any).value)}
        required
      >
        <option value="" disabled hidden>
          select an option
        </option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </SelectNative>

      <Button
        style={{ marginRight: 10 }}
        type="submit"
        onClick={() => {
          if (chosenCar === "") {
            setHelperText("");
            setErrorList(["you must select an option"]);
          }
        }}
      >
        Submit
      </Button>

      <Button type="reset" onClick={() => setChosenCar("")}>
        Reset
      </Button>
    </Form>
  );
};

// TODO: loading to new options
