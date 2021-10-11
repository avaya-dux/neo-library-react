import { genId } from "utils/accessibilityUtils";
import { getBasicChipClassNames } from "./BasicChip";
import { OneWayChipProps, Variants } from "./ChipTypes";
import { forwardRef } from "react";
// Close button on the right only
export interface ClosableChipProps extends OneWayChipProps {
  onClick?: React.MouseEventHandler;
  chiptype: "closable";
  id: string;
}

export const ClosableChip: React.FC<ClosableChipProps> = forwardRef(
  (
    {
      variant = "default",
      tooltip,
      disabled = false,
      withinChipContainer = false,
      text,
      onClick = () => {},
      id,
      ...rest
    }: ClosableChipProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classes = getClosableChipClassNames(
      variant,
      disabled,
      withinChipContainer
    );
    const buttonAriaLabel = getButtonAriaLabel(text);

    const attributes = {
      ref,
      className: classes,
      id: id || genId(),
      ...rest,
      tabIndex: 0,
      role: "button",
      dir: "rtl",
      onClick,
    };
    return (
      <div {...attributes}>
        <section // button is interactive so it can not be used when the parent div is interactive due to the "button" role. Section is a landmark element, which can have an aria-label.
          className="neo-close neo-close--clear"
          aria-label={buttonAriaLabel}
        />
        {text}
      </div>
    );
  }
);

export function getClosableChipClassNames(
  variant: Variants,
  disabled: boolean,
  withinChipContainer: boolean
) {
  const classNames = [
    getBasicChipClassNames(variant, disabled, withinChipContainer),
  ];
  classNames.push("neo-chip--close");
  classNames.push(`neo-chip--close--${variant}`);
  return classNames.join(" ");
}
export function getButtonAriaLabel(text: string) {
  return "remove " + text.toLocaleLowerCase();
}
