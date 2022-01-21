import { composeStories } from "@storybook/testing-react";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { internalTabLogger } from "./InternalTab";
import {
  buildTabProps,
  getHeadClasses,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "./Tabs";
import * as TabStories from "./Tabs.stories";

internalTabLogger.disableAll();
const { BasicTabs } = composeStories(TabStories);

describe("Tab", () => {
  describe("Storybook tests", () => {
    describe(BasicTabs, () => {
      let renderResult;
      beforeEach(() => {
        renderResult = render(<BasicTabs />);
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

  describe(getHeadClasses, () => {
    it("when active = true and disabled = true, class is returned", () => {
      const result = getHeadClasses({ active: true, disabled: true });
      expect(result).toContain("neo-tabs__item--active-disabled");
      expect(result).toContain("neo-tabs__item");
    });
    it("when active = true and disabled = false, class is returned", () => {
      const result = getHeadClasses({ active: true, disabled: false });
      expect(result).toContain("neo-tabs__item--active");
      expect(result).toContain("neo-tabs__item");
    });
    it("when active = false and disabled = true, class is returned", () => {
      const result = getHeadClasses({ active: false, disabled: true });
      expect(result).toContain("neo-tabs__item--disabled");
      expect(result).toContain("neo-tabs__item");
    });
    it("when active = false and disabled = false, class is returned", () => {
      const result = getHeadClasses({ active: false, disabled: false });
      expect(result).toContain("neo-tabs__item");
    });
  });
  describe(buildTabProps, () => {
    it("extract ok", () => {
      const tabs = (
        <Tabs defaultTabId="tab1">
          <TabList>
            <Tab id="tab1">tab1</Tab>
            <Tab id="tab2">tab2</Tab>
            <Tab id="tab3">tab3</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <h2>content1</h2>
              <p>paragraph 1</p>
            </TabPanel>
            <TabPanel>content 2</TabPanel>
            <TabPanel>content 3</TabPanel>
          </TabPanels>
        </Tabs>
      );
      expect(buildTabProps(tabs.props.children)).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": Array [
            <h2>
              content1
            </h2>,
            <p>
              paragraph 1
            </p>,
          ],
          "disabled": false,
          "id": "tab1",
          "name": "tab1",
        },
        Object {
          "content": "content 2",
          "disabled": false,
          "id": "tab2",
          "name": "tab2",
        },
        Object {
          "content": "content 3",
          "disabled": false,
          "id": "tab3",
          "name": "tab3",
        },
      ]
    `);
    });
  });
});
