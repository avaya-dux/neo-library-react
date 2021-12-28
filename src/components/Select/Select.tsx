import { createRef, useCallback, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { stringCapper } from "utils";
import { genId } from "utils/accessibilityUtils";

import {
  SelectOnBlurHandler,
  SelectOnKeyDownHandler,
} from "./EventHandlers/KeyboardEventHandlers";
import {
  displayErrorOrHelper,
  getOptionByValue,
  getPlaceholder,
} from "./helper";
import { Options } from "./Options/Options";
import { OptionType, SelectProps, setSelectedOptionsType } from "./SelectTypes";

/**
 * @example
 *  <Select
        label="List of States"
        onSelectionChange={(value) => {
          console.log("select value-> ", value);
        }}
        placeholder="this value will be ignored if it was already a placeholder defined on the option list"
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
  defaultValue,
  disabled,
  errorMessages,
  helperMessages,
  id,
  isLoading,
  isMultipleSelect = false,
  label,
  loaderText = "Loading...",
  name,
  onSelectionChange,
  options,
  placeholder = "--Please choose an option--",
  required,
}: SelectProps) => {
  const labelId = useMemo(() => `neo-select-label-id-${genId()}`, []);
  const selectId = useMemo(() => id || `neo-select-id-${genId()}`, [id]);

  const internalName = useMemo(
    () => name || `neo-select-name-${genId()}`,
    [name]
  );

  const selectContainer: React.Ref<HTMLDivElement> = createRef();
  const listBoxRef: React.Ref<HTMLDivElement> = createRef();

  const [isOpen, updateIsOpen] = useState(false);
  const [hoveredIndex, updateHoveredIndex] = useState(0);
  const defaultPlaceholder = getPlaceholder(options, placeholder);
  const optionList = useMemo(() => removePlaceholder(options), options);

  const [selectedOptions, updateSelectedOptions] = useState<OptionType[]>([]);
  const [topPosition, updateTopPosition] = useState(0);
  const [selectWidth, updateSelectWidth] = useState(0);

  const selectClassName = useMemo(() => {
    return getSelectClassNames(isOpen, disabled, isLoading);
  }, [isOpen, disabled, isLoading]);

  useEffect(() => {
    if (defaultValue) {
      const selected = getOptionByValue(optionList, defaultValue as string[]);
      updateSelectedOptions(selected);
    }
  }, [defaultValue, optionList]);

  useEffect(() => {
    const listBoxRect = listBoxRef.current?.getBoundingClientRect();
    if (listBoxRect) {
      const { height, y } = listBoxRect;
      const borderCalculation = height + y;
      const calculatedTopPosition =
        borderCalculation <= innerHeight && borderCalculation > 0 ? 0 : -height;
      updateTopPosition(calculatedTopPosition);
    }
  }, [isOpen]);

  const onSelectionChangeMemoizedCallback: setSelectedOptionsType = useCallback(
    (
      isMultipleSelect,
      options,
      selectedOptions,
      updateHoveredIndex,
      updateSelectedOptions,
      value,
      onSelectionChange
    ) => {
      onSelectionChangeHandler(
        isMultipleSelect,
        options,
        selectedOptions,
        updateHoveredIndex,
        updateSelectedOptions,
        value,
        onSelectionChange
      );
    },
    [isMultipleSelect, selectedOptions]
  );

  const expandOrCloseOptionList = () => {
    if (!disabled && !isLoading) {
      isMultipleSelect ? updateIsOpen(true) : updateIsOpen(!isOpen);
    }
  };

  const onClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // capture the value from `data-value` attribute, this is because the target can  be <li> | <input> | <label>

    const value = (e.target as HTMLDivElement).getAttribute("data-value");

    if (value) {
      const newValue = getOptionByValue(optionList, [value]);
      console.log(newValue);
      onSelectionChangeMemoizedCallback(
        isMultipleSelect,
        optionList,
        selectedOptions,
        updateHoveredIndex,
        updateSelectedOptions,
        newValue,
        onSelectionChange
      );
    }

    expandOrCloseOptionList();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    SelectOnKeyDownHandler(
      e,
      isOpen,
      optionList,
      listBoxRef,
      hoveredIndex,
      isMultipleSelect,
      expandOrCloseOptionList,
      updateIsOpen,
      updateHoveredIndex,
      onSelectionChangeMemoizedCallback,
      updateSelectedOptions,
      selectedOptions,
      onSelectionChange
    );
  };

  const onBlurHandler = (e: React.FocusEvent<HTMLDivElement>) => {
    e.stopPropagation();
    SelectOnBlurHandler(e, updateIsOpen);
  };

  const optionsProps = {
    options: optionList,
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

  useEffect(() => {
    const rect = selectContainer.current?.getBoundingClientRect();
    if (rect) {
      updateSelectWidth(rect.width);
    }
  }, [selectContainer]);

  const formattedSelectedValuesMemoized = useMemo(() => {
    const limit = computeTextCappingLimit(selectWidth);
    return formatSelectedValuesToString(
      selectedOptions,
      [defaultPlaceholder],
      limit
    );
  }, [selectedOptions, defaultPlaceholder, selectWidth]);

  const ariaActivedescendantMemoized = useMemo(() => {
    return getAriaActiveDescendant(isOpen, selectedOptions);
  }, [isOpen, selectedOptions]);

  const renderInputValuesMemoized = useMemo(() => {
    return renderInputValues(selectedOptions, internalName);
  }, [selectedOptions, internalName]);

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
        aria-activedescendant={ariaActivedescendantMemoized}
        aria-controls={selectId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={labelId}
        className={selectClassName}
        onBlur={onBlurHandler}
        onClick={onClickHandler}
        onKeyDown={onKeyDownHandler}
        ref={selectContainer}
        role="combobox"
        tabIndex={0}
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

export const computeMultipleSelectedValues = (
  alreadySelectedOptions: OptionType[],
  newValue: OptionType[]
): OptionType[] => {
  const value = newValue.map((item) => item.value).join();
  return alreadySelectedOptions.map((item) => item.value).includes(value)
    ? alreadySelectedOptions.filter((item) => item.value !== value) // remove
    : [...alreadySelectedOptions, ...newValue]; // add
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
  defaultSelected: OptionType[],
  limit: number
) => {
  return selectedOptions.length === 0
    ? defaultSelected.map((item) => item.label).join(", ")
    : selectedOptions
        ?.map((item) => stringCapper(item.label, limit))
        .join(", ");
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
export const removePlaceholder = (options: OptionType[]) => {
  return options.filter((option) => !option.isPlaceholder);
};
export const onSelectionChangeHandler: setSelectedOptionsType = (
  isMultipleSelect,
  options,
  selectedOptions,
  updateHoveredIndex,
  updateSelectedOptions,
  newValue,
  onSelectionChange
) => {
  let updatedValue: OptionType[] = newValue;
  if (isMultipleSelect) {
    updatedValue = computeMultipleSelectedValues(selectedOptions, newValue);
  }

  if (!isMultipleSelect) {
    const value = newValue.map((item) => item.value).join();
    const index = options.map((item) => item.value).indexOf(value);
    updateHoveredIndex(index);
  }

  // dispatch event onSelectionChange(values)
  if (onSelectionChange) {
    onSelectionChange(updatedValue.map((item) => item.value));
  }

  updateSelectedOptions(updatedValue);
};
export const computeTextCappingLimit = (width: number) => {
  return width === 0 ? 20 : Math.round(width / 10.5);
};
