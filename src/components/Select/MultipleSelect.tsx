import clsx from "clsx";
import { useSelect } from "downshift";
import {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";

import { MultipleSelectItem, MultipleSelectProps } from "./SelectTypes";

type SelectContextProps = {
  items: string[];
  itemProps?: any;
  selectedItems?: string[];
};

const SelectContext = createContext<SelectContextProps>({
  items: [],
  itemProps: {},
  selectedItems: [],
});

export const MultipleSelect: FunctionComponent<MultipleSelectProps> = ({
  label,
  items,
  placeholder = "Select One",
  id = genId(),
  disabled,
  errorList = [],
  helperText,
  loading = false,
  required,
  onSelectedValueChange,
  children,
}) => {
  if (!label) {
    handleAccessbilityError("Select requires a label prop");
  }
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const itemsText: string[] = items.map((item) => item.text);

  const helperId = useMemo(() => `helper-text-${id}`, [id]);

  const multipleSelectText = useMemo(
    () =>
      `${selectedItems.length > 0 ? selectedItems.join(", ") : placeholder}`,
    [selectedItems]
  );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: itemsText,
    id,
    isOpen: disabled && false,
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      console.log(type);
      switch (type) {
        case useSelect.stateChangeTypes.MenuKeyDownEnter:
        case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true,
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

  // useEffect(() => {
  //   if (onSelectedValueChange && selectedItems.length > 0)
  //     onSelectedValueChange(selectedItems);
  // }, [selectedItem]);

  const context = { items: itemsText, itemProps: getItemProps, selectedItems };

  return (
    <NeoInputWrapper
      disabled={disabled || loading}
      error={errorList.length > 0}
      required={required}
    >
      <label {...getLabelProps()}>{label}</label>

      <div
        className={clsx(
          "neo-multiselect",
          disabled && "neo-multiselect--disabled",
          loading && "neo-select__spinner",
          isOpen && "neo-multiselect--active"
        )}
        aria-describedby={helperText && helperId}
      >
        <div className="neo-multiselect__header" {...getToggleButtonProps()}>
          {multipleSelectText}
        </div>
        <div className="neo-multiselect__content" {...getMenuProps()}>
          <SelectContext.Provider value={context}>
            {children}
          </SelectContext.Provider>
        </div>
      </div>

      {helperText && (
        <div className="neo-input-hint" id={helperId}>
          {helperText}
        </div>
      )}

      {errorList.length > 0 &&
        errorList?.map((text, index) => (
          <div className="neo-input-hint" key={`error-text-${index}`}>
            {text}
          </div>
        ))}
    </NeoInputWrapper>
  );
};

type MultipleSelectOptionProps = {
  item: MultipleSelectItem;
};

export const MultipleSelectOption: FunctionComponent<
  MultipleSelectOptionProps
> = ({ item }) => {
  const { text, disabled, helperText } = item;

  const { items, itemProps, selectedItems } = useContext(SelectContext);

  const index = items.indexOf(text);

  const helperId = useMemo(() => `helper-text-${index}`, [index]);

  const style = {
    ":hover, :focus": {
      backgroundColor: "#e8f1fc",
    },
  };

  const MultiSelectOption = (
    <>
      <input
        className="neo-check"
        type="checkbox"
        disabled={disabled}
        checked={!!selectedItems && selectedItems.includes(text)}
        readOnly
        aria-describedby={helperText && helperId}
      />
      <label
        key={`${text}${index}`}
        {...itemProps({
          item: text,
          index,
          disabled,
        })}
        style={style}
        htmlFor={text}
      >
        {text}
      </label>
    </>
  );

  return helperText ? (
    <div className="neo-input-group">
      {MultiSelectOption}
      <p className="neo-input-hint" id={helperId}>
        {helperText}
      </p>
    </div>
  ) : (
    <>{MultiSelectOption}</>
  );
};
