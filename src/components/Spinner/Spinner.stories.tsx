import { Meta } from "@storybook/react/types-6-0";

import { ISpinner, Spinner } from "./";

export default {
  title: "Components/Spinner",
  component: Spinner,
} as Meta<ISpinner>;

export const Default = () => (
  <main>
    <section>
      <div>no props</div>
      <Spinner />
    </section>
    <section>
      <div>size="md"</div>
      <Spinner size="md" />
    </section>
    <section>
      <div>size="lg"</div>
      <Spinner size="lg" />
    </section>
    <section>
      <div>size="xl"</div>
      <Spinner size="xl" />
    </section>
  </main>
);

const Template = ({ size }: ISpinner) => <Spinner size={size} />;

export const Templated = Template.bind({});
Templated.args = {};
