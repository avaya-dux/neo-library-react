import clsx from "clsx";
import { FC, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { SwitchProps } from "./SwitchTypes";

/**
 * A `Switch` allows end-users to toggle between a true/false state.
 *
 * @example
 * <Switch
 *   label="Disabled"
 *   disabled
 *   defautlChecked
 * />
 *
 * <Switch
 *   label="Controlled"
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
  textPlacement = "right",
  onChange,

  ...rest
}) => {
  const { disabled, required } = rest;
  const internalId = useMemo(() => id || genId(), [id]);

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={error}
      required={required}
      {...(textPlacement === "left" && { dir: "rtl" })}
    >
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
        {multiline ? (
          <span className="neo-switch-children">{children}</span>
        ) : (
          children
        )}
      </label>
    </NeoInputWrapper>
  );
};
