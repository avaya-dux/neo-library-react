import { forwardRef, useEffect, useState } from "react";

import { OptionType } from "./SelectTypes";

export interface OptionsProps {
  options: OptionType[];
  isMultipleSelect: boolean;
  labelledby: string;
  selectedItems: OptionType[];
  cursor: number;
  updateCursor: (cursor: number) => void;
}

export const Options = forwardRef(
  (
    {
      options,
      isMultipleSelect,
      labelledby,
      selectedItems,
      cursor,
      updateCursor,
    }: OptionsProps,
    ref: React.Ref<HTMLUListElement>
  ) => {
    const [hovered, setHovered] = useState<OptionType | null>(null);

    useEffect(() => {
      if (options.length && hovered) {
        updateCursor(options.indexOf(hovered));
      }
    }, [hovered]);

    return (
      <ul
        ref={ref}
        className="neo-multiselect__content"
        aria-labelledby={labelledby}
        role={isMultipleSelect ? "list" : "listbox"}
      >
        {isMultipleSelect
          ? renderMultipleOptions(options, selectedItems, cursor, setHovered)
          : renderSingleOptions(options, cursor)}
      </ul>
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
  const roleType = "listitem";
  return options.map((option, index) => {
    const { label, value, hint, disabled, placeholder } = option;
    const checkBoxId = `${label}-checkbox-${index}`;
    const checkBoxHintId = `${label}-hint-${index}`;

    const isActive = !!selectedItems.find((item) => item.value === value);
    const isHover = cursor === index;

    /*
     * .active and .hover classNames are missing on the neo.css
     * TODO https://jira.forge.avaya.com/browse/NEO-683
     *
     */
    const classNames = ["neo-input-group"];

    if (isActive) {
      classNames.push("neo-multiselect__content__item--focus");
    }

    if (isHover) {
      classNames.push("neo-multiselect__content__item--hover");
    }

    const dataValue = { "data-value": value };

    // remove placeholder form the option list

    return placeholder ? null : (
      <li
        aria-label={label}
        className={classNames.join(" ")}
        key={checkBoxId}
        role={roleType}
        tabIndex={-1}
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
      </li>
    );
  });
};

export const renderSingleOptions = (options: OptionType[], cursor: number) => {
  const roleType = "option";
  return options.map((option, index) => {
    const { label, value, disabled, placeholder } = option;
    const itemId = `${label}-${index}`;

    const isHover = cursor === index;

    const classNames = [""];

    if (isHover) {
      classNames.push("neo-multiselect__content__item--hover");
    }
    if (disabled) {
      /**
       * TODO disabled is not a native property from <li> element,
       * then a new CSS need to be created to support disabled option
       * https://jira.forge.avaya.com/browse/NEO-699
       */
      classNames.push("neo-multiselect__content__item--disabled");
    }

    const dataValue = { "data-value": value };

    // remove placeholder form the option list

    return placeholder ? null : (
      <li
        aria-selected={isHover}
        className={classNames.join(" ")}
        key={itemId}
        role={roleType}
        tabIndex={-1}
        {...(disabled ? "" : dataValue)}
      >
        {label}
      </li>
    );
  });
};
