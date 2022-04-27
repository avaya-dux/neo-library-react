import { ReactElement } from "react";

export type SelectOptionProps = {
  children: string;
  disabled?: boolean;
  helperText?: string;
};
type AtLeastOneProps =
  | { label: string; ariaLabel?: string }
  | { label?: string; ariaLabel: string };

export type SelectProps = {
  children?:
    | ReactElement<SelectOptionProps>
    | ReactElement<SelectOptionProps>[];
  disabled?: boolean;
  errorList?: string[];
  helperText?: string;
  id?: string;
  isCombobox?: boolean;
  isMultipleSelect?: boolean;
  loading?: boolean;
  onSelectedValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  required?: boolean;
  values?: string[];
} & AtLeastOneProps;
