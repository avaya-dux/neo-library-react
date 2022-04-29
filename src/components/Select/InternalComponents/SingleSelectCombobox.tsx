import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import { useContext } from "react";

import { SelectContext } from "../utils/SelectContext";

export const SingleSelectCombobox = () => {
  const {
    children,
    downshiftProps,
    selectProps: {
      ariaLabel,
      disabled,
      helperId,
      helperText,
      loading,
      placeholder,
    },
  } = useContext(SelectContext);
  const {
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    isOpen,
  } = downshiftProps as UseComboboxReturnValue<string>;

  return (
    <div
      {...getComboboxProps?.()}
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

      <div className="neo-multiselect__content">
        <ul aria-label={ariaLabel} {...getMenuProps()}>
          {children}
        </ul>
      </div>
    </div>
  );
};
