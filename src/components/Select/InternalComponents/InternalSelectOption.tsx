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

  const itemProps = getItemProps({
    item: optionSelf,
    index,
    disabled,
  });

  return isMultipleSelect ? (
    <div className="neo-input-group" key={optionSelf}>
      <input
        aria-describedby={helperText}
        aria-labelledby={labelId}
        checked={selectedItems.includes(optionSelf)}
        className="neo-check"
        disabled={disabled}
        readOnly
        type="checkbox"
      />

      <div {...itemProps} className="neo-check__label" id={labelId}>
        {children}
      </div>

      {helperText && (
        <p className="neo-input-hint" id={helperId}>
          {helperText}
        </p>
      )}
    </div>
  ) : (
    <li {...itemProps} key={`${optionSelf}${index}`}>
      {children}

      {helperText && <p className="neo-input-hint">{helperText}</p>}
    </li>
  );
};
