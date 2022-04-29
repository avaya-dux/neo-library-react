import { SelectOptionProps } from "./SelectTypes";

export const SelectOption = (_: SelectOptionProps) => {
  throw new Error(
    "This shouldn't have been called, Internal Select should have been used."
  );
};
