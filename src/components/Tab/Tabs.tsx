import log from "loglevel";
import { Dispatch, SetStateAction, useState, useMemo, Fragment } from "react";
import { genId } from "utils";
import useControlled from "utils/useControlled";
import { InternalTab } from "./InternalTab";
import {
  ClosableTabProps,
  InternalTabProps,
  TabListProps,
  TabPanelProps,
  TabPanelsProps,
  TabProps,
  TabsProps,
  VerticalTabsProps,
} from "./TabTypes";

const logger = log.getLogger("tabs-logger");
logger.disableAll();

export const Tabs = ({
  defaultTabId,
  controlled = false,
  children,
  onTabChange,
  ...rest
}: TabsProps | VerticalTabsProps) => {
  const tabs = useMemo(() => buildTabProps(children), [children]);

  if (logger.getLevel() < log.levels.INFO) {
    tabs.forEach((tab) => {
      logger.debug(`${tab.id} disabled= ${tab.disabled}`);
    });
  }

  const isVertical = "vertical" in rest;
  const isScrollable = "scrollable" in rest;
  logger.debug(`Is tab vertical? ${isVertical} scrollable? ${isScrollable}`);

  const [activeTabId, setUncontrolledActiveTabId] = useControlled({
    ...(controlled ? { controlled: defaultTabId } : {}),
    default: defaultTabId,
    name: "activeTabId",
  });

  const setActiveTabId = (newActiveTabId: any) => {
    setUncontrolledActiveTabId(newActiveTabId);
    onTabChange?.(newActiveTabId);
  };

  const [activePanelId, setActivePanelId] = useState(defaultTabId);

  const content = (
    <div
      className="neo-tabs"
      role="tablist"
      aria-owns={getAllTabIdsInString(tabs)}
      {...(isVertical
        ? {
            style: {
              display: "flex",
            },
          }
        : {})}
    >
      <ul
        className={
          isVertical ? "neo-tabs__nav neo-tabs__nav--vertical" : "neo-tabs__nav"
        }
      >
        {tabs.map((tab, index) => {
          logger.debug(`calling createTab with tabItem ${tab.disabled}`);
          return createTab(
            index,
            tab,
            tabs,
            isVertical,
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
  return isScrollable ? (
    <div className="neo-tabs--wrapper">{content}</div>
  ) : (
    <>{content}</>
  );
};
export function getAllTabIdsInString(tabProps: InternalTabProps[]): string {
  return tabProps.map((tab) => tab.id).join(" ");
}
export const TabList = (props: TabListProps) => {
  return <Fragment {...props} />;
};
export const Tab = (props: TabProps | ClosableTabProps) => {
  return <Fragment {...props} />;
};
export const TabPanels = (props: TabPanelsProps) => {
  return <Fragment {...props} />;
};
export const TabPanel = (props: TabPanelProps) => {
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
    const icon = "icon" in props ? props!.icon : undefined;
    return {
      ...rest,
      disabled,
      id: id || genId(),
      name: children,
      content: panel,
      ...(icon ? { icon } : {}),
    };
  });
};

export const createTab = (
  index: number,
  tabProps: InternalTabProps,
  tabs: InternalTabProps[],
  isVertical: boolean,
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
        vertical={isVertical}
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
  const { children, className, ...rest } = tabProps.content;
  return (
    <div key={key} className={getContentClasses(active, className)} {...rest}>
      {children}
    </div>
  );
};

export const getContentClasses = (active: boolean, className?: string) => {
  const classes = className ? [className] : [];
  classes.push(active ? "neo-tabs__container--active" : "neo-tabs__container");
  return classes.join(" ");
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
