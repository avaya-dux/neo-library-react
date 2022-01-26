import log from "loglevel";
import { Dispatch, MouseEvent, SetStateAction } from "react";
import { isAriaDisabled } from "utils";

const logger = log.getLogger("tab-mouse-event-handler");
logger.disableAll();

export { logger as tabMouseEventHandlerLogger };
export const handleMouseClickEvent = (
  e: MouseEvent,
  setActiveTabId: Dispatch<SetStateAction<string>>,
  setActivePanelId: Dispatch<SetStateAction<string>>
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
    setActiveTabId(id);
    setActivePanelId(id);
  }
  e.preventDefault();
};
