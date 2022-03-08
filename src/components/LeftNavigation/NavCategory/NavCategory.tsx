import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";

import { Button } from "components/Button";
import { IconNamesType, Keys } from "utils";
export interface NavCategoryProps {
  label: string;
  icon?: IconNamesType;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  // selectedItem?: string;
}

const COLLAPSED_STYLE: string = "neo-leftnav__main";

export function getNavBarClassNames(
  expanded: boolean,
  active: boolean
  // selectedItem: boolean
) {
  const classNames = [COLLAPSED_STYLE];
  console.log("expanded = ", expanded);
  console.log("active = ", active);

  if (expanded) {
    classNames.push(` neo-leftnav__main--expand`);
  }

  if (active) {
    classNames.push(` neo-leftnav__main--active`);
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
  children,
  label,
  icon,
  expanded = false,
  disabled = false,
  active = false,
  // selectedItem = false,
}) => {
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(COLLAPSED_STYLE);

  useEffect(() => {
    const itemStyle = getNavBarClassNames(isExpanded, active);
    console.log("getNavBarClassNames returns ", itemStyle);
    setNavItemClass(itemStyle);
  }, [isExpanded, active]);

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
    <li className={navItemClass}>
      <Button
        icon={icon}
        variant="tertiary"
        onClick={onExpand}
        onKeyDown={handleKeyDown}
        aria-label={label}
        className="neo-leftnav__category expandable"
      >
        {label}
      </Button>
      <ul className={listClass}>{children}</ul>
    </li>
  );
};
