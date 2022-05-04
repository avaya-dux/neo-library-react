import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import { ReactElement, useContext, useEffect } from "react";

import { Chip } from "components/Chip";
import { Keys } from "utils";

import { SelectContext } from "../utils/SelectContext";
import {
  InternalSelectOption,
  InternalSelectOptionProps,
} from "./InternalSelectOption";

export const SingleSelectSearchable = () => {
  const {
    downshiftProps,
    optionProps: { filteredOptions, noOptionsMessage },
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
    closeMenu,
    getComboboxProps,
    getInputProps,
    getMenuProps,
    getToggleButtonProps,
    inputValue,
    isOpen,
    reset,
    selectItem,
    selectedItem,
    setInputValue,
  } = downshiftProps as UseComboboxReturnValue<
    ReactElement<InternalSelectOptionProps>
  >;

  const { id, onKeyDown, ...restInputProps } = getInputProps();

  // clear the search when dropdown closes (when the user selects an item or clicks away)
  useEffect(() => {
    if (isOpen === false) {
      !isOpen && setInputValue("");
    }
  }, [isOpen, setInputValue]);

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
            {selectedItem.props.children}
          </Chip>
        )}

        <input
          {...restInputProps}
          className="neo-input"
          disabled={disabled}
          placeholder={placeholder}
          onKeyDown={(e) => {
            if (
              e.key === Keys.ENTER &&
              filteredOptions.length === 1 &&
              !filteredOptions[0].props.disabled
            ) {
              selectItem(filteredOptions[0]);
              closeMenu();
            } else if (e.key === Keys.BACKSPACE && inputValue.length === 0) {
              reset();
            }

            onKeyDown(e);
          }}
        />

        <input
          className="neo-display-none"
          id={id}
          readOnly
          tabIndex={-1}
          value={selectedItem?.props.value}
        />
      </span>

      <div className="neo-multiselect__content">
        <ul aria-label={ariaLabel} {...getMenuProps()}>
          {filteredOptions.length ? (
            filteredOptions.map((option, index) => (
              <InternalSelectOption
                {...option.props}
                index={index}
                key={index}
              />
            ))
          ) : (
            // TODO: BUG: this shouldn't be necessary
            <InternalSelectOption disabled index={0} key="no-available-options">
              {noOptionsMessage}
            </InternalSelectOption>
          )}
        </ul>
      </div>
    </div>
  );
};
