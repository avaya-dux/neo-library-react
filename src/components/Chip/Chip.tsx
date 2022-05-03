import { genId } from "utils";

import { BasicChip } from "./BasicChip";
import { Variants } from "./ChipTypes";
import { ClosableChip } from "./ClosableChip";

export const Chip = ({
  children,
  closable = false,
  id = genId(),
  variant = "default",
}: {
  children: string;
  closable?: boolean;
  id?: string;
  variant?: Variants;
}) => {
  return closable ? (
    <ClosableChip
      chiptype="closable"
      variant={variant}
      id={id}
      text={children}
    />
  ) : (
    <BasicChip chiptype="basic" variant={variant} id={id} text={children} />
  );
};
