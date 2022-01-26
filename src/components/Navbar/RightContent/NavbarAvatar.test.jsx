import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { MenuItem } from "components";

import { NavbarAvatar } from "./NavbarAvatar";

describe("NavbarAvatar", () => {
  describe("Avatar without Dropdown tests", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<NavbarAvatar />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("renders without Dropdown when props not passed", () => {
      const { getByRole } = renderResult;
      const avatar = getByRole("figure");
      expect(avatar).not.toHaveClass("neo-dropdown__link-header");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Avatar with Dropdown tests", () => {
    let renderResult;
    const dropdownItems = {
      children: [<MenuItem key={"1"} text="Item1" />],
    };

    beforeEach(() => {
      renderResult = render(<NavbarAvatar dropdown={dropdownItems} />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("renders with Dropdown when props passed", () => {
      const { getByRole } = renderResult;
      const avatar = getByRole("figure");
      expect(avatar).toHaveClass("neo-dropdown__link-header");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
