import { Meta, Story } from "@storybook/react/types-6-0";
import { useEffect } from "react";
import { IconNames } from "utils";
import { usePopup } from "../../utils/PopupManager/PopupPortal";
import { ToastOptions } from "../../utils/PopupManager/PopupTypes";
import { Toast } from "./Toast";
import log from "loglevel";
const logger = log.getLogger("toast-story-logger");
logger.disableAll();
const ToastTemplate: Story<ToastOptions> = (props) => <Toast {...props} />;

export default {
  title: "Components/Toast",
  component: ToastTemplate,
  argTypes: {
    icon: {
      options: IconNames,
      control: { type: "select" },
    },
  },
} as Meta<ToastOptions>;

export const ToastMessageOnly = ToastTemplate.bind({});
ToastMessageOnly.args = {
  message: "This is a toast: 5 seconds long, no icon",
  id: "toastWithoutIcon",
  position: "bottom-right",
  duration: 5000,
};
export const ToastWithIcon = ToastTemplate.bind({});
ToastWithIcon.args = {
  message: "This is a toast: 5 seconds long, with an icon.",
  icon: "error",
  id: "toastWithIcon",
};

export const ToastsPositioning = () => {
  const { toast, removeAll } = usePopup();
  useEffect(() => {
    return () => {
      logger.debug("closing all...");
      removeAll();
    };
  }, []);

  const duration = 5000;
  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 100px)",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 33%)" }}>
        <button
          onClick={() =>
            toast({
              message: "Top-left Toast",
              duration,
              position: "top-left",
            })
          }
        >
          Open a Top Left Toast
        </button>
        <button
          onClick={() =>
            toast({
              message: "Top Toast",
              duration,
              position: "top",
              icon: "align-top",
            })
          }
        >
          Open a Top Center Toast
        </button>
        <button
          onClick={() =>
            toast({
              message: "Top-right Toast",
              duration,
              position: "top-right",
            })
          }
        >
          Open a Top Right Toast
        </button>
        <button
          onClick={() =>
            toast({
              message: "Bottom-left Toast",
              duration,
              position: "bottom-left",
            })
          }
        >
          Open a Bottom Left Toast
        </button>
        <button
          onClick={() =>
            toast({
              message: "Bottom Toast",
              duration,
              position: "bottom",
              icon: "align-bottom",
            })
          }
        >
          Open a Bottom Center Toast
        </button>
        <button
          onClick={() =>
            toast({
              message: "Bottom-right Toast",
              duration,
              position: "bottom-right",
            })
          }
        >
          Open a Bottom Right Toast
        </button>
      </div>
    </div>
  );
};
