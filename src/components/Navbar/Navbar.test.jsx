import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Navbar } from ".";
import * as NavbarStories from "./Navbar.stories";

const { NavbarExample } = composeStories(NavbarStories);

describe("navbar", () => {
  it("renders without exploding", () => {
    const { getByRole } = render(<NavbarExample />);
    const navElement = getByRole("navigation");
    expect(navElement).toBeTruthy();
  });
  it("renders with the correct class heirarchy", () => {
    const { container } = render(<NavbarExample />);
    expect(container.firstChild.classList.contains("neo-navbar")).toBe(true);
    const parentElement = container.firstChild;
    expect(parentElement.firstChild.classList.contains("neo-nav--left")).toBe(
      true
    );
    expect(parentElement.lastChild.classList.contains("neo-nav")).toBe(true);
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(<NavbarExample />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
