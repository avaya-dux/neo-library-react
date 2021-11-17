import { useEffect, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { displayErrorOrHelper, getOption } from "./helper";
import { NativeSelectProps, OptionType } from "./SelectTypes";

/**
 * NativeSelect will use the standard <select> <option> HTML structure.
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
 *
 *
 * @see https://design.avayacloud.com/components/web/selectbox-web
 */

export const NativeSelect = ({
  className,
  disabled,
  errorMessages,
  helperMessages,
  id,
  isLoading,
  label,
  loaderText = "Loading...",
  onChange,
  options,
  required,
  value,
}: NativeSelectProps) => {
  const labelId = useMemo(() => `neo-native-select-label-id-${genId()}`, []);

  const selectId = useMemo(
    () => id || `neo-native-select-id-${label.replace(/\s/g, "")}`,
    [id, label]
  );

  const selectClassName = useMemo(() => {
    return getNativeSelectClassNames(isLoading);
  }, [isLoading]);

  const defaultSelected = getOption(options);

  const [selectedItem, updateSelectedItem] = useState(
    defaultSelected[0]?.label
  );

  useEffect(() => {
    if (value) {
      const selected = getOption(options, [value]);
      updateSelectedItem(selected[0]?.value);
    }
  }, [value, options]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const selected = getOption(options, [value]);

    updateSelectedItem(selected[0]?.value);
    if (onChange) {
      onChange(value);
    }
  };

  const memoizedRenderOptions = useMemo(
    () => renderOptions(options),
    [options]
  );

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={!!errorMessages}
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
          aria-labelledby={labelId}
          disabled={disabled}
          value={selectedItem}
          data-testid="select-container"
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

export const renderOptions = (options: OptionType[]) => {
  return options.map((option, index) => {
    const { label, value, disabled, placeholder } = option;

    return (
      <option
        key={`${label}-${value}-${index}`}
        value={value}
        disabled={disabled}
        hidden={placeholder}
        data-testid={`option-${label}-${value}`}
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
