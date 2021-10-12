export type OptionType = {
  label: string;
  value: string;
  hint?: string;
  disabled?: boolean;
};

export type SelectHandlerType = (value: string[]) => void;
