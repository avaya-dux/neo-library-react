// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import {
  cloneElement,
  FC,
  ReactElement,
  ReactNode,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFocusEffect, useRovingTabIndex } from "react-roving-tabindex";

import { Keys } from "utils";

import { TreeItemProps } from "../";
import { TreeContext } from "../TreeContext";

export interface SubTreeProps {
  actions?: ReactNode;
  defaultExpanded?: boolean;
  disabled?: boolean;
  edges: ReactElement<SubTreeProps | TreeItemProps>[];
}

export const SubTree: FC<SubTreeProps> = ({
  actions,
  children,
  defaultExpanded = false,
  disabled = false,
  edges,
}) => {
  const { dir } = useContext(TreeContext);

  const ref = useRef(null);
  const [tabIndex, active, handleKeyDown, handleClick] = useRovingTabIndex(
    ref,
    disabled
  );
  useFocusEffect(active, ref);

  const [expanded, setExpanded] = useState(defaultExpanded);

  const edgesWithRovingTabIndexLogic = useMemo(() => {
    // if !expanded, we need to disable all children, which tells "react-roving-tabindex" to set their tabIndex to `-1`
    return expanded
      ? edges
      : edges.map((edge) =>
          cloneElement(edge, {
            disabled: true,
          })
        );
  }, [expanded]);

  return (
    <li dir={dir} role="treeitem" className="neo-treeview__sub-tree-item">
      <div
        className={clsx(
          "neo-treeview__item",
          expanded && "neo-treeview__item--expanded",
          active && "neo-treeview__item--selected"
        )}
      >
        <span
          className="neo-treeview__item-left"
          role="button"
          ref={ref}
          tabIndex={tabIndex}
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
            setExpanded(!expanded);
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            handleKeyDown(e);

            switch (e.key) {
              case Keys.SPACE:
              case Keys.ENTER:
                setExpanded(!expanded);
                break;
              case Keys.LEFT:
                setExpanded(false);
                break;
              case Keys.RIGHT:
                setExpanded(true);
                break;
            }
          }}
        >
          <span className="neo-treeview__item--expandable" />

          {children}
        </span>

        <span className="neo-treeview__item-right">{actions}</span>
      </div>

      <ul aria-expanded={expanded} role="group">
        {edgesWithRovingTabIndexLogic}
      </ul>
    </li>
  );
};
