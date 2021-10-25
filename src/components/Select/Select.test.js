import { composeStories } from "@storybook/testing-react";
import * as SelectStories from "./Select.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getSelectClassNames, getSelectedItems } from "./Select";
import { renderSingleOptions, renderMultipleOptions } from "./Options";
import { getOption } from "utils/SelectUtils";
import { listOfStates } from "./SampleData";
const {
  UncontrolledSelect,
  ControlledSelect,
  ControlledMultipleSelect,
  ValidateValuesSelect,
  SelectError,
  SelectRequired,
  SelectDisabled,
} = composeStories(SelectStories);

describe("Select: ", () => {
  describe("UncontrolledSelect", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<UncontrolledSelect />);
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

  describe("ControlledSelect", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ControlledSelect />);
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

  describe("ControlledMultipleSelect", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ControlledMultipleSelect />);
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

  describe("ValidateValuesSelect", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ValidateValuesSelect />);
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

  describe("SelectError", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectError />);
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

  describe("SelectRequired", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectRequired />);
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

  describe("SelectDisabled", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectDisabled />);
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

describe("getSelectClassNames", () => {
  it("given isOpen = true, should return correct css names", () => {
    expect(getSelectClassNames(true)).toMatchInlineSnapshot(
      `"neo-multiselect neo-multiselect--active"`
    );
  });
  it("given isOpen = false, should return correct css names", () => {
    expect(getSelectClassNames()).toMatchInlineSnapshot(`"neo-multiselect"`);
  });

  it("given isOpen = true, disabled= true should return correct css names", () => {
    expect(getSelectClassNames(true, true)).toMatchInlineSnapshot(
      `"neo-multiselect neo-multiselect--active neo-multiselect--disabled"`
    );
  });

  it("given isOpen = true, disabled= true, isLoading= true, should return correct css names", () => {
    expect(getSelectClassNames(true, true, true)).toMatchInlineSnapshot(
      `"neo-multiselect neo-multiselect--active neo-multiselect--disabled neo-select__spinner"`
    );
  });
});

describe("renderSingleOptions and renderMultipleOptions", () => {
  it("renderSingleOptions given a listOfStates and cursor 1, should return a list", () => {
    expect(renderSingleOptions(listOfStates.slice(0, 3), 1))
      .toMatchInlineSnapshot(`
      Array [
        null,
        <div
          aria-selected={true}
          className=" neo-multiselect__content__item--hover"
          data-value="AL"
          role="option"
        >
          Alabama
        </div>,
        <div
          aria-selected={false}
          className=""
          data-value="AK"
          role="option"
        >
          Alaska
        </div>,
      ]
    `);
  });

  it("renderMultipleOptions given a listOfStates and cursor 1, should return a list", () => {
    expect(
      renderMultipleOptions(
        listOfStates.slice(0, 3),
        listOfStates.slice(0, 1),
        1,
        () => console.log("test")
      )
    ).toMatchInlineSnapshot(`
      Array [
        null,
        <div
          className="neo-input-group neo-multiselect__content__item--hover"
          role="listitem"
        >
          <input
            aria-describedby="Alabama-hint-1"
            checked={false}
            className="neo-check"
            id="Alabama-checkbox-1"
            onChange={[Function]}
            onMouseEnter={[Function]}
            tabIndex={-1}
            type="checkbox"
            value="AL"
          />
          <label
            data-value="AL"
            htmlFor="Alabama-checkbox-1"
          >
            Alabama
          </label>
        </div>,
        <div
          className="neo-input-group"
          role="listitem"
        >
          <input
            aria-describedby="Alaska-hint-2"
            checked={false}
            className="neo-check"
            id="Alaska-checkbox-2"
            onChange={[Function]}
            onMouseEnter={[Function]}
            tabIndex={-1}
            type="checkbox"
            value="AK"
          />
          <label
            data-value="AK"
            htmlFor="Alaska-checkbox-2"
          >
            Alaska
          </label>
        </div>,
      ]
    `);
  });
});

describe("getSelectedItems", () => {
  it("CLEAN: will remove the placeholder from the list of states", () => {
    expect(
      getSelectedItems(
        true,
        "",
        listOfStates.slice(0, 3),
        listOfStates.slice(0, 3)
      )
    ).toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Alabama",
          "value": "AL",
        },
        Object {
          "label": "Alaska",
          "value": "AK",
        },
      ]
    `);
  });

  it("ADD: given value = AL, should return the Alabama from the list of states", () => {
    expect(getSelectedItems(false, "AL", [], listOfStates))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Alabama",
          "value": "AL",
        },
      ]
    `);
  });

  it("REMOVE: given value = AL, should remove Alabama from the list of selected states", () => {
    const alabamaIshere = listOfStates.slice(1, 5);
    console.log(alabamaIshere);

    expect(getSelectedItems(true, "AL", alabamaIshere, listOfStates))
      .toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Alaska",
          "value": "AK",
        },
        Object {
          "label": "Arizona",
          "value": "AZ",
        },
        Object {
          "label": "Arkansas",
          "value": "AR",
        },
      ]
    `);
  });
});

describe("getOption", () => {
  it("given a list of states without a query will returns the default selected", () => {
    expect(getOption(listOfStates)).toMatchInlineSnapshot(`
      Array [
        Object {
          "defaultSelected": true,
          "disabled": false,
          "label": "--Please choose an option--",
          "placeholder": true,
          "value": "0",
        },
      ]
    `);
  });

  it("given a list of states with the query (AL, UT) will returns Alabama and Utah", () => {
    expect(getOption(listOfStates, ["AL", "UT"])).toMatchInlineSnapshot(`
      Array [
        Object {
          "label": "Alabama",
          "value": "AL",
        },
        Object {
          "label": "Utah",
          "value": "UT",
        },
      ]
    `);
  });
});
