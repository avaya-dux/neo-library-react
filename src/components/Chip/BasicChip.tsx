import { ChipProps, Variants } from "./ChipTypes";

export interface BasicChipProps extends ChipProps {
  chiptype: "basic";
}

export const BasicChip: React.FC<BasicChipProps> = ({
  variant = "default",
  tooltip,
  disabled = false,
  text,
  ...rest
}: BasicChipProps) => {
  const classes = getBasicChipClassNames(variant, disabled);
  return (
    <div className={classes} {...rest}>
      {text}
    </div>
  );
};

export function getBasicChipClassNames(variant: Variants, disabled: boolean) {
  const classNames = ["neo-chip"];
  if (disabled === true) {
    classNames.push(`neo-chip--${variant}--disabled`);
  } else {
    classNames.push(`neo-chip--${variant}`);
  }

  return classNames.join(" ");
}
