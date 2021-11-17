import { HTMLAttributes, ReactNode, useMemo, useRef } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import {
  dispatchInputOnChangeEvent,
  genId,
  handleAccessbilityError,
} from "utils";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  disabled?: boolean;
  endAdornment?: ReactNode;
  error?: boolean;
  helperText?: string;
  inline?: boolean;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  startAdornment?: ReactNode;
  value?: number | string;
}

export const TextInput: React.FC<TextInputProps> = ({
  clearable = true,
  disabled,
  endAdornment,
  error,
  helperText,
  inline,
  label,
  placeholder,
  readOnly,
  required,
  startAdornment,
  value,
  ...rest
}) => {
  if (!label && !placeholder) {
    handleAccessbilityError("You must provide a `label` or `placeholder`.");
  }

  // use given id or generate a unique one for accessibility
  const internalId = useMemo(() => rest.id || genId(), []);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <NeoInputWrapper
      disabled={disabled}
      error={error}
      required={required}
      inline={inline}
    >
      <label htmlFor={internalId}>{label}</label>

      <div className="neo-input-group--addons">
        {!!startAdornment && (
          <div className="neo-input-group__addon">{startAdornment}</div>
        )}

        <div className="neo-input-editable__wrapper">
          <input
            {...getInputProps({ readOnly })}
            id={internalId}
            aria-describedby={`${internalId}-description`}
            ref={inputRef}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            value={value}
            {...rest}
          />

          {!!clearable && (
            <button
              aria-label="clear input"
              tabIndex={-1}
              className="neo-input-edit__icon neo-icon-end"
              disabled={disabled}
              onClick={() => {
                // BUG: clearing is causing the whole page to die
                dispatchInputOnChangeEvent(inputRef.current!, "");
              }}
            />
          )}
        </div>

        {!!endAdornment && (
          <div className="neo-input-group__addon">{endAdornment}</div>
        )}
      </div>

      {!!helperText && (
        <div className="neo-input-hint" id={`${internalId}-description`}>
          {helperText}
        </div>
      )}
    </NeoInputWrapper>
  );
};

export function getInputProps(props?: Partial<TextInputProps>) {
  const classNames = ["neo-input"];

  if (props?.readOnly) {
    classNames.push("neo-input-readonly");
  }

  return { className: classNames.join(" ") };
}
