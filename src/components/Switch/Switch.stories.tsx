import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Form } from "components/Form";

import { Switch, SwitchProps } from "./";
import { Button } from "components/Button";

export default {
  title: "Components/Switch",
  component: Switch,
} as Meta<SwitchProps>;

export const Default = () => {
  const [checked, setChecked] = useState(false);
  const longText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean rhoncus non elit eu mollis.";

  return (
    <section style={{ width: 200 }}>
      <Switch onChange={(_e, checked) => alert("Checked -> " + checked)}>
        Alert on toggle
      </Switch>

      <Switch
        checked={checked}
        onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
      >
        Controlled Switch
      </Switch>

      <Switch defaultChecked>Default Checked</Switch>

      <Switch disabled>Disabled Unchecked</Switch>
      <Switch disabled defaultChecked>
        Disabled Checked
      </Switch>

      <Switch multiline>Long label WITH 'multiline' enabled: {longText}</Switch>
    </section>
  );
};

export const FormControl = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Form
      onSubmit={(e: any) => {
        e.preventDefault();
        const tosValue = e.target.elements.ToS.value;
        setSubmitted(true);
        alert(`ToS '${tosValue}', form submitted successfully!`);
      }}
      style={{ width: 300 }}
    >
      <p style={{ paddingBottom: 20 }}>
        Terms of Service Example. User must accept ToS before being allowed to
        proceed.
      </p>

      <Switch required name="ToS" value="accepted">
        Do you accept the Terms of Service?
      </Switch>

      <section style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          type="reset"
          variant="secondary"
          onClick={() => setSubmitted(false)}
        >
          Reset
        </Button>

        <Button type="submit">Submit</Button>
      </section>

      <p style={{ textAlign: "center" }}>
        Form Submitted: {submitted ? "TRUE" : "FALSE"}
      </p>
    </Form>
  );
};

export const Template: Story<SwitchProps> = (props: SwitchProps) => (
  <Switch {...props} />
);

Template.args = {
  checked: false,
  children: "Switch Label Text",
  defaultChecked: true,
  disabled: false,
  error: false,
  multiline: true,
  required: false,
};
