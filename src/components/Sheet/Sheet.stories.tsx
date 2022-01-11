import { Meta, Story } from "@storybook/react/types-6-0";

import { Button } from "components/Button";

import { Sheet, SheetProps } from "./";

export default {
  title: "Components/Sheet",
  component: Sheet,
} as Meta<SheetProps>;

export const Default = () => {
  return (
    <main>
      <Sheet
        title="Sheet title"
        buttons={[
          <Button key="btn1">button 1</Button>,
          <Button key="btn2">second btn</Button>,
        ]}
      >
        <p>sheet content</p>
      </Sheet>
      <Sheet>
        <p>sheet content</p>
      </Sheet>
      <Sheet>
        <p>sheet content</p>
      </Sheet>
    </main>
  );
};

const Template: Story<SheetProps> = (props: SheetProps) => <Sheet {...props} />;

export const Templated = Template.bind({});
Templated.args = {
  id: "example",
  title: "Sheet title",
  buttons: [
    <Button key="btn1">button 1</Button>,
    <Button key="btn2">second btn</Button>,
  ],
  children: <p>sheet content</p>,
};
