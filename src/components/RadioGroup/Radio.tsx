import { useMemo } from "react";

import { Tooltip } from "components";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  describedBy?: string;
  selected?: string;
  tooltip?: string;
  position?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
}

export const Radio = ({
  describedBy,
  selected,
  tooltip,
  position,
  label,
  checked,
  value,
  name,
  onChange,
  ...rest
}: RadioProps) => {
  const idForLabel = useMemo(() => `radio-id-${name}-${value}`, [name, value]);
  const radioTestId = useMemo(() => `Radio-root-${value}`, [value]);
  const labelTestId = useMemo(() => `Radio-label-root-${value}`, [value]);

  const Label = () => {
    return (
      <label htmlFor={idForLabel} data-testid={labelTestId}>
        {label}
      </label>
    );
  };

  return (
    <>
      <input
        className="neo-radio"
        type="radio"
        id={idForLabel}
        checked={checked || selected === value}
        data-testid={radioTestId}
        aria-describedby={describedBy}
        value={value}
        name={name}
        onChange={onChange}
        {...rest}
      />
      {tooltip ? (
        <Tooltip label={tooltip}>
          <Label />
        </Tooltip>
      ) : (
        <Label />
      )}
    </>
  );
};
