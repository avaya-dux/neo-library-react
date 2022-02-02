import { ReactNode, ReactElement } from "react";

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
  onSelectedValueChange?: (value: string | string[] | null) => any;
}

export interface SelectProps extends BaseSelectProps {
  items: SelectItem[];
}

export interface MultipleSelectProps extends BaseSelectProps {
  children: ReactElement<MultipleSelectOptionProps>[];
}

export type MultipleSelectOptionProps = {
  children: ReactNode;
  helperText?: string;
  disabled?: boolean;
};

export type MultipleSelectContextProps = {
  items: string[];
  itemProps: any;
  selectedItems: string[];
  index: number;
};
