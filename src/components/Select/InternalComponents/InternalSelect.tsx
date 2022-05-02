import {
  MultiSelect,
  MultiSelectSearchable,
  SingleSelect,
  SingleSelectSearchable,
} from "./";

export const InternalSelect = ({
  searchable,
  multiple,
}: {
  searchable?: boolean;
  multiple?: boolean;
}) => {
  if (searchable && multiple) {
    return <MultiSelectSearchable />;
  } else if (searchable) {
    return <SingleSelectSearchable />;
  } else if (multiple) {
    return <MultiSelect />;
  }

  return <SingleSelect />;
};
