import { Children, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { InternalSelect, InternalSelectOption } from "./InternalComponents";
import { SelectContext } from "./utils/SelectContext";
import { SelectProps } from "./utils/SelectTypes";
import { useDownshift } from "./utils/useDownshift";

import "./Select_shim.css";

export const Select = (props: SelectProps) => {
  const {
    "aria-label": ariaLabel,
    children = [],
    disabled = false,
    errorList = [],
    helperText = "",
    id = genId(),
    searchable = false,
    multiple = false,
    label = "",
    loading = false,
    noOptionsMessage = "No options available",
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
    searchable,
    multiple,
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
      Children.count(children) === 0
        ? [
            <InternalSelectOption disabled index={0} key="no-options">
              {noOptionsMessage}
            </InternalSelectOption>,
          ]
        : Children.map(children, (child, index) => (
            <InternalSelectOption {...child.props} index={index} key={index} />
          )),
    [children]
  );

  const { getLabelProps } = downshiftProps;

  const contextValue = {
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
      multiple,
      noOptionsMessage,
      options,
      selectedItems,
    },
  };

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      {label && <label {...getLabelProps()}>{label}</label>}

      <SelectContext.Provider value={contextValue}>
        <InternalSelect searchable={searchable} multiple={multiple} />
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
