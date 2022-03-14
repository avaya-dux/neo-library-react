import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

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
      <Switch
        label="Alert on Switch toggle"
        onChange={(_e, checked) => alert("Checked -> " + checked)}
      />

      <Switch
        label="Controlled Checked"
        checked={checked}
        onChange={(_e, updatedChecked) => setChecked(updatedChecked)}
      />

      <Switch label="Default Checked" defaultChecked />

      <Switch label="Disabled Unchecked" />
      <Switch label="Disabled Checked" defaultChecked />

      <Switch
        label={`Long label WITH 'multiline' enabled: ${longText}`}
        multiline
      />
    </section>
  );
};

export const FormControl = () => {
  return (
    <>
      <Switch label="Error" error />
      <Switch label="Required" required />
      <Switch label="Required, Error" error required />
    </>
  );
};

export const Template: Story<SwitchProps> = (props: SwitchProps) => {
  return <Switch {...props} />;
};

Template.args = {
  label: "Enable Feature",
};
