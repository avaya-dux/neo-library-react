import { forwardRef, useMemo, useState, useEffect } from "react";

import { genId } from "utils/accessibilityUtils";

import { OptionType, SelectHandlerType } from "./SelectTypes";
import { getSelectContainerClass } from "utils/SelectUtils";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label: string;
  options: OptionType[];
  hint: string;
  displayHintAsAnError?: boolean;
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
  onChange?: SelectHandlerType;
  value?: string;
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
      onChange,
      ...rest
    }: SelectProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const hintId = genId();
    const selectId = genId();
    const [isOpen, updateIsOpen] = useState(false);
    const filterFunc = (array: OptionType[], query: string) => {
      return array.filter((item) => {
        return item.value === query;
      });
    };

    const defaultValue = rest.value ? filterFunc(options, rest.value) : options;

    const [internal, updateInternal] = useState(defaultValue[0]);

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
        updateInternal(selected[0]);
      }
    }, [rest.value]);

    const renderOptions = (options: OptionType[]) => {
      return options.map((option, index) => {
        const { label, value } = option;

        return (
          <li
            key={`${label}-${value}-${index}`}
            tabIndex={-1}
            data-value={value}
          >
            {label}
          </li>
        );
      });
    };

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const value = (e.target as HTMLDivElement).getAttribute("data-value");
      if (value) {
        const selected = filterFunc(options, value);

        updateInternal(selected[0]);
        if (onChange) {
          onChange(selected[0].value);
        }
      }
      if (!disabled && !isLoading) {
        updateIsOpen(!isOpen);
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
            onKeyPress={(e) => console.log(e.key)}
          >
            <div className="neo-multiselect__header">
              {isLoading ? (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Loading...</span>
              ) : (
                internal?.label
              )}
            </div>
            <div className="neo-multiselect__content">
              <ul id="listbox">{options ? renderOptions(options) : null}</ul>
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
