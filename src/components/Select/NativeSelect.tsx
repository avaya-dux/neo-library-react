import { useState, useEffect, forwardRef, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";
import { getOption } from "utils/SelectUtils";

import { OptionType, NativeSelectProps } from "./SelectTypes";

/**
 * NativeSelect will use the standard <select> <option> HTML structure.
 *
 * @example
 *  <NativeSelect
        label="List of States"
        onChange={(event) => {
          console.log("selected value-> ", event.target.value);
        }}
        helperText={["Please choose a State"]}
        options={[
          { label: "Alabama", value: "AL" },
          { label: "Alaska", value: "AK" },
          { label: "Arizona", value: "AZ" },
        ]}
      />
 *
 *
 * @see https://design.avayacloud.com/components/web/selectbox-web
 */

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
      onChange,
      options,
      required,
      value,
    }: NativeSelectProps,
    ref: React.Ref<HTMLSelectElement>
  ) => {
    const labelId = useMemo(() => genId(), []);
    const hintId = useMemo(() => genId(), []);
    const selectId = useMemo(() => id || genId(), []);

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
      const optionList = e.target.options;
      const values: OptionType[] = [];
      for (let i = 0, l = options.length; i < l; i++) {
        if (optionList[i].selected) {
          values.push(options[i]);
        }
      }

      updateSelectedItems(values);
      if (onChange) {
        onChange(values.map((item) => item.value));
      }
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
            onBlur={onChangeHandler}
            onChange={onChangeHandler}
            ref={ref as React.Ref<HTMLSelectElement>}
            className="neo-icon-chevron-down"
            aria-labelledby={labelId}
            disabled={disabled}
            value={selectedItems.map((item) => item.value).toString()}
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
