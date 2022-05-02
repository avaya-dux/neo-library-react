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
      <AccordionGroup groupHeading="Default Group of Accordion">
        <Accordion header="heading 1" defaultExpanded aria-Label="heading 1">
          {"some data in the body1"}
        </Accordion>
        <Accordion header="heading 2" aria-Label="heading 2">{"some data in the body2"}</Accordion>
        <Accordion header="heading 3" aria-Label="heading 3">{"some data in the body3"}</Accordion>
      </AccordionGroup>
      <br />
      <AccordionGroup
        groupHeading="Group of Accordion expand one at a time"
        allowOnlyOne
      >
        <Accordion header="heading 1" aria-Label="heading 1">{"some data in the body1"}</Accordion>
        <Accordion header="heading 2" aria-Label="heading 2">{"some data in the body2"}</Accordion>
        <Accordion header="heading 3" aria-Label="heading 3">{"some data in the body3"}</Accordion>
      </AccordionGroup>
      <br />
      <AccordionGroup
        groupHeading="Group of Accordion expand one at a time with defaultOpen prop as 1"
        allowOnlyOne
        defaultOpen={1}
      >
        <Accordion header="heading 1" disabled aria-Label="disabled accordion">
          {"some data in the body1"}
        </Accordion>
        <Accordion header="heading 2" aria-Label="heading 2">{"some data in the body2"}</Accordion>
        <Accordion header="heading 3" aria-Label="heading 3">{"some data in the body3"}</Accordion>
      </AccordionGroup>
    </Sheet>
  );
};
