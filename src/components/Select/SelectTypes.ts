export type OptionType = {
  isDisabled?: boolean;
  hint?: string;
  label: string;
  isPlaceholder?: boolean;
  value: string;
};

export interface NativeSelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "multiple"> {
  errorMessages?: string[];
  helperMessages?: string[];
  isLoading?: boolean;
  label: string;
  loaderText?: string;
  options: OptionType[];
  placeholder?: string;
  required?: boolean;
}

export type getOptionByValueType = (
  options: OptionType[],
  value: string[]
) => OptionType[];
