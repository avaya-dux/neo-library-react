import { Meta, Story } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Button } from "components/Button";

import { Sheet, SheetProps } from "./";

export default {
  title: "Components/Sheet",
  component: Sheet,
} as Meta<SheetProps>;

export const Default = () => {
  const [sheetOneVisible, setSheetOneVisible] = useState(false);
  const [sheetTwoVisible, setSheetTwoVisible] = useState(false);
  const [sheetThreeVisible, setSheetThreeVisible] = useState(false);

  return (
    <main>
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "1rem",
        }}
      >
        <Button
          icon="filter"
          onClick={() => setSheetOneVisible(!sheetOneVisible)}
        >
          Toggle Sheet One Visibility
        </Button>
        <Button
          icon="filter"
          onClick={() => setSheetTwoVisible(!sheetTwoVisible)}
        >
          Toggle Sheet Two Visibility
        </Button>
        <Button
          icon="filter"
          onClick={() => setSheetThreeVisible(!sheetThreeVisible)}
        >
          Toggle Sheet Three Visibility
        </Button>
      </section>

      <Sheet
        closed={!sheetOneVisible}
        title="Sheet one"
        buttons={[
          <Button key="btn1">button 1</Button>,
          <Button key="btn2">second btn</Button>,
        ]}
      >
        <p>
          sheet one content, has non-functional buttons as a part of the header
        </p>
      </Sheet>

      <Sheet closed={!sheetTwoVisible}>
        <p>sheet two content (no header/title, just content)</p>
      </Sheet>

      <Sheet closed={!sheetThreeVisible}>
        <p>sheet three content (no header/title, just content)</p>
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
