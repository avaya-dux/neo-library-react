import { useSelect } from "downshift";
import { Dispatch, SetStateAction } from "react";

export const DownshiftWithSelectProps = (
  items: string[],
  id: string,
  setSelectedItems: Dispatch<SetStateAction<string[]>>
) => {
  return useSelect({
    items,
    id,
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([selectedItem]);
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
