import { createRef, forwardRef, useEffect, useMemo, useState } from "react";
import { NeoInputWrapper } from "components/NeoInputWrapper";

import { genId } from "utils/accessibilityUtils";
import { getOption } from "utils/SelectUtils";

import { OptionType, SelectHandlerType } from "./SelectTypes";
import { Options } from "./Options";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  disabled?: boolean;
  errorText?: string[];
  helperText?: string[];
  isLoading?: boolean;
  isMultipleSelect?: boolean;
  label: string;
  onChange?: SelectHandlerType;
  options: OptionType[];
  required?: boolean;
  value?: string[];
}

export const Select: React.FC<SelectProps> = forwardRef(
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
      ...rest
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const LabelId = genId();
    const hintId = genId();
    const selectId = genId();

    const listBoxRef: React.Ref<HTMLUListElement> = createRef();

    const [isOpen, updateIsOpen] = useState(false);
    const [cursor, setCursor] = useState(0);

    const [selectedItems, updateSelectedItems] = useState<OptionType[]>([
      options[0],
    ]);

    const selectClassName = useMemo(() => {
      return getSelectClassNames(isOpen, disabled, isLoading);
    }, [isOpen, disabled, isLoading]);

    useEffect(() => {
      if (rest.value) {
        const selected = getOption(options, rest.value);
        updateSelectedItems(selected);
      }
    }, [rest.value, options]);

    const addOrRemoveSelectedItems = (
      isMultipleSelect: boolean,
      value?: string | null
    ) => {
      let result: OptionType[] = [];
      if (value) {
        if (isMultipleSelect) {
          const newValue = selectedItems.find((item) => item.value === value);
          // remove new value if is already there
          if (newValue) {
            const copy = [...selectedItems];
            // do not remove if only one item was left

            if (copy.length >= 2) {
              copy.splice(copy.indexOf(newValue), 1);
              result = copy;
              updateSelectedItems(copy);
            }
          } else {
            // add
            result = [...selectedItems, ...getOption(options, [value])];
            updateSelectedItems(result);
          }
        } else {
          result = getOption(options, [value]);

          updateSelectedItems(result);
          setCursor(options.indexOf(result[0]));
        }

        if (onChange) {
          onChange(result?.map((item) => item.value));
        }
      }

      if (!disabled && !isLoading) {
        isMultipleSelect ? updateIsOpen(true) : updateIsOpen(!isOpen);
      }
    };

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const value = (e.target as HTMLDivElement).getAttribute("data-value");

      addOrRemoveSelectedItems(isMultipleSelect, value);
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const scrollHeight = listBoxRef.current?.scrollHeight;
      const itemHeight = scrollHeight ? scrollHeight / options.length : 0;

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
            listBoxRef.current.scrollTop = cursor * itemHeight;
          }
          break;
        }

        case "Enter": {
          addOrRemoveSelectedItems(isMultipleSelect, options[cursor].value);
          break;
        }

        default:
          break;
      }
    };

    const optionsProps = {
      options,
      isMultipleSelect,
      labelledby: LabelId,
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
        <label id={LabelId} htmlFor={selectId}>
          {label}:
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
          aria-labelledby={LabelId}
          onClick={clickHandler}
          onKeyDown={onKeyDownHandler}
          onMouseLeave={() => updateIsOpen(false)}
        >
          <div
            role="textbox"
            aria-haspopup="listbox"
            className="neo-multiselect__header"
            tabIndex={-1}
            aria-labelledby={LabelId}
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
          {errorText && Array.isArray(errorText) ? (
            <div
              dangerouslySetInnerHTML={{ __html: errorText?.join(`<br />`) }}
            />
          ) : helperText && Array.isArray(helperText) ? (
            <div
              dangerouslySetInnerHTML={{ __html: helperText?.join(`<br />`) }}
            />
          ) : null}
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
