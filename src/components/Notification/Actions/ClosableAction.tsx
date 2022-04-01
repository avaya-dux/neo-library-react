import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

export interface ClosableActionProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}
export const ClosableAction = ({
  "aria-label": ariaLabel = "close notification",
  className,
  ...rest
}: ClosableActionProps) => {
  return (
    <button
      aria-label={ariaLabel}
      className={clsx("neo-icon-end", className)}
      {...rest}
    ></button>
  );
};
