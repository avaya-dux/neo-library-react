import { forwardRef, useEffect, useState } from "react";

import { OptionsProps, OptionType } from "./SelectTypes";

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
    const [hovered, setHovered] = useState<OptionType | null>(null);

    useEffect(() => {
      if (options.length && hovered) {
        updateCursor(options.indexOf(hovered));
      }
    }, [hovered]);

    /**
     * TODO
     * https://jira.forge.avaya.com/browse/NEO-709
     * the current HTML structure doesn't match with the online documentation
     * https://design.avayacloud.com/components/web/selectbox-web
     */

    /**
     * return isMultipleSelect ? (
      <ul
        ref={ref}
        className="neo-multiselect__content"
        aria-labelledby={labelledby}
      >
        {renderMultipleOptions(options, selectedItems, cursor, setHovered)}
      </ul>
    ) : (
      <div className="neo-multiselect__content">
        <ul aria-labelledby={labelledby}>
          {renderSingleOptions(options, cursor)}
        </ul>
      </div>
    );
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
          ? renderMultipleOptions(options, selectedItems, cursor, setHovered)
          : renderSingleOptions(options, cursor)}
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
    const { label, value, hint, disabled, placeholder } = option;
    const checkBoxId = `${label}-checkbox-${index}`;
    const checkBoxHintId = `${label}-hint-${index}`;

    const isActive = !!selectedItems.find((item) => item.value === value);
    const isHover = cursor === index;

    const dataValue = { "data-value": value };

    // remove placeholder form the option list

    return placeholder ? null : (
      <div
        className={getOptionClassNames(isHover, disabled, isActive)}
        key={checkBoxId}
        role="listitem"
      >
        <input
          className="neo-check"
          type="checkbox"
          id={checkBoxId}
          value={value}
          tabIndex={-1}
          checked={isActive}
          onMouseEnter={() => callback(option)}
          onChange={() => {}}
          aria-describedby={checkBoxHintId}
          disabled={disabled}
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

export const renderSingleOptions = (options: OptionType[], cursor: number) => {
  return options.map((option, index) => {
    const { label, value, disabled, placeholder } = option;
    const itemId = `${label}-${index}`;

    const isHover = cursor === index;

    const dataValue = { "data-value": value };

    // remove placeholder form the option list

    return placeholder ? null : (
      <div
        aria-selected={isHover}
        className={getOptionClassNames(isHover, disabled)}
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
