import { Meta } from "@storybook/react/types-6-0";
import { Select, SelectOption } from "components/Select";
import { Switch } from "components/Switch";
import { WidgetProps } from "./WidgetTypes";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";
import { Widget } from "./Widget";
import { WidgetBody } from "./WidgetBody";
import { useEffect, useState } from "react";
import { Form } from "components/Form";
import { TextInput } from "components/TextInput";
import { Icon } from "components/Icon";
import { IconButton } from "components/IconButton";

export default {
  title: "Components/Widget",
  component: Widget,
} as Meta<WidgetProps>;

export const BasicWidget = () => {
  return (
    <Widget>
      <LeftHeader>
        <span className="neo-icon-chat"></span>
        <p>Header of widget window</p>
      </LeftHeader>
      <RightHeader></RightHeader>
      <WidgetBody isMessage>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </WidgetBody>
    </Widget>
  );
};

export const UsageExample = () => {
  return (
    <div
      style={{
        display: "grid",
        gridColumn: 1,
        gridRowGap: 5,
      }}
    >
      <Widget>
        <LeftHeader>
          <span className="neo-icon-chat"></span>
          <p>Header of widget window</p>
        </LeftHeader>
        <RightHeader>
          <IconButton
            icon="settings"
            variant="tertiary"
            aria-label="Settings"
          ></IconButton>
        </RightHeader>
      </Widget>
      <Widget>
        <LeftHeader>
          <p>Header of widget window</p>
        </LeftHeader>
        <RightHeader>
          <Form inline>
            <Select isMultipleSelect label="Options">
              <SelectOption>Option 1</SelectOption>
              <SelectOption disabled>Option 2</SelectOption>
              <SelectOption>Option 3</SelectOption>
              <SelectOption>Option 4</SelectOption>
            </Select>

            <TextInput
              id="input-icon-left"
              label="Search"
              startAddon={<Icon icon="search" aria-label="input icon" />}
              placeholder="Search"
            />
          </Form>
        </RightHeader>
      </Widget>
      <Widget>
        <LeftHeader>
          <span className="neo-icon-chat"></span>
          <p>Header of widget window</p>
        </LeftHeader>
        <RightHeader>
          <Form inline>
            <Switch defaultChecked aria-label="test" />
          </Form>
        </RightHeader>
      </Widget>
    </div>
  );
};

export const EmptyWidget = () => {
  return (
    <Widget empty>
      <LeftHeader>
        <span className="neo-icon-settings"></span>
        <p>Header of widget window</p>
      </LeftHeader>
    </Widget>
  );
};
export const LoadingWidget = () => {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    setTimeout(() => setloading(false), 5000);
  }, []);

  return (
    <Widget loading={loading}>
      <LeftHeader>
        <span className="neo-icon-chat"></span>
        <p>Header of widget window</p>
      </LeftHeader>
      <RightHeader>
        <button className="neo-icon-more" aria-label="more"></button>
      </RightHeader>
      <WidgetBody isMessage>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </WidgetBody>
    </Widget>
  );
};

export const LoadingEmptyWidget = () => {
  const [loading, setloading] = useState(true);
  const [empty, setempty] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
      setempty(true);
    }, 5000);
  }, []);

  return (
    <Widget loading={loading} empty={empty}>
      <LeftHeader>
        <span className="neo-icon-chat"></span>
        <p>Header of widget window</p>
      </LeftHeader>
      <RightHeader>
        <button className="neo-icon-more" aria-label="more"></button>
      </RightHeader>
      <WidgetBody isMessage>
        Adipisicing in consequat incididunt occaecat sit eu
        <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
        reprehenderit.
      </WidgetBody>
    </Widget>
  );
};
