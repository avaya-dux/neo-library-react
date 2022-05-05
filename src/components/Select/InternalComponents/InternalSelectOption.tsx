import { useContext, useMemo } from "react";

import { genId } from "utils/accessibilityUtils";

import { SelectContext } from "../utils/SelectContext";
import { SelectOptionProps } from "../utils/SelectTypes";

export interface InternalSelectOptionProps extends SelectOptionProps {
  index: number;
}

export const InternalSelectOption = ({
  children,
  disabled,
  helperText,
  index,
}: InternalSelectOptionProps) => {
  const {
    downshiftProps: { getItemProps },

    optionProps: { multiple, options, selectedItems },
  } = useContext(SelectContext);

  const optionSelf = options[index];

  const labelId = useMemo(() => `label-id-${genId()}`, []);

  const helperId = useMemo(() => `helper-text-${genId()}`, []);

  const itemProps = getItemProps({
    item: optionSelf,
    index,
    disabled,
  });

  return multiple ? (
    <div className="neo-input-group">
      <input
        aria-describedby={helperText && helperId}
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
