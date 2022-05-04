import { ReactElement } from "react";

export interface SelectOptionProps {
  children: string;
  disabled?: boolean;
  helperText?: string;
  searchText?: string;
  // selected?: boolean; TODO: use?
  value?: string; // TODO: use
}

type LabelOrAriaLabelProps =
  | { label: string; "aria-label"?: string }
  | { label?: string; "aria-label": string };

export type SelectProps = {
  children?:
    | ReactElement<SelectOptionProps>
    | ReactElement<SelectOptionProps>[];
  disabled?: boolean;
  errorList?: string[];
  helperText?: string;
  id?: string;
  loading?: boolean;
  multiple?: boolean;
  noOptionsMessage?: string;
  onSelectedValueChange?: (value: string | string[]) => void;
  placeholder?: string;
  required?: boolean;
  searchable?: boolean;
  selectedValues?: string[];
} & LabelOrAriaLabelProps;
