import clsx from "clsx";
import { Button } from "components/Button";
import { HTMLAttributes } from "react";

export interface ListItemLinkProps
  extends HTMLAttributes<HTMLLIElement | HTMLAnchorElement> {
  children: string;

  active?: boolean;
  disabled?: boolean;
  href?: string;
}

export const LinkItem = ({
  active,
  children,
  className,
  disabled,
  href,
  onClick,
  onFocus,
  onMouseOver,

  ...rest
}: ListItemLinkProps) => {
  return (
    <li
      {...rest}
      className={clsx(
        "neo-leftnav__sub",
        active && "neo-leftnav__sub--active",
        className
      )}
    >
      {disabled ? (
        <Button
          disabled={disabled}
          variant="tertiary"
          style={{
            padding: "8px 28px 8px 72px",
          }}
        >
          {children}
        </Button>
      ) : (
        <a
          href={href}
          onClick={onClick}
          onFocus={onFocus}
          onMouseOver={onMouseOver}
        >
          {children}
        </a>
      )}
    </li>
  );
};
