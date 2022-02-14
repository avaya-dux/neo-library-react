import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { internalTabLogger } from "./InternalTab";
import * as CarouselTabStories from "./Tabs.carousel.stories";
import * as IconTabStories from "./Tabs.icon.stories";
import * as ScrollableTabStories from "./Tabs.scrollable.stories";
import * as TabStories from "./Tabs.stories";

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

      it("click on tab3 should make tab3 active", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        expect(tabs.length).toBe(3);
        const tab3 = tabs[2];
        userEvent.click(tab3);
        expect(tab3).toHaveAttribute("tabindex", "0");
        expect(tab3).toHaveAttribute("aria-selected", "true");
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
      it("Close Tab2 using space should work", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        expect(tabs.length).toBe(5);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.keyboard("{space}");
        expect(getAllByRole("tab").length).toBe(4);
      });
      it("Close Tab2 using enter should work", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        expect(tabs.length).toBe(5);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.keyboard("{enter}");
        expect(getAllByRole("tab").length).toBe(4);
      });
      it("Close Tab2 using mouse click should work", () => {
        const { getAllByRole } = renderResult;
        const tabs = getAllByRole("tab");
        expect(tabs.length).toBe(5);
        userEvent.tab();
        const closeButton = getAllByRole("button")[0];
        expect(closeButton).toHaveFocus();
        userEvent.click(closeButton);
        expect(getAllByRole("tab").length).toBe(4);
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
