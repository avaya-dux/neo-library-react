import clsx from "clsx";
import log from "loglevel";
import {
  cloneElement,
  FocusEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  handleBlurEvent,
  handleButtonKeyDownEvent,
  handleKeyDownEvent,
  handleMouseClickEvent,
  handleMouseMoveEvent,
} from "./EventHandlers";
import { ActionType, MenuIndexesType, MenuProps } from "./MenuTypes";
import { addIdToChildren, buildMenuIndexes, layoutChildren } from "./SubMenu";

const logger = log.getLogger("menu");
logger.disableAll();

export const Menu = forwardRef(
  (
    {
      menuRootElement,
      className,
      children,
      itemAlignment = "left",
      ...rest
    }: MenuProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    logger.debug("debugging Menu ...");

    const [isOpen, setOpen] = useState(false);
    const [enterCounter, setEnterCounter] = useState(1);
    const clonedChildren = useMemo(() => addIdToChildren(children), [children]);
    const menuIndexes: MenuIndexesType = useMemo(
      () => buildMenuIndexes(clonedChildren),
      [clonedChildren]
    );
    // remember item to have focus
    const [cursor, setCursor] = useState(0);
    const [cursorAction, setCursorAction] = useState<ActionType>("");

    // focus button after ESC
    useEffect(() => {
      logger.debug(`refocusing button when open = ${isOpen}`);
      if (!isOpen && ref && "current" in ref && ref.current) {
        logger.debug("focus button");
        ref.current.focus();
      }
    }, [isOpen]);

    const handleMenuButtonKeyDown: KeyboardEventHandler = (
      e: React.KeyboardEvent<HTMLButtonElement>
    ) => {
      return handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);
    };

    const handleMenuKeyDown: KeyboardEventHandler = (
      e: React.KeyboardEvent<HTMLDivElement>
    ) => {
      return handleKeyDownEvent(
        e,
        menuIndexes,
        cursorAction,
        setCursorAction,
        cursor,
        setCursor,
        enterCounter,
        setEnterCounter,
        setOpen,
        "Menu"
      );
    };

    const handleMenuBlur: FocusEventHandler = (
      e: FocusEvent<HTMLDivElement>
    ) => {
      logger.debug(`handling menu blur event`);
      e.stopPropagation();
      return handleBlurEvent(e, setOpen);
    };

    const handleMenuMouseMove: MouseEventHandler = (e: MouseEvent) => {
      return handleMouseMoveEvent(
        e,
        menuIndexes,
        cursor,
        setCursor,
        cursorAction,
        setCursorAction,
        enterCounter,
        setEnterCounter
      );
    };

    const handleMenuButtonClick: MouseEventHandler = (e: MouseEvent) => {
      return handleMouseClickEvent(e, isOpen, setOpen);
    };

    const menuButton = cloneElement(menuRootElement, {
      onKeyDown: handleMenuButtonKeyDown,
      onClick: handleMenuButtonClick,
    });

    return (
      <div
        className={getClassNames(isOpen, itemAlignment, className)}
        role="group"
        {...rest}
      >
        {menuButton}
        {isOpen &&
          layoutChildren(
            clonedChildren,
            handleMenuKeyDown,
            handleMenuMouseMove,
            handleMenuBlur,
            menuIndexes,
            cursor,
            cursorAction,
            enterCounter
          )}
      </div>
    );
  }
);

export const getClassNames = (
  isOpen: boolean,
  itemAlignment: "left" | "right",
  className: string | undefined
) => {
  if (isOpen) {
    logger.debug(`isOpen is ${isOpen}`);
  }

  return clsx(
    "neo-dropdown",
    itemAlignment === "right" ? "neo-dropdown--left" : "neo-dropdown--right",
    isOpen && "neo-dropdown--active",
    className
  );
};
