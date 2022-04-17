import { useRef, useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { PopupManager, ToastOptions } from ".";
import log from "loglevel";
const logger = log.getLogger("local-popup-hook-logger");
logger.enableAll();
export { logger as localPopupHookLogger };
// works in all but one case: user creates more than one <toast> without calling this hook explicitly.
// it does not work as the instance is not shared.
export const useLocalPopup = () => {
  const container = useMemo(() => document.createElement("div"), []);
  const managerRef = useRef<PopupManager | null>(null);
  const [mounted, setMounted] = useState(false);
  const toastInit: PopupManager["toast"] = (toastOptions: ToastOptions) => {
    logger.error(
      "You called this toast before popup manager is ready with",
      toastOptions
    );
    return { id: -1, position: "top" };
  };
  const [toast, settoast] = useState<PopupManager["toast"]>(() => toastInit);
  const [notify, setnotify] = useState<PopupManager["notify"]>();
  const [remove, setremove] = useState<PopupManager["remove"]>();
  const [removeAll, setremoveAll] = useState<PopupManager["removeAll"]>();

  useEffect(() => {
    document.body.appendChild(container);
    ReactDOM.render(
      <PopupManager ref={managerRef}></PopupManager>,
      container,
      () => {
        logger.debug("popup manager is mounted...");
        settoast(() => managerRef.current!.toast);
        setnotify(() => managerRef.current!.notify);
        setremove(() => managerRef.current!.remove);
        setremoveAll(() => managerRef.current!.removeAll);
        setMounted(true);
      }
    );
    return () => {
      logger.debug("popup hook removing container");
      document.body.removeChild(container);
    };
  }, [container, setMounted]);

  return { mounted, managerRef, toast, notify, remove, removeAll };
};
