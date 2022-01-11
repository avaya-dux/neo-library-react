import { forwardRef, FunctionComponent } from "react";

import { ButtonProps } from "components";
import { computeBadge } from "utils";

export interface NavbarNavButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> {
  "aria-label": string;
  navButton: Pick<ButtonProps, "badge" | "icon">;
  handleClick?: () => Promise<void> | void;
}

export const NavbarNavButton: FunctionComponent<NavbarNavButtonProps> =
  forwardRef(
    (
      { "aria-label": ariaLabel, navButton, ...rest }: NavbarNavButtonProps,
      ref: React.Ref<HTMLButtonElement>
    ) => {
      return (
        <>
          <button
            aria-label={ariaLabel}
            className={`neo-badge__navbutton--content neo-btn neo-icon-${navButton.icon}`}
            ref={ref}
            {...rest}
          />
          {navButton.badge && (
            <span
              className="neo-badge__icon"
              data-badge={computeBadge(navButton.badge)}
            />
          )}
        </>
      );
    }
  );
