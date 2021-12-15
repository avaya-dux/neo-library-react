import { forwardRef, useEffect, useState } from "react";

import { OptionsProps, OptionType } from "components/Select/SelectTypes";
import { genId } from "utils/accessibilityUtils";

/**
 * Options will use to render the list of options.
 *
 * @example
 * <Options
 *  options={[{ label: "Alabama", value: "AL" }, { label: "Alaska", value: "AK" }]}
    isMultipleSelect={true}
    selectedOptions={[{ label: "Alaska", value: "AK" }]}
    hoveredIndex={1}
    updateHoveredIndex={(index) => { updateCursorIndex(index); }}
    id={`option-id-${idNumber}`} />
 * @see https://design.avayacloud.com/components/web/select-web
 */

export const Options = forwardRef(
  (
    {
      options,
      isMultipleSelect = false,
      labelledby,
      selectedOptions,
      hoveredIndex,
      updateHoveredIndex,
      id,
      topPosition,
    }: OptionsProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const [hoveredOption, setHoveredOption] = useState<OptionType | null>(null);

    useEffect(() => {
      if (options && options.length && hoveredOption) {
        updateHoveredIndex(options.indexOf(hoveredOption));
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
        style={{ top: topPosition || "" }}
      >
        {renderSelectOptions(
          options,
          selectedOptions,
          hoveredIndex,
          setHoveredOption,
          isMultipleSelect
        )}
      </div>
    );
  }
);

export const renderSelectOptions = (
  options: OptionType[] = [],
  selectedOptions: OptionType[],
  hoveredIndex: number,
  callback: (option: OptionType) => void,
  isMultiple: boolean
) => {
  return options
    ? options.map((option, index) => {
        if (option.isPlaceholder) {
          // placeholder options are not selectable, and thus are not rendered in the dropdown
          return null;
        }
        const randomId = genId();
        const { label, value, hint, isDisabled } = option;
        const checkBoxId = `${label}-checkbox-${index}-${randomId}`;
        const checkBoxHintId = `${label}-hint-${index}-${randomId}`;
        const itemId = `${label}-${index}-${randomId}`;

        const isActive = !!selectedOptions.find((item) => item.value === value);
        const isHover = hoveredIndex === index;

        const dataValue = { "data-value": value };
        const checkBoxClassNames = ["neo-check"];

        return isMultiple ? (
          <div
            className={getOptionClassNames(isHover, isDisabled, isActive)}
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
              disabled={isDisabled}
              readOnly
            />
            <label htmlFor={checkBoxId} {...(isDisabled ? "" : dataValue)}>
              {label}
            </label>
            {/**
             * TODO Nested neo-input-hint CSS class
             * https://jira.forge.avaya.com/browse/NEO-755
             */}
            {hint && (
              <p className="neo-input-hint" id={checkBoxHintId}>
                {hint}
              </p>
            )}
          </div>
        ) : (
          <div
            aria-selected={isHover}
            tabIndex={0}
            className={getOptionClassNames(isHover, isDisabled, isActive)}
            onMouseEnter={() => {
              callback(option);
            }}
            id={`${label}-${value}`}
            key={itemId}
            role="option"
            {...(isDisabled ? "" : dataValue)}
          >
            {label}
          </div>
        );
      })
    : null;
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
    classNames.push("neo-multiselect__content__item--disabled");
  }
  if (isActive) {
    classNames.push("neo-multiselect__content__item--focus");
  }
  return classNames.join(" ");
};
