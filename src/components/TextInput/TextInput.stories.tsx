import { Meta } from "@storybook/react/types-6-0";

import { Icon } from "components";

import { TextInput, TextInputProps } from "./TextInput";

export default {
  title: "Components/Text Input",
  component: TextInput,
} as Meta<TextInputProps>;

export const Default = () => {
  return (
    <TextInput
      label="Example Field"
      placeholder="Hello World..."
      helperText="Some helper text."
    />
  );
};

export const DifferentHTMLOutputExamples = () => {
  return (
    <section>
      <TextInput label="Just a Label" />

      <TextInput
        label="With start adorment icon"
        placeholder="Placeholder text"
        startAddon={<Icon icon="star-filled" />}
      />

      <TextInput
        label="With start icon"
        placeholder="Placeholder text"
        startIcon="star-filled"
      />

      <TextInput defaultValue="Try To Change Me" disabled label="Disabled" />

      <TextInput
        defaultValue="readonly value"
        label="Read Only"
        placeholder="Placeholder text"
        readOnly
      />
    </section>
  );
};

export const ErrorState = () => {
  return (
    <TextInput error label="Name" helperText="Name is required." required />
  );
};

export const AdornmentIcons = () => {
  return (
    <TextInput
      label="Icon Add Ons"
      // TODO eventually pass <Icon icon="call" /> or something like this...
      startAddon={<div className="neo-icon-call" />}
      endAddon={<div className="neo-icon-call" />}
    />
  );
};

export const AdornmentStrings = () => {
  return <TextInput label="Domain" startAddon="www." endAddon=".com" />;
};

export const Clearable = () => {
  return (
    <TextInput
      label="Clearable Field"
      defaultValue="Initial Value"
      clearable
      helperText="Click the clear icon inside the input."
    />
  );
};

export const ReadOnly = () => {
  return (
    <>
      <TextInput label="Read Only" defaultValue="Try To Change Me" readOnly />

      <TextInput
        label="Read Only"
        defaultValue="8881112222"
        startAddon="+1"
        readOnly
      />
    </>
  );
};

export const Disabled = () => {
  return (
    <>
      <TextInput label="Disabled" defaultValue="Try To Change Me" disabled />
      <TextInput
        label="Clearable But Disabled"
        defaultValue="Try To Clear Me"
        endAddon={<div className="neo-icon-call" />}
        startAddon="+1"
        disabled
      />
    </>
  );
};

export const BadAccessibility = () => {
  return <TextInput />;
};

// TODO: add controlled, uncontrolled, and an "inline" option
