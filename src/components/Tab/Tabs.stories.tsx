import { Meta, Story } from "@storybook/react/types-6-0";
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

export const ControlledActiveTabProp = () => {
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
const Template: Story<{ defaultTabId: string }> = ({ defaultTabId }) => {
  const [activeTabId, setActiveTabId] = useState(defaultTabId);
  const onTabChange = (newActiveTabId: string) => {
    console.log(`tab changed to ${activeTabId}`);
    setActiveTabId(newActiveTabId);
  };
  return (
    <div>
      <Tabs defaultTabId={defaultTabId} onTabChange={onTabChange}>
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
export const UncontrolledActiveTabProp = Template.bind({});
UncontrolledActiveTabProp.storyName = "UncontrolledActiveTabProp";
UncontrolledActiveTabProp.args = {
  defaultTabId: "tab2",
};

const IconTabsTemplate: Story<{
  vertical: boolean;
  scrollable: boolean;
}> = ({ vertical, scrollable }) => {
  const [activeTabId, setActiveTabId] = useState("tab2");
  const onTabChange = (newActiveTabId: string) => {
    console.log(`tab changed to ${activeTabId}`);
    setActiveTabId(newActiveTabId);
  };
  return (
    <div>
      <Tabs
        defaultTabId="tab2"
        scrollable={scrollable}
        onTabChange={onTabChange}
        {...(vertical ? { vertical } : {})}
      >
        <TabList>
          <Tab id="tab1" icon="settings">
            tab1
          </Tab>
          <Tab id="tab2" icon="chat" dir="rtl">
            tab2
          </Tab>
          <Tab id="tab3" icon="info">
            tab3
          </Tab>
          <Tab id="tab4" disabled icon="agents">
            tab4
          </Tab>
          <Tab id="tab5" icon="email" dir="rtl">
            tab5
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <h2>content1</h2>
            <p>paragraph 1</p>
          </TabPanel>
          <TabPanel>
            content 2
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe aut
              harum quae aliquid laboriosam reiciendis sit tenetur, minima
              itaque quos deserunt eos fuga voluptatibus, qui expedita maiores
              porro inventore odio.
            </p>
          </TabPanel>
          <TabPanel>content 3</TabPanel>
          <TabPanel>
            content 4
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic,
              necessitatibus.
            </p>
          </TabPanel>
          <TabPanel>
            content 5
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil hic
              quod consequatur eum commodi dolorum, molestiae odio cumque
              cupiditate! Impedit illo sint iusto recusandae rem optio
              reprehenderit ipsum ab aut.
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <hr></hr>
      <p>Active Tab is {activeTabId}</p>
    </div>
  );
};

export const IconTabs = IconTabsTemplate.bind({});
IconTabs.storyName = "IconTabs";
IconTabs.args = {
  vertical: false,
  scrollable: false,
};
export const VerticalTabs = IconTabsTemplate.bind({});
VerticalTabs.storyName = "VerticalTabs";
VerticalTabs.args = {
  vertical: true,
  scrollable: false,
};
export const ScrollableVerticalTabs = () => {
  const [activeTabId, setActiveTabId] = useState("tab2");
  const onTabChange = (newActiveTabId: string) => {
    console.log(`tab changed to ${activeTabId}`);
    setActiveTabId(newActiveTabId);
  };
  return (
    <div style={{ height: "200px" }}>
      <Tabs
        defaultTabId="tab2"
        scrollable={true}
        onTabChange={onTabChange}
        vertical
      >
        <TabList>
          <Tab id="tab1" icon="settings">
            tab1
          </Tab>
          <Tab id="tab2" icon="chat" dir="rtl">
            tab2
          </Tab>
          <Tab id="tab3" icon="info">
            tab3
          </Tab>
          <Tab id="tab4" disabled icon="agents">
            tab4
          </Tab>
          <Tab id="tab5" icon="email" dir="rtl">
            tab5
          </Tab>
          <Tab id="tab6">tab6</Tab>
          <Tab id="tab7">tab7</Tab>
          <Tab id="tab8">tab8</Tab>
          <Tab id="tab9">tab9</Tab>
          <Tab id="tab10">tab10</Tab>
          <Tab id="tab11">tab11</Tab>
          <Tab id="tab12">tab12</Tab>
          <Tab id="tab13">tab13</Tab>
          <Tab id="tab14">tab14</Tab>
          <Tab id="tab15">tab15***</Tab>
          <Tab id="tab16">tab16*</Tab>
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
          <TabPanel>content 6</TabPanel>
          <TabPanel>content 7</TabPanel>
          <TabPanel>content 8</TabPanel>
          <TabPanel>content 9</TabPanel>
          <TabPanel>content 10</TabPanel>
          <TabPanel>content 11</TabPanel>
          <TabPanel>content 12</TabPanel>
          <TabPanel>content 13</TabPanel>
          <TabPanel>content 14</TabPanel>
          <TabPanel>
            content 15
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
              eveniet, eius aut consequatur accusantium quam sapiente, non
              eligendi aspernatur eaque odio quibusdam beatae! Fuga obcaecati
              dolores dignissimos excepturi facilis incidunt. Temporibus aperiam
              fugiat dolore modi recusandae dolor aliquam beatae expedita? Aut
              consequuntur, veritatis nostrum architecto minus placeat ipsum
              soluta ex officiis sint reiciendis quae, ducimus adipisci tenetur
              a vero cumque error quas ullam magni, et tempora sequi eveniet?
              Doloribus tempore, non eligendi deserunt deleniti modi mollitia
              aliquam veniam hic, laudantium rem eum. Quasi ipsum, accusamus
              explicabo ad molestias unde fugiat totam modi dicta vel veritatis,
              assumenda cupiditate consequuntur repudiandae, natus recusandae
              exercitationem tenetur inventore rerum adipisci vero? Molestias
              culpa perspiciatis, in suscipit omnis quod totam ipsum a impedit
              reiciendis voluptatem minus animi soluta, nihil sunt. Non ea
              repellendus aperiam, suscipit esse rerum maiores deserunt voluptas
              veritatis architecto ipsa tempora minima odio quae quis quibusdam
              iste. Neque excepturi fuga delectus ea ad? Magni ex quos eum
              consequuntur aut dolorem sed cupiditate, voluptate aperiam soluta
              non a perspiciatis maiores debitis asperiores inventore ullam
              doloremque? Nostrum fugit autem quod dolorum, eligendi voluptas
              amet necessitatibus cumque odio nisi soluta magni beatae libero
              natus nobis quo iure dicta nam alias velit rerum! Repudiandae
              vitae ipsa neque. Minus cumque blanditiis labore ipsa dicta
              quisquam deleniti corrupti non! Maxime numquam est nisi quis
              soluta similique voluptatum tempora hic vitae, quam consequuntur.
              A quaerat, porro ab officia totam quod quis deleniti unde veniam
              fugit iusto. Soluta voluptate quae delectus voluptates. Excepturi
              distinctio ad architecto harum autem molestiae illum qui cum
              quidem eum fuga magni totam repellendus molestias deserunt
              dignissimos maiores deleniti sequi assumenda, vel rem
              exercitationem a illo labore. Commodi, ipsa, eos ipsum deserunt
              aliquam blanditiis delectus recusandae placeat neque accusamus,
              sequi doloremque nihil incidunt aperiam accusantium nemo. Dolor
              aliquid aspernatur tenetur similique accusantium ut corrupti
              architecto sapiente! Quidem possimus alias et commodi nostrum
              fugiat porro eius illo fugit voluptates officia, nesciunt quod sed
              odio, excepturi facere neque amet doloremque quaerat odit, ea
              eaque dignissimos. Hic deserunt perferendis autem asperiores
              consequatur, consequuntur perspiciatis sunt itaque quia eaque,
              aspernatur placeat pariatur vero minima impedit neque ducimus.
              Temporibus, sint repellat. Quis, hic magnam! Natus voluptatum et,
              temporibus officia in animi doloribus? Debitis illo maiores esse
              vero dolorem animi temporibus consequatur quis provident
              architecto harum ut, dignissimos libero tempora voluptatem rerum
              nihil? Dolor, a ipsum perspiciatis architecto maxime, fugiat omnis
              odit est, quibusdam beatae excepturi illum blanditiis in repellat
              hic non sint voluptates corrupti eveniet aperiam deserunt
              reprehenderit sunt. Ad cum illo et corporis eum tempora error quo
              unde itaque cupiditate. Qui veniam voluptate facilis est itaque
              accusantium voluptatibus, vel nobis dolor, iusto autem aut in a
              laborum aspernatur molestiae, fuga maxime repudiandae quidem!
              Laboriosam, reiciendis. Facilis officiis quis velit, consectetur
              nemo dignissimos. Possimus praesentium ab cumque harum, repellat,
              at minus obcaecati, necessitatibus quod quaerat mollitia aliquid
              id illum saepe nihil aperiam rerum. Autem laudantium modi error
              itaque sit possimus, ipsa eligendi! Omnis, error porro. Iure
              dolor, possimus nisi velit harum fugiat cupiditate omnis, minus
              quasi quae odio impedit porro ad!
            </p>
          </TabPanel>
          <TabPanel>
            content 16
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis vero minima nihil impedit deleniti consequuntur
              assumenda repudiandae voluptas eveniet. Sunt expedita sint ratione
              rem a mollitia molestiae aliquid cupiditate harum!
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <hr></hr>
      <p>Active Tab is {activeTabId}</p>
    </div>
  );
};
