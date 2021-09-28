import { forwardRef, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import { LayoutType, OptionType, SelectHandlerType } from "./SelectTypes";
import { SelectContainer } from "./SelectContainer";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: OptionType[];
  hint: string;
  displayHintAsAnError?: boolean;
  layout?: LayoutType;
  onSelected?: SelectHandlerType;
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
      layout = "standard",
      ...rest
    }: SelectProps,
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

    const renderOptions = (options: OptionType[], layout: LayoutType) => {
      return options.map((option, index) => {
        const { label, value } = option;

        return layout === "basic" ? (
          <option key={`${label}-${value}-${index}`} value={value}>
            {label}
          </option>
        ) : (
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

    return (
      <div className={componentClasses}>
        <div className="neo-input-group">
          {label ? <label htmlFor={selectId}>{label}</label> : null}

          <SelectContainer
            layout={layout}
            options={options}
            selectId={selectId}
            hintId={hintId}
            ref={ref}
            {...rest}
          >
            {options ? renderOptions(options, layout) : null}
          </SelectContainer>

          <div className="neo-input-hint" id={hintId}>
            {hint}
          </div>
        </div>
      </div>
    );
  }
);
