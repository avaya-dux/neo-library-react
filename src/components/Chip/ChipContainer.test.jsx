import { composeStories } from "@storybook/testing-react";
import * as ChipContainerStories from "./ChipContainer.stories";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import userEvent from "@testing-library/user-event";

const { BasicChips, IconChips, ClosableChips, MixedChips } =
  composeStories(ChipContainerStories);

describe("Container", () => {
  describe("of BasicChips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<BasicChips />);
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
  describe("of IconChips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<IconChips />);
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
  describe("of ClosableChips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<ClosableChips />);
    });

    it("should render ok", () => {
      const { container } = renderResult;
      expect(container).not.toBe(null);
    });

    it("should render two buttons", () => {
      const { getAllByRole } = renderResult;
      const buttons = getAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("click on disabled button should not remove it", async () => {
      const chipOne = screen.getByText(/.*one/i);
      userEvent.click(chipOne);
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(2);
    });

    it("click on enabled button should remove it", async () => {
      const chipTwo = screen.getByText(/.*two/i);
      userEvent.click(chipTwo);
      const buttons = await screen.findAllByRole("button");
      expect(buttons.length).toBe(1);
      // Two is gone. One is left.
      expect(buttons[0]).toHaveTextContent("One");
    });

    it("passes basic axe compliance", async () => {
      const { container } = renderResult;
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
  describe("of Mixed Chips:", () => {
    let renderResult;
    beforeEach(() => {
      renderResult = render(<MixedChips />);
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
