import { ComponentStory } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";

import { Icon } from "components/Icon";

import { Image, ImageProps } from "./Image";

export default {
  title: "Components/Image",
  component: Image,
} as Meta<ImageProps>;

const Template: ComponentStory<typeof Image> = (args) => <Image {...args} />;

export const KittenImage = Template.bind({});
KittenImage.args = {
  src: "https://placekitten.com/g/200/300",
  alt: "test",
};

export const CustomClassName = Template.bind({});
CustomClassName.args = {
  src: "http://placekitten.com/g/400/400",
  className: "ha-ha-test",
  alt: "custom className",
};

export const FallBackAsHTML = Template.bind({});
FallBackAsHTML.args = {
  src: "image.gif",
  fallback: <Icon icon="error" />,
};

export const FallBackAsString = Template.bind({});
FallBackAsString.args = {
  src: "image.gif",
  fallback: "http://placekitten.com/g/60/60",
};

export const FallBackSamePath = Template.bind({});
FallBackSamePath.args = {
  src: "image.gif",
  fallback: "image.gif",
};
