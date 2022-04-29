import clsx from "clsx";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

export const MultiSelect = () => {
  const {
    children,
    downshiftProps: { getMenuProps, isOpen },
    selectProps: { disabled, helperId, helperText, loading },
  } = useContext(SelectContext);

  return (
    <div
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
      aria-describedby={helperText && helperId}
    >
      <div className="neo-multiselect__content" {...getMenuProps()}>
        {children}
      </div>
    </div>
  );
};
