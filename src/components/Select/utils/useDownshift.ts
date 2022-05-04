import { useCombobox, useSelect } from "downshift";
import { Dispatch, ReactElement, SetStateAction } from "react";

import { InternalSelectOptionProps } from "../InternalComponents";

const DownshiftWithComboboxProps = (
  options: ReactElement<InternalSelectOptionProps>[],
  selectId: string,
  setSelectedItems: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
  filteredOptions: ReactElement<InternalSelectOptionProps>[],
  setFilteredOptions: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
  onSelectedValueChange?: (value: string[] | string) => void,
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
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([selectedItem]);
        onSelectedValueChange?.(selectedItem.props.value as string);
      } else {
        setSelectedItems([]);
        onSelectedValueChange?.("");
      }
    },
    onInputValueChange: ({ inputValue }) => {
      if (inputValue) {
        const relatedOptions = options.filter((child) => {
          const childSearchText =
            child.props.searchText || child.props.children;

          return childSearchText
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        });
        // setSearchText(inputValue);
        setFilteredOptions(relatedOptions);
      } else if (inputValue === "") {
        setFilteredOptions(options);
      }
    },
  });
};

const DownshiftWithComboboxMultipleSelectProps = (
  options: ReactElement<InternalSelectOptionProps>[],
  selectId: string,
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>,
  selectedItems: ReactElement<InternalSelectOptionProps>[],
  setSelectedItems: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
  setFilteredOptions: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
  disabled?: boolean,
  loading?: boolean
) => {
  return useCombobox({
    items: options,
    id: selectId,
    selectedItem: null,
    inputValue: searchText,
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
            setSearchText("");
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
        const relatedOptions = options.filter((child) => {
          const childSearchText =
            child.props.searchText || child.props.children;

          return childSearchText
            .toLowerCase()
            .includes(inputValue.toLowerCase());
        });
        // setSearchText(inputValue);
        setFilteredOptions(relatedOptions);
      } else if (inputValue === "") {
        setFilteredOptions(options);
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
  items: ReactElement<InternalSelectOptionProps>[],
  selectId: string,
  setSelectedItems: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
  onSelectedValueChange?: (value: string[] | string) => void,
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
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem) {
        setSelectedItems([selectedItem]);
        onSelectedValueChange?.(selectedItem.props.value as string);
      } else {
        setSelectedItems([]);
        onSelectedValueChange?.("");
      }
    },
  });
};

const DownshiftWithMultipleSelectProps = (
  options: ReactElement<InternalSelectOptionProps>[],
  selectId: string,
  selectedItems: ReactElement<InternalSelectOptionProps>[],
  setSelectedItems: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
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
  options: ReactElement<InternalSelectOptionProps>[],
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>,
  filteredOptions: ReactElement<InternalSelectOptionProps>[],
  setFilteredOptions: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
  selectedItems: ReactElement<InternalSelectOptionProps>[],
  setSelectedItems: Dispatch<
    SetStateAction<ReactElement<InternalSelectOptionProps>[]>
  >,
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
      options,
      selectId,
      searchText,
      setSearchText,
      selectedItems,
      setSelectedItems,
      setFilteredOptions,
      disabled,
      loading
    );
  } else if (searchable) {
    return DownshiftWithComboboxProps(
      options,
      selectId,
      setSelectedItems,
      filteredOptions,
      setFilteredOptions,
      onSelectedValueChange,
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

  return DownshiftWithSelectProps(
    options,
    selectId,
    setSelectedItems,
    onSelectedValueChange,
    disabled,
    loading
  );
};
