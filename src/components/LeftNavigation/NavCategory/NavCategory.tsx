import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";

import { genId, getIconClass, IconNamesType, Keys } from "utils";
export interface NavCategoryProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconNamesType;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
}

const COLLAPSED_STYLE: string = "neo-leftnav__main";

export function getNavBarClassNames(
  expanded: boolean,
  active: boolean,
  disabled: boolean
) {
  const classNames = [COLLAPSED_STYLE];

  if (expanded) {
    classNames.push(`neo-leftnav__main--expand`);
  }

  if (active) {
    classNames.push(`neo-leftnav__main--active`);
  }

  if (disabled) {
    classNames.push(`neo-leftnav__disabled`);
  }

  return classNames.join(" ");
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
  children,
  label,
  icon,
  className,
  expanded = false,
  disabled = false,
  active = false,
}) => {
  const internalId = useMemo(() => id || genId(), []);
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(COLLAPSED_STYLE);
  const [iconClass, setIconClass] = useState("");

  useEffect(() => {
    const itemStyle = getNavBarClassNames(isExpanded, active, disabled);
    setNavItemClass(itemStyle);
  }, [isExpanded, active, disabled]);

  useEffect(() => {
    const iconStyles = getIconClass(icon);
    setIconClass(iconStyles);
  }, [icon]);

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
      >
        {label}
      </button>
      <ul className={listClass}>{children}</ul>
    </li>
  );
};
