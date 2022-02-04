import log from "loglevel";
import { Dispatch, SetStateAction } from "react";
import { InternalTabProps } from "../TabTypes";

const logger = log.getLogger("tab-event-handler-helper");
logger.disableAll();

export function getNextTabIndex(
  tabs: InternalTabProps[],
  activeTabIndex: number
) {
  let nextIndex = activeTabIndex + 1;
  while (nextIndex <= tabs.length - 1) {
    if (tabs[nextIndex].disabled) {
      nextIndex++;
    } else {
      return nextIndex;
    }
  }
  return activeTabIndex;
}
export function getPreviousTabIndex(
  tabs: InternalTabProps[],
  activeTabIndex: number
) {
  let previousIndex = activeTabIndex - 1;
  while (previousIndex >= 0) {
    if (tabs[previousIndex].disabled) {
      previousIndex--;
    } else {
      return previousIndex;
    }
  }
  return activeTabIndex;
}

export function activatePreviousTab(
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex?: Dispatch<SetStateAction<number>>
): boolean {
  const previousIndex = getPreviousTabIndex(tabs, activeTabIndex);
  if (previousIndex < activeTabIndex) {
    setActiveTabIndex(previousIndex);
    if (setActivePanelIndex) {
      setActivePanelIndex(previousIndex);
    }
    return true;
  } else {
    logger.debug(`did not find previous tab index to activate`);
    return false;
  }
}

export function activateAnotherTabAndPanel(
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>
) {
  if (
    !activatePreviousTab(
      tabs,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex
    )
  ) {
    const nextTab = getNextTabIndex(tabs, activeTabIndex);
    if (nextTab > activeTabIndex) {
      // since this tab is removed, total number of tabs will minus by one.
      setActiveTabIndex(nextTab - 1);
    } else {
      logger.debug(`do nothing as no next tab could be activated.`);
    }
  }
}
