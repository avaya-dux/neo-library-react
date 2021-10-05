import { IconNamesType } from "components";
import { getBasicChipClassNames } from "./BasicChip";
import { ChipProps, Variants } from "./ChipTypes";
// Icon can be right or left
export interface IconChipProps extends ChipProps {
  icon: IconNamesType;
  chiptype: "icon";
}

export const IconChip: React.FC<IconChipProps> = ({
  variant = "default",
  tooltip,
  disabled = false,
  icon,
  text,
  children,
  ...rest
}: IconChipProps) => {
  const classes = getIconChipClassNames(variant, disabled, icon);
  return (
    <div className={classes} {...rest}>
      {text}
    </div>
  );
};

export function getIconChipClassNames(
  variant: Variants,
  disabled: boolean,
  icon: IconNamesType
) {
  const classNames = [getBasicChipClassNames(variant, disabled)];
  if (icon !== null) {
    classNames.push(`neo-icon-${icon}`);
  }
  return classNames.join(" ");
}
