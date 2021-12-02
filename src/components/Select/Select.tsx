import { createRef, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";

import {
  SelectOnBlurHandler,
  SelectOnKeyDownHandler,
} from "./EventHandlers/KeyboardEventHandlers";
import {
  displayErrorOrHelper,
  getDefaultOption,
  getOptionValue,
} from "./helper/helper";
import { Options } from "./Options/Options";
import { OptionType, SelectProps } from "./SelectTypes";

/**
 * Select will use the <ul> <li> HTML structure.
 *
 * @example
 *  <Select
        label="List of States"
        onChange={(value) => {
          console.log("select value-> ", value);
        }}
        helperText={["Please choose a State"]}
        options={[
          { label: "Alabama", value: "AL" },
          { label: "Alaska", value: "AK" },
          { label: "Arizona", value: "AZ" },
        ]}
      />
 * @see https://design.avayacloud.com/components/web/select-web
 */

export const Select = ({
  className,
  disabled,
  errorMessages,
  helperMessages,
  id,
  isLoading,
  isMultipleSelect = false,
  label,
  loaderText = "Loading...",
  onChange,
  options,
  required,
  value,
}: SelectProps) => {
  const labelId = useMemo(
    () => `neo-select-label-id-${label.replace(/\s/g, "")}`,
    [label]
  );
  const selectId = useMemo(
    () => id || `neo-select-id-${label.replace(/\s/g, "")}`,
    [id, label]
  );

  const listBoxRef: React.Ref<HTMLDivElement> = createRef();

  const [isOpen, updateIsOpen] = useState(false);
  const [hoveredIndex, updateHoveredIndex] = useState(0);

  const defaultSelected = getDefaultOption(options);

  const [selectedOptions, updateSelectedOptions] =
    useState<OptionType[]>(defaultSelected);

  const selectClassName = useMemo(() => {
    return getSelectClassNames(isOpen, disabled, isLoading);
  }, [isOpen, disabled, isLoading]);

  useEffect(() => {
    if (value) {
      const selected = getOptionValue(options, value);
      updateSelectedOptions(selected);
    }
  }, [value, options]);

  const setSelectedOptions = (isMultipleSelect: boolean, value: string) => {
    const result = getSelectedOptions(
      isMultipleSelect,
      value,
      selectedOptions,
      options
    );

    updateSelectedOptions(result);
    if (!isMultipleSelect && result[0])
      updateHoveredIndex(options.indexOf(result[0]));

    if (onChange) {
      onChange(result?.map((item) => item.value));
    }
  };

  const expandOrCloseOptionList = () => {
    if (!disabled && !isLoading) {
      isMultipleSelect ? updateIsOpen(true) : updateIsOpen(!isOpen);
    }
  };

  const forceExpandOrCloseOptionList = (isOpen: boolean) => {
    updateIsOpen(isOpen);
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // capture the value from `data-value` attribute, this is because the target can  be <li> | <input> | <label>

    const value = (e.target as HTMLDivElement).getAttribute("data-value");

    // value "0" will be ignored
    if (value && value !== "0") {
      setSelectedOptions(isMultipleSelect, value);
    }

    expandOrCloseOptionList();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    SelectOnKeyDownHandler(
      e,
      isOpen,
      options,
      listBoxRef,
      hoveredIndex,
      isMultipleSelect,
      expandOrCloseOptionList,
      forceExpandOrCloseOptionList,
      updateHoveredIndex,
      setSelectedOptions
    );
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    e.stopPropagation();
    return SelectOnBlurHandler(e, updateIsOpen);
  };

  const optionsProps = {
    options,
    isMultipleSelect,
    labelledby: labelId,
    selectedOptions,
    hoveredIndex,
    updateHoveredIndex,
    ref: listBoxRef,
    id: selectId,
  };

  /**
   * TODO
   * https://jira.forge.avaya.com/browse/NEO-709
   * the current HTML structure doesn't match with the online documentation
   * https://design.avayacloud.com/components/web/selectbox-web
   */

  const selectedValuesMemoized = useMemo(() => {
    return getSelectedValues(selectedOptions, defaultSelected);
  }, [selectedOptions, defaultSelected]);

  const ariaActivedescendantMemoized = useMemo(() => {
    return getAriaActiveDescendant(isOpen, selectedOptions);
  }, [isOpen, selectedOptions]);

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={errorMessages && errorMessages.length > 0}
      required={required}
      wrapperClassName={className}
    >
      <label id={labelId} htmlFor={selectId}>
        {label}
      </label>

      <div
        className={selectClassName}
        aria-controls={selectId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        onClick={clickHandler}
        onKeyDown={onKeyDownHandler}
        onBlur={onBlurHandler}
        role="combobox"
        tabIndex={0}
        aria-activedescendant={ariaActivedescendantMemoized}
      >
        <input
          type="hidden"
          placeholder="hidden-input"
          value={selectedOptions.map((item) => item.value).join(", ")}
        />
        <div
          role="textbox"
          className="neo-multiselect__header"
          aria-label={selectedValuesMemoized}
        >
          {isLoading ? loaderText : selectedValuesMemoized}
        </div>
        <Options {...optionsProps} />
      </div>
      {displayErrorOrHelper(errorMessages, helperMessages)}
    </NeoInputWrapper>
  );
};

export const getSelectClassNames = (
  isOpen: boolean,
  disabled?: boolean,
  isLoading?: boolean
) => {
  const classArray = ["neo-multiselect"];

  if (isOpen) {
    classArray.push("neo-multiselect--active");
  }

  if (disabled) {
    classArray.push("neo-multiselect--disabled");
  }

  if (isLoading) {
    classArray.push("neo-select__spinner");
  }

  return classArray.join(" ");
};

export const getSelectedOptions = (
  isMultipleSelect: boolean,
  value: string,
  selectedItems: OptionType[],
  options: OptionType[]
) => {
  let result: OptionType[] = [];

  // remove placeholder
  const cleanSelectedItems = selectedItems.filter(
    (item) => !item.isPlaceholder
  );

  if (isMultipleSelect) {
    result = setMultipleValues(cleanSelectedItems, options, value);
  } else {
    result = getOptionValue(options, [value]);
  }

  return result;
};

export const setMultipleValues = (
  selectedItems: OptionType[],
  options: OptionType[],
  value: string
) => {
  let result: OptionType[] = [];
  const selectedItemsCopy = [...selectedItems];
  const newValue = selectedItemsCopy.find(
    (item) => item.value === value && !item.isPlaceholder
  );
  // remove new value if is already there
  if (newValue) {
    selectedItemsCopy.splice(selectedItemsCopy.indexOf(newValue), 1);
    result = selectedItemsCopy;
  } else {
    // add
    result = [...selectedItemsCopy, ...getOptionValue(options, [value])];
  }
  return result;
};

export const getAriaActiveDescendant = (
  isOpen: boolean,
  selectedItems: OptionType[]
) => {
  return isOpen
    ? selectedItems?.map((item) => `${item.label}-${item.value}`).join(", ")
    : "";
};

export const getSelectedValues = (
  selectedItems: OptionType[],
  defaultSelected: OptionType[]
) => {
  return selectedItems.length === 0
    ? defaultSelected.map((item) => item.label).join(", ")
    : selectedItems?.map((item) => item.label).join(", ");
};
