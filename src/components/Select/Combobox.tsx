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
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { SelectProps } from "./SelectTypes";
import { SelectContext } from "./SelectContext";

import { useCombobox } from "downshift";

import { DownshiftWithComboboxProps } from "./DownshiftHooks";

/*

Issues:

How to use children?

*/

export const Combobox: FunctionComponent<SelectProps> = ({
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

  const [inputItems, setInputItems] = useState<string[]>(items);

  const helperId = useMemo(() => `helper-text-${id}`, [id]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = DownshiftWithComboboxProps(
    items,
    id,
    setInputItems,
    onSelectedValueChange
  );

  const context = {
    items,
    itemProps: getItemProps,
    selectedItems: inputItems,
    highlightedIndex,
  };

  const childrenWithProps = Children.map(children, (child, index) => (
    <SelectContext.Provider value={{ ...context, index }}>
      {child}
    </SelectContext.Provider>
  ));

  //   console.log(children);
  // console.log(childrenWithProps);
  // console.log(inputItems);

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      <label htmlFor={id} {...getLabelProps()}>
        {label}
      </label>
      <div
        {...getComboboxProps()}
        className={clsx(
          "neo-multiselect",
          disabled && "neo-multiselect--disabled",
          loading && "neo-select__spinner",
          isOpen && "neo-multiselect--active"
        )}
        aria-describedby={helperText && helperId}
        id={id}
      >
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label="toggle menu"
          className="neo-multiselect-combo__header"
          style={{ width: "100%", paddingLeft: loading && "32px" }}
        >
          <input
            {...getInputProps()}
            placeholder={placeholder}
            className="neo-input"
          />
        </button>
        <div className="neo-multiselect__content">
          <ul {...getMenuProps()}>
            {childrenWithProps?.map((child) => {
              console.log(child.props.children.props.children);
              if (inputItems.includes(child.props.children.props.children)) {
                return child;
              } else {
                return "";
              }
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
