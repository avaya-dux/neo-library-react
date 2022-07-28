import log from "loglevel";
import { Dispatch, ReactElement, RefObject, SetStateAction } from "react";
import { genId } from "utils";
import { InternalTab } from "./InternalTab";
import { InternalTabProps } from "./InternalTabTypes";
import { ClosableTab, Tab, TabLink, TabPanel } from "./TabComponents";
import { TabListProps, TabsProps } from "./TabTypes";

const logger = log.getLogger("tab-utils-logger");
logger.disableAll();

export function debugTabs(
  logger: any,
  tabs: { id: string; disabled: boolean }[]
) {
  if (logger.getLevel() < log.levels.INFO) {
    tabs.forEach((tab) => {
      logger.debug(`${tab.id} disabled= ${tab.disabled}`);
    });
  }
}
export function getAllTabIdsInString(tabProps: InternalTabProps[]): string {
  return tabProps.map((tab) => tab.id).join(" ");
}

export function isValidPanelElement(element: ReactElement) {
  return element.type === TabPanel;
}
export function isValidTabElement(element: ReactElement) {
  logger.debug(element.type as string, ClosableTab as unknown as string);
  logger.debug(element.type.toString());

  // Comparing functions by reference here: should be fast.
  return (
    isClosableTab(element) || element.type === Tab || element.type === TabLink
  );
}
export function isClosableTab(element: ReactElement) {
  return element.type === ClosableTab;
}
function toArray(children: ReactElement[]) {
  return Array.isArray(children) ? children : [children];
}
export const buildTabProps = (
  children: TabsProps["children"]
): InternalTabProps[] => {
  const panelList = children[1];
  const panels = toArray(panelList.props.children).filter(isValidPanelElement);

  const tablist = children[0];
  const tabs = toArray(tablist.props.children)
    .filter(isValidTabElement)
    .map((tab) => {
      if (tab.props?.href) {
        return buildSingleTabPropsWithNoPanel(tab);
      }

      return buildSingleTabPropsHasAssociatedPanel(tab, panels.shift());
    });

  return tabs;
};

export const buildTabPropsNoPanel = (
  children: TabsProps["children"]
): InternalTabProps[] => {
  const tablist = children as ReactElement<TabListProps>;
  const tabs = toArray(tablist.props.children)
    .filter(isValidTabElement)
    .map(buildSingleTabPropsWithNoPanel);

  return tabs;
};

const buildSingleTabPropsWithNoPanel = (tab: any): InternalTabProps => {
  const props = tab.props;
  const { id, children, ...rest } = props;
  const disabled = !!props!.disabled;
  logger.debug(`${id} disabled = ${disabled}`);
  const icon = "icon" in props ? props!.icon : undefined;
  const closable = isClosableTab(tab);
  const onClose = "onClose" in props ? props!.onClose : undefined;

  return {
    ...rest,
    disabled,
    closable,
    onClose,
    id: id || genId(),
    name: children,
    ...(icon ? { icon } : {}),
  };
};

const buildSingleTabPropsHasAssociatedPanel = (
  tab: any,
  panel: any
): InternalTabProps => {
  const props = tab.props;
  const { id, children, ...rest } = props;
  const disabled = !!props!.disabled;
  logger.debug(`${id} disabled = ${disabled}`);
  const icon = "icon" in props ? props!.icon : undefined;
  const closable = isClosableTab(tab);
  const onClose = "onClose" in props ? props!.onClose : undefined;

  const content = {
    ...panel.props,
    id: panel.props?.id || genId(),
  };

  return {
    ...rest,
    disabled,
    closable,
    onClose,
    id: id || genId(),
    name: children,
    content,
    ...(icon ? { icon } : {}),
  };
};

export const createTab = (
  ref: RefObject<HTMLLIElement>,
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
      ref={ref}
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
  active,
  disabled,
  vertical,
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
