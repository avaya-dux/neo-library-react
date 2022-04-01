import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Button } from "components/Button";
import { Sheet } from "components/Sheet";

import { Branch, SubTree, Tree, TreeProps } from ".";

export default {
  title: "Components/Tree",
  component: Tree,
} as Meta<TreeProps>;

export const Default = () => (
  <Sheet title="Tree Example" style={{ width: 400 }}>
    <Tree label="Tree Label">
      <Branch key="one">upper edge one</Branch>
      <Branch key="two">upper edge two</Branch>
      <Branch key="three">upper edge three</Branch>
    </Tree>
  </Sheet>
);

const Label: FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = ({ children }) => (
  <label style={{ fontWeight: "bolder", paddingBottom: "5px" }}>
    {children}
  </label>
);

const Section: FC = ({ children }) => (
  <div
    role="tree"
    style={{
      paddingBottom: "15px",
      marginBottom: "15px",
      borderBottom: "solid 1px black",
    }}
  >
    {children}
  </div>
);

export const BranchContentExamples = () => {
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

      <Section>
        <Label>icon examples</Label>

        <Branch
          selected={selected === "icon1"}
          onClick={() => setSelected("icon1")}
        >
          defaults with no icon
        </Branch>

        <Branch
          selected={selected === "icon2"}
          onClick={() => setSelected("icon2")}
          icon="file"
        >
          defaults with file icon
        </Branch>

        <Tree aria-label="file icon, dir='ltr'" dir="ltr">
          <Branch
            selected={selected === "icon3"}
            onClick={() => setSelected("icon3")}
            icon="file"
          >
            file icon, dir === ltr
          </Branch>
        </Tree>

        <Tree aria-label="file icon, dir='rtl'" dir="rtl">
          <Branch
            selected={selected === "icon4"}
            onClick={() => setSelected("icon4")}
            icon="file"
          >
            file icon, dir === rtl{" "}
          </Branch>
        </Tree>

        <Tree aria-label="right content with icon and dir='rtl'" dir="rtl">
          <Branch
            selected={selected === "icon5"}
            onClick={() => setSelected("icon5")}
            icon="file"
            rightContent={<>right content with icon and dir === rtl </>}
          />
        </Tree>

        <Tree aria-label="left content with icon and dir='rtl'" dir="rtl">
          <Branch
            selected={selected === "icon6"}
            onClick={() => setSelected("icon6")}
            icon="file"
            leftContent={<>left content with icon and dir === rtl</>}
          />
        </Tree>

        <Tree aria-label="left content with icon and dir='ltr'" dir="ltr">
          <Branch
            selected={selected === "icon7"}
            onClick={() => setSelected("icon7")}
            icon="file"
            leftContent={<>left content with icon and dir === ltr</>}
          />
        </Tree>

        <Tree
          aria-label="left and right content with icon and dir='ltr'"
          dir="ltr"
        >
          <Branch
            selected={selected === "icon8"}
            onClick={() => setSelected("icon8")}
            icon="file"
            leftContent={<>left content with icon and dir === ltr</>}
            rightContent={<>right content with icon and dir === ltr</>}
          />
        </Tree>

        <Tree aria-label="left and right with icon and dir='rtl'" dir="rtl">
          <Branch
            selected={selected === "icon9"}
            onClick={() => setSelected("icon9")}
            icon="file"
            leftContent={<>left content with icon and dir === rtl</>}
            rightContent={<>right content with icon and dir === rtl</>}
          />
        </Tree>
      </Section>
    </Sheet>
  );
};

export const SubTrees = () => {
  const [sheetLtrOpen, setSheetLtrOpen] = useState(true);
  const [sheetRtlOpen, setSheetRtlOpen] = useState(false);

  return (
    <main>
      <section
        style={{
          borderBottom: "1px solid black",
          display: "flex",
          justifyContent: "space-between",

          marginBottom: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <Button onClick={() => setSheetLtrOpen(!sheetLtrOpen)}>
          Toggle LTR Sheet
        </Button>
        <Button onClick={() => setSheetRtlOpen(!sheetRtlOpen)}>
          Toggle RTL Sheet
        </Button>
      </section>

      <Sheet aria-label="Sub Trees Story, dir=ltr" open={sheetLtrOpen}>
        <Tree label="Sub Trees Example, dir=ltr" dir="ltr">
          <SubTree
            edges={[
              <Branch key="one">one</Branch>,
              <Branch key="two">two</Branch>,
              <Branch key="three">three</Branch>,
            ]}
          >
            Sub Tree One Label
          </SubTree>

          <SubTree
            edges={[
              <Branch key="four">four</Branch>,
              <Branch key="five">five</Branch>,
              <Branch key="six">six</Branch>,
            ]}
          >
            Sub Tree Two Label
          </SubTree>

          <SubTree
            edges={[
              <SubTree
                edges={[
                  <Branch key="seven">seven</Branch>,
                  <Branch key="eight">eight</Branch>,
                  <Branch key="nine">nine</Branch>,
                  <SubTree
                    edges={[
                      <Branch key="ten">ten</Branch>,
                      <Branch key="eleven">eleven</Branch>,
                      <Branch key="twelve">twelve</Branch>,
                    ]}
                  >
                    Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One
                    Label
                  </SubTree>,
                ]}
              >
                Sub Tree Three, Sub Tree Three-One Label
              </SubTree>,
              <Branch key="thirteen">thirteen</Branch>,
              <Branch key="fourteen">fourteen</Branch>,
            ]}
          >
            Sub Tree Three Label
          </SubTree>
        </Tree>
      </Sheet>

      <div style={{ margin: "2rem", borderBottom: "1px solid black" }}></div>

      <Sheet aria-label="Sub Trees Story, dir=rtl" open={sheetRtlOpen}>
        <Tree label="Sub Trees Example, dir=rtl" dir="rtl">
          <SubTree
            edges={[
              <Branch key="one">one</Branch>,
              <Branch key="two">two</Branch>,
              <Branch key="three">three</Branch>,
            ]}
          >
            Sub Tree One Label
          </SubTree>

          <SubTree
            edges={[
              <Branch key="four">four</Branch>,
              <Branch key="five">five</Branch>,
              <Branch key="six">six</Branch>,
            ]}
          >
            Sub Tree Two Label
          </SubTree>

          <SubTree
            edges={[
              <SubTree
                edges={[
                  <Branch key="seven">seven</Branch>,
                  <Branch key="eight">eight</Branch>,
                  <Branch key="nine">nine</Branch>,
                  <SubTree
                    edges={[
                      <Branch key="ten">ten</Branch>,
                      <Branch key="eleven">eleven</Branch>,
                      <Branch key="twelve">twelve</Branch>,
                    ]}
                  >
                    Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One
                    Label
                  </SubTree>,
                ]}
              >
                Sub Tree Three, Sub Tree Three-One Label
              </SubTree>,
              <Branch key="thirteen">thirteen</Branch>,
              <Branch key="fourteen">fourteen</Branch>,
            ]}
          >
            Sub Tree Three Label
          </SubTree>
        </Tree>
      </Sheet>
    </main>
  );
};
