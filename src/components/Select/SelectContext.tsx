import { createContext } from "react";

export type SelectContextProps = {
  highlightedIndex: number;
  index: number;
  isMultipleSelect?: boolean;
  itemProps: any;
  items: string[];
  selectedItems: string[];
};

export const SelectContext = createContext<SelectContextProps>({
  highlightedIndex: 0,
  index: 0,
  isMultipleSelect: false,
  itemProps: {},
  items: [],
  selectedItems: [],
});
