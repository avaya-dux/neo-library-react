import log from "loglevel";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { isAriaDisabled } from "utils";
import { InternalTabProps } from "../TabTypes";
import { activateAnotherTabAndPanel } from "./Helper";

const logger = log.getLogger("tab-mouse-event-handler");
logger.disableAll();

export { logger as tabMouseEventHandlerLogger };
export const handleMouseClickEvent = (
  e: MouseEvent,
  tabs: InternalTabProps[],
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>
) => {
  e.stopPropagation();
  logger.debug("hanlding mouse click event on tab");
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  const disabled = isAriaDisabled(target);
  logger.debug(
    `mouse event target id = ${id} and disabled = ${disabled} and ${
      id && !disabled
    }`
  );
  if (id && !disabled) {
    logger.debug(`set ${id} to active`);
    const index = tabs.findIndex((tab) => tab.id === id);
    setActiveTabIndex(index);
    setActivePanelIndex(index);
  }
  e.preventDefault();
};

export const handleCloseElementMouseClickEvent = (
  e: MouseEvent,
  tabs: InternalTabProps[],
  tabIndex: number,
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>
) => {
  e.stopPropagation();
  logger.debug("hanlding mouse click event on tab close element");
  if (tabIndex > activeTabIndex) {
    logger.debug(`do nothing`);
  } else if (tabIndex < activeTabIndex) {
    const newActiveIndex = activeTabIndex - 1;
    setActiveTabIndex(newActiveIndex);
    setActivePanelIndex(newActiveIndex);
  } else {
    e.preventDefault();
    activateAnotherTabAndPanel(
      tabs,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex
    );
  }
  e.preventDefault();
};
