import { Meta } from "@storybook/react/types-6-0";
import { Accordion } from "./Accordion";
import { Sheet } from "components/Sheet";
export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta;

export const Default = () => (
  <Sheet title="Accordion Examples" style={{ width: 400 }}>
    <Accordion header="Accordion Header" body="Some text in body" />
    <Accordion
      header="Accordion with expand true"
      body="Some text in body"
      defaultExpanded={true}
    />
    <Accordion
      header="Header Disabled"
      body="Nothing in body"
      disabled={true}
    />
    <Accordion
      header="Header Disabled"
      body="Nothing in body"
      disabled={false}
    />
  </Sheet>
);
