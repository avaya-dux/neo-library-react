import log from "loglevel";
import { useEffect } from "react";
import { usePopup, ToastOptions } from "utils";
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
