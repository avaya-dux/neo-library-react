import { Meta, Story } from "@storybook/react/types-6-0";

import { ChipContainer, ChipContainerProps } from "./";

import "@avaya/neo/neo/dist/css/neo/neo.min.css";

export default {
  title: "Components/ChipContainer",
  component: ChipContainer,
} as Meta<ChipContainerProps>;

const Template: Story<ChipContainerProps> = (props: ChipContainerProps) => (
  <ChipContainer {...props} />
);

export const BasicChips = Template.bind({});
BasicChips.args = {
  chipProps: [
    {
      text: "Basic with Tooltip",
      chiptype: "basic",
      tooltip: { label: "Basic Chip with Tooltip" },
    },
    {
      text: "Basic Chip Disabled",
      chiptype: "basic",
      id: "idII",
      disabled: true,
    },
  ],
};

export const IconChips = Template.bind({});
IconChips.args = {
  chipProps: [
    {
      text: "Link Icon on Right with Tooltip",
      chiptype: "icon",
      icon: "link",
      dir: "rtl",
      tooltip: { label: "Icon!" },
    },
    {
      text: "Info Chip Disabled",
      chiptype: "icon",
      id: "idII",
      icon: "info",
      disabled: true,
    },
  ],
};

export const ClosableChips = Template.bind({});
ClosableChips.args = {
  chipProps: [
    {
      text: "Closable Chip One",
      chiptype: "closable",
      id: "closable-I",
      disabled: true,
    },
    {
      text: "Closable Chip Two with Tooltip",
      chiptype: "closable",
      id: "closable-II",
      tooltip: { label: "Tooltip" },
    },
  ],
};

export const MixedChips = Template.bind({});
MixedChips.args = {
  chipProps: [
    {
      chiptype: "basic",
      text: "basic with tooltip",
      tooltip: { label: "basic chip" },
    },
    {
      id: "id1",
      chiptype: "closable",
      text: "close me",
    },
    {
      id: "id2",
      chiptype: "closable",
      text: "close me with tooltip",
      tooltip: { label: "closable" },
    },
    {
      text: "Link Icon on Right",
      chiptype: "icon",
      icon: "link",
      dir: "rtl",
    },
  ],
};
