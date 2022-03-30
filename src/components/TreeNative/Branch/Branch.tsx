// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import { FC } from "react";

export interface BranchProps {
  leftContent?: JSX.Element; // TODO: don't use a prop for this
  rightContent?: JSX.Element; // TODO: don't use a prop for this
}

export const Branch: FC<BranchProps> = ({
  children,
  leftContent,
  rightContent,
}) => {
  return (
    <li role="treeitem">
      <div className="neo-treeview__item-left">{leftContent}</div>
      <div>{children}</div>
      <div className="neo-treeview__item-right">{rightContent}</div>
    </li>
  );
};
