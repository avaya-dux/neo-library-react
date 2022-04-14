import log from "loglevel";
import { render } from "react-dom";
import { PopupManager, PopupManagerMethods } from "./PopupManager";
import type {
  NotificationOptions,
  PopupId,
  PopupPosition,
  ToastOptions,
} from "./PopupTypes";

const portalId = "popup-portal";
const logger = log.getLogger("popup-portal-logger");
logger.disableAll();
class Portal {
  private createToast?: PopupManagerMethods["toast"];
  private removePopup?: PopupManagerMethods["remove"];
  private createNotification?: PopupManagerMethods["notify"];
  private removeAllPopups?: PopupManagerMethods["removeAll"];
  private updateZIndex?: PopupManagerMethods["setZIndex"];

  /**
   * Initialize the manager and mount it in the DOM
   * inside the portal node.
   */
  constructor() {
    let portal: HTMLElement;
    const existingPortal = document.getElementById(portalId);

    if (existingPortal) {
      portal = existingPortal;
    } else {
      const div = document.createElement("div");
      div.id = portalId;
      document.body?.appendChild(div);
      portal = div;
    }

    render(<PopupManager bind={this.bindFunctions} />, portal);
  }

  private bindFunctions = (methods: PopupManagerMethods) => {
    this.createToast = methods.toast;
    this.removePopup = methods.remove;
    this.createNotification = methods.notify;
    this.removeAllPopups = methods.removeAll;
    this.updateZIndex = methods.setZIndex;
  };

  toast = (options: ToastOptions) => this.createToast?.(options);

  remove = (id: PopupId, positon: PopupPosition) =>
    this.removePopup?.(id, positon);

  notify = (options: NotificationOptions) => this.createNotification?.(options);

  removeAll = () => this.removeAllPopups?.();

  setZIndex = (zIndex: number) => this.updateZIndex?.(zIndex);
}
const portal = new Portal();

export const usePopup = () => {
  return {
    toast: portal.toast,
    notify: portal.notify,
    remove: portal.remove,
    removeAll: portal.removeAll,
    setZIndex: portal.setZIndex,
  };
};
