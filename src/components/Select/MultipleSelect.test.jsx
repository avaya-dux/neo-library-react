import { composeStories } from "@storybook/testing-react";
import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { MultipleSelect } from "./MultipleSelect";
import * as MultipleSelectStories from "./MultipleSelect.stories";

const { DefaultMultipleSelect } = composeStories(MultipleSelectStories);

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
  });
});
