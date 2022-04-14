import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
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
  <section style={{ display: "flex", justifyContent: "space-between" }}>
    <Sheet title="Tree Examples" style={{ width: 400 }}>
      <Divider />

      <Tree label="Tree Label">
        <TreeItem>upper edge one</TreeItem>
        <TreeItem>upper edge two</TreeItem>
        <TreeItem>upper edge three</TreeItem>
      </Tree>

      <Divider />

      <Tree label="Tree with groupings">
        <SubTree title="Sub Tree One (string)">
          <TreeItem key="one">one</TreeItem>
          <TreeItem key="two">two</TreeItem>
        </SubTree>

        <SubTree
          title={
            <div>
              <b>Sub Tree Two</b> (div)
            </div>
          }
        >
          <TreeItem key="one">one</TreeItem>
          <TreeItem key="two">two</TreeItem>
        </SubTree>
      </Tree>

      <Divider />
    </Sheet>

    <Sheet title="Tree Description" style={{ width: 400 }}>
      <Divider />

      <p>
        The <code>Tree</code> component is a hierarchical list that allows users
        to move through its levels.
      </p>

      <Divider />

      <p>
        The <code>Tree</code> component takes a <code>label</code> (or{" "}
        <code>aria-label</code>) prop, and children. The children can be{" "}
        <code>TreeItem</code> components or <code>SubTree</code> components.
      </p>

      <Divider />

      <p>
        A <code>TreeItem</code> component takes <code>children</code> and an
        optional <code>actions</code> prop.
      </p>

      <Divider />

      <p>
        A <code>SubTree</code> component takes <code>children</code>,{" "}
        <code>edges</code> (which can be <code>TreeItem</code> or{" "}
        <code>SubTree</code>) and an optional <code>actions</code> prop.
      </p>

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
  return (
    <Sheet title="Native Tree Item Example" style={{ width: 400 }}>
      <Section>
        <Label id="label-one">string contents</Label>

        <Tree aria-describedby="label-one">
          <TreeItem>node one</TreeItem>

          <TreeItem>node two</TreeItem>
        </Tree>
      </Section>

      <Section>
        <Label id="label-two">contents with action(s)</Label>

        <Tree aria-describedby="label-two">
          <TreeItem actions={<Button variant="secondary">mock</Button>}>
            node one
          </TreeItem>

          <TreeItem
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
          <TreeItem>
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </TreeItem>
        </Tree>

        <Tree aria-label="file icon, dir='rtl'" dir="rtl">
          <TreeItem>
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </TreeItem>
        </Tree>

        <Tree aria-label="right content with icon and dir='rtl'" dir="rtl">
          <TreeItem actions={<Button variant="secondary">mock</Button>}>
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </TreeItem>
        </Tree>

        <Tree
          aria-label="left and right content with icon and dir='ltr'"
          dir="ltr"
        >
          <TreeItem actions={<Button variant="secondary">mock</Button>}>
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </TreeItem>
        </Tree>

        <Tree aria-label="checkbox content, dir='ltr'" dir="ltr">
          <TreeItem>
            <Checkbox aria-labelledby="checkbox-label-one" value="none" />

            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />

            <span id="checkbox-label-one">dir === ltr</span>
          </TreeItem>
        </Tree>

        <Tree aria-label="checkbox content, dir='rtl'" dir="rtl">
          <TreeItem>
            <Checkbox aria-labelledby="checkbox-label-two" value="none" />

            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />

            <span id="checkbox-label-two">dir === rtl</span>
          </TreeItem>
        </Tree>
      </Section>
    </Sheet>
  );
};

const FullTreeExamples = (props: TreeProps) => (
  <Tree {...props}>
    <SubTree title="Sub Tree One Label">
      <TreeItem key="one">one</TreeItem>
      <TreeItem key="two">two</TreeItem>
      <TreeItem key="three">three</TreeItem>
    </SubTree>

    <SubTree
      title="Sub Tree Two Label, has actions"
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
    >
      <TreeItem key="four">four</TreeItem>
      <TreeItem key="five">five</TreeItem>
      <TreeItem key="six">six</TreeItem>
    </SubTree>

    <SubTree title="Sub Tree Three Label">
      <SubTree
        title="Sub Tree Three, Sub Tree Three-One Label"
        key="sub-sub-tree"
      >
        <TreeItem key="seven">seven</TreeItem>
        <TreeItem key="eight">eight</TreeItem>
        <TreeItem key="nine">nine</TreeItem>
        <SubTree
          title="Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One Label"
          key="sub-sub-sub-tree"
        >
          <TreeItem key="ten">ten</TreeItem>
          <TreeItem key="eleven">eleven</TreeItem>
          <TreeItem key="twelve">twelve</TreeItem>
        </SubTree>
      </SubTree>
      <TreeItem key="thirteen">thirteen</TreeItem>
      <TreeItem key="fourteen">fourteen</TreeItem>
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

const MockButton = () => <Button onClick={() => alert("ping")}>mock</Button>;

export const EmbededActions = () => {
  return (
    <Sheet title="Embedded Actions Sheet">
      <Tree label="Embedded Actions Tree">
        <TreeItem>Tree Item, One</TreeItem>

        <SubTree title="Sub Tree without actions">
          <TreeItem key="one">one</TreeItem>
          <TreeItem key="two">two</TreeItem>
        </SubTree>

        <SubTree title="Sub Tree with actions" actions={<MockButton />}>
          <TreeItem key="three" actions={<MockButton />} disabled>
            disabled Tree Item
          </TreeItem>

          <TreeItem key="four" actions={<MockButton />}>
            not disabled Tree Item
          </TreeItem>

          <SubTree
            title="Sub Tree with actions"
            key="sub-sub-tree-one"
            actions={<MockButton />}
          >
            <TreeItem key="five" actions={<MockButton />} disabled>
              disabled Tree Item
            </TreeItem>

            <TreeItem key="six" actions={<MockButton />}>
              not disabled Tree Item
            </TreeItem>
          </SubTree>
        </SubTree>

        <TreeItem>
          <div>
            Tree Item, <b>Final</b>
          </div>
        </TreeItem>
      </Tree>

      <Divider />

      <section style={{ display: "flex" }}>
        <span>Tab-able item (for checking tab order):</span>

        <IconButton icon="check" aria-label="check icon" />
      </section>

      <Divider />

      <p>
        Need to implement better keyboard navigation:{" "}
        <a href="https://www.w3.org/TR/wai-aria-practices-1.1/examples/treegrid/treegrid-1.html#kbd_label">
          W3 Tree Grid
        </a>
      </p>

      <ul style={{ marginLeft: "2rem" }}>
        <li>
          <b>Right Arrow</b>, if expanded, moves to first child
        </li>

        <li>
          <b>Left Arrow</b>, if collapsed, moves to parent
        </li>

        <li>
          <b>Tab</b>, moves focus to the next interactive widget in the current
          row. If there are no more interactive widgets in the current row,
          moves focus out of the treegrid.
        </li>
      </ul>
    </Sheet>
  );
};
