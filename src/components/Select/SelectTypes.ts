export type OptionType = {
  label: string;
  value: string;
  hint?: string;
  disabled?: boolean;
  defaultSelected?: boolean;
  placeholder?: boolean;
};

export type SelectHandlerType = (values: string[]) => void;
export interface NativeSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  errorText?: string[];
  helperText?: string[];
  isLoading?: boolean;
  label: string;
  options: OptionType[];
  required?: boolean;
  value?: string[];
}
export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  disabled?: boolean;
  errorText?: string[];
  helperText?: string[];
  isLoading?: boolean;
  isMultipleSelect?: boolean;
  label: string;
  onChange?: SelectHandlerType;
  options: OptionType[];
  required?: boolean;
  value?: string[];
}

export interface OptionsProps {
  options: OptionType[];
  isMultipleSelect: boolean;
  labelledby: string;
  selectedItems: OptionType[];
  cursor: number;
  updateCursor: (cursor: number) => void;
  id: string;
}
