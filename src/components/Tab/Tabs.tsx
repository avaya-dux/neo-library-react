import log from "loglevel";
import {
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  Fragment,
  CSSProperties,
} from "react";
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
  defaultIndex = 0,
  index,
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

  const isVertical = "variant" in rest ? rest.variant === "vertical" : false;
  const isScrollable = "scrollable" in rest ? rest.scrollable : false;
  logger.debug(`Is tab vertical? ${isVertical} scrollable? ${isScrollable}`);

  const [activeTabIndex, setUncontrolledActiveTabIndex] = useControlled({
    controlled: index,
    default: defaultIndex,
    name: "activeTabIndex",
  });

  const setActiveTabIndex = (newActiveTabIndex: any) => {
    setUncontrolledActiveTabIndex(newActiveTabIndex);
    onTabChange?.(newActiveTabIndex);
  };

  const [activePanelIndex, setActivePanelIndex] = useState(defaultIndex);

  const verticalStyle: CSSProperties = isVertical ? { display: "flex" } : {};
  const content = (
    <div
      className="neo-tabs"
      role="tablist"
      aria-owns={getAllTabIdsInString(tabs)}
      style={verticalStyle}
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
            activeTabIndex,
            setActiveTabIndex,
            setActivePanelIndex
          );
        })}
      </ul>
      {tabs.map((tabItem, index) => {
        return createPanel(index, tabItem, activePanelIndex);
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
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>
) => {
  const tabId = tabProps.id;
  const active = index === activeTabIndex;
  const { className, id, name, disabled, ...rest } = tabProps;
  logger.debug(`${tabId} disabled is ${tabProps.disabled}`);
  return (
    <li
      key={index}
      className={getTabItemClasses({
        active,
        disabled: tabProps.disabled,
        vertical: isVertical,
      })}
      {...rest}
    >
      <InternalTab
        {...tabProps}
        active={active}
        vertical={isVertical}
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        aria-disabled={disabled}
        disabled={disabled}
        setActiveTabIndex={setActiveTabIndex}
        setActivePanelIndex={setActivePanelIndex}
      />
    </li>
  );
};

export const createPanel = (
  key: number,
  tabProps: InternalTabProps,
  activePanelIndex: number
) => {
  const active = key === activePanelIndex;
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
  vertical = false,
}: {
  active: boolean;
  disabled: boolean;
  vertical: boolean;
}) => {
  const classes = ["neo-tabs__item"];
  if (active && disabled) {
    if (vertical) {
      classes.push("neo-tabs__item--vertical--active-disabled");
    } else {
      classes.push("neo-tabs__item--active-disabled");
    }
  } else if (active) {
    if (vertical) {
      classes.push("neo-tabs__item--vertical");
      classes.push("neo-tabs__item--vertical--active");
    } else {
      classes.push("neo-tabs__item--active");
    }
  } else if (disabled) {
    // same whether vertical or not for disabled and not active
    classes.push("neo-tabs__item--disabled");
  }
  return classes.join(" ");
};
