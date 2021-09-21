import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";

import { getSwitchInputProps, getSwitchLabelProps, Switch } from "./";

describe("getSwitchLabelProps", () => {
  it("returns expected props", () => {
    expect(getSwitchLabelProps({ label: "Enable Feature", id: "feature-name" }))
      .toMatchInlineSnapshot(`
      Object {
        "className": "neo-switch",
      }
    `);
  });

  it("returns expected props for multiline", () => {
    expect(
      getSwitchLabelProps({
        label: "Enable Feature",
        id: "feature-name",
        multiline: true,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "className": "neo-switch neo-switch--multiline",
      }
    `);
  });

  it("returns expected props for disabled", () => {
    expect(
      getSwitchLabelProps({
        label: "Enable Feature",
        id: "feature-name",
        disabled: true,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "className": "neo-switch neo-switch--disabled",
      }
    `);
  });

  it("returns expected props for checked", () => {
    expect(
      getSwitchLabelProps({
        label: "Enable Feature",
        id: "feature-name",
        checked: true,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "className": "neo-switch",
      }
    `);
  });

  it("returns expected props for all", () => {
    expect(
      getSwitchLabelProps({
        label: "Enable Feature",
        id: "feature-name",
        disabled: true,
        multiline: true,
        checked: true,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "className": "neo-switch neo-switch--multiline neo-switch--disabled",
      }
    `);
  });
});

describe("getSwitchInputProps", () => {
  it("returns expected props", () => {
    expect(getSwitchInputProps({ disabled: true })).toMatchInlineSnapshot(`
      Object {
        "disabled": true,
        "type": "checkbox",
      }
    `);
  });

  it("returns all given `HTMLInputElement` attributes", () => {
    expect(
      getSwitchInputProps({
        disabled: true,
        onBlur: () => null,
        onChange: () => null,
        onFocus: () => null,
      })
    ).toMatchInlineSnapshot(`
      Object {
        "disabled": true,
        "onBlur": [Function],
        "onChange": [Function],
        "onFocus": [Function],
        "type": "checkbox",
      }
    `);
  });
});

// putting at the bottom of the file because if the above tests fail
// then they are probably causing the following tests to fail
describe("Switch", () => {
  it("fully renders without exploding", () => {
    const { container, getByLabelText } = render(
      <Switch label="My Label" id="my-id" />
    );
    expect(getByLabelText("My Label")).toBeInTheDocument();
    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-form-control"
          data-testid="FormControl-root"
        >
          <div
            aria-required="false"
            class="neo-input-group"
            data-testid="FormControl-group-root"
          >
            <label
              class="neo-switch"
              for="my-id"
            >
              <input
                id="my-id"
                type="checkbox"
              />
              <i
                class="neo-switch__icon"
              />
              My Label
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it("passes basic axe compliance", async () => {
    const { container } = render(
      <Switch id="feature-name" label="Enable Feature" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("renders disabled as expected", () => {
    const { container } = render(
      <Switch id="feature-name" label="Enable Feature" disabled />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-form-control neo-form-control--disabled"
          data-testid="FormControl-root"
        >
          <div
            aria-required="false"
            class="neo-input-group"
            data-testid="FormControl-group-root"
          >
            <label
              class="neo-switch neo-switch--disabled"
              for="feature-name"
            >
              <input
                disabled=""
                id="feature-name"
                type="checkbox"
              />
              <i
                class="neo-switch__icon"
              />
              Enable Feature
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it("renders multiline as expected", () => {
    const { container } = render(
      <Switch id="feature-name" label="Enable Feature" multiline />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-form-control"
          data-testid="FormControl-root"
        >
          <div
            aria-required="false"
            class="neo-input-group"
            data-testid="FormControl-group-root"
          >
            <label
              class="neo-switch neo-switch--multiline"
              for="feature-name"
            >
              <input
                id="feature-name"
                type="checkbox"
              />
              <i
                class="neo-switch__icon"
              />
              Enable Feature
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it("renders checked as expected", () => {
    const onChange = jest.fn();

    const { container } = render(
      <Switch
        id="feature-name"
        label="Enable Feature"
        checked
        onChange={onChange}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="neo-form-control"
          data-testid="FormControl-root"
        >
          <div
            aria-required="false"
            class="neo-input-group"
            data-testid="FormControl-group-root"
          >
            <label
              class="neo-switch"
              for="feature-name"
            >
              <input
                checked=""
                id="feature-name"
                type="checkbox"
              />
              <i
                class="neo-switch__icon"
              />
              Enable Feature
            </label>
          </div>
        </div>
      </div>
    `);
  });

  it("triggers `onChange` as expected", () => {
    const onChange = jest.fn();

    const { getByLabelText } = render(
      <Switch id="feature-name" label="Enable Feature" onChange={onChange} />
    );

    const switchEl = getByLabelText("Enable Feature");
    expect(switchEl).not.toBeChecked();

    userEvent.click(switchEl);

    expect(switchEl).toBeChecked();
    expect(onChange).toHaveBeenCalled();

    // 2nd arg should give proper `checked` value
    expect(onChange.mock.calls[0][1]).toBe(true);

    // click it again, 2nd arg should be `false` this time (unchecked)
    userEvent.click(switchEl);
    expect(onChange.mock.calls[1][1]).toBe(false);
  });
});
