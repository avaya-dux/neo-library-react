import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { listOfStates } from "components/Select/SampleData";

import { getNativeSelectClassNames, renderOptions } from "./NativeSelect";
import * as NativeSelectStories from "./NativeSelect.stories";

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

  describe(getNativeSelectClassNames, () => {
    it("Given isLoading = true, should return correct css names", () => {
      expect(getNativeSelectClassNames(true)).toMatchInlineSnapshot(
        `"neo-select neo-select__spinner"`
      );
    });
    it("Given isLoading = undefined, should return correct css names", () => {
      expect(getNativeSelectClassNames()).toMatchInlineSnapshot(`"neo-select"`);
    });
  });

  describe(renderOptions, () => {
    it("Given an empty array, should return an empty array", () => {
      expect(renderOptions([], "this is a placeholder")).toMatchInlineSnapshot(`
        Array [
          <option
            hidden={true}
            value="0"
          >
            this is a placeholder
          </option>,
        ]
      `);
    });
    it("Given options, should return a list of options", () => {
      expect(renderOptions(listOfStates.slice(0, 3))).toMatchInlineSnapshot(`
        Array [
          <option
            disabled={false}
            hidden={true}
            value="0"
          >
            --Please choose an option--
          </option>,
          <option
            disabled={false}
            hidden={true}
            value="0"
          >
            --Please choose an option--
          </option>,
          <option
            value="AL"
          >
            Alabama
          </option>,
          <option
            value="AK"
          >
            Alaska
          </option>,
        ]
      `);
    });
  });
});
