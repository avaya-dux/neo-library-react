import clsx from "clsx";
import { useSelect } from "downshift";
import { FunctionComponent, useState } from "react";

import { Checkbox, NeoInputWrapper } from "components";

import { MultipleSelectProps, MultipleSelectItem } from "./SelectTypes";

function multipleSelectStateReducer(actionAndChanges: any) {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true,
      };
  }
  return changes;
}

export const MultipleSelect: FunctionComponent<MultipleSelectProps> = ({
  label,
  placeholder = "Select One",
  items,
}) => {
  const [selectedItems, setSelectedItems] = useState<String[]>([]);

  const itemsText: string[] = items.map((item) => item.text);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: itemsText,
    selectedItem: null,
    stateReducer: multipleSelectStateReducer,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }
      const index = selectedItems.indexOf(selectedItem);
      if (index > 0) {
        setSelectedItems([
          ...selectedItems.slice(0, index),
          ...selectedItems.slice(index + 1),
        ]);
      } else if (index === 0) {
        setSelectedItems([...selectedItems.slice(1)]);
      } else {
        setSelectedItems([...selectedItems, selectedItem]);
      }
    },
  });

  const selectedItemsText =
    selectedItems.length > 0
      ? `${selectedItems.length} elements selected`
      : placeholder;

  return (
    <NeoInputWrapper>
      <label {...getLabelProps()}>{label}</label>
      <div
        {...getToggleButtonProps()}
        className={clsx("neo-multiselect", isOpen && "neo-multiselect--active")}
        role="button"
      >
        <div className="neo-multiselect__header">{selectedItemsText}</div>
        <div className="neo-multiselect__content">
          <MultipleSelectItems
            items={items}
            selectedItems={selectedItems}
            menuProps={getMenuProps}
            itemProps={getItemProps}
          />
        </div>
      </div>
    </NeoInputWrapper>
  );
};

export const MultipleSelectItems: FunctionComponent<{
  items: MultipleSelectItem[];
  selectedItems: String[];
  menuProps: any;
  itemProps: any;
}> = ({ items, selectedItems, menuProps, itemProps }) => {
  return (
    <div {...menuProps()}>
      {items.map((item, index) => {
        const { text, disabled } = item;
        const calculatedItemProps = itemProps({ item, index });
        console.log(calculatedItemProps);
        return (
          <Checkbox
            {...itemProps({ item, index })}
            key={`${text}${index}`}
            label={item.text}
            id={calculatedItemProps.id}
            value={item.text}
            checked={selectedItems.includes(item.text)}
            onChange={calculatedItemProps.onClick}
          />
        );
      })}
    </div>
  );
};
