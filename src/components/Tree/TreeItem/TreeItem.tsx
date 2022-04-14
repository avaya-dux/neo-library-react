// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import {
  DetailedHTMLProps,
  FC,
  LiHTMLAttributes,
  ReactNode,
  useContext,
} from "react";

import { TreeContext } from "../TreeContext";

export interface TreeItemProps
  extends Omit<
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "dir"
  > {
  actions?: ReactNode;
  children: ReactNode;
  selected?: boolean;
}

export const TreeItem: FC<TreeItemProps> = ({
  actions,
  children,
  className,
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
      dir={dir}
      role="treeitem"
      tabIndex={selected ? 0 : -1}
      {...rest}
    >
      <span className="neo-treeview__item-left">{children}</span>

      {actions && <span className="neo-treeview__item-right">{actions}</span>}
    </li>
  );
};
