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
      text: "Basic Chip",
      chiptype: "basic",
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
      text: "Link Icon on Right",
      chiptype: "icon",
      icon: "link",
      dir: "rtl",
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
      text: "Closable Chip TWo",
      chiptype: "closable",
      id: "closable-II",
    },
  ],
};

export const MixedChips = Template.bind({});
MixedChips.args = {
  chipProps: [
    {
      chiptype: "basic",
      text: "basic chip",
    },
    {
      id: "id1",
      chiptype: "closable",
      text: "close me",
    },
    {
      id: "id2",
      chiptype: "closable",
      text: "close me too",
    },
    {
      text: "Link Icon on Right",
      chiptype: "icon",
      icon: "link",
      dir: "rtl",
    },
  ],
};
