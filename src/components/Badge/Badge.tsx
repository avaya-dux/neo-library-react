import { FunctionComponent } from "react";

import { computeBadge } from "../../utils/ButtonUtils";

export interface BadgeProps {
  data: string;
  ariaLabel: string;
}

export const Badge: FunctionComponent<BadgeProps> = ({
  data,
  ariaLabel,
  children,
  ...rest
}) => {
  // "●" is unicode character U+25CF

  return (
    <span
      className="neo-badge"
      data-badge={!data ? "●" : computeBadge(data)}
      aria-label={ariaLabel}
      role="status"
      {...rest}
    >
      {children}
    </span>
  );
};
