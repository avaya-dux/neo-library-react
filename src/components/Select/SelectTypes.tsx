import { ReactElement } from "react";

export type SelectItem = {
  text: string;
  disabled?: boolean;
};
interface BaseSelectProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  errorList?: string[];
  helperText?: string;
  loading?: boolean;
  required?: boolean;
  id?: string;
  onSelectedValueChange?: (value: string[] | string) => any;
}

export interface SelectProps extends BaseSelectProps {
  items: SelectItem[];
}

export type MultipleSelectOptionProps = {
  children: string;
  helperText?: string;
  disabled?: boolean;
};

export interface MultipleSelectProps extends BaseSelectProps {
  children?:
    | ReactElement<MultipleSelectOptionProps>
    | ReactElement<MultipleSelectOptionProps>[];
  values?: string[];
}

export type MultipleSelectContextProps = {
  items: string[];
  itemProps: any;
  selectedItems: string[];
  index: number;
  highlightedIndex: number;
};
