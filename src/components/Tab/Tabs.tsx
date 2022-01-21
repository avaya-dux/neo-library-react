import log from "loglevel";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
  FC,
} from "react";
import { genId } from "utils";
import { TabHead } from "./TabHead";
import {
  InternalTabProps,
  TabsInterface,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabProps,
  TabsProps,
  VerticalTabsProps,
} from "./TabTypes";

const logger = log.getLogger("tab");
logger.disableAll();

export const Tabs = forwardRef(
  (
    { defaultTabId, children, ...rest }: TabsProps | VerticalTabsProps,
    ref: React.Ref<TabsInterface>
  ) => {
    const tabItems = buildTabProps(defaultTabId, children);
    function disableActiveTab() {
      log.debug(`active tab ${activeTabId} disabled`);
      const updated = tabs.map((t) => {
        if (t.id === activeTabId) {
          return { ...t, disabled: true };
        }
        return { ...t };
      });
      setTabs(updated);
    }

    function enableActiveTab() {
      log.debug(`active tab ${activeTabId} enabled`);
      const updated = tabs.map((t) => {
        if (t.id === activeTabId) {
          return { ...t, disabled: false };
        }
        return { ...t };
      });
      setTabs(updated);
    }

    function disableAllTabs() {
      const updated = tabs.map((t) => {
        return { ...t, disabled: true };
      });
      setTabs(updated);
    }

    function enableAllTabs() {
      const updated = tabs.map((t) => {
        return { ...t, disabled: false };
      });
      setTabs(updated);
    }

    const [tabs, setTabs] = useState(tabItems);
    const [activeTabId, setActiveTabId] = useState(defaultTabId);
    const [activePanelId, setActivePanelId] = useState(defaultTabId);

    useImperativeHandle(ref, () => ({
      disableActiveTab,
      enableActiveTab,
      disableAllTabs,
      enableAllTabs,
      activeTabId,
    }));

    return (
      <div
        className="neo-tabs"
        role="tablist"
        aria-owns={getAllTabIdsInString(tabs)}
      >
        <ul className="neo-tabs__nav">
          {tabs.map((tab, index) => {
            return createHead(
              index,
              tab,
              tabs,
              activeTabId,
              setActiveTabId,
              setActivePanelId
            );
          })}
        </ul>
        {tabs.map((tabItem, index) => {
          return createContent(index, tabItem, activePanelId);
        })}
      </div>
    );
  }
);
export function getAllTabIdsInString(tabProps: InternalTabProps[]): string {
  return tabProps.map((tab) => tab.id).join(" ");
}
export const TabList: FC<TabListProps> = ({ children, ...rest }) => {
  return <>{children}</>;
};
export const Tab: FC<TabProps> = ({ children, ...rest }) => {
  return <>{children}</>;
};
export const TabPanels: FC<TabPanelsProps> = ({ children, ...rest }) => {
  return <>{children}</>;
};
export const TabPanel: FC<TabPanelProps> = ({ children, ...rest }) => {
  return <>{children}</>;
};

export const buildTabProps = (
  defaultTabId: string,
  children: TabsProps["children"]
): InternalTabProps[] => {
  const tablist = children[0];
  const tabs = tablist.props.children;
  const panelList = children[1];
  const panels = panelList.props.children;
  return tabs.map((tab, index) => {
    const props = tab.props;
    const panel = panels[index].props as TabPanelProps;
    return {
      id: props.id || genId(),
      name: props.children.toString(),
      disabled: false,
      content: panel.children,
    };
  });
};

export const createHead = (
  index: number,
  tabProps: InternalTabProps,
  tabs: InternalTabProps[],
  activeTabId: string,
  setActiveTabId: Dispatch<SetStateAction<string>>,
  setActivePanelTabId: Dispatch<SetStateAction<string>>
) => {
  const tabId = tabProps.id;
  const active = tabId === activeTabId;
  return (
    <li key={index} className={getHeadClasses({ ...tabProps, active: active })}>
      <TabHead
        {...tabProps}
        active={active}
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        setActivePanelId={setActivePanelTabId}
      />
    </li>
  );
};

export const createContent = (
  key: number,
  tabProps: InternalTabProps,
  activePanelId: string
) => {
  const active = tabProps.id === activePanelId;
  return (
    <div key={key} className={getContentClasses(active)}>
      {tabProps.content}
    </div>
  );
};

export const getContentClasses = (active: boolean) => {
  return active ? "neo-tabs__container--active" : "neo-tabs__container";
};

export const getHeadClasses = ({
  active = false,
  disabled = false,
}: InternalTabProps & { active: boolean }) => {
  const classes = ["neo-tabs__item"];
  if (active && disabled) {
    classes.push("neo-tabs__item--active-disabled");
  } else if (active) {
    classes.push("neo-tabs__item--active");
  } else if (disabled) {
    classes.push("neo-tabs__item--disabled");
  }
  return classes.join(" ");
};
