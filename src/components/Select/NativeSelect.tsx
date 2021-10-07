import { forwardRef, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";
import { getSelectContainerClass } from "utils/SelectUtils";

import { OptionType } from "../Select/SelectTypes";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  displayHintAsAnError?: boolean;
  hint: string;
  isLoading?: boolean;
  label: string;
  options: OptionType[];
  required?: boolean;
  value?: string;
}

const defaultOptions: OptionType[] = [{ label: "Loading...", value: "" }];

export const NativeSelect: React.FC<NativeSelectProps> = forwardRef(
  (
    {
      className,
      disabled,
      displayHintAsAnError,
      hint,
      isLoading,
      label = "label",
      options = defaultOptions,
      required,
      ...rest
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const LabelId = genId();
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
          <label id={LabelId} htmlFor={selectId}>
            {label}:
          </label>

          <div className={selectClass}>
            <select
              id={selectId}
              {...rest}
              ref={ref as React.Ref<HTMLSelectElement>}
              className="neo-icon-chevron-down"
              aria-labelledby={LabelId}
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
