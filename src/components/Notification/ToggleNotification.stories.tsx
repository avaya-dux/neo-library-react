import { Meta, Story } from "@storybook/react/types-6-0";
import { Button } from "components/Button";
import { useRef, useState } from "react";
import { NonEventNotificationProps, Notification } from ".";

export default {
  title: "Components/Notification",
} as Meta<NonEventNotificationProps>;

export const AlertShow = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? "Hide" : "Show"}
      </Button>

      {isOpen && (
        <Notification
          icon="copy"
          type="alert"
          header="Alert"
          description="This is an alert."
          action={{ onClick: () => setOpen(false) }}
        />
      )}
    </div>
  );
};

export const AlertShowContainer = () => {
  let container: HTMLDivElement | null;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setOpen] = useState(false);
  return (
    <div>
      <Button
        data-testid="neo-button-show"
        id="btn-show"
        variant="primary"
        onClick={() => {
          setOpen(!isOpen);
        }}
      >
        {isOpen ? "Hide" : "Show"}
      </Button>
      <div
        ref={(element) => {
          container = element;
          ref.current = container;
        }}
      >
        <h3>Alert should popup below</h3>
      </div>

      {isOpen && (
        <Notification
          icon="copy"
          type="alert"
          header="Alert"
          description="This is an alert."
          action={{ onClick: () => setOpen(false) }}
          ref={ref}
        />
      )}
      <div>
        <h3>Alert should popup above</h3>
      </div>
    </div>
  );
};
