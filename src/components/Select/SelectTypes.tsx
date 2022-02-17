import { ReactElement, createContext } from "react";

export type SelectOptionProps = {
  children: string;
  helperText?: string;
  disabled?: boolean;
};

export type MultipleSelectOptionProps = {
  children: string;
  helperText?: string;
  disabled?: boolean;
};
export interface SelectProps {
  isMultipleSelect?: boolean;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  errorList?: string[];
  helperText?: string;
  loading?: boolean;
  required?: boolean;
  id?: string;
  onSelectedValueChange?: (value: string[] | string) => any;
  children?:
    | ReactElement<SelectOptionProps | MultipleSelectOptionProps>
    | ReactElement<SelectOptionProps | MultipleSelectOptionProps>[];
  values?: string[];
}

export type SelectContextProps = {
  items: string[];
  itemProps: any;
  index: number;
  highlightedIndex: number;
  selectedItems: string[];
};

export const SelectContext = createContext<SelectContextProps>({
  items: [],
  itemProps: {},
  selectedItems: [],
  index: 0,
  highlightedIndex: 0,
});
