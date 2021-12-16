import clsx from "clsx";
import { useMemo } from "react";

import { Tooltip, TooltipPosition } from "components/Tooltip";
import { genId } from "utils/accessibilityUtils";

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
  position?: TooltipPosition;
  tooltip?: string;
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
  position,
  tooltip,
  value,
  ...rest
}: CheckboxProps) => {
  const internalId = useMemo(() => id || genId(), []);

  const computeInputJSX = () => {
    return (
      <input
        value={value}
        type="checkbox"
        onChange={onChange}
        name={name}
        id={internalId}
        checked={!!checked}
        aria-describedby={describedBy}
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
          <Label
            htmlFor={internalId}
            label={label}
            isLabelHidden={isLabelHidden}
          />
        </Tooltip>
      ) : (
        <>
          {computeInputJSX()}
          <Label
            htmlFor={internalId}
            label={label}
            isLabelHidden={isLabelHidden}
          />
        </>
      )}
    </>
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
    <label
      className={clsx(isLabelHidden && "neo-display-none")}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
};

export function getCheckboxClassName(isIndeterminate: boolean) {
  const classNames = ["neo-check"];

  if (isIndeterminate) {
    classNames.push("neo-check--indeterminate");
  }

  return { className: classNames.join(" ") };
}
