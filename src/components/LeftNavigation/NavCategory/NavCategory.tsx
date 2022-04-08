import {
  Children,
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";

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
export const NavCategory: FunctionComponent<NavCategoryProps> = ({
  id,
  children = [],
  label,
  icon,
  className,
  expanded = false,
  disabled = false,
  active = false,
  ...rest
}) => {
  const internalId = useMemo(() => id || genId(), []);
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(LEFTNAV_CATEGORY_STYLE);
  const [iconClass, setIconClass] = useState("");
  const ctx = useContext(NavigationContext);

  useEffect(() => {
    const itemStyle = getNavBarClassNames(isExpanded, active, disabled);
    setNavItemClass(itemStyle);
  }, [isExpanded, active, disabled]);

  useEffect(() => {
    const iconStyles = getIconClass(icon);
    setIconClass(iconStyles);
  }, [icon]);

  useEffect(() => {
    console.log({ children });
  }, [children]);

  const refKeys = [];

  const onExpand = (event: MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    if (event.key === Keys.ENTER) {
      setIsExpanded(!isExpanded);
    }
  };

  const linkItems = Children.map(children, (child, index) => (
    <LinkItem
      active={child?.props.active}
      disabled={child?.props.disabled}
      href={child?.props.href}
      id={index.toString()}
      onClick={child?.props.onClick}
    >
      {child?.props.children}
    </LinkItem>
  ));

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
        disabled={disabled}
        onClick={onExpand}
        onKeyDown={handleKeyDown}
        aria-label={label}
        {...rest}
      >
        {label}
      </button>
      <ul className={listClass}>{linkItems}</ul>
    </li>
  );
};
