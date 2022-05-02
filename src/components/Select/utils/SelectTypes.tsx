import { ReactElement } from "react";

export type SelectOptionProps = {
  children: string;
  disabled?: boolean;
  helperText?: string;
};

type AtLeastOneProps =
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
  values?: string[];
} & AtLeastOneProps;
