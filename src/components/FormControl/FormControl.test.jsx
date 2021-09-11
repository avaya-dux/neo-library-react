import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

import { FormControl, getFormControlProps, getInputGroupProps } from ".";

describe("FormControl", () => {
  const datatestid = "FormControl-root";
  const groupdatatestid = "FormControl-group-root";

  it("fully renders without exploding", () => {
    const { getByTestId } = render(<FormControl />);

    const rootElement = getByTestId(datatestid);
    const groupElement = getByTestId(groupdatatestid);
    expect(rootElement).toBeTruthy();
    expect(groupElement).toBeTruthy();
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(<FormControl />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has default 'control' and 'group' classes", () => {
    const { getByTestId } = render(<FormControl />);
    const rootElement = getByTestId(datatestid);
    const groupElement = getByTestId(groupdatatestid);

    expect(rootElement.classList.length).toBe(1);
    expect(groupElement.classList.length).toBe(1);
  });

  it("adds all of the proper 'control' and 'group' classes when the appropriate props are set", () => {
    const { getByTestId } = render(<FormControl inline error required />);
    const rootElement = getByTestId(datatestid);
    const groupElement = getByTestId(groupdatatestid);

    expect(rootElement.classList.length).toBe(3);
    expect(groupElement.classList.length).toBe(2);
  });

  it("adds 'aria-required' appropriately", () => {
    const { container: requiredContainer } = render(<FormControl required />);
    const requiredElement = requiredContainer.querySelector(
      '[aria-required="true"]'
    );
    expect(requiredElement).toBeTruthy();

    const { container: defaultContainer } = render(<FormControl />);
    const nonRequiredElement = defaultContainer.querySelector(
      '[aria-required="true"]'
    );
    expect(nonRequiredElement).toBe(null);
  });

  describe("getFormControlProps", () => {
    it("returns expected props", () => {
      expect(getFormControlProps()).toMatchInlineSnapshot(`
        Object {
          "className": "neo-form-control",
        }
      `);

      expect(
        getFormControlProps({ error: true, required: true, disabled: true })
      ).toMatchInlineSnapshot(`
        Object {
          "className": "neo-form-control neo-form-control--disabled neo-form-control--error neo-form-control--required",
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

      expect(getInputGroupProps({ inline: true })).toMatchInlineSnapshot(`
        Object {
          "className": "neo-input-group neo-input-group--inline",
        }
      `);
    });
  });
});
