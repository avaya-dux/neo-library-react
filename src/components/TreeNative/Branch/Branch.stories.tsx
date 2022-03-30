/* eslint-disable */

import { Meta } from "@storybook/react/types-6-0";
import { FC } from "react";

import { Sheet } from "components/Sheet";

import { Branch, BranchProps } from ".";

export default {
  title: "Components/Tree Native/Branch",
  component: Branch,
} as Meta<BranchProps>;

const Label: FC = ({ children }) => (
  <label style={{ fontWeight: "bolder", paddingBottom: "5px" }}>
    {children}
  </label>
);

const Section: FC = ({ children }) => (
  <section
    style={{
      paddingBottom: "15px",
      marginBottom: "15px",
      borderBottom: "solid 1px black",
    }}
  >
    {children}
  </section>
);

export const Default = () => {
  return (
    <Sheet title="Native Tree Branches Example" style={{ width: 400 }}>
      <Section>
        <Label>just children</Label>

        <Branch>node one</Branch>

        <Branch>node two</Branch>
      </Section>

      <Section>
        <Label>left content only</Label>

        <Branch leftContent={<>node one</>} />
        <Branch leftContent={<>node two</>} />
      </Section>

      <Section>
        <Label>right content only</Label>

        <Branch rightContent={<>node one</>} />
        <Branch rightContent={<>node two</>} />
      </Section>

      <Section>
        <Label>left and right content</Label>

        <Branch
          leftContent={<>left node one</>}
          rightContent={<>right node one</>}
        />
        <Branch
          leftContent={<>left node two</>}
          rightContent={<>right node two</>}
        />
      </Section>

      <Section>
        <Label>left content and children</Label>

        <Branch leftContent={<>left node one</>}>center node one</Branch>
        <Branch leftContent={<>left node two</>}>center node two</Branch>
      </Section>

      <Section>
        <Label>right content and children</Label>

        <Branch rightContent={<>right node one</>}>center node one</Branch>
        <Branch rightContent={<>right node two</>}>center node two</Branch>
      </Section>

      <Section>
        <Label>left content, right content, and children</Label>

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
      </Section>
    </Sheet>
  );
};

// const Template: Story<TreeviewProps> = (props: TreeviewProps) => (
//   <Treeview {...props} />
// );

// export const Templated = Template.bind({});
// Templated.args = {};
