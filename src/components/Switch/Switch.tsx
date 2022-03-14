import clsx from "clsx";
import { FC, useMemo, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { SwitchProps } from "./SwitchTypes";

/**
 * Switches allow end-users to toggle between options such as “On/Off” and “Show/Hide”.
 *
 * @example
 * <Switch
 *   label="Disabled Example"
 *   disabled
 *   defautlChecked={true}
 *   onChange={(event, checked) => setChecked(checked)}
 * />
 *
 * <Switch
 *   label="Toggle-able example"
 *   checked={checked}
 *   onChange={(event, checked) => setChecked(checked)}
 * />
 *
 * @see https://neo-library-react-storybook.netlify.app/?path=/story/components-switch--default
 */
export const Switch: FC<SwitchProps> = ({
  children,
  error,
  id,
  label,
  multiline,
  onChange,

  ...rest
}) => {
  const { checked, defaultChecked, disabled, required } = rest;
  const internalId = useMemo(() => id || genId(), [id]);

  const [boldLabel, setBoldLabel] = useState(
    defaultChecked || checked || false
  );

  return (
    <NeoInputWrapper disabled={disabled} error={error} required={required}>
      <label
        className={clsx(
          "neo-switch",
          multiline && "neo-switch--multiline",
          disabled && "neo-switch--disabled"
        )}
        htmlFor={internalId}
        style={{
          fontWeight: boldLabel ? 600 : undefined,
        }}
      >
        <input
          {...rest}
          id={internalId}
          type="checkbox"
          onChange={(event) => {
            setBoldLabel(event.target.checked);
            onChange?.(event, event.target.checked);
          }}
        />
        <i className="neo-switch__icon" />
        {label}
      </label>
    </NeoInputWrapper>
  );
};
