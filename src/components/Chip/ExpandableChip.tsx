import { Tooltip } from "components/Tooltip";

import { OneWayChipProps, Variants } from "./ChipTypes";
import { getBasicChipClassNames } from "./BasicChip";
// Down-pointing arrow should be on the right only
export interface ExpandableChipProps extends OneWayChipProps {
  chiptype: "expandable";
}

export const ExpandableChip = ({
  variant = "default",
  tooltip,
  disabled = false,
  text,
  withinChipContainer = false,
  ...rest
}: ExpandableChipProps) => {
  const classes = getExpandableChipClassNames(
    variant,
    disabled,
    withinChipContainer
  );
  const chipElement = (
    <div className={classes} {...rest}>
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

export function getExpandableChipClassNames(
  variant: Variants,
  disabled: boolean,
  withinChipContainer: boolean
) {
  const classNames = [
    getBasicChipClassNames(variant, disabled, withinChipContainer),
  ];
  classNames.push(`neo-chip--expandable`);

  classNames.push(`neo-chip--expandable--${variant}`);

  return classNames.join(" ");
}
