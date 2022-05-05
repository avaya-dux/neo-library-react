import { useCombobox, useSelect } from "downshift";
import { Dispatch, SetStateAction } from "react";

import { SelectOptionProps } from "./SelectTypes";

const DownshiftWithComboboxProps = (
  options: SelectOptionProps[],
  selectId: string,
  filteredOptions: SelectOptionProps[],
  setFilteredOptions: Dispatch<SetStateAction<SelectOptionProps[]>>,
  loading?: boolean,
  disabled?: boolean
) => {
  return useCombobox({
    items: filteredOptions,
    id: selectId,
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
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        const relatedOptions = options.filter((child) => {
          const childSearchText = child.searchText || child.children;

          return childSearchText
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        });

        setFilteredOptions(relatedOptions);
      } else if (inputValue === "") {
        setFilteredOptions(options);
      }
    },
  });
};

const DownshiftWithComboboxMultipleSelectProps = (
  options: SelectOptionProps[],
  selectId: string,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  filteredOptions: SelectOptionProps[],
  setFilteredOptions: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled?: boolean,
  loading?: boolean
) => {
  return useCombobox({
    items: filteredOptions,
    id: selectId,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      const { selectedItem } = changes;

      switch (type) {
        case useCombobox.stateChangeTypes.ToggleButtonClick:
          return {
            ...changes,
            isOpen: !(disabled || loading),
          };

        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: "",
            isOpen: true,
            highlightedIndex: state.highlightedIndex,
          };

        case useCombobox.stateChangeTypes.FunctionSelectItem:
          if (selectedItem && selectedItems.includes(selectedItem)) {
            setSelectedItems(
              selectedItems.filter((item) => item !== selectedItem)
            );
          } else if (selectedItem) {
            setSelectedItems([...selectedItems, selectedItem]);
          }

          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue: "",
          };

        default:
          return changes;
      }
    },
    onInputValueChange: ({ inputValue }) => {
      // TODO: extract duplicate code
      if (inputValue) {
        const relatedOptions = options.filter((child) => {
          const childSearchText = child.searchText || child.children;

          return childSearchText
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        });

        setFilteredOptions(relatedOptions);
      } else if (inputValue === "") {
        setFilteredOptions(options);
      }
    },
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) return;

      if (selectedItems.includes(selectedItem)) {
        setSelectedItems(selectedItems.filter((item) => item !== selectedItem));
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
  });
};

const DownshiftWithSelectProps = (
  items: SelectOptionProps[],
  selectId: string,
  disabled?: boolean,
  loading?: boolean
) => {
  return useSelect({
    items,
    id: selectId,
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
  });
};

const DownshiftWithMultipleSelectProps = (
  options: SelectOptionProps[],
  selectId: string,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>,
  disabled?: boolean,
  loading?: boolean
) => {
  return useSelect({
    items: options,
    id: selectId,
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
  disabled: boolean,
  selectId: string,
  loading: boolean,
  multiple: boolean,
  searchable: boolean,
  options: SelectOptionProps[],
  filteredOptions: SelectOptionProps[],
  setFilteredOptions: Dispatch<SetStateAction<SelectOptionProps[]>>,
  selectedItems: SelectOptionProps[],
  setSelectedItems: Dispatch<SetStateAction<SelectOptionProps[]>>
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
      options,
      selectId,
      selectedItems,
      setSelectedItems,
      filteredOptions,
      setFilteredOptions,
      disabled,
      loading
    );
  } else if (searchable) {
    return DownshiftWithComboboxProps(
      options,
      selectId,
      filteredOptions,
      setFilteredOptions,
      disabled,
      loading
    );
  } else if (multiple) {
    return DownshiftWithMultipleSelectProps(
      options,
      selectId,
      selectedItems,
      setSelectedItems,
      disabled,
      loading
    );
  }

  return DownshiftWithSelectProps(options, selectId, disabled, loading);
};
