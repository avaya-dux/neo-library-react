import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { createContext, ReactElement } from "react";

import { InternalSelectOptionProps } from "../InternalComponents";
import { SelectOptionProps } from "./SelectTypes";

type ContextDownshiftProps =
  | UseComboboxReturnValue<ReactElement<InternalSelectOptionProps>>
  | UseSelectReturnValue<ReactElement<InternalSelectOptionProps>>;

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
    filteredOptions: ReactElement<InternalSelectOptionProps>[];
    multiple: boolean;
    noOptionsMessage: string;
    options: ReactElement<InternalSelectOptionProps>[];
    selectedItems: ReactElement<InternalSelectOptionProps>[];
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
    filteredOptions: [],
    multiple: false,
    noOptionsMessage: "",
    options: [],
    selectedItems: [],
  },
});
