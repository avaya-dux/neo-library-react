export type OptionType = {
  label: string;
  value: string;
  hint?: string;
};

export type SelectHandlerType = (value: string[]) => void;
