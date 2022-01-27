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
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const onTabChange = (activeTabIndex: number) => {
    console.log(`tab changed to ${activeTabIndex}`);
    setActiveTabIndex(activeTabIndex);
  };

  const [disabledFlags, setDisabledFlags] = useState({
    0: false,
    1: false,
    2: false,
  });

  function disableActiveTab() {
    console.log("disable active tab");

    setDisabledFlags({ ...disabledFlags, [activeTabIndex]: true });
  }
  function enableActiveTab() {
    console.log("enable active tabs");
    setDisabledFlags({ ...disabledFlags, [activeTabIndex]: false });
  }

  function disableAllTabs() {
    console.log("disable all tabs");
    setDisabledFlags({
      0: true,
      1: true,
      2: true,
    });
  }

  function enableAllTabs() {
    console.log("enable all tabs");

    setDisabledFlags({
      0: false,
      1: false,
      2: false,
    });
  }
  return (
    <div>
      <Button
        onClick={() => disableActiveTab()}
      >{`Disable ${activeTabIndex}`}</Button>
      <Button onClick={() => enableActiveTab()}>
        {`Enable ${activeTabIndex}`}
      </Button>
      <Button onClick={() => disableAllTabs()}>Disable All Tabs</Button>
      <Button onClick={() => enableAllTabs()}>Enable All Tabs</Button>
      <Tabs index={activeTabIndex} onTabChange={onTabChange}>
        <TabList>
          <Tab id="tab1" disabled={disabledFlags[0]}>
            tab1
          </Tab>
          <Tab id="tab2" disabled={disabledFlags[1]}>
            tab2
          </Tab>
          <Tab id="tab3" disabled={disabledFlags[2]}>
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
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const onTabChange = (activeTabIndex: number) => {
    console.log(`tab changed to ${activeTabIndex}`);
    setActiveTabIndex(activeTabIndex);
  };
  return (
    <div>
      <Tabs defaultIndex={1} onTabChange={onTabChange}>
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
      <p>0 based active Tab Index is {activeTabIndex}</p>
    </div>
  );
};

UncontrolledActiveTabStory.storyName = "Basic Tabs";
