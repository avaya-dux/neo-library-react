import { FunctionComponent, HTMLAttributes } from "react";

interface FormControlProps extends HTMLAttributes<HTMLDivElement> {
  disabled?: boolean;
  error?: boolean;
  inline?: boolean;
  required?: boolean;
}

export const FormControl: FunctionComponent<FormControlProps> = ({
  children,
  disabled,
  error,
  inline,
  required,

  ...rest
}) => (
  <div
    data-testid="FormControl-root"
    {...getFormControlProps({ disabled, error, required })}
    {...rest}
  >
    <div
      aria-required={required === true}
      data-testid="FormControl-group-root"
      {...getInputGroupProps({ inline })}
    >
      {children}
    </div>
  </div>
);

export function getFormControlProps({
  disabled,
  error,
  required,
}: Omit<FormControlProps, "inline"> = {}) {
  const classNames = ["neo-form-control"];

  if (disabled === true) {
    classNames.push("neo-form-control--disabled");
  }
  if (error === true) {
    classNames.push("neo-form-control--error");
  }
  if (required === true) {
    classNames.push("neo-form-control--required");
  }

  return { className: classNames.join(" ") };
}

export function getInputGroupProps({
  inline,
}: Pick<FormControlProps, "inline"> = {}) {
  const classNames = ["neo-input-group"];

  if (inline) {
    classNames.push("neo-input-group--inline");
  }

  return { className: classNames.join(" ") };
}
