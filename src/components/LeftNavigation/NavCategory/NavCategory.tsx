import {
  FunctionComponent,
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { IconProps } from "components/Icon";

export interface NavCategoryProps {
  id?: string;
  label: string;
  icon?: ReactElement<IconProps>;
  expanded?: boolean;
  disabled?: boolean;
  active?: boolean;
  selectedItem?: string;
}

const COLLAPSED_STYLE: string = "neo-leftnav__main neo-leftnav__main--active";
const EXPANDED_STYLE = COLLAPSED_STYLE.concat(" neo-leftnav__main--expand");

/**
 * Is meant to wrap an array of `LinkItem`. TODO: Replace with LinkItem
 *
 * @example
 * <NavCategory>
 *   <ListItem> First Item </LinkItem>
 *   <LinkItem> Second Item </LinkItem>
 *   <LinkItem> Third Item </LinkItem>
 * </NavCategory>


 * @see https://design.avayacloud.com/components/web/list-web
 */
export const NavCategory: FunctionComponent<NavCategoryProps> = ({
  children,
  id,
  label,
  icon,
  expanded = false,
  disabled = false,
  active = false,
  selectedItem = false,
}) => {
  const listClass = "neo-leftnav__nav";
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [navItemClass, setNavItemClass] = useState(COLLAPSED_STYLE);

  useEffect(() => {
    console.log("expanded = ", expanded);
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
      <div
        tabIndex={0}
        role="menu"
        onClick={onExpand}
        onKeyDown={handleKeyDown}
        aria-label={label}
        className="neo-icon-contact"
      >
        {label}
        <span className="neo-icon-chevron-left"></span>
      </div>
      <ul className={listClass}>
        {/* {children} */}
        <li className="neo-leftnav__sub">
          <a href=" ">Overview</a>
        </li>
        <li className="neo-leftnav__sub">
          <a href=" ">Manage Users</a>
        </li>
        <li className="neo-leftnav__sub neo-leftnav__sub--active">
          <a href=" ">Billing</a>
        </li>
        <li className="neo-leftnav__sub">
          <a href=" ">Payments</a>
        </li>
      </ul>
    </li>
  );
};
