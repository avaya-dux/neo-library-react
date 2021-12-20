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

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animation?: "none" | "spinner" | "pulse";
  badge?: string;
  icon: IconNamesType;
  shape: "circle" | "square";
  size?: "default" | "compact";
  status?: "default" | "success" | "alert" | "warning" | "info" | "event";
  variant?: "primary" | "secondary" | "tertiary";
}

export const IconButton = forwardRef(
  (
    {
      animation = "none",
      badge,
      className,
      icon,
      shape = "square",
      size = "default",
      status = "default",
      variant = "primary",
      ...rest
    }: IconButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    const shapeClass = useMemo(() => {
      return [`neo-btn-${shape}`];
    }, [shape]);

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
    }, [animation, badge, shape, size, status, variant]);

    return (
      <button
        ref={ref}
        {...rest}
        className={buttonClasses}
        data-badge={computeBadge(badge)}
      >
        {displaySpinner ? (
          <Spinner style={{ color: "inherit" }} />
        ) : (
          <span className={`neo-icon-${icon}`} style={{ fontSize: 20 }} />
        )}
      </button>
    );
  }
);
