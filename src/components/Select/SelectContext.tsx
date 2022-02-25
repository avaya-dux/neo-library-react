import { createContext } from "react";

export type SelectContextProps = {
  items: string[];
  itemProps: any;
  index: number;
  highlightedIndex: number;
  selectedItems: string[];
  isMultipleSelect?: boolean;
};

export const SelectContext = createContext<SelectContextProps>({
  items: [],
  itemProps: {},
  selectedItems: [],
  index: 0,
  highlightedIndex: 0,
  isMultipleSelect: false,
});
