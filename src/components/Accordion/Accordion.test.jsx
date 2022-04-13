import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Accordion } from "./Accordion";
import * as AccordionStories from "./Accordion.stories";

const { Default } = composeStories(AccordionStories);

describe("Accordion Component", () => {
  const Header = "Accordion Header";
  const Body = "This is a body content";

  it("render without errors", () => {
    render(<Accordion header={Header} body={Body} />);
    const AccordionElement = screen.getByText(Header);
    expect(AccordionElement).toBeInTheDocument();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Accordion header={Header} body={Body} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("assigns the appropriate aria-expanded value when `expand` prop is false", () => {
    render(<Accordion header={Header} body={Body} />);
    const AccordionElement = screen.getByRole("button");
    expect(AccordionElement).toHaveAttribute("aria-expanded", "false");
  });

  it("assigns the appropriate aria-expanded value when `expand` prop is true", () => {
    render(<Accordion header={Header} body={Body} expand={true} />);
    const AccordionElement = screen.getByRole("button");
    expect(AccordionElement).toHaveAttribute("aria-expanded", "true");
  });

  it("check for disabled accordion when `isDisabled` prop is true", () => {
    render(<Accordion header={Header} body={Body} isDisabled={true} />);
    const AccordionElement = screen.getByRole("button");
    expect(AccordionElement).toHaveAttribute("disabled");
  });

  describe("storybook test", () => {
    describe("Accordion", () => {
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
