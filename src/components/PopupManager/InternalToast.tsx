import clsx from "clsx";
import log from "loglevel";
import { IconNamesType } from "utils/icons";
import { useTimeout } from "utils/useTimeout";
import { PopupId, PopupPosition, ToastOptions } from "./PopupTypes";
const logger = log.getLogger("internal-toast-logger");
logger.disableAll();
export const InternalToast = ({
  id,
  position,
  message,
  duration = 5000,
  remove,
  ...rest
}: ToastOptions & {
  remove: (id: PopupId, position: PopupPosition) => void;
}) => {
  logger.debug("message is ", message);
  const icon = "icon" in rest ? rest.icon : undefined;
  const hide = () => {
    if (id && position) {
      remove(id, position);
    }
  };
  useTimeout(hide, duration);

  return <BasicToast {...{ message, icon }} />;
};
const BasicToast = ({
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
