import { Meta } from "@storybook/react/types-6-0";

import { ExampleComponent } from "./";
import { Props } from "./ExampleComponentTypes";

export default {
  title: "Components/Example Component",
  component: ExampleComponent,
} as Meta<Props>;

const Template = ({ text }: Props) => <ExampleComponent text={text} />;

export const Default = Template.bind({});
Default.args = {};

export const Example = Template.bind({ text: "example" });
Example.args = { text: "example" };
