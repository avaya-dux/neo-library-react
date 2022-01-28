import { render, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";

import { Select } from "./Select";

import { SelectExample } from "./Select.stories";

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
      const expectedAttributes = [
        "id",
        "aria-haspopup",
        "aria-expanded",
        "aria-labelledby",
      ];
      expectedAttributes.forEach((attribute) =>
        expect(toggleElement).toHaveAttribute(attribute)
      );
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
    it("passes the correct value to event handler", () => {
      const spy = jest.spyOn(console, "log").mockImplementation(() => {});
      const { getAllByRole } = render(<SelectExample />);
      const listElements = getAllByRole("option");
      listElements.forEach((element) => {
        fireEvent.click(element);
        expect(spy).toHaveBeenCalled();
      });
    });

    // it("renders the correct list item as disabled", () => {})
  });
});
