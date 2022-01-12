import { forwardRef, FunctionComponent } from "react";

import { computeBadge, IconNamesType } from "utils";

export interface NavbarButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  "aria-label": string;
  badge?: string;
  icon: IconNamesType;
  handleClick?: () => Promise<void> | void;
}

export const NavbarButton: FunctionComponent<NavbarButtonProps> = forwardRef(
  (
    { "aria-label": ariaLabel, badge, icon, ...rest }: NavbarButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <>
        <button
          aria-label={ariaLabel}
          className={`neo-badge__navbutton--content neo-btn neo-icon-${icon}`}
          ref={ref}
          {...rest}
        />
        {badge && (
          <span className="neo-badge__icon" data-badge={computeBadge(badge)} />
        )}
      </>
    );
  }
);
