import * as React from "react";
import { InternalToast } from "../../components/Toast/Toast";
import log from "loglevel";

import type {
  NotificationOptions,
  ToastOptions,
  PopupId,
  PopupPosition,
  PopupState as State,
  PopupOptions,
} from "./PopupTypes";
import { findPopup, getAlignStyle } from "./PopupUtils";

const logger = log.getLogger("popup-manager-logger");
logger.disableAll();

type Dict<T = any> = Record<string, T>;
const objectKeys = <T extends Dict>(obj: T) =>
  Object.keys(obj) as unknown as (keyof T)[];

export interface PopupManagerMethods {
  toast: (options: ToastOptions) => { id: PopupId; position: PopupPosition };
  notify: (options: NotificationOptions) => {
    id: PopupId;
    position: PopupPosition;
  };
  remove: (id: PopupId, position: PopupPosition) => void;
  removeAll: () => void;
  setZIndex: (zIndex: number) => void;
}

interface Props {
  bind: (methods: PopupManagerMethods) => void;
}

/**
 * Manages the creation, and removal of popups
 * across all corners ("top", "bottom", etc.)
 */
export class PopupManager extends React.Component<Props, State> {
  static counter = 0;

  state: State = {
    zIndex: 5500,
    positions: {
      top: [],
      "top-left": [],
      "top-right": [],
      "bottom-left": [],
      bottom: [],
      "bottom-right": [],
    },
  };

  constructor(props: Props) {
    super(props);

    const methods = {
      toast: this.toast,
      remove: this.remove,
      notify: this.notify,
      removeAll: this.removeAll,
      setZIndex: this.setZIndex,
    };

    props.bind(methods);
  }

  setZIndex = (zIndex: number) => {
    this.setState((prevState) => {
      const ret = {
        positions: { ...prevState.positions },
        zIndex,
      };
      logger.debug(`setZIndex: state after`, ret);
      return ret;
    });
  };

  private addPopup = (position: PopupPosition, notification: PopupOptions) => {
    this.setState((prevPopups) => {
      const isTop = position.includes("top");
      const popups = isTop
        ? [notification, ...prevPopups.positions[position]]
        : [...prevPopups.positions[position], notification];

      const ret = {
        zIndex: prevPopups.zIndex,
        positions: {
          ...prevPopups.positions,
          [position]: popups,
        },
      };

      logger.debug(`notify: state after update at ${position} is `, ret);
      return ret;
    });
  };

  notify = (options: NotificationOptions) => {
    logger.debug("notify in popup manager called with ", options.id);
    PopupManager.counter += 1;
    const id = options.id ?? PopupManager.counter;
    const position = options.position ?? "top";
    const notification = { id, node: options.node, position };
    logger.debug(
      `notify: state before update at ${position} is `,
      this.state.positions[position]
    );
    this.addPopup(position, notification);
    logger.debug("notify returns ", { id, position });
    return { id, position };
  };

  /**
   * Function to actually create a toast and add it
   * to state at the specified position
   */
  toast = (options: ToastOptions) => {
    logger.debug("toast in popup manager called with ", options);
    const toast = this.createToast(options);
    const { position, id } = toast;

    this.addPopup(position, toast);

    return { id, position };
  };

  /**
   * Create properties for a new toast
   */
  createToast = (options: ToastOptions) => {
    PopupManager.counter += 1;
    const id = options.id ?? PopupManager.counter;

    const position = options.position ?? "top";

    return {
      id,
      message: options.message,
      icon: options.icon,
      position,
      duration: options.duration,
    };
  };

  /**
   * Delete a popup at its position
   */
  remove = (id: PopupId, position: PopupPosition) => {
    logger.debug(`removing popup, ${id}, at position, ${position}`);
    logger.debug("state before removing", this.state[position]);
    this.setState((prevPopups) => {
      const filtered = prevPopups.positions[position].filter(
        // id may be string or number
        // eslint-disable-next-line eqeqeq
        (popup) => popup.id != id
      );
      const ret = {
        zIndex: prevPopups.zIndex,
        positions: {
          ...prevPopups.positions,
          [position]: filtered,
        },
      };

      return ret;
    });
    logger.debug("state after removing", this.state[position]);
  };

  /**
   * Remove all popups at once.
   */
  removeAll = () => {
    this.setState((prevState) => {
      return {
        zIndex: prevState.zIndex,
        positions: {
          top: [],
          "top-left": [],
          "top-right": [],
          "bottom-left": [],
          bottom: [],
          "bottom-right": [],
        },
      };
    });
  };

  isVisible = (id: PopupId) => {
    const { position } = findPopup(this.state.positions, id);
    return Boolean(position);
  };

  /**
   * Compute the style of a popup based on its position
   */
  getContainerStyle = (position: PopupPosition): React.CSSProperties => {
    const isTopOrBottom = position === "top" || position === "bottom";
    const margin = isTopOrBottom ? "0 auto" : undefined;

    const top = position.includes("top")
      ? "env(safe-area-inset-top, 0px)"
      : undefined;
    const bottom = position.includes("bottom")
      ? "env(safe-area-inset-bottom, 0px)"
      : undefined;
    const right = !position.includes("left")
      ? "env(safe-area-inset-right, 0px)"
      : undefined;
    const left = !position.includes("right")
      ? "env(safe-area-inset-left, 0px)"
      : undefined;

    return {
      position: "fixed",
      zIndex: this.state.zIndex,
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      flexWrap: position.includes("right") ? "wrap-reverse" : "wrap",
      maxHeight: "25vh",
      margin,
      top,
      bottom,
      right,
      left,
      ...getAlignStyle(position),
    };
  };

  render() {
    return objectKeys(this.state.positions).map((position) => {
      const popupOptions = this.state.positions[position];
      return (
        <ul
          key={position}
          id={`neo-popup-manager-${position}`}
          style={this.getContainerStyle(position)}
        >
          {popupOptions.map((popupOption, index) => {
            if ("node" in popupOption) {
              const notificaiton =
                popupOption as unknown as NotificationOptions;
              return (
                <div key={`${notificaiton.id}-${index}`}>
                  {notificaiton.node}
                </div>
              );
            }
            return (
              <InternalToast
                key={`${popupOption.id}-${index}`}
                {...(popupOption as ToastOptions)}
              />
            );
          })}
        </ul>
      );
    });
  }
}