import { useState, useEffect, forwardRef, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";
import { getOption } from "utils/SelectUtils";

import { OptionType, NativeSelectProps } from "./SelectTypes";

export const NativeSelect = forwardRef(
  (
    {
      className,
      disabled,
      errorText,
      helperText,
      id,
      isLoading,
      label,
      onChange = (event) => {
        console.log(event.target.value);
      },
      options,
      required,
      value,
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const labelId = genId();
    const hintId = genId();
    const selectId = id || genId();

    const selectClassName = useMemo(() => {
      return getNativeSelectClassNames(isLoading);
    }, [isLoading]);

    const defaultSelected = getOption(options);

    const [selectedItems, updateSelectedItems] =
      useState<OptionType[]>(defaultSelected);

    useEffect(() => {
      if (value) {
        const selected = getOption(options, value);
        updateSelectedItems(selected);
      }
    }, [value, options]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = getOption(options, [e.target.value]);
      updateSelectedItems(selected);
      onChange(e);
    };

    return (
      <NeoInputWrapper
        disabled={disabled}
        error={!!errorText}
        required={required}
        wrapperClassName={className}
      >
        <label id={labelId} htmlFor={selectId}>
          {label}
        </label>

        <div className={selectClassName}>
          <select
            id={selectId}
            onBlur={onChange}
            onChange={onChangeHandler}
            ref={ref as React.Ref<HTMLSelectElement>}
            className="neo-icon-chevron-down"
            aria-labelledby={labelId}
            disabled={disabled}
            value={selectedItems.map((item) => item.value).join(", ")}
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
            ? errorText.map((item, index) => (
                <div key={`${item}-${index}`}>{item}</div>
              ))
            : helperText && Array.isArray(helperText)
            ? helperText.map((item, index) => (
                <div key={`${item}-${index}`}>{item}</div>
              ))
            : null}
        </div>
      </NeoInputWrapper>
    );
  }
);

export const renderOptions = (options: OptionType[]) => {
  return options.map((option, index) => {
    const { label, value, disabled, placeholder } = option;

    return (
      <option
        key={`${label}-${value}-${index}`}
        value={value}
        disabled={disabled}
        hidden={placeholder}
      >
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
