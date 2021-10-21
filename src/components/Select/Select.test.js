import { composeStories } from "@storybook/testing-react";
import * as SelectStories from "./Select.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";

import { getSelectClassNames } from "./Select";
import { renderSingleOptions, renderMultipleOptions } from "./Options";
import { listOfStates } from "./SampleData";
const {
  UncontrolledSelect,
  ControlledSelect,
  ControlledMultipleSelect,
  SelectError,
  SelectRequired,
  SelectDisabled,
} = composeStories(SelectStories);

describe("Select: ", () => {
  describe("Default", () => {
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

  describe("DemoSelect", () => {
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

  describe("DemoMultipleSelect", () => {
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
        <li
          aria-selected={true}
          className=" neo-multiselect__content__item--hover"
          data-value="AL"
          role="option"
          tabIndex={-1}
        >
          Alabama
        </li>,
        <li
          aria-selected={false}
          className=""
          data-value="AK"
          role="option"
          tabIndex={-1}
        >
          Alaska
        </li>,
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
        <li
          aria-label="Alabama"
          className="neo-input-group neo-multiselect__content__item--hover"
          role="listitem"
          tabIndex={-1}
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
        </li>,
        <li
          aria-label="Alaska"
          className="neo-input-group"
          role="listitem"
          tabIndex={-1}
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
        </li>,
      ]
    `);
  });
});
