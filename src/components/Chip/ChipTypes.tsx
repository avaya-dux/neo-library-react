import { AvatarProps } from "components/Avatar";
import { ReactElement } from "react";

export type Variants = "default" | "success" | "info" | "alert" | "warning";
export const WithinChipContainerProp = "withinChipContainer";
export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variants;
  tooltip?: JSX.Element | string;
  disabled?: boolean;
  text: string;
  /** denotes if this Chip component is inside ChipContainer component */
  [WithinChipContainerProp]?: boolean;
}

export interface OneWayChipProps extends Omit<ChipProps, "dir"> {}

// TODO: move to AvatarChip.tsx
// Avatar is on the left
export interface AvatarChipProps extends OneWayChipProps {
  avatar: ReactElement<AvatarProps>;
}
// Down-pointing arrow should be on the right only
// TODO: add properties and move to its own file
export interface ExpandableChipProps extends OneWayChipProps {}
