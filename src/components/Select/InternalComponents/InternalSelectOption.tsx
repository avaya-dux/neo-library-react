import { useContext, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";

export const InternalSelectOption = ({
  children,
  disabled,
  helperText,
  index,
}: SelectOptionProps & { index: number }) => {
  const {
    downshiftProps: { getItemProps, highlightedIndex },

    optionProps: { isMultipleSelect, options, selectedItems },
  } = useContext(SelectContext);

  const optionSelf = options[index];

  const labelId = useMemo(() => `label-id-${genId()}`, []);

  const helperId = useMemo(() => `helper-text-${genId()}`, []);

  const optionProps = getItemProps({
    item: optionSelf,
    index,
    disabled,
  });

  return isMultipleSelect ? (
    <div className="neo-input-group">
      <input
        className="neo-check"
        type="checkbox"
        disabled={disabled}
        checked={!!selectedItems && selectedItems.includes(optionSelf)}
        readOnly
        aria-labelledby={labelId}
        aria-describedby={helperId}
      />

      <div
        key={optionSelf}
        {...optionProps}
        style={
          highlightedIndex === index && !disabled
            ? { backgroundColor: "#e8f1fc" }
            : {}
        }
        className="neo-check__label"
        htmlFor={optionSelf}
        id={labelId}
      >
        {children}
      </div>

      <p className="neo-input-hint" id={helperId}>
        {helperText}
      </p>
    </div>
  ) : (
    <li
      // TO-DO: Replace inline styles here with focus styles for Select options in Neo CSS library
      style={highlightedIndex === index ? { backgroundColor: "#e8f1fc" } : {}}
      key={`${optionSelf}${index}`}
      {...optionProps}
    >
      {children}
    </li>
  );
};
