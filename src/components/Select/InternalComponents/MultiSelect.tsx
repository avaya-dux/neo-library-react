import clsx from "clsx";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

export const MultiSelect = () => {
  const {
    children,
    downshiftProps: { getMenuProps, isOpen },
    selectProps: { ariaLabel, disabled, helperId, helperText, loading },
  } = useContext(SelectContext);

  return (
    <div
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <div
        aria-label={ariaLabel}
        className="neo-multiselect__content"
        {...getMenuProps()}
      >
        {children}
      </div>
    </div>
  );
};
