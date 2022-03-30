import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Sheet } from "components/Sheet";

import { Branch, BranchProps } from ".";

export default {
  title: "Components/Tree Native/Branch",
  component: Branch,
} as Meta<BranchProps>;

const Label: FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = ({ children }) => (
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
  const [selected, setSelected] = useState("");

  return (
    <Sheet title="Native Tree Branches Example" style={{ width: 400 }}>
      <Section>
        <Label>just children</Label>

        <Branch selected={selected === "c1"} onClick={() => setSelected("c1")}>
          node one
        </Branch>

        <Branch selected={selected === "c2"} onClick={() => setSelected("c2")}>
          node two
        </Branch>
      </Section>

      <Section>
        <Label>left content only</Label>

        <Branch
          selected={selected === "l1"}
          onClick={() => setSelected("l1")}
          leftContent={<>node one</>}
        />
        <Branch
          selected={selected === "l2"}
          onClick={() => setSelected("l2")}
          leftContent={<>node two</>}
        />
      </Section>

      <Section>
        <Label>right content only</Label>

        <Branch
          selected={selected === "r1"}
          onClick={() => setSelected("r1")}
          rightContent={<>node one</>}
        />
        <Branch
          selected={selected === "r2"}
          onClick={() => setSelected("r2")}
          rightContent={<>node two</>}
        />
      </Section>

      <Section>
        <Label>left and right content</Label>

        <Branch
          selected={selected === "lr1"}
          onClick={() => setSelected("lr1")}
          leftContent={<>left node one</>}
          rightContent={<>right node one</>}
        />
        <Branch
          selected={selected === "lr2"}
          onClick={() => setSelected("lr2")}
          leftContent={<>left node two</>}
          rightContent={<>right node two</>}
        />
      </Section>

      <Section>
        <Label>left content and children</Label>

        <Branch
          selected={selected === "lc1"}
          onClick={() => setSelected("lc1")}
          leftContent={<>left node one</>}
        >
          center node one
        </Branch>
        <Branch
          selected={selected === "lc2"}
          onClick={() => setSelected("lc2")}
          leftContent={<>left node two</>}
        >
          center node two
        </Branch>
      </Section>

      <Section>
        <Label>right content and children</Label>

        <Branch
          selected={selected === "rc1"}
          onClick={() => setSelected("rc1")}
          rightContent={<>right node one</>}
        >
          center node one
        </Branch>
        <Branch
          selected={selected === "rc2"}
          onClick={() => setSelected("rc2")}
          rightContent={<>right node two</>}
        >
          center node two
        </Branch>
      </Section>

      <Section>
        <Label>left content, right content, and children</Label>

        <Branch
          selected={selected === "lrc1"}
          onClick={() => setSelected("lrc1")}
          leftContent={<>left node one</>}
          rightContent={<>right node one</>}
        >
          center node one
        </Branch>
        <Branch
          selected={selected === "lrc2"}
          onClick={() => setSelected("lrc2")}
          leftContent={<>left node two</>}
          rightContent={<>right node two</>}
        >
          center node two
        </Branch>
      </Section>
    </Sheet>
  );
};
