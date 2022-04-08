import clsx from "clsx";
import { Button } from "components/Button";
import { MouseEventHandler, useContext } from "react";

import { LinkItemProps } from "../LeftNavigationTypes";
import { NavigationContext } from "../NavigationContext";

export const LinkItem = ({
  active = false,
  children,
  className,
  disabled,
  href,
  onClick,
  onFocus,
  onMouseOver,

  ...rest
}: LinkItemProps) => {

  const ctx = useContext(NavigationContext);
  const handleOnClick: MouseEventHandler = (e) => {
    // TODO: Make this active and parent too, use callback
    ctx?.onSelectedLink ? console.log("we have a valid onSelectedLink") : console.log("invalid onSelectedLink");
    ctx?.onSelectedLink && ctx.onSelectedLink("id goes here", "some url");
    onClick && onClick(e);
  };
  return (
    <li
      {...rest}
      className={clsx(
        "neo-leftnav__sub",
        active && "neo-leftnav__sub--active",
        className
      )}
    >
      {disabled ? (
        <Button
          disabled={disabled}
          variant="tertiary"
          style={{
            padding: "8px 28px 8px 72px",
          }}
        >
          {children}
        </Button>
      ) : (
        <a
          href={href}
          onClick={handleOnClick}
          onFocus={onFocus}
          onMouseOver={onMouseOver}
        >
          {children}
        </a>
      )}
    </li>
  );
};
