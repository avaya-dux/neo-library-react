import { Children, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { InternalSelect, InternalSelectOption } from "./InternalComponents";
import { useDownshift } from "./utils/downshiftHooks";
import { SelectContext } from "./utils/SelectContext";
import { SelectProps } from "./utils/SelectTypes";

import "./Select_shim.css";

export const Select = (props: SelectProps) => {
  const {
    "aria-label": ariaLabel,
    children = [],
    disabled = false,
    errorList = [],
    helperText = "",
    id = genId(),
    isCombobox = false,
    isMultipleSelect = false,
    label = "",
    loading = false,
    onSelectedValueChange,
    placeholder = "Select One",
    required,
    values,
  } = props;

  if (!(label || ariaLabel)) {
    handleAccessbilityError("Select requires a label prop or aria-label");
  }

  const helperId = useMemo(() => `helper-text-${id}`, [id]);
  const isInitialRender = useIsInitialRender();

  const options = useMemo(
    () => Children.map(children, (child) => child.props.children),
    [children]
  );
  const [inputItems, setInputItems] = useState<string[]>(options);
  const [selectedItems, setSelectedItems] = useState<string[]>(values || []);
  const [controlledInputValue, setControlledInputValue] = useState<string>("");

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

  const downshiftProps = useDownshift(
    controlledInputValue,
    id,
    inputItems,
    isCombobox,
    isMultipleSelect,
    options,
    selectedItems,
    setControlledInputValue,
    setInputItems,
    setSelectedItems,
    disabled,
    loading,
    onSelectedValueChange
  );

  const internalChildren = useMemo(
    () =>
      Children.map(children, (child, index) => (
        <InternalSelectOption {...child.props} index={index} />
      )),
    [children]
  );

  const { getLabelProps } = downshiftProps;

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      {label && <label {...getLabelProps()}>{label}</label>}

      <SelectContext.Provider
        value={{
          children: internalChildren,
          downshiftProps,
          selectProps: {
            ariaLabel,
            disabled,
            helperId,
            helperText,
            loading,
            placeholder,
          },
          optionProps: {
            isMultipleSelect,
            options,
            selectedItems,
          },
        }}
      >
        <InternalSelect
          isCombobox={isCombobox}
          isMultipleSelect={isMultipleSelect}
        />
      </SelectContext.Provider>

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
