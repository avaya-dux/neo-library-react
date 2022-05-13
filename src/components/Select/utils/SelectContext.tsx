import { UseComboboxReturnValue, UseSelectReturnValue } from "downshift";
import { createContext } from "react";

import { SelectOptionProps } from "./SelectTypes";

type ContextDownshiftProps =
  | UseComboboxReturnValue<SelectOptionProps>
  | UseSelectReturnValue<SelectOptionProps>;

export type SelectContextProps = {
  downshiftProps: ContextDownshiftProps;

  selectProps: {
    ariaLabel?: string;
    creatable?: boolean;
    disabled: boolean;
    filteredOptions: SelectOptionProps[];
    helperId?: string;
    helperText?: string;
    loading: boolean;
    placeholder: string;
  };

  optionProps: {
    createMessage: string;
    multiple: boolean;
    noOptionsMessage: string;
    options: SelectOptionProps[];
    selectedItems: SelectOptionProps[];
    selectedItemsValues: (string | undefined)[];
  };
};

export const SelectContext = createContext<SelectContextProps>({
  downshiftProps: {} as ContextDownshiftProps, // HACK: should be a better way, but it eludes me

  selectProps: {
    disabled: false,
    creatable: false,
    filteredOptions: [],
    loading: false,
    placeholder: "",
  },

  optionProps: {
    createMessage: "",
    multiple: false,
    noOptionsMessage: "",
    options: [],
    selectedItems: [],
    selectedItemsValues: [],
  },
});
