import { createRef, forwardRef, useEffect, useMemo, useState } from "react";
import { NeoInputWrapper } from "components/NeoInputWrapper";

import { genId } from "utils/accessibilityUtils";
import { getOption } from "utils/SelectUtils";

import { OptionType, SelectHandlerType } from "./SelectTypes";

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
      label = "label",
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
    const listBoxId = genId();

    const listBoxRef: React.Ref<HTMLUListElement> = createRef();

    const [isOpen, updateIsOpen] = useState(false);
    const [cursor, setCursor] = useState(0);

    const [hovered, setHovered] = useState<OptionType | null>(null);

    const [selectedItems, updateSelectedItems] = useState<OptionType[]>([
      options[0],
    ]);

    useEffect(() => {
      if (options?.length && hovered) {
        setCursor(options.indexOf(hovered));
      }
    }, [hovered]);

    const selectClassName = useMemo(() => {
      return getComponentClassNames(isOpen, disabled, isLoading);
    }, [isOpen, disabled, isLoading]);

    useEffect(() => {
      if (rest.value) {
        const selected = getOption(options, rest.value);
        updateSelectedItems(selected);
      }
    }, [rest.value, options]);

    const renderOptions = (
      options: OptionType[],
      isMultipleSelect: boolean
    ) => {
      /* multiple select and single select must have same css styles
       * TODO https://jira.forge.avaya.com/browse/NEO-679
       */
      const roleType = isMultipleSelect ? "listitem" : "option";
      return isMultipleSelect
        ? options.map((option, index) => {
            const { label, value, hint } = option;
            const checkBoxId = genId();
            const checkBoxHindId = genId();
            const isActive = !!selectedItems.find(
              (item) => item.value === value
            );
            const isHover = cursor === index;

            /*
             * .active and .hover classNames are missing on the neo.css
             * TODO https://jira.forge.avaya.com/browse/NEO-683
             *
             */
            const classNames = ["neo-input-group"];

            if (isActive) {
              classNames.push("active");
            }

            if (isHover) {
              classNames.push("hover");
            }

            return (
              <li
                className={classNames.join(" ")}
                key={checkBoxId}
                aria-label={label}
                role={roleType}
                tabIndex={-1}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id={checkBoxId}
                  value={value}
                  tabIndex={-1}
                  defaultChecked={isActive}
                  onMouseEnter={() => setHovered(option)}
                  aria-describedby={checkBoxHindId}
                />
                <label htmlFor={checkBoxId} data-value={value}>
                  {label}
                </label>
                {hint ? (
                  <p className="neo-input-hint" id={checkBoxHindId}>
                    {hint}
                  </p>
                ) : null}
              </li>
            );
          })
        : options.map((option, index) => {
            const itemId = genId();
            const { label, value } = option;

            const isHover = cursor === index;

            const classNames = ["list-item"];

            if (isHover) {
              classNames.push("hover");
            }

            return (
              <li
                className={classNames.join(" ")}
                key={itemId}
                tabIndex={-1}
                data-value={value}
                role={roleType}
              >
                {label}
              </li>
            );
          });
    };
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
          {...rest}
          ref={ref}
          className={selectClassName}
          tabIndex={0}
          role="combobox"
          aria-labelledby={LabelId}
          aria-owns={listBoxId}
          aria-haspopup="listbox"
          aria-expanded="false"
          aria-controls="listbox"
          onClick={clickHandler}
          onKeyDown={onKeyDownHandler}
          onMouseLeave={() => updateIsOpen(false)}
        >
          <div
            role="textbox"
            className="neo-multiselect__header"
            tabIndex={-1}
            aria-labelledby={LabelId}
          >
            {/*
              TODO gap between the spinner icon and Loading text
              https://jira.forge.avaya.com/browse/NEO-678
              */}
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              selectedItems?.map((item) => item.label).join(", ")
            )}
          </div>
          <ul
            id={listBoxId}
            ref={listBoxRef}
            className="neo-multiselect__content"
            aria-labelledby={LabelId}
            role={isMultipleSelect ? "list" : "listbox"}
          >
            {options ? renderOptions(options, isMultipleSelect) : null}
          </ul>
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

export const getComponentClassNames = (
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
