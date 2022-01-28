import { render, fireEvent } from "@testing-library/react";
import { composeStories } from "@storybook/testing-react";
import { axe } from "jest-axe";

import { Select } from "./Select";

import * as SelectStories from "./Select.stories";

const {
  DefaultSelect,
  SelectWithHelperText,
  DisabledSelect,
  LoadingSelect,
  RequiredSelect,
  ErrorSelect,
} = composeStories(SelectStories);

describe("Select", () => {
  describe("Basic unit tests", () => {
    let renderResult;
    const randomString = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

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
      const { getByTestId } = renderResult;
      const inputGroupElement = getByTestId("NeoInputWrapper-group-root");
      const toggleElement = inputGroupElement.querySelector("div");
      const expectedAttributes = ["id", "aria-haspopup", "aria-labelledby"];
      expectedAttributes.forEach((attribute) =>
        expect(toggleElement).toHaveAttribute(attribute)
      );
    });

    it("toggles aria-expanded prop on click", () => {
      const { getByTestId } = renderResult;
      const inputGroupElement = getByTestId("NeoInputWrapper-group-root");
      const toggleElement = inputGroupElement.querySelector("div");
      expect(toggleElement).not.toHaveAttribute("aria-expanded");
      fireEvent.click(toggleElement);
      expect(toggleElement).toHaveAttribute("aria-expanded");
      fireEvent.click(toggleElement);
      expect(toggleElement).toHaveAttribute("aria-expanded", "false");
    });

    it("passes the correct props to listbox element", () => {
      const { getByRole } = renderResult;
      const listboxElement = getByRole("listbox");
      const expectedAttributes = ["id", "aria-labelledby", "tabindex"];
      expectedAttributes.forEach((attribute) =>
        expect(listboxElement).toHaveAttribute(attribute)
      );
    });

    it("passes the correct props to list item element", () => {
      const { getAllByRole } = renderResult;
      const listElements = getAllByRole("option");
      listElements.forEach((element) => {
        expect(element).toHaveAttribute("id");
        expect(element).toHaveAttribute("aria-selected");
      });
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("Storybook tests", () => {
    describe("Default Select", () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<DefaultSelect />);
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
      it("renders the correct list item as disabled", () => {
        const { getByText } = renderResult;
        const disabledListItem = getByText("Option 2");
        expect(disabledListItem).toHaveAttribute("disabled");
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
      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Disabled Select", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<DisabledSelect />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Loading Select", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<LoadingSelect />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Required Select", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<RequiredSelect />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe("Error Select", () => {
      it("passes basic axe compliance", async () => {
        const { container } = render(<ErrorSelect />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });
});
