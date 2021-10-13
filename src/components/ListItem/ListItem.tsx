import clsx from "clsx";
import { Fragment, FunctionComponent, ReactElement } from "react";

import { AvatarProps } from "components/Avatar";
import { IconProps } from "components/Icon";
import { Tooltip, TooltipPosition } from "components/Tooltip";

export interface ListItemProps {
  className?: string;
  showDivider?: boolean;
  avatar?: ReactElement<AvatarProps>;
  actions?: ReactElement<any>[];
  icon?: ReactElement<IconProps>;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
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
  showDivider,
  tooltip,
  tooltipPosition = "bottom-right", // TODO-NEO-690 // remove this line to default to "auto" once 690 is completed
}) => {
  const avacon = avatar || icon;

  return (
    <li
      className={clsx(
        "neo-group-list__wrapper",
        showDivider && "neo-divider",
        className
      )}
    >
      {tooltip ? (
        <Tooltip label={tooltip} position={tooltipPosition}>
          <div className="neo-group-list__item">{avacon}</div>
        </Tooltip>
      ) : (
        <div className="neo-group-list__item">{avacon}</div>
      )}
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
};
