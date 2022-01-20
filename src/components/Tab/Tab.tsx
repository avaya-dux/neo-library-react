import log from "loglevel";

import { TabInterface, TabProps, TabListProps } from "./TabTypes";
import { useState, forwardRef, useImperativeHandle } from "react";

const logger = log.getLogger("tab");
logger.disableAll();

export const createHead = (tabProps: TabProps, activeTabId: string) => {
  const tabId = tabProps.id;
  const active = tabId === activeTabId;
  return (
    <li className={getHeadClasses({ ...tabProps, active: active })}>
      <a
        id={tabId}
        role="tab"
        aria-selected={active}
        tabIndex={0}
        href="#fixme"
      >
        {tabProps.name}
      </a>
    </li>
  );
};

export const createContent = (tabProps: TabProps, activeTabId: string) => {
  const active = tabProps.id === activeTabId;
  return <div className={getContentClasses(active)}>{tabProps.content}</div>;
};

export const getContentClasses = (active: boolean) => {
  return active ? "neo-tabs__container--active" : "neo-tabs__container";
};

export const getHeadClasses = ({
  active = false,
  disabled = false,
}: TabProps & { active: boolean }) => {
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
export const Tab = forwardRef(
  (
    { activeTabId: initActiveTabId, tabItems }: TabListProps,
    ref: React.Ref<TabInterface>
  ) => {
    function disableActiveTab() {
      log.debug(`active tab ${initActiveTabId} disabled`);
      const updated = tabs.map((t) => {
        if (t.id === initActiveTabId) {
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

    const [tabs, setTabs] = useState(tabItems);
    const [activeTabId, setActiveTabId] = useState(initActiveTabId);

    useImperativeHandle(ref, () => ({
      disableActiveTab,
      enableActiveTab,
      activeTabId,
    }));

    return (
      <div
        className="neo-tabs"
        role="tablist"
        aria-owns={getAllTabIdsInString(tabs)}
      >
        <ul className="neo-tabs__nav">
          {tabs.map((tabItem) => {
            return createHead(tabItem, activeTabId);
          })}
        </ul>
        {tabs.map((tabItem) => {
          return createContent(tabItem, activeTabId);
        })}
      </div>
    );
  }
);
export function getAllTabIdsInString(tabProps: TabProps[]): string {
  return tabProps.map((tab) => tab.id).join(" ");
}
