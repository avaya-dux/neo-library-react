import log from "loglevel";
import { useEffect } from "react";
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
