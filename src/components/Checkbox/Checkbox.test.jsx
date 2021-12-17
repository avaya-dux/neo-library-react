import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Checkbox } from "./";
import * as CheckboxStories from "./Checkbox.stories";
import { getCheckboxClassName } from "./helper";

const { Default, Templated } = composeStories(CheckboxStories);

const DefaultProps = {
  label: "example label",
  onChange: () => {},
  value: "1",
};

describe("Checkbox", () => {
  it("renders as unchecked appropriately", () => {
    const { getByLabelText } = render(<Checkbox {...DefaultProps} />);

    const checkboxElement = getByLabelText(DefaultProps.label);
    expect(checkboxElement.cheched).toBeFalsy();
  });

  it("renders as checked appropriately", () => {
    const { getByLabelText } = render(<Checkbox {...DefaultProps} checked />);

    const checkboxElement = getByLabelText(DefaultProps.label);
    expect(checkboxElement).toBeTruthy();
    expect(checkboxElement.checked).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<Checkbox {...DefaultProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  describe("helper getCheckboxClassName", () => {
    it("returns the correct class name when passed `true`", () => {
      expect(getCheckboxClassName(true)).toEqual({
        className: "neo-check neo-check--indeterminate",
      });
    });

    it("returns the correct class name when passed `false`", () => {
      expect(getCheckboxClassName(false)).toEqual({
        className: "neo-check",
      });
    });
  });

  describe("storybook tests", () => {
    describe("Default", () => {
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

    describe("Templated", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<Templated />);
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
