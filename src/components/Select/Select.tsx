import { Children, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";
import { useIsInitialRender } from "utils/hooks/useIsInitialRender";

import { InternalSelect } from "./InternalComponents";
import { SelectContext } from "./utils/SelectContext";
import { SelectOptionProps, SelectProps } from "./utils/SelectTypes";
import { useDownshift } from "./utils/useDownshift";

import "./Select_shim.css";

/**
 * The `Select` component allows the user to select one or more options from a list
 * of `SelectOption`.
 *
 * @example
  <Select
    label="Select a favorite food"
    onSelectedValueChange={handleSelectedValueChange}
  >
    <SelectOption>Apple</SelectOption>
    <SelectOption helperText="Vegetable">Broccoli</SelectOption>
    <SelectOption>Banana</SelectOption>
    <SelectOption>Pear</SelectOption>
  </Select>
 *
 * @example
  <Select
    label="Select multiple foods"
    multiple
    searchable
    selectedValues={["Apple"]}
  >
    <SelectOption>Apple</SelectOption>
    <SelectOption helperText="Not a Food" disabled>
      Gravel
    </SelectOption>
    <SelectOption helperText="Vegetable">Broccoli</SelectOption>
    <SelectOption>Banana</SelectOption>
    <SelectOption>Pear</SelectOption>
  </Select>
 *
 * @see https://design.avayacloud.com/components/web/select-web
 * @see https://neo-library-react-storybook.netlify.app/?path=/story/components-select
 */
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
    selectedValues,
  } = props;

  if (!(label || ariaLabel)) {
    handleAccessbilityError("Select requires a label prop or aria-label");
  }

  const helperId = useMemo(() => `helper-text-${id}`, [id]);
  const isInitialRender = useIsInitialRender();

  const options = useMemo(
    () => Children.map(children, (child) => child.props),
    [children]
  );
  const [filteredOptions, setFilteredOptions] = useState(options);
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const [selectedItems, setSelectedItems] = useState<SelectOptionProps[]>([]);

  // TODO: update to _not_ use `selectedValues` and use `children.props.selected` (triggering on `children`)
  useEffect(() => {
    if (selectedValues) {
      const userSelectedOptions = options.filter(
        (option) => option.value && selectedValues.includes(option.value)
      );
      setSelectedItems(userSelectedOptions);
    }
  }, [selectedValues]);

  useEffect(() => {
    if (!isInitialRender && onSelectedValueChange) {
      if (multiple) {
        const newlySelectedValues = selectedItems.map(
          (item) => item.value as string
        );

        onSelectedValueChange(newlySelectedValues);
      } else {
        onSelectedValueChange(selectedItems[0].value as string);
      }
    }
  }, [selectedItems]);

  const downshiftProps = useDownshift(
    disabled,
    id,
    loading,
    multiple,
    searchable,
    options,
    filteredOptions,
    setFilteredOptions,
    selectedItems,
    setSelectedItems
  );

  const { getLabelProps } = downshiftProps;

  const contextValue = {
    downshiftProps,
    selectProps: {
      ariaLabel,
      disabled,
      filteredOptions,
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
