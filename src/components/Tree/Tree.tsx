// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes, useMemo } from "react";

import { handleAccessbilityError } from "utils";
import { genId } from "utils/accessibilityUtils";

import { TreeContext } from "./TreeContext";

import "./Tree_shim.css";

export interface TreeProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    "dir"
  > {
  dir?: "ltr" | "rtl";
  label?: string;
}

export const Tree: FC<TreeProps> = ({
  "aria-describedby": describedby,
  "aria-label": arialabel,
  children,
  className,
  dir = "ltr",
  label,

  ...rest
}) => {
  if (!label && !arialabel && !describedby) {
    handleAccessbilityError(
      "Tree requires a label, an aria-label, or an aria-describedby prop"
    );
  }

  const treeId = useMemo(() => genId(), []);

  return (
    <div className={clsx("neo-treeview", className)} {...rest}>
      {label && <label htmlFor={treeId}>{label}</label>}

      <TreeContext.Provider value={{ dir }}>
        <ul
          aria-describedby={describedby}
          aria-label={arialabel}
          id={treeId}
          role="tree"
        >
          {children}
        </ul>
      </TreeContext.Provider>
    </div>
  );
};
