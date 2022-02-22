import clsx from "clsx";
import { FC } from "react";

export interface LinkItemProps {
  className?: string;
  url?: string;
  label?: string;
  active: boolean;
  disabled?: boolean;
  isFocused: any;
  onClick: any;
  rest?: any;
  hover?: any;
}

export const LinkItem: FC<LinkItemProps> = ({
  className,
  url,
  label,
  active,
  disabled,
  onClick,
  hover,
  isFocused,
  rest,
}) => {
  return (
    <li
      {...rest}
      className={clsx(
        "neo-leftnav__sub",
        className,
        active && "neo-leftnav__sub--active"
      )}
      disabled={disabled}
    >
      {disabled ? (
        <a href=" " aria-disabled={disabled}>
          {label}
        </a>
      ) : (
        <a href={url} onClick={onClick} onMouseOver={hover} onFocus={isFocused}>
          {label}
        </a>
      )}
    </li>
  );
};
