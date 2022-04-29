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
    downshiftProps: { getItemProps },

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
    <div {...optionProps} className="neo-input-group" key={optionSelf}>
      <input
        aria-describedby={helperText && helperId}
        aria-labelledby={labelId}
        checked={selectedItems.includes(optionSelf)}
        className="neo-check"
        disabled={disabled}
        readOnly
        type="checkbox"
      />

      <div className="neo-check__label" id={labelId}>
        {children}
      </div>

      <p className="neo-input-hint" id={helperId}>
        {helperText}
      </p>
    </div>
  ) : (
    <li {...optionProps} key={`${optionSelf}${index}`}>
      {children}
    </li>
  );
};
