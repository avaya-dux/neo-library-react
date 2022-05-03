import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { createContext, ReactElement } from "react";

import { SelectOptionProps } from "./SelectTypes";

type ContextDownshiftProps =
  | UseComboboxReturnValue<string>
  | UseSelectReturnValue<string>;

export type SelectContextProps = {
  children: ReactElement<SelectOptionProps>[];

  downshiftProps: ContextDownshiftProps;

  selectProps: {
    ariaLabel?: string;
    disabled: boolean;
    helperId?: string;
    helperText?: string;
    loading: boolean;
    placeholder: string;
  };

  optionProps: {
    multiple: boolean;
    noOptionsMessage: string;
    options: string[];
    selectedItems: string[];
  };
};

export const SelectContext = createContext<SelectContextProps>({
  children: [],

  downshiftProps: {} as ContextDownshiftProps, // HACK: should be a better way, but it eludes me

  selectProps: {
    disabled: false,
    loading: false,
    placeholder: "",
  },

  optionProps: {
    multiple: false,
    noOptionsMessage: "",
    options: [],
    selectedItems: [],
  },
});
