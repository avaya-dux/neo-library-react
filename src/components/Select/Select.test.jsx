import { composeStories } from "@storybook/testing-react";
import { fireEvent, render, screen } from "@testing-library/react";
import { axe } from "jest-axe";

import { Select } from "./Select";
import * as SelectStories from "./Select.stories";
import { SelectOption } from "./SelectOption";

const {
  BasicSelects,
  Searchable,
  Disabled,
  DefaultValues,
  RequiredInForm,
  LoadOptions,
  Empty,
  SelectsWithWrongChildren,
  MoreThanOneMultipleSelect,
} = composeStories(SelectStories);

const randomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

const foodOptions = [
  <SelectOption value="apple" key="apple">
    Apple
  </SelectOption>,
  <SelectOption value="gravel" key="gravel" helperText="Not a Food" disabled>
    Gravel
  </SelectOption>,
  <SelectOption value="broccoli" key="broccoli" helperText="Vegetable">
    Broccoli
  </SelectOption>,
  <SelectOption value="banana" key="banana">
    Banana
  </SelectOption>,
  <SelectOption value="pear" key="pear">
    Pear
  </SelectOption>,
  <SelectOption value="blueberries" key="blueberries">
    Blueberries
  </SelectOption>,
  <SelectOption value="grapes" key="grapes">
    Grapes
  </SelectOption>,
  <SelectOption value="oranges" key="oranges">
    Oranges
  </SelectOption>,
];

describe("Select", () => {
  describe("Single Select, non-searchable", () => {
    let renderResult;

    const randomizedLabel = randomString();

    beforeEach(() => {
      renderResult = render(
        <Select label={randomizedLabel}>{foodOptions}</Select>
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

  describe("Multiple Select, non-searchable", () => {
    describe("Basic unit tests", () => {
      let renderResult;
      const randomizedLabel = "label";
      const placeholder = "Please Select One";
      beforeEach(() => {
        renderResult = render(
          <Select multiple label={randomizedLabel} placeholder={placeholder}>
            <SelectOption>ping</SelectOption>
          </Select>
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
        const toggleElement = screen.getByRole("button");
        const expectedAttributes = ["id", "aria-haspopup", "aria-labelledby"];
        expectedAttributes.forEach((attribute) =>
          expect(toggleElement).toHaveAttribute(attribute)
        );
      });

      it("toggles aria-expanded prop on click", () => {
        const toggleElement = screen.getByRole("button");
        expect(toggleElement).toHaveTextContent(placeholder);
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
          <Select multiple label="not important" onChange={spy}>
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
        const placeholder = "please select one";
        const label = randomString();
        const { getByText, rerender } = render(
          <Select
            multiple
            label={label}
            loading={true}
            placeholder={placeholder}
          ></Select>
        );

        const defaultSelectHeader = getByText(placeholder);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");
        fireEvent.click(defaultSelectHeader);
        expect(defaultSelectHeader).toHaveAttribute("aria-expanded", "false");

        rerender(
          <Select
            multiple
            label={label}
            loading={false}
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
    describe("Basic Selects", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<BasicSelects />);
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

    describe("Searchable Selects", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Searchable />);
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

    describe("Disabled Select", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Disabled />);
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

    describe("Default Values", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DefaultValues />);
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

    describe("Required In Form", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<RequiredInForm />);
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

    describe("Loading", () => {
      let renderResult;

      beforeEach(() => {
        renderResult = render(<LoadOptions />);
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

    describe("Selects Without Children", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<Empty />);
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
});
