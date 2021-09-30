import { forwardRef, useMemo, useState, useEffect, createRef } from "react";

import { genId } from "utils/accessibilityUtils";

import { OptionType, SelectHandlerType } from "./SelectTypes";
import { getSelectContainerClass } from "utils/SelectUtils";
import "./style.css";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: OptionType[];
  hint: string;
  displayHintAsAnError?: boolean;
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
  isMultipleSelect?: boolean;
  onChange?: SelectHandlerType;
  value?: string[];
}

export const Select: React.FC<SelectProps> = forwardRef(
  (
    {
      className,
      label,
      options,
      hint,
      displayHintAsAnError,
      disabled,
      required,
      isLoading,
      isMultipleSelect = false,
      onChange,
      ...rest
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const hintId = genId();
    const selectId = genId();
    const listBoxRef: React.Ref<HTMLDivElement> = createRef();

    const [isOpen, updateIsOpen] = useState(false);
    const [cursor, setCursor] = useState(0);

    const filterFunc = (array: OptionType[], query: string[]) => {
      return array.filter((item) => {
        return query.includes(item.value);
      });
    };

    const defaultValue = rest.value
      ? filterFunc(options, rest.value)
      : [options[0]];

    const [internal, updateInternal] = useState(defaultValue);

    const componentClasses = useMemo(() => {
      return [
        ...getSelectContainerClass(displayHintAsAnError, disabled, required),
        className,
      ].join(" ");
    }, [displayHintAsAnError, disabled, required]);

    const selectClass = useMemo(() => {
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
    }, [isOpen, disabled, isLoading]);

    useEffect(() => {
      if (rest.value) {
        const selected = filterFunc(options, rest.value);
        updateInternal(selected);
      }
    }, [rest.value]);

    const renderOptions = (
      options: OptionType[],
      isMultipleSelect: boolean
    ) => {
      return isMultipleSelect ? (
        options.map((option, index) => {
          const { label, value } = option;
          const checkId = genId();
          const checkHindId = genId();

          return (
            <div
              className={`neo-input-group ${cursor === index ? "active" : ""}`}
              key={checkId}
              role="menuitem"
              tabIndex={0}
            >
              <input
                className="neo-check"
                type="checkbox"
                id={checkId}
                value={value}
                tabIndex={-1}
                defaultChecked={!!internal.find((item) => item.value === value)}
                aria-describedby={checkHindId}
              />
              <label htmlFor={checkId} data-value={value}>
                {label}
              </label>
              <p className="neo-input-hint" id={checkHindId}>
                Hint text for option 1
              </p>
            </div>
          );
        })
      ) : (
        <ul id="listbox">
          {options.map((option) => {
            const itemId = genId();
            const { label, value } = option;

            return (
              <li key={itemId} tabIndex={-1} data-value={value}>
                {label}
              </li>
            );
          })}
        </ul>
      );
    };

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const value = (e.target as HTMLDivElement).getAttribute("data-value");
      let result: OptionType[] = [];

      if (value) {
        if (isMultipleSelect) {
          const newValue = internal.find((item) => item.value === value);
          // remove new value if is already there
          if (newValue) {
            const copy = [...internal];
            // do not remove if only one item was left

            if (copy.length >= 2) {
              copy.splice(copy.indexOf(newValue), 1);
              result = copy;
              updateInternal(copy);
            }
          } else {
            // add
            result = [...internal, ...filterFunc(options, [value])];
            updateInternal(result);
          }
        } else {
          result = filterFunc(options, [value]);
          console.log(result);
          updateInternal(result);
        }

        if (onChange) {
          onChange(result?.map((item) => item.value));
        }
      }
      if (!disabled && !isLoading) {
        isMultipleSelect ? updateIsOpen(true) : updateIsOpen(!isOpen);
      }
    };
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
      console.log(`code = ${e.code}`);
      const active = document.activeElement;
      console.log(active);

      switch (e.code) {
        case "Space": {
          updateIsOpen(true);
          setTimeout(() => {
            (active as HTMLElement)?.focus();
          }, 3000);

          break;
        }

        case "ArrowDown": {
          console.log(active);
          // (active?.nextSibling as HTMLElement)?.focus();
          break;
        }

        default:
          break;
      }
    };
    return (
      <div className={componentClasses}>
        <div className="neo-input-group">
          {label ? <label htmlFor={selectId}>{label}</label> : null}

          <div
            id={selectId}
            {...rest}
            ref={ref}
            className={selectClass}
            tabIndex={0}
            role="combobox"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-controls="listbox"
            aria-describedby={hintId}
            onClick={clickHandler}
            onKeyDown={onKeyDownHandler}
          >
            <div className="neo-multiselect__header" tabIndex={-1}>
              {isLoading ? (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading...</span>
              ) : (
                internal?.map((item) => item.label).join(" ,")
              )}
            </div>
            <div
              ref={listBoxRef}
              className="neo-multiselect__content"
              role="listbox"
              tabIndex={-1}
              onMouseLeave={() => updateIsOpen(false)}
            >
              {options ? renderOptions(options, isMultipleSelect) : null}
            </div>
          </div>

          <div className="neo-input-hint" id={hintId}>
            {hint}
          </div>
        </div>
      </div>
    );
  }
);
