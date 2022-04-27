import clsx from "clsx";
import { Button } from "components/Button";
import {
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { Keys } from "utils";

import { LinkItemProps } from "../LeftNavigationTypes";
import { NavigationContext } from "../NavigationContext";

export const LinkItem = ({
  active = false,
  children,
  className,
  disabled = false,
  href,
  onClick,
  onFocus,
  onMouseOver,
  parentHasIcon,

  ...rest
}: LinkItemProps) => {
  const ctx = useContext(NavigationContext);
  const [itemStyle, setItemStyle] = useState({ padding: "8px 28px 8px 20px" });

  const ref = useRef(null);
  const [tabIndex, isActive, handleKeyIndex, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(isActive, ref);

  useEffect(() => {
    let leftPadding = "20px";

    if (disabled) {
      leftPadding = parentHasIcon ? "72px" : "40px";
    } else if (parentHasIcon) {
      leftPadding = "52px";
    }
    const itemStyle = { padding: `8px 28px 8px ${leftPadding}` };
    setItemStyle(itemStyle);
  }, [disabled, parentHasIcon]);

  const handleOnClick: MouseEventHandler = (e) => {
    // TODO: Make this active and parent too, use callback
    handleClick();
    ctx?.onSelectedLink
      ? console.log("we have a valid onSelectedLink")
      : console.log("invalid onSelectedLink");
    ctx?.onSelectedLink && ctx.onSelectedLink("id goes here", "some url");
    onClick && onClick(e);
  };

  const handleKeyDown: KeyboardEventHandler = (
    event: KeyboardEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    handleKeyIndex(event);

    if (!disabled) {
      switch (event.key) {
        case Keys.SPACE:
        case Keys.ENTER:
          ctx?.onSelectedLink && ctx.onSelectedLink("id goes here", "some url");
          break;
      }
    }
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
          ref={ref}
          variant="tertiary"
          style={itemStyle}
          tabIndex={tabIndex}
        >
          {children}
        </Button>
      ) : (
        <a
          href={href}
          onClick={handleOnClick}
          onFocus={onFocus}
          onMouseOver={onMouseOver}
          onKeyDown={handleKeyDown}
          ref={ref}
          style={itemStyle}
          tabIndex={tabIndex}
        >
          {children}
        </a>
      )}
    </li>
  );
};
