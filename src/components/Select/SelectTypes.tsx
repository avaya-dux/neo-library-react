export type SelectItem = {
  text: string;
  disabled?: boolean;
};

export type MultipleSelectItem = SelectItem & {
  helperText?: string;
};

interface BaseSelectProps {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  errorList?: string[];
  helperText?: string;
  loading?: boolean;
  required?: boolean;
  id?: string,
  onSelectedValueChange?: (value: string | string[] | null) => any;
}

export interface SelectProps extends BaseSelectProps {
  items: SelectItem[];
}

export interface MultipleSelectProps extends BaseSelectProps {
  items: MultipleSelectItem[];
}
