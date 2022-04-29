import { FunctionComponent } from "react";

import { computeBadge } from "utils";

export interface BadgeProps {
  data: string;
  "aria-label": string;
}

export const Badge: FunctionComponent<BadgeProps> = ({
  data,
  "aria-label": ariaLabel,
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
