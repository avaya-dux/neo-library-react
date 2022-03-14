import clsx from "clsx";
import { FC, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { SwitchProps } from "./SwitchTypes";

import "./Switch_shim.css";

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
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
 */
export const Switch: FC<SwitchProps> = ({
  children,
  error,
  id,
  multiline,
  onChange,

  ...rest
}) => {
  const { disabled, required } = rest;
  const internalId = useMemo(() => id || genId(), [id]);

  return (
    <NeoInputWrapper disabled={disabled} error={error} required={required}>
      <label
        className={clsx(
          "neo-switch",
          multiline && "neo-switch--multiline",
          disabled && "neo-switch--disabled"
        )}
        htmlFor={internalId}
      >
        <input
          {...rest}
          id={internalId}
          type="checkbox"
          onChange={(event) => {
            onChange?.(event, event.target.checked);
          }}
        />

        <i className="neo-switch__icon" />

        <span className="neo-switch-children">{children}</span>
      </label>
    </NeoInputWrapper>
  );
};
