import clsx from "clsx";
import { FC, HTMLAttributes } from "react";

export interface ListItemLinkProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
  href?: string;
  label?: string;
  active: boolean;
  disabled?: boolean;
  isFocused: any;
  onClick: any;
  hover?: any;
}

export const LinkItem: FC<ListItemLinkProps> = ({
  className,
  href,
  label,
  active,
  disabled,
  onClick,
  hover,
  isFocused,
  ...rest
}) => {
  return (
    <li
      {...rest}
      className={clsx(
        "neo-leftnav__sub",
        className,
        active && "neo-leftnav__sub--active"
      )}
    >
      {disabled ? (
        <button disabled={disabled}>{label}</button>
      ) : (
        <a
          href={href}
          onClick={onClick}
          onMouseOver={hover}
          onFocus={isFocused}
        >
          {label}
        </a>
      )}
    </li>
  );
};
