import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { listOfStates } from "./SampleData";
import {
  getAriaActiveDescendant,
  getSelectClassNames,
  getSelectedOptions,
  getSelectedValues,
  setMultipleValues,
  renderInputValues,
} from "./Select";
import * as SelectStories from "./Select.stories";

import { KeyboardEventTypes } from "utils";

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

  describe("getSelectedOptions", () => {
    it("will remove the placeholder from the list of states", () => {
      expect(
        getSelectedOptions(
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
      expect(getSelectedOptions(false, "AL", [], listOfStates))
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
      const alabamaIsHere = listOfStates.slice(1, 5);

      expect(getSelectedOptions(true, "AL", alabamaIsHere, listOfStates))
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

  describe("setMultipleValues", () => {
    const AlabamaAndAlaska = listOfStates.slice(1, 3);
    it("Adding Utah to the list of selected states", () => {
      expect(setMultipleValues(AlabamaAndAlaska, listOfStates, "UT"))
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
          Object {
            "label": "Utah",
            "value": "UT",
          },
        ]
      `);
    });

    it("If you pass a state that is already there, this value will be removed", () => {
      expect(setMultipleValues(AlabamaAndAlaska, listOfStates, "AL"))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "label": "Alaska",
            "value": "AK",
          },
        ]
      `);
    });
  });

  describe("getAriaActiveDescendant", () => {
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

  describe("getSelectedValues", () => {
    it("Should display `Alabama` when selectedItems = `Alabama` and defaultSelected = `--Please choose an option--`", () => {
      expect(
        getSelectedValues(listOfStates.slice(1, 2), listOfStates.slice(0, 1))
      ).toMatchInlineSnapshot(`"Alabama"`);
    });

    it("Should display `Alabama, Alaska` when selectedItems = `Alabama, Alaska` and defaultSelected = `--Please choose an option--`", () => {
      expect(
        getSelectedValues(listOfStates.slice(1, 3), listOfStates.slice(0, 1))
      ).toMatchInlineSnapshot(`"Alabama, Alaska"`);
    });

    it("Should display `--Please choose an option--` when selectedItems = `[]` and defaultSelected = `--Please choose an option--`", () => {
      expect(
        getSelectedValues([], listOfStates.slice(0, 1))
      ).toMatchInlineSnapshot(`"--Please choose an option--"`);
    });
  });

  describe("renderInputValues", () => {
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

        fireEvent.keyDown(container, KeyboardEventTypes.DOWN);
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
        fireEvent.keyDown(container, KeyboardEventTypes.DOWN);

        fireEvent.keyDown(container, KeyboardEventTypes.ENTER);

        const textBox = screen.getByRole("textbox");
        const hiddenInput = screen.getByDisplayValue("0");
        expect(textBox).toMatchInlineSnapshot(`
                  <div
                    aria-label="--Please choose an option--"
                    class="neo-multiselect__header"
                    role="textbox"
                  >
                    --Please choose an option--
                  </div>
              `);
        expect(hiddenInput).toMatchInlineSnapshot(`
          <input
            name="neo-select-name-ListofStates"
            type="hidden"
            value="0"
          />
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
});
