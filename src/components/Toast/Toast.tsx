import log from "loglevel";
import { RefObject, useEffect } from "react";
import { PopupManager, ToastOptions } from "utils";
const logger = log.getLogger("toast-logger");
logger.enableAll();

export const Toast = (
  props: ToastOptions & { managerRef?: RefObject<PopupManager> }
) => {
  const { managerRef, ...toastOptions } = props;
  useEffect(() => {
    const { toast, remove } = managerRef?.current || {};
    const { id, position } = (toast && toast(toastOptions)) || {};
    return () => {
      if (id && position && remove) {
        logger.debug("unloading toast...", id, position);
        remove(id, position);
      }
    };
  }, [managerRef?.current]);

  return null;
};
