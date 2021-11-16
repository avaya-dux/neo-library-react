import { createRef, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { displayErrorOrHelper, getOption } from "./helper";
import { Options } from "./Options";
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
 *
 *
 * @see https://design.avayacloud.com/components/web/selectbox-web
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
  const labelId = useMemo(() => genId(), []);
  const selectId = useMemo(() => id || genId(), []);

  const listBoxRef: React.Ref<HTMLDivElement> = createRef();

  const [isOpen, updateIsOpen] = useState(false);
  const [cursor, setCursor] = useState(0);

  const defaultSelected = getOption(options);

  const [selectedItems, updateSelectedItems] =
    useState<OptionType[]>(defaultSelected);

  const selectClassName = useMemo(() => {
    return getSelectClassNames(isOpen, disabled, isLoading);
  }, [isOpen, disabled, isLoading]);

  useEffect(() => {
    if (value) {
      const selected = getOption(options, value);
      updateSelectedItems(selected);
    }
  }, [value, options]);

  const setSelectedItems = (isMultipleSelect: boolean, value: string) => {
    const result = getSelectedItems(
      isMultipleSelect,
      value,
      selectedItems,
      options
    );

    updateSelectedItems(result);
    if (!isMultipleSelect) setCursor(options.indexOf(result[0]));

    if (onChange) {
      onChange(result?.map((item) => item.value));
    }
  };

  const expandOrCloseListBox = () => {
    if (!disabled && !isLoading) {
      isMultipleSelect ? updateIsOpen(true) : updateIsOpen(!isOpen);
    }
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // capture the value from `data-value` attribute, this is because the target can  be <li> | <input> | <label>

    const value = (e.target as HTMLDivElement).getAttribute("data-value");
    // value "0" will be ignored
    if (value && value !== "0") {
      setSelectedItems(isMultipleSelect, value);
    }

    expandOrCloseListBox();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const scrollHeight = listBoxRef.current?.scrollHeight;
    const itemHeight = scrollHeight ? scrollHeight / options.length : 100;

    switch (e.code) {
      case "Space": {
        updateIsOpen(!isOpen);
        break;
      }

      case "Escape": {
        updateIsOpen(false);
        break;
      }

      case "ArrowDown": {
        setCursor((prevState) =>
          prevState < options.length - 1 ? prevState + 1 : prevState
        );
        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = cursor * itemHeight;
        }
        break;
      }

      case "ArrowUp": {
        setCursor((prevState) => (prevState > 0 ? prevState - 1 : prevState));
        if (scrollHeight && itemHeight) {
          listBoxRef.current.scrollTop = (cursor - 1) * itemHeight;
        }
        break;
      }

      case "Enter": {
        // value "0" will be ignored
        const value = options[cursor].value;
        if (!options[cursor].disabled && value !== "0") {
          setSelectedItems(isMultipleSelect, value);
        }
        expandOrCloseListBox();
        break;
      }

      default:
        break;
    }
  };

  const optionsProps = {
    options,
    isMultipleSelect,
    labelledby: labelId,
    selectedItems,
    cursor,
    updateCursor: setCursor,
    ref: listBoxRef,
    id: selectId,
  };

  /**
   * TODO
   * https://jira.forge.avaya.com/browse/NEO-709
   * the current HTML structure doesn't match with the online documentation
   * https://design.avayacloud.com/components/web/selectbox-web
   */

  const currentValues = selectedItems?.map((item) => item.label).join(", ");

  const ariaActivedescendantMemoized = useMemo(() => {
    return getAriaActiveDescendant(isOpen, selectedItems);
  }, [isOpen, selectedItems]);

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={!!errorMessages}
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
        onMouseLeave={() => updateIsOpen(false)}
        role="combobox"
        tabIndex={0}
        aria-activedescendant={ariaActivedescendantMemoized}
      >
        {/*
              TODO gap between the spinner icon and the Loading text
              https://jira.forge.avaya.com/browse/NEO-678
              */}
        <div
          role="textbox"
          className="neo-multiselect__header"
          aria-label={currentValues}
        >
          {isLoading ? loaderText : currentValues}
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

export const getSelectedItems = (
  isMultipleSelect: boolean,
  value: string,
  selectedItems: OptionType[],
  options: OptionType[]
) => {
  let result: OptionType[] = [];

  // remove placeholder
  const cleanSelectedItems = selectedItems.filter((item) => !item.placeholder);

  if (isMultipleSelect) {
    result = setMultipleValues(cleanSelectedItems, options, value);
  } else {
    result = getOption(options, [value]);
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
    (item) => item.value === value && !item.placeholder
  );
  // remove new value if is already there
  if (newValue) {
    selectedItemsCopy.splice(selectedItemsCopy.indexOf(newValue), 1);
    result = selectedItemsCopy;
  } else {
    // add
    result = [...selectedItemsCopy, ...getOption(options, [value])];
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
