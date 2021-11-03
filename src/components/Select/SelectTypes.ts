import { ReactNode } from "react";

export type OptionType = {
  defaultSelected?: boolean;
  disabled?: boolean;
  hint?: string;
  label: string;
  placeholder?: boolean;
  value: string;
};

export type SelectHandlerType = (values: string[]) => void;
export interface NativeSelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "multiple"
  > {
  errorMessages?: string[];
  helperMessages?: string[];
  isLoading?: boolean;
  label: string;
  loaderText?: string;
  onChange?: SelectHandlerType;
  options: OptionType[];
  required?: boolean;
  value?: string[];
}
export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  disabled?: boolean;
  errorMessages?: string[];
  helperMessages?: string[];
  isLoading?: boolean;
  isMultipleSelect?: boolean;
  label: string;
  loaderText?: ReactNode;
  onChange?: SelectHandlerType;
  options: OptionType[];
  required?: boolean;
  value?: string[];
}

export interface OptionsProps {
  cursor: number;
  id: string;
  isMultipleSelect: boolean;
  labelledby: string;
  options: OptionType[];
  selectedItems: OptionType[];
  updateCursor: (cursor: number) => void;
}
