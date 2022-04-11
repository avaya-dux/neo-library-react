import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

import { SubTree, Tree, TreeItem, TreeProps } from ".";

export default {
  title: "Components/Tree",
  component: Tree,
} as Meta<TreeProps>;

const Divider = () => (
  <div style={{ margin: "2rem 0", borderBottom: "1px solid black" }} />
);

export const Default = () => (
  <section>
    <Sheet title="Tree Examples" style={{ width: 400 }}>
      <Divider />

      <Tree label="Tree Label">
        <TreeItem key="one">upper edge one</TreeItem>
        <TreeItem key="two">upper edge two</TreeItem>
        <TreeItem key="three">upper edge three</TreeItem>
      </Tree>

      <Divider />

      <Tree label="Tree with groupings">
        <SubTree
          edges={[
            <TreeItem key="one">one</TreeItem>,
            <TreeItem key="two">two</TreeItem>,
          ]}
        >
          Edges as Array
        </SubTree>
        <SubTree
          edges={
            <>
              <TreeItem key="one">one</TreeItem>
              <TreeItem key="two">two</TreeItem>
            </>
          }
        >
          Edges as JSX
        </SubTree>
      </Tree>

      <Divider />
    </Sheet>
  </section>
);

const Label: FC<
  DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
> = ({ children, ...rest }) => (
  <label style={{ fontWeight: "bolder", paddingBottom: "5px" }} {...rest}>
    {children}
  </label>
);

const Section: FC = ({ children }) => (
  <div
    style={{
      paddingBottom: "15px",
      marginBottom: "15px",
      borderBottom: "solid 1px black",
    }}
  >
    {children}
  </div>
);

export const TreeItemExamples = () => {
  const [selected, setSelected] = useState("");

  return (
    <Sheet title="Native Tree Item Example" style={{ width: 400 }}>
      <Section>
        <Label id="label-one">string contents</Label>

        <Tree aria-describedby="label-one">
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
        </Tree>
      </Section>

      <Section>
        <Label id="label-two">contents with action(s)</Label>

        <Tree aria-describedby="label-two">
          <TreeItem
            selected={selected === "lr1"}
            onClick={() => setSelected("lr1")}
            actions={<Button variant="secondary">mock</Button>}
          >
            node one
          </TreeItem>

          <TreeItem
            selected={selected === "lr2"}
            onClick={() => setSelected("lr2")}
            actions={[
              <Button variant="secondary" key="one">
                mock
              </Button>,
              <Button variant="secondary" key="two">
                mock
              </Button>,
            ]}
          >
            node two
          </TreeItem>

          <TreeItem
            selected={selected === "lr3"}
            onClick={() => setSelected("lr3")}
            actions={
              <>
                <Button variant="secondary">mock</Button>
                <Button variant="secondary">mock</Button>
              </>
            }
          >
            node two
          </TreeItem>
        </Tree>
      </Section>

      <Section>
        <Label id="label-three">complex content examples</Label>

        <Tree aria-describedby="label-three" dir="ltr">
          <TreeItem
            selected={selected === "icon3"}
            onClick={() => setSelected("icon3")}
          >
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </TreeItem>
        </Tree>

        <Tree aria-label="file icon, dir='rtl'" dir="rtl">
          <TreeItem
            selected={selected === "icon4"}
            onClick={() => setSelected("icon4")}
          >
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </TreeItem>
        </Tree>

        <Tree aria-label="right content with icon and dir='rtl'" dir="rtl">
          <TreeItem
            selected={selected === "icon5"}
            onClick={() => setSelected("icon5")}
            actions={<Button variant="secondary">mock</Button>}
          >
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </TreeItem>
        </Tree>

        <Tree
          aria-label="left and right content with icon and dir='ltr'"
          dir="ltr"
        >
          <TreeItem
            selected={selected === "icon8"}
            onClick={() => setSelected("icon8")}
            actions={<Button variant="secondary">mock</Button>}
          >
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </TreeItem>
        </Tree>
      </Section>
    </Sheet>
  );
};

const FullTreeExamples = (props: TreeProps) => (
  <Tree {...props}>
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
              Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One Label
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
);

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
        <FullTreeExamples label="Sub Trees Example, dir=ltr" dir="ltr" />
      </Sheet>

      <Divider />

      <Sheet aria-label="Sub Trees Story, dir=rtl" open={sheetRtlOpen}>
        <FullTreeExamples label="Sub Trees Example, dir=rtl" dir="rtl" />
      </Sheet>

      <Divider />
    </main>
  );
};
