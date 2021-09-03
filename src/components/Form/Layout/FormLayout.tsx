import clsx from "clsx";
import { FunctionComponent, HTMLAttributes } from "react";

export interface FormLayoutProps extends HTMLAttributes<HTMLFormElement> {
  inline?: boolean;
}

/**
 * This component extends the `<form>` control with Avaya NEO styling.
 */
export const FormLayout: FunctionComponent<FormLayoutProps> = ({
  className,
  inline,
  ...rest
}) => {
  return (
    <form
      className={clsx("neo-form", inline && "neo-form--inline", className)}
      data-testid="FormLayout-root"
      {...rest}
    />
  );
};
