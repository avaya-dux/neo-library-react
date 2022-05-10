import { useCombobox, useSelect } from "downshift";
import { Dispatch, SetStateAction } from "react";

const DownshiftWithComboboxProps = (
  items: string[],
  id: string,
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  setInputValue: Dispatch<SetStateAction<string[]>>,
  onSelectedValueChange?: (value: string[] | string) => void,
  loading?: boolean,
  disabled?: boolean
) => {
  return useCombobox({
    items,
    id,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
            inputValue: state.inputValue,
          };
        default:
          return changes;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([selectedItem]);
        onSelectedValueChange?.(selectedItem);
      }
    },
    onInputValueChange: ({ inputValue }) => {
      inputValue
        ? setInputValue(
            items.filter((item) =>
              item.toLowerCase().startsWith(inputValue.toLowerCase())
            )
          )
        : setInputValue(items);
    },
  });
};

const DownshiftWithComboboxMultipleSelectProps = (
  items: string[],
  id: string,
  controlledInputValue: string,
  setControlledInputValue: Dispatch<SetStateAction<string>>,
  selectedItems: string[],
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  inputItems: string[],
  setInputItems: Dispatch<SetStateAction<string[]>>,
  disabled?: boolean,
  loading?: boolean
) => {
  return useCombobox({
    items,
    id,
    selectedItem: null,
    inputValue: controlledInputValue,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
          };
        case useCombobox.stateChangeTypes.InputChange:
          if (changes.inputValue === "" && !changes.selectedItem)
            setControlledInputValue("");
          return {
            ...changes,
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        setControlledInputValue(inputValue);
        setInputItems(
          inputItems.filter((item) =>
            item.toLowerCase().startsWith(inputValue.toLowerCase())
          )
        );
      } else if (inputValue === "") {
        setInputItems(items);
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

const DownshiftWithSelectProps = (
  items: string[],
  id: string,
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  onSelectedValueChange?: (value: string[] | string) => void,
  disabled?: boolean,
  loading?: boolean
) => {
  return useSelect({
    items,
    id,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
            highlightedIndex: state.highlightedIndex,
          };
        default:
          return changes;
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([selectedItem]);
        onSelectedValueChange?.(selectedItem);
      }
    },
  });
};

const DownshiftWithMultipleSelectProps = (
  items: string[],
  id: string,
  selectedItems: string[],
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  disabled?: boolean,
  loading?: boolean
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

export const useDownshift = (
  controlledInputValue: string,
  id: string,
  inputItems: string[],
  searchable: boolean,
  multiple: boolean,
  items: string[],
  selectedItems: string[],
  setControlledInputValue: Dispatch<SetStateAction<string>>,
  setInputItems: Dispatch<SetStateAction<string[]>>,
  setSelectedItems: Dispatch<SetStateAction<string[]>>,
  disabled?: boolean,
  loading?: boolean,
  onSelectedValueChange?: (value: string[] | string) => void
) => {
  /**
   * HACK: these are hooks, but because we pass and recieve
   * different props based on `searchable` and `multiple`,
   * we've had to compromise and pretend that they're just regular
   * functions.
   *
   * In theory, they still function as hooks because `searchable` and
   * `multiple` are never changed. So this is definitely a
   * hack, but it's not the worst one. In theory.
   */

  if (searchable && multiple) {
    return DownshiftWithComboboxMultipleSelectProps(
      items,
      id,
      controlledInputValue,
      setControlledInputValue,
      selectedItems,
      setSelectedItems,
      inputItems,
      setInputItems,
      disabled,
      loading
    );
  } else if (searchable) {
    return DownshiftWithComboboxProps(
      items,
      id,
      setSelectedItems,
      setInputItems,
      onSelectedValueChange,
      disabled,
      loading
    );
  } else if (multiple) {
    return DownshiftWithMultipleSelectProps(
      items,
      id,
      selectedItems,
      setSelectedItems,
      disabled,
      loading
    );
  }

  return DownshiftWithSelectProps(
    items,
    id,
    setSelectedItems,
    onSelectedValueChange,
    disabled,
    loading
  );
};
