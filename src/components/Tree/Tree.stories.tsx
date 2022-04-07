import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Button } from "components/Button";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

import { SubTree, Tree, TreeItem, TreeProps } from ".";

export default {
  title: "Components/Tree",
  component: Tree,
} as Meta<TreeProps>;

export const Default = () => (
  <Sheet title="Tree Example" style={{ width: 400 }}>
    <Tree label="Tree Label">
      <TreeItem key="one">upper edge one</TreeItem>
      <TreeItem key="two">upper edge two</TreeItem>
      <TreeItem key="three">upper edge three</TreeItem>
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

const Divider = () => (
  <div style={{ margin: "2rem 0", borderBottom: "1px solid black" }} />
);

export const TreeItemExamples = () => {
  const [selected, setSelected] = useState("");

  return (
    <Sheet title="Native Tree Item Example" style={{ width: 400 }}>
      <Section>
        <Label>just children</Label>

        <TreeItem
          selected={selected === "c1"}
          onClick={() => setSelected("c1")}
        >
          node one
        </TreeItem>

        <TreeItem
          selected={selected === "c2"}
          onClick={() => setSelected("c2")}
        >
          node two
        </TreeItem>
      </Section>

      <Section>
        <Label>left content only</Label>

        <TreeItem
          selected={selected === "l1"}
          onClick={() => setSelected("l1")}
          leftContent={<>node one</>}
        />
        <TreeItem
          selected={selected === "l2"}
          onClick={() => setSelected("l2")}
          leftContent={<>node two</>}
        />
      </Section>

      <Section>
        <Label>right content only</Label>

        <TreeItem
          selected={selected === "r1"}
          onClick={() => setSelected("r1")}
          rightContent={<>node one</>}
        />
        <TreeItem
          selected={selected === "r2"}
          onClick={() => setSelected("r2")}
          rightContent={<>node two</>}
        />
      </Section>

      <Section>
        <Label>left and right content</Label>

        <TreeItem
          selected={selected === "lr1"}
          onClick={() => setSelected("lr1")}
          leftContent={<>left node one</>}
          rightContent={<>right node one</>}
        />
        <TreeItem
          selected={selected === "lr2"}
          onClick={() => setSelected("lr2")}
          leftContent={<>left node two</>}
          rightContent={<>right node two</>}
        />
      </Section>

      <Section>
        <Label>left content and children</Label>

        <TreeItem
          selected={selected === "lc1"}
          onClick={() => setSelected("lc1")}
          leftContent={<>left node one</>}
        >
          center node one
        </TreeItem>
        <TreeItem
          selected={selected === "lc2"}
          onClick={() => setSelected("lc2")}
          leftContent={<>left node two</>}
        >
          center node two
        </TreeItem>
      </Section>

      <Section>
        <Label>right content and children</Label>

        <TreeItem
          selected={selected === "rc1"}
          onClick={() => setSelected("rc1")}
          rightContent={<>right node one</>}
        >
          center node one
        </TreeItem>
        <TreeItem
          selected={selected === "rc2"}
          onClick={() => setSelected("rc2")}
          rightContent={<>right node two</>}
        >
          center node two
        </TreeItem>
      </Section>

      <Section>
        <Label>left content, right content, and children</Label>

        <TreeItem
          selected={selected === "lrc1"}
          onClick={() => setSelected("lrc1")}
          leftContent={<>left node one</>}
          rightContent={<>right node one</>}
        >
          center node one
        </TreeItem>
        <TreeItem
          selected={selected === "lrc2"}
          onClick={() => setSelected("lrc2")}
          leftContent={<>left node two</>}
          rightContent={<>right node two</>}
        >
          center node two
        </TreeItem>
      </Section>

      <Section>
        <Label>icon examples</Label>

        <TreeItem
          selected={selected === "icon1"}
          onClick={() => setSelected("icon1")}
        >
          defaults with no icon
        </TreeItem>

        <TreeItem
          selected={selected === "icon2"}
          onClick={() => setSelected("icon2")}
          icon="file"
        >
          defaults with file icon
        </TreeItem>

        <Tree aria-label="file icon, dir='ltr'" dir="ltr">
          <TreeItem
            selected={selected === "icon3"}
            onClick={() => setSelected("icon3")}
            icon="file"
          >
            file icon, dir === ltr
          </TreeItem>
        </Tree>

        <Tree aria-label="file icon, dir='rtl'" dir="rtl">
          <TreeItem
            selected={selected === "icon4"}
            onClick={() => setSelected("icon4")}
            icon="file"
          >
            file icon, dir === rtl{" "}
          </TreeItem>
        </Tree>

        <Tree aria-label="right content with icon and dir='rtl'" dir="rtl">
          <TreeItem
            selected={selected === "icon5"}
            onClick={() => setSelected("icon5")}
            icon="file"
            rightContent={<>right content with icon and dir === rtl </>}
          />
        </Tree>

        <Tree aria-label="left content with icon and dir='rtl'" dir="rtl">
          <TreeItem
            selected={selected === "icon6"}
            onClick={() => setSelected("icon6")}
            icon="file"
            leftContent={<>left content with icon and dir === rtl</>}
          />
        </Tree>

        <Tree aria-label="left content with icon and dir='ltr'" dir="ltr">
          <TreeItem
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
          <TreeItem
            selected={selected === "icon8"}
            onClick={() => setSelected("icon8")}
            icon="file"
            leftContent={<>left content with icon and dir === ltr</>}
            rightContent={<>right content with icon and dir === ltr</>}
          />
        </Tree>

        <Tree aria-label="left and right with icon and dir='rtl'" dir="rtl">
          <TreeItem
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
  const [sheetRtlOpen, setSheetRtlOpen] = useState(true);

  return (
    <main>
      <Divider />

      <section
        style={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <Button onClick={() => setSheetLtrOpen(!sheetLtrOpen)}>
          Toggle LTR Sheet
        </Button>

        <Button onClick={() => setSheetRtlOpen(!sheetRtlOpen)}>
          Toggle RTL Sheet
        </Button>
      </section>

      <Divider />

      <Sheet aria-label="Sub Trees Story, dir=ltr" open={sheetLtrOpen}>
        <Tree label="Sub Trees Example, dir=ltr" dir="ltr">
          <SubTree
            edges={[
              <TreeItem key="one">one</TreeItem>,
              <TreeItem key="two">two</TreeItem>,
              <TreeItem key="three">three</TreeItem>,
            ]}
          >
            Sub Tree One Label
          </SubTree>

          <SubTree
            actions={[
              <Button
                key="sub-tree-two-button-one"
                onClick={() => alert("sub tree two, button one clicked")}
              >
                button one
              </Button>,
              <IconButton
                aria-label="click here for more options"
                icon="more"
                key="sub-tree-two-button-two"
                onClick={() => alert("sub tree two, button two clicked")}
                variant="tertiary"
              />,
            ]}
            edges={[
              <TreeItem key="four">four</TreeItem>,
              <TreeItem key="five">five</TreeItem>,
              <TreeItem key="six">six</TreeItem>,
            ]}
          >
            Sub Tree Two Label, has actions
          </SubTree>

          <SubTree
            edges={[
              <SubTree
                key="sub-sub-tree"
                edges={[
                  <TreeItem key="seven">seven</TreeItem>,
                  <TreeItem key="eight">eight</TreeItem>,
                  <TreeItem key="nine">nine</TreeItem>,
                  <SubTree
                    key="sub-sub-sub-tree"
                    edges={[
                      <TreeItem key="ten">ten</TreeItem>,
                      <TreeItem key="eleven">eleven</TreeItem>,
                      <TreeItem key="twelve">twelve</TreeItem>,
                    ]}
                  >
                    Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One
                    Label
                  </SubTree>,
                ]}
              >
                Sub Tree Three, Sub Tree Three-One Label
              </SubTree>,
              <TreeItem key="thirteen">thirteen</TreeItem>,
              <TreeItem key="fourteen">fourteen</TreeItem>,
            ]}
          >
            Sub Tree Three Label
          </SubTree>
        </Tree>
      </Sheet>

      <Divider />

      <Sheet aria-label="Sub Trees Story, dir=rtl" open={sheetRtlOpen}>
        <Tree label="Sub Trees Example, dir=rtl" dir="rtl">
          <SubTree
            edges={[
              <TreeItem key="one">one</TreeItem>,
              <TreeItem key="two">two</TreeItem>,
              <TreeItem key="three">three</TreeItem>,
            ]}
          >
            Sub Tree One Label
          </SubTree>

          <SubTree
            actions={[
              <Button
                key="sub-tree-two-button-one"
                onClick={() => alert("sub tree two, button one clicked")}
              >
                button one
              </Button>,
              <IconButton
                aria-label="click here for more options"
                icon="more"
                key="sub-tree-two-button-two"
                onClick={() => alert("sub tree two, button two clicked")}
                variant="tertiary"
              />,
            ]}
            edges={[
              <TreeItem key="four">four</TreeItem>,
              <TreeItem key="five">five</TreeItem>,
              <TreeItem key="six">six</TreeItem>,
            ]}
          >
            Sub Tree Two Label, has actions
          </SubTree>

          <SubTree
            edges={[
              <SubTree
                key="sub-sub-tree"
                edges={[
                  <TreeItem key="seven">seven</TreeItem>,
                  <TreeItem key="eight">eight</TreeItem>,
                  <TreeItem key="nine">nine</TreeItem>,
                  <SubTree
                    key="sub-sub-sub-tree"
                    edges={[
                      <TreeItem key="ten">ten</TreeItem>,
                      <TreeItem key="eleven">eleven</TreeItem>,
                      <TreeItem key="twelve">twelve</TreeItem>,
                    ]}
                  >
                    Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One
                    Label
                  </SubTree>,
                ]}
              >
                Sub Tree Three, Sub Tree Three-One Label
              </SubTree>,
              <TreeItem key="thirteen">thirteen</TreeItem>,
              <TreeItem key="fourteen">fourteen</TreeItem>,
            ]}
          >
            Sub Tree Three Label
          </SubTree>
        </Tree>
      </Sheet>

      <Divider />
    </main>
  );
};
