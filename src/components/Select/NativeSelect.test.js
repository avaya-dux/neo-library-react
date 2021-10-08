import { composeStories } from "@storybook/testing-react";
import * as NativeSelectStories from "./NativeSelect.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

const { DefaultNativeSelect, NativeSelectExample } =
  composeStories(NativeSelectStories);

describe("NativeSelect: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DefaultNativeSelect />);
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

  describe("Native Select Example", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<NativeSelectExample />);
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
