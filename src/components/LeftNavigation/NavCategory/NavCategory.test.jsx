import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { LinkItem } from "../LinkItem";
import { NavCategory } from "./NavCategory";
import { TextOnly } from "./NavCategory.stories";

describe("NavCategory", () => {
  describe("Render NavCategory: Text only", () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(<TextOnly />);
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
