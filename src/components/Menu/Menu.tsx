import clsx from "clsx";
import log from "loglevel";
import {
  cloneElement,
  FocusEvent,
  FocusEventHandler,
  forwardRef,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  Ref,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  handleBlurEvent,
  handleButtonKeyDownEvent,
  handleKeyDownEvent,
  handleMenuButtonClickEvent,
  handleMouseMoveEvent,
} from "./EventHandlers";
import { addIdToChildren, buildMenuIndexes, layoutChildren } from "./helpers";
import { MenuContext } from "./MenuContext";
import {
  ActionType,
  MenuContextType,
  MenuIndexesType,
  MenuProps,
} from "./MenuTypes";

const logger = log.getLogger("menu");
logger.disableAll();

/**
 * The Menu is meant to be used as a way to display single select options to a user
 *
 * @example
 * <Menu
      menuRootElement={
        <MenuButton onClick={() => console.log("Functional Menu opened")}>
          Functional Menu
        </MenuButton>
      }
    >
      <MenuItem onClick={() => console.log("first menu item was clicked")}>
        Console log click
      </MenuItem>
      <MenuItem disabled>Menu Item 2</MenuItem>
      <MenuItem>
        <a
          href="https://design.avayacloud.com/components/web/setup-web"
          target="_blank"
        >
          Go to Portal
        </a>
      </MenuItem>
    </Menu>
 *
 * @see https://design.avayacloud.com/components/web/dropdown-web
 * @see https://neo-library-react-storybook.netlify.app/?path=/story/components-menu--functional-menu
 */
export const Menu = forwardRef(
  (
    {
      children,
      className,
      closeOnBlur = true,
      closeOnSelect = true,
      defaultIsOpen = false,
      itemAlignment = "left",
      menuRootElement,
      onMenuClose = () => {},
      openOnHover = false,
      ...rest
    }: MenuProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    logger.debug("debugging Menu ...");

    const [isOpen, setOpen] = useState(defaultIsOpen);
    const [enterCounter, setEnterCounter] = useState(1);
    const clonedChildren = useMemo(() => addIdToChildren(children), [children]);
    const menuIndexes: MenuIndexesType = useMemo(
      () => buildMenuIndexes(clonedChildren),
      [clonedChildren]
    );
    // remember item to have focus
    const [cursor, setCursor] = useState(0);
    const [cursorAction, setCursorAction] = useState<ActionType>("");

    useEffect(() => {
      logger.debug(`refocusing button when open = ${isOpen}`);

      // focus button after ESC
      if (!isOpen && ref && "current" in ref && ref.current) {
        logger.debug("focus button");
        ref.current.focus();
      }

      if (isOpen === false && didMount.current) {
        onMenuClose(); // not ideal, but I don't want to pass this all over OR refactor everything
      }
    }, [isOpen]);

    // `didMount` must be placed _after_ any usage of it in a hook
    const didMount = useRef(false);
    useEffect(() => {
      didMount.current = true;
    }, []);

    const handleMenuKeyDown: KeyboardEventHandler = (
      e: KeyboardEvent<HTMLDivElement>
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
        closeOnSelect,
        "Menu"
      );
    };

    const handleMenuBlur: FocusEventHandler = (
      e: FocusEvent<HTMLDivElement>
    ) => {
      logger.debug(`handling menu blur event`);
      e.stopPropagation();
      return handleBlurEvent(e, closeOnBlur, setOpen);
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

    const menuButton = cloneElement(menuRootElement, {
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        handleMenuButtonClickEvent(e, isOpen, setOpen);

        if (menuRootElement.props.onClick) {
          menuRootElement.props.onClick(e);
        }
      },

      onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => {
        handleButtonKeyDownEvent(e, menuIndexes, setCursor, setOpen);

        if (menuRootElement.props.onKeyDown) {
          menuRootElement.props.onKeyDown(e);
        }
      },

      onMouseEnter: (e: MouseEvent<HTMLButtonElement>) => {
        if (openOnHover) {
          setOpen(true);
        }

        if (menuRootElement.props.onMouseEnter) {
          menuRootElement.props.onMouseEnter(e);
        }
      },
    });

    const menuContext: MenuContextType = {
      closeOnSelect,
      setRootMenuOpen: setOpen,
    };

    return (
      <div
        className={getClassNames(isOpen, itemAlignment, className, openOnHover)}
        role="group"
        {...rest}
      >
        <MenuContext.Provider value={menuContext}>
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
              enterCounter,
              closeOnSelect,
              setOpen
            )}
        </MenuContext.Provider>
      </div>
    );
  }
);

export const getClassNames = (
  isOpen: boolean,
  itemAlignment: "left" | "right",
  className: string | undefined,
  openOnHover: boolean // NOTE: this is _only_ for the tests, it doesn't actually do anything
) => {
  if (isOpen) {
    logger.debug(`isOpen is ${isOpen}`);
  }

  return clsx(
    "neo-dropdown",
    itemAlignment === "right" ? "neo-dropdown--left" : "neo-dropdown--right",
    isOpen && "neo-dropdown--active",
    className,
    openOnHover && "neo-dropdown--onhover"
  );
};
