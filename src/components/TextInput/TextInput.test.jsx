import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import {
  getFormControlProps,
  getInputGroupProps,
  getInputProps,
  TextInput,
} from "./TextInput";

// TODO this should probably go in some jest test setup file and execute once
expect.extend(toHaveNoViolations);

const errorSpy = jest
  .spyOn(global.console, "error")
  .mockImplementationOnce(() => null);

beforeEach(() => {
  errorSpy.mockReset();
});

describe("TextInput", () => {
  it("fully renders without exploding", () => {
    const { getByLabelText } = render(<TextInput label="My Label" />);
    const rootElement = getByLabelText("My Label");
    expect(rootElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<TextInput label="Has Label" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("throws an error without `label` AND `placeholder`", () => {
    expect(() => {
      render(<TextInput />);
    }).toThrow();

    expect(errorSpy).toHaveBeenCalled();
  });

  it("does not throw an error with `label` OR `placeholder`", () => {
    expect(() => render(<TextInput label="truthy" />)).not.toThrow();
    expect(() => render(<TextInput placeholder="truthy" />)).not.toThrow();
    expect(() =>
      render(<TextInput label="double" placeholder="truthy" />)
    ).not.toThrow();

    expect(errorSpy).not.toHaveBeenCalled();
  });
});

describe("getFormControlProps", () => {
  it("returns expected props", () => {
    expect(getFormControlProps()).toMatchInlineSnapshot(`
      Object {
        "className": "neo-form-control",
      }
    `);

    expect(getFormControlProps({ error: true, required: true, disabled: true }))
      .toMatchInlineSnapshot(`
      Object {
        "className": "neo-form-control neo-form-control--error neo-form-control--required neo-form-control--disabled",
      }
    `);

    expect(
      getFormControlProps({ error: true, required: false, disabled: false })
    ).toMatchInlineSnapshot(`
      Object {
        "className": "neo-form-control neo-form-control--error",
      }
    `);
  });
});

describe("getInputGroupProps", () => {
  it("returns expected props", () => {
    expect(getInputGroupProps()).toMatchInlineSnapshot(`
      Object {
        "className": "neo-input-group",
      }
    `);
  });
});

describe("getInputProps", () => {
  it("returns expected props", () => {
    expect(getInputProps()).toMatchInlineSnapshot(`
      Object {
        "className": "neo-input",
      }
    `);

    expect(getInputProps({ readOnly: true })).toMatchInlineSnapshot(`
      Object {
        "className": "neo-input neo-input-readonly",
      }
    `);
  });
});
