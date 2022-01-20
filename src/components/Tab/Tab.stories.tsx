import { Meta, Story } from "@storybook/react/types-6-0";
import { Button } from "components";
import { createRef } from "react";

import { Tab } from "./Tab";
import { TabListProps, TabItemProps, TabInterface } from "./TabTypes";

export default {
  title: "Components/Tab",
  component: Tab,
} as Meta<TabListProps>;

const Template: Story<TabListProps> = (props: TabListProps) => {
  const ref = createRef<TabInterface>();

  return (
    <div>
      <Button onClick={() => ref.current?.disableActiveTab()}>
        Disable Tabs
      </Button>
      <Button onClick={() => ref.current?.enableActiveTab()}>
        Enable Tabs
      </Button>
      <Tab {...props} ref={ref} />
    </div>
  );
};
const tabItems: TabItemProps[] = [
  { id: "tab1", name: "tab1", content: <p>tab1 content</p> },
  { id: "tab2", name: "tab2", content: <p>tab2 content</p> },
  { id: "tab3", name: "tab3", content: <p>tab3 content</p> },
];
export const BasicTab = Template.bind({});
BasicTab.args = {
  tabItems: tabItems,
  selectedTabItemId: "tab2",
};
