import clsx from "clsx";
import { HTMLAttributes } from "react";
import { Button } from "components/Button";
import { IconNamesType } from "utils";
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
          <Button
            disabled={disabled}
            variant="tertiary"
            style={{
              color: "#939393",
              fontSize: "14px",
              fontFamily: "noto-sans,sans-serif",
              width: "max-content",
            }}
            icon={icon}
          >
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
