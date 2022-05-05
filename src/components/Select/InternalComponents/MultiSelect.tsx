import clsx from "clsx";
import { useContext, useMemo } from "react";

import { Chip } from "components/Chip";

import { SelectContext } from "../utils/SelectContext";
import { OptionsWithEmptyMessageFallback } from "./OptionsWithEmptyMessageFallback";

export const MultiSelect = () => {
  const {
    downshiftProps: { getMenuProps, getToggleButtonProps, isOpen, selectItem },
    optionProps: { selectedItems },
    selectProps: {
      ariaLabel,
      disabled,
      helperId,
      helperText,
      loading,
      placeholder,
    },
  } = useContext(SelectContext);

  const selectedItemsAsChips = useMemo(
    () =>
      selectedItems.length
        ? selectedItems.map((item, index) => (
            <Chip
              closable
              key={`${item.children}-${index}`}
              onClick={() => selectItem(item)} // `selectItem` toggles the item out of `selectedItems`
            >
              {item.children}
            </Chip>
          ))
        : null,
    [selectedItems]
  );

  return (
    <div
      aria-describedby={helperText && helperId}
      className={clsx(
        "neo-multiselect",
        disabled && "neo-multiselect--disabled",
        loading && "neo-select__spinner",
        isOpen && "neo-multiselect--active"
      )}
    >
      <button
        {...getToggleButtonProps()}
        className="neo-multiselect__header"
        type="button"
      >
        {selectedItemsAsChips || placeholder}
      </button>

      <div
        aria-label={ariaLabel}
        className="neo-multiselect__content"
        {...getMenuProps()}
      >
        <OptionsWithEmptyMessageFallback />
      </div>
    </div>
  );
};