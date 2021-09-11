import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { getInputProps, TextInput } from "./TextInput";

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
