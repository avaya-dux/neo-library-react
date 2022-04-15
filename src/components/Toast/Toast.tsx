import log from "loglevel";
import { useEffect } from "react";
import { ToastOptions, usePopup } from "components/PopupManager";
const logger = log.getLogger("toast-logger");
logger.enableAll();
export { logger as toastLogger };
export const Toast = (props: ToastOptions) => {
  const { mounted, toast } = usePopup();
  useEffect(() => {
    mounted && toast(props);
  }, [mounted, toast, props]);
  return null;
};
