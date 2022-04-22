import clsx from "clsx";
import log from "loglevel";
import { useMemo } from "react";
import { IconNamesType } from "utils/icons";
import { useTimeout } from "utils/useTimeout";
import { PopupId, PopupPosition, ToastOptions } from "./PopupTypes";
const logger = log.getLogger("internal-toast-logger");
logger.disableAll();
type required = Required<Pick<ToastOptions, "id" | "position">>;
type optionals = Omit<ToastOptions, "id" | "position">;
type callbacks = { remove: (id: PopupId, position: PopupPosition) => void };
export interface InternalToastOptions extends required, optionals {}

export const InternalToast = ({
  id,
  position,
  message,
  duration = 5000,
  remove,
  ...rest
}: InternalToastOptions & callbacks) => {
  logger.debug("message is ", message);
  const icon = "icon" in rest ? rest.icon : undefined;
  const hide = () => {
    remove(id, position);
  };
  useTimeout(hide, duration);
  const ariaLabel = useMemo(() => {
    const seconds = Math.round(duration / 1000);
    return seconds + " " + (seconds > 1 ? "seconds" : "second");
  }, [duration]);
  return <BasicToast {...{ message, ariaLabel, icon }} />;
};
const BasicToast = ({
  message,
  ariaLabel,
  icon,
}: {
  message: string;
  ariaLabel: string;
  icon?: IconNamesType;
}) => {
  return (
    <div
      className="neo-toast"
      role="alert"
      aria-live="polite"
      aria-label={ariaLabel}
    >
      {icon && (
        <span className={clsx("neo-toast__icon", `neo-icon-${icon}`)}></span>
      )}
      {message && <div className="neo-toast__message">{message}</div>}
    </div>
  );
};
