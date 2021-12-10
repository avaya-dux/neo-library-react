import {
  createRef,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";

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
import { OptionType, SelectHandlerType, SelectProps } from "./SelectTypes";

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
  const labelId = useMemo(
    () => `neo-select-label-id-${label?.replace(/\s/g, "")}`,
    [label]
  );
  const selectId = useMemo(
    () => id || `neo-select-id-${label?.replace(/\s/g, "")}`,
    [id, label]
  );

  const internalName = useMemo(
    () => name || `neo-select-name-${label?.replace(/\s/g, "")}`,
    [name, label]
  );

  const listBoxRef: React.Ref<HTMLDivElement> = createRef();

  const [isOpen, updateIsOpen] = useState(false);
  const [hoveredIndex, updateHoveredIndex] = useState(0);
  const defaultPlaceholder = getPlaceholder(options, placeholder);
  const optionList = useMemo(() => removePlaceholder(options), options);

  const [selectedOptions, updateSelectedOptions] = useState<OptionType[]>([]);
  const [topPosition, updateTopPosition] = useState(0);

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

  const onSelectionChangeMemoizedCallback = useCallback(
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

    // value "0" will be ignored
    if (value && value !== "0") {
      onSelectionChangeMemoizedCallback(
        isMultipleSelect,
        optionList,
        selectedOptions,
        updateHoveredIndex,
        updateSelectedOptions,
        value,
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
    return SelectOnBlurHandler(e, updateIsOpen);
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

  const formattedSelectedValuesMemoized = useMemo(() => {
    return formatSelectedValuesToString(selectedOptions, defaultPlaceholder);
  }, [selectedOptions, defaultPlaceholder]);

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

export const computeMultipleSelectedValues = (
  alreadySelectedOptions: OptionType[],
  newValue: OptionType[],
  value: string
) => {
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
export const removePlaceholder = (options: OptionType[]) => {
  return options.filter((option) => !option.isPlaceholder);
};
export const onSelectionChangeHandler = (
  isMultipleSelect: boolean,
  options: OptionType[],
  selectedOptions: OptionType[],
  updateHoveredIndex: Dispatch<SetStateAction<number>>,
  updateSelectedOptions: Dispatch<SetStateAction<OptionType[]>>,
  value: string,
  onSelectionChange: SelectHandlerType
) => {
  let newValue: OptionType[] = getOptionByValue(options, [value]);

  if (isMultipleSelect) {
    newValue = computeMultipleSelectedValues(selectedOptions, newValue, value);
  }

  if (!isMultipleSelect) {
    updateHoveredIndex(options.indexOf(newValue[0]));
  }

  // dispatch event onSelectionChange(values)
  onSelectionChange(newValue.map((item) => item.value));

  updateSelectedOptions(newValue);
};
