import {
  MultiSelect,
  MultiSelectCombobox,
  SingleSelect,
  SingleSelectCombobox,
} from "./";

export const InternalSelect = ({
  isCombobox,
  isMultipleSelect,
}: {
  isCombobox?: boolean;
  isMultipleSelect?: boolean;
}) => {
  if (isCombobox && isMultipleSelect) {
    return <MultiSelectCombobox />;
  } else if (isCombobox) {
    return <SingleSelectCombobox />;
  } else if (isMultipleSelect) {
    return <MultiSelect />;
  }

  return <SingleSelect />;
};
