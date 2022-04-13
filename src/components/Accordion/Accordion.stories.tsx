import { Meta } from "@storybook/react/types-6-0";
import { Accordion } from "./Accordion";

export default {
  title: "Components/Accordion",
  component: Accordion,
} as Meta;

export const Default = () => (
  <>
    <Accordion header="Accordion Header" body="Some text in body" />
    <Accordion
      header="Accordion with expand true"
      body="Some text in body"
      isExpanded={true}
    />
    <Accordion
      header="Header Disabled"
      body="Nothing in body"
      isDisabled={true}
    />
  </>
);
