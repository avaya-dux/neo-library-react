import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { internalTabLogger } from "./InternalTab";

import * as TabStories from "./Tabs.stories";
import * as ScrollableTabStories from "./Tabs.scrollable.stories";
import * as IconTabStories from "./Tabs.icon.stories";
import * as CarouselTabStories from "./Tabs.carousel.stories";

internalTabLogger.disableAll();

const { ControlledActiveTabStory, UncontrolledActiveTabStory } =
  composeStories(TabStories);

const { IconTabs } = composeStories(IconTabStories);

const { ScrollableVerticalTabs } = composeStories(ScrollableTabStories);
const { ManyTabsCarousel, TwoTabsCarousel } =
  composeStories(CarouselTabStories);

describe("Tabs", () => {
  describe("Storybook tests", () => {
    describe(ControlledActiveTabStory.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ControlledActiveTabStory />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(UncontrolledActiveTabStory.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<UncontrolledActiveTabStory />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(IconTabs.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<IconTabs />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(ScrollableVerticalTabs.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ScrollableVerticalTabs />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(ManyTabsCarousel.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<ManyTabsCarousel />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
    describe(TwoTabsCarousel.storyName, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<TwoTabsCarousel />);
      });
      it("should render ok", () => {
        const { container } = renderResult;
        expect(container).toBeDefined();
      });

      it("passes basic axe compliance", async () => {
        const { container } = renderResult;
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });

      it("should render custom aria-labels", () => {
        const { getAllByRole } = renderResult;
        const buttons = getAllByRole("button");
        expect(buttons.length).toBe(2);
        expect(buttons[0]).toHaveAttribute("aria-label", "previous tab");
        expect(buttons[1]).toHaveAttribute("aria-label", "next tab");
      });
    });
  });
});
