import { HTMLProps, useEffect, useMemo, useRef, useState } from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId } from "utils/accessibilityUtils";

interface TextAreaBase extends HTMLProps<HTMLTextAreaElement> {
  error?: boolean;
  helperText?: string;
  locked?: boolean;
  translations?: {
    remaining: string;
    over: string;
  };
}

interface TextAreaWithPlaceholder extends TextAreaBase {
  placeholder: string;
}

interface TextAreaWithLabel extends TextAreaBase {
  label: string;
}

export type TextAreaProps = TextAreaWithPlaceholder | TextAreaWithLabel;

export const TextArea: React.FC<TextAreaProps> = ({
  disabled,
  error,
  helperText,
  id,
  label,
  locked,
  maxLength,
  placeholder,
  required,
  translations = {
    remaining: "remaining",
    over: "over",
  },
  ...rest
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [characterCount, setCharacterCount] = useState(
    rest.defaultValue?.toString().length || 0
  );
  const [maxLengthExceeded, setMaxLengthExceeded] = useState(false);

  useEffect(() => {
    if (maxLength && characterCount > maxLength) {
      setMaxLengthExceeded(true);
      textAreaRef.current!.dispatchEvent(
        new Event("maxCharError", { bubbles: true })
      );
    } else {
      setMaxLengthExceeded(false);
    }
  }, [characterCount, maxLength, setMaxLengthExceeded]);

  const internalId = useMemo(() => id || genId(), []);

  return (
    <NeoInputWrapper
      wrapperClassName={"neo-form-control--textarea"}
      disabled={disabled}
      error={error || maxLengthExceeded}
      required={required}
    >
      {!!label && <label htmlFor={internalId}>{label}</label>}

      <textarea
        {...getTextAreaClassName({ locked })}
        id={internalId}
        {...getAriaDescribedBy(internalId, { helperText, maxLength })}
        ref={textAreaRef}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => setCharacterCount(e.target.value.length)}
        {...rest}
      />
      <div className="neo-input-textarea__helper">
        {!!helperText && (
          <div className="neo-input-hint" id={`${internalId}-hint`}>
            {helperText}
          </div>
        )}
        {!!maxLength && (
          <div
            className="neo-input-textarea__counter"
            id={`${internalId}-counter`}
          >
            {Math.abs(maxLength - characterCount)}{" "}
            {maxLength - characterCount >= 0
              ? translations?.remaining
              : translations?.over}{" "}
            / {maxLength}
          </div>
        )}
      </div>
    </NeoInputWrapper>
  );
};

export function getTextAreaClassName(props?: Pick<TextAreaBase, "locked">) {
  const classNames = ["neo-input"];

  if (props?.locked) {
    classNames.push("neo-input-textarea--locked");
  }

  return { className: classNames.join(" ") };
}

export function getAriaDescribedBy(
  id: string,
  props?: Pick<TextAreaBase, "helperText" | "maxLength">
) {
  const describedBy = [];

  if (props?.helperText) {
    describedBy.push(`${id}-hint`);
  }

  if (props?.maxLength) {
    describedBy.push(`${id}-counter`);
  }

  return { "aria-describedby": describedBy.join(" ") };
}
