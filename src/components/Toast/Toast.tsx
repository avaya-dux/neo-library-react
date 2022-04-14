import clsx from "clsx";
import log from "loglevel";
import { useEffect, useState } from "react";
import { IconNamesType, useTimeout } from "utils";
import { usePopup } from "../../utils/PopupManager/Popup";
import { ToastOptions } from "../../utils/PopupManager/PopupTypes";
const logger = log.getLogger("toast-logger");
logger.disableAll();

export const Toast = (props: ToastOptions) => {
  const { toast, remove } = usePopup();
  useEffect(() => {
    const { id, position } = toast(props) || {};
    return () => {
      if (id && position) {
        logger.debug("unloading toast...", id, position);
        remove(id, position);
      }
    };
  }, [props]);

  return null;
};
export const InternalToast = ({
  id,
  position,
  message,
  duration = 5000,
  ...rest
}: ToastOptions) => {
  logger.debug("message is ", message);
  const { remove } = usePopup();
  const icon = "icon" in rest ? rest.icon : undefined;
  const [closed, setClosed] = useState(false);
  const hide = () => {
    id && position && remove(id, position);
    setClosed(true);
  };
  useTimeout(hide, duration);

  return closed ? null : <BasicToast {...{ message, icon }} />;
};
export const BasicToast = ({
  message,
  icon,
}: {
  message: string;
  icon?: IconNamesType;
}) => {
  return (
    <div className="neo-toast" role="alert" aria-live="polite">
      {icon && (
        <span className={clsx("neo-toast__icon", `neo-icon-${icon}`)}></span>
      )}
      {message && <div className="neo-toast__message">{message}</div>}
    </div>
  );
};
