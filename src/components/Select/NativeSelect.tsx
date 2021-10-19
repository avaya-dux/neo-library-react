import { forwardRef, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { OptionType, NativeSelectProps } from "./SelectTypes";

export const NativeSelect: React.FC<NativeSelectProps> = forwardRef(
  (
    {
      className,
      disabled,
      errorText,
      helperText,
      isLoading,
      label,
      options,
      required,
      ...rest
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const LabelId = genId();
    const hintId = genId();
    const selectId = rest.id || genId();

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
            ) : (
              renderOptions(options)
            )}
          </select>
        </div>

        <div className="neo-input-hint" id={hintId}>
          {errorText && Array.isArray(errorText)
            ? errorText.map((item) => <div>{item}</div>)
            : helperText && Array.isArray(helperText)
            ? helperText.map((item) => <div>{item}</div>)
            : null}
        </div>
      </NeoInputWrapper>
    );
  }
);

export const renderOptions = (options: OptionType[]) => {
  return options.map((option, index) => {
    const { label, value } = option;

    return (
      <option key={`${label}-${value}-${index}`} value={value}>
        {label}
      </option>
    );
  });
};

export const getNativeSelectClassNames = (isLoading?: boolean) => {
  const classArray = ["neo-select"];

  if (isLoading) {
    classArray.push("neo-select__spinner");
  }

  return classArray.join(" ");
};
