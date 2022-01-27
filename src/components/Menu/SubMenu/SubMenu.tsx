import log from "loglevel";
import {
  Children,
  cloneElement,
  FC,
  FocusEvent,
  FocusEventHandler,
  Fragment,
  isValidElement,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { genId } from "utils/accessibilityUtils";

import {
  handleBlurEvent,
  handleKeyDownEvent,
  handleMouseMoveEvent,
} from "../EventHandlers";
import { MenuItem } from "../MenuItem";
import {
  ActionType,
  MenuIndexesType,
  MenuItemProps,
  MenuProps,
  SubMenuProps,
} from "../MenuTypes";

const logger = log.getLogger("submenu");
logger.disableAll();

export const SubMenu: FC<SubMenuProps> = ({
  action,
  button,
  children,
  counter,
  id,

  ...rest
}) => {
  const internalId = useMemo(() => id || genId(), []);

  const { children: btnChildren, isActive, hasFocus } = button.props;
  const subMenuButtonLabel = btnChildren?.toString() || "";
  log.debug(
    `debugging SubMenu: '${subMenuButtonLabel}' isActive=${isActive}, hasFocus=${hasFocus}, action = ${action}, counter=${counter}`
  );
  const [isOpen, setOpen] = useState(false);
  const [enterCounter, setEnterCounter] = useState(1);

  log.debug(`debugging SubMenu open =  ${isOpen}; action = ${action}`);

  useEffect(() => {
    setOpen(action === "ENTER_SUB_MENU");
  }, [action, counter]);

  const clonedChildren = useMemo(() => addIdToChildren(children), [children]);

  const menuIndexes: MenuIndexesType = useMemo(
    () => buildMenuIndexes(clonedChildren),
    [clonedChildren]
  );
  const [cursor, setCursor] = useState(0);
  const [cursorAction, setCursorAction] = useState<ActionType>("");

  const handleSubMenuKeyDown: KeyboardEventHandler = (
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
      subMenuButtonLabel
    );
  };
  const handleSubMenuMouseMove: MouseEventHandler = (e: MouseEvent) => {
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
  const handleSubMenuBlur: FocusEventHandler = (
    e: FocusEvent<HTMLDivElement>
  ) => {
    log.debug(`handling submenu blur event`);
    return handleBlurEvent(e, setOpen);
  };

  return (
    <div id={internalId} {...rest} className={getClassNames(action)}>
      {isOpen ? button : cloneElement(button)}
      {isOpen &&
        layoutChildren(
          clonedChildren,
          handleSubMenuKeyDown,
          handleSubMenuMouseMove,
          handleSubMenuBlur,
          menuIndexes,
          cursor,
          cursorAction,
          enterCounter
        )}
    </div>
  );
};

export function getClassNames(action?: ActionType) {
  const classes = ["neo-dropdown__item"];
  if (action === "ENTER_SUB_MENU") {
    classes.push("neo-dropdown--active");
  }
  return classes.join(" ");
}

export const addIdToChildren = (children: MenuProps["children"]) => {
  return children.map((child) => {
    if (child.type.toString() === MenuItem.toString()) {
      const childId = child.props.id || genId();
      return cloneElement(child, { id: childId });
    } else if (child.type.toString() === SubMenu.toString()) {
      const buttonElement = (child.props as SubMenuProps).button;
      const buttonElementId = buttonElement.props.id || genId();
      const cloneButton = cloneElement(buttonElement, {
        id: buttonElementId,
      });
      return cloneElement(child as ReactElement<SubMenuProps>, {
        button: cloneButton,
      });
    } else {
      return child;
    }
  });
};

export const layoutChildren = (
  children: MenuProps["children"],
  handleMenuKeyDown: KeyboardEventHandler<HTMLDivElement>,
  handleMenuMouseMove: MouseEventHandler,
  handleMenuBlur: FocusEventHandler,
  menuIndexes: MenuIndexesType,
  cursor: number,
  cursorAction: ActionType,
  enterCounter: number
) => {
  return (
    <div
      className="neo-dropdown__content"
      role="menu"
      tabIndex={-1}
      onKeyDown={handleMenuKeyDown}
      onMouseMove={handleMenuMouseMove}
      onBlur={handleMenuBlur}
    >
      {children.map((child, index) => {
        if (menuIndexes[cursor]?.index === index) {
          let activeChild;
          if (child.type.toString() === MenuItem.toString()) {
            activeChild = cloneElement(child, {
              isActive: true,
              hasFocus: true,
              tabIndex: 0,
              counter: enterCounter,
            });
          } else {
            const buttonElement = (child.props as SubMenuProps).button;
            const cloneButton = cloneElement(buttonElement, {
              isActive: true,
              hasFocus: true,
              tabIndex: 0,
            });
            activeChild = cloneElement(child, {
              button: cloneButton,
              action: cursorAction,
              counter: enterCounter,
            });
          }
          return <Fragment key={index}>{activeChild}</Fragment>;
        } else {
          if (isValidElement(child)) {
            let inactiveChild;
            if (child.type.toString() === MenuItem.toString()) {
              inactiveChild = cloneElement(
                child as ReactElement<MenuItemProps>,
                {
                  isActive: false,
                  hasFocus: false,
                  tabIndex: -1,
                }
              );
            } else if (child.type.toString() === SubMenu.toString()) {
              const buttonElement = (child.props as SubMenuProps).button;
              const cloneButton = cloneElement(buttonElement, {
                isActive: false,
                hasFocus: false,
                tabIndex: -1,
              });
              inactiveChild = cloneElement(
                child as ReactElement<SubMenuProps>,
                {
                  button: cloneButton,
                }
              );
            }
            if (inactiveChild) {
              return <Fragment key={index}>{inactiveChild}</Fragment>;
            }
          }
          return <Fragment key={index}>{child}</Fragment>;
        }
      })}
    </div>
  );
};

export const buildMenuIndexes = (children: MenuProps["children"]) => {
  const result =
    Children.map(children, (child, index) => {
      logger.debug(`building index ${index}`);
      if (child.type.toString() === MenuItem.toString()) {
        return { index, id: child.props.id };
      } else if (child.type.toString() === SubMenu.toString()) {
        const props = child.props as SubMenuProps;
        return {
          index,
          // using button id for looking up in mouse move event handling
          id: props.button.props.id,
          length: props.children.length as number,
        };
      } else {
        return null;
      }
    }).filter((obj) => !!obj) || [];
  logger.debug(JSON.stringify(result));
  return result;
};
