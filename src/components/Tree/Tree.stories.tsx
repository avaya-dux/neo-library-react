/* eslint-disable */

import { Meta } from "@storybook/react/types-6-0";

import { Sheet } from "components/Sheet";

import { Branch, SubTree, Tree, TreeProps } from ".";

export default {
  title: "Components/Tree Native",
  component: Tree,
} as Meta<TreeProps>;

export const Default = () => (
  <Sheet title="Native Tree Example" style={{ width: 400 }}>
    <Tree label="Tree Label">
      <SubTree
        edges={[
          <Branch>group one | node one</Branch>,
          <Branch>group one | node two</Branch>,
          <SubTree
            edges={[
              <Branch>group one, sub-group | node one</Branch>,
              <Branch>group one, sub-group | node two</Branch>,
              <Branch>group one, sub-group | node three</Branch>,
            ]}
          >
            group one, sub-group
          </SubTree>,
          <Branch>group one | node three</Branch>,
        ]}
      >
        group one
      </SubTree>

      <SubTree
        edges={[
          <Branch>group two | node one</Branch>,
          <Branch>group two | node two</Branch>,
          <Branch>group two | node three</Branch>,
        ]}
      >
        group two
      </SubTree>

      <Branch>upper edge one</Branch>
      <Branch>upper edge two</Branch>
      <Branch>upper edge three</Branch>
    </Tree>
  </Sheet>
);

// const Template: Story<TreeviewProps> = (props: TreeviewProps) => (
//   <Treeview {...props} />
// );

// export const Templated = Template.bind({});
// Templated.args = {};
