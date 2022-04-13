import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { Accordion } from "./Accordion";
import * as AccordionStories from "./Accordion.stories";

const { Default } = composeStories(AccordionStories);

describe("Accordion Component", () => {
  const Header = "Accordion Header";
  it("render without errors", () => {
    const { getByText } = render(
      <Accordion header={Header} body={"This is a body content"} />
    );
    const AccordionElement = getByText(Header);
    expect(AccordionElement).toBeInTheDocument();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Accordion header={Header} body={"This is a body content"} />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("storybook test", () => {
    describe("Accordion", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Default />);
      });
      it("should rendr ok", () => {
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
