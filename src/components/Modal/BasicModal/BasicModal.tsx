import { FC, useEffect, useCallback } from "react";
import ReactDOM from "react-dom";
import { Button, ButtonProps } from "components/Button";
import "./BasicModal_shim.css";
import FocusLock from "react-focus-lock";

export interface BasicModalProps extends ButtonProps {
  open: boolean;
  onClose: () => void;
  title: string;
  closeButtonLabel?: string;
  actions?: JSX.Element[];
}

export const BasicModal: FC<BasicModalProps> = ({
  open,
  onClose,
  title,
  closeButtonLabel = "Close",
  children,
  ...rest
}) => {
  const buttons = "actions" in rest ? rest.actions : null;

  const onKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && open) {
        onClose();
      }
    },
    [open]
  );

  useEffect(() => {
    document.addEventListener("keyup", onKeyDown, false);
    return () => {
      document.removeEventListener("keyup", onKeyDown, false);
    };
  }, [open]);

  const modal = (
    <FocusLock>
      <div id="neo-modal-example" className="neo-modal--active">
        <div className="neo-modal__background"></div>
        <div
          className="neo-modal__content"
          aria-modal="true"
          aria-labelledby={title}
          role="dialog"
        >
          <div className="neo-modal__header">
            <h4>{title}</h4>
          </div>
          <div className="neo-modal__body">
            <div className="neo-modal__message">{children}</div>
          </div>
          <div className="neo-modal__footer">
            <Button variant="secondary" data-dismiss="modal" onClick={onClose}>
              {closeButtonLabel}
            </Button>
            {buttons}
          </div>
        </div>
      </div>
    </FocusLock>
  );
  return open ? ReactDOM.createPortal(modal, document.body) : null;
};
