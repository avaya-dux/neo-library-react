import log from "loglevel";
import { RefObject, useEffect, useMemo, useRef } from "react";
import { genId } from "utils/accessibilityUtils";
import { MenuItemProps } from "./MenuTypes";

const logger = log.getLogger("menu-item");
logger.disableAll();

export const MenuItem = ({
  id,
  hasFocus = false,
  isActive = false,
  counter,
  text,
  tabIndex = 0,
  ...rest
}: MenuItemProps) => {
  const internalId = useMemo(() => id || genId(), []);
  log.debug(
    `debug menuitem hasFocus = ${hasFocus}, isActive=${isActive}, text=${text}, counter=${counter}`
  );
  const ref = useRef<HTMLAnchorElement>(null);
  // run it in every render
  useEffect(() => {
    log.debug(`trigger focus ${counter}`);
    focus(hasFocus, ref);
  });

  return (
    <a
      id={internalId}
      tabIndex={tabIndex}
      href="fixme"
      className={getClassNames(isActive)}
      role="menuitem"
      ref={ref}
      {...rest}
    >
      {text}
    </a>
  );
};

export const getClassNames = (isActive: boolean) => {
  const names = ["neo-dropdown__link"];
  if (isActive) {
    names.push("neo-dropdown__link-active");
  }
  return names.join(" ");
};

export const focus = (hasFocus: boolean, ref: RefObject<HTMLAnchorElement>) => {
  if (hasFocus) {
    log.debug("focusing menu item");
    ref.current?.focus();
  }
};
