import { ReactNode } from "react";

export type OptionType = {
  defaultSelected?: boolean;
  isDisabled?: boolean;
  hint?: string;
  label: string;
  isPlaceholder?: boolean;
  value: string;
};

export type SelectHandlerType = (values: string[]) => void;
export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "multiple"> {
  errorMessages?: string[];
  helperMessages?: string[];
  isLoading?: boolean;
  label: string;
  loaderText?: string;
  options: OptionType[];
  required?: boolean;
  value?: string;
}
export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "onChange" | "onSelect" | "onBlur"
  > {
  disabled?: boolean;
  errorMessages?: string[];
  helperMessages?: string[];
  isLoading?: boolean;
  isMultipleSelect?: boolean;
  label: string;
  loaderText?: ReactNode;
  onSelectionChange?: SelectHandlerType;
  options: OptionType[];
  required?: boolean;
  value?: string[];
  name?: string;
  placeholder?: string;
}

export interface OptionsProps {
  hoveredIndex: number;
  id: string;
  isMultipleSelect?: boolean;
  labelledby: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  updateHoveredIndex: (hoveredIndex: number) => void;
  topPosition: number;
}
