import clsx from "clsx";
import { Fragment, FunctionComponent, ReactElement } from "react";

import { AvatarProps } from "components/Avatar";
import { IconProps } from "components/Icon";
import { Tooltip } from "components/Tooltip";

export interface ListSectionProps {
  className?: string;
  hover?: boolean;
  avatar?: ReactElement<AvatarProps>;
  actions?: ReactElement<any>[];
  icon?: ReactElement<IconProps>;
  tooltip?: string;
}

/**
 * This component will typically be used as a child of the List component.
 */
export const ListSection: FunctionComponent<ListSectionProps> = ({
  avatar,
  actions = [],
  icon,
  children,
  className,
  hover,
  tooltip,
}) => {
  const avacon = avatar || icon;

  return (
    <li
      className={clsx(
        "neo-group-list--actions__item",
        hover && "neo-group-list--actions__item--clickable",
        className
      )}
    >
      <div className="neo-group-list__actions--left">
        {tooltip ? (
          <Tooltip label={tooltip}>{!!avacon && avacon} </Tooltip>
        ) : (
          <Fragment key="avacon">{!!avacon && avacon}</Fragment>
        )}
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
