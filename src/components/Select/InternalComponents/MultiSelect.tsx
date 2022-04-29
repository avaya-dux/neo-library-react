import clsx from "clsx";
import { useContext, useMemo } from "react";

import { SelectContext } from "../utils/SelectContext";

export const MultiSelect = () => {
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

  const selectedItemsText = useMemo(
    () => (selectedItems.length ? selectedItems.join(", ") : placeholder), // TODO: use Chips component
    [selectedItems, placeholder]
  );

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
        {selectedItemsText}
      </button>

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
