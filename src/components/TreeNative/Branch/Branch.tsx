// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { DetailedHTMLProps, FC, LiHTMLAttributes, useContext } from "react";

import { Icon } from "components/Icon";
import { IconNamesType } from "utils";

import { TreeContext } from "../TreeContext";

export interface BranchProps
  extends Omit<
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "dir"
  > {
  icon?: IconNamesType;
  leftContent?: JSX.Element; // TODO: don't use a prop for this
  rightContent?: JSX.Element; // TODO: don't use a prop for this
  selected?: boolean;
}

export const Branch: FC<BranchProps> = ({
  children,
  className,
  icon,
  leftContent,
  rightContent,
  selected = false,

  ...rest
}) => {
  const { dir } = useContext(TreeContext);

  return (
    <li
      className={clsx(
        "neo-treeview__item",
        selected && "neo-treeview__item--selected",
        className
      )}
      role="treeitem"
      tabIndex={selected ? 0 : -1}
      {...rest}
    >
      {(leftContent || icon) && (
        <span className="neo-treeview__item-left">
          {icon && dir === "ltr" && <Icon icon={icon} aria-label="file icon" />}

          {leftContent}
        </span>
      )}

      {icon && dir === undefined && <Icon icon={icon} aria-label="file icon" />}
      {children && <>{children}</>}

      {(rightContent || icon) && (
        <span className="neo-treeview__item-right">
          {rightContent}

          {icon && dir === "rtl" && <Icon icon={icon} aria-label="file icon" />}
        </span>
      )}
    </li>
  );
};
