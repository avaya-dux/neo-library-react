import log from "loglevel";
import { useEffect, useRef } from "react";
import { ToastOptions, usePopup } from "components/PopupManager";
const logger = log.getLogger("toast-logger");
logger.enableAll();
export { logger as toastLogger };
export const Toast = (props: ToastOptions) => {
  const { mounted, toast, remove } = usePopup(props.message);
  const toastRef = useRef<ReturnType<typeof toast>>();

  useEffect(() => {
    if (mounted) {
      logger.debug("creating toast");
      toastRef.current = toast(props);
    }
    return () => {
      if (toastRef.current) {
        logger.debug("removing toast");
        remove(toastRef.current.id, toastRef.current.position);
      }
    };
  }, [mounted, props]);
  return null;
};
