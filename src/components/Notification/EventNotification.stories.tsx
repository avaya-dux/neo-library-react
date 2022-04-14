import { Meta, Story } from "@storybook/react/types-6-0";
import { IconNames, usePopup, PopupId, PopupPosition } from "utils";
import { EventNotificationProps, Notification } from ".";
import ReactStopwatch from "react-stopwatch";
import { useEffect, useRef, useState } from "react";
import log from "loglevel";
const logger = log.getLogger("event-notification-story-logger");
logger.disableAll();
type WithoutType = Omit<EventNotificationProps, "type">;
const EventTemplate: Story<WithoutType> = ({ ...rest }: WithoutType) => {
  const props = { type: "event", ...rest } as EventNotificationProps;
  return <Notification {...props} />;
};

export const Event = EventTemplate.bind({});
Event.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
};

export const EventCloseAlert = EventTemplate.bind({});
EventCloseAlert.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
  action: { onClick: () => alert("closed") },
};
export const EventCounter = EventTemplate.bind({});
EventCounter.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
  action: { count: "00:00" },
};

export const EventCounterUp = () => {
  return (
    <ReactStopwatch
      seconds={0}
      minutes={0}
      hours={0}
      limit="05:00"
      onCallback={() => logger.debug("Finish")}
      withLoop={true}
      render={({ formatted }: { [key: string]: any }) => {
        return (
          <Notification
            type="event"
            icon="copy"
            header="Event"
            description="This is an event."
            action={{ count: `${formatted.substring(3)}` }}
          />
        );
      }}
    />
  );
};

export const EventButtons = EventTemplate.bind({});
EventButtons.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
  isElevated: true,
  action: {
    buttons: [
      { children: "Edit", onClick: () => alert("Edit Clicked") },
      { children: "Alert", onClick: () => alert("Alert Clicked") },
    ],
  },
};

const EventCustomAction = EventTemplate.bind({});
EventCustomAction.args = {
  icon: "copy",
  header: "Event",
  description: "This is an event.",
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

export const PopCounterEvent = () => {
  const notificationRef = useRef(
    <Notification
      type="event"
      icon="copy"
      header="Event"
      description="This is an event."
      action={{ count: "00:00" }}
    />
  );
  const popupRef = useRef<
    { id: PopupId; position: PopupPosition } | undefined
  >();
  const [open, setOpen] = useState(false);
  const { notify, remove, setZIndex } = usePopup();
  useEffect(() => {
    setZIndex(9900);
  }, []);

  useEffect(() => {
    logger.debug("open is ", open, "popup is ", popupRef.current);
    if (open) {
      popupRef.current = notify({
        id: "event-couter",
        node: notificationRef.current,
        position: "bottom",
      });
      logger.debug(
        "after notify call: open is ",
        open,
        "popup is ",
        popupRef.current
      );
    } else {
      if (popupRef.current) {
        remove(popupRef.current.id, popupRef.current.position);
      }
    }
  }, [open]);

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
    </div>
  );
};

export const PopClosableEvent = () => {
  function onClick() {
    logger.debug("onClose called");
    setOpen(false);
  }
  const notificationRef = useRef(
    <Notification
      type="event"
      icon="copy"
      header="Event"
      description="This is an event."
      action={{ onClick }}
    />
  );
  const popupRef = useRef<
    { id: PopupId; position: PopupPosition } | undefined
  >();
  const [open, setOpen] = useState(false);
  const { notify, remove } = usePopup();

  useEffect(() => {
    logger.debug("open is ", open, "popup is ", popupRef.current);
    if (open) {
      popupRef.current = notify({
        id: "event-couter",
        node: notificationRef.current,
        position: "bottom",
      });
      logger.debug(
        "after notify call: open is ",
        open,
        "popup is ",
        popupRef.current
      );
    } else {
      if (popupRef.current) {
        remove(popupRef.current.id, popupRef.current.position);
      }
    }
  }, [open]);

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>Toggle</button>
    </div>
  );
};
export default {
  title: "Components/Notification",
  component: EventTemplate,
  argTypes: {
    icon: {
      options: IconNames,
      control: { type: "select" },
    },
  },
} as Meta<WithoutType>;
