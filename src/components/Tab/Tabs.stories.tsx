import { Meta, Story } from "@storybook/react/types-6-0";
import { Button } from "components";
import { createRef } from "react";
import { tabMouseEventHandlerLogger } from "./EventHandlers";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./Tabs";
import { TabsInterface, TabsProps } from "./TabTypes";

tabMouseEventHandlerLogger.enableAll();

export default {
  title: "Components/Tab",
  component: Tab,
} as Meta<TabsProps>;

const Template: Story<TabsProps> = (props) => {
  const ref = createRef<TabsInterface>();

  return (
    <div>
      <Button
        onClick={() => {
          ref.current?.disableActiveTab();
          console.log(ref.current?.activeTabId);
        }}
      >
        Disable Active/Selected Tab
      </Button>
      <Button onClick={() => ref.current?.enableActiveTab()}>
        Enable Active/Selected Tab
      </Button>
      <Button
        onClick={() => {
          ref.current?.disableAllTabs();
        }}
      >
        Disable All Tabs
      </Button>
      <Button onClick={() => ref.current?.enableAllTabs()}>
        Enable All Tabs
      </Button>
      <Tabs defaultTabId={props.defaultTabId} ref={ref}>
        <TabList>
          <Tab id="tab1">tab1</Tab>
          <Tab id="tab2">tab2</Tab>
          <Tab id="tab3" disabled>
            tab3
          </Tab>
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
    </div>
  );
};

export const BasicTabs = Template.bind({});
BasicTabs.args = {
  defaultTabId: "tab2",
};
