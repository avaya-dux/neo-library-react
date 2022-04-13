// BUG: we shouldn't need to disable these rule as W3 recommends using these roles
// https://www.w3.org/TR/wai-aria-practices-1.1/examples/treeview/treeview-1/treeview-1a.html
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */

import clsx from "clsx";
import { DetailedHTMLProps, FC, HTMLAttributes, useMemo } from "react";
import { RovingTabIndexProvider } from "react-roving-tabindex";

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

/**
 * A tree view is a hierarchical list that allows users to move through the various levels.
 *
 * @example
  <Tree label="Tree Label">
    <TreeItem>edge one</TreeItem>
    <TreeItem>edge two</TreeItem>
    <TreeItem>edge three</TreeItem>
  </Tree>
 *
 * @example
  <Tree label="Tree with groupings">
    <SubTree
      edges={[
        <TreeItem key="one">one</TreeItem>,
        <TreeItem key="two">two</TreeItem>,
      ]}
    >
      Sub Tree One
    </SubTree>

    <SubTree
      edges={[
        <TreeItem key="one">one</TreeItem>,
        <TreeItem key="two">two</TreeItem>,
      ]}
    >
      Sub Tree Two
    </SubTree>
  </Tree>
 *
 * @see https://design.avayacloud.com/components/web/treeview-web
 * @see https://neo-library-react-storybook.netlify.app/?path=/story/components-tree
 */
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

      <RovingTabIndexProvider
        options={{ direction: "vertical", focusOnClick: true }}
      >
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
      </RovingTabIndexProvider>
    </div>
  );
};
