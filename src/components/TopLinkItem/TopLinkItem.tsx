import clsx from "clsx";
import { HTMLAttributes } from "react";

export interface TopLinkItemProps
  extends HTMLAttributes<HTMLLIElement | HTMLAnchorElement> {
  active: boolean;
  label: string;
  href?: string;
  icon?: boolean;
  iconName?: string;
}

export const TopLinkItem = ({
  active,
  label,
  href,
  icon,
  iconName,
  onClick,
}: TopLinkItemProps) => {
  return (
    <li
      className={clsx(
        "neo-leftnav__main",
        active && "neo-leftnav__main--active"
      )}
    >
      <a
        href={href}
        className={clsx(icon && iconName && `neo-icon-${iconName}`)}
        onClick={onClick}
      >
        {label}
      </a>
    </li>
  );
};
