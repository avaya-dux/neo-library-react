import { fireEvent, render } from "@testing-library/react";
import { axe } from "jest-axe";

import { Select } from "./Select";

const randomString = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

describe("Searchable Select", () => {
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
        <Select label={randomizedLabel} items={randomizedItems} searchable />
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

    it("passes the correct props to searchable element", () => {
      const { getAllByRole } = renderResult;
      const searchableElement = getAllByRole("textbox")[0].closest("div");
      const expectedAttributes = [
        "aria-haspopup",
        "aria-owns",
        "aria-expanded",
      ];
      expectedAttributes.forEach((attribute) =>
        expect(searchableElement).toHaveAttribute(attribute)
      );
    });

    it("toggles aria-expanded prop on click", () => {
      const { getAllByRole } = renderResult;
      const toggleButton = getAllByRole("textbox")[0].closest("span");
      const searchableElement = getAllByRole("textbox")[0].closest("div");
      expect(searchableElement).toHaveAttribute("aria-expanded", "false");
      fireEvent.click(toggleButton);
      expect(searchableElement).toHaveAttribute("aria-expanded", "true");
      fireEvent.click(toggleButton);
      expect(searchableElement).toHaveAttribute("aria-expanded", "true");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
