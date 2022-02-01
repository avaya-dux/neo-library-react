import log from "loglevel";
import {
  Dispatch,
  FocusEvent,
  KeyboardEvent,
  SetStateAction,
  RefObject,
} from "react";
import { isAriaDisabled, Keys } from "utils";
import { InternalTabProps } from "../TabTypes";

const logger = log.getLogger("tab-keyboard-event-handler");
logger.disableAll();

export { logger as tabKeyboardEventHandler };

export const focus = (
  ref: RefObject<HTMLAnchorElement>,
  activeTabId: string
) => {
  logger.debug(`focusing on tab ${activeTabId}`);
  ref.current?.focus();
};

export const handleFocusEvent = (
  e: FocusEvent<HTMLAnchorElement>,
  ref: RefObject<HTMLAnchorElement>
) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  const relatedTarget = e.relatedTarget as HTMLElement;
  const fromId = relatedTarget?.getAttribute("id") || null;
  const disabled = isAriaDisabled(target);
  logger.debug(
    `tab ${id} is ${disabled} and is receiving focus from ${fromId}`
  );

  if (!disabled) {
    logger.debug(`focusing ${id}`);
    focus(ref, id!);
  } else {
    blur(ref, id!);
  }
  e.stopPropagation();
  e.preventDefault();
};

export const handleBlurEvent = (
  e: FocusEvent<HTMLAnchorElement>,
  ref: RefObject<HTMLAnchorElement>
) => {
  const target = e.target as HTMLElement;
  const id = target.getAttribute("id");
  const relatedTarget = e.relatedTarget as HTMLElement;
  const toId = relatedTarget?.getAttribute("id") || null;
  logger.debug(`tab ${id} is losing focus to ${toId}`);
  blur(ref, id!);
};

export const blur = (
  ref: RefObject<HTMLAnchorElement>,
  blurredTabId: string
) => {
  logger.debug(`blurring on tab ${blurredTabId}`);
  ref.current?.blur();
};

export const handleKeyDownEvent = (
  e: KeyboardEvent<HTMLAnchorElement>,
  isTabListVertical: boolean,
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>,
  setActivePanelIndex: Dispatch<SetStateAction<number>>,
  ref: RefObject<HTMLAnchorElement>
) => {
  logger.debug(`handle tab key event ${e.key} on ${activeTabIndex}`);
  let handled = true;
  if (tabs.length === 0) {
    return;
  }
  switch (e.key) {
    case Keys.RIGHT:
      if (!isTabListVertical) {
        activateNextTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.LEFT:
      if (!isTabListVertical) {
        activatePreviousTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.DOWN:
      if (isTabListVertical) {
        activateNextTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.UP:
      if (isTabListVertical) {
        activatePreviousTab(tabs, activeTabIndex, setActiveTabIndex);
      }
      break;
    case Keys.ENTER:
    case Keys.SPACE:
      e.preventDefault();
      setActivePanelIndex(activeTabIndex);
      focus(ref, tabs[activeTabIndex].id);
      break;
    case Keys.TAB:
    case Keys.ESC:
      handled = false;
      break;
  }
  if (handled) {
    e.stopPropagation();
  }
};

function activateNextTab(
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>
) {
  let index = activeTabIndex;
  while (index < tabs.length - 1) {
    const nextIndex = index + 1;
    if (tabs[nextIndex].disabled) {
      index++;
    } else {
      setActiveTabIndex(nextIndex);
      return;
    }
  }
}

function activatePreviousTab(
  tabs: InternalTabProps[],
  activeTabIndex: number,
  setActiveTabIndex: Dispatch<SetStateAction<number>>
) {
  let index = activeTabIndex;
  while (index > 0) {
    const previousIndex = index - 1;
    if (tabs[previousIndex].disabled) {
      index--;
    } else {
      setActiveTabIndex(previousIndex);
      return;
    }
  }
}
