import clsx from "clsx";
import { useSelect } from "downshift";
import {
  Children,
  createContext,
  FunctionComponent,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { NeoInputWrapper } from "components/NeoInputWrapper";
import { genId, handleAccessbilityError } from "utils/accessibilityUtils";

import {
  MultipleSelectContextProps,
  MultipleSelectOptionProps,
  MultipleSelectProps,
} from "./SelectTypes";

import "./MultipleSelect_shim.css";

const MultipleSelectContext = createContext<MultipleSelectContextProps>({
  items: [],
  itemProps: {},
  selectedItems: [],
  index: 0,
  highlightedIndex: 0,
});

export const MultipleSelect: FunctionComponent<MultipleSelectProps> = ({
  label,
  placeholder = "Select One",
  id = genId(),
  disabled,
  errorList = [],
  helperText,
  loading = false,
  required,
  onSelectedValueChange,
  children = [],
}) => {
  if (!label) {
    handleAccessbilityError("Select requires a label prop");
  }

  const items = Array.isArray(children)
    ? children.map((child) => {
        if (isValidElement(child)) {
          return child.props.children.toString();
        } else {
          return " ";
        }
      })
    : children.props.children.toString();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
    highlightedIndex,
  } = useSelect({
    items,
    id,
    isOpen: disabled || loading ? false : undefined,
    selectedItem: null,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
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

  useEffect(() => {
    if (onSelectedValueChange && selectedItems.length > 0)
      onSelectedValueChange(selectedItems);
  }, [selectedItems]);

  const context = {
    items,
    itemProps: getItemProps,
    selectedItems,
    highlightedIndex,
  };

  const childrenWithProps = Children.map(children, (child, index) => {
    const value = { ...context, index };

    if (isValidElement(child)) {
      return (
        <MultipleSelectContext.Provider value={value}>
          {child}
        </MultipleSelectContext.Provider>
      );
    }
    return child;
  });

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
          {childrenWithProps}
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

export const MultipleSelectOption: FunctionComponent<
  MultipleSelectOptionProps
> = ({ helperText, disabled, children }) => {
  const { items, itemProps, selectedItems, highlightedIndex, index } =
    useContext(MultipleSelectContext);

  const item = items[index];

  const labelId = useMemo(() => `label-id-${index}`, [index]);

  const helperId = useMemo(() => `helper-text-${index}`, [index]);

  const MultiSelectOption = (
    <>
      <input
        className="neo-check"
        type="checkbox"
        disabled={disabled}
        checked={!!selectedItems && selectedItems.includes(item)}
        readOnly
        aria-labelledby={labelId}
        aria-describedby={helperId}
      />
      <div
        key={`${item}${index}`}
        {...itemProps({
          item,
          index,
          disabled,
        })}
        style={
          highlightedIndex === index && !disabled
            ? { backgroundColor: "#e8f1fc" }
            : {}
        }
        className="neo-check__label"
        htmlFor={item}
        id={labelId}
      >
        {children}
      </div>
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
