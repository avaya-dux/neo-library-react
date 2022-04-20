import clsx from "clsx";
import { UseComboboxReturnValue } from "downshift";
import {
  Children,
  Fragment,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import {
  DownshiftWithComboboxMultipleSelectProps,
  DownshiftWithComboboxProps,
  DownshiftWithMultipleSelectProps,
  DownshiftWithSelectProps,
} from "./DownshiftHooks";
import { SelectContext } from "./SelectContext";
import { SelectProps } from "./SelectTypes";

import "./Select_shim.css";

export const Select = ({
  children = [],
  disabled,
  errorList = [],
  helperText,
  id = genId(),
  isCombobox,
  isMultipleSelect,
  label,
  loading = false,
  onSelectedValueChange,
  placeholder = "Select One",
  required,
  values,
}: SelectProps) => {
  if (!label) {
    handleAccessbilityError("Select requires a label prop");
  }

  const isInitialRender = useIsInitialRender();

  const items: string[] = useMemo(
    () =>
      Array.isArray(children)
        ? children.map((child) => {
            if (isValidElement(child)) {
              return child.props.children.toString();
            } else {
              return " ";
            }
          })
        : Array.from(children.props.children.toString()),
    [children]
  );

  const [selectedItems, setSelectedItems] = useState<string[]>(values || []);

  const [controlledInputValue, setControlledInputValue] = useState<string>("");

  const [inputItems, setInputItems] = useState<string[]>(items);

  const helperId = useMemo(() => `helper-text-${id}`, [id]);

  const selectText = useMemo(
    () =>
      `${selectedItems.length > 0 ? selectedItems.join(", ") : placeholder}`,
    [selectedItems]
  );

  const downshiftProps = isCombobox
    ? isMultipleSelect
      ? DownshiftWithComboboxMultipleSelectProps(
          items,
          id,
          controlledInputValue,
          setControlledInputValue,
          selectedItems,
          setSelectedItems,
          inputItems,
          setInputItems,
          disabled,
          loading
        )
      : DownshiftWithComboboxProps(
          items,
          id,
          setSelectedItems,
          setInputItems,
          onSelectedValueChange,
          disabled,
          loading
        )
    : isMultipleSelect
    ? DownshiftWithMultipleSelectProps(
        items,
        id,
        selectedItems,
        setSelectedItems,
        disabled,
        loading
      )
    : DownshiftWithSelectProps(
        items,
        id,
        setSelectedItems,
        onSelectedValueChange,
        disabled,
        loading
      );

  const {
    isOpen,
    highlightedIndex,
    getMenuProps,
    getItemProps,
    getLabelProps,
    getToggleButtonProps,
  } = downshiftProps;

  const getComboboxProps = (downshiftProps as UseComboboxReturnValue<string>)
    .getComboboxProps;

  const getInputProps = (downshiftProps as UseComboboxReturnValue<string>)
    .getInputProps;

  useEffect(() => {
    if (values) {
      setSelectedItems(values);
    }
  }, [values]);

  useEffect(() => {
    if (!isInitialRender && onSelectedValueChange) {
      onSelectedValueChange(selectedItems);
    }
    setControlledInputValue(`${selectedItems.join(", ")}`);
  }, [selectedItems]);

  const context = {
    isMultipleSelect,
    items,
    itemProps: getItemProps,
    selectedItems,
    highlightedIndex,
  };

  const childrenWithProps = Children.map(children, (child, index) => (
    <SelectContext.Provider value={{ ...context, index }}>
      {child}
    </SelectContext.Provider>
  ));

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      <label {...getLabelProps()}>{label}</label>

      <div
        {...getComboboxProps?.()}
        className={clsx(
          "neo-multiselect",
          disabled && "neo-multiselect--disabled",
          loading && "neo-select__spinner",
          isOpen && "neo-multiselect--active"
        )}
        aria-describedby={helperText && helperId}
      >
        {isCombobox ? (
          <span
            {...getToggleButtonProps()}
            className={
              isCombobox
                ? "neo-multiselect-combo__header"
                : "neo-multiselect__header"
            }
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
        ) : (
          <button
            {...getToggleButtonProps()}
            className={
              isCombobox
                ? "neo-multiselect-combo__header"
                : "neo-multiselect__header"
            }
            type="button"
            // TO-DO: Add this property to .neo-multiselect__header class to maintain styling when using button element instead of div
            style={{
              width: "100%",
              paddingLeft: loading && "32px",
              backgroundColor: loading && "#f1f1f1",
            }}
          >
            {selectText}
          </button>
        )}

        {isCombobox ? (
          isMultipleSelect ? (
            <div className="neo-multiselect__content" {...getMenuProps()}>
              {childrenWithProps?.map((child, index) => {
                if (inputItems.includes(child.props.children.props.children)) {
                  return <Fragment key={index}>{child}</Fragment>;
                } else {
                  return null;
                }
              })}
            </div>
          ) : (
            <div className="neo-multiselect__content">
              <ul {...getMenuProps()}>
                {childrenWithProps?.map((child, index) => {
                  if (
                    inputItems.includes(child.props.children.props.children)
                  ) {
                    return <Fragment key={index}>{child}</Fragment>;
                  } else {
                    return null;
                  }
                })}
              </ul>
            </div>
          )
        ) : isMultipleSelect ? (
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
