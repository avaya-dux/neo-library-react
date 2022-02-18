import { FunctionComponent, useContext, useMemo } from "react";

import {
  MultipleSelectOptionProps,
  SelectOptionProps,
  SelectContext,
} from "./SelectTypes";

import { genId } from "utils/accessibilityUtils";

export const SelectOption: FunctionComponent<
  SelectOptionProps | MultipleSelectOptionProps
> = ({ disabled, children, helperText }) => {
  const {
    isMultipleSelect,
    items,
    itemProps,
    highlightedIndex,
    selectedItems,
    index,
  } = useContext(SelectContext);

  const item = items[index];

  const labelId = useMemo(() => `label-id-${genId()}`, []);

  const helperId = useMemo(() => `helper-text-${genId()}`, []);

  if (isMultipleSelect) {
    const MultiSelectOption = (
      <>
        <input
          className="neo-check"
          type="checkbox"
          disabled={disabled}
          checked={!!selectedItems && selectedItems.includes(item)}
          readOnly
          aria-labelledby={labelId}
          aria-describedby={helperId}
        />
        <div
          key={`${item}${index}`}
          {...itemProps({
            item,
            index,
            disabled,
          })}
          style={
            highlightedIndex === index && !disabled
              ? { backgroundColor: "#e8f1fc" }
              : {}
          }
          className="neo-check__label"
          htmlFor={item}
          id={labelId}
        >
          {children}
        </div>
      </>
    );

    return helperText ? (
      <div className="neo-input-group">
        {MultiSelectOption}
        <p className="neo-input-hint" id={helperId}>
          {helperText}
        </p>
      </div>
    ) : (
      <>{MultiSelectOption}</>
    );
  } else {
    return (
      <>
        <li
          // TO-DO: Replace inline styles here with focus styles for Select options in Neo CSS library
          style={
            highlightedIndex === index ? { backgroundColor: "#e8f1fc" } : {}
          }
          key={`${item}${index}`}
          {...itemProps({ item, index, disabled })}
        >
          {children}
        </li>
      </>
    );
  }
};
