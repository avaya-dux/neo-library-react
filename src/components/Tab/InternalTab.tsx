import log from "loglevel";
import {
  FocusEvent,
  FocusEventHandler,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useRef,
} from "react";

import { Icon } from "components/Icon";
import { IconNamesType } from "utils";

import {
  handleBlurEvent,
  handleCloseElementKeyDownEvent,
  handleCloseElementMouseClickEvent,
  handleFocusEvent,
  handleKeyDownEvent,
  handleMouseClickEvent,
} from "./EventHandlers";
import { noop } from "./EventHandlers/Helper";
import { InteractiveTabProps, InternalTabProps } from "./InternalTabTypes";

const logger = log.getLogger("tab-head-logger");
logger.disableAll();
export { logger as internalTabLogger };

const hrefNoopString = "#noop";

export const InternalTab = ({
  tabIndex,
  active,
  dir,
  disabled,
  closable,
  onClose = noop,
  href = hrefNoopString,
  id,
  name,
  icon,
  content,
  className = "",
  tabs,
  vertical,
  activeTabIndex,
  setActiveTabIndex,
  setActivePanelIndex,
}: InternalTabProps & InteractiveTabProps) => {
  logger.debug(`debug internalTab ${id}`);
  const ref = useRef<HTMLAnchorElement>(null);

  const isLink = href !== hrefNoopString;
  const handleAnchorMouseClickEvent: MouseEventHandler = (e: MouseEvent) =>
    !isLink &&
    handleMouseClickEvent(e, tabs, setActiveTabIndex, setActivePanelIndex);

  const handleCloseMouseClickEvent: MouseEventHandler = (e: MouseEvent) => {
    logger.debug(
      `Mouse click event on close element: tab index is ${tabIndex}`
    );
    handleCloseElementMouseClickEvent(
      e,
      tabs,
      tabIndex,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex
    );
    onClose(tabIndex);
  };
  const handleAnchorKeyDownEvent: KeyboardEventHandler = (
    e: KeyboardEvent<HTMLAnchorElement>
  ) => {
    return handleKeyDownEvent(
      e,
      vertical,
      tabs,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex,
      ref
    );
  };

  const handleCloseKeyDownEvent: KeyboardEventHandler = (
    e: KeyboardEvent<HTMLAnchorElement>
  ) => {
    logger.debug(`Close button keyboard event, tab index is ${tabIndex}`);
    const tabClosed = handleCloseElementKeyDownEvent(
      e,
      tabs,
      activeTabIndex,
      setActiveTabIndex,
      setActivePanelIndex,
      ref
    );
    if (tabClosed) {
      onClose(tabIndex);
    }
  };

  const handleAnchorFocusEvent: FocusEventHandler = (
    e: FocusEvent<HTMLAnchorElement>
  ) => {
    return handleFocusEvent(e, ref);
  };

  const handleAnchorBlurEvent: FocusEventHandler = (
    e: FocusEvent<HTMLAnchorElement>
  ) => {
    return handleBlurEvent(e, ref);
  };

  useEffect(() => {
    if (active && !disabled) {
      logger.debug(`focus tab ${id}`);
      ref.current && ref.current.focus();
    }
  }, [activeTabIndex]);

  return (
    <>
      <a
        id={id}
        role={isLink ? "link" : "tab"}
        aria-selected={isLink ? undefined : active}
        aria-controls={content?.id}
        tabIndex={active && !disabled ? 0 : -1}
        href={href}
        target={isLink ? "_blank" : undefined}
        dir={closable ? "ltr" : dir}
        aria-disabled={disabled}
        className={getClassNames(className, icon)}
        onClick={handleAnchorMouseClickEvent}
        onKeyDown={handleAnchorKeyDownEvent}
        onFocus={handleAnchorFocusEvent}
        onBlur={handleAnchorBlurEvent}
        ref={ref}
      >
        {name}

        {isLink && (
          <Icon
            className="neo-icon-end"
            icon="screenpop-on"
            aria-label="External Link"
          />
        )}
      </a>

      {closable && (
        <span
          role="button"
          className="neo-icon-end"
          tabIndex={active && !disabled ? 0 : -1}
          onKeyDown={handleCloseKeyDownEvent}
          onClick={handleCloseMouseClickEvent}
          aria-label="enter or space to close this tab; tab again to move focus to next tab; shift tab returns focus to this tab;"
        ></span>
      )}
    </>
  );
};
export function getClassNames(className: string, icon?: IconNamesType) {
  const classes = [className];
  if (icon) {
    classes.push(`neo-icon-${icon}`);
  }
  return classes.join(" ");
}
