import clsx from "clsx";
import { useSelect } from "downshift";
import { FunctionComponent, useEffect, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";

import { SelectProps } from "./SelectTypes";

/**
 * Select allows end-users to choose one option from a list.
 *
 * @example
 const label = "Example label"
 const items: SelectItem[] = [
  { text: "Option 1" },
  { text: "Option 2", disabled: true },
  { text: "Option 3" },
];

<Select label={label} items={items} />
};
 * @see https://design.avayacloud.com/components/web/select-web
 */

export const Select: FunctionComponent<SelectProps> = ({
  label,
  items,
  placeholder = "Select One",
  id = genId(),
  disabled,
  errorList = [],
  helperText,
  loading = false,
  required,
  onSelectedValueChange,
}) => {
  if (!label) {
    handleAccessbilityError("Select requires a label prop");
  }
  const itemsText: string[] = items.map((item) => item.text);

  const helperId = useMemo(() => `helper-text-${id}`, [id]);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useSelect({ items: itemsText, id, isOpen: disabled && false });

  useEffect(() => {
    if (onSelectedValueChange && selectedItem)
      onSelectedValueChange(selectedItem);
  }, [selectedItem]);

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      <label {...getLabelProps()}>{label}</label>

      <div
        {...getToggleButtonProps()}
        className={clsx(
          "neo-multiselect",
          disabled && "neo-multiselect--disabled",
          loading && "neo-select__spinner",
          isOpen && "neo-multiselect--active"
        )}
        aria-describedby={helperText && helperId}
      >
        <div className="neo-multiselect__header">
          {selectedItem || placeholder}
        </div>

        <div className="neo-multiselect__content">
          <ul {...getMenuProps()}>
            {items.map((item, index) => {
              const { text, disabled } = item;
              return (
                <li
                  // TO-DO: Replace inline styles here with focus styles for Select options in Neo CSS library
                  style={
                    highlightedIndex === index
                      ? { backgroundColor: "#e8f1fc" }
                      : {}
                  }
                  key={`${text}${index}`}
                  {...getItemProps({ item: text, index })}
                  disabled={disabled}
                >
                  {text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {helperText && (
        <div className="neo-input-hint" id={helperId}>
          {helperText}
        </div>
      )}

      {errorList.length > 0 &&
        errorList?.map((text, index) => (
          <div className="neo-input-hint" key={`error-text-${index}`}>
            {text}
          </div>
        ))}
    </NeoInputWrapper>
  );
};
