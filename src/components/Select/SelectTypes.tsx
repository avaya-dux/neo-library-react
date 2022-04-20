import { ReactElement } from "react";

export type SelectOptionProps = {
  children: string;
  disabled?: boolean;
  helperText?: string;
};

export interface SelectProps {
  children?:
    | ReactElement<SelectOptionProps>
    | ReactElement<SelectOptionProps>[];
  disabled?: boolean;
  errorList?: string[];
  helperText?: string;
  id?: string;
  isCombobox?: boolean;
  isMultipleSelect?: boolean;
  label: string;
  loading?: boolean;
  onSelectedValueChange?: (value: string[] | string) => any;
  placeholder?: string;
  required?: boolean;
  values?: string[];
}
