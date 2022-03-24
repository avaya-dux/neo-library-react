import clsx from "clsx";
import { HTMLAttributes } from "react";
import { Button } from "components/Button";
import { IconNamesType } from "utils";
import "./TopLinkItem_shim.css";
export interface TopLinkItemProps
  extends HTMLAttributes<HTMLLIElement | HTMLAnchorElement> {
  active?: boolean;
  label: string;
  href?: string;
  icon?: IconNamesType;
  disabled?: boolean;
}

export const TopLinkItem = ({
  active,
  label,
  href,
  icon,
  disabled,
  onClick,
}: TopLinkItemProps) => {
  return (
    <>
      <li
        className={clsx(
          "neo-leftnav__main",
          active && "neo-leftnav__main--active"
        )}
      >
        {disabled ? (
          <Button disabled={disabled} variant="tertiary" icon={icon}>
            {label}
          </Button>
        ) : (
          <a
            href={href}
            className={clsx(icon && `neo-icon-${icon}`)}
            onClick={onClick}
          >
            {label}
          </a>
        )}
      </li>
    </>
  );
};
