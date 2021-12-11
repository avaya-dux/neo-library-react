import { useMemo } from "react";

import { Tooltip, TooltipPosition } from "components/Tooltip";
import { genId } from "utils/accessibilityUtils";

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "checked"
  > {
  describedBy?: string;
  checked?: boolean | "indeterminate";
  tooltip?: string;
  position?: TooltipPosition;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
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
  describedBy,
  checked,
  id,
  tooltip,
  position,
  label,
  value,
  name,
  onChange,
  ...rest
}: CheckboxProps) => {
  const internalId = useMemo(() => id || genId(), []);

  const computeInputJSX = () => {
    return (
      <input
        aria-describedby={describedBy}
        checked={!!checked}
        id={internalId}
        name={name}
        onChange={onChange}
        type="checkbox"
        value={value}
        {...getCheckboxClassName(checked === "indeterminate")}
        {...rest}
      />
    );
  };

  return (
    <>
      {tooltip ? (
        <Tooltip label={tooltip} position={position}>
          {computeInputJSX()}
          <Label htmlFor={internalId} label={label} />
        </Tooltip>
      ) : (
        <>
          {computeInputJSX()}
          <Label htmlFor={internalId} label={label} />
        </>
      )}
    </>
  );
};

const Label = ({ htmlFor, label }: { htmlFor: string; label: string }) => {
  return <label htmlFor={htmlFor}>{label}</label>;
};

export function getCheckboxClassName(isIndeterminate: boolean) {
  const classNames = ["neo-check"];

  if (isIndeterminate) {
    classNames.push("neo-check--indeterminate");
  }

  return { className: classNames.join(" ") };
}
