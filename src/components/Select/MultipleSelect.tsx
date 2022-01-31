import clsx from "clsx";
import { useMultipleSelection, useSelect } from "downshift";
import {
  Children,
  cloneElement,
  FunctionComponent,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";

import { MultipleSelectItem, MultipleSelectProps } from "./SelectTypes";

export const MultipleSelect: FunctionComponent<MultipleSelectProps> = ({
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
  children,
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
  } = useSelect({
    items: itemsText,
    id,
    isOpen: disabled && false,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
  });

  // useEffect(() => {
  //   if (onSelectedValueChange && selectedItems.length > 0)
  //     onSelectedValueChange(selectedItems);
  // }, [selectedItem]);

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (isValidElement(child)) {
      return cloneElement(child, {
        items: items,
        menuProps: getMenuProps,
        itemProps: getItemProps,
        highlightedIndex,
      });
    }
    return child;
  });

  console.log(isOpen);

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

        {childrenWithProps}
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

type MultipleSelectOptionProps = {
  items: MultipleSelectItem[];
  menuProps: any;
  itemProps: any;
  highlightedIndex: number;
};

export const MultipleSelectOption: FunctionComponent<
  MultipleSelectOptionProps
> = ({ items, menuProps, itemProps, highlightedIndex }) => {
  console.log(items);
  return (
    <div className="neo-multiselect__content" {...menuProps()}>
      {!!items &&
        items.map((item, index) => {
          const { text, disabled, helperText } = item;

          const MultiSelectOption = (
            <>
              <input
                className="neo-check"
                type="checkbox"
                disabled={disabled}
              />
              <label
                key={`${text}${index}`}
                {...itemProps({ item: text, index })}
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#e8f1fc" }
                    : {}
                }
                htmlFor="checkgroup2"
              >
                {text}
              </label>
            </>
          );

          return helperText ? (
            <div className="neo-input-group">
              {MultiSelectOption}
              <p className="neo-input-hint" id="check-hint-1">
                {helperText}
              </p>
            </div>
          ) : (
            <>{MultiSelectOption}</>
          );
        })}
    </div>
  );
};
