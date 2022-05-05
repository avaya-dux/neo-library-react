import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import { ReactElement, useContext } from "react";

import { SelectContext } from "../utils/SelectContext";
import { InternalSelectOptionProps } from "./InternalSelectOption";

export const MultiSelectSearchable = () => {
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
  } = downshiftProps as UseComboboxReturnValue<
    ReactElement<InternalSelectOptionProps>
  >;

  return (
    <div
      {...getComboboxProps()}
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
      >
        <input
          {...getInputProps()}
          placeholder={placeholder}
          className="neo-input"
        />
      </span>

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
