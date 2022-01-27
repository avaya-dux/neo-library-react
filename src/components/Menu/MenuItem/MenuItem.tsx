import clsx from "clsx";
import log from "loglevel";
import { FC, RefObject, useEffect, useMemo, useRef } from "react";

import { genId } from "utils/accessibilityUtils";

import { MenuItemProps } from "../MenuTypes";

const logger = log.getLogger("menu-item");
logger.disableAll();

export const MenuItem: FC<MenuItemProps> = ({
  children,
  className,
  counter,
  disabled = false,
  hasFocus = false,
  id,
  isActive = false,
  tabIndex = 0,
  ...rest
}) => {
  const ref = useRef(null);

  const internalId = useMemo(() => id || genId(), []);
  log.debug(
    `debug menuitem hasFocus = ${hasFocus}, isActive=${isActive}, counter=${counter}`
  );

  // run it in every render
  useEffect(() => {
    log.debug(`trigger focus ${counter}`);
    focus(hasFocus, ref);
  });

  return (
    <div
      {...rest}
      className={clsx(
        "neo-dropdown__link",
        isActive && "neo-dropdown__link-active",
        disabled && "neo-dropdown--disabled",
        className
      )}
      id={internalId}
      ref={ref}
      role="menuitem"
      tabIndex={tabIndex}
    >
      {children}
    </div>
  );
};

export const focus = (hasFocus: boolean, ref: RefObject<HTMLDivElement>) => {
  if (hasFocus) {
    log.debug("focusing menu item");
    ref.current?.focus();
  }
};
