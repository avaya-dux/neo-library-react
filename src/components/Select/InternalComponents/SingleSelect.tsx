import clsx from "clsx";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

export const SingleSelect = () => {
  const {
    children,
    downshiftProps: { getMenuProps, isOpen },
    selectProps: { ariaLabel, disabled, helperId, helperText, loading },
  } = useContext(SelectContext);

  return (
    <div
      aria-label={ariaLabel}
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <div className="neo-multiselect__content">
        <ul {...getMenuProps()}>{children}</ul>
      </div>
    </div>
  );
};
