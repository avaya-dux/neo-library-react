import { HTMLAttributes, ReactNode, useMemo, useRef } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import {
  dispatchInputOnChangeEvent,
  genId,
  handleAccessbilityError,
} from "utils";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  clearable?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  error,
  helperText,
  required,
  startAdornment,
  endAdornment,
  clearable = true,
  readOnly,
  disabled,
  ...rest
}) => {
  if (!label && !placeholder) {
    handleAccessbilityError("You must provide a `label` or `placeholder`.");
  }

  // use given id or generate a unique one for accessibility
  const internalId = useMemo(() => rest.id || genId(), []);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <NeoInputWrapper disabled={disabled} error={error} required={required}>
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
            {...rest}
          />

          {!!clearable && (
            <button
              aria-label="clear input"
              tabIndex={-1}
              className="neo-input-edit__icon neo-icon-end"
              disabled={disabled}
              onClick={() => {
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
