import { Meta } from "@storybook/react/types-6-0";
import { Accordion } from "../Accordion";
import { AccordionGroup, AccordionGroupProps } from "./AccordionGroup";
import { Sheet } from "components/Sheet";

export default {
  title: "Components/Accordion Group",
  component: AccordionGroup,
} as Meta<AccordionGroupProps>;

export const Default = () => {
  return (
    <Sheet title="Sheet title" style={{ width: 600 }}>
      <br />
      <AccordionGroup header="Default Group of Accordion">
        <Accordion header={"heading 1"} defaultExpanded>
          {"some data in the body1"}
        </Accordion>
        <Accordion header="heading 2">{"some data in the body2"}</Accordion>
        <Accordion header="heading 3">{"some data in the body3"}</Accordion>
      </AccordionGroup>
      <br />
      <AccordionGroup
        header="Group of Accordion expand one at a time"
        allowOnlyOne
      >
        <Accordion header="heading 1">{"some data in the body1"}</Accordion>
        <Accordion header="heading 2">{"some data in the body2"}</Accordion>
        <Accordion header="heading 3">{"some data in the body3"}</Accordion>
      </AccordionGroup>
      <br />
      <AccordionGroup
        header="Group of Accordion expand one at a time with defaultOpen prop as 1"
        allowOnlyOne
        defaultOpenAccordingIndex={1}
      >
        <Accordion header="heading 1" disabled>
          {"some data in the body1"}
        </Accordion>
        <Accordion header="heading 2">{"some data in the body2"}</Accordion>
        <Accordion header="heading 3">{"some data in the body3"}</Accordion>
      </AccordionGroup>
    </Sheet>
  );
};
