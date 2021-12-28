import { useMemo } from "react";

import { Tooltip, TooltipPosition } from "components/Tooltip";
import { genId } from "utils/accessibilityUtils";

import { getCheckboxClassName } from "./helpers";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked"
  > {
  checked?: boolean | "indeterminate";
  describedBy?: string;
  isLabelHidden?: boolean;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: { label: string; position?: TooltipPosition };
  value: string;
}

/**
 * Checkboxes are used when several choices are available and multiple selections are allowed.
 *
 * @example
 * <Checkbox label="Checkbox 1" value="Checkbox 1" name="Checkbox Group Name"/>
 *
 * @see https://design.avayacloud.com/components/web/checkbox-web
 */

export const Checkbox = ({
  checked,
  describedBy,
  id,
  isLabelHidden = false,
  label,
  name,
  onChange,
  tooltip,
  value,
  ...rest
}: CheckboxProps) => {
  const internalId = useMemo(() => id || genId(), []);

  const computeInputJSX = () => {
    return (
      <>
        <input
          value={value}
          type="checkbox"
          onChange={onChange}
          name={name}
          id={internalId}
          checked={checked === true || checked === "indeterminate"}
          aria-describedby={describedBy}
          {...getCheckboxClassName(checked === "indeterminate")}
          {...rest}
        />

        <Label
          htmlFor={internalId}
          label={label}
          isLabelHidden={isLabelHidden}
        />
      </>
    );
  };

  return tooltip ? (
    <Tooltip label={tooltip.label} position={tooltip.position}>
      {computeInputJSX()}
    </Tooltip>
  ) : (
    computeInputJSX()
  );
};

const Label = ({
  htmlFor,
  label,
  isLabelHidden,
}: {
  htmlFor: string;
  label: string;
  isLabelHidden: boolean;
}) => {
  return (
    <label htmlFor={htmlFor}>
      {isLabelHidden ? <div className="neo-display-none">{label}</div> : label}
    </label>
  );
};