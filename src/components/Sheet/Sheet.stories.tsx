import { Meta, Story } from "@storybook/react/types-6-0";

import { Sheet, SheetProps } from "./";

export default {
  title: "Components/Layout/Sheet",
  component: Sheet,
} as Meta<SheetProps>;

export const Default = () => {
  return (
    <main>
      <Sheet
        title="Sheet title"
        buttons={[
          <button key="btn1">button 1</button>,
          <button key="btn2">second btn</button>,
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
    <button key="btn1">button 1</button>,
    <button key="btn2">second btn</button>,
  ],
  children: <p>sheet content</p>,
};
