import clsx from "clsx";
import { useSelect } from "downshift";
import { FunctionComponent } from "react";

import { NeoInputWrapper } from "components";

import { SelectProps } from "./SelectTypes";

export const Select: FunctionComponent<SelectProps> = ({
  label,
  items,
  placeholder = "Select One",
}) => {
  const itemsText: string[] = items.map((item) => item.text);

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({ items: itemsText });

  return (
    <NeoInputWrapper>
      <label {...getLabelProps()}>{label}</label>

      <div
        {...getToggleButtonProps()}
        className={clsx("neo-multiselect", isOpen && "neo-multiselect--active")}
        role="button"
      >
        <div className="neo-multiselect__header">
          {selectedItem || placeholder}
        </div>

        <div className="neo-multiselect__content">
          <ul {...getMenuProps()}>
            {items.map((item, index) => {
              const { text, disabled } = item;
              return (
                <li
                  key={`${text}${index}`}
                  {...getItemProps({ item: text, index })}
                  disabled={disabled}
                >
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </NeoInputWrapper>
  );
};
