import log from "loglevel";
import { Dispatch, RefObject, SetStateAction } from "react";
import { InternalTabProps } from "../InternalTabTypes";
import {
  canMoveNextTabToLeft,
  canMovePreviousTabToRight,
  getNextTabToMoveLeft,
  getPreviousTabToMoveRight,
  calculateLeftMoveAmount,
  calculateRightMoveAmount,
} from "./ScrollHelper";

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

export function extractproperties(
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[]
) {
  const {
    scrollLeft = 0,
    scrollWidth = 0,
    clientWidth: visibleWidth = 0,
  } = scrollRef.current || {};
  logger.debug(
    `scrollWidth = ${scrollWidth} visibleWidth = ${visibleWidth} scrollLeft=${scrollLeft}`
  );
  const tabWidths = tabRefs.map((ref) => ref.current?.clientWidth || 0);
  logger.debug(tabWidths.join(", "));
  return {
    scrollLeft,
    scrollWidth,
    visibleWidth,
    tabWidths,
  };
}
export function enableLeftButton(
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[]
) {
  const { scrollLeft, scrollWidth, visibleWidth } = extractproperties(
    scrollRef,
    tabRefs
  );
  logger.debug(
    `enable left button? scrollLeft = ${scrollLeft} scrollWidth=${scrollWidth} visibleWidth=${visibleWidth}`
  );
  return canMovePreviousTabToRight(scrollLeft, scrollWidth, visibleWidth);
}

export function enableRightButton(
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[]
) {
  const { scrollLeft, scrollWidth, visibleWidth } = extractproperties(
    scrollRef,
    tabRefs
  );
  logger.debug(
    `enable right button? scrollLeft = ${scrollLeft} scrollWidth=${scrollWidth} visibleWidth=${visibleWidth}`
  );

  return canMoveNextTabToLeft(scrollLeft, scrollWidth, visibleWidth);
}

export function movePreviousTabToRightAmount(
  leftOffset: number,
  containerWidth: number,
  viewPortWidth: number,
  tabWidths: number[]
) {
  if (!canMovePreviousTabToRight(leftOffset, containerWidth, viewPortWidth)) {
    return 0;
  }
  const [index, overshoot] = getPreviousTabToMoveRight(leftOffset, tabWidths);
  return calculateRightMoveAmount(index, overshoot, tabWidths);
}

export function moveNextTabToLeftAmount(
  leftOffset: number,
  containerWidth: number,
  viewPortWidth: number,
  tabWidths: number[]
) {
  if (!canMoveNextTabToLeft(leftOffset, containerWidth, viewPortWidth)) {
    logger.debug(`can not move next tab to left, returining`);
    return 0;
  }
  const [index, overshoot] = getNextTabToMoveLeft(
    leftOffset,
    viewPortWidth,
    tabWidths
  );
  return calculateLeftMoveAmount(index, overshoot, tabWidths);
}
