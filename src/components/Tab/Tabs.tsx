import log from "loglevel";
import {
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  Fragment,
  CSSProperties,
  useRef,
  createRef,
  MouseEvent,
  RefObject,
  MouseEventHandler,
  useLayoutEffect,
} from "react";
import { genId } from "utils";
import useControlled from "utils/useControlled";
import {
  handleLeftCarouselMouseClickEvent,
  handleRightCarouselMouseClickEvent,
} from "./EventHandlers";
import { enableLeftButton, enableRightButton } from "./EventHandlers/Helper";
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
logger.enableAll();

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
  const hasCarousel = "hasCarousel" in rest ? rest.hasCarousel : false;
  const dropDown =
    hasCarousel && "carouselDropdown" in rest ? rest.carouselDropdown : null;
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
  const refs: RefObject<HTMLLIElement>[] = [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [clickId, setClickId] = useState("");
  const carouselLeftButtonClickEventHandler: MouseEventHandler = (
    e: MouseEvent
  ) => {
    logger.debug(`generating click id...`);
    setClickId(genId());
    return handleLeftCarouselMouseClickEvent(
      e,
      scrollRef,
      refs,
      setLeftCarouselButtonEnabled
    );
  };
  const carouselRightButtonClickEventHandler: MouseEventHandler = (
    e: MouseEvent
  ) => {
    logger.debug(`generating click id...`);
    setClickId(genId());
    return handleRightCarouselMouseClickEvent(
      e,
      scrollRef,
      refs,
      setRightCarouselButtonEnabled
    );
  };
  const tabsNav = (
    <ul
      className={
        isVertical ? "neo-tabs__nav neo-tabs__nav--vertical" : "neo-tabs__nav"
      }
    >
      {tabs.map((tab, index) => {
        logger.debug(`calling createTab with tabItem ${tab.disabled}`);
        const ref = createRef<HTMLLIElement>();
        refs.push(ref);
        return createTab(
          ref,
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
  );
  const [leftCarouselButtonEnabled, setLeftCarouselButtonEnabled] =
    useState(false);
  const [rightCarouselButtonEnabled, setRightCarouselButtonEnabled] =
    useState(false);

  useLayoutEffect(() => {
    logger.debug(
      `useLayoutEffect: update carousel buttons disabled state on clickId= ${clickId}`
    );
    setLeftCarouselButtonEnabled(enableLeftButton(scrollRef, refs));
    setRightCarouselButtonEnabled(enableRightButton(scrollRef, refs));
  }, [clickId, activeTabIndex]);

  useLayoutEffect(() => {
    const updateCarouselButtonStatus = () => {
      logger.debug(
        `updateCarouselButtonStatus: update carousel buttons disabled status on window resize`
      );
      setLeftCarouselButtonEnabled(enableLeftButton(scrollRef, refs));
      setRightCarouselButtonEnabled(enableRightButton(scrollRef, refs));
    };

    window.addEventListener("resize", updateCarouselButtonStatus);
    updateCarouselButtonStatus();
    return () =>
      window.removeEventListener("resize", updateCarouselButtonStatus);
  }, [scrollRef]);

  const tabsCarousel = (
    <div
      className={hasCarousel ? "neo-tabs__carousel" : "neo-tabs"}
      role="tablist"
      aria-owns={getAllTabIdsInString(tabs)}
      aria-orientation={orientation}
    >
      {hasCarousel ? (
        <>
          <button
            className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--default neo-icon-chevron-left neo-tabs__carousel--button"
            aria-label="move to previous tab"
            disabled={!leftCarouselButtonEnabled}
            onClick={carouselLeftButtonClickEventHandler}
          ></button>
          <div className="neo-tabs__carousel--scroll" ref={scrollRef}>
            {tabsNav}
          </div>
          <button
            className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--default neo-icon-chevron-right neo-tabs__carousel--button"
            aria-label="move to next tab"
            disabled={!rightCarouselButtonEnabled}
            onClick={carouselRightButtonClickEventHandler}
          ></button>
          <div className="neo-tabs__carousel--more">{dropDown}</div>
        </>
      ) : (
        <>{tabsNav}</>
      )}
    </div>
  );
  const panels = (
    <>
      {tabs.map((tabItem, index) => {
        return createPanel(index, tabItem, activePanelIndex);
      })}
    </>
  );
  const content = (
    <div style={verticalStyle}>
      {tabsCarousel}
      {panels}
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
export const Tab = (props: TabProps) => {
  return <Fragment {...props} />;
};
export const ClosableTab = (props: ClosableTabProps) => {
  return <Fragment {...props} />;
};
export const TabPanels = (props: TabPanelsProps) => {
  return <Fragment {...props} />;
};
export const TabPanel = (props: TabPanelProps) => {
  return <Fragment {...props} />;
};
export function isValidPanelElement(element: {
  type: { toString: () => string };
}) {
  return element.type.toString() === TabPanel.toString();
}
export function isValidTabElement(element: {
  type: { toString: () => string };
}) {
  return (
    element.type.toString() === ClosableTab.toString() ||
    element.type.toString() === Tab.toString()
  );
}
export const buildTabProps = (
  children: TabsProps["children"]
): InternalTabProps[] => {
  const tablist = children[0];
  const tabs = tablist.props.children.filter(isValidTabElement);
  const panelList = children[1];
  const panels = panelList.props.children.filter(isValidPanelElement);
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
    const closable = tab.type.toString() === ClosableTab.toString();
    const onClose = "onClose" in props ? props!.onClose : undefined;
    return {
      ...rest,
      disabled,
      closable,
      onClose,
      id: id || genId(),
      name: children,
      content: panel,
      ...(icon ? { icon } : {}),
    };
  });
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
