import { MouseEventHandler, ReactElement, useState } from "react";
import { UnreachableCaseError } from "ts-essentials";
import { AvatarChip, AvatarChipProps } from "./AvatarChip";
import { BasicChip, BasicChipProps } from "./BasicChip";
import { WithinChipContainerProp } from "./ChipTypes";
import { ClosableChip, ClosableChipProps } from "./ClosableChip";
import { IconChip, IconChipProps } from "./IconChip";

type WithinChipContainer = typeof WithinChipContainerProp;

type AllChipProps =
  | Omit<AvatarChipProps, WithinChipContainer>
  | Omit<BasicChipProps, WithinChipContainer>
  | Omit<ClosableChipProps, WithinChipContainer>
  | Omit<IconChipProps, WithinChipContainer>;
export interface ChipContainerProps {
  /** Array of ChipProps; Note: ChipContainer will set withinChipContainer to true when passing props to a Chip Component */
  chipProps: Array<AllChipProps>;
}
export const ChipContainer = ({ chipProps }: ChipContainerProps) => {
  const [chipList, updateChipList] = useState(chipProps);
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    const target = event.target as HTMLElement;

    const classes = target.getAttribute("class");
    if (!!classes && classes.indexOf("disabled") > -1) {
      return;
    }
    const idToRemove = target.getAttribute("id");
    updateChipList(removeById(chipList, idToRemove));
  };
  return (
    <div className="neo-chips">
      {chipList.map((chipProp, index) => {
        return createChip(chipProp, handleClick, index);
      })}
    </div>
  );
};

function removeById(list: Array<AllChipProps>, idToRemove: string | null) {
  return list.filter((chip) => {
    return idToRemove !== chip.id;
  });
}

export function createChip<T extends AllChipProps>(
  chipProp: T,
  handleClick: MouseEventHandler,
  index: number
): ReactElement<T> | never {
  const chiptype = chipProp.chiptype;
  switch (chiptype) {
    case "avatar":
      return <AvatarChip key={index} {...chipProp} withinChipContainer />;
    case "closable":
      chipProp.onClick = handleClick;
      return <ClosableChip key={index} {...chipProp} withinChipContainer />;
    case "basic":
      return <BasicChip key={index} {...chipProp} withinChipContainer />;
    case "icon":
      return <IconChip key={index} {...chipProp} withinChipContainer />;
    default:
      throw new UnreachableCaseError(chiptype);
  }
}
