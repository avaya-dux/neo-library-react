// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { DetailedHTMLProps, FC, LiHTMLAttributes } from "react";

export interface BranchProps
  extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  leftContent?: JSX.Element; // TODO: don't use a prop for this
  rightContent?: JSX.Element; // TODO: don't use a prop for this
  selected?: boolean;
}

export const Branch: FC<BranchProps> = ({
  children,
  className,
  leftContent,
  rightContent,
  selected = false,

  ...rest
}) => {
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
      {leftContent && (
        <span className="neo-treeview__item-left">{leftContent}</span>
      )}

      {children && <>{children}</>}

      {rightContent && (
        <span className="neo-treeview__item-right">{rightContent}</span>
      )}
    </li>
  );
};
