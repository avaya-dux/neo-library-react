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
import {
  handleKeyDownEvent,
  handleMouseClickEvent,
  handleFocusEvent,
  handleBlurEvent,
} from "./EventHandlers";
import { InternalTabProps, InteractiveTabProps } from "./TabTypes";
const logger = log.getLogger("tab-head");
logger.disableAll();
export { logger as tabHeadLogger };
export const TabHead = ({
  active,
  disabled,
  id,
  name,
  tabs,
  activeTabId,
  setActiveTabId,
  setActivePanelId,
}: InternalTabProps & InteractiveTabProps) => {
  logger.debug(`debug TabHead ${id}`);
  const ref = useRef<HTMLAnchorElement>(null);
  const handleAnchorMouseClickEvent: MouseEventHandler = (e: MouseEvent) => {
    return handleMouseClickEvent(e, setActiveTabId, setActivePanelId);
  };

  const handleAnchorKeyDownEvent: KeyboardEventHandler = (
    e: KeyboardEvent<HTMLAnchorElement>
  ) => {
    return handleKeyDownEvent(
      e,
      false, // todo: pass in isVertical
      tabs,
      activeTabId,
      setActiveTabId,
      setActivePanelId,
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
    <a
      id={id}
      role="tab"
      aria-selected={active}
      tabIndex={active && !disabled ? 0 : -1}
      href="#fixme"
      aria-disabled={disabled}
      onClick={handleAnchorMouseClickEvent}
      onKeyDown={handleAnchorKeyDownEvent}
      onFocus={handleAnchorFocusEvent}
      onBlur={handleAnchorBlurEvent}
      ref={ref}
    >
      {name}
    </a>
  );
};
