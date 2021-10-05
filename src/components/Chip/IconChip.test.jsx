import { composeStories } from "@storybook/testing-react";
import * as IconChipsStories from "./IconChip.stories";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { getIconChipClassNames } from "./IconChip";

const {
  DefaultWithIcon,
  SuccessWithIcon,
  InfoWithIcon,
  AlertWithIcon,
  WarningWithIconOnRight,
} = composeStories(IconChipsStories);

describe("Icon Chip: ", () => {
  describe("DefaultWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<DefaultWithIcon />);
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
  describe("SuccessWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<SuccessWithIcon />);
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
  describe("InfoWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<InfoWithIcon />);
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
  describe("AlertWithIcon", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<AlertWithIcon />);
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
  describe("WarningWithIconOnRight", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<WarningWithIconOnRight />);
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

describe("getIconChipClassNames", () => {
  describe("given icon === info ", () => {
    it("given variant = alert and disabled = false, should return correct css names", () => {
      expect(getIconChipClassNames("alert", false, "info")).toBe(
        "neo-chip neo-chip--alert neo-icon-info"
      );
    });
    it("given variant = alert and disabled = true, should return correct css names", () => {
      expect(getIconChipClassNames("alert", true, "info")).toBe(
        "neo-chip neo-chip--alert--disabled neo-icon-info"
      );
    });
  });
});
