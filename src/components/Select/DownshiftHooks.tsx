import { useSelect } from "downshift";
import { Dispatch, SetStateAction } from "react";

/* HACK: these are technically hooks, but naming them with the 'use' prefix and calling them conditionally in the Select Component
   throws a compiler+linter error. They are also not technically functional components, however calling useSelect outside of a custom hook
   or functional component also throws a compiler+linter error. As a result, the naming of these functions is incorrect but maintained
   to preserve the logic and readibility of the code.
*/

export const DownshiftWithSelectProps = (
  items: string[],
  id: string,
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  onSelectedValueChange?: (value: string[] | string) => any
) => {
  return useSelect({
    items,
    id,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([selectedItem]);
        if (onSelectedValueChange) onSelectedValueChange(selectedItem);
      }
    },
  });
};

export const DownshiftWithMultipleSelectProps = (
  items: string[],
  id: string,
  loading: boolean,
  selectedItems: string[],
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  disabled?: boolean
) => {
  return useSelect({
    items,
    id,
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
          };
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }
      if (selectedItems.includes(selectedItem)) {
        setSelectedItems(selectedItems.filter((item) => item !== selectedItem));
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
  });
};
