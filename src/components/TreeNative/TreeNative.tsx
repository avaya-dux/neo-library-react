// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/role-supports-aria-props */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import { FC, useMemo } from "react";

import { handleAccessbilityError } from "utils";
import { genId } from "utils/accessibilityUtils";

export interface TreeNativeProps {
  ["aria-label"]?: string;
  ["aria-describedby"]?: string;
  label?: string;
}

export const TreeNative: FC<TreeNativeProps> = ({
  "aria-describedby": describedby,
  "aria-label": arialabel,
  children,
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

      <ul
        aria-describedby={describedby}
        aria-label={arialabel}
        id={treeId}
        role="tree"
        tabIndex={0} // TODO: roving tab index
      >
        {children}
      </ul>
    </div>
  );
};
