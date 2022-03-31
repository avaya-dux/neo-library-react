// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import { FC, useMemo } from "react";

import { handleAccessbilityError } from "utils";
import { genId } from "utils/accessibilityUtils";

import { TreeContext } from "./TreeContext";

export interface TreeProps {
  ["aria-label"]?: string;
  ["aria-describedby"]?: string;
  dir?: "ltr" | "rtl";
  label?: string;
}

export const Tree: FC<TreeProps> = ({
  "aria-describedby": describedby,
  "aria-label": arialabel,
  children,
  dir,
  label,
}) => {
  if (!label && arialabel && !describedby) {
    handleAccessbilityError(
      "Tree requires a label, an aria-label, or an aria-describedby prop"
    );
  }

  const treeId = useMemo(() => genId(), []);

  return (
    <div className="neo-treeview">
      {label && <label htmlFor={treeId}>{label}</label>}

      <TreeContext.Provider value={{ dir }}>
        <ul
          aria-describedby={describedby}
          aria-label={arialabel}
          id={treeId}
          role="tree"
          tabIndex={0} // TODO: roving tab index
        >
          {children}
        </ul>
      </TreeContext.Provider>
    </div>
  );
};
