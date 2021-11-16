import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getNativeSelectClassNames, renderOptions } from "./NativeSelect";
import * as NativeSelectStories from "./NativeSelect.stories";
import { listOfStates } from "./SampleData";

const {
  UncontrolledNativeSelect,
  ControlledNativeSelect,
  NativeSelectError,
  NativeSelectRequired,
  NativeSelectDisabled,
} = composeStories(NativeSelectStories);

describe("NativeSelect test", () => {
  describe("UncontrolledNativeSelect test", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<UncontrolledNativeSelect />);
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

  describe("ControlledNativeSelect test", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ControlledNativeSelect />);
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

  describe("NativeSelectError test", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<NativeSelectError />);
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

  describe("NativeSelectRequired test", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<NativeSelectRequired />);
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

  describe("NativeSelectDisabled test", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<NativeSelectDisabled />);
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

  describe("getNativeSelectClassNames", () => {
    it("given isLoading = true, should return correct css names", () => {
      expect(getNativeSelectClassNames(true)).toMatchInlineSnapshot(
        `"neo-select neo-select__spinner"`
      );
    });
    it("given isLoading = undefined, should return correct css names", () => {
      expect(getNativeSelectClassNames()).toMatchInlineSnapshot(`"neo-select"`);
    });
  });

  describe("renderOptions", () => {
    it("given options, should return a list of options", () => {
      expect(renderOptions(listOfStates.slice(0, 3))).toMatchInlineSnapshot(`
        Array [
          <option
            data-testid="option---Please choose an option---0"
            disabled={false}
            hidden={true}
            value="0"
          >
            --Please choose an option--
          </option>,
          <option
            data-testid="option-Alabama-AL"
            value="AL"
          >
            Alabama
          </option>,
          <option
            data-testid="option-Alaska-AK"
            value="AK"
          >
            Alaska
          </option>,
        ]
      `);
    });
  });
});
