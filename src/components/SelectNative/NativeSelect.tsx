import { forwardRef, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import { OptionType } from "../Select/SelectTypes";
import { getSelectContainerClass } from "utils/SelectUtils";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionType[];
  hint: string;
  displayHintAsAnError?: boolean;
  disabled?: boolean;
  required?: boolean;
  isLoading?: boolean;
  value?: string;
}

export const NativeSelect: React.FC<NativeSelectProps> = forwardRef(
  (
    {
      className,
      label,
      options,
      hint,
      displayHintAsAnError,
      disabled,
      isLoading,
      required,
      ...rest
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const hintId = genId();
    const selectId = genId();

    const componentClasses = useMemo(() => {
      return [
        ...getSelectContainerClass(displayHintAsAnError, disabled, required),
        className,
      ].join(" ");
    }, [displayHintAsAnError, disabled, required]);

    const renderOptions = (options: OptionType[]) => {
      return options.map((option, index) => {
        const { label, value } = option;

        return (
          <option key={`${label}-${value}-${index}`} value={value}>
            {label}
          </option>
        );
      });
    };

    const selectClass = useMemo(() => {
      const classArray = ["neo-select"];

      if (isLoading) {
        classArray.push("neo-select__spinner");
      }

      return classArray.join(" ");
    }, [isLoading]);

    return (
      <div className={componentClasses}>
        <div className="neo-input-group">
          {label ? <label htmlFor={selectId}>{label}</label> : null}

          <div className={selectClass}>
            <select
              id={selectId}
              {...rest}
              ref={ref as React.Ref<HTMLSelectElement>}
              className="neo-icon-chevron-down"
              aria-describedby={hintId}
              disabled={disabled}
            >
              {isLoading ? (
                <option value={0}>Loading...</option>
              ) : options ? (
                renderOptions(options)
              ) : null}
            </select>
          </div>

          <div className="neo-input-hint" id={hintId}>
            {hint}
          </div>
        </div>
      </div>
    );
  }
);
