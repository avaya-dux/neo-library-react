import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Accordion } from "../Accordion";
import { AccordionGroup } from "./AccordionGroup";
import * as Stories from "./AccordionGroup.stories";

const { Default } = composeStories(Stories);

describe("Group Accordion Component", () => {
  const groupHeaderText = "Accordion group heading";
  const bodyText = "Some body data";
  it("render without erros", () => {
    render(
      <AccordionGroup groupHeading={groupHeaderText}>
        <Accordion header="Accordion 1">{bodyText}</Accordion>
        <Accordion header="Accordion 2">{bodyText}</Accordion>
        <Accordion header="Accordion 2">{bodyText}</Accordion>
      </AccordionGroup>
    );
    const GroupAccordionElement = screen.getByText(groupHeaderText);
    expect(GroupAccordionElement).toBeInTheDocument();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(
      <AccordionGroup groupHeading={groupHeaderText}>
        <Accordion header="Accordion 1">{bodyText}</Accordion>
        <Accordion header="Accordion 2">{bodyText}</Accordion>
        <Accordion header="Accordion 2">{bodyText}</Accordion>
      </AccordionGroup>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  describe("storybook test", () => {
    describe("Accordion group", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Default />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
