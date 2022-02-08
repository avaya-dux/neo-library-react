import log from "loglevel";
import {
  Children,
  cloneElement,
  Dispatch,
  FocusEventHandler,
  Fragment,
  isValidElement,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
} from "react";

import { genId } from "utils";

import { handleMenuItemClick } from "../EventHandlers";
import { MenuItem } from "../MenuItem";
import {
  ActionType,
  MenuIndexesType,
  MenuItemProps,
  MenuProps,
  SubMenuProps,
} from "../MenuTypes";
import { SubMenu } from "../SubMenu"; // BUG: causes circular dependency

const logger = log.getLogger("menu-helpers");
logger.disableAll();

export const addIdToChildren = (children: MenuProps["children"]) => {
  return children.map((child) => {
    if (child.type.toString() === MenuItem.toString()) {
      const childId = child.props.id || genId();
      return cloneElement(child, { id: childId });
    } else if (child.type.toString() === SubMenu.toString()) {
      const buttonElement = (child.props as SubMenuProps).menuRootElement;
      const buttonElementId = buttonElement.props.id || genId();
      const cloneButton = cloneElement(buttonElement, {
        id: buttonElementId,
      });
      return cloneElement(child as ReactElement<SubMenuProps>, {
        menuRootElement: cloneButton,
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
  enterCounter: number,
  closeOnSelect: boolean,
  setRootMenuOpen: Dispatch<SetStateAction<boolean>>
) => {
  return (
    <div
      className="neo-dropdown__content"
      role="menu"
      tabIndex={-1}
      onKeyDown={handleMenuKeyDown}
      onMouseMove={handleMenuMouseMove}
      onClick={() => handleMenuItemClick(closeOnSelect, setRootMenuOpen)}
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
            const buttonElement = (child.props as SubMenuProps).menuRootElement;
            const cloneButton = cloneElement(buttonElement, {
              isActive: true,
              hasFocus: true,
              tabIndex: 0,
            });
            activeChild = cloneElement(child, {
              menuRootElement: cloneButton,
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
              const buttonElement = (child.props as SubMenuProps)
                .menuRootElement;
              const cloneButton = cloneElement(buttonElement, {
                isActive: false,
                hasFocus: false,
                tabIndex: -1,
              });
              inactiveChild = cloneElement(
                child as ReactElement<SubMenuProps>,
                {
                  menuRootElement: cloneButton,
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
          id: props.menuRootElement.props.id,
          length: props.children.length as number,
        };
      } else {
        return null;
      }
    }).filter((obj) => !!obj) || [];
  logger.debug(JSON.stringify(result));
  return result;
};
