import clsx from "clsx";
import { Fragment, FunctionComponent, ReactElement } from "react";
import { AvatarProps } from "../Avatar";
import { IconProps } from "../Icon";
export interface ListItemProps {
  className?: string;
  showDivider?: boolean;
  hover?: boolean;
  variant?: "list_item" | "list_section";
  avatar?: ReactElement<AvatarProps>;
  actions?: ReactElement<any>[];
  icon?: ReactElement<IconProps>;
}

/**
 * This component will typically be used as a child of the List component.
 */
export const ListItem: FunctionComponent<ListItemProps> = ({
  avatar,
  actions = [],
  icon,
  children,
  className,
  hover,
  showDivider,
  variant,
}) => {
  const avacon = avatar || icon;
  if (variant === "list_section") {
    return (
      <li
        className={clsx(
          "neo-group-list__wrapper",
          showDivider && "neo-divider",
          className
        )}
      >
        {avacon ? <div className="neo-group-list__item">{avacon}</div> : null}

        <div className="neo-group-list__item neo-group-list__item--middle">
          {children}
        </div>

        <div className="neo-group-list__item">
          {actions.map((action, index) => (
            <Fragment key={index}>{action}</Fragment>
          ))}
        </div>
      </li>
    );
  }

  // Render list_item variant style
  return (
    <li
      className={clsx(
        "neo-group-list--actions__item",
        hover && "neo-group-list--actions__item--clickable",
        className
      )}
    >
      <div className="neo-group-list__actions--left">
        {!!avacon && avacon}
        {children}
      </div>

      <div className="neo-group-list__actions--right">
        {actions.map((action, index) => (
          <Fragment key={index}>{action}</Fragment>
        ))}
      </div>
    </li>
  );
};
