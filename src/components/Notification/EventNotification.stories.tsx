import { Meta, Story } from "@storybook/react/types-6-0";
import { IconNames } from "utils";
import { EventNotificationProps, Notification } from ".";

type WithoutType = Omit<EventNotificationProps, "type">;
const EventTemplate: Story<WithoutType> = ({ ...rest }: WithoutType) => {
  const props = { type: "event", ...rest } as EventNotificationProps;
  return <Notification {...props} />;
};

export const Event = EventTemplate.bind({});
Event.args = {
  icon: "copy",
  header: "Header text",
  description: "Some description",
  isElevated: true,
};

export const EventCloseAlert = EventTemplate.bind({});
EventCloseAlert.args = {
  icon: "copy",
  header: "Header text",
  description: "Some description",
  isElevated: true,
  action: { onClick: () => alert("closed") },
};
export const EventCounter = EventTemplate.bind({});
EventCounter.args = {
  icon: "copy",
  header: "Header text",
  description: "Some description",
  isElevated: true,
  action: { count: "00:00" },
};

export const EventButtons = EventTemplate.bind({});
EventButtons.args = {
  icon: "copy",
  header: "Header text",
  description: "Some description",
  isElevated: true,
  action: {
    buttons: [
      { children: "Edit", onClick: () => alert("Edit Clicked") },
      { children: "Alert", onClick: () => alert("Alert Clicked") },
    ],
  },
};

export const EventCustomAction = EventTemplate.bind({});
EventCustomAction.args = {
  icon: "copy",
  header: "Header text",
  description: "Some description",
  isElevated: true,
  action: (
    <div>
      <h4>List</h4>
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    </div>
  ),
};

export default {
  title: "Components/Notification",
  component: EventTemplate,
  argTypes: {
    icon: {
      control: { type: "select", options: IconNames },
    },
  },
} as Meta<WithoutType>;
