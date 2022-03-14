import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Form } from "components/Form";

import { Switch, SwitchProps } from "./";

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
        Alert on Switch toggle
      </Switch>

      <Switch
        checked={checked}
        onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
      >
        Controlled Checked
      </Switch>

      <Switch defaultChecked>Default Checked</Switch>

      <Switch>Disabled Unchecked</Switch>
      <Switch defaultChecked>Disabled Checked</Switch>

      <Switch multiline>Long label WITH 'multiline' enabled: {longText}</Switch>
      {/* <Switch label={`Long label _without_ 'multiline' enabled: ${longText}`} >aaaaaaaaaaaaaa</Switch> */}
    </section>
  );
};

export const FormControl = () => {
  return (
    <Form>
      <Switch error value="">
        Error
      </Switch>
      <Switch required>Required</Switch>
      <Switch error required>
        Required, Error
      </Switch>
    </Form>
  );
};

export const Template: Story<SwitchProps> = (props: SwitchProps) => (
  <Switch {...props} />
);

Template.args = {
  children: "Switch Label Text",
};
