import { forwardRef, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import { OptionType } from "./SelectTypes";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionType[];
  hint: string;
  displayHintAsAnError?: boolean;
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
      ...rest
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const hintId = genId();
    const selectId = genId();

    const componentClasses = useMemo(() => {
      const classArray = ["neo-form-control"];

      if (displayHintAsAnError) {
        classArray.push("neo-form-control--error");
      }

      return [...classArray, className].join(" ");
    }, [displayHintAsAnError]);

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

    return (
      <div className={componentClasses}>
        <div className="neo-input-group">
          {label ? <label htmlFor={selectId}>{label}</label> : null}

          <div className="neo-select">
            <select
              id={selectId}
              {...rest}
              ref={ref as React.Ref<HTMLSelectElement>}
              className="neo-icon-chevron-down"
              aria-describedby={hintId}
            >
              {options ? renderOptions(options) : null}
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
