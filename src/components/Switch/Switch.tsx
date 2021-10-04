import { useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

type SwitchChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement>,
  checked: boolean
) => any;

export interface SwitchProps
  extends Omit<React.HTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  disabled?: boolean;
  multiline?: boolean;
  checked?: boolean;
  error?: boolean;
  required?: boolean;
  onBlur?: React.FocusEventHandler;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | SwitchChangeHandler;
  onFocus?: React.FocusEventHandler;
}

/**
 * Switches allow end-users to toggle between options such as “On/Off” and “Show/Hide”.
 *
 * @example
 * <Switch
 *   label="Enable Feature Name"
 *   multiline
 *   disabled
 *   checked={checked}
 *   onChange={(event, checked) => setChecked(checked)}
 * />
 *
 * @see https://design.avayacloud.com/components/web/switch-web
 */
export function Switch(props: SwitchProps) {
  // use given id or generate a unique one for accessibility
  const internalId = useMemo(() => props.id || genId(), [props.id]);

  return (
    <NeoInputWrapper
      disabled={props.disabled}
      error={props.error}
      required={props.required}
    >
      <label {...getSwitchLabelProps(props)} htmlFor={internalId}>
        <input
          {...getSwitchInputProps(props)}
          id={internalId}
          // extend raw `ChangeEventHandler` with `checked` value as 2nd
          onChange={(event) => props.onChange?.(event, event.target.checked)}
        />
        <i className="neo-switch__icon" />
        {props.label}
      </label>
    </NeoInputWrapper>
  );
}

export function getSwitchLabelProps({ disabled, multiline }: SwitchProps = {}) {
  const classNames = ["neo-switch"];

  if (multiline === true) {
    classNames.push("neo-switch--multiline");
  }

  if (disabled === true) {
    classNames.push("neo-switch--disabled");
  }

  return {
    className: classNames.join(" "),
  };
}

export function getSwitchInputProps({
  label,
  disabled,
  multiline,
  checked,
  ...rest
}: SwitchProps = {}) {
  return {
    type: "checkbox",

    // conditionally add `checked` property
    ...(!!checked && { checked }),

    disabled,
    ...rest,
  };
}
