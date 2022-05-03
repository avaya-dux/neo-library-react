import { MultiSelect } from "./MultiSelect";
import { MultiSelectCombobox } from "./MultiSelectCombobox";
import { SingleSelect } from "./SingleSelect";
import { SingleSelectCombobox } from "./SingleSelectCombobox";

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
