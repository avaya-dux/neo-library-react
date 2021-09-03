import { Meta } from "@storybook/react/types-6-0";

import { FormLayout, FormLayoutProps } from "./";

export default {
  title: "Components/Form Layout",
  component: FormLayout,
} as Meta<FormLayoutProps>;

const Template = (props: FormLayoutProps) => (
  <FormLayout {...props}>
    <div className="neo-form-control">
      <div className="neo-input-group">
        <label htmlFor="textInput">Input group label</label>
        <div className="neo-input-editable__wrapper">
          <input
            className="neo-input"
            id="textInput"
            placeholder="Text Input"
          />
          <button
            aria-label="clear input"
            tabIndex={-1}
            className="neo-input-edit__icon neo-icon-end"
          ></button>
        </div>
      </div>
      <div className="neo-input-hint">Input group helper text</div>
    </div>
    <div className="neo-form-control">
      <div className="neo-input-group">
        <label htmlFor="textInput">Input group label</label>
        <div className="neo-input-editable__wrapper">
          <input
            className="neo-input"
            id="textInput"
            placeholder="Text Input"
          />
          <button
            aria-label="clear input"
            tabIndex={-1}
            className="neo-input-edit__icon neo-icon-end"
          ></button>
        </div>
      </div>
      <div className="neo-input-hint">Input group helper text</div>
    </div>
  </FormLayout>
);

export const Templated = Template.bind({});
Templated.args = {};
