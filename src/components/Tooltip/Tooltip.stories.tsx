import { Meta, Story } from "@storybook/react/types-6-0";

import { Avatar } from "components/Avatar";

import { Tooltip, TooltipProps } from "./";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
} as Meta<TooltipProps>;

export const Default = () => {
  const id = "tooltiplabelid";
  return (
    <Tooltip label="default tooltip text" id={id}>
      <button
        className="neo-btn neo-btn-primary neo-btn-primary--primary"
        aria-describedby={id}
      >
        button text
      </button>
    </Tooltip>
  );
};

const Template: Story<TooltipProps> = ({ children, ...rest }: TooltipProps) => (
  <Tooltip {...rest}>
    {children || (
      <button
        // TODO-NEO-575: figure out how to do this properly:
        // aria-describedby={id}
        className="neo-btn neo-btn-primary neo-btn-primary--primary"
      >
        button text
      </button>
    )}
  </Tooltip>
);

export const Templated = Template.bind({});
Templated.args = {
  children: "overriding children with plain text",
  label: "short text",
};

export const MultipleChildren = Template.bind({});
MultipleChildren.args = {
  children: (
    <ul>
      <li>item one</li>
      <li>item two</li>
      <li>item three</li>
      <li>item four</li>
    </ul>
  ),
  label: "wraps many children",
  position: "right",
};

export const AutoPosition: Story<TooltipProps> = (props: TooltipProps) => {
  return (
    <main
      style={{
        border: "solid black",
        padding: "3px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip {...props} style={{ margin: "auto" }}>
          <Avatar />
        </Tooltip>

        <span>
          This is a rectangle. If you hover over an avatar, you will see it's
          tooltip auto position.
        </span>

        <Tooltip {...props} style={{ margin: "auto" }}>
          <Avatar />
        </Tooltip>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
        <Tooltip {...props}>
          <Avatar />
        </Tooltip>
      </div>
    </main>
  );
};
AutoPosition.args = {
  label: "tiny text",
  position: "auto",
};
