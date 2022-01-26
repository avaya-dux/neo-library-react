import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { internalTabLogger } from "./InternalTab";
import {
  buildTabProps,
  getTabItemClasses,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "./Tabs";
import * as TabStories from "./Tabs.stories";
import * as ScrollableTabStories from "./Tabs.scrollable.stories";
import * as IconTabStories from "./Tabs.icon.stories";

internalTabLogger.disableAll();

const { ControlledActiveTabStory, UncontrolledActiveTabStory } =
  composeStories(TabStories);

const { IconTabs } = composeStories(IconTabStories);

const { ScrollableVerticalTabs } = composeStories(ScrollableTabStories);

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
  });

  describe(getTabItemClasses, () => {
    describe("when active = true and disabled = true", () => {
      it(" and vertical = false, return neo-tabs__item--active-disabled and neo-tabs__item", () => {
        const result = getTabItemClasses({
          active: true,
          disabled: true,
          vertical: false,
        });
        expect(result).toContain("neo-tabs__item--active-disabled");
        expect(result).toContain("neo-tabs__item");
      });
      it("and vertical = true, return neo-tabs__item--vertical--active-disabled and neo-tabs__item", () => {
        const result = getTabItemClasses({
          active: true,
          disabled: true,
          vertical: true,
        });
        expect(result).toContain("neo-tabs__item--vertical--active-disabled");
        expect(result).toContain("neo-tabs__item");
      });
    });
    describe("when active = true and disabled = false ", () => {
      it("and vertical = false, return neo-tabs__item--active and neo-tabs__item", () => {
        const result = getTabItemClasses({
          active: true,
          disabled: false,
          vertical: false,
        });
        expect(result).toContain("neo-tabs__item--active");
        expect(result).toContain("neo-tabs__item");
        expect(result.split(" ").length).toBe(2);
        expect(result).not.toContain("neo-tabs__item--vertical");
      });
      it("and vertical = true, return 3 classes: neo-tabs__item--vertical--active, neo-tabs__item--vertical, and neo-tabs__item", () => {
        const result = getTabItemClasses({
          active: true,
          disabled: false,
          vertical: true,
        });
        expect(result).toContain("neo-tabs__item--vertical--active");
        expect(result).toContain("neo-tabs__item--vertical");
        expect(result).toContain("neo-tabs__item");
        expect(result.split(" ").length).toBe(3);
      });
    });
    describe("when active = false and disabled = true ", () => {
      it("and vertical = false, correct classes are returned", () => {
        const result = getTabItemClasses({
          active: false,
          disabled: true,
          vertical: false,
        });
        expect(result).toContain("neo-tabs__item--disabled");
        expect(result).toContain("neo-tabs__item");
        expect(result.split(" ").length).toBe(2);
      });
      it("and vertical = true, return neo-tabs__item--disabled and neo-tabs__item", () => {
        const result = getTabItemClasses({
          active: false,
          disabled: true,
          vertical: true,
        });
        expect(result).toContain("neo-tabs__item--disabled");
        expect(result).toContain("neo-tabs__item");
        expect(result.split(" ").length).toBe(2);
      });
    });
    describe("when active = false and disabled = false", () => {
      it("and vertical = false, return only neo-tabs__item", () => {
        const result = getTabItemClasses({ active: false, disabled: false });
        expect(result).toContain("neo-tabs__item");
        expect(result.split(" ").length).toBe(1);
      });
      it("and vertical = true, return only neo-tabs__item", () => {
        const result = getTabItemClasses({
          active: false,
          disabled: false,
          vertical: true,
        });
        expect(result).toContain("neo-tabs__item");
        expect(result.split(" ").length).toBe(1);
      });
    });
  });
  describe(buildTabProps, () => {
    it("extract ok", () => {
      const tabs = (
        <Tabs defaultTabId="tab1">
          <TabList>
            <Tab id="tab1" dir="ltr">
              tab1
            </Tab>
            <Tab id="tab2" disabled>
              tab2
            </Tab>
            <Tab id="tab3">tab3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h2>content1</h2>
              <p>paragraph 1</p>
            </TabPanel>
            <TabPanel className="customClass" dir="ltr">
              content 2
            </TabPanel>
            <TabPanel>content 3</TabPanel>
          </TabPanels>
        </Tabs>
      );
      expect(buildTabProps(tabs.props.children)).toMatchInlineSnapshot(`
        Array [
          Object {
            "content": Object {
              "children": Array [
                <h2>
                  content1
                </h2>,
                <p>
                  paragraph 1
                </p>,
              ],
            },
            "dir": "ltr",
            "disabled": false,
            "id": "tab1",
            "name": "tab1",
          },
          Object {
            "content": Object {
              "children": "content 2",
              "className": "customClass",
              "dir": "ltr",
            },
            "disabled": true,
            "id": "tab2",
            "name": "tab2",
          },
          Object {
            "content": Object {
              "children": "content 3",
            },
            "disabled": false,
            "id": "tab3",
            "name": "tab3",
          },
        ]
      `);
    });
  });
});
