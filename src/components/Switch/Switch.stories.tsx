import { Meta, Story } from "@storybook/react/types-6-0";

import { Switch, SwitchProps } from "./";

export default {
  title: "Components/Switch",
  component: Switch,
} as Meta<SwitchProps>;

export const Default = () => {
  return (
    <>
      <Switch
        label="Enable Feature"
        // TODO: BUG: `any` is bad
        onChange={(event: any) => {
          alert("Checked -> " + event.target.checked);
        }}
      />
      <Switch label="Default Checked" defaultChecked />
    </>
  );
};

export const Multiline = () => {
  return (
    <div style={{ maxWidth: 200 }}>
      <Switch label="Default Checked" multiline defaultChecked />
      <Switch
        label="Enable Feature for something that wraps to multiple lines"
        multiline
      />
    </div>
  );
};

export const Disabled = () => {
  return (
    <>
      <Switch label="Enable Feature" disabled />
      <Switch label="Default Checked" disabled defaultChecked />
    </>
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
