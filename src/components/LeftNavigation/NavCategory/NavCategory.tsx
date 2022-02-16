import { Fragment, FunctionComponent, ReactElement } from "react";
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
  expanded,
  disabled,
  active,
  selectedItem,
}) => {
  const listClass = "neo-leftnav__nav";

  return (
    <div className="neo-leftnav--wrapper">
      <nav className="neo-leftnav">
        <ul className="neo-leftnav__nav">
          <li className="neo-leftnav__main neo-leftnav__main--active neo-leftnav__main--expand">
            <a aria-label={label} href=" " className="neo-icon-contact">
              {label}
              <span className="neo-icon-chevron-left"></span>
            </a>
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
              <li className="neo-leftnav__sub neo-leftnav__sub--active">
                <a href=" ">Payments</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};
