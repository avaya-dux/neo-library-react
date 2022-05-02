import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
  it("Check button click functionality and assigns appropriate aria-expanded value", () => {
    render(
      <AccordionGroup groupHeading={groupHeaderText}>
        <Accordion header="heading 1" aria-Label="heading 1">
          {bodyText}
        </Accordion>
        <Accordion header="heading 2" aria-Label="heading 2">
          {bodyText}
        </Accordion>
        <Accordion header="heading 3" aria-Label="heading 3">
          {bodyText}
        </Accordion>
      </AccordionGroup>
    );
    const AccordionElements = screen.getAllByRole("button");
    AccordionElements.forEach((Accordion) => {
      expect(Accordion).toHaveAttribute("aria-expanded", "false");
      userEvent.click(Accordion);
      expect(Accordion).toHaveAttribute("aria-expanded", "true");
    });
  });
  it("Check group accordion render properly by having a default open, when `allowOnlyOne` prop is passed", () => {
    render(
      <AccordionGroup groupHeading={groupHeaderText} allowOnlyOne>
        {/* // by default it opens first accordion */}
        <Accordion header="heading 1" aria-Label="heading 1">
          {bodyText}
        </Accordion>
        <Accordion header="heading 2" aria-Label="heading 2">
          {bodyText}
        </Accordion>
        <Accordion header="heading 3" aria-Label="heading 3">
          {bodyText}
        </Accordion>
      </AccordionGroup>
    );
    const AccordionElements = screen.getAllByRole("button");
    AccordionElements.forEach((Accordion, index) => {
      if (index === 0) {
        expect(Accordion).toHaveTextContent("heading 1");
        expect(Accordion).toHaveAttribute("aria-expanded", "true");
      }
    });
  });
  it("Check group accordion render properly when disable prop is passed ", () => {
    render(
      <AccordionGroup groupHeading={groupHeaderText} allowOnlyOne>
        {/* // by default it opens first accordion */}
        <Accordion header="heading 1" aria-Label="heading 1">
          {bodyText}
        </Accordion>
        <Accordion header="heading 2" aria-Label="heading 2">
          {bodyText}
        </Accordion>
        <Accordion header="heading 3" aria-Label="heading 3" disabled>
          {bodyText}
        </Accordion>
      </AccordionGroup>
    );
    const AccordionElements = screen.getAllByRole("button");
    AccordionElements.forEach((Accordion, index) => {
      if (index === 2) {
        expect(Accordion).toHaveTextContent("heading 3");
        expect(Accordion).toHaveAttribute("disabled");
      }
    });
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
