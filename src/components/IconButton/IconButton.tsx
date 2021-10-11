import { forwardRef, useMemo } from "react";

import { Spinner } from "components/Spinner";
import {
  computeBadge,
  getAnimationClass,
  getBadgeClass,
  getSizeClass,
  getVariantClass,
  showSpinner,
  IconNamesType,
} from "utils";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  animation?: "none" | "spinner" | "pulse";
  badge?: string;
  icon: IconNamesType;
  size?: "default" | "compact";
  shape: "circle" | "square";
  status?: "default" | "success" | "alert" | "warning" | "info" | "event";
  variant?: "primary" | "secondary" | "tertiary";
  "aria-label": string;
}

export const IconButton: React.FC<IconButtonProps> = forwardRef(
  (
    {
      animation = "none",
      badge,
      children,
      icon,
      shape = "square",
      size = "default",
      status = "default",
      variant = "primary",
      className,
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
    }, [animation, size, variant, status, badge, shape]);

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
