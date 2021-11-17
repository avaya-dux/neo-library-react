import { forwardRef, useEffect, useState } from "react";

import { OptionsProps, OptionType } from "./SelectTypes";

/**
 * Options will use to render the list of options.
 *
 * @example
 * <Options options={[Array]}
    isMultipleSelect={Boolean}
    labelledby={string}
    labelId={string}
    selectedItems={[Array]}
    cursor={number}
    updateCursor={[Function]}
    id={string} />
 *
 *
 * @see https://design.avayacloud.com/components/web/selectbox-web
 */

export const Options = forwardRef(
  (
    {
      options,
      isMultipleSelect,
      labelledby,
      selectedItems,
      cursor,
      updateCursor,
      id,
    }: OptionsProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);

    useEffect(() => {
      if (options.length && hoveredOption) {
        updateCursor(options.indexOf(hoveredOption));
      }
    }, [hoveredOption]);

    /**
     * TODO
     * https://jira.forge.avaya.com/browse/NEO-709
     * the current HTML structure doesn't match with the online documentation
     * https://design.avayacloud.com/components/web/selectbox-web
     */

    return (
      <div
        ref={ref}
        className="neo-multiselect__content"
        role={isMultipleSelect ? "list" : "listbox"}
        id={id}
        aria-labelledby={labelledby}
        tabIndex={-1}
      >
        {isMultipleSelect
          ? renderMultipleOptions(
              options,
              selectedItems,
              cursor,
              setHoveredOption
            )
          : renderSingleOptions(
              options,
              selectedItems,
              cursor,
              setHoveredOption
            )}
      </div>
    );
  }
);

export const renderMultipleOptions = (
  options: OptionType[],
  selectedItems: OptionType[],
  cursor: number,
  callback: (option: OptionType) => void
) => {
  /* multiple select and single select must have same css styles
   * TODO https://jira.forge.avaya.com/browse/NEO-679
   */

  return options.map((option, index) => {
    if (option.placeholder) {
      // if placeholder is true, that is mean that will not be render on the list
      return null;
    }
    const { label, value, hint, disabled } = option;
    const checkBoxId = `${label}-checkbox-${index}`;
    const checkBoxHintId = `${label}-hint-${index}`;

    const isActive = !!selectedItems.find((item) => item.value === value);
    const isHover = cursor === index;

    const dataValue = { "data-value": value };
    const checkBoxClassNames = ["neo-check"];

    return (
      <div
        className={getOptionClassNames(isHover, disabled, isActive)}
        key={checkBoxId}
        id={`${label}-${value}`}
        role="listitem"
      >
        <input
          className={checkBoxClassNames.join(" ")}
          type="checkbox"
          id={checkBoxId}
          value={value}
          tabIndex={-1}
          checked={isActive}
          onMouseEnter={() => callback(option)}
          aria-describedby={checkBoxHintId}
          disabled={disabled}
          readOnly
        />
        <label htmlFor={checkBoxId} {...(disabled ? "" : dataValue)}>
          {label}
        </label>
        {/**
         * TODO
         * Select Box Multiple Select -> Hint text helper is not aligned properly when is disabled
         * https://jira.forge.avaya.com/browse/NEO-700
         */}
        {hint && (
          <p className="neo-input-hint" id={checkBoxHintId}>
            {hint}
          </p>
        )}
      </div>
    );
  });
};

export const renderSingleOptions = (
  options: OptionType[],
  selectedItems: OptionType[],
  cursor: number,
  callback: (option: OptionType) => void
) => {
  return options.map((option, index) => {
    if (option.placeholder) {
      // remove placeholder form the option list
      return null;
    }
    const { label, value, disabled } = option;
    const itemId = `${label}-${index}`;

    const isActive = !!selectedItems.find((item) => item.value === value);
    const isHover = cursor === index;

    const dataValue = { "data-value": value };

    return (
      <div
        aria-selected={isHover}
        tabIndex={0}
        className={getOptionClassNames(isHover, disabled, isActive)}
        onMouseEnter={() => callback(option)}
        id={`${label}-${value}`}
        key={itemId}
        role="option"
        {...(disabled ? "" : dataValue)}
      >
        {label}
      </div>
    );
  });
};

export const getOptionClassNames = (
  isHover?: boolean,
  isDisabled?: boolean,
  isActive?: boolean
) => {
  /*
   * .active and .hover classNames are missing on the neo.css
   * TODO https://jira.forge.avaya.com/browse/NEO-683
   *
   */
  const classNames = ["neo-input-group"];

  if (isHover) {
    classNames.push("neo-multiselect__content__item--hover");
  }
  if (isDisabled) {
    /**
     * TODO disabled is not a native property from <li> element,
     * then a new CSS need to be created to support disabled option
     * https://jira.forge.avaya.com/browse/NEO-699
     */
    classNames.push("neo-multiselect__content__item--disabled");
  }
  if (isActive) {
    classNames.push("neo-multiselect__content__item--focus");
  }
  return classNames.join(" ");
};
