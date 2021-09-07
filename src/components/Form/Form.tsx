import clsx from "clsx";
import { FunctionComponent, HTMLAttributes } from "react";

export interface FormProps extends HTMLAttributes<HTMLFormElement> {
  inline?: boolean;
}

/**
 * This component extends the `<form>` control with Avaya NEO styling.
 */
export const Form: FunctionComponent<FormProps> = ({
  className,
  inline,
  ...rest
}) => {
  return (
    <form
      className={clsx("neo-form", inline && "neo-form--inline", className)}
      {...rest}
    />
  );
};
