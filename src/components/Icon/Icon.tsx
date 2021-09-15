import { useMemo } from "react";

import { IconNamesType } from "utils/icons";

// import { SizeType } from "utils/size"; TODO https://jira.forge.avaya.com/browse/NEO-645
type SizeType = "sm" | "lg";
export interface IconProps extends React.BaseHTMLAttributes<HTMLElement> {
  status?:
    | "available"
    | "away"
    | "busy"
    | "do-not-disturb"
    | "offline"
    | "lock"
    | "warning"
    | "missed"
    | "connected"
    | "inbound"
    | "outbound";
  icon: IconNamesType;
  size?: SizeType;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  status,
  icon,
  size,
  className,
  ...rest
}: IconProps) => {
  if (!rest["aria-label"]) {
    console.warn(
      "A descriptive label is required for screen readers to identify the button's purpose"
    );
  }

  const componentClasses = useMemo(() => {
    /*
     * When status is defined, the font-size will be change to 26px for the icon, this is a expected behavior
     * Feature request to standardize the size of the Icons
     * https://jira.forge.avaya.com/browse/NEO-645
     */
    const getStatusClass = (status?: string) => {
      return status ? [`neo-icon-state`, `neo-icon-state--${status}`] : [""];
    };

    const getIconClass = (icon?: IconNamesType) => {
      return icon ? [`neo-icon-${icon}`] : [""];
    };

    const getSizeClass = (size?: SizeType) => {
      // TODO-NEO-645: css class name are missing
      // https://jira.forge.avaya.com/browse/NEO-645
      switch (size) {
        case undefined:
        case "sm":
          return [""];
        case "lg":
          return ["neo-icon-state--large"];
        default:
          console.warn(`Unknown size encountered: ${size}`);
          return [""];
      }
    };

    return [
      ...getStatusClass(status),
      ...getIconClass(icon),
      ...getSizeClass(size),
      ...[className],
    ].join(" ");
  }, [status, icon, size]);

  return <span {...rest} className={componentClasses} />;
};
