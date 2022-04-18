import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  it("button click functionality works as expected and assigns appropriate aria-expanded value", () => {
    render(<Accordion header={Header} body={Body} />);
    const AccordionElement = screen.getByRole("button");
    expect(AccordionElement).toHaveAttribute("aria-expanded", "false");
    userEvent.click(AccordionElement);
    const AccordionAfterClick = screen.getByRole("button");
    expect(AccordionAfterClick).toHaveAttribute("aria-expanded", "true");
  });

  it("check for disabled accordion when `isDisabled` prop is true", () => {
    render(<Accordion header={Header} body={Body} disabled />);
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
