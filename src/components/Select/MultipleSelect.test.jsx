import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, act } from "@testing-library/react";
import { axe } from "jest-axe";

import { MultipleSelect } from "./MultipleSelect";
import * as MultipleSelectStories from "./MultipleSelect.stories";

const {
  DefaultMultipleSelect,
  RequiredMultipleSelectWithHelperText,
  DisabledMultipleSelectWithErrorState,
  LoadingMultipleSelect,
  MultipleSelectWithWrongChildren,
  MoreThanOneMultipleSelect,
} = composeStories(MultipleSelectStories);

describe("MultipleSelect", () => {
  describe("Basic unit tests", () => {
    let renderResult;
    const randomString = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const randomizedLabel = randomString();
    beforeEach(() => {
      renderResult = render(<MultipleSelect label={randomizedLabel} />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("passes the correct props to label element", () => {
      const { getByText } = renderResult;
      const labelElement = getByText(randomizedLabel);
      const expectedAttributes = ["id", "for"];
      expectedAttributes.forEach((attribute) =>
        expect(labelElement).toHaveAttribute(attribute)
      );
    });

    it("passes the correct props to toggle element", () => {
      const { getByText } = renderResult;
      const toggleElement = getByText("Select One");
      const expectedAttributes = ["id", "aria-haspopup", "aria-labelledby"];
      expectedAttributes.forEach((attribute) =>
        expect(toggleElement).toHaveAttribute(attribute)
      );
    });

    it("toggles aria-expanded prop on click", () => {
      const { getByText } = renderResult;
      const toggleElement = getByText("Select One");
      expect(toggleElement).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(toggleElement);
      expect(toggleElement).toHaveAttribute("aria-expanded", "true");
    });

    it("passes the correct props to listbox element", () => {
      const { getByRole } = renderResult;
      const listboxElement = getByRole("listbox");
      const expectedAttributes = ["id", "aria-labelledby", "tabindex"];
      expectedAttributes.forEach((attribute) =>
        expect(listboxElement).toHaveAttribute(attribute)
      );
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Storybook tests", () => {
    describe("Default Multiple Select", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DefaultMultipleSelect />);
      });

      it("passes the correct value to event handler", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});
        const { getAllByRole } = renderResult;
        const listElements = getAllByRole("option");
        listElements.forEach((element) => {
          fireEvent.click(element);
          expect(spy).toHaveBeenCalled();
        });
      });

      it("renders the correct input as disabled", () => {
        const { getByText } = renderResult;
        const disabledLabelElement = getByText("Option 2");
        expect(disabledLabelElement).toHaveAttribute("disabled");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("RequiredMultipleSelectWithHelperText", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<RequiredMultipleSelectWithHelperText />);
      });

      it("Renders the correct default options", () => {
        const { getAllByText } = renderResult;
        const selectHeader = getAllByText("Choice 1")[0];
        expect(selectHeader).toHaveClass("neo-multiselect__header");
      });

      it("Renders the correct classes when error text passed in", () => {
        const { getByText, getAllByText } = renderResult;
        const submitButton = getByText("Submit");
        const selectedOption = getAllByText("Choice 1")[1];
        fireEvent.click(selectedOption);
        fireEvent.click(submitButton);
        const errorText = getByText("This is a required field");
        expect(errorText).toBeTruthy();
      });

      it("Clears the selected options when prompted", () => {
        const { getByText, getAllByText } = renderResult;
        const selectHeader = getAllByText("Choice 1")[0];
        expect(selectHeader).toHaveClass("neo-multiselect__header");
        const resetButton = getByText("Reset");
        fireEvent.click(resetButton);
        const defaultSelectHeader = getByText("Select One");
        expect(defaultSelectHeader).toHaveClass("neo-multiselect__header");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("DisabledMultipleSelectWithErrorState,", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DisabledMultipleSelectWithErrorState />);
      });

      it("does not open content area on click when disabled", () => {
        const { getByText } = renderResult;
        const defaultSelectHeader = getByText("Select One");
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(defaultSelectHeader);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("LoadingMultipleSelect", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<LoadingMultipleSelect />);
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it("does not open content area on click when loading", () => {
        const { getByText } = renderResult;
        const defaultSelectHeader = getByText("Select One");
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(defaultSelectHeader);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
      });

      it("does open content area on click after content is loaded", () => {
        jest.useFakeTimers();
        const { getByText } = renderResult;
        const defaultSelectHeader = getByText("Select One");
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(defaultSelectHeader);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
        jest.runAllTimers();
        const updatedDefaultSelectHeader = getByText("Select One");
        fireEvent.click(updatedDefaultSelectHeader);
        expect(updatedDefaultSelectHeader).toHaveAttribute(
          "aria-expanded",
          "true"
        );
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("MultipleSelectWithWrongChildren", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<MultipleSelectWithWrongChildren />);
      });

      it("renders without exploding despite not passing MultipleSelectOption as children", () => {
        const { container } = renderResult;
        expect(container).not.toBe(null);
      });
    });
  });
});
