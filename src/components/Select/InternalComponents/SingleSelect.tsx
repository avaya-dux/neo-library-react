import clsx from "clsx";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

export const SingleSelect = () => {
  const {
    children,
    downshiftProps: { getMenuProps, getToggleButtonProps, isOpen },
    optionProps: { selectedItems },
    selectProps: {
      ariaLabel,
      disabled,
      helperId,
      helperText,
      loading,
      placeholder,
    },
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
      <button
        {...getToggleButtonProps()}
        className="neo-multiselect__header"
        type="button"
        style={{
          width: "100%",
          paddingLeft: loading && "32px",
          backgroundColor: loading && "#f1f1f1",
        }}
      >
        {selectedItems[0] || placeholder} {/* TODO: use Chips component */}
      </button>

      <div className="neo-multiselect__content">
        <ul aria-label={ariaLabel} {...getMenuProps()}>
          {children}
        </ul>
      </div>
    </div>
  );
};
