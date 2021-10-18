import { Meta, Story } from "@storybook/react/types-6-0";

import { AvatarChip, AvatarChipProps } from "./AvatarChip";

import { SmallAvatarProps, Avatar } from "../Avatar";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/Chips/AvatarChip",
  component: AvatarChip,
} as Meta<AvatarChipProps>;

const Template: Story<AvatarChipProps> = (props: AvatarChipProps) => (
  <AvatarChip {...props} />
);

const smallAvatarProps: SmallAvatarProps = {
  label: "Jimmy Bob",
  size: "sm",
};
const smallAvatar = <Avatar {...smallAvatarProps} />;

export const Default = Template.bind({});
Default.args = {
  text: "Avatar Default",
  smallAvatar,
};

export const Success = Template.bind({});
Success.args = {
  variant: "success",
  text: "Avatar Success",
  smallAvatar,
};

export const Info = Template.bind({});
Info.args = {
  variant: "info",
  text: "Avatar Disabled Info",
  disabled: true,
  smallAvatar,
};

export const AlertWithTooltip = Template.bind({});
AlertWithTooltip.args = {
  variant: "alert",
  text: "Avatar Chip",
  disabled: true,
  tooltip: {
    label: "Avatar Disabled Alert Chip",
  },
  smallAvatar,
};

export const Warning = Template.bind({});
Warning.args = {
  variant: "warning",
  text: "Avatar Chip",
  smallAvatar,
};

export const TooltipTopLeft: Story<AvatarChipProps> = (
  props: AvatarChipProps
) => {
  return (
    <div
      style={{
        border: "solid black",
        height: "500px",
        width: "100%",
        padding: "3px",
      }}
    >
      <div
        style={{
          position: "relative",
          top: "200px",
          left: "200px",
          padding: "3px",
        }}
      >
        <AvatarChip {...props} />
      </div>
    </div>
  );
};
TooltipTopLeft.args = {
  variant: "alert",
  text: "Avatar Chip",
  disabled: true,
  tooltip: {
    label: "Avatar Disabled Alert Chip",
    position: "top-left",
  },
  smallAvatar,
};
