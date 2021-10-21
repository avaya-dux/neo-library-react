import { createRef, forwardRef, useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";
import { getOption } from "utils/SelectUtils";

import { Options } from "./Options";
import { OptionType, SelectProps } from "./SelectTypes";

export const Select = forwardRef(
  (
    {
      className,
      disabled,
      errorText,
      helperText,
      isLoading,
      isMultipleSelect = false,
      label,
      onChange,
      options,
      required,
      id,
      value,
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const labelId = useMemo(() => genId(), []);
    const hintId = useMemo(() => genId(), []);
    const selectId = useMemo(() => id || genId(), []);

    const listBoxRef: React.Ref<HTMLUListElement> = createRef();

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

    const addOrRemoveSelectedItems = (
      isMultipleSelect: boolean,
      value: string
    ) => {
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
      const value = (e.target as HTMLDivElement).getAttribute("data-value");
      if (value) {
        addOrRemoveSelectedItems(isMultipleSelect, value);
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
          console.log(options[cursor].disabled, options[cursor].value);
          if (!options[cursor].disabled) {
            addOrRemoveSelectedItems(isMultipleSelect, options[cursor].value);
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
    };

    /**
     * TODO
     * https://jira.forge.avaya.com/browse/NEO-709
     * the current HTML structure doesn't match with the online documentation
     * https://design.avayacloud.com/components/web/selectbox-web
     */

    return (
      <NeoInputWrapper
        disabled={disabled}
        error={!!errorText}
        required={required}
        wrapperClassName={className}
      >
        <label id={labelId} htmlFor={selectId}>
          {label}
        </label>

        <div
          id={selectId}
          ref={ref}
          className={selectClassName}
          tabIndex={0}
          role="combobox"
          aria-controls="listbox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          onClick={clickHandler}
          onKeyDown={onKeyDownHandler}
          onMouseLeave={() => updateIsOpen(false)}
        >
          <div
            role="textbox"
            aria-haspopup="listbox"
            className="neo-multiselect__header"
            tabIndex={-1}
            aria-labelledby={labelId}
          >
            {/*
              TODO gap between the spinner icon and the Loading text
              https://jira.forge.avaya.com/browse/NEO-678
              */}
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              selectedItems?.map((item) => item.label).join(", ")
            )}
          </div>
          <Options {...optionsProps} />
        </div>
        <div className="neo-input-hint" id={hintId}>
          {errorText && Array.isArray(errorText)
            ? errorText.map((item, index) => (
                <div key={`${item}-${index}`}>{item}</div>
              ))
            : helperText && Array.isArray(helperText)
            ? helperText.map((item, index) => (
                <div key={`${item}-${index}`}>{item}</div>
              ))
            : null}
        </div>
      </NeoInputWrapper>
    );
  }
);

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

const setMultipleValues = (
  selectedItems: OptionType[],
  options: OptionType[],
  value: string
) => {
  let result: OptionType[] = [];
  const newValue = selectedItems.find((item) => item.value === value);
  // remove new value if is already there
  if (newValue) {
    const copy = [...selectedItems];
    copy.splice(copy.indexOf(newValue), 1);
    result = copy;
  } else {
    // add
    result = [...selectedItems, ...getOption(options, [value])];
  }
  return result;
};
