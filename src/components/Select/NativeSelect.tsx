import { forwardRef, useMemo } from "react";
import { NeoInputWrapper } from "components/NeoInputWrapper";

import { genId } from "utils/accessibilityUtils";

import { OptionType } from "../Select/SelectTypes";

export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  errorText?: string[];
  helperText?: string[];
  isLoading?: boolean;
  label: string;
  options: OptionType[];
  required?: boolean;
  value?: string;
}

export const NativeSelect: React.FC<NativeSelectProps> = forwardRef(
  (
    {
      className,
      disabled,
      errorText,
      helperText,
      isLoading,
      label = "label",
      options,
      required,
      ...rest
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const LabelId = genId();
    const hintId = genId();
    const selectId = rest.id || genId();

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

    const selectClassName = useMemo(() => {
      return getNativeSelectClassNames(isLoading);
    }, [isLoading]);

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

        <div className={selectClassName}>
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

export const getNativeSelectClassNames = (isLoading?: boolean) => {
  const classArray = ["neo-select"];

  if (isLoading) {
    classArray.push("neo-select__spinner");
  }

  return classArray.join(" ");
};
