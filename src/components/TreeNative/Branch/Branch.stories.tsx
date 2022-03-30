import { Meta } from "@storybook/react/types-6-0";

import { Sheet } from "components/Sheet";

import { Branch, BranchProps } from ".";

export default {
  title: "Components/Tree Native/Branch",
  component: Branch,
} as Meta<BranchProps>;

export const Default = () => (
  <Sheet title="Native Tree Branches Example" style={{ width: 400 }}>
    <section>
      <label>just children</label>

      <Branch>node one</Branch>

      <Branch>node two</Branch>
    </section>

    <section>
      <label>left content only</label>

      <Branch leftContent={<>node one</>} />
      <Branch leftContent={<>node two</>} />
    </section>

    <section>
      <label>right content only</label>

      <Branch rightContent={<>node one</>} />
      <Branch rightContent={<>node two</>} />
    </section>

    <section>
      <label>left and right content</label>

      <Branch
        leftContent={<>left node one</>}
        rightContent={<>right node one</>}
      />
      <Branch
        leftContent={<>left node two</>}
        rightContent={<>right node two</>}
      />
    </section>

    <section>
      <label>left content, right content, and children</label>

      <Branch
        leftContent={<>left node one</>}
        rightContent={<>right node one</>}
      >
        center node one
      </Branch>
      <Branch
        leftContent={<>left node two</>}
        rightContent={<>right node two</>}
      >
        center node two
      </Branch>
    </section>
  </Sheet>
);

// const Template: Story<TreeviewProps> = (props: TreeviewProps) => (
//   <Treeview {...props} />
// );

// export const Templated = Template.bind({});
// Templated.args = {};
