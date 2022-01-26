import { Meta } from "@storybook/react/types-6-0";
import { Button } from "components";
import { useState } from "react";
import { tabMouseEventHandlerLogger } from "./EventHandlers";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "./Tabs";
import { TabsProps } from "./TabTypes";

tabMouseEventHandlerLogger.enableAll();

export default {
  title: "Components/Tab",
  component: Tab,
} as Meta<TabsProps>;

export const ControlledActiveTabStory = () => {
  const [activeTabId, setActiveTabId] = useState("tab2");
  const onTabChange = (activeTabId: string) => {
    console.log(`tab changed to ${activeTabId}`);
    setActiveTabId(activeTabId);
  };

  const [disabledFlags, setDisabledFlags] = useState({
    tab1: false,
    tab2: false,
    tab3: false,
  });

  function disableActiveTab() {
    console.log("disable active tab");

    setDisabledFlags({ ...disabledFlags, [activeTabId]: true });
  }
  function enableActiveTab() {
    console.log("enable active tabs");
    setDisabledFlags({ ...disabledFlags, [activeTabId]: false });
  }

  function disableAllTabs() {
    console.log("disable all tabs");
    setDisabledFlags({
      tab1: true,
      tab2: true,
      tab3: true,
    });
  }

  function enableAllTabs() {
    console.log("enable all tabs");

    setDisabledFlags({
      tab1: false,
      tab2: false,
      tab3: false,
    });
  }
  return (
    <div>
      <Button
        onClick={() => disableActiveTab()}
      >{`Disable ${activeTabId}`}</Button>
      <Button onClick={() => enableActiveTab()}>
        {`Enable ${activeTabId}`}
      </Button>
      <Button onClick={() => disableAllTabs()}>Disable All Tabs</Button>
      <Button onClick={() => enableAllTabs()}>Enable All Tabs</Button>
      <Tabs
        defaultTabId={activeTabId}
        controlled={true}
        onTabChange={onTabChange}
      >
        <TabList>
          <Tab id="tab1" disabled={disabledFlags.tab1}>
            tab1
          </Tab>
          <Tab id="tab2" disabled={disabledFlags.tab2}>
            tab2
          </Tab>
          <Tab id="tab3" disabled={disabledFlags.tab3}>
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
ControlledActiveTabStory.storyName = "Disable|Enable Tabs";
export const UncontrolledActiveTabStory = () => {
  const [activeTabId, setActiveTabId] = useState("tab2");
  const onTabChange = (newActiveTabId: string) => {
    console.log(`tab changed to ${activeTabId}`);
    setActiveTabId(newActiveTabId);
  };
  return (
    <div>
      <Tabs defaultTabId="tab2" onTabChange={onTabChange}>
        <TabList>
          <Tab id="tab1" disabled>
            tab1
          </Tab>
          <Tab id="tab2">tab2</Tab>
          <Tab id="tab3">tab3</Tab>
          <Tab id="tab4" disabled>
            tab4
          </Tab>
          <Tab id="tab5">tab5</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h2>content1</h2>
            <p>paragraph 1</p>
          </TabPanel>
          <TabPanel>content 2</TabPanel>
          <TabPanel>content 3</TabPanel>
          <TabPanel>content 4</TabPanel>
          <TabPanel>content 5</TabPanel>
        </TabPanels>
      </Tabs>
      <hr></hr>
      <p>Active Tab is {activeTabId}</p>
    </div>
  );
};

UncontrolledActiveTabStory.storyName = "Basic Tabs";
