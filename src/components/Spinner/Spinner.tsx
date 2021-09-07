import clsx from "clsx";
import { HTMLAttributes } from "react";

import { SizeType } from "utils/size";

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: SizeType;
}

export const getSizeClass = (size?: SizeType) => {
  switch (size) {
    case undefined:
    case "xs":
    case "sm":
    case "md":
      return undefined;
    case "lg":
      return "neo-spinner--large";
    case "xl":
      return "neo-spinner--x-large";

    default:
      console.warn(`Unknown size encountered: ${size}`);
      return undefined;
  }
};

export const Spinner = ({ className, size, ...rest }: SpinnerProps) => (
  <div
    className={clsx("neo-spinner", getSizeClass(size), className)}
    {...rest}
  />
);
