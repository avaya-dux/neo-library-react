import clsx from "clsx";
import { FC, useMemo } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

import { SwitchProps } from "./SwitchTypes";

/**
 * A `Switch` consists of a checkbox and some text as label. Thus it allows end-users to toggle between a true/false state.
 * Switch label is passed in as children.  Label placement can be on either side of the checkbox.
 * By default, the checkbox is placed to the left of the label.  To place label to the left of the checkbox,
 * set dir to "rtl" on the parent of a Switch or on the Switch itself.
 *
 * @example
 * <Switch
 *   disabled
 *   defautlChecked
 * >Label</Switch>
 *
 * <Switch
 *   checked={checked}
 *   dir="rtl"
 *   onChange={(event, checked) => setChecked(checked)}
 * />Label on left</Switch>
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
  dir,
  ...rest
}) => {
  const { disabled, required } = rest;
  const internalId = useMemo(() => id || genId(), [id]);

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={error}
      required={required}
      dir={dir}
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
          role="switch"
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
