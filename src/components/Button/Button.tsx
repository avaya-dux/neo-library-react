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

import "./style.css";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  label: string;
  animation?: "none" | "spinner" | "pulse";
  badge?: string;
  icon?: IconNamesType;
  size?: "default" | "compact" | "wide";
  status?: "default" | "success" | "alert" | "warning" | "info" | "event";
  variant?: "primary" | "secondary" | "tertiary";
  iconPosition?: "left" | "right";
}

export const Button = forwardRef(
  (
    {
      label,
      animation = "none",
      badge,
      children,
      icon,
      size = "default",
      status = "default",
      variant = "primary",
      iconPosition = "left",
      className,
      ...props
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
        ...[`neo-btn-icon-${iconPosition}`], // TODO Class name is missing https://jira.forge.avaya.com/browse/NEO-644
        ...getSizeClass(shapeClass, size),
        ...getVariantClass(shapeClass, variant, status),
        ...getBadgeClass(badge),
        ...getAnimationClass(animation),
        ...[className],
      ].join(" ");
    }, [animation, size, variant, status, badge, iconPosition]);

    return (
      <button
        ref={ref}
        {...props}
        className={buttonClasses}
        data-badge={computeBadge(badge)}
      >
        {displaySpinner ? (
          <Spinner />
        ) : icon ? (
          <span className={`neo-icon-${icon}`} /> // TODO replace with Icon component
        ) : null}
        {icon ? <div> &nbsp; </div> : null}
        {label}
      </button>
    );
  }
);
