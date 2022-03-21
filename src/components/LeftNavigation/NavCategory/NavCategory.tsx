import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  // useRef,
  useState,
} from "react";
import clsx from "clsx";

import { genId, getIconClass, IconNamesType, Keys } from "utils";
export interface NavCategoryProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string;
  icon?: IconNamesType;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
}

const COLLAPSED_STYLE: string = "neo-leftnav__main";

export function getNavBarClassNames(expanded: boolean, active: boolean) {
  const classNames = [COLLAPSED_STYLE];

  if (expanded) {
    classNames.push(`neo-leftnav__main--expand`);
  }

  if (active) {
    classNames.push(`neo-leftnav__main--active`);
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
  // const ref = useRef();
  const internalId = useMemo(() => id || genId(), []);
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(COLLAPSED_STYLE);
  const [iconClass, setIconClass] = useState("");

  // useEffect(() => {
  //   // Programatically adding "disabled" attribute to avoid linter error in jsx markup
  //   // TODO: Remove this hook and replace this hack with a CSS class for li element in PR Part 3
  //   const el = ref.current;
  //   if (disabled) {
  //     el?.setAttribute("disabled", disabled.toString());
  //   } else {
  //     if (el?.hasAttribute("disabled")) el?.removeAttribute("disabled");
  //   }
  // }, [disabled, id]);

  useEffect(() => {
    const itemStyle = getNavBarClassNames(isExpanded, active);
    setNavItemClass(itemStyle);
  }, [isExpanded, active]);

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
    <li disabled={disabled} id={internalId} className={navItemClass}>
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
