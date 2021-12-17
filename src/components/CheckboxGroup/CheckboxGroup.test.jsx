import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getCheckboxClassName } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";

import "@testing-library/jest-dom";

const DefaultCheckboxArray = [
  {
    label: "Check 1",
    value: "Check 1",
    onChange: () => {},
  },
  {
    label: "Check 2",
    value: "Check 2",
    onChange: () => {},
  },
  {
    label: "Check 3",
    value: "Check 3",
    id: "checkbox-id",
    onChange: () => {},
  },
  {
    label: "Check 4",
    value: "Check 4",
    onChange: () => {},
    disabled: true,
  },
  {
    label: "Check 5",
    value: "Check 5",
    onChange: () => {},
    tooltip: "Tooltip for Check",
    position: "bottom",
  },
  {
    label: "Check 6",
    value: "Check 6",
    disabled: true,
    checked: "indeterminate",
    onChange: () => {},
  },
];

async function axeTest(renderResult) {
  const { container } = renderResult;
  const results = await axe(container);
  expect(results).toHaveNoViolations();
}

const DefaultProps = {
  checkboxes: DefaultCheckboxArray,
  groupName: "Checkbox Group",
  checked: "Check 1",
  onChange: () => {},
};

describe("getCheckboxClassName", () => {
  it("returns the correct class name", () => {
    const checkboxClasses = getCheckboxClassName(
      DefaultCheckboxArray[5]
    );
    expect(checkboxClasses).toEqual({
      className: "neo-check neo-check--indeterminate",
    });
  });
});

describe("CheckboxGroup", () => {
  let renderResult;

  beforeEach(() => {
    // ignore tooltip position warning
    jest.spyOn(console, "warn").mockImplementation(() => {});

    renderResult = render(<CheckboxGroup {...DefaultProps} />);
  });

  it("checkbox group renders ok", () => {
    const { getByTestId } = renderResult;
    const rootElement = getByTestId("CheckboxGroup-root");
    expect(rootElement).toBeTruthy();
  });

  it("checkbox renders ok", () => {
    const { getByLabelText } = renderResult;
    const rootElement = getByLabelText(DefaultCheckboxArray[0].label);
    expect(rootElement).toBeTruthy();
  });

  it("checkbox renders with correct class name", () => {
    const { getByLabelText } = renderResult;
    const rootElement = getByLabelText(DefaultCheckboxArray[5].label);
    expect(rootElement).toHaveAttribute(
      "class",
      "neo-check neo-check--indeterminate"
    );
  });

  it("has a value that matches the label", () => {
    const { getByLabelText } = renderResult;
    DefaultCheckboxArray.forEach((checkboxObject) => {
      const check = getByLabelText(checkboxObject.label);
      expect(check).toHaveAttribute("value", checkboxObject.label);
    });
  });

  it("has a correct id when passed", () => {
    const { getByLabelText } = renderResult;
    const check = getByLabelText(DefaultCheckboxArray[2].label);
    expect(check).toHaveAttribute("id", DefaultCheckboxArray[2].id);
  });

  it("renders as disabled", () => {
    const { getByLabelText } = renderResult;
    DefaultCheckboxArray.forEach((checkboxObject) => {
      if (checkboxObject.disabled) {
        const check = getByLabelText(checkboxObject.label);
        expect(check).toHaveAttribute("disabled");
      } else {
        const check = getByLabelText(checkboxObject.label);
        expect(check).not.toHaveAttribute("disabled");
      }
    });
  });

  it("passes basic axe compliance", async () => {
    await axeTest(renderResult);
  });
});
