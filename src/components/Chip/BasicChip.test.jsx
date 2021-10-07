import { composeStories } from "@storybook/testing-react";
import * as ChipsStories from "./BasicChip.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { getBasicChipClassNames } from "./BasicChip";

const { Default, Success, Info, Alert, Warning } = composeStories(ChipsStories);

describe("Basic Chip: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Default />);
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
  describe("Success", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Success />);
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
  describe("Info", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Info />);
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
  describe("Alert", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Alert />);
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
  describe("Warning", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<Warning />);
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

describe("getBasicClassNames", () => {
  describe("given icon === null", () => {
    it("given variant = alert and disabled = false and withinChipContainer = false, should return correct css names", () => {
      expect(
        getBasicChipClassNames("alert", false, false)
      ).toMatchInlineSnapshot(`"neo-chip neo-chip--alert"`);
    });
    it("given variant = alert and disabled = true and withinChipContainer = false, should return correct css names", () => {
      expect(
        getBasicChipClassNames("alert", true, false)
      ).toMatchInlineSnapshot(
        `"neo-chip neo-chip--alert neo-chip--alert--disabled"`
      );
    });
    it("given variant = alert and disabled = true and withinChipContainer = true, should return correct css names", () => {
      expect(getBasicChipClassNames("alert", true, true)).toMatchInlineSnapshot(
        `"neo-chip neo-chip--alert neo-chip--alert--disabled neo-chips__item"`
      );
    });
  });
});
