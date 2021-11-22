import { forwardRef } from "react";

import { Tooltip } from "components/Tooltip";
import { IconNamesType } from "utils";
import { genId } from "utils/accessibilityUtils";

import { getBasicChipClassNames } from "./BasicChip";
import { OneWayChipProps, Variants } from "./ChipTypes";

// Close button on the right only
export interface ClosableChipProps extends OneWayChipProps {
  onClick?: React.MouseEventHandler;
  chiptype: "closable";
  id: string;
  icon?: IconNamesType;
}

export const ClosableChip: React.FC<ClosableChipProps> = forwardRef(
  (
    {
      variant = "default",
      tooltip,
      disabled = false,
      withinChipContainer = false,
      text,
      id,
      icon,
      ...rest
    }: ClosableChipProps,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const classes = getClosableChipClassNames(
      variant,
      disabled,
      withinChipContainer,
      icon
    );
    const buttonAriaLabel = getButtonAriaLabel(text);

    const attributes = {
      ref,
      className: classes,
      id: id || genId(),
      ...rest,
      tabIndex: 0,
      role: "button",
    };
    const chipElement = (
      <div {...attributes}>
        {text}
        <section // button is interactive so it can not be used when the parent div is interactive due to the "button" role. Section is a landmark element, which can have an aria-label.
          className="neo-close neo-close--clear"
          aria-label={buttonAriaLabel}
        />
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
  }
);

export function getClosableChipClassNames(
  variant: Variants,
  disabled: boolean,
  withinChipContainer: boolean,
  icon?: IconNamesType
) {
  const classNames = [
    getBasicChipClassNames(variant, disabled, withinChipContainer),
  ];
  classNames.push("neo-chip--close");
  classNames.push(`neo-chip--close--${variant}`);
  if (icon) classNames.push(`neo-icon-${icon}`);
  return classNames.join(" ");
}
export function getButtonAriaLabel(text: string) {
  return "remove " + text.toLocaleLowerCase();
}
