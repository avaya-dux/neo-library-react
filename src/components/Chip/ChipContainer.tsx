import { ReactElement, useState, MouseEventHandler } from "react";
import { UnreachableCaseError } from "ts-essentials";
import { BasicChip, BasicChipProps } from "./BasicChip";
import { ClosableChip, ClosableChipProps } from "./ClosableChip";
import { IconChip, IconChipProps } from "./IconChip";

type ChipProps = BasicChipProps | ClosableChipProps | IconChipProps;
export interface ChipContainerProps {
  chipProps: Array<ChipProps>;
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

function removeById(list: Array<ChipProps>, idToRemove: string | null) {
  return list.filter((chip) => {
    return idToRemove !== chip.id;
  });
}

export function createChip<T extends ChipProps>(
  chipProp: T,
  handleClick: MouseEventHandler,
  index: number
): ReactElement<T> | never {
  const chiptype = chipProp.chiptype;
  switch (chiptype) {
    case "closable":
      chipProp.onClick = handleClick;
      return <ClosableChip key={index} {...chipProp} />;
    case "basic":
      return <BasicChip key={index} {...chipProp} />;
    case "icon":
      return <IconChip key={index} {...chipProp} />;
    default:
      throw new UnreachableCaseError(chiptype);
  }
}
