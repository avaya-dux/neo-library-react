import { FC, useEffect, KeyboardEvent, useCallback } from "react";
import ReactDOM from "react-dom";
import { Button, ButtonProps } from "components/Button";
import "./BasicModal_shim.css";
import FocusLock from "react-focus-lock";

export interface BasicModalProps extends ButtonProps {
  open: boolean;
  onClose: () => void;
  title: string;
  clsebtn?: string;
  ariaLabelClose?: string;
  actions?: JSX.Element[];
}

export const BasicModal: FC<BasicModalProps> = ({
  open,
  onClose,
  title,
  clsebtn = "close",
  children,
  ariaLabelClose = "button to close modal",
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
      <div
        id="neo-modal-example"
        data-testid="neo-modal-example"
        className="neo-modal--active"
      >
        <div className="neo-modal__background"></div>
        <div
          className="neo-modal__content"
          aria-modal="true"
          aria-labelledby={title}
          tabIndex={-1}
          role="dialog"
        >
          <div className="neo-modal__header">
            <h4>{title}</h4>
          </div>
          <div className="neo-modal__body">
            <div className="neo-modal__message">{children}</div>
          </div>
          <div className="neo-modal__footer">
            {buttons}
            <Button
              variant="primary"
              data-dismiss="modal"
              aria-label={ariaLabelClose}
              onClick={onClose}
            >
              {clsebtn}
            </Button>
          </div>
        </div>
      </div>
    </FocusLock>
  );
  return open ? ReactDOM.createPortal(modal, document.body) : null;
};
