import { Meta } from "@storybook/react/types-6-0";

import { Sheet } from "components/Sheet";

import { Branch, Tree, TreeProps } from ".";

export default {
  title: "Components/Tree",
  component: Tree,
} as Meta<TreeProps>;

export const Default = () => (
  <Sheet title="Tree Example" style={{ width: 400 }}>
    <Tree label="Tree Label">
      <Branch>upper edge one</Branch>
      <Branch>upper edge two</Branch>
      <Branch>upper edge three</Branch>
    </Tree>
  </Sheet>
);
