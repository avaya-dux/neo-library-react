import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Select } from "./Select";
import * as SelectStories from "./Select.stories";
import { SelectOption } from "./SelectOption";

const {
  DefaultSelects,
  SelectWithHelperText,
  DisabledSelect,
  RequiredMultipleSelectWithHelperText,
  DisabledMultipleSelectWithErrorState,
  LoadingMultipleSelect,
  SelectsWithWrongChildren,
  MoreThanOneMultipleSelect,
} = composeStories(SelectStories);

const randomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

describe("Select", () => {
  describe("Custom Select", () => {
    describe("Basic unit tests", () => {
      let renderResult;

      const randomizedLabel = randomString();

      const randomizedItems = [
        {
          text: randomString(),
        },
        {
          text: randomString(),
        },
        {
          text: randomString(),
        },
      ];

      beforeEach(() => {
        renderResult = render(
          <Select label={randomizedLabel} items={randomizedItems} />
        );
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
        const { getByRole } = renderResult;
        const toggleButton = getByRole("button");
        const expectedAttributes = ["id", "aria-haspopup", "aria-labelledby"];
        expectedAttributes.forEach((attribute) =>
          expect(toggleButton).toHaveAttribute(attribute)
        );
      });

      it("toggles aria-expanded prop on click", () => {
        const { getByRole } = renderResult;
        const toggleButton = getByRole("button");
        expect(toggleButton).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveAttribute("aria-expanded", "true");
        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveAttribute("aria-expanded", "true");
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe("Multiple Select", () => {
    describe("Basic unit tests", () => {
      let renderResult;
      const randomizedLabel = randomString();
      beforeEach(() => {
        renderResult = render(<Select multiple label={randomizedLabel} />);
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

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });

    describe("integration tests", () => {
      it("only calls the event handler when option is not disabled", () => {
        const spy = jest.fn();
        const { getAllByRole } = render(
          <Select multiple label="not important" onSelectedValueChange={spy}>
            <SelectOption>Option 1</SelectOption>
            <SelectOption disabled>Option 2</SelectOption>
            <SelectOption>Option 3</SelectOption>
            <SelectOption>Option 4</SelectOption>
          </Select>
        );

        expect(spy).not.toHaveBeenCalled();

        const listElements = getAllByRole("option");

        listElements.forEach((element) => {
          fireEvent.click(element);

          if (element.attributes.disabled) {
            expect(spy).not.toHaveBeenCalled();
          } else {
            expect(spy).toHaveBeenCalledTimes(1);
            spy.mockClear();
          }
        });
      });

      it("does open content area on click after content is loaded", () => {
        let loading = true;
        const placeholder = "please select one";
        const label = randomString();
        const { getByText, rerender } = render(
          <Select
            multiple
            label={label}
            loading={loading}
            placeholder={placeholder}
          ></Select>
        );

        const defaultSelectHeader = getByText(placeholder);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(defaultSelectHeader);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");

        loading = false;
        rerender(
          <Select
            multiple
            label={label}
            loading={loading}
            placeholder={placeholder}
          >
            <SelectOption>Option 1</SelectOption>
          </Select>
        );
        fireEvent.click(defaultSelectHeader);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "true");
      });
    });
  });

  describe("Storybook tests", () => {
    describe("Default Selects", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DefaultSelects />);
      });

      it("passes the correct props to list item element", () => {
        const { getAllByRole } = renderResult;
        const listElements = getAllByRole("option");
        listElements.forEach((element) => {
          expect(element).toHaveAttribute("id");
          expect(element).toHaveAttribute("aria-selected");
        });
      });

      it("renders the correct list item as disabled", () => {
        const { getAllByText } = renderResult;
        const disabledListItems = getAllByText("Gravel");
        disabledListItems.forEach((disabledListItem) => {
          expect(disabledListItem).toHaveAttribute("disabled");
        });
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Select With Helper Text", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<SelectWithHelperText />);
      });

      it("passes correct id value to helper text when passed by user", () => {
        const { getByText } = renderResult;
        const helperText = getByText("This is helper text");
        expect(helperText).toHaveAttribute("id", "helper-text-neo-select");
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

    describe("Disabled Select", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DisabledSelect />);
      });
      it("correctly prevents toggling active class on click", () => {
        const { getByTestId } = renderResult;
        const inputGroupElement = getByTestId("NeoInputWrapper-group-root");
        const toggleElement = inputGroupElement.querySelector("div");
        expect(toggleElement).not.toHaveClass("neo-multiselect--active");
        fireEvent.click(toggleElement);
        expect(toggleElement).not.toHaveClass("neo-multiselect--active");
      });
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });

  describe("RequiredMultipleSelectWithHelperText", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<RequiredMultipleSelectWithHelperText />);
    });

    it("renders the correct default options", () => {
      const { getAllByText } = renderResult;
      const selectHeader = getAllByText("Choice 1")[0];
      expect(selectHeader).toHaveClass("neo-multiselect__header");
    });

    it("renders the correct classes when error text passed in", () => {
      const { getByText, getAllByText } = renderResult;
      const submitButton = getByText("Submit");
      const selectedOption = getAllByText("Choice 1")[1];
      fireEvent.click(selectedOption);
      fireEvent.click(submitButton);
      const errorText = getByText("This is a required field");
      expect(errorText).toBeTruthy();
    });

    it("clears the selected options when prompted", () => {
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

  describe("Disabled Multiple Select With Error State,", () => {
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

  describe("Loading Multiple Select", () => {
    let renderResult;

    beforeEach(() => {
      renderResult = render(<LoadingMultipleSelect />);
    });

    it("does not open content area on click when loading", () => {
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

  describe("Selects With Wrong Children", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SelectsWithWrongChildren />);
    });

    it("renders without exploding", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });
  });

  describe("More Than One Multiple Select", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<MoreThanOneMultipleSelect />);
    });

    it("allows for different options to be rendered for each Multiple Select individually", () => {
      const { getAllByText } = renderResult;
      const allOptionOnes = getAllByText("Option 1");
      const allOptionTwos = getAllByText("Option 3");
      fireEvent.click(allOptionOnes[0]);
      fireEvent.click(allOptionTwos[1]);
      const allOptionOnesAfterClick = getAllByText("Option 1");
      const allOptionTwosAfterClick = getAllByText("Option 3");
      expect(allOptionOnesAfterClick).toHaveLength(3);
      expect(allOptionTwosAfterClick).toHaveLength(3);
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
