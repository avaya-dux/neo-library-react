import clsx from "clsx";
import {
  Children,
  FunctionComponent,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";

import { SelectProps, SelectContext } from "./SelectTypes";

import "./Select_shim.css";

import {
  DownshiftWithSelectProps,
  DownshiftWithMultipleSelectProps,
} from "./DownshiftHooks";

export const Select: FunctionComponent<SelectProps> = ({
  isMultipleSelect,
  label,
  placeholder = "Select One",
  id = genId(),
  disabled,
  errorList = [],
  helperText,
  loading = false,
  required,
  onSelectedValueChange,
  values,
  children = [],
}) => {
  if (!label) {
    handleAccessbilityError("Select requires a label prop");
  }

  const items: string[] = Array.isArray(children)
    ? children.map((child) => {
        if (isValidElement(child)) {
          return child.props.children.toString();
        } else {
          return " ";
        }
      })
    : Array.from(children.props.children.toString());

  const [selectedItems, setSelectedItems] = useState<string[]>(values || []);

  const helperId = useMemo(() => `helper-text-${id}`, [id]);

  const selectText = useMemo(
    () =>
      `${selectedItems.length > 0 ? selectedItems.join(", ") : placeholder}`,
    [selectedItems]
  );

  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getLabelProps,
    getToggleButtonProps,
  } = isMultipleSelect
    ? DownshiftWithMultipleSelectProps(
        items,
        id,
        loading,
        selectedItems,
        setSelectedItems,
        disabled
      )
    : DownshiftWithSelectProps(items, id, setSelectedItems);

  // bug here

  useEffect(() => {
    if (selectedItems.length > 0 && onSelectedValueChange)
      onSelectedValueChange(selectedItems);
  }, [selectedItems]);

  useEffect(() => {
    if (values) {
      setSelectedItems(values);
    }
  }, [values]);

  const context = {
    items,
    itemProps: getItemProps,
    selectedItems,
    highlightedIndex,
  };

  const childrenWithProps = Children.map(children, (child, index) => {
    const value = { ...context, index };

    if (isValidElement(child)) {
      return (
        <SelectContext.Provider value={value}>{child}</SelectContext.Provider>
      );
    }
    return child;
  });

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      <label {...getLabelProps()}>{label}</label>

      <div
        className={clsx(
          "neo-multiselect",
          disabled && "neo-multiselect--disabled",
          loading && "neo-select__spinner",
          isOpen && "neo-multiselect--active"
        )}
        aria-describedby={helperText && helperId}
      >
        <button
          className="neo-multiselect__header"
          {...getToggleButtonProps()}
          // TO-DO: Add this property to .neo-multiselect__header class to maintain styling when using button element instead of div
          style={{ width: "100%", paddingLeft: loading && "32px" }}
        >
          {selectText}
        </button>

        {isMultipleSelect ? (
          <div className="neo-multiselect__content" {...getMenuProps()}>
            {childrenWithProps}
          </div>
        ) : (
          <div className="neo-multiselect__content">
            <ul {...getMenuProps()}>{childrenWithProps}</ul>
          </div>
        )}
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
