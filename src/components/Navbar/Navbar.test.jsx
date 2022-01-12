import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Navbar } from ".";
import * as NavbarStories from "./Navbar.stories";

const { NavbarExample } = composeStories(NavbarStories);

describe("basic unit tests", () => {
  describe("Navbar", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(
        <Navbar
          logo={{
            src:
              "http://design-portal-next-gen.herokuapp.com/images/logo-fpo.png",
            alt: "Link to Avaya",
          }}
        />
      );
    });
    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
    it("renders with the correct class heirarchy", () => {
      const { container } = renderResult;
      const navElement = container.firstChild;
      expect(navElement.firstChild).toHaveClass("neo-nav--left");
      expect(navElement.lastChild).toHaveClass("neo-nav");
    });
    it("passes basic axe compliance", async () => {
      const { container } = render(<Navbar />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe("storybook tests", () => {
  let renderResult;
  beforeEach(() => {
    renderResult = render(<NavbarExample />);
  });
  it("toggles active states correctly", () => {
    const { getAllByRole } = renderResult;
    const buttonElements = getAllByRole("button");
    buttonElements.forEach((button) => {
      fireEvent.click(button);
      expect(button.closest("div")).toHaveClass("neo-badge__navbutton--active");
      fireEvent.click(button.closest("button"));
      expect(button.closest("div")).not.toHaveClass("neo-badge__navbutton--active");
    });
  });
  it("passes basic axe compliance", async () => {
    const { container } = renderResult;
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
