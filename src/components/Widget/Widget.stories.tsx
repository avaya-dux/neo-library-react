import { Meta } from "@storybook/react/types-6-0";
import { Select, SelectOption } from "components/Select";
import { Switch } from "components/Switch";
import { WidgetProps } from "./WidgetTypes";
import { LeftHeader } from "./LeftHeader";
import { RightHeader } from "./RightHeader";
import { Widget } from "./Widget";
import { Body } from "./WidgetBody";
import { useEffect, useState } from "react";

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
      <Body>
        <p className="neo-widget__message neo-widget__message">
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </p>
      </Body>
    </Widget>
  );
};

export const ExampleOne = () => {
  return (
    <Widget>
      <LeftHeader>
        <span className="neo-icon-chat"></span>
        <p>Header of widget window</p>
      </LeftHeader>
      <RightHeader>
        <button
          className="neo-btn-square neo-btn-square-tertiary neo-btn-square-tertiary--default neo-icon-settings"
          aria-label="Settings"
        ></button>
      </RightHeader>
    </Widget>
  );
};

export const ExampleTwo = () => {
  return (
    <Widget>
      <LeftHeader>
        <p>Header of widget window</p>
      </LeftHeader>
      <RightHeader>
        <form className="neo-form neo-form--inline">
          <div className="neo-form-control">
            <div className="neo-input-group">
              <Select isMultipleSelect label="Options">
                <SelectOption>Option 1</SelectOption>
                <SelectOption disabled>Option 2</SelectOption>
                <SelectOption>Option 3</SelectOption>
                <SelectOption>Option 4</SelectOption>
              </Select>
            </div>
          </div>
          <div className="neo-form-control">
            <div className="neo-input-icon__wrapper">
              <span className="neo-icon-search"></span>
              <input
                id="input-icon-left"
                className="neo-input"
                placeholder="Search"
                type="text"
              />
            </div>
          </div>
        </form>
      </RightHeader>
    </Widget>
  );
};

export const ExampleThree = () => {
  return (
    <Widget>
      <LeftHeader>
        <span className="neo-icon-chat"></span>
        <p>Header of widget window</p>
      </LeftHeader>
      <RightHeader>
        <form className="neo-form neo-form--inline">
          <div className="neo-form-control">
            <Switch defaultChecked aria-label="test" />
          </div>
        </form>
      </RightHeader>
    </Widget>
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
      <Body>
        <p className="neo-widget__message">
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </p>
      </Body>
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
      <Body>
        <p className="neo-widget__message">
          Adipisicing in consequat incididunt occaecat sit eu
          <strong>enim ex pariatur</strong>. Ad eiusmod duis incididunt
          reprehenderit.
        </p>
      </Body>
    </Widget>
  );
};
