import { Meta, Story } from "@storybook/react/types-6-0";

import { ExampleComponent } from "./";
import { Props } from "./ExampleComponentTypes";

export default {
  title: "Components/Example Component",
  component: ExampleComponent,
} as Meta<Props>;

export const Default = () => <ExampleComponent text="test" />;

const Template: Story<Props> = ({ text }: Props) => (
  <ExampleComponent text={text} />
);

export const Example = Template.bind({ text: "example" });
Example.args = { text: "example" };
