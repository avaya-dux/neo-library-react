import { composeStories } from "@storybook/testing-react";
import * as ClosableChipStories from "./ClosableChip.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { getClosableChipClassNames, ClosableChip } from "./ClosableChip";

const {
  ClosableDefault,
  ClosableSuccess,
  ClosableInfo,
  ClosableAlert,
  ClosableWarning,
} = composeStories(ClosableChipStories);

describe("Closable Chip: ", () => {
  describe("Default", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ClosableDefault />);
    });
    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("button should have proper css", async () => {
      const { findByRole } = renderResult;
      const button = await findByRole("button", { hidden: true });
      expect(button).not.toBe(null);
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
      renderResult = render(<ClosableSuccess />);
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
      renderResult = render(<ClosableInfo />);
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
      renderResult = render(<ClosableAlert />);
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
      renderResult = render(<ClosableWarning />);
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
  describe("getClosableChipClassNames", () => {
    describe("given icon === info ", () => {
      it("given variant = alert and disabled = false, should return correct css names", () => {
        expect(getClosableChipClassNames("alert", false)).toBe(
          "neo-chip neo-chip--alert neo-chip--close neo-chip--close--alert"
        );
      });
      it("given variant = alert and disabled = true, should return correct css names", () => {
        expect(getClosableChipClassNames("alert", true)).toBe(
          "neo-chip neo-chip--alert--disabled neo-chip--close neo-chip--close--alert"
        );
      });
    });
  });
  describe("props test", () => {
    const closableChip = {
      chiptype: "closable",
      text: "some text",
      id: "1234",
    };
    it("chiptype is forced correctly", () => {
      expect(closableChip.chiptype).toBe("closable");
    });
    it("component.props is the same as input", () => {
      const component = <ClosableChip {...closableChip} />;
      expect(component.props).toEqual(closableChip);
    });
  });
});
