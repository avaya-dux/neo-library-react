import log from "loglevel";
import {
  useEffect,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  FocusEvent,
  MouseEventHandler,
  useRef,
  FocusEventHandler,
} from "react";
import { IconNamesType } from "utils";
import {
  handleKeyDownEvent,
  handleMouseClickEvent,
  handleFocusEvent,
  handleBlurEvent,
} from "./EventHandlers";
import { InternalTabProps, InteractiveTabProps } from "./TabTypes";
const logger = log.getLogger("tab-head-logger");
logger.disableAll();
export { logger as internalTabLogger };
export const InternalTab = ({
  key,
  active,
  disabled,
  closable,
  onClose,
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
  const handleAnchorMouseClickEvent: MouseEventHandler = (e: MouseEvent) => {
    return handleMouseClickEvent(
      e,
      tabs,
      setActiveTabIndex,
      setActivePanelIndex
    );
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
      logger.debug(`focusing tab ${id}`);
      ref.current && ref.current.focus();
    }
  });
  return (
    <>
      <a
        id={id}
        role="tab"
        aria-selected={active}
        aria-controls={content.id}
        tabIndex={active && !disabled ? 0 : -1}
        href="#fixme"
        aria-disabled={disabled}
        className={getClassNames(className, icon)}
        onClick={handleAnchorMouseClickEvent}
        onKeyDown={handleAnchorKeyDownEvent}
        onFocus={handleAnchorFocusEvent}
        onBlur={handleAnchorBlurEvent}
        ref={ref}
      >
        {name}
      </a>
      {closable && (
        <span
          role="button"
          className="neo-icon-end"
          tabIndex={active && !disabled ? 0 : -1}
          {...(onClose ? { onClick: () => onClose(key) } : {})}
          onKeyDown={handleAnchorKeyDownEvent} // todo:
          aria-label="close tab"
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
