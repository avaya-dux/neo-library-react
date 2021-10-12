import { forwardRef, useEffect, useState } from "react";
import { genId } from "utils/accessibilityUtils";
import { OptionType } from "./SelectTypes";

export interface OptionsProps {
  options: OptionType[];
  isMultipleSelect: boolean;
  labelledby: string;
  selectedItems: OptionType[];
  cursor: number;
  updateCursor: (cursor: number) => void;
}

export const Options: React.FC<OptionsProps> = forwardRef(
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
      if (options?.length && hovered) {
        updateCursor(options.indexOf(hovered));
      }
    }, [hovered]);

    const renderOptions = (
      options: OptionType[],
      isMultipleSelect: boolean
    ) => {
      /* multiple select and single select must have same css styles
       * TODO https://jira.forge.avaya.com/browse/NEO-679
       */
      const roleType = isMultipleSelect ? "listitem" : "option";
      return isMultipleSelect
        ? options.map((option, index) => {
            const { label, value, hint, disabled } = option;
            const checkBoxId = genId();
            const checkBoxHindId = genId();
            const isActive = !!selectedItems.find(
              (item) => item.value === value
            );
            const isHover = cursor === index;

            /*
             * .active and .hover classNames are missing on the neo.css
             * TODO https://jira.forge.avaya.com/browse/NEO-683
             *
             */
            const classNames = ["neo-input-group"];

            if (isActive) {
              classNames.push("active");
            }

            if (isHover) {
              classNames.push("hover");
            }

            const dataValue = { "data-value": value };

            return (
              <li
                className={classNames.join(" ")}
                key={checkBoxId}
                aria-label={label}
                role={roleType}
                tabIndex={-1}
              >
                <input
                  className="neo-check"
                  type="checkbox"
                  id={checkBoxId}
                  value={value}
                  tabIndex={-1}
                  defaultChecked={isActive}
                  onMouseEnter={() => setHovered(option)}
                  aria-describedby={checkBoxHindId}
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
                {hint ? (
                  <p className="neo-input-hint" id={checkBoxHindId}>
                    {hint}
                  </p>
                ) : null}
              </li>
            );
          })
        : options.map((option, index) => {
            const itemId = genId();
            const { label, value, disabled } = option;

            const isHover = cursor === index;

            const classNames = ["list-item"];

            if (isHover) {
              classNames.push("hover");
            }
            if (disabled) {
              /**
               * TODO disabled is not a native property from <li> element,
               * then a new CSS need to be created to support disabled option
               * https://jira.forge.avaya.com/browse/NEO-699
               */
              classNames.push("disabled");
            }

            const dataValue = { "data-value": value };

            return (
              <li
                className={classNames.join(" ")}
                key={itemId}
                tabIndex={-1}
                role={roleType}
                {...(disabled ? "" : dataValue)}
              >
                {label}
              </li>
            );
          });
    };

    return (
      <ul
        ref={ref}
        className="neo-multiselect__content"
        aria-labelledby={labelledby}
        role={isMultipleSelect ? "list" : "listbox"}
      >
        {options ? renderOptions(options, isMultipleSelect) : null}
      </ul>
    );
  }
);
