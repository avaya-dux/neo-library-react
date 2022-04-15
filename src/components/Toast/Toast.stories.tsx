import { Meta, Story } from "@storybook/react/types-6-0";
import { ToastOptions, usePopup } from "components/PopupManager";
import { IconNames } from "utils";
import { Toast, toastLogger as logger } from "./Toast";
import { Button } from "components/Button";

const ToastTemplate: Story<ToastOptions> = (props) => {
  return <Toast {...props} />;
};

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

export const Default = ToastTemplate.bind({});
Default.args = {
  message: "Default toast, positoned top and center, for 5 seconds",
};
export const IconBottomCenter = ToastTemplate.bind({});
IconBottomCenter.args = {
  message: "Toast, positoned bottom and center, for 5 seconds",
  icon: "align-bottom",
  position: "bottom",
};
export const InteractiveToasts = () => {
  const { mounted, toast } = usePopup();

  const duration = 5000;
  return !mounted ? (
    <div>not ready</div>
  ) : (
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
        <Button
          onClick={() => {
            logger.debug(toast);
            toast({
              message: "Top-left Toast",
              duration,
              position: "top-left",
            });
          }}
        >
          Open a Top Left Toast
        </Button>
        <Button
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
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Top-right Toast",
              duration,
              position: "top-right",
            })
          }
        >
          Open a Top Right Toast
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Bottom-left Toast",
              duration,
              position: "bottom-left",
            })
          }
        >
          Open a Bottom Left Toast
        </Button>
        <Button
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
        </Button>
        <Button
          onClick={() =>
            toast({
              message: "Bottom-right Toast",
              duration,
              position: "bottom-right",
            })
          }
        >
          Open a Bottom Right Toast
        </Button>
      </div>
    </div>
  );
};
