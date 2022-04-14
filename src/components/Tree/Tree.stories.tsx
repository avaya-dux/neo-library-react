import { Meta } from "@storybook/react/types-6-0";
import { DetailedHTMLProps, FC, LabelHTMLAttributes, useState } from "react";

import { Button } from "components/Button";
import { Checkbox } from "components/Checkbox";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";
import { Sheet } from "components/Sheet";

import { Tree, TreeContainer, TreeContainerProps, TreeItem } from ".";

export default {
  title: "Components/Tree",
  component: TreeContainer,
} as Meta<TreeContainerProps>;

const Divider = () => (
  <div style={{ margin: "2rem 0", borderBottom: "1px solid black" }} />
);

export const Default = () => (
  <section style={{ display: "flex", justifyContent: "space-between" }}>
    <Sheet title="Trees with and without groupings" style={{ width: 400 }}>
      <Divider />

      <TreeContainer label="Flat tree">
        <TreeItem>leaf one</TreeItem>
        <TreeItem>leaf two</TreeItem>
        <TreeItem>leaf three</TreeItem>
      </TreeContainer>

      <Divider />

      <TreeContainer label="Tree with groupings">
        <Tree title="Sub Tree One (string)">
          <TreeItem>one</TreeItem>
        </Tree>

        <Tree
          title={
            <div>
              <b>Sub Tree Two</b> (div)
            </div>
          }
        >
          <TreeItem>one</TreeItem>
        </Tree>
      </TreeContainer>

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

const FullTreeExamples = (props: TreeContainerProps) => (
  <TreeContainer {...props}>
    <Tree title="Sub Tree One Label">
      <TreeItem>one</TreeItem>
      <>two</>
      <TreeItem>three</TreeItem>
    </Tree>

    <Tree
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
      <TreeItem>four</TreeItem>
      <TreeItem>five</TreeItem>
      <TreeItem>six</TreeItem>
    </Tree>

    <Tree title="Sub Tree Three Label">
      <Tree title="Sub Tree Three, Sub Tree Three-One Label">
        <TreeItem>seven</TreeItem>
        <TreeItem>eight</TreeItem>
        <TreeItem>nine</TreeItem>
        <Tree title="Sub Tree Three, Sub Tree Three-One, Sub Tree Three-One-One Label">
          <TreeItem>ten</TreeItem>
          <TreeItem>eleven</TreeItem>
          <TreeItem>twelve</TreeItem>
        </Tree>
      </Tree>
      <TreeItem>thirteen</TreeItem>
      <TreeItem>fourteen</TreeItem>
    </Tree>
  </TreeContainer>
);

export const DirectionExamples = () => {
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

      <Sheet aria-label="Direction left-to-right" open={sheetLtrOpen}>
        <FullTreeExamples label="Direction left-to-right `dir=ltr`" dir="ltr" />
      </Sheet>

      <Divider />

      <Sheet aria-label="Direction right-to-left" open={sheetRtlOpen}>
        <FullTreeExamples label="Direction right-to-left `dir=rtl`" dir="rtl" />
      </Sheet>

      <Divider />
    </main>
  );
};

const MockButton = () => <Button onClick={() => alert("ping")}>mock</Button>;

export const EmbededActions = () => {
  return (
    <Sheet title="Embedded Actions Sheet">
      <TreeContainer label="Embedded Actions Tree">
        <TreeItem>Tree Item, One</TreeItem>

        <Tree title="Sub Tree without actions">
          <TreeItem>one</TreeItem>
          <TreeItem>two</TreeItem>
        </Tree>

        <Tree title="Sub Tree with actions" actions={<MockButton />}>
          <TreeItem actions={<MockButton />} disabled>
            disabled Tree Item
          </TreeItem>

          <TreeItem actions={<MockButton />}>not disabled Tree Item</TreeItem>

          <Tree title="Sub Tree with actions" actions={<MockButton />}>
            <TreeItem actions={<MockButton />} disabled>
              disabled Tree Item
            </TreeItem>

            <TreeItem actions={<MockButton />}>not disabled Tree Item</TreeItem>
          </Tree>
        </Tree>

        <TreeItem>
          <div>
            Tree Item, <b>Final</b>
          </div>
        </TreeItem>
      </TreeContainer>

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

        <TreeContainer aria-describedby="label-one">
          <TreeItem>node one</TreeItem>

          <TreeItem>node two</TreeItem>
        </TreeContainer>
      </Section>

      <Section>
        <Label id="label-two">contents with action(s)</Label>

        <TreeContainer aria-describedby="label-two">
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
        </TreeContainer>
      </Section>

      <Section>
        <Label id="label-three">complex content examples</Label>

        <TreeContainer aria-describedby="label-three" dir="ltr">
          <TreeItem>
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </TreeItem>
        </TreeContainer>

        <TreeContainer aria-label="file icon, dir='rtl'" dir="rtl">
          <TreeItem>
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </TreeItem>
        </TreeContainer>

        <TreeContainer
          aria-label="right content with icon and dir='rtl'"
          dir="rtl"
        >
          <TreeItem actions={<Button variant="secondary">mock</Button>}>
            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />
            dir === rtl
          </TreeItem>
        </TreeContainer>

        <TreeContainer
          aria-label="left and right content with icon and dir='ltr'"
          dir="ltr"
        >
          <TreeItem actions={<Button variant="secondary">mock</Button>}>
            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />
            dir === ltr
          </TreeItem>
        </TreeContainer>

        <TreeContainer aria-label="checkbox content, dir='ltr'" dir="ltr">
          <TreeItem>
            <Checkbox aria-labelledby="checkbox-label-one" value="none" />

            <Icon icon="file" aria-label="file" style={{ paddingRight: 5 }} />

            <span id="checkbox-label-one">dir === ltr</span>
          </TreeItem>
        </TreeContainer>

        <TreeContainer aria-label="checkbox content, dir='rtl'" dir="rtl">
          <TreeItem>
            <Checkbox aria-labelledby="checkbox-label-two" value="none" />

            <Icon icon="file" aria-label="file" style={{ paddingLeft: 5 }} />

            <span id="checkbox-label-two">dir === rtl</span>
          </TreeItem>
        </TreeContainer>
      </Section>
    </Sheet>
  );
};
