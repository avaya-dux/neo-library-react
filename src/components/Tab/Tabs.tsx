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
} from "./TabTypes";

const logger = log.getLogger("tabs-logger");
logger.disableAll();

export const Tabs = ({
  defaultIndex = 0,
  index,
  children,
  onTabChange,
  orientation = "horizontal",
  ...rest
}: TabsProps) => {
  const tabs = useMemo(() => buildTabProps(children), [children]);

  if (logger.getLevel() < log.levels.INFO) {
    tabs.forEach((tab) => {
      logger.debug(`${tab.id} disabled= ${tab.disabled}`);
    });
  }

  const isVertical = orientation === "vertical";
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
      aria-orientation={orientation}
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
function isNotFragment(tab: { type: { toString: () => string } }) {
  return tab.type.toString() !== "Symbol(react.fragment)";
}
export const buildTabProps = (
  children: TabsProps["children"]
): InternalTabProps[] => {
  const tablist = children[0];
  const tabs = tablist.props.children.filter(isNotFragment);
  const panelList = children[1];
  const panels = panelList.props.children.filter(isNotFragment);
  return tabs.map((tab, index) => {
    const props = tab.props;
    let panel = panels[index].props as TabPanelProps;
    if (!panel.id) {
      panel = { ...panel, id: genId() };
    }
    const { id, children, ...rest } = props;
    const disabled = !!props!.disabled;
    logger.debug(`${id} disabled = ${disabled}`);
    const icon = "icon" in props ? props!.icon : undefined;
    const closable = "closable" in props ? props!.closable : false;
    const onClose = "onClose" in props ? props!.onClose : undefined;
    return {
      ...rest,
      disabled,
      closable: closable,
      onClose,
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
  const { className, id, name, disabled, closable, dir, onClose, ...rest } =
    tabProps;
  logger.debug(`${tabId} disabled is ${tabProps.disabled}`);
  return (
    <li
      key={index}
      className={getTabItemClasses({
        active,
        disabled: tabProps.disabled,
        vertical: isVertical,
      })}
      dir={closable ? "ltr" : dir}
      {...rest}
    >
      <InternalTab
        {...tabProps}
        tabIndex={index}
        closable={closable}
        onClose={onClose}
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
  const { id, children, className, ...rest } = tabProps.content;
  return (
    <div
      id={id}
      aria-labelledby={tabProps.id}
      role="tabpanel"
      key={key}
      className={getContentClasses(active, className)}
      {...rest}
    >
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
