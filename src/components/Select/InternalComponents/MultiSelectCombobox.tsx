import clsx from "clsx";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

export const MultiSelectCombobox = () => {
  const {
    children,
    downshiftProps: {
      getComboboxProps,
      getInputProps,
      getMenuProps,
      getToggleButtonProps,
      isOpen,
    },
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
      {...getComboboxProps?.()}
      aria-label={ariaLabel}
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <span
        {...getToggleButtonProps()}
        className={"neo-multiselect-combo__header"}
        style={{
          width: "100%",
          paddingLeft: loading && "32px",
          backgroundColor: loading && "#f1f1f1",
        }}
      >
        <input
          {...getInputProps?.()}
          placeholder={placeholder}
          className="neo-input"
          style={{
            paddingLeft: loading && "0px",
          }}
        />
      </span>

      <div className="neo-multiselect__content" {...getMenuProps()}>
        {children}
      </div>
    </div>
  );
};
