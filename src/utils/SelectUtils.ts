import { OptionType } from "components/Select/SelectTypes";

export const getOption = (array: OptionType[], query?: string[]) =>
  array.filter((item) => {
    return query
      ? query
          .map((queryItem) => queryItem.toLowerCase())
          .includes(item.value.toLowerCase())
      : item.defaultSelected;
  });
