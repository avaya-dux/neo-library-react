import { Tooltip } from "components/Tooltip";

import { OneWayChipProps } from "./ChipTypes";

import { SmallAvatarProps } from "components/Avatar";
import { getBasicChipClassNames } from "./BasicChip";
import { ReactElement } from "react";

// Avatar is on the left
export interface AvatarChipProps extends OneWayChipProps {
  chiptype: "avatar";
  smallAvatar: ReactElement<SmallAvatarProps>;
}

export const AvatarChip: React.FC<AvatarChipProps> = ({
  variant = "default",
  tooltip,
  disabled = false,
  text,
  withinChipContainer = false,
  smallAvatar,
  ...rest
}) => {
  const classes = getBasicChipClassNames(
    variant,
    disabled,
    withinChipContainer
  );
  const chipElement = (
    <div className={classes} {...rest}>
      {smallAvatar}
      {text}
    </div>
  );
  return tooltip ? (
    <Tooltip
      label={tooltip.label}
      position={tooltip.position}
      multiline={!!tooltip.multiline}
    >
      {chipElement}
    </Tooltip>
  ) : (
    <>{chipElement}</>
  );
};
