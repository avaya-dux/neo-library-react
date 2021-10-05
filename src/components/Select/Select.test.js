import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { DefaultSelect } from "./Select.stories";

describe("Select: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DefaultSelect />);
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
