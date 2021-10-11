import { ChipProps, Variants } from "./ChipTypes";

export interface BasicChipProps extends ChipProps {
  chiptype: "basic";
}

export const BasicChip: React.FC<BasicChipProps> = ({
  variant = "default",
  tooltip,
  disabled = false,
  text,
  withinChipContainer = false,
  ...rest
}: BasicChipProps) => {
  const classes = getBasicChipClassNames(
    variant,
    disabled,
    withinChipContainer
  );
  return (
    <div className={classes} {...rest}>
      {text}
    </div>
  );
};

export function getBasicChipClassNames(
  variant: Variants,
  disabled: boolean,
  withinChipContainer: boolean
) {
  const classNames = ["neo-chip"];
  classNames.push(`neo-chip--${variant}`);

  if (disabled === true) {
    classNames.push(`neo-chip--${variant}--disabled`);
  }
  if (withinChipContainer) {
    classNames.push("neo-chips__item");
  }

  return classNames.join(" ");
}
