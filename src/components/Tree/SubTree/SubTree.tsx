// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { FC, useState } from "react";

import { Keys } from "utils";

export interface SubTreeProps {
  alignment?: "left" | "right";
  defaultActive?: boolean;
  defaultExpanded?: boolean;

  // TODO: don't use a prop for this
  edges: JSX.Element[];
}
export const SubTree: FC<SubTreeProps> = ({
  alignment,
  children,
  defaultActive = false,
  defaultExpanded = false,
  edges,
}) => {
  const [active, setActive] = useState(defaultActive);
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <li
      onClick={(e) => {
        e.stopPropagation();
        setActive(!active);
        setExpanded(!expanded);
      }}
      role="treeitem"
      tabIndex={active && !expanded ? 0 : -1}
      className={clsx(
        "neo-treeview__item",
        expanded && "neo-treeview__item--expanded"
      )}
      onKeyDown={(e) => {
        e.stopPropagation();

        switch (e.key) {
          case Keys.SPACE:
          case Keys.ENTER:
            setActive(!active);
            setExpanded(!expanded);
            break;
        }
      }}
    >
      <span className="neo-treeview__item--expandable"></span>

      <div>{children}</div>

      <ul
        aria-expanded={expanded}
        role="group"
        tabIndex={active && expanded ? 0 : -1}
        className={clsx(
          alignment === "left" ? "neo-treeview__item-left" : "",
          expanded === false && "neo-display-none"
        )}
      >
        {edges}
      </ul>
    </li>
  );
};
