import { composeStories } from "@storybook/testing-react";
import * as SelectStories from "./Select.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

const { DefaultSelect, DemoUpdateByPropChange } = composeStories(SelectStories);

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

  describe("DemoUpdateByPropChange", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DemoUpdateByPropChange />);
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
