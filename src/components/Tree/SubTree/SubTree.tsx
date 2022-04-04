// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { FC, useContext, useState } from "react";

import { Keys } from "utils";

import { TreeContext } from "../TreeContext";

export interface SubTreeProps {
  defaultActive?: boolean;
  defaultExpanded?: boolean;

  // TODO: don't use a prop for these
  actions?: JSX.Element[];
  edges: JSX.Element[];
}
export const SubTree: FC<SubTreeProps> = ({
  actions,
  children,
  defaultActive = false,
  defaultExpanded = false,
  edges,
}) => {
  const { dir } = useContext(TreeContext);

  const [active, setActive] = useState(defaultActive);
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <li dir={dir} role="treeitem" className="neo-treeview__sub-tree-item">
      <div
        className={clsx(
          "neo-treeview__item",
          expanded && "neo-treeview__item--expanded",
          active && "neo-treeview__item--selected"
        )}
      >
        <span className="neo-treeview__item--expandable" />

        <span
          className="neo-treeview__item-left"
          role="button"
          tabIndex={active ? 0 : -1} // TODO: roving tab index
          onClick={(e) => {
            e.stopPropagation();
            setActive(true);
            setExpanded(!expanded);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();

            switch (e.key) {
              case Keys.SPACE:
              case Keys.ENTER:
                setActive(true);
                setExpanded(!expanded);
                break;
              case Keys.LEFT:
                setActive(true);
                setExpanded(false);
                break;
              case Keys.RIGHT:
                setActive(true);
                setExpanded(true);
                break;
              case Keys.UP:
                // TODO: move tabIndex up
                setActive(false);
                break;
              case Keys.DOWN:
                // TODO: move tabIndex down
                setActive(false);
                break;
            }
          }}
        >
          {children}
        </span>

        <span className="neo-treeview__item-right">{actions}</span>
      </div>

      <ul
        aria-expanded={expanded}
        role="group"
        className={clsx(expanded === false && "neo-display-none")}
      >
        {edges}
      </ul>
    </li>
  );
};
