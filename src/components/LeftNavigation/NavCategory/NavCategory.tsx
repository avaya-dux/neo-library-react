import {
  Children,
  cloneElement,
  FunctionComponent,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { NavCategoryProps } from "../LeftNavigationTypes";
import { LinkItem } from "../LinkItem";

import { genId, getIconClass, Keys } from "utils";
import { NavigationContext } from "../NavigationContext";

const LEFTNAV_CATEGORY_STYLE: string = "neo-leftnav__main";

export function getNavBarClassNames(
  expanded: boolean,
  active: boolean,
  disabled: boolean
) {
  const classNames = clsx(
    LEFTNAV_CATEGORY_STYLE,
    expanded && "neo-leftnav__main--expand",
    active && "neo-leftnav__main--active",
    disabled && "neo-leftnav__disabled"
  );

  return classNames;
}

/**
 * Is meant to wrap an array of `LinkItem`.
 *
 * @example
 * <NavCategory>
 *   <LinkItem> First Item </LinkItem>
 *   <LinkItem> Second Item </LinkItem>
 *   <LinkItem> Third Item </LinkItem>
 * </NavCategory>


 * @see https://design.avayacloud.com/components/web/list-web
 */
export const NavCategory = ({
  id,
  children = [],
  label,
  icon,
  className,
  expanded = false,
  disabled = false,
  active = false,
  ...rest
}: NavCategoryProps) => {
  const internalId = useMemo(() => id || genId(), []);
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(LEFTNAV_CATEGORY_STYLE);
  const [iconClass, setIconClass] = useState("");
  const { currentUrl, onSelectedLink } = useContext(NavigationContext);

  const ref = useRef(null);
  const [tabIndex, isActive, handleKeyIndex, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(isActive, ref);

  useEffect(() => {
    const itemStyle = getNavBarClassNames(isExpanded, isActive, disabled);
    setNavItemClass(itemStyle);
  }, [isExpanded, isActive, disabled]);

  useEffect(() => {
    const iconStyles = getIconClass(icon);
    setIconClass(iconStyles);
  }, [icon]);

  const handleOnClick: MouseEventHandler = (event: MouseEvent) => {
    event.stopPropagation();
    handleClick();
    setIsExpanded(!isExpanded);
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
          setIsExpanded(!isExpanded);
          break;
        case Keys.LEFT:
          setIsExpanded(false);
          break;
        case Keys.RIGHT:
          setIsExpanded(true);
          break;
      }
    }
  };

  const linkItems = useMemo(() => {
    return Children.map(children, (child, index) => {
      const childTypeName = (child?.type as FunctionComponent).name;
      const key = `${childTypeName}-${index}`;
      const isDisabled = !isExpanded || disabled || !!child?.props.disabled;
      const parentHasIcon = icon ? true : false;

      return cloneElement(child, {
        disabled: isDisabled,
        key: child.key || key,
        parentHasIcon: parentHasIcon,
      });
    });
  }, [isExpanded, disabled]);

  return (
    <li id={internalId} className={navItemClass}>
      <button
        className={clsx(
          "neo-leftnav__category expandable",
          "neo-btn-secondary--info",
          "neo-btn",
          icon && iconClass,
          className
        )}
        ref={ref}
        tabIndex={tabIndex}
        disabled={disabled}
        onClick={handleOnClick}
        onKeyDown={(e) => handleKeyDown(e)}
        aria-label={label}
        {...rest}
      >
        {label}
      </button>
      <ul className={listClass}>{linkItems}</ul>
    </li>
  );
};
