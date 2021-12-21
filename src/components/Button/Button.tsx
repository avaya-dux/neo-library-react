import { forwardRef, useMemo } from "react";

import { Spinner } from "components/Spinner";
import {
  computeBadge,
  getAnimationClass,
  getBadgeClass,
  getSizeClass,
  getVariantClass,
  IconNamesType,
  showSpinner,
} from "utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animation?: "none" | "spinner" | "pulse";
  badge?: string;
  icon?: IconNamesType;
  size?: "default" | "compact" | "wide";
  status?: "default" | "success" | "alert" | "warning" | "info" | "event";
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button = forwardRef(
  (
    {
      animation = "none",
      badge,
      children,
      className,
      icon,
      size = "default",
      status = "default",
      variant = "primary",
      ...rest
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const shapeClass = ["neo-btn"];

    const displaySpinner = useMemo(() => {
      return showSpinner(animation);
    }, [animation]);

    const buttonClasses = useMemo(() => {
      return [
        ...shapeClass,
        ...getSizeClass(shapeClass, size),
        ...getVariantClass(shapeClass, variant, status),
        ...getBadgeClass(badge),
        ...getAnimationClass(animation),
        ...[className],
      ].join(" ");
    }, [animation, badge, size, status, variant]);

    return (
      <button
        ref={ref}
        {...rest}
        className={buttonClasses}
        data-badge={computeBadge(badge)}
      >
        {displaySpinner && <Spinner />}
        {children}
      </button>
    );
  }
);
