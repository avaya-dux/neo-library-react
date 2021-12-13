import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { KeyboardEventTypes } from "utils";

import { listOfStates } from "./SampleData";
import {
  computeMultipleSelectedValues,
  formatSelectedValuesToString,
  getAriaActiveDescendant,
  getSelectClassNames,
  onSelectionChangeHandler,
  removePlaceholder,
  renderInputValues,
} from "./Select";
import * as SelectStories from "./Select.stories";

const {
  UncontrolledSelect,
  ControlledSelect,
  ControlledMultipleSelect,
  ValidateValuesSelect,
  SelectError,
  SelectRequired,
  SelectDisabled,
} = composeStories(SelectStories);

describe("Select test ", () => {
  describe("UncontrolledSelect test", () => {
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
    }, 10000);
  });

  describe("ControlledSelect test", () => {
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
    }, 10000);
  });

  describe("ControlledMultipleSelect test", () => {
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
    }, 10000);
  });

  describe("ValidateValuesSelect test", () => {
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
    }, 10000);
  });

  describe("SelectError test", () => {
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
    }, 10000);
  });

  describe("SelectRequired test", () => {
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
    }, 10000);
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
    }, 10000);
  });

  describe(getSelectClassNames, () => {
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

  describe(computeMultipleSelectedValues, () => {
    const AlabamaAndAlaska = listOfStates.slice(1, 3);
    it("Should return empty array for undefined values", () => {
      expect(computeMultipleSelectedValues([], [], "")).toMatchInlineSnapshot(
        `Array []`
      );
    });

    it("Should return Alabama and Alaska when the query is an empty string", () => {
      expect(computeMultipleSelectedValues(AlabamaAndAlaska, [], ""))
        .toMatchInlineSnapshot(`
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

    it("Adding Utah to the list of selected states", () => {
      expect(
        computeMultipleSelectedValues(
          AlabamaAndAlaska,
          [{ label: "Utah", value: "UT" }],
          "UT"
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
          Object {
            "label": "Utah",
            "value": "UT",
          },
        ]
      `);
    });

    it("If you pass a state that is already there, this value will be removed", () => {
      expect(
        computeMultipleSelectedValues(
          AlabamaAndAlaska,
          [{ label: "Alabama", value: "AL" }],
          "AL"
        )
      ).toMatchInlineSnapshot(`
        Array [
          Object {
            "label": "Alaska",
            "value": "AK",
          },
        ]
      `);
    });
  });

  describe(getAriaActiveDescendant, () => {
    it("if IsOpen is true and options = [], will return empty string", () => {
      expect(getAriaActiveDescendant(true, [])).toMatchInlineSnapshot(`""`);
    });

    it("if IsOpen is true will return the active state id", () => {
      expect(
        getAriaActiveDescendant(true, listOfStates.slice(1, 2))
      ).toMatchInlineSnapshot(`"Alabama-AL"`);
    });

    it("if IsOpen is false, should return empty string", () => {
      expect(
        getAriaActiveDescendant(false, listOfStates.slice(1, 2))
      ).toMatchInlineSnapshot(`""`);
    });
  });

  describe(formatSelectedValuesToString, () => {
    it("Should display `empty string` when selectedItems = `[]` and defaultSelected = []", () => {
      expect(formatSelectedValuesToString([], [])).toMatchInlineSnapshot(`""`);
    });

    it("Should display `Alabama` when selectedItems = `Alabama` and defaultSelected = `--Please choose an option--`", () => {
      expect(
        formatSelectedValuesToString(
          listOfStates.slice(1, 2),
          listOfStates.slice(0, 1)
        )
      ).toMatchInlineSnapshot(`"Alabama"`);
    });

    it("Should display `Alabama, Alaska` when selectedItems = `Alabama, Alaska` and defaultSelected = `--Please choose an option--`", () => {
      expect(
        formatSelectedValuesToString(
          listOfStates.slice(1, 3),
          listOfStates.slice(0, 1)
        )
      ).toMatchInlineSnapshot(`"Alabama, Alaska"`);
    });

    it("Should display `--Please choose an option--` when selectedItems = `[]` and defaultSelected = `--Please choose an option--`", () => {
      expect(
        formatSelectedValuesToString([], listOfStates.slice(0, 1))
      ).toMatchInlineSnapshot(`"--Please choose an option--"`);
    });
  });

  describe(renderInputValues, () => {
    it("should return 2 inputs with values = `AL`, `AK` and hidden type", () => {
      expect(renderInputValues(listOfStates.slice(1, 3), "test-name-001"))
        .toMatchInlineSnapshot(`
        Array [
          <input
            name="test-name-001"
            type="hidden"
            value="AL"
          />,
          <input
            name="test-name-001"
            type="hidden"
            value="AK"
          />,
        ]
      `);
    });

    it("should return an input with value = `AL` and hidden type", () => {
      expect(renderInputValues(listOfStates.slice(1, 2), "test-name-002"))
        .toMatchInlineSnapshot(`
        Array [
          <input
            name="test-name-002"
            type="hidden"
            value="AL"
          />,
        ]
      `);
    });

    it("should return an empty Array", () => {
      expect(renderInputValues([], "test-name-003")).toMatchInlineSnapshot(
        `Array []`
      );
    });
  });

  describe("Keyboard events", () => {
    describe("keyDown Escape test", () => {
      it("display default after Escape was triggered", () => {
        render(<ControlledSelect />);

        const container = screen.getByRole("listbox");

        fireEvent.click(container);
        fireEvent.keyDown(container, KeyboardEventTypes.ESC);
        expect(screen.getByRole("textbox")).toMatchInlineSnapshot(`
                  <div
                    aria-label="--Please choose an option--"
                    class="neo-multiselect__header"
                    role="textbox"
                  >
                    --Please choose an option--
                  </div>
              `);
      });
    });

    describe("keyDown and Enter test", () => {
      it("Should display Alabama, because is the 1st item from the list ", () => {
        render(<ControlledSelect />);
        const container = screen.getByRole("listbox");

        fireEvent.click(container);

        // fireEvent.keyDown(container, KeyboardEventTypes.DOWN);
        fireEvent.keyDown(container, KeyboardEventTypes.ENTER);

        const textBox = screen.getByRole("textbox");
        const hiddenInput = screen.getByDisplayValue("AL");
        expect(textBox).toMatchInlineSnapshot(`
                  <div
                    aria-label="Alabama"
                    class="neo-multiselect__header"
                    role="textbox"
                  >
                    Alabama
                  </div>
              `);
        expect(hiddenInput).toMatchInlineSnapshot(`
          <input
            name="neo-select-name-ListofStates"
            type="hidden"
            value="AL"
          />
        `);
      });
    });

    describe("keyDown ArrowDown and Enter for Disabled Option test", () => {
      it("does not allow the selection of disabled options", () => {
        // the 2nd item from the list and is a disabled option
        render(<ControlledSelect />);
        const container = screen.getByRole("listbox");

        fireEvent.click(container);
        fireEvent.keyDown(container, KeyboardEventTypes.DOWN);
        fireEvent.keyDown(container, KeyboardEventTypes.ENTER);

        const textBox = screen.getByRole("textbox");

        expect(textBox).toMatchInlineSnapshot(`
                  <div
                    aria-label="--Please choose an option--"
                    class="neo-multiselect__header"
                    role="textbox"
                  >
                    --Please choose an option--
                  </div>
              `);
      });
    });

    describe("keyDown ArrowDown and Enter for Disabled Option test", () => {
      it("Should display Arizona because is the 3rd item from the list", () => {
        render(<ControlledSelect />);
        const container = screen.getByRole("listbox");

        fireEvent.click(container);

        fireEvent.keyDown(container, KeyboardEventTypes.DOWN);
        fireEvent.keyDown(container, KeyboardEventTypes.DOWN);

        fireEvent.keyDown(container, KeyboardEventTypes.ENTER);

        const textBox = screen.getByRole("textbox");
        const hiddenInput = screen.getByDisplayValue("AZ");
        expect(textBox).toMatchInlineSnapshot(`
                  <div
                    aria-label="Arizona"
                    class="neo-multiselect__header"
                    role="textbox"
                  >
                    Arizona
                  </div>
              `);

        expect(hiddenInput).toMatchInlineSnapshot(`
          <input
            name="neo-select-name-ListofStates"
            type="hidden"
            value="AZ"
          />
        `);
      });
    });

    describe("keyDown ArrowUp and Enter test", () => {
      it("Should display Wyoming because is the last item from the list", () => {
        render(<ControlledSelect />);
        const container = screen.getByRole("listbox");

        fireEvent.click(container);
        fireEvent.keyDown(container, KeyboardEventTypes.UP);
        fireEvent.keyDown(container, KeyboardEventTypes.ENTER);

        const textBox = screen.getByRole("textbox");
        const hiddenInput = screen.getByDisplayValue("WY");
        expect(textBox).toMatchInlineSnapshot(`
          <div
            aria-label="Wyoming"
            class="neo-multiselect__header"
            role="textbox"
          >
            Wyoming
          </div>
        `);

        expect(hiddenInput).toMatchInlineSnapshot(`
          <input
            name="neo-select-name-ListofStates"
            type="hidden"
            value="WY"
          />
        `);
      });
    });
  });

  describe(removePlaceholder, () => {
    it("should remove the placeholder item from the option list", () => {
      expect(removePlaceholder(listOfStates.slice(0, 2)))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "label": "Alabama",
            "value": "AL",
          },
        ]
      `);
    });
  });

  describe(onSelectionChangeHandler, () => {
    let isMultipleSelect;
    let options;
    let selectedOptions;
    let updateHoveredIndex;
    let updateSelectedOptions;
    let value;
    let onSelectionChange;
    beforeEach(() => {
      isMultipleSelect = false;
      options = listOfStates;
      selectedOptions = listOfStates.slice(1, 2);
      updateHoveredIndex = jest.fn();
      updateSelectedOptions = jest.fn();
      value = "AL";
      onSelectionChange = jest.fn();
    });

    it("should close Option list when Select lost focus", () => {
      onSelectionChangeHandler(
        isMultipleSelect,
        options,
        selectedOptions,
        updateHoveredIndex,
        updateSelectedOptions,
        value,
        onSelectionChange
      );
      expect(updateHoveredIndex).toBeCalledWith(1);
      // expect(onSelectionChange).toBeCalledWith([""]);
    });
  });
});
