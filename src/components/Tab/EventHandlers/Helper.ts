import log from "loglevel";
import { Dispatch, RefObject, SetStateAction } from "react";
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

export function extract(
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
  const { scrollLeft, scrollWidth, visibleWidth } = extract(scrollRef, tabRefs);
  logger.debug(
    `enable left button? scrollLeft = ${scrollLeft} scrollWidth=${scrollWidth} visibleWidth=${visibleWidth}`
  );
  return canMovePreviousTabToRight(scrollLeft, scrollWidth, visibleWidth);
}

export function enableRightButton(
  scrollRef: RefObject<HTMLDivElement>,
  tabRefs: RefObject<HTMLLIElement>[]
) {
  const { scrollLeft, scrollWidth, visibleWidth } = extract(scrollRef, tabRefs);
  logger.debug(
    `enable right button? scrollLeft = ${scrollLeft} scrollWidth=${scrollWidth} visibleWidth=${visibleWidth}`
  );

  return canMoveNextTabToLeft(scrollLeft, scrollWidth, visibleWidth);
}

export function canMovePreviousTabToRight(
  leftOffset: number,
  containerWidth: number,
  viewPortWidth: number
) {
  logger.debug(
    `viewPortWidth=${viewPortWidth} containerWidth=${containerWidth} leftOffset=${leftOffset}`
  );
  if (viewPortWidth >= containerWidth) {
    return false;
  }

  return leftOffset > 0;
}

export function canMoveNextTabToLeft(
  leftOffset: number,
  containerWidth: number,
  viewPortWidth: number
) {
  if (viewPortWidth >= containerWidth) {
    return false;
  }
  return leftOffset + viewPortWidth < containerWidth;
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
  if (index === -1) {
    return 0;
  } else {
    return tabWidths[index] - overshoot;
  }
}

export function getPreviousTabToMoveRight(
  leftOffset: number,
  tabWidths: number[]
) {
  let index = 0;
  let sum = 0;
  while (sum < leftOffset && index < tabWidths.length) {
    sum += tabWidths[index];
    logger.debug(`sum = ${sum} index=${index} leftOffset = ${leftOffset}`);
    index++;
  }
  return [--index, sum - leftOffset];
}

export function getNextTabToMoveLeft(
  leftOffset: number,
  viewPortWidth: number,
  tabWidths: number[]
) {
  let index = 0;
  let sum = 0;
  while (sum < leftOffset + viewPortWidth && index < tabWidths.length) {
    sum += tabWidths[index];
    index++;
  }
  return [--index, sum - leftOffset - viewPortWidth];
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
  logger.debug(
    `index = ${index} tabWidth=${tabWidths[index]} and overshoot = ${overshoot}`
  );
  if (index === tabWidths.length - 1 && overshoot <= 0) {
    return 0;
  } else {
    const tabWidth = tabWidths[index];
    if (overshoot > tabWidth / 2) {
      return tabWidths[index] - overshoot + tabWidths[index - 1];
    }
    return tabWidths[index] - overshoot;
  }
}
