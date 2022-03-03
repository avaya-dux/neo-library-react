import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";

import { Button } from "components/Button";
import { IconNamesType } from "utils";

export interface NavCategoryProps {
  id?: string;
  label: string;
  icon?: IconNamesType;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  selectedItem?: string;
}

const COLLAPSED_STYLE: string = "neo-leftnav__main neo-leftnav__main--active";
const EXPANDED_STYLE = COLLAPSED_STYLE.concat(" neo-leftnav__main--expand");

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
  // disabled = false, TODO: Hook these up in part 2 of PR.
  // active = false,
  // selectedItem = false,
}) => {
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(COLLAPSED_STYLE);

  useEffect(() => {
    // console.log("expanded = ", expanded); TODO: Remove in PR part 2.
    setIsExpanded(expanded);
  }, []);

  useEffect(() => {
    const itemStyle = isExpanded ? EXPANDED_STYLE : COLLAPSED_STYLE;
    setNavItemClass(itemStyle);
  }, [isExpanded]);

  const onExpand = (event: MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    if (event.key === "Enter") {
      setIsExpanded(!isExpanded);
    }
  };
  return (
    <li className={navItemClass}>
      <Button
        tabIndex={0}
        role="menu"
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
