import { useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import {
  displayErrorOrHelper,
  getOptionByValue,
} from "components/Select/helper";
import { NativeSelectProps, OptionType } from "components/Select/SelectTypes";

/**
 * NativeSelect is built using native HTML elements `<select> <option>`.
 * the NativeSelect do not support multiple, for this use Select component instead.
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
 * @see https://design.avayacloud.com/components/web/select-web
 */

export const NativeSelect = ({
  className,
  defaultValue,
  disabled,
  errorMessages,
  helperMessages,
  id,
  isLoading,
  label,
  loaderText = "Loading...",
  onChange,
  options,
  placeholder = "--Please choose an option--",
  required,
}: NativeSelectProps) => {
  const randomId = genId();
  const labelId = useMemo(
    () => `neo-native-select-label-id-${randomId}`,
    [label]
  );

  const selectId = useMemo(
    () => id || `neo-native-select-id-${randomId}`,
    [id, label]
  );

  const selectClassName = useMemo(() => {
    return getNativeSelectClassNames(isLoading);
  }, [isLoading]);

  const [selectedItem, updateSelectedItem] = useState("");

  useEffect(() => {
    if (defaultValue) {
      const selected = getOptionByValue(options, [defaultValue as string]);
      updateSelectedItem(selected.map((option) => option.value).join(""));
    }
  }, [defaultValue, options]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selected = getOptionByValue(options, [value]);

    updateSelectedItem(selected[0]?.value);
    if (onChange) {
      onChange(e);
    }
  };

  const memoizedRenderOptions = useMemo(
    () => renderOptions(options, placeholder),
    [options, placeholder]
  );

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={errorMessages && errorMessages.length > 0}
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
          className="neo-icon-chevron-down"
          disabled={disabled}
          value={selectedItem}
          data-value={selectedItem}
        >
          {isLoading ? (
            <option value={loaderText}>{loaderText}</option>
          ) : (
            memoizedRenderOptions
          )}
        </select>
      </div>

      {displayErrorOrHelper(errorMessages, helperMessages)}
    </NeoInputWrapper>
  );
};

export const renderOptions = (options: OptionType[], placeholder: string) => {
  const placeholderIsPresent = options.find((option) => option.isPlaceholder);

  if (!placeholderIsPresent) {
    const defaultPlaceholder = {
      label: placeholder,
      value: "0",
      isPlaceholder: true,
      isDisabled: false,
    };
    options.push(defaultPlaceholder);
  }
  return options.map((option, index) => {
    const { label, value, isDisabled, isPlaceholder } = option;

    return (
      <option
        key={`${value}-${index}`}
        value={value}
        disabled={isDisabled}
        hidden={isPlaceholder}
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
