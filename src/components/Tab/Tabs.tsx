import log from "loglevel";
import {
  Dispatch,
  forwardRef,
  SetStateAction,
  useImperativeHandle,
  useState,
  FC,
  Fragment,
  useEffect,
} from "react";
import { genId } from "utils";
import { InternalTab } from "./InternalTab";
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

const logger = log.getLogger("tabs-logger");
logger.disableAll();

export const Tabs = forwardRef(
  (
    {
      defaultTabId,
      children,
      onTabChange,
      ...rest
    }: TabsProps | VerticalTabsProps,
    ref: React.Ref<TabsInterface>
  ) => {
    const tabItems = buildTabProps(children);
    tabItems.forEach((tab) => {
      logger.debug(`${tab.id} disabled= ${tab.disabled}`);
    });
    const isVertical = "isVertical" in rest;
    logger.debug(`Is tab vertical? ${isVertical}`);

    function disableActiveTab() {
      logger.debug(`disable active tab ${activeTabId}`);
      const updated = tabs.map((t) => {
        if (t.id === activeTabId) {
          return { ...t, disabled: true };
        }
        return { ...t };
      });
      setTabs(updated);
    }

    function enableActiveTab() {
      logger.debug(`enable active tab ${activeTabId}`);
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

    useEffect(() => {
      setTabs(tabItems);
    }, [tabItems]);

    useImperativeHandle(ref, () => ({
      disableActiveTab,
      enableActiveTab,
      disableAllTabs,
      enableAllTabs,
      activeTabId,
    }));

    useEffect(() => {
      if (onTabChange) {
        onTabChange(activeTabId);
      }
    }, [onTabChange, activeTabId]);

    return (
      <div
        className="neo-tabs"
        role="tablist"
        aria-owns={getAllTabIdsInString(tabs)}
      >
        <ul className="neo-tabs__nav">
          {tabs.map((tab, index) => {
            logger.debug(`calling createTab with tabItem ${tab.disabled}`);
            return createTab(
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
          return createPanel(index, tabItem, activePanelId);
        })}
      </div>
    );
  }
);
export function getAllTabIdsInString(tabProps: InternalTabProps[]): string {
  return tabProps.map((tab) => tab.id).join(" ");
}
export const TabList: FC<TabListProps> = (props) => {
  return <Fragment {...props} />;
};
export const Tab: FC<TabProps> = (props) => {
  return <Fragment {...props} />;
};
export const TabPanels: FC<TabPanelsProps> = (props) => {
  return <Fragment {...props} />;
};
export const TabPanel: FC<TabPanelProps> = (props) => {
  return <Fragment {...props} />;
};

export const buildTabProps = (
  children: TabsProps["children"]
): InternalTabProps[] => {
  const tablist = children[0];
  const tabs = tablist.props.children;
  const panelList = children[1];
  const panels = panelList.props.children;
  return tabs.map((tab, index) => {
    const props = tab.props;
    const panel = panels[index].props as TabPanelProps;
    const { id, children, ...rest } = props;
    const disabled = !!props?.disabled;
    logger.debug(`${id} disabled = ${disabled}`);
    return {
      ...rest,
      disabled,
      id: id || genId(),
      name: children.toString(),
      content: panel.children,
    };
  });
};

export const createTab = (
  index: number,
  tabProps: InternalTabProps,
  tabs: InternalTabProps[],
  activeTabId: string,
  setActiveTabId: Dispatch<SetStateAction<string>>,
  setActivePanelTabId: Dispatch<SetStateAction<string>>
) => {
  const tabId = tabProps.id;
  const active = tabId === activeTabId;
  const { className, id, name, disabled, ...rest } = tabProps;
  logger.debug(`${tabId} disabled is ${tabProps.disabled}`);
  return (
    <li
      key={index}
      className={getTabItemClasses({ ...tabProps, active: active })}
      {...rest}
    >
      <InternalTab
        {...tabProps}
        active={active}
        tabs={tabs}
        activeTabId={activeTabId}
        aria-disabled={disabled}
        disabled={disabled}
        setActiveTabId={setActiveTabId}
        setActivePanelId={setActivePanelTabId}
      />
    </li>
  );
};

export const createPanel = (
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

export const getTabItemClasses = ({
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
