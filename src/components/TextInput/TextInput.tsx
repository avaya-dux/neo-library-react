import clsx from "clsx";
import { HTMLAttributes, ReactNode, RefObject, useMemo, useRef } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import {
  ConditionalWrapper,
  dispatchInputOnChangeEvent,
  genId,
  handleAccessbilityError,
  IconNamesType,
} from "utils";

export interface TextInputProps extends HTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
  disabled?: boolean;
  endAddon?: ReactNode;
  endIcon?: IconNamesType;
  error?: boolean;
  helperText?: string;
  inline?: boolean;
  label?: string;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  startAddon?: ReactNode;
  startIcon?: IconNamesType;
  value?: number | string;
}

export const TextInput: React.FC<TextInputProps> = ({
  clearable = true,
  disabled,
  endAddon,
  endIcon,
  error,
  helperText,
  inline,
  label,
  placeholder,
  readOnly,
  required,
  startAddon,
  startIcon,
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
      wrapperClassName={startIcon || endIcon ? "neo-input-icon" : ""}
      disabled={disabled}
      error={error}
      required={required}
      inline={inline}
    >
      <label htmlFor={internalId}>{label}</label>

      {readOnly ? (
        <InternalTextInputElement
          disabled={disabled}
          inputRef={inputRef}
          internalId={internalId}
          placeholder={placeholder}
          readOnly={readOnly}
          value={value}
          {...rest}
        />
      ) : (
        <ConditionalWrapper
          condition={!!startAddon || !!endAddon}
          wrapper={(child) => (
            <div className="neo-input-group--addons">{child}</div>
          )}
        >
          <>
            {!!startAddon && (
              <div className="neo-input-group__addon">{startAddon}</div>
            )}

            <div
              className={clsx(
                "neo-input-editable__wrapper",
                startIcon || endIcon ? "neo-input-icon__wrapper" : undefined
              )}
            >
              {startIcon && <span className={`neo-icon-${startIcon}`} />}

              <InternalTextInputElement
                disabled={disabled}
                inputRef={inputRef}
                internalId={internalId}
                placeholder={placeholder}
                readOnly={readOnly}
                value={value}
                {...rest}
              />

              {/* BUG: `clearable` icon overrides `endIcon` */}
              {endIcon && <span className={`neo-icon-${endIcon}`} />}

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

            {!!endAddon && (
              <div className="neo-input-group__addon">{endAddon}</div>
            )}
          </>
        </ConditionalWrapper>
      )}

      {!!helperText && (
        <div className="neo-input-hint" id={`${internalId}-description`}>
          {helperText}
        </div>
      )}
    </NeoInputWrapper>
  );
};

export const InternalTextInputElement = ({
  readOnly,
  disabled,
  internalId,
  placeholder,
  inputRef,
  value,
  ...rest
}: Pick<TextInputProps, "readOnly" | "disabled" | "placeholder" | "value"> & {
  internalId: string;
  inputRef: RefObject<HTMLInputElement>;
}) => (
  <input
    aria-describedby={`${internalId}-description`}
    className={clsx("neo-input", readOnly && "neo-input-readonly")}
    disabled={disabled}
    id={internalId}
    placeholder={placeholder}
    readOnly={readOnly}
    ref={inputRef}
    tabIndex={readOnly ? -1 : 0}
    value={value}
    {...rest}
  />
);
