import clsx from "clsx";
import {
  Children,
  Fragment,
  FunctionComponent,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { SelectProps } from "./SelectTypes";
import { SelectContext } from "./SelectContext";

import "./Select_shim.css";

import {
  DownshiftWithSelectProps,
  DownshiftWithMultipleSelectProps,
  DownshiftWithComboboxProps,
  DownshiftWithComboboxMultipleSelectProps,
} from "./DownshiftHooks";
import { UseComboboxReturnValue } from "downshift";

/*

Turning loading into optional prop

*/

export const Select: FunctionComponent<SelectProps> = ({
  isMultipleSelect,
  isCombobox,
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
          loading,
          controlledInputValue,
          setControlledInputValue,
          selectedItems,
          setSelectedItems,
          inputItems,
          setInputItems,
          onSelectedValueChange,
          disabled
        )
      : DownshiftWithComboboxProps(
          items,
          id,
          loading,
          setSelectedItems,
          onSelectedValueChange,
          disabled
        )
    : isMultipleSelect
    ? DownshiftWithMultipleSelectProps(
        items,
        id,
        loading,
        selectedItems,
        setSelectedItems,
        disabled
      )
    : DownshiftWithSelectProps(
        items,
        id,
        loading,
        setSelectedItems,
        onSelectedValueChange,
        disabled
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
    .getComboboxProps
    ? (downshiftProps as UseComboboxReturnValue<string>).getComboboxProps
    : null;

  const getInputProps = (downshiftProps as UseComboboxReturnValue<string>)
    .getInputProps
    ? (downshiftProps as UseComboboxReturnValue<string>).getInputProps
    : null;

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
        {...(getComboboxProps && getComboboxProps())}
        className={clsx(
          "neo-multiselect",
          disabled && "neo-multiselect--disabled",
          loading && "neo-select__spinner",
          isOpen && "neo-multiselect--active"
        )}
        aria-describedby={helperText && helperId}
      >
        {isCombobox ? (
          <span {...getToggleButtonProps()} style={{ width: "100%" }}>
            <input
              {...(getInputProps && getInputProps())}
              placeholder={placeholder}
              className="neo-input"
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
          ></button>
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
