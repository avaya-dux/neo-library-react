import clsx from "clsx";
import { Button } from "components/Button";
import { MouseEventHandler, useContext, useEffect, useState } from "react";

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
  parentHasIcon,

  ...rest
}: LinkItemProps) => {
  const ctx = useContext(NavigationContext);
  const [itemStyle, setItemStyle] = useState({ padding: "8px 28px 8px 20px" });

  useEffect(() => {
    let leftPadding = "20px";

    if (disabled) {
      leftPadding = parentHasIcon? "72px" : "40px";
    } else if (parentHasIcon) {
      leftPadding = "52px";
    }
    const itemStyle = { padding: `8px 28px 8px ${leftPadding}` };
    setItemStyle(itemStyle);
  }, [disabled, parentHasIcon]);

  const handleOnClick: MouseEventHandler = (e) => {
    // TODO: Make this active and parent too, use callback
    ctx?.onSelectedLink
      ? console.log("we have a valid onSelectedLink")
      : console.log("invalid onSelectedLink");
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
        <Button disabled={disabled} variant="tertiary" style={itemStyle}>
          {children}
        </Button>
      ) : (
        <a
          href={href}
          onClick={handleOnClick}
          onFocus={onFocus}
          onMouseOver={onMouseOver}
          style={itemStyle}
        >
          {children}
        </a>
      )}
    </li>
  );
};
