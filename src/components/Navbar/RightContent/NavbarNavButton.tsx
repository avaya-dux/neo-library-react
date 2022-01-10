import { forwardRef, FunctionComponent } from "react";

import { ButtonProps } from "components";
import { computeBadge } from "utils";

export interface NavbarNavButtonProps {
  navButton: Pick<ButtonProps, "badge" | "icon">;
}

export const NavbarNavButton: FunctionComponent<NavbarNavButtonProps> =
  forwardRef(
    (
      { navButton }: NavbarNavButtonProps,
      ref: React.Ref<HTMLButtonElement>
    ) => {
      return (
        <>
          <button
            className={`neo-badge__navbutton--content neo-btn neo-icon-${navButton.icon}`}
            ref={ref}
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
