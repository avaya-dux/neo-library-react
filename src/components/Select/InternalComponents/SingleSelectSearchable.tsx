import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import { useContext, useEffect } from "react";

import { Chip } from "components/Chip";

import { SelectContext } from "../utils/SelectContext";
import { InternalSelectOption } from "./InternalSelectOption";

export const SingleSelectSearchable = () => {
  const {
    children,
    downshiftProps,
    optionProps: { noOptionsMessage },
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
    inputValue,
    isOpen,
    reset,
    selectedItem,
    setInputValue,
  } = downshiftProps as UseComboboxReturnValue<string>;

  const { id, ...restInputProps } = getInputProps();

  useEffect(() => setInputValue(""), [selectedItem]);

  const displayedDropdownOptions = children.filter((child) =>
    child.props.children.toLowerCase().includes(inputValue.toLowerCase())
      ? child
      : null
  );

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
        className="neo-multiselect-combo__header"
      >
        {selectedItem && (
          <Chip onClick={reset} closable>
            {selectedItem}
          </Chip>
        )}

        <input
          {...restInputProps}
          className="neo-input"
          disabled={disabled}
          placeholder={placeholder}
        />

        <input
          className="neo-display-none"
          id={id}
          readOnly
          tabIndex={-1}
          value={selectedItem || ""}
        />
      </span>

      <div className="neo-multiselect__content">
        <ul aria-label={ariaLabel} {...getMenuProps()}>
          {displayedDropdownOptions.length ? (
            displayedDropdownOptions
          ) : (
            <InternalSelectOption disabled index={0} key="no-options">
              {noOptionsMessage}
            </InternalSelectOption>
          )}
        </ul>
      </div>
    </div>
  );
};
