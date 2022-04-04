import clsx from "clsx";
import log from "loglevel";
import {
  Dispatch,
  forwardRef,
  isValidElement,
  MouseEventHandler,
  Ref,
  SetStateAction,
  useState,
} from "react";
import ReactDOM from "react-dom";
import { ButtonAction, ClosableAction, CounterAction } from "./Actions";
import { NotificationProps } from "./NotificationTypes";
const logger = log.getLogger("notification-logger");
logger.enableAll();
export const Notification = forwardRef(
  (
    {
      type,
      action,
      header,
      description,
      isElevated = false,
      ...rest
    }: NotificationProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const icon = "icon" in rest ? rest.icon : null;
    const [closed, setClosed] = useState(false);
    const internalAction = createAction(action, type, setClosed);
    const refCurrent =
      ref && "current" in ref && ref.current ? ref.current : document.body;
    logger.debug(refCurrent);
    return closed
      ? null
      : ReactDOM.createPortal(
          <div
            className={clsx(
              "neo-notification",
              `neo-notification--${type}`,
              isElevated && "neo-notification__elevated"
            )}
            role="alert"
            aria-live="polite"
          >
            <div
              className={clsx(
                "neo-notification__icon",
                icon && `neo-icon-${icon}`
              )}
            ></div>
            <div className="neo-notification__message">
              {header && (
                <div className="neo-notification__title">{header}</div>
              )}
              {description && (
                <div className="neo-notification__description">
                  {description}
                </div>
              )}
            </div>
            {internalAction}
          </div>,
          refCurrent
        );
  }
);

const createClickHandler = (
  setClosed: Dispatch<SetStateAction<boolean>>,
  callback?: MouseEventHandler<HTMLButtonElement>
) => {
  return (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setClosed(true);
    if (callback) {
      callback(event);
    }
  };
};
export function createAction(
  action: NotificationProps["action"],
  type: NotificationProps["type"],
  setClosed: Dispatch<SetStateAction<boolean>>
) {
  let internalAction = null;
  if (isValidElement(action)) {
    internalAction = action;
  } else if (
    !(action && typeof action === "object" && action.constructor === Object)
  ) {
    const handler = createClickHandler(setClosed);
    internalAction = <ClosableAction onClick={handler} />;
  } else if ("count" in action) {
    internalAction = <CounterAction count={action.count} />;
  } else if ("buttons" in action) {
    internalAction = <ButtonAction buttons={action.buttons} type={type} />;
  } else {
    const { onClick, ...rest } = action;
    const handler = createClickHandler(setClosed, onClick);
    internalAction = <ClosableAction onClick={handler} {...rest} />;
  }
  return internalAction;
}
