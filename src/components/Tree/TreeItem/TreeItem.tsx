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
  useRef,
} from "react";
import { useRovingTabIndex, useFocusEffect } from "react-roving-tabindex";

import { TreeContext } from "../TreeContext";

export interface TreeItemProps
  extends Omit<
    DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
    "dir"
  > {
  actions?: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  selected?: boolean;
}

export const TreeItem: FC<TreeItemProps> = ({
  actions,
  children,
  className,
  disabled = false,
  selected = false,

  ...rest
}) => {
  const { dir } = useContext(TreeContext);

  const ref = useRef(null);
  const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(focused, ref);

  return (
    <li
      className={clsx(
        "neo-treeview__item",
        disabled && "neo-treeview__item--disabled",
        selected && "neo-treeview__item--selected",
        className
      )}
      dir={dir}
      role="treeitem"
      ref={ref}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...rest}
    >
      <span className="neo-treeview__item-left">{children}</span>

      {actions && <span className="neo-treeview__item-right">{actions}</span>}
    </li>
  );
};
