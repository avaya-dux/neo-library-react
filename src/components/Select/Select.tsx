import clsx from "clsx";
import { useSelect } from "downshift";
import { FunctionComponent, useEffect, useMemo } from "react";

import { NeoInputWrapper } from "components";

import { SelectProps } from "./SelectTypes";

import { genId, handleAccessbilityError } from "utils/accessibilityUtils";

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
    handleAccessbilityError("SelectNative requires a label prop");
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
        aria-describedby={helperId}
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
                  key={`${text}${index}`}
                  {...getItemProps({ item: text, index })}
                  disabled={disabled}
                >
                  {item.text}
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
