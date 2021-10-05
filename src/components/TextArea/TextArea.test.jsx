import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getAriaDescribedBy, getTextAreaClassName, TextArea } from "./TextArea";

const defaultTextAreaProps = {
  label: "Example Text Area",
  placeholder: "Hello World...",
  helperText: "Some helper text.",
  maxLength: 10,
};

const errorTextAreaProps = {
  label: "Text Area with Error Example",
  helperText: "There is an error",
  maxLength: 10,
  defaultValue: "This is a longer string than max value",
};

describe("Text Area", () => {
  it("renders correctly", () => {
    const { getByLabelText } = render(<TextArea {...defaultTextAreaProps} />);

    const rootElement = getByLabelText(defaultTextAreaProps.label);

    expect(rootElement).toBeTruthy();
  });
  it("passes basic axe compliance", async () => {
    const { container } = render(<TextArea {...defaultTextAreaProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
  it("triggers error on exceeding max character count", () => {
    const datatestid = "NeoInputWrapper-root";
    const { getByTestId } = render(<TextArea {...errorTextAreaProps} />);
    const rootElement = getByTestId(datatestid);
    expect(rootElement).toHaveClass("neo-form-control--error");
  });
});

describe("getTextAreaProps function", () => {
  it("returns the correct attribute", () => {
    const returnedProps = getTextAreaClassName({
      ...defaultTextAreaProps,
      locked: true,
    });
    expect(returnedProps).toEqual({
      className: `neo-input neo-input-textarea--locked`,
    });
  });
});

describe("getAriaLabel function", () => {
  it("returns the correct attribute", () => {
    const id = "test-textarea";
    const ariaDescribedBy = getAriaDescribedBy(id, defaultTextAreaProps);
    expect(ariaDescribedBy).toEqual({
      "aria-describedby": `${id}-hint ${id}-counter`,
    });
  });
});
