import { createRef, useCallback, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";

import {
  SelectOnBlurHandler,
  SelectOnKeyDownHandler,
} from "./EventHandlers/KeyboardEventHandlers";
import {
  displayErrorOrHelper,
  getDefaultOption,
  getOptionByValue,
} from "./helper";
import { Options } from "./Options/Options";
import { OptionType, SelectProps } from "./SelectTypes";

/**
 * Select will use the <ul> <li> HTML structure.
 *
 * @example
 *  <Select
        label="List of States"
        onSelectionChange={(value) => {
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
  onSelectionChange,
  options,
  required,
  value,
  name,
}: SelectProps) => {
  const labelId = useMemo(
    () => `neo-select-label-id-${label.replace(/\s/g, "")}`,
    [label]
  );
  const selectId = useMemo(
    () => id || `neo-select-id-${label.replace(/\s/g, "")}`,
    [id, label]
  );

  const internalName = useMemo(
    () => name || `neo-select-name-${label.replace(/\s/g, "")}`,
    [name, label]
  );

  const listBoxRef: React.Ref<HTMLDivElement> = createRef();

  const [isOpen, updateIsOpen] = useState(false);
  const [hoveredIndex, updateHoveredIndex] = useState(0);

  const defaultSelected = getDefaultOption(options);

  const [selectedOptions, updateSelectedOptions] =
    useState<OptionType[]>(defaultSelected);
  const [topPosition, updateTopPosition] = useState(40);

  const selectClassName = useMemo(() => {
    return getSelectClassNames(isOpen, disabled, isLoading);
  }, [isOpen, disabled, isLoading]);

  useEffect(() => {
    if (value) {
      const selected = getOptionByValue(options, value);
      updateSelectedOptions(selected);
    }
  }, [value, options]);

  useEffect(() => {
    const listBoxRect = listBoxRef.current?.getBoundingClientRect();
    if (listBoxRect) {
      const { height, y } = listBoxRect;
      const borderCalculation = height + y;
      const calculatedTopPosition =
        borderCalculation <= innerHeight && borderCalculation > 0
          ? 40
          : -height;
      updateTopPosition(calculatedTopPosition);
    }
  }, [isOpen]);

  const onSelectionChangeMemoizedCallback = useCallback(
    (isMultipleSelect, value) => {
      onSelectionChangeHandler(isMultipleSelect, value);
    },
    [isMultipleSelect, value]
  );

  const onSelectionChangeHandler = (
    isMultipleSelect: boolean,
    value: string
  ) => {
    const newSelectedOptions = computeNewSelectedOptions(
      isMultipleSelect,
      value,
      selectedOptions,
      options
    );

    updateSelectedOptions(newSelectedOptions);
    if (!isMultipleSelect && newSelectedOptions[0])
      updateHoveredIndex(options.indexOf(newSelectedOptions[0]));
    // dispatch event onSelectionChange(values)
    if (onSelectionChange) {
      onSelectionChange(newSelectedOptions?.map((item) => item.value));
    }
  };

  const expandOrCloseOptionList = () => {
    if (!disabled && !isLoading) {
      isMultipleSelect ? updateIsOpen(true) : updateIsOpen(!isOpen);
    }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // capture the value from `data-value` attribute, this is because the target can  be <li> | <input> | <label>

    const value = (e.target as HTMLDivElement).getAttribute("data-value");

    // value "0" will be ignored
    if (value && value !== "0") {
      onSelectionChangeMemoizedCallback(isMultipleSelect, value);
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
      updateIsOpen,
      updateHoveredIndex,
      onSelectionChangeMemoizedCallback
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
    topPosition,
  };

  /**
   * TODO
   * https://jira.forge.avaya.com/browse/NEO-709
   * the current HTML structure doesn't match with the online documentation
   * https://design.avayacloud.com/components/web/selectbox-web
   */

  const formattedSelectedValuesMemoized = useMemo(() => {
    return formatSelectedValuesToString(selectedOptions, defaultSelected);
  }, [selectedOptions, defaultSelected]);

  const ariaActivedescendantMemoized = useMemo(() => {
    return getAriaActiveDescendant(isOpen, selectedOptions);
  }, [isOpen, selectedOptions]);

  const renderInputValuesMemoized = useMemo(() => {
    return renderInputValues(selectedOptions, internalName);
  }, [selectedOptions, internalName]);

  /**
   * TODO expand UP direction when the Select is on the bottom of the screen view
   */

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
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        onBlur={onBlurHandler}
        role="combobox"
        tabIndex={0}
        aria-activedescendant={ariaActivedescendantMemoized}
      >
        {renderInputValuesMemoized}

        <div
          role="textbox"
          className="neo-multiselect__header"
          aria-label={formattedSelectedValuesMemoized}
        >
          {isLoading ? loaderText : formattedSelectedValuesMemoized}
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

export const computeNewSelectedOptions = (
  isMultipleSelect: boolean,
  value: string,
  selectedOptions: OptionType[],
  options: OptionType[]
) => {
  // remove placeholder
  const cleanSelectedOptions = selectedOptions.filter(
    (item) => !item.isPlaceholder
  );

  return isMultipleSelect
    ? getOptionByValueMultiple(cleanSelectedOptions, options, value)
    : getOptionByValue(options, [value]);
};

export const getOptionByValueMultiple = (
  alreadySelectedOptions: OptionType[],
  options: OptionType[],
  query: string
) => {
  const newValue = alreadySelectedOptions.find(
    (item) => item.value === query && !item.isPlaceholder
  );
  return newValue
    ? alreadySelectedOptions.filter((option) => option.value !== query) // remove value if exists (unselect)
    : [...alreadySelectedOptions, ...getOptionByValue(options, [query])]; // else, add it
};

export const getAriaActiveDescendant = (
  isOpen: boolean,
  options: OptionType[]
) => {
  return isOpen
    ? options?.map((item) => `${item.label}-${item.value}`).join(", ")
    : "";
};

export const formatSelectedValuesToString = (
  selectedOptions: OptionType[],
  defaultSelected: OptionType[]
) => {
  return selectedOptions.length === 0
    ? defaultSelected.map((item) => item.label).join(", ")
    : selectedOptions?.map((item) => item.label).join(", ");
};

export const renderInputValues = (
  selectedOptions: OptionType[],
  name: string
) => {
  return selectedOptions.map((option) => (
    <input
      key={`input-hidden-${option.value}`}
      type="hidden"
      name={name}
      value={option.value}
    />
  ));
};
